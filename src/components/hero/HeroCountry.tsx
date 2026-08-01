import Image from 'next/image'
import type { CountryCode } from '@/types'
import { countries } from '@/config/countries'
import { countryHome } from '@/content/countries'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { AnswerBlock } from '@/components/aeo/AnswerBlock'

/**
 * Country homepage hero.
 *
 * SRS §3.4 classifies the country homepage as "hand-crafted per country", and
 * §2 requires the positioning to lead in the H1. Every string here comes from
 * an independently authored country record — the six markets do not share a
 * sentence.
 *
 * The GEO answer statement (SRS §9.2) sits directly beneath the H1, above the
 * fold, which is the whole point of it.
 *
 * The hero image carries `priority` because it is the LCP element; nothing
 * else on the page does.
 */
export function HeroCountry({ country }: { country: CountryCode }) {
  const c = countries[country]
  const content = countryHome[country]

  return (
    <section className="relative overflow-hidden bg-paper pt-12 lg:pt-16">
      <div className="container-shell">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Editorial column */}
          <div className="max-w-2xl">
            <Pill variant="outline" size="md">
              {content.eyebrow}
            </Pill>

            <h1 className="mt-7 font-display text-display-1 text-[color:var(--text-brand)]">
              {content.h1}{' '}
              <span className="relative inline-block">
                <span className="relative z-10">{content.h1Accent}</span>
                {/* Gold as a hairline underline — never a fill. */}
                <span
                  className="absolute inset-x-0 bottom-[0.12em] z-0 h-[3px] bg-gold-300"
                  aria-hidden="true"
                />
              </span>
            </h1>

            <p className="mt-7 max-w-prose text-lead text-ink-600">
              {content.subhead}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={`/${country}/contact/`} variant="primary" size="lg" withArrow>
                {c.primaryCta}
              </Button>
              <Button
                href={
                  c.pricingMode === 'productized'
                    ? `/${country}/pricing/`
                    : `/${country}/case-studies/`
                }
                variant="tertiary"
                size="lg"
              >
                {c.secondaryCta}
              </Button>
            </div>

            {/* SRS §9.2 GEO — quotable answer statement, above the fold. */}
            <AnswerBlock className="mt-12">{content.answer}</AnswerBlock>
          </div>

          {/* Image column */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-burgundy-100 lg:aspect-[3/4]">
              <Image
                src={c.heroImage}
                alt={`Ft. Social Crew — ${c.positioning} operating in ${c.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>

            {/* Gold hairline frame, offset — the brand's outlined-pill logic
                applied at composition scale. */}
            <div
              className="pointer-events-none absolute -bottom-4 -right-4 hidden h-full w-full rounded-card border border-accent-line lg:block"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Hero stat row */}
        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 lg:grid-cols-4">
          {content.heroStats.map((stat) => (
            <div key={stat.label} className="bg-paper-pure p-6">
              <dd className="tabular font-display text-[2rem] leading-none text-[color:var(--text-brand)]">
                {stat.value}
              </dd>
              <dt className="mt-3 font-tight text-eyebrow uppercase text-accent">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
