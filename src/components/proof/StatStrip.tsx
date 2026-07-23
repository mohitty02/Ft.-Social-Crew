import { cn } from '@/lib/utils/cn'

/**
 * Evidence styled as the hero element it is.
 *
 * SRS §23.2/§23.4 require real metrics with methodology attached. The `detail`
 * line is not optional decoration — it carries the timeframe, baseline or
 * attribution method, because a figure without those cannot be verified.
 *
 * Tabular numerals so figures do not jitter between breakpoints.
 */
export function StatStrip({
  stats,
  invert = false,
  className,
  columns = 4,
}: {
  stats: { value: string; label: string; detail?: string }[]
  invert?: boolean
  className?: string
  columns?: 2 | 3 | 4
}) {
  const cols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns]

  return (
    <dl
      className={cn(
        'grid grid-cols-1 gap-px overflow-hidden rounded-lg border',
        invert ? 'border-burgundy-100/15 bg-burgundy-100/15' : 'border-ink/10 bg-ink/10',
        cols,
        className
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn('p-6 sm:p-8', invert ? 'bg-burgundy-700' : 'bg-paper-pure')}
        >
          <dd
            className={cn(
              'tabular font-display text-stat',
              invert ? 'text-burgundy-100' : 'text-burgundy-700'
            )}
          >
            {stat.value}
          </dd>
          <dt
            className={cn(
              'mt-3 font-tight text-eyebrow uppercase',
              invert ? 'text-gold-300' : 'text-gold-700'
            )}
          >
            {stat.label}
          </dt>
          {stat.detail && (
            <p
              className={cn(
                'mt-2 text-small',
                invert ? 'text-burgundy-100/60' : 'text-ink-400'
              )}
            >
              {stat.detail}
            </p>
          )}
        </div>
      ))}
    </dl>
  )
}
