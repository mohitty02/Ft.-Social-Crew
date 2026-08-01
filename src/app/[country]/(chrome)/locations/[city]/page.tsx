import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { citiesByCountry } from '@/config/cities'
import { cityServiceDefinitions, resolveServiceSlug, resolveServiceTitle } from '@/config/services'
import { getCityBySlug, getCityList } from '@/lib/data'
import { getTestimonials } from '@/content/testimonials'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, faqSchema, localBusinessSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'
import { TestimonialCard } from '@/components/proof/TestimonialCard'
import { LeadForm } from '@/components/conversion/LeadForm'
import { CtaSection } from '@/components/conversion/CtaSection'
import { Icon } from '@/components/ui/Icon'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal'

/**
 * City page — programmatic (city × country) per SRS §3.4.
 *
 * SRS §11.3's quality gate is satisfied structurally: `localProofPoint` and
 * `uniqueIntro` are required fields on the City type, and a testimonial is
 * rendered on every one. A city record without those cannot type-check, which
 * is how the SEO policy becomes a compile-time constraint rather than a
 * checklist someone has to remember.
 */
export function generateStaticParams() {
  return countryCodes.flatMap((country) =>
    (citiesByCountry[country] ?? []).map((city) => ({ country, city: city.slug }))
  )
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; city: string }>
}): Promise<Metadata> {
  const { country, city } = await params
  if (!isCountryCode(country)) return {}

  const code = country as CountryCode
  const c = countries[code]
  const record = await getCityBySlug(code, city)
  if (!record) return {}

  return buildMetadata({
    country: code,
    path: `locations/${city}`,
    title: `${c.positioning} in ${record.name}`,
    description: record.answer.slice(0, 158),
    hreflangGroupId: undefined, // City sets differ per market — self-tag only.
    image: record.image,
  })
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ country: string; city: string }>
}) {
  const { country, city } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'

  const record = await getCityBySlug(code, city)
  if (!record) notFound()

  const allCities = await getCityList(code)
  const others = allCities.filter((x) => x.slug !== city).slice(0, 6)
  const testimonials = getTestimonials(code).slice(0, 2)

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: isDe ? 'Standorte' : 'Locations', href: `/${code}/locations/` },
    { name: record.name, href: `/${code}/locations/${city}/` },
  ]

  const faqs = [
    {
      question: isDe
        ? `Arbeiten Sie mit Unternehmen in ${record.name}?`
        : `Do you work with businesses in ${record.name}?`,
      answer: `${record.localProofPoint}. ${isDe ? 'Die Betreuung erfolgt remote sowie vor Ort nach Bedarf.' : 'Engagements run remotely with on-site sessions where the programme warrants it.'}`,
    },
    {
      question: isDe
        ? `Was unterscheidet den Markt ${record.name}?`
        : `What makes the ${record.name} market different?`,
      answer: record.uniqueIntro,
    },
    {
      question: isDe
        ? 'Wie schnell sind erste Ergebnisse sichtbar?'
        : 'How quickly do local results appear?',
      answer: isDe
        ? 'Lokale Suchergebnisse und Google-Business-Profile reagieren häufig innerhalb von vier bis acht Wochen. Organische Sichtbarkeit auf Wettbewerbsbegriffe entwickelt sich über Quartale.'
        : 'Local pack and Google Business Profile movement often appears within four to eight weeks. Organic visibility on competitive commercial terms builds over quarters.',
    },
  ]

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(breadcrumbs),
          faqSchema(faqs),
          localBusinessSchema(code)
        )}
      />

      <PageHero
        country={code}
        eyebrow={`${record.name} · ${record.region}`}
        title={
          isDe
            ? `${c.positioning} in ${record.name}`
            : `${c.positioning} in ${record.name}`
        }
        intro={record.uniqueIntro}
        answer={record.answer}
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeader
              eyebrow={isDe ? 'Lokaler Kontext' : 'Local context'}
              heading={
                isDe
                  ? `Was wir über ${record.name} wissen`
                  : `What we know about ${record.name}`
              }
            />
            <p className="mt-6 flex gap-3.5 text-body text-ink-600">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{record.localProofPoint}</span>
            </p>
            <p className="mt-5 max-w-prose text-body text-ink-600">
              {record.uniqueIntro}
            </p>
          </div>

          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-burgundy-100">
              <Image
                src={record.image}
                alt={`${record.name}, ${c.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* City × Service internal links — SRS §3.2 */}
      <Section surface="tint" deferred>
        <SectionHeader
          eyebrow={isDe ? 'Leistungen' : 'Services'}
          heading={
            isDe
              ? `Leistungen in ${record.name}`
              : `Services in ${record.name}`
          }
        />
        {/* Only the services that actually have city pages — see
            PROGRAMMATIC_CITY_SERVICES in config/services.ts. Linking to the
            full taxonomy here would produce 404s. */}
        <StaggerGroup className="mt-10 grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {cityServiceDefinitions.map((s) => (
            <StaggerItem key={s.slug} className="bg-paper-pure">
              <Link
                href={`/${code}/locations/${city}/${resolveServiceSlug(s, code)}/`}
                className="group flex items-center justify-between gap-4 p-6 transition-colors duration-base hover:bg-accent-soft"
              >
                <span className="flex items-center gap-3.5">
                  <Icon name={s.icon} className="h-5 w-5 shrink-0 text-accent" />
                  <span className="text-body text-[color:var(--text-brand)]">
                    {resolveServiceTitle(s, code)}
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-[color:var(--text-brand)] transition-transform duration-base group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* SRS §11.3 — a testimonial reference is a quality-gate requirement */}
      <Section surface="white" deferred>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow={isDe ? 'Nachweis' : 'Proof'}
              heading={isDe ? 'Rückmeldungen aus dem Markt' : 'From clients in this market'}
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </div>

          <Reveal>
            <div className="rounded-xl border border-accent-line bg-burgundy-100/25 p-7 sm:p-9">
              <h2 className="font-display text-h3 text-[color:var(--text-brand)]">
                {isDe ? `Anfrage aus ${record.name}` : `Enquire from ${record.name}`}
              </h2>
              <LeadForm
                country={code}
                variant="short"
                formId={`city-${city}`}
                className="mt-7"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper" deferred>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="FAQ" heading={isDe ? 'Häufige Fragen' : 'Local questions'} />
          <Reveal>
            <FaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </Section>

      <Section surface="white" deferred>
        <SectionHeader
          eyebrow={isDe ? 'Weitere Standorte' : 'Other markets'}
          heading={isDe ? 'Weitere Standorte in Deutschland' : `Elsewhere in ${c.name}`}
        />
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {others.map((o, i) => (
            <li key={o.slug}>
              <Link
                href={`/${code}/locations/${o.slug}/`}
                className={`inline-flex items-center rounded-pill px-4 py-2 font-tight text-small transition-colors duration-base ${
                  i % 2 === 0
                    ? 'bg-burgundy-100 text-[color:var(--text-brand)] hover:bg-burgundy-200'
                    : 'border border-accent-line text-[color:var(--text-brand)] hover:bg-accent-soft'
                }`}
              >
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection
        country={code}
        eyebrow={record.name}
        heading={
          isDe
            ? `Wachstum in ${record.name}`
            : `Growing a business in ${record.name}?`
        }
        body={
          isDe
            ? 'Wir kennen den lokalen Wettbewerb und das Suchverhalten.'
            : `We already know what the competitive picture looks like here.`
        }
      />
    </>
  )
}
