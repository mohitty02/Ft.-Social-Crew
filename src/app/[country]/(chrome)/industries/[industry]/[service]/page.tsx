import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { industries as industryDefs } from '@/config/industries'
import { services as serviceDefs, resolveServiceSlug, resolveServiceTitle } from '@/config/services'
import { getIndustryBySlug, getServiceBySlug, getTestimonialsByIndustry } from '@/lib/data'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo/schema'
import { buildUrl } from '@/lib/seo/metadata'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'
import { KeyTakeaways } from '@/components/aeo/KeyTakeaways'
import { TestimonialCard } from '@/components/proof/TestimonialCard'
import { ProcessTimeline } from '@/components/content/ProcessTimeline'
import { LeadForm } from '@/components/conversion/LeadForm'
import { CtaSection } from '@/components/conversion/CtaSection'
import { Reveal } from '@/components/motion/Reveal'

/**
 * Industry × Service — the long-tail intent template from SRS §3.4,
 * URL /{country}/industries/{industry}/{service}/ per SRS §3.2.
 *
 * SRS §11.3 quality gate is enforced structurally: this page can only render
 * because it has a unique industry proof point (from the §24 brief), a unique
 * introduction combining sector and service, a relevant testimonial, and
 * correct localised schema. Generated only for each industry's primary
 * services — combinations without genuine substance are not generated at all,
 * which is the crawl-budget discipline SRS §7.7 asks for.
 */
export function generateStaticParams() {
  return countryCodes.flatMap((country) =>
    industryDefs.flatMap((ind) =>
      ind.primaryServices.map((serviceSlug) => {
        const def = serviceDefs.find((s) => s.slug === serviceSlug)!
        return {
          country,
          industry: ind.slug,
          service: resolveServiceSlug(def, country),
        }
      })
    )
  )
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; industry: string; service: string }>
}): Promise<Metadata> {
  const { country, industry, service } = await params
  if (!isCountryCode(country)) return {}

  const code = country as CountryCode
  const c = countries[code]
  const ind = await getIndustryBySlug(code, industry)
  const svc = await getServiceBySlug(code, service)
  if (!ind || !svc) return {}

  // Service slug differs per market (SRS §7.4) — resolve per country.
  const def = serviceDefs.find((s) => resolveServiceSlug(s, code) === service)

  return buildMetadata({
    country: code,
    path: `industries/${industry}/${service}`,
    pathFor: def
      ? (target) => `industries/${industry}/${resolveServiceSlug(def, target)}`
      : undefined,
    title: `${svc.title} for ${ind.name} in ${c.name}`,
    description: `${svc.title} built specifically for ${ind.name.toLowerCase()} organisations in ${c.name}. ${ind.painPoints[0]}.`.slice(0, 158),
    hreflangGroupId: `ind-svc-${industry}-${service}`,
    image: ind.image,
  })
}

export default async function IndustryServicePage({
  params,
}: {
  params: Promise<{ country: string; industry: string; service: string }>
}) {
  const { country, industry, service } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'

  const ind = await getIndustryBySlug(code, industry)
  const svc = await getServiceBySlug(code, service)
  if (!ind || !svc) notFound()

  const def = industryDefs.find((i) => i.slug === industry)!
  const testimonials = getTestimonialsByIndustry(code, industry).slice(0, 1)

  const siblings = def.primaryServices
    .map((s) => serviceDefs.find((d) => d.slug === s))
    .filter(Boolean)
    .filter((d) => resolveServiceSlug(d!, code) !== service) as typeof serviceDefs

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: isDe ? 'Branchen' : 'Industries', href: `/${code}/industries/` },
    { name: ind.name, href: `/${code}/industries/${industry}/` },
    { name: svc.title, href: `/${code}/industries/${industry}/${service}/` },
  ]

  const answer = isDe
    ? `${svc.title} für ${ind.name}-Unternehmen in Deutschland adressiert vor allem ${ind.painPoints[0].toLowerCase()}. Die Vorgehensweise ist dokumentiert und DSGVO-konform.`
    : `${svc.title} for ${ind.name.toLowerCase()} organisations in ${c.name} addresses one problem in particular: ${ind.painPoints[0].toLowerCase()}. The approach combines ${ind.seoStrategy.toLowerCase()}.`

  const faqs = [
    {
      question: isDe
        ? `Wie unterscheidet sich ${svc.title} für ${ind.name} von der Standardvorgehensweise?`
        : `How is ${svc.title.toLowerCase()} for ${ind.name.toLowerCase()} different?`,
      answer: `${ind.seoStrategy}. ${isDe ? 'Zusätzlich gelten branchenspezifische Compliance-Anforderungen.' : `The sector's specific constraint — ${ind.painPoints[0].toLowerCase()} — shapes the entire plan rather than being handled as an afterthought.`}`,
    },
    {
      question: isDe
        ? 'Welche Ergebnisse sind realistisch?'
        : 'What results are realistic here?',
      answer: isDe
        ? 'Bezahlte Kanäle liefern innerhalb von Wochen belastbare Daten. Organische Maßnahmen wirken über Quartale. Jede Kennzahl nennt Zeitraum, Ausgangswert und Messmethode.'
        : `Paid channels produce measurable data within weeks; organic and authority work compounds over quarters. ${def.caseStudyIdea} is the shape of outcome this combination typically produces.`,
    },
    {
      question: isDe
        ? 'Welcher Lead-Magnet funktioniert in dieser Kombination?'
        : 'What lead magnet works for this combination?',
      answer: ind.leadMagnet,
    },
  ]

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(breadcrumbs),
          faqSchema(faqs),
          serviceSchema({
            country: code,
            name: `${svc.title} for ${ind.name}`,
            description: answer,
            url: buildUrl(code, `industries/${industry}/${service}`),
            serviceType: svc.title,
          })
        )}
      />

      <PageHero
        country={code}
        eyebrow={`${ind.name} · ${svc.title}`}
        title={
          isDe
            ? `${svc.title} für ${ind.name}`
            : `${svc.title} for ${ind.name.toLowerCase()}`
        }
        intro={
          isDe
            ? `Für ${ind.buyerPersona.toLowerCase()}. ${ind.seoStrategy}.`
            : `Built for ${ind.buyerPersona.toLowerCase()}. ${ind.seoStrategy}.`
        }
        answer={answer}
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeader
              eyebrow={isDe ? 'Problemstellung' : 'The constraint'}
              heading={
                isDe
                  ? `Was ${ind.name}-Unternehmen tatsächlich bremst`
                  : `What holds ${ind.name.toLowerCase()} back`
              }
            />
            <ul className="mt-8 space-y-5">
              {ind.painPoints.map((p) => (
                <li key={p} className="flex gap-3.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-body text-ink-600">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal>
            <KeyTakeaways
              country={code}
              title={isDe ? 'Leistungsumfang' : 'What this includes'}
              items={svc.deliverables.slice(0, 5)}
            />
          </Reveal>
        </div>
      </Section>

      <Section surface="tint" deferred>
        <SectionHeader
          eyebrow={isDe ? 'Vorgehensweise' : 'Method'}
          heading={isDe ? 'Vier dokumentierte Phasen' : 'Four documented stages'}
        />
        <div className="mt-12">
          <ProcessTimeline steps={svc.process} />
        </div>
      </Section>

      {testimonials.length > 0 && (
        <Section surface="white" deferred>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <SectionHeader
              eyebrow={isDe ? 'Nachweis' : 'Proof'}
              heading={isDe ? 'Aus dieser Branche' : 'From this sector'}
              subhead={ind.caseStudyIdea}
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
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeader eyebrow="FAQ" heading={isDe ? 'Häufige Fragen' : 'Questions'} />
            <div className="mt-8">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>
          <Reveal>
            <div className="rounded-xl border border-accent-line bg-burgundy-100/25 p-7 sm:p-9">
              <h2 className="font-display text-h3 text-[color:var(--text-brand)]">
                {isDe ? 'Kurz anfragen' : 'Quick enquiry'}
              </h2>
              <LeadForm
                country={code}
                variant="short"
                formId={`ind-svc-${industry}-${service}`}
                className="mt-7"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {siblings.length > 0 && (
        <Section surface="white" deferred>
          <SectionHeader
            eyebrow={isDe ? 'Weitere Leistungen' : 'Also for this sector'}
            heading={
              isDe
                ? `Weitere Leistungen für ${ind.name}`
                : `Other services for ${ind.name.toLowerCase()}`
            }
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-3">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/${code}/industries/${industry}/${resolveServiceSlug(s, code)}/`}
                className="group bg-paper-pure p-6 transition-colors duration-base hover:bg-accent-soft"
              >
                <h3 className="font-display text-h4 text-[color:var(--text-brand)]">
                  {resolveServiceTitle(s, code)}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-small text-[color:var(--text-brand)]">
                  {isDe ? 'Ansehen' : 'View'}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-base group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaSection
        country={code}
        eyebrow={`${ind.name} · ${svc.title}`}
        heading={
          isDe
            ? `${svc.title} für ${ind.name}: Erstgespräch`
            : `Discuss ${svc.title.toLowerCase()} for your ${ind.name.toLowerCase()} business`
        }
        body={
          isDe
            ? 'Wir kennen die branchenspezifischen Anforderungen bereits.'
            : 'We know the sector constraints already, so the first conversation starts further along.'
        }
      />
    </>
  )
}
