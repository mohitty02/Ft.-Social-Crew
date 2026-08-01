import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { citiesByCountry } from '@/config/cities'
import {
  services as serviceDefs,
  cityServiceDefinitions,
  resolveServiceSlug,
  resolveServiceTitle,
} from '@/config/services'
import { getCityBySlug, getServiceBySlug } from '@/lib/data'
import { getTestimonials } from '@/content/testimonials'
import { buildMetadata, buildUrl } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, faqSchema, serviceSchema, localBusinessSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'
import { KeyTakeaways } from '@/components/aeo/KeyTakeaways'
import { TestimonialCard } from '@/components/proof/TestimonialCard'
import { LeadForm } from '@/components/conversion/LeadForm'
import { CtaSection } from '@/components/conversion/CtaSection'
import { Reveal } from '@/components/motion/Reveal'

/**
 * City × Service — the deepest long-tail template, URL
 * /{country}/locations/{city}/{service}/ per SRS §3.2.
 *
 * Generated only for the four highest-value services per market, not the full
 * 10 × n matrix. SRS §7.7 is explicit that "priority indexing signals favour
 * money pages over low-value combinatorial pages", and generating every
 * possible combination would be exactly the crawl-budget problem §1.12 warns
 * about. The architecture supports the full matrix; the build deliberately
 * does not emit it.
 */
export function generateStaticParams() {
  return countryCodes.flatMap((country) =>
    (citiesByCountry[country] ?? []).flatMap((city) =>
      cityServiceDefinitions.map((def) => ({
        country,
        city: city.slug,
        service: resolveServiceSlug(def, country),
      }))
    )
  )
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; city: string; service: string }>
}): Promise<Metadata> {
  const { country, city, service } = await params
  if (!isCountryCode(country)) return {}

  const code = country as CountryCode
  const c = countries[code]
  const record = await getCityBySlug(code, city)
  const svc = await getServiceBySlug(code, service)
  if (!record || !svc) return {}

  return buildMetadata({
    country: code,
    path: `locations/${city}/${service}`,
    title: `${svc.title} in ${record.name} | ${c.positioning}`,
    description: `${svc.title} for businesses in ${record.name}, ${record.region}. ${record.localProofPoint}.`.slice(0, 158),
    image: record.image,
  })
}

export default async function CityServicePage({
  params,
}: {
  params: Promise<{ country: string; city: string; service: string }>
}) {
  const { country, city, service } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'

  const record = await getCityBySlug(code, city)
  const svc = await getServiceBySlug(code, service)
  if (!record || !svc) notFound()

  const testimonials = getTestimonials(code).slice(0, 1)

  const siblings = cityServiceDefinitions.filter(
    (d) => resolveServiceSlug(d, code) !== service
  )

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: isDe ? 'Standorte' : 'Locations', href: `/${code}/locations/` },
    { name: record.name, href: `/${code}/locations/${city}/` },
    { name: svc.title, href: `/${code}/locations/${city}/${service}/` },
  ]

  const answer = isDe
    ? `${svc.title} für Unternehmen in ${record.name}: ${record.localProofPoint}. Die Vorgehensweise ist dokumentiert und standortspezifisch geplant.`
    : `${svc.title} for businesses in ${record.name}, ${record.region}. ${record.localProofPoint}. The plan is built for this market specifically rather than adapted from a national strategy.`

  const faqs = [
    {
      question: isDe
        ? `Bieten Sie ${svc.title} in ${record.name} an?`
        : `Do you offer ${svc.title.toLowerCase()} in ${record.name}?`,
      answer: `${isDe ? 'Ja.' : 'Yes.'} ${record.localProofPoint}. ${isDe ? 'Die Betreuung erfolgt remote sowie vor Ort nach Bedarf.' : 'Engagements run remotely with on-site sessions where the programme warrants it.'}`,
    },
    {
      question: isDe
        ? `Was kostet ${svc.title} in ${record.name}?`
        : `What does ${svc.title.toLowerCase()} cost in ${record.name}?`,
      answer:
        c.pricingMode === 'productized'
          ? `${isDe ? 'Die Preise sind transparent auf der Preisseite ausgewiesen.' : `Pricing is published openly on our pricing page in ${c.currency}, so you can plan a budget before speaking to anyone.`}`
          : `${isDe ? 'Der Umfang wird individuell festgelegt; ein verbindlicher Preis folgt im Erstgespräch.' : `Scope is set per engagement and priced in ${c.currency}. You get a firm number in the first conversation rather than the third.`}`,
    },
    {
      question: isDe
        ? `Wie unterscheidet sich ${record.name} von anderen Standorten?`
        : `How does ${record.name} differ from other markets?`,
      answer: record.uniqueIntro,
    },
  ]

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(breadcrumbs),
          faqSchema(faqs),
          localBusinessSchema(code),
          serviceSchema({
            country: code,
            name: `${svc.title} in ${record.name}`,
            description: answer,
            url: buildUrl(code, `locations/${city}/${service}`),
            serviceType: svc.title,
          })
        )}
      />

      <PageHero
        country={code}
        eyebrow={`${record.name} · ${svc.title}`}
        title={
          isDe
            ? `${svc.title} in ${record.name}`
            : `${svc.title} in ${record.name}`
        }
        intro={record.uniqueIntro}
        answer={answer}
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeader
              eyebrow={isDe ? 'Lokaler Kontext' : 'Local context'}
              heading={
                isDe
                  ? `${svc.title} im Markt ${record.name}`
                  : `${svc.title} in this market specifically`
              }
            />
            <p className="mt-6 flex gap-3.5 text-body text-ink-600">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{record.localProofPoint}</span>
            </p>
            <p className="mt-5 max-w-prose text-body text-ink-600">{svc.summary}</p>
          </div>
          <Reveal>
            <KeyTakeaways
              country={code}
              title={isDe ? 'Leistungsumfang' : 'What is included'}
              items={svc.deliverables.slice(0, 5)}
            />
          </Reveal>
        </div>
      </Section>

      <Section surface="tint" deferred>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeader eyebrow="FAQ" heading={isDe ? 'Häufige Fragen' : 'Local questions'} />
            <div className="mt-8">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>
          <Reveal>
            <div className="rounded-xl border border-accent-line bg-paper-pure p-7 sm:p-9">
              <h2 className="font-display text-h3 text-[color:var(--text-brand)]">
                {isDe ? 'Anfrage senden' : 'Get in touch'}
              </h2>
              <LeadForm
                country={code}
                variant="short"
                formId={`city-svc-${city}-${service}`}
                className="mt-7"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {testimonials.length > 0 && (
        <Section surface="white" deferred>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <SectionHeader
              eyebrow={isDe ? 'Nachweis' : 'Proof'}
              heading={isDe ? 'Aus diesem Markt' : 'From this market'}
            />
            <div>
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </div>
        </Section>
      )}

      <Section surface="paper" deferred>
        <SectionHeader
          eyebrow={isDe ? 'Weitere Leistungen' : 'Other services here'}
          heading={
            isDe
              ? `Weitere Leistungen in ${record.name}`
              : `Also available in ${record.name}`
          }
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {siblings.map((s) => (
            <Link
              key={s.slug}
              href={`/${code}/locations/${city}/${resolveServiceSlug(s, code)}/`}
              className="group bg-paper-pure p-6 transition-colors duration-base hover:bg-accent-soft"
            >
              <h3 className="font-display text-h4 text-[color:var(--text-brand)]">
                {resolveServiceTitle(s, code)}
              </h3>
              <span className="mt-3 inline-flex items-center gap-1.5 text-small text-[color:var(--text-brand)]">
                {record.name}
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-base group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaSection
        country={code}
        eyebrow={record.name}
        heading={
          isDe
            ? `${svc.title} in ${record.name}: Erstgespräch`
            : `Discuss ${svc.title.toLowerCase()} in ${record.name}`
        }
        body={
          isDe
            ? 'Wir kennen den lokalen Wettbewerb bereits.'
            : 'We already know what the competitive picture looks like here.'
        }
      />
    </>
  )
}
