import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { getIndustries } from '@/lib/data'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, faqSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { IndustryCard } from '@/components/content/Cards'
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
    path: 'industries',
    title: `Industries | ${c.positioning} in ${c.name}`,
    description: `Fourteen sectors with documented buyer personas, pain points and search behaviour — served in ${c.name} as ${c.positioning.toLowerCase()}.`,
    hreflangGroupId: 'industries',
  })
}

export default async function IndustriesHubPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'
  const industries = await getIndustries(code)

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: isDe ? 'Branchen' : 'Industries', href: `/${code}/industries/` },
  ]

  const faqs = [
    {
      question: isDe
        ? 'Warum ist Branchenerfahrung relevant?'
        : 'Why does sector experience actually matter?',
      answer: isDe
        ? 'Kaufprozesse, Compliance-Anforderungen und Suchverhalten unterscheiden sich zwischen Branchen erheblich. Ohne diese Kenntnis wird die erste Kampagne zum Lernbudget.'
        : 'Buying cycles, compliance constraints and search behaviour differ enormously between sectors. Without that knowledge the first campaign becomes a learning budget rather than a growth budget.',
    },
    {
      question: isDe
        ? 'Arbeiten Sie auch mit Branchen außerhalb dieser Liste?'
        : 'Do you work with sectors outside these fourteen?',
      answer: isDe
        ? 'Ja. Diese vierzehn sind die Bereiche mit dokumentierter Vorgehensweise und belastbaren Referenzen. Andere Branchen prüfen wir im Einzelfall.'
        : 'Yes. These fourteen are simply the sectors where we hold documented playbooks and relevant proof. For anything else we will tell you honestly how much of the approach transfers.',
    },
  ]

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(breadcrumbs), faqSchema(faqs))} />

      <PageHero
        eyebrow={isDe ? 'Branchen' : 'Industries'}
        title={
          isDe
            ? 'Vierzehn Branchen mit dokumentierter Vorgehensweise'
            : 'Fourteen sectors, each with its own playbook'
        }
        intro={
          isDe
            ? 'Für jede Branche liegen Käuferprofile, Problemstellungen, erforderliche Leistungen und Suchstrategien dokumentiert vor. Wir beginnen nicht bei null.'
            : 'For each of these we hold a documented buyer persona, the pain points that actually drive purchase, the services required, and the search strategy that reaches them.'
        }
        answer={
          isDe
            ? `Ft. Social Crew arbeitet in Deutschland mit vierzehn Branchen — von Fertigung und IT bis Finanzwesen und E-Commerce — jeweils mit dokumentierten Käuferprofilen und branchenspezifischer Suchstrategie.`
            : `Ft. Social Crew works across fourteen sectors in ${c.name}: healthcare, real estate, law firms, dentists, SaaS, IT services, manufacturing, construction, education, hospitality, finance, automotive, e-commerce and professional services.`
        }
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
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
        eyebrow={isDe ? 'Nächster Schritt' : 'Next step'}
        heading={
          isDe
            ? 'Sprechen wir über Ihre Branche'
            : 'Tell us which sector you operate in'
        }
        body={
          isDe
            ? 'Wir sagen Ihnen vorab, wie viel unserer Erfahrung tatsächlich übertragbar ist.'
            : 'We will tell you upfront how much of our experience genuinely transfers to your situation.'
        }
      />
    </>
  )
}
