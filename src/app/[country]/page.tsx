import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { countryHome } from '@/content/countries'
import { getServices, getIndustries, getCaseStudies, getCityList } from '@/lib/data'
import { getTestimonials } from '@/content/testimonials'
import { editorial } from '@/config/media'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, faqSchema, breadcrumbSchema, serviceSchema } from '@/lib/seo/schema'
import { buildUrl } from '@/lib/seo/metadata'

import { JsonLd } from '@/components/seo/JsonLd'
import { Section, SectionHeader } from '@/components/layout/Section'
import { HeroCountry } from '@/components/hero/HeroCountry'
import { Pill, PillRow } from '@/components/ui/Pill'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { StatStrip } from '@/components/proof/StatStrip'
import { TestimonialCard } from '@/components/proof/TestimonialCard'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'
import { CtaSection } from '@/components/conversion/CtaSection'
import { ServiceCard, CaseStudyCard, IndustryCard } from '@/components/content/Cards'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal'

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
  const content = countryHome[code]

  return buildMetadata({
    country: code,
    title: `${c.positioning} in ${c.name}`,
    // SRS §7.4 — unique description per country variant, drawn from the
    // market's own answer statement rather than a shared template.
    description: content.answer.slice(0, 158),
    hreflangGroupId: 'home',
    image: c.heroImage,
    keywords: [c.positioning, ...c.positioningAlt],
  })
}

export default async function CountryHomePage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const content = countryHome[code]
  const isDe = code === 'de'

  const [services, industries, caseStudies, cities] = await Promise.all([
    getServices(code),
    getIndustries(code),
    getCaseStudies(code),
    getCityList(code),
  ])
  const testimonials = getTestimonials(code)

  return (
    <>
      <JsonLd
        data={graph(
          faqSchema(content.faqs),
          breadcrumbSchema([{ name: c.name, href: `/${code}/` }]),
          ...services.slice(0, 4).map((s) =>
            serviceSchema({
              country: code,
              name: s.title,
              description: s.summary,
              url: buildUrl(code, s.slug),
              serviceType: s.title,
            })
          )
        )}
      />

      <HeroCountry country={code} />

      {/* ── Positioning argument. This is the section that makes each
             country feel like a different company, per SRS §2.2. ── */}
      <Section surface="white">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Pill variant="outline" size="md">
              {content.positioningSection.eyebrow}
            </Pill>
            <h2 className="mt-6 font-display text-h2 text-burgundy-700">
              {content.positioningSection.heading}
            </h2>
            <div className="mt-6 space-y-4">
              {content.positioningSection.body.map((p) => (
                <p key={p.slice(0, 24)} className="max-w-prose text-body text-ink-600">
                  {p}
                </p>
              ))}
            </div>
            <Button
              href={`/${code}/about/`}
              variant="tertiary"
              size="md"
              className="mt-7"
              withArrow
            >
              {isDe ? 'Vorgehensweise ansehen' : 'See how we work'}
            </Button>
          </div>

          <StaggerGroup className="grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {content.positioningSection.points.map((point) => (
              <StaggerItem key={point.title} className="bg-paper-pure p-7">
                <Check className="h-5 w-5 text-gold-700" aria-hidden="true" />
                <h3 className="mt-5 font-display text-h4 text-burgundy-700">
                  {point.title}
                </h3>
                <p className="mt-2.5 text-small text-ink-600">{point.description}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Section>

      {/* ── Services ── */}
      <Section surface="tint" deferred>
        <SectionHeader
          eyebrow={isDe ? 'Leistungen' : 'Services'}
          heading={content.servicesHeading}
          subhead={content.servicesSubhead}
        />

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <StaggerItem key={service.id}>
              <ServiceCard
                href={`/${code}/${service.slug}/`}
                title={service.title}
                summary={service.summary}
                icon={<Icon name={service.icon} />}
                index={i}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10">
          <Button href={`/${code}/services/`} variant="secondary" size="md" withArrow>
            {isDe ? 'Alle Leistungen' : 'All services'}
          </Button>
        </div>
      </Section>

      {/* ── Proof: case studies ── */}
      <Section surface="paper" deferred>
        <SectionHeader
          eyebrow={isDe ? 'Referenzen' : 'Selected work'}
          heading={content.proofHeading}
          subhead={content.proofSubhead}
        />

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2">
          {caseStudies.slice(0, 4).map((cs) => (
            <StaggerItem key={cs.id}>
              <CaseStudyCard
                href={`/${code}/case-studies/${cs.slug}/`}
                title={cs.title}
                industry={cs.industry.replace(/-/g, ' ')}
                headlineMetric={cs.results[0].metric}
                metricLabel={cs.results[0].label}
                image={cs.image}
                isPlaceholder={cs.isPlaceholder}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* ── Trust — SRS §23, different signals per market ── */}
      <Section surface="invert" deferred>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Pill variant="invert" size="md">
              {isDe ? 'Vertrauen' : 'Trust'}
            </Pill>
            <h2 className="mt-6 font-display text-h2 text-burgundy-100">
              {content.trustHeading}
            </h2>
            <ul className="mt-8 space-y-5">
              {content.trustPoints.map((point) => (
                <li key={point} className="flex gap-3.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                  <span className="text-body text-burgundy-100/80">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={editorial.meeting}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* ── Industries — SRS §24 gives us 14 documented verticals ── */}
      <Section surface="white" deferred>
        <SectionHeader
          eyebrow={isDe ? 'Branchen' : 'Industries'}
          heading={
            isDe
              ? 'Vierzehn Branchen mit dokumentierter Vorgehensweise'
              : 'Fourteen sectors we know the buying process for'
          }
          subhead={
            isDe
              ? 'Jede Branche hat eigene Kaufprozesse, Compliance-Anforderungen und Suchmuster. Wir starten nicht bei null.'
              : 'Each vertical has its own buying cycle, compliance constraints and search behaviour. We do not start from a blank page in any of them.'
          }
        />

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.slice(0, 6).map((industry) => (
            <StaggerItem key={industry.id}>
              <IndustryCard
                href={`/${code}/industries/${industry.slug}/`}
                name={industry.name}
                painPoint={industry.painPoints[0]}
                image={industry.image}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10">
          <Button href={`/${code}/industries/`} variant="secondary" size="md" withArrow>
            {isDe ? 'Alle Branchen' : 'All fourteen industries'}
          </Button>
        </div>
      </Section>

      {/* ── Testimonials ── */}
      <Section surface="tint" deferred>
        <SectionHeader
          eyebrow={isDe ? 'Kundenstimmen' : 'What clients say'}
          heading={
            isDe
              ? 'Rückmeldungen aus laufenden Projekten'
              : 'In their words, not ours'
          }
        />

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <TestimonialCard testimonial={t} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10">
          <Button href={`/${code}/testimonials/`} variant="secondary" size="md" withArrow>
            {isDe ? 'Alle Kundenstimmen' : 'All testimonials'}
          </Button>
        </div>
      </Section>

      {/* ── Locations ── */}
      <Section surface="paper" deferred>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <div>
            <Pill variant="outline" size="md">
              {isDe ? 'Standorte' : 'Locations'}
            </Pill>
            <h2 className="mt-6 font-display text-h2 text-burgundy-700">
              {isDe
                ? `Standortspezifisch statt bundesweit einheitlich`
                : `${cities.length} markets, planned individually`}
            </h2>
            <p className="mt-5 max-w-prose text-body text-ink-600">
              {isDe
                ? 'Wettbewerbsintensität und Suchverhalten unterscheiden sich je Standort erheblich. Wir planen Kampagnen und Inhalte entsprechend.'
                : `Competitive intensity and search behaviour differ sharply between markets in ${c.name}. We build for each one specifically rather than applying a single national strategy.`}
            </p>
            <Button
              href={`/${code}/locations/`}
              variant="secondary"
              size="md"
              className="mt-7"
              withArrow
            >
              {isDe ? 'Alle Standorte' : 'Explore locations'}
            </Button>
          </div>

          <PillRow items={cities.map((city) => city.name)} />
        </div>
      </Section>

      {/* ── FAQ — SRS §9.2 AEO ── */}
      <Section surface="white" deferred>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Pill variant="outline" size="md">
              FAQ
            </Pill>
            <h2 className="mt-6 font-display text-h2 text-burgundy-700">
              {isDe ? 'Häufige Fragen' : 'Questions we get asked'}
            </h2>
            <p className="mt-5 text-body text-ink-600">
              {isDe
                ? 'Direkte Antworten ohne Verkaufssprache.'
                : 'Direct answers, no sales language.'}
            </p>
          </div>
          <Reveal>
            <FaqAccordion faqs={content.faqs} />
          </Reveal>
        </div>
      </Section>

      <CtaSection
        country={code}
        eyebrow={isDe ? 'Nächster Schritt' : 'Next step'}
        heading={content.ctaHeading}
        body={content.ctaBody}
      />
    </>
  )
}
