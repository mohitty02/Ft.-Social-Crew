import { cn } from '@/lib/utils/cn'

/**
 * Methodology, rendered as an ordered list.
 *
 * SRS §23.5 calls for "process documentation as proof of rigour" in Germany
 * and §23.2 for "transparent process documentation" in the USA — so the
 * methodology is a trust asset, not a decorative section.
 *
 * Real <ol>, so the sequence survives extraction by an answer engine.
 */
export function ProcessTimeline({
  steps,
  invert = false,
  className,
}: {
  steps: { step: string; title: string; description: string }[]
  invert?: boolean
  className?: string
}) {
  return (
    <ol className={cn('grid gap-px overflow-hidden rounded-card border md:grid-cols-2 lg:grid-cols-4',
      invert ? 'border-burgundy-100/15 bg-burgundy-100/15' : 'border-ink/10 bg-ink/10',
      className
    )}>
      {steps.map((s) => (
        <li
          key={s.step}
          className={cn('p-7', invert ? 'bg-burgundy-700' : 'bg-paper-pure')}
        >
          <span
            className={cn(
              'tabular font-display text-[2.25rem] leading-none',
              invert ? 'text-gold-300' : 'text-gold-300'
            )}
          >
            {s.step}
          </span>
          <h3
            className={cn(
              'mt-5 font-display text-h4',
              invert ? 'text-burgundy-100' : 'text-[color:var(--text-brand)]'
            )}
          >
            {s.title}
          </h3>
          <p
            className={cn(
              'mt-2.5 text-small',
              invert ? 'text-burgundy-100/70' : 'text-ink-600'
            )}
          >
            {s.description}
          </p>
        </li>
      ))}
    </ol>
  )
}
