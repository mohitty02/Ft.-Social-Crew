import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import {
  services as serviceDefs,
  resolveServiceSlug,
  isProgrammaticCityService,
} from '@/config/services'
import { industries as industryDefs } from '@/config/industries'
import { getServiceBySlug, getServices, getCityList } from '@/lib/data'
import { getTestimonials } from '@/content/testimonials'
import { buildMetadata, buildUrl } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, serviceSchema, faqSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { ProcessTimeline } from '@/components/content/ProcessTimeline'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'
import { KeyTakeaways } from '@/components/aeo/KeyTakeaways'
import { TestimonialCard } from '@/components/proof/TestimonialCard'
import { LeadForm } from '@/components/conversion/LeadForm'
import { CtaSection } from '@/components/conversion/CtaSection'
import { Pill } from '@/components/ui/Pill'
import { Icon } from '@/components/ui/Icon'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal'

/**
 * Service detail — URL /{country}/{service-slug}/ exactly per the SRS §3.2
 * table (e.g. /en-us/seo-services/), NOT nested under /services/.
 *
 * This is a money page (SRS §7.7), so it carries the full treatment: answer
 * block, FAQ + schema, proof, internal links out to industry and city
 * variants, and the SHORT lead form that SRS §15.1 specifies for service pages.
 */
export function generateStaticParams() {
  return countryCodes.flatMap((country) =>
    serviceDefs.map((def) => ({
      country,
      serviceSlug: resolveServiceSlug(def, country),
    }))
  )
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; serviceSlug: string }>
}): Promise<Metadata> {
  const { country, serviceSlug } = await params
  if (!isCountryCode(country)) return {}

  const code = country as CountryCode
  const c = countries[code]
  const service = await getServiceBySlug(code, serviceSlug)
  if (!service) return {}

  // SRS §7.4 requires local spelling, so the slug itself differs between
  // markets. Resolve each country's real slug or hreflang points at a 404.
  const def = serviceDefs.find((s) => resolveServiceSlug(s, code) === serviceSlug)

  return buildMetadata({
    country: code,
    path: serviceSlug,
    pathFor: def ? (target) => resolveServiceSlug(def, target) : undefined,
    title: `${service.title} in ${c.name} | ${c.positioning}`,
    description: service.seo.description,
    // SRS §7.1 — groups this page with its equivalents in the other markets.
    hreflangGroupId: service.seo.hreflangGroupId,
  })
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ country: string; serviceSlug: string }>
}) {
  const { country, serviceSlug } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'

  const service = await getServiceBySlug(code, serviceSlug)
  if (!service) notFound()

  const [allServices, cities] = await Promise.all([getServices(code), getCityList(code)])

  // Does this service have city × service pages generated? (SRS §7.7)
  const baseDef = serviceDefs.find((s) => resolveServiceSlug(s, code) === serviceSlug)
  const hasCityPages = baseDef ? isProgrammaticCityService(baseDef.slug) : false
  const testimonials = getTestimonials(code).slice(0, 2)
  const related = allServices.filter((s) => s.slug !== service.slug).slice(0, 3)

  // Internal linking — SRS §11.2 proof layer plus §7.7 priority signals
  // toward money pages. Industry × service and city × service variants.
  const relevantIndustries = industryDefs
    .filter((i) => i.primaryServices.includes(serviceDefs.find((s) => resolveServiceSlug(s, code) === serviceSlug)?.slug ?? ''))
    .slice(0, 6)

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: isDe ? 'Leistungen' : 'Services', href: `/${code}/services/` },
    { name: service.title, href: `/${code}/${service.slug}/` },
  ]

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(breadcrumbs),
          serviceSchema({
            country: code,
            name: service.title,
            description: service.summary,
            url: buildUrl(code, service.slug),
            serviceType: service.title,
          }),
          faqSchema(service.faqs)
        )}
      />

      <PageHero
        country={code}
        eyebrow={service.title}
        title={
          isDe
            ? `${service.title} für den Mittelstand`
            : `${service.title} in ${c.name}`
        }
        intro={service.summary}
        answer={service.answer}
        breadcrumbs={breadcrumbs}
      />

      {/* Outcomes — market-specific, from the country record */}
      <Section surface="paper">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Pill variant="outline" size="md">
              {isDe ? 'Ergebnis' : 'What you get'}
            </Pill>
            <h2 className="mt-6 font-display text-h2 text-[color:var(--text-brand)]">
              {isDe
                ? 'Was diese Leistung konkret liefert'
                : 'What this actually delivers'}
            </h2>
            <ul className="mt-8 space-y-5">
              {service.outcomes.map((o) => (
                <li key={o} className="flex gap-3.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-body text-ink-600">{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal>
            <div className="rounded-lg border border-ink/10 bg-paper-pure p-7 sm:p-9">
              <h3 className="font-tight text-eyebrow uppercase text-accent">
                {isDe ? 'Leistungsumfang' : 'Deliverables'}
              </h3>
              <ul className="mt-6 space-y-4">
                {service.deliverables.map((d, i) => (
                  <li key={d} className="flex gap-4 border-b border-ink/10 pb-4 last:border-0 last:pb-0">
                    <span className="tabular shrink-0 font-display text-small text-gold-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-body text-ink-600">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Method — SRS §23.2/§23.5 both require transparent process docs */}
      <Section surface="tint" deferred>
        <SectionHeader
          eyebrow={isDe ? 'Vorgehensweise' : 'Method'}
          heading={
            isDe
              ? 'Vier Phasen, dokumentiert und nachvollziehbar'
              : 'Four stages, documented end to end'
          }
          subhead={
            isDe
              ? 'Dieselbe Vorgehensweise in allen Projekten. Reproduzierbarkeit ist der Punkt.'
              : 'The same method on every engagement. Repeatability is the point.'
          }
        />
        <div className="mt-12">
          <ProcessTimeline steps={service.process} />
        </div>
      </Section>

      {/* Internal linking: industry × service, per SRS §3.2 */}
      {relevantIndustries.length > 0 && (
        <Section surface="white" deferred>
          <SectionHeader
            eyebrow={isDe ? 'Branchen' : 'By industry'}
            heading={
              isDe
                ? `${service.title} nach Branche`
                : `${service.title} for specific sectors`
            }
            subhead={
              isDe
                ? 'Kaufprozesse und Compliance-Anforderungen unterscheiden sich je Branche erheblich.'
                : 'Buying cycles, compliance constraints and search behaviour differ sharply between sectors.'
            }
          />
          <StaggerGroup className="mt-10 grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {relevantIndustries.map((ind) => (
              <StaggerItem key={ind.slug} className="bg-paper-pure">
                <Link
                  href={`/${code}/industries/${ind.slug}/${service.slug}/`}
                  className="group flex items-center justify-between gap-4 p-6 transition-colors duration-base hover:bg-accent-soft"
                >
                  <span className="flex items-center gap-3.5">
                    <Icon name={ind.icon} className="h-5 w-5 text-accent" />
                    <span className="text-body text-[color:var(--text-brand)]">
                      {service.title} for {ind.name}
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
      )}

      {/* Internal linking: city × service, per SRS §3.2.
          Only rendered for services that actually have city pages — SRS §7.7
          restricts programmatic generation to money pages, so linking the full
          taxonomy here would point at URLs that were deliberately not built.
          Services without city pages link to the locations hub instead. */}
      {hasCityPages ? (
        <Section surface="paper" deferred>
          <SectionHeader
            eyebrow={isDe ? 'Standorte' : 'By location'}
            heading={
              isDe
                ? `${service.title} nach Standort`
                : `${service.title} by city`
            }
          />
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {cities.map((city, i) => (
              <li key={city.slug}>
                <Link
                  href={`/${code}/locations/${city.slug}/${service.slug}/`}
                  className={`inline-flex items-center rounded-pill px-4 py-2 font-tight text-small transition-colors duration-base ${
                    i % 2 === 0
                      ? 'bg-burgundy-100 text-[color:var(--text-brand)] hover:bg-burgundy-200'
                      : 'border border-accent-line text-[color:var(--text-brand)] hover:bg-accent-soft'
                  }`}
                >
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : (
        <Section surface="paper" deferred>
          <SectionHeader
            eyebrow={isDe ? 'Standorte' : 'By location'}
            heading={
              isDe
                ? `${service.title} in ganz Deutschland`
                : `${service.title} across ${c.name}`
            }
            subhead={
              isDe
                ? `Wir betreuen ${cities.length} Standorte in Deutschland.`
                : `We work across ${cities.length} markets in ${c.name}, each planned separately.`
            }
          />
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {cities.map((city, i) => (
              <li key={city.slug}>
                <Link
                  href={`/${code}/locations/${city.slug}/`}
                  className={`inline-flex items-center rounded-pill px-4 py-2 font-tight text-small transition-colors duration-base ${
                    i % 2 === 0
                      ? 'bg-burgundy-100 text-[color:var(--text-brand)] hover:bg-burgundy-200'
                      : 'border border-accent-line text-[color:var(--text-brand)] hover:bg-accent-soft'
                  }`}
                >
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Proof */}
      <Section surface="tint" deferred>
        <SectionHeader
          eyebrow={isDe ? 'Kundenstimmen' : 'Proof'}
          heading={isDe ? 'Rückmeldungen' : 'What clients report'}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </Section>

      {/* FAQ + SHORT form — SRS §15.1 specifies short-form on service pages */}
      <Section surface="white" deferred>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="FAQ"
              heading={isDe ? 'Häufige Fragen' : 'Questions about this service'}
            />
            <div className="mt-8">
              <FaqAccordion faqs={service.faqs} />
            </div>
          </div>

          <Reveal>
            <div className="rounded-xl border border-accent-line bg-burgundy-100/25 p-7 sm:p-9">
              <h2 id="service-form-heading" className="font-display text-h3 text-[color:var(--text-brand)]">
                {isDe ? 'Kurz anfragen' : 'Quick enquiry'}
              </h2>
              <p className="mt-2.5 text-small text-ink-600">
                {isDe
                  ? 'Drei Felder. Wir melden uns innerhalb eines Werktages.'
                  : 'Three fields. We reply within one business day.'}
              </p>
              <LeadForm
                country={code}
                variant="short"
                formId={`service-${service.slug}`}
                className="mt-7"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Related services — cluster interlinking, SRS §11.2 */}
      <Section surface="paper" deferred>
        <SectionHeader
          eyebrow={isDe ? 'Weitere Leistungen' : 'Related services'}
          heading={
            isDe ? 'Häufig gemeinsam beauftragt' : 'Usually engaged alongside this'
          }
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {related.map((s) => (
            <Link
              key={s.id}
              href={`/${code}/${s.slug}/`}
              className="group bg-paper-pure p-7 transition-colors duration-base hover:bg-accent-soft"
            >
              <Icon name={s.icon} className="h-5 w-5 text-accent" />
              <h3 className="mt-5 font-display text-h4 text-[color:var(--text-brand)]">{s.title}</h3>
              <span className="mt-4 inline-flex items-center gap-1.5 text-small text-[color:var(--text-brand)]">
                {isDe ? 'Ansehen' : 'View service'}
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
        eyebrow={isDe ? 'Nächster Schritt' : 'Next step'}
        heading={
          isDe
            ? `${service.title}: Prozessanalyse anfordern`
            : `Talk to us about ${service.title.toLowerCase()}`
        }
        body={
          isDe
            ? 'Wir beginnen mit der Aufnahme des Ist-Zustands — nicht mit einem Angebot.'
            : `We will start by telling you whether ${service.title.toLowerCase()} is genuinely where your constraint sits.`
        }
      />
    </>
  )
}
