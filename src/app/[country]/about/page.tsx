import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Check } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { countryHome } from '@/content/countries'
import { authors } from '@/content/authors'
import { getServices } from '@/lib/data'
import { editorial } from '@/config/media'
import { site } from '@/config/site'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, faqSchema, personSchema, organizationSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { ProcessTimeline } from '@/components/content/ProcessTimeline'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'
import { StatStrip } from '@/components/proof/StatStrip'
import { CtaSection } from '@/components/conversion/CtaSection'
import { Pill } from '@/components/ui/Pill'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal'

/**
 * About — the primary E-E-A-T surface.
 *
 * Carries the methodology (SRS §23.5 "process documentation as proof of
 * rigour", §23.2 "transparent process documentation"), the team with Person
 * schema (SRS §7.6), and the single-domain global model that SRS §1.10 names
 * as a competitive advantage.
 */
export function generateStaticParams() {
  return countryCodes.map((country) => ({ country }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>
}): Promise<Metadata> {
  const { country } = await params
  if (!isCountryCode(country)) return {}
  const code = country as CountryCode
  const c = countries[code]

  return buildMetadata({
    country: code,
    path: 'about',
    title: `About | ${c.positioning} in ${c.name}`,
    description: `How Ft. Social Crew works: one team across six markets, a documented four-stage method, and evidence standards that do not change between countries.`,
    hreflangGroupId: 'about',
  })
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'
  const services = await getServices(code)
  const method = services[0].process

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: isDe ? 'Über uns' : 'About', href: `/${code}/about/` },
  ]

  const faqs = [
    {
      question: isDe ? 'Wie ist das Unternehmen aufgestellt?' : 'How is the company structured?',
      answer: isDe
        ? 'Ein Team, sechs Märkte, eine gemeinsame Plattform. Regionale Ansprechpartner mit einheitlichen Qualitätsstandards.'
        : `One team operating across six markets from a single platform. Each market has its own positioning, proof and pricing model — but the standard of evidence does not change between them.`,
    },
    {
      question: isDe
        ? 'Warum eine Domain statt länderspezifischer Domains?'
        : 'Why one domain rather than separate country sites?',
      answer: isDe
        ? 'Autorität und Vertrauenssignale kumulieren über alle Ländermärkte hinweg, statt sich auf mehrere Domains zu verteilen, die jeweils bei null beginnen.'
        : `Authority, link equity and brand signals compound across every country folder instead of fragmenting across separate domains that each start from zero. It also means one codebase, one analytics stack and one source of truth.`,
    },
    {
      question: isDe ? 'Was unterscheidet Ihre Vorgehensweise?' : 'What actually differentiates the approach?',
      answer: isDe
        ? 'Die Ist-Aufnahme steht vor der Werkzeugauswahl, und jede Kennzahl nennt Zeitraum, Ausgangswert und Messmethode.'
        : `Diagnosis before prescription, and every metric carrying its timeframe, baseline and attribution method. Neither is remarkable in principle; both are rare in practice.`,
    },
  ]

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(breadcrumbs),
          faqSchema(faqs),
          organizationSchema(),
          ...authors.map(personSchema)
        )}
      />

      <PageHero
        eyebrow={isDe ? 'Über uns' : 'About'}
        title={
          isDe
            ? 'Ein Team. Sechs Märkte. Ein Qualitätsstandard.'
            : 'One team, six markets, one standard of evidence'
        }
        intro={
          isDe
            ? 'Wir arbeiten in sechs Ländern von einer gemeinsamen Plattform aus. Die Positionierung unterscheidet sich je Markt, weil die Käufer sich unterscheiden. Der Nachweisstandard nicht.'
            : `We operate in six countries from one platform. The argument changes in each market because the buyer changes — the standard of proof behind it does not.`
        }
        answer={
          isDe
            ? `Ft. Social Crew ist seit ${site.foundedYear} in sechs Märkten tätig — Indien, USA, Kanada, Australien, Deutschland und den VAE — mit einer gemeinsamen Plattform, einer dokumentierten Vorgehensweise und marktspezifischer Positionierung.`
            : `Ft. Social Crew has operated since ${site.foundedYear} across six markets — India, the United States, Canada, Australia, Germany and the United Arab Emirates — from a single platform, with a documented four-stage method and market-specific positioning in each.`
        }
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Pill variant="outline" size="md">
              {isDe ? 'Auftrag' : 'Mission'}
            </Pill>
            <h2 className="mt-6 font-display text-h2 text-burgundy-700">
              {isDe
                ? 'Sichtbarkeit, Vertrauen und qualifizierte Pipeline — kumulativ aufgebaut'
                : 'Compounding visibility, trust and qualified pipeline'}
            </h2>
            <p className="mt-6 max-w-prose text-body text-ink-600">
              {isDe
                ? 'Unsere Aufgabe ist es, in jedem Markt organische Sichtbarkeit, Vertrauen und qualifizierte Anfragen kontinuierlich aufzubauen — über eine Plattformarchitektur, die einmal geleistete Arbeit über Märkte hinweg vervielfacht.'
                : `Our job is to build and continuously compound organic visibility, trust and qualified pipeline in every country we operate in — through a platform architecture that turns work done once into value multiplied across markets.`}
            </p>
            <p className="mt-5 max-w-prose text-body text-ink-600">
              {isDe
                ? 'Das ist kein Slogan, sondern eine Architekturentscheidung: eine Domain, eine Codebasis, ein Analytics-Stack.'
                : `That is an architectural claim rather than a slogan: one domain, one codebase, one analytics stack, six genuinely different arguments.`}
            </p>
          </div>
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-burgundy-100">
              <Image
                src={editorial.founders}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <StatStrip
          className="mt-16"
          stats={[
            { value: '6', label: isDe ? 'Märkte' : 'Markets', detail: isDe ? 'Aktiv betreut' : 'Actively served' },
            { value: '14', label: isDe ? 'Branchen' : 'Sectors', detail: isDe ? 'Dokumentierte Vorgehensweisen' : 'Documented playbooks' },
            { value: '10', label: isDe ? 'Leistungsbereiche' : 'Core services', detail: isDe ? 'Gemeinsam geplant' : 'Planned as one system' },
            { value: String(new Date().getFullYear() - site.foundedYear), label: isDe ? 'Jahre' : 'Years', detail: isDe ? `Seit ${site.foundedYear}` : `Operating since ${site.foundedYear}` },
          ]}
        />
      </Section>

      {/* Methodology — SRS §23.2 / §23.5 both require this as a trust asset */}
      <Section surface="invert" deferred>
        <SectionHeader
          eyebrow={isDe ? 'Vorgehensweise' : 'Method'}
          heading={
            isDe
              ? 'Vier Phasen, in jedem Projekt identisch'
              : 'Four stages, identical on every engagement'
          }
          subhead={
            isDe
              ? 'Reproduzierbarkeit ist der Punkt. Eine Vorgehensweise, die sich je Projekt ändert, ist keine Vorgehensweise.'
              : 'Repeatability is the point. A method that changes per engagement is not a method, it is improvisation with a diagram.'
          }
          invert
        />
        <div className="mt-12">
          <ProcessTimeline steps={method} invert />
        </div>
      </Section>

      {/* Positioning across markets — SRS §2, made explicit */}
      <Section surface="white" deferred>
        <SectionHeader
          eyebrow={isDe ? 'Märkte' : 'Markets'}
          heading={
            isDe
              ? 'Warum die Positionierung je Markt unterschiedlich ist'
              : 'Why we say something different in each market'
          }
          subhead={
            isDe
              ? 'Positionierung ist keine Übersetzung. Jeder Markt sucht mit einem eigenen Vokabular nach der Lösung seines Problems.'
              : 'Positioning is not translation. Each market searches for, and trusts, a different vocabulary for who solves this problem.'
          }
        />
        <StaggerGroup className="mt-12 grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(countries).map((country) => (
            <StaggerItem key={country.code} className="bg-paper-pure p-7">
              <p className="font-tight text-eyebrow uppercase text-gold-700">
                {country.name}
              </p>
              <h3 className="mt-3 font-display text-h4 text-burgundy-700">
                {country.positioning}
              </h3>
              <p className="mt-3 text-small text-ink-600">
                {country.positioningRationale}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* Team — Person schema, E-E-A-T expertise */}
      <Section surface="paper" deferred>
        <SectionHeader
          eyebrow={isDe ? 'Team' : 'Team'}
          heading={isDe ? 'Wer die Arbeit macht' : 'Who does the work'}
          subhead={
            isDe
              ? 'Die Personen im Erstgespräch sind die Personen im Projekt.'
              : 'The people in the first meeting are the people on the engagement.'
          }
        />
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <StaggerItem
              key={author.id}
              className="rounded-lg border border-ink/10 bg-paper-pure p-7"
            >
              <Image
                src={author.image}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 rounded-pill object-cover"
              />
              <h3 className="mt-5 font-display text-h4 text-burgundy-700">
                {author.name}
              </h3>
              <p className="mt-1 font-tight text-eyebrow uppercase text-gold-700">
                {author.role}
              </p>
              <p className="mt-4 text-small text-ink-600">{author.bio}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {author.expertise.slice(0, 3).map((e, i) => (
                  <li key={e}>
                    <span
                      className={`inline-flex rounded-pill px-3 py-1 text-[0.6875rem] uppercase tracking-[0.08em] ${
                        i % 2 === 0
                          ? 'bg-burgundy-100 text-burgundy-700'
                          : 'border border-gold-300 text-burgundy-700'
                      }`}
                    >
                      {e}
                    </span>
                  </li>
                ))}
              </ul>
              {author.isPlaceholder && (
                <p className="mt-5 border-t border-ink/10 pt-3 text-[0.6875rem] uppercase tracking-[0.08em] text-ink-300">
                  Placeholder profile — pending client detail
                </p>
              )}
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* Trust points from the market record */}
      <Section surface="tint" deferred>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <SectionHeader
            eyebrow={isDe ? 'Vertrauen' : 'Trust'}
            heading={countryHome[code].trustHeading}
          />
          <ul className="space-y-5">
            {countryHome[code].trustPoints.map((p) => (
              <li key={p} className="flex gap-3.5">
                <Check className="mt-1 h-4 w-4 shrink-0 text-gold-700" aria-hidden="true" />
                <span className="text-body text-ink-600">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section surface="white" deferred>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="FAQ" heading={isDe ? 'Häufige Fragen' : 'About the company'} />
          <Reveal>
            <FaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </Section>

      <CtaSection
        country={code}
        eyebrow={isDe ? 'Zusammenarbeit' : 'Working together'}
        heading={countryHome[code].ctaHeading}
        body={countryHome[code].ctaBody}
      />
    </>
  )
}
