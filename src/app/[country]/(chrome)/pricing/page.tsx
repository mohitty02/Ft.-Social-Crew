import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { getPricing } from '@/lib/data'
import { formatCurrency } from '@/lib/i18n/format'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, faqSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'
import { LeadForm } from '@/components/conversion/LeadForm'
import { CtaSection } from '@/components/conversion/CtaSection'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils/cn'

/**
 * Pricing — and this template has TWO MODES, which is one of the most
 * consequential reads in the whole SRS.
 *
 *   productized  — India, UAE. SRS §1.5 sells "Productized Packages,
 *                  primarily India/UAE", and §23.1 requires "INR-denominated
 *                  transparent pricing". So a real price grid.
 *
 *   consultative — USA, Canada, Australia, Germany. SRS §1.5 sells fractional
 *                  engagements in US/CA/AU; §23.6 says "consultation-first CTAs
 *                  over self-serve pricing"; §23.3 says "consultation-booking
 *                  CTAs over hard-sell forms". So engagement models, no grid.
 *
 * A single template with swapped numbers would have missed the entire point.
 *
 * SRS §15.1 puts the LONGER QUALIFYING form on pricing pages, not the short one.
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
  const productized = c.pricingMode === 'productized'

  return buildMetadata({
    country: code,
    path: 'pricing',
    title: `Pricing | ${c.positioning} in ${c.name}`,
    description: productized
      ? `Transparent ${c.currency} pricing published openly. Plan a budget before you speak to anyone.`
      : `Engagement models and how we price consulting work in ${c.name}. A firm number in the first conversation, not the third.`,
    hreflangGroupId: 'pricing',
  })
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'
  const productized = c.pricingMode === 'productized'
  const plans = await getPricing(code)

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: isDe ? 'Preise' : 'Pricing', href: `/${code}/pricing/` },
  ]

  const faqs = productized
    ? [
        {
          question: `Why do you publish pricing when most agencies do not?`,
          answer: `Because you should be able to plan a budget before entering a sales process. Withholding pricing until the third call is a negotiation tactic, not a scoping requirement. Every package above is a real, fixed monthly fee in ${c.currency}.`,
        },
        {
          question: `What is not included in these packages?`,
          answer: `Media spend is separate and paid directly to the platform, never through us — so there is no incentive for us to recommend a bigger budget than the numbers justify. Third-party tooling is also billed at cost.`,
        },
        {
          question: `Can we change package mid-engagement?`,
          answer: `Yes, at any month boundary, up or down. We would rather you sat on the right package than the largest one.`,
        },
        {
          question: `Is there a minimum contract term?`,
          answer: `Thirty days' notice on all packages. Organic work compounds over quarters, so we will tell you honestly if we think a short engagement will not produce a fair test — but we will not hold you to a twelve-month term.`,
        },
      ]
    : [
        {
          question: isDe
            ? 'Warum werden keine Preise veröffentlicht?'
            : 'Why is pricing not published?',
          answer: isDe
            ? 'Der Leistungsumfang variiert zwischen Projekten zu stark, als dass eine Preisliste informativ wäre. Ein verbindlicher Preis liegt nach dem Erstgespräch vor — nicht erst nach dem dritten.'
            : `Consulting scope varies too widely between engagements for a rate card to be informative rather than misleading. What we will commit to is a firm number after the first conversation, not the third.`,
        },
        {
          question: isDe
            ? 'Wie wird der Preis festgelegt?'
            : 'How is an engagement priced?',
          answer: isDe
            ? 'Nach Phasen mit definiertem Leistungsumfang und Festpreis in EUR. Sie verpflichten sich nie zum Gesamtprogramm im Voraus.'
            : `As a monthly retainer scoped to the capabilities activated and the pace required, quoted in ${c.currency}. Diagnostics are priced separately and fixed, so you can stop there if the findings suggest you should.`,
        },
        {
          question: isDe
            ? 'Gibt es eine Mindestlaufzeit?'
            : 'Is there a minimum term?',
          answer: isDe
            ? 'Nein. Phasen sind einzeln beauftragbar und in sich abgeschlossen.'
            : `Thirty days' notice, no severance, no penalty. Everything built — documentation, dashboards, playbooks — stays with you regardless.`,
        },
        {
          question: isDe
            ? 'Ist die Prozessanalyse verpflichtend?'
            : 'Do we have to start with the diagnostic?',
          answer: isDe
            ? 'In der Regel ja. Ohne dokumentierten Ist-Zustand ist eine belastbare Planung nicht möglich.'
            : `Usually yes. Recommending a plan without establishing where the constraint actually sits would be guessing, and you would be paying for the guess.`,
        },
      ]

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(breadcrumbs), faqSchema(faqs))} />

      <PageHero
        eyebrow={isDe ? 'Preise' : 'Pricing'}
        title={
          productized
            ? `Published pricing, in ${c.currency}`
            : isDe
              ? 'Transparente Festpreisphasen'
              : 'How we price consulting work'
        }
        intro={
          productized
            ? `You should be able to plan a budget before entering a sales process. Every figure below is a real monthly fee. Media spend is separate and paid directly to the platform.`
            : isDe
              ? 'Jede Phase hat einen definierten Leistungsumfang und einen Festpreis. Sie verpflichten sich nie zum Gesamtprogramm im Voraus.'
              : `Scope varies too much between engagements for a rate card to be honest. What we commit to instead: a firm number in the first conversation, and no long-term lock-in.`
        }
        answer={
          productized
            ? `Ft. Social Crew publishes fixed monthly package pricing in ${c.currency} for ${c.name}, starting from ${formatCurrency(plans[0].price ?? 0, code)} per month. Media spend is billed separately and paid directly to the advertising platform.`
            : isDe
              ? 'Ft. Social Crew arbeitet in Deutschland mit definierten Festpreisphasen in EUR. Die Prozessanalyse wird separat beauftragt und ist Voraussetzung für die weitere Planung.'
              : `Ft. Social Crew prices engagements in ${c.name} as a monthly retainer in ${c.currency}, scoped to the capabilities activated. Diagnostics are fixed-fee and separately scoped, and all engagements carry thirty days' notice.`
        }
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'flex flex-col rounded-xl border p-7 sm:p-9',
                plan.highlighted
                  ? 'border-gold-300 bg-burgundy-100/30'
                  : 'border-ink/10 bg-paper-pure'
              )}
            >
              {plan.highlighted && (
                <Pill variant="solid" size="sm" className="mb-5 self-start">
                  {isDe ? 'Empfohlen' : 'Most chosen'}
                </Pill>
              )}

              <h2 className="font-display text-h3 text-burgundy-700">{plan.name}</h2>
              <p className="mt-2.5 text-small text-ink-600">{plan.description}</p>

              <div className="mt-7 border-y border-ink/10 py-6">
                {plan.price !== null ? (
                  <>
                    <p className="tabular font-display text-[2.75rem] leading-none text-burgundy-700">
                      {formatCurrency(plan.price, code)}
                    </p>
                    <p className="mt-2 font-tight text-eyebrow uppercase text-gold-700">
                      per {plan.period}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-display text-h3 text-burgundy-700">
                      {isDe ? 'Individuell' : 'Scoped per engagement'}
                    </p>
                    <p className="mt-2 font-tight text-eyebrow uppercase text-gold-700">
                      {plan.period}
                    </p>
                  </>
                )}
              </div>

              <ul className="mt-7 flex-1 space-y-3.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-gold-700" aria-hidden="true" />
                    <span className="text-small text-ink-600">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                href={`/${code}/contact/`}
                variant={plan.highlighted ? 'primary' : 'secondary'}
                size="md"
                className="mt-8 w-full"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-prose text-small text-ink-400">
          {productized
            ? `Media spend is separate and paid directly to the advertising platform — never through us. That removes any incentive for us to recommend a larger budget than your numbers justify.`
            : isDe
              ? 'Alle Preise verstehen sich zzgl. USt. Mediabudgets werden direkt an die jeweilige Plattform gezahlt.'
              : `Media spend is paid directly to the platform, never through us. All figures exclude applicable taxes.`}
        </p>
      </Section>

      {/* SRS §15.1 — pricing pages get the LONGER QUALIFYING form */}
      <Section surface="tint" deferred>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeader
              eyebrow={isDe ? 'Anfrage' : 'Get a number'}
              heading={
                isDe
                  ? 'Prozessanalyse anfragen'
                  : productized
                    ? 'Not sure which package fits?'
                    : 'Tell us what you are trying to do'
              }
              subhead={
                isDe
                  ? 'Wir melden uns innerhalb eines Werktages mit einer ersten Einschätzung.'
                  : `A few more details than usual, because they let us give you a real answer in the first reply rather than the third.`
              }
            />
          </div>
          <Reveal>
            <div className="rounded-xl border border-ink/10 bg-paper-pure p-7 sm:p-9">
              <LeadForm country={code} variant="qualifying" formId="pricing-enquiry" />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section surface="white" deferred>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="FAQ" heading={isDe ? 'Häufige Fragen' : 'Pricing questions'} />
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
            ? 'Sprechen wir über den Umfang'
            : productized
              ? 'Still deciding? Talk to us first.'
              : 'Start with the diagnosis'
        }
        body={
          isDe
            ? 'Wir sagen Ihnen vorab, welche Phase tatsächlich sinnvoll ist.'
            : `We will tell you which option actually fits — including when that means recommending the smaller one.`
        }
      />
    </>
  )
}
