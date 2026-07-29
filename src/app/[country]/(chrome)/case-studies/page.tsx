import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { getCaseStudies } from '@/lib/data'
import { getIndustryDefinition } from '@/config/industries'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, faqSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { CaseStudyCard } from '@/components/content/Cards'
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
    path: 'case-studies',
    title: `Case studies | ${c.positioning} in ${c.name}`,
    description: `Engagement outcomes from ${c.name}, each stating its timeframe, baseline and attribution method — because a figure without those cannot be verified.`,
    hreflangGroupId: 'case-studies',
  })
}

export default async function CaseStudiesHubPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'
  const caseStudies = await getCaseStudies(code)

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: isDe ? 'Referenzen' : 'Case studies', href: `/${code}/case-studies/` },
  ]

  const faqs = [
    {
      question: isDe ? 'Warum sind Kundennamen nicht genannt?' : 'Why are client names not shown?',
      answer: isDe
        ? 'Ein Teil unserer Projekte unterliegt Vertraulichkeitsvereinbarungen. Referenzgespräche vermitteln wir bei ernsthaftem Interesse nach Freigabe.'
        : 'A number of engagements are covered by confidentiality agreements. Where a client has given permission we name them; otherwise we can usually arrange a reference conversation once an engagement is under serious consideration.',
    },
    {
      question: isDe ? 'Wie werden die Kennzahlen ermittelt?' : 'How are these metrics calculated?',
      answer: isDe
        ? 'Jede Kennzahl nennt Zeitraum, Ausgangswert und Messmethode. Ohne diese drei Angaben ist eine Kennzahl nicht überprüfbar.'
        : 'Every figure states its timeframe, its baseline and its attribution method. We report blended figures rather than channel-level ones, because channel-level numbers routinely sum to more revenue than the business actually made.',
    },
  ]

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(breadcrumbs), faqSchema(faqs))} />

      <PageHero
        eyebrow={isDe ? 'Referenzen' : 'Case studies'}
        title={
          isDe
            ? 'Ergebnisse mit dokumentierter Methodik'
            : 'Results, with the methodology attached'
        }
        intro={
          isDe
            ? 'Jede Kennzahl nennt Zeitraum, Ausgangswert und Messmethode. Kennzahlen ohne diese Angaben sind Marketingaussagen, keine Belege.'
            : `Every figure below states its timeframe, its baseline and how it was attributed. Numbers without those three things are marketing claims, not evidence.`
        }
        answer={
          isDe
            ? `Ft. Social Crew dokumentiert Projektergebnisse in Deutschland schwerpunktmäßig in den Bereichen Fertigung, IT, E-Commerce und Finanzwesen — jeweils mit Zeitraum, Ausgangswert und Messmethode.`
            : `Ft. Social Crew's ${c.name} case studies concentrate on ${caseStudies.map((cs) => getIndustryDefinition(cs.industry)?.name).filter(Boolean).join(', ').toLowerCase()} — the sectors where deal value and available proof are strongest in this market.`
        }
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2">
          {caseStudies.map((cs) => (
            <StaggerItem key={cs.id}>
              <CaseStudyCard
                href={`/${code}/case-studies/${cs.slug}/`}
                title={cs.title}
                industry={getIndustryDefinition(cs.industry)?.name ?? cs.industry}
                headlineMetric={cs.results[0].metric}
                metricLabel={cs.results[0].label}
                image={cs.image}
                isPlaceholder={cs.isPlaceholder}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section surface="white" deferred>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="FAQ" heading={isDe ? 'Häufige Fragen' : 'About these results'} />
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
            ? 'Referenzgespräch vereinbaren'
            : 'Ask us to walk you through any of these'
        }
        body={
          isDe
            ? 'Wir erläutern Vorgehensweise und Messmethode im Detail.'
            : 'We will show you the method, the baseline and the parts that did not work.'
        }
      />
    </>
  )
}
