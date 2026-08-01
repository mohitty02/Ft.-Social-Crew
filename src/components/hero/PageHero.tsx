import type { ReactNode } from 'react'
import type { Breadcrumb, CountryCode } from '@/types'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Pill } from '@/components/ui/Pill'
import { AnswerBlock } from '@/components/aeo/AnswerBlock'

/**
 * Standard interior page hero.
 *
 * Every money page gets: breadcrumbs (mirroring the URL hierarchy, SRS §7.6),
 * exactly one H1, and the GEO answer statement within the first 200 words
 * (SRS §9.2). The `answer` prop is required rather than optional so a page
 * cannot ship without one.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  answer,
  breadcrumbs,
  country,
  children,
}: {
  eyebrow: string
  title: string
  intro?: string
  answer: string
  breadcrumbs: Breadcrumb[]
  /** Localises the answer-block label — SRS §7.4. */
  country?: CountryCode
  children?: ReactNode
}) {
  return (
    <section className="border-b border-ink/10 bg-paper pb-16 pt-8 lg:pb-20">
      <div className="container-shell">
        <Breadcrumbs items={breadcrumbs} className="mb-10" />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-3xl">
            <Pill variant="outline" size="md">
              {eyebrow}
            </Pill>
            <h1 className="mt-6 font-display text-display-2 text-[color:var(--text-brand)]">
              {title}
            </h1>
            {intro && (
              <p className="mt-6 max-w-prose text-lead text-ink-600">{intro}</p>
            )}
          </div>

          <div className="lg:pt-16">
            <AnswerBlock country={country}>{answer}</AnswerBlock>
          </div>
        </div>

        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  )
}
