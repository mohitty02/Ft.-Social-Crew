import { cn } from '@/lib/utils/cn'

/**
 * SRS §10.1 — comparison intent is one of the ten keyword buckets, and §9.2
 * requires structured, extractable content.
 *
 * A real semantic <table> with <caption> and scoped <th> elements. A div grid
 * would look identical and be worthless to both a screen reader and an answer
 * engine. Scrolls inside its own container so the page body never scrolls
 * sideways on mobile.
 */
export function ComparisonTable({
  caption,
  usLabel,
  themLabel,
  rows,
  className,
}: {
  caption: string
  usLabel: string
  themLabel: string
  rows: { dimension: string; us: string; them: string }[]
  className?: string
}) {
  return (
    <div className={cn('overflow-x-auto rounded-card border border-ink/10', className)}>
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-accent-soft">
            <th
              scope="col"
              className="px-5 py-4 font-tight text-eyebrow uppercase text-ink-600"
            >
              Dimension
            </th>
            <th
              scope="col"
              className="px-5 py-4 font-tight text-eyebrow uppercase text-[color:var(--text-brand)]"
            >
              {usLabel}
            </th>
            <th
              scope="col"
              className="px-5 py-4 font-tight text-eyebrow uppercase text-ink-600"
            >
              {themLabel}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/10">
          {rows.map((row) => (
            <tr key={row.dimension} className="bg-paper-pure align-top">
              <th
                scope="row"
                className="px-5 py-5 text-small font-medium text-ink-800"
              >
                {row.dimension}
              </th>
              <td className="px-5 py-5 text-small text-[color:var(--text-brand)]">{row.us}</td>
              <td className="px-5 py-5 text-small text-ink-600">{row.them}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
