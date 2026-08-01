import { Sparkles } from 'lucide-react'
import type { CountryCode } from '@/types'
import { cn } from '@/lib/utils/cn'

/** SRS §7.4 — chrome labels read in the market's own language. */
const defaultLabel: Partial<Record<CountryCode, string>> = {
  de: 'Kurz gesagt',
}

/**
 * The single highest-leverage component in the build.
 *
 * SRS §9.2 (GEO): "write direct, quotable answer statements near the top of key
 * pages so AI answer engines can extract and attribute them cleanly."
 *
 * That is a layout instruction, not a copy instruction — so it becomes a
 * mandatory component sitting directly beneath the H1 on every money page.
 *
 * Marked up as a <blockquote> inside a <figure> so the extraction boundary is
 * unambiguous to a parser: everything inside is one self-contained, quotable
 * statement that reads correctly without the surrounding page.
 */
export function AnswerBlock({
  children,
  label,
  country,
  invert = false,
  className,
}: {
  children: string
  label?: string
  country?: CountryCode
  invert?: boolean
  className?: string
}) {
  const resolved =
    label ?? (country && defaultLabel[country]) ?? 'The short answer'
  return (
    <figure
      className={cn(
        'relative max-w-prose border-l-2 pl-6 sm:pl-8',
        invert ? 'border-accent-line/70' : 'border-accent-line',
        className
      )}
    >
      <figcaption
        className={cn(
          'mb-3 flex items-center gap-2 font-tight text-eyebrow uppercase',
          invert ? 'text-gold-300' : 'text-accent'
        )}
      >
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        {resolved}
      </figcaption>
      <blockquote
        className={cn(
          'text-lead',
          invert ? 'text-burgundy-100/90' : 'text-ink-800'
        )}
      >
        {children}
      </blockquote>
    </figure>
  )
}
