import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { getResources } from '@/lib/data'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section } from '@/components/layout/Section'
import { ResourceCard } from '@/components/content/Cards'
import { CtaSection } from '@/components/conversion/CtaSection'
import { StaggerGroup, StaggerItem } from '@/components/motion/Reveal'

/**
 * Resources — SRS §11.1 targets 100 per country, and §23 assigns each market
 * a different flagship lead magnet: benchmark report (USA), ROI calculator
 * (Australia), whitepaper (Germany), growth playbook (India), readiness
 * framework (Canada), enterprise briefing (UAE).
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
    path: 'resources',
    title: `Resources — ${c.name}`,
    description: `${c.leadMagnet.title} and other practical tools for ${c.name} — guides, templates, checklists and calculators.`,
    hreflangGroupId: 'resources',
  })
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'
  const resources = await getResources(code)

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: isDe ? 'Ressourcen' : 'Resources', href: `/${code}/resources/` },
  ]

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(breadcrumbs))} />

      <PageHero
        country={code}
        eyebrow={isDe ? 'Ressourcen' : 'Resources'}
        title={
          isDe
            ? 'Werkzeuge, Vorlagen und Whitepaper'
            : 'Tools you can use without hiring us'
        }
        intro={
          isDe
            ? 'Dokumentierte Vorlagen und Leitfäden zur eigenständigen Anwendung.'
            : `Genuinely usable, not gated teasers. If a checklist solves your problem without an engagement, that is a good outcome.`
        }
        answer={
          isDe
            ? `Ft. Social Crew stellt für Deutschland Leitfäden, Vorlagen und Whitepaper zu Prozessautomatisierung, technischer SEO und Attributionsmodellen bereit — darunter ${c.leadMagnet.title}.`
            : `Ft. Social Crew publishes practical resources for ${c.name} including ${c.leadMagnet.title} — ${c.leadMagnet.description}`
        }
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <StaggerItem key={r.id}>
              <ResourceCard
                href={`/${code}/contact/`}
                title={r.title}
                description={r.description}
                format={r.format}
                image={r.image}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <CtaSection
        country={code}
        eyebrow={c.leadMagnet.format}
        heading={c.leadMagnet.title}
        body={c.leadMagnet.description}
      />
    </>
  )
}
