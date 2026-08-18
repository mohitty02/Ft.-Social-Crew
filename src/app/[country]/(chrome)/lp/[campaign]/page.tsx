import { getTestimonials } from '@/lib/data'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Check } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { countryHome } from '@/content/countries'

import { buildMetadata } from '@/lib/seo/metadata'

import { Section } from '@/components/layout/Section'
import { Pill } from '@/components/ui/Pill'
import { StatStrip } from '@/components/proof/StatStrip'
import { TestimonialCard } from '@/components/proof/TestimonialCard'
import { LeadForm } from '@/components/conversion/LeadForm'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'

/**
 * Campaign landing page.
 *
 * SRS §3.1 and §3.4 are explicit: landing pages are "paid-traffic-specific,
 * NOINDEX BY DEFAULT". So `noindex: true` is hard-coded here rather than
 * passed in — a campaign page cannot accidentally ship indexable. robots.txt
 * also disallows /lp/ (SRS §7.5).
 *
 * SRS §15.1: "campaign-specific, SINGLE-CTA pages built per paid channel and
 * country" — hence no site header, no navigation, no exits.
 */
const campaigns = ['growth-audit', 'fractional-team']

export function generateStaticParams() {
  return countryCodes.flatMap((country) =>
    campaigns.map((campaign) => ({ country, campaign }))
  )
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; campaign: string }>
}): Promise<Metadata> {
  const { country, campaign } = await params
  if (!isCountryCode(country)) return {}
  const code = country as CountryCode
  const c = countries[code]

  return buildMetadata({
    country: code,
    path: `lp/${campaign}`,
    title: `${c.primaryCta} — ${c.name}`,
    description: countryHome[code].answer.slice(0, 158),
    // SRS §3.1 — noindex by default, non-negotiable.
    noindex: true,
  })
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ country: string; campaign: string }>
}) {
  const { country, campaign } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const content = countryHome[code]
  const isDe = code === 'de'
  const testimonials = (await getTestimonials(code)).slice(0, 2)

  return (
    <div className="min-h-screen bg-paper">
      {/* Minimal shell — single CTA, no navigation, no exits (SRS §15.1) */}
      <header className="border-b border-ink/10">
        <div className="container-shell flex h-[72px] items-center">
          <span className="font-display text-[1.35rem] font-semibold text-[color:var(--text-brand)]">
            Ft. Social Crew
          </span>
        </div>
      </header>

      <main id="main">
        <section className="bg-paper pt-12 lg:pt-16">
          <div className="container-shell">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div>
                <Pill variant="outline" size="md">
                  {content.eyebrow}
                </Pill>
                <h1 className="mt-7 font-display text-display-1 text-[color:var(--text-brand)]">
                  {content.h1}{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">{content.h1Accent}</span>
                    <span
                      className="absolute inset-x-0 bottom-[0.12em] z-0 h-[3px] bg-gold-300"
                      aria-hidden="true"
                    />
                  </span>
                </h1>
                <p className="mt-7 max-w-prose text-lead text-ink-600">
                  {content.subhead}
                </p>

                <ul className="mt-9 space-y-4">
                  {content.trustPoints.slice(0, 4).map((p) => (
                    <li key={p} className="flex gap-3.5">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span className="text-body text-ink-600">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* The single CTA */}
              <div className="lg:sticky lg:top-8 lg:self-start">
                <div className="rounded-xl border border-accent-line bg-paper-pure p-7 sm:p-9">
                  <h2 className="font-display text-h2 text-[color:var(--text-brand)]">
                    {c.primaryCta}
                  </h2>
                  <p className="mt-3 text-body text-ink-600">
                    {content.ctaBody}
                  </p>
                  <LeadForm
                    country={code}
                    variant="qualifying"
                    formId={`lp-${campaign}`}
                    className="mt-8"
                  />
                </div>
              </div>
            </div>

            <StatStrip
              className="mt-16"
              stats={content.heroStats.map((s) => ({ value: s.value, label: s.label }))}
            />
          </div>
        </section>

        <Section surface="tint">
          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </Section>

        <Section surface="white">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-h2 text-[color:var(--text-brand)]">
              {isDe ? 'Häufige Fragen' : 'Questions before you get in touch'}
            </h2>
            <div className="mt-8">
              <FaqAccordion faqs={content.faqs} />
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-ink/10 bg-paper-pure">
        <div className="container-shell py-8">
          <p className="text-small text-ink-400">
            © {new Date().getFullYear()} Ft. Social Crew · {c.office.city}, {c.office.country} · {c.phone}
          </p>
        </div>
      </footer>
    </div>
  )
}
