import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { competitors, getCompetitor } from '@/lib/data'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, faqSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { ComparisonTable } from '@/components/aeo/ComparisonTable'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'
import { KeyTakeaways } from '@/components/aeo/KeyTakeaways'
import { CtaSection } from '@/components/conversion/CtaSection'
import { Reveal } from '@/components/motion/Reveal'

/**
 * Comparison page — SRS §3.2 /{country}/compare/{competitor}/, and one of the
 * ten keyword intent buckets in §10.1.
 *
 * The comparison table is a real semantic <table> for exactly this reason:
 * comparison content is among the most frequently extracted by AI answer
 * engines, and a div grid would be invisible to them.
 *
 * SRS uses the placeholder "agency-x" — real competitor names pending.
 */
export function generateStaticParams() {
  return countryCodes.flatMap((country) =>
    competitors.map((comp) => ({ country, competitor: comp.slug }))
  )
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; competitor: string }>
}): Promise<Metadata> {
  const { country, competitor } = await params
  if (!isCountryCode(country)) return {}

  const code = country as CountryCode
  const c = countries[code]
  const comp = getCompetitor(competitor)
  if (!comp) return {}

  return buildMetadata({
    country: code,
    path: `compare/${competitor}`,
    title: `Ft. Social Crew vs ${comp.name} | ${c.name}`,
    description: `An honest comparison of engagement model, reporting, commitment and cost — including where the alternative is the better choice.`,
    hreflangGroupId: `compare-${competitor}`,
  })
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ country: string; competitor: string }>
}) {
  const { country, competitor } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'

  const comp = getCompetitor(competitor)
  if (!comp) notFound()

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: isDe ? 'Vergleich' : 'Compare', href: `/${code}/compare/${competitor}/` },
  ]

  const faqs = [
    {
      question: `When is ${comp.name.toLowerCase()} the better choice?`,
      answer:
        competitor === 'in-house-hire'
          ? `Once the growth function is established and stable, a full-time hire is usually better value than a retained team — they carry institutional context, are always available, and cost less per hour at that stage. The fractional model is strongest while the function is still being built and the requirements are still moving.`
          : `If you have a clear, stable brief and simply need reliable channel execution against it, a traditional agency is often cheaper and perfectly adequate. Our model earns its cost when the brief itself is the open question.`,
    },
    {
      question: `What is the honest downside of working with us?`,
      answer: `We are not full-time and we are not in your building. If your constraint is genuinely one of availability and internal context rather than capability and range, a hire will serve you better and we will say so in the first conversation.`,
    },
    {
      question: `Can we start with one and switch?`,
      answer: `Frequently the right sequence. A number of clients engage us to build the function, document it, and then hire into it — at which point we hand over and step back. Everything is documented in a workspace you keep for exactly this reason.`,
    },
  ]

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(breadcrumbs), faqSchema(faqs))} />

      <PageHero
        country={code}
        eyebrow={isDe ? 'Vergleich' : 'Comparison'}
        title={`Ft. Social Crew vs ${comp.name.toLowerCase()}`}
        intro={`${comp.positioning}. Below is an honest comparison — including the cases where the alternative is genuinely the better decision.`}
        answer={`Compared with ${comp.name.toLowerCase()}, Ft. Social Crew differs mainly in engagement model, reporting methodology and commitment length. The alternative is better when the requirement is stable and clearly specified; ours is better when the brief itself is still an open question.`}
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <SectionHeader
          eyebrow={isDe ? 'Gegenüberstellung' : 'Side by side'}
          heading={isDe ? 'Direkter Vergleich' : 'The comparison, dimension by dimension'}
        />
        <div className="mt-10">
          <ComparisonTable
            caption={`Comparison of Ft. Social Crew and ${comp.name} across engagement model, reporting, commitment, documentation, scope and pricing transparency.`}
            usLabel="Ft. Social Crew"
            themLabel={comp.name}
            rows={comp.comparison}
          />
        </div>
      </Section>

      <Section surface="tint" deferred>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <SectionHeader
            eyebrow={isDe ? 'Ehrliche Einschätzung' : 'Being straight about it'}
            heading={
              isDe
                ? 'Wann die Alternative die bessere Wahl ist'
                : 'When you should choose the alternative'
            }
            subhead={`A comparison page that concludes we win every dimension is an advertisement, not a comparison. Here is where we genuinely do not.`}
          />
          <Reveal>
            <KeyTakeaways
              country={code}
              title="Choose the alternative when"
              items={
                competitor === 'in-house-hire'
                  ? [
                      'The growth function is already established and stable',
                      'You need someone in the building, full-time, every day',
                      'Institutional context matters more than breadth of capability',
                      'You have the four to six months a good hire actually takes',
                    ]
                  : [
                      'You have a clear, stable brief and need it executed reliably',
                      'A single channel is the whole requirement',
                      'Lowest cost per unit of execution is the priority',
                      'You already have the strategy and analytics capability in-house',
                    ]
              }
            />
          </Reveal>
        </div>
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
        eyebrow={isDe ? 'Entscheidungshilfe' : 'Deciding'}
        heading="Not sure which fits?"
        body="Tell us the situation. If a hire or a conventional agency is the better answer, we will say so — it costs us a proposal and saves you a year."
      />
    </>
  )
}
