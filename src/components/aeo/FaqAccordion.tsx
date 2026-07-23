import type { Faq } from '@/types'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

/**
 * SRS §9.2 (AEO): "structure FAQ and how-to content with explicit Q/A pairs and
 * FAQPage schema to increase eligibility for AI Overviews and assistant
 * answers."
 *
 * Built on native <details>/<summary> deliberately:
 *  - answers are present in the DOM whether or not the panel is open, so
 *    crawlers and answer engines always see them;
 *  - keyboard operation and screen-reader semantics come for free;
 *  - zero JavaScript, which protects the per-template JS budget.
 *
 * Questions are <h3> so the heading hierarchy stays intact.
 */
export function FaqAccordion({
  faqs,
  invert = false,
  className,
}: {
  faqs: Faq[]
  invert?: boolean
  className?: string
}) {
  return (
    <div className={cn('divide-y', invert ? 'divide-burgundy-100/15' : 'divide-ink/10', className)}>
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-5">
          <summary
            className={cn(
              'flex w-full cursor-pointer list-none items-start justify-between gap-6 text-left',
              '[&::-webkit-details-marker]:hidden'
            )}
          >
            <h3
              className={cn(
                'font-display text-h4 transition-colors duration-fast',
                invert
                  ? 'text-burgundy-100 group-hover:text-white'
                  : 'text-burgundy-700 group-hover:text-burgundy-800'
              )}
            >
              {faq.question}
            </h3>
            <span
              className={cn(
                'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-pill border transition-transform duration-base ease-out group-open:rotate-45',
                invert ? 'border-gold-300/50 text-gold-300' : 'border-gold-300 text-gold-700'
              )}
              aria-hidden="true"
            >
              <Plus className="h-3.5 w-3.5" />
            </span>
          </summary>
          <p
            className={cn(
              'mt-4 max-w-prose text-body',
              invert ? 'text-burgundy-100/75' : 'text-ink-600'
            )}
          >
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  )
}
