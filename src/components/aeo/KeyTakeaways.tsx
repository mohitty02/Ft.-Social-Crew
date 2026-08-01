import { Check } from 'lucide-react'
import type { CountryCode } from '@/types'
import { cn } from '@/lib/utils/cn'

/** SRS §7.4 — chrome labels read in the market's own language. */
const defaultTitle: Partial<Record<CountryCode, string>> = {
  de: 'Das Wichtigste in Kürze',
}

/**
 * SRS §9.2 — LLM-friendly formatting. A bulleted summary block of
 * self-contained statements, each of which reads correctly out of context.
 * Real <ul>/<li>, never styled divs, so the list structure survives extraction.
 */
export function KeyTakeaways({
  items,
  title,
  country,
  invert = false,
  className,
}: {
  items: string[]
  title?: string
  country?: CountryCode
  invert?: boolean
  className?: string
}) {
  const resolved = title ?? (country && defaultTitle[country]) ?? 'Key takeaways'

  return (
    <aside
      className={cn(
        'rounded-card border p-6 sm:p-8',
        invert
          ? 'border-burgundy-100/15 bg-burgundy-100/[0.04]'
          : 'border-ink/10 bg-paper-pure',
        className
      )}
    >
      <h2
        className={cn(
          'mb-5 font-tight text-eyebrow uppercase',
          invert ? 'text-gold-300' : 'text-accent'
        )}
      >
        {resolved}
      </h2>
      <ul className="space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Check
              className={cn(
                'mt-1 h-4 w-4 shrink-0',
                invert ? 'text-gold-300' : 'text-[color:var(--text-brand)]'
              )}
              aria-hidden="true"
            />
            <span
              className={cn(
                'text-body',
                invert ? 'text-burgundy-100/85' : 'text-ink-600'
              )}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
