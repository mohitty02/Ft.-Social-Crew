import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { getCityList } from '@/lib/data'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, faqSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { CityCard } from '@/components/content/Cards'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'
import { CtaSection } from '@/components/conversion/CtaSection'
import { StaggerGroup, StaggerItem, Reveal } from '@/components/motion/Reveal'

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
    path: 'locations',
    title: `Locations | ${c.positioning} across ${c.name}`,
    description: `Local market knowledge across ${c.name}. Competitive intensity and search behaviour differ by city, so we plan for each one specifically.`,
    hreflangGroupId: 'locations',
  })
}

export default async function LocationsHubPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'
  const cities = await getCityList(code)

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: isDe ? 'Standorte' : 'Locations', href: `/${code}/locations/` },
  ]

  const faqs = [
    {
      question: isDe
        ? 'Warum standortspezifische Seiten statt einer bundesweiten Seite?'
        : 'Why city pages rather than one national page?',
      answer: isDe
        ? 'Wettbewerbsintensität, Suchvolumen und Suchbegriffe unterscheiden sich je Standort erheblich. Eine bundesweite Seite rankt in keinem Markt gut.'
        : `Competitive intensity, search volume and even the terms buyers use differ markedly between cities in ${c.name}. A single national page tends to rank moderately everywhere and strongly nowhere.`,
    },
    {
      question: isDe
        ? 'Arbeiten Sie auch außerhalb dieser Standorte?'
        : 'Do you work outside these cities?',
      answer: isDe
        ? 'Ja. Diese Standorte sind jene mit dokumentierter Marktkenntnis und belastbaren Referenzen.'
        : 'Yes. These are simply the markets where we hold documented local knowledge and relevant proof. Elsewhere we will tell you honestly how much of that transfers.',
    },
  ]

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(breadcrumbs), faqSchema(faqs))} />

      <PageHero
        eyebrow={isDe ? 'Standorte' : 'Locations'}
        title={
          isDe
            ? `${cities.length} Standorte, jeweils eigenständig geplant`
            : `${cities.length} markets across ${c.name}`
        }
        intro={
          isDe
            ? 'Für jeden Standort liegen dokumentierte Marktkenntnisse und lokale Referenzen vor. Kampagnen und Inhalte werden entsprechend standortspezifisch geplant.'
            : `Each of these markets gets its own plan. Competitive intensity, search behaviour and buyer vocabulary do not transfer between them.`
        }
        answer={
          isDe
            ? `Ft. Social Crew ist an ${cities.length} Standorten in Deutschland tätig: ${cities.map((x) => x.name).join(', ')} — jeweils mit standortspezifischer Suchstrategie.`
            : `Ft. Social Crew works across ${cities.length} markets in ${c.name}: ${cities.map((x) => x.name).join(', ')}. Each has a separately planned search and campaign strategy.`
        }
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <StaggerItem key={city.id}>
              <CityCard
                href={`/${code}/locations/${city.slug}/`}
                name={city.name}
                region={city.region}
                proofPoint={city.localProofPoint}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section surface="white" deferred>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="FAQ" heading={isDe ? 'Häufige Fragen' : 'Common questions'} />
          <Reveal>
            <FaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </Section>

      <CtaSection
        country={code}
        eyebrow={isDe ? 'Standorte' : 'Locations'}
        heading={isDe ? 'Wo sind Sie tätig?' : 'Where do you operate?'}
        body={
          isDe
            ? 'Wir sagen Ihnen, wie der Wettbewerb in Ihrem Markt tatsächlich aussieht.'
            : 'We will tell you what the competitive picture in your market actually looks like.'
        }
      />
    </>
  )
}
