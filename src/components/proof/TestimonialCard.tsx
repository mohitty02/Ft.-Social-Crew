import Image from 'next/image'
import { Quote, PlayCircle } from 'lucide-react'
import type { Testimonial } from '@/types'
import { cn } from '@/lib/utils/cn'

/**
 * SRS §23 requires local testimonials per market and §23.2 specifically calls
 * for client video testimonials in the USA.
 *
 * Where a record is placeholder data it is labelled as such. Presenting an
 * invented company as a verified client would undermine the exact E-E-A-T
 * signal the component exists to build.
 */
export function TestimonialCard({
  testimonial,
  invert = false,
  className,
}: {
  testimonial: Testimonial
  invert?: boolean
  className?: string
}) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col rounded-card border p-7 transition-colors duration-base',
        invert
          ? 'border-burgundy-100/15 bg-burgundy-100/[0.04] hover:border-accent-line/40'
          : 'border-ink/10 bg-paper-pure hover:border-burgundy-700/25',
        className
      )}
    >
      <Quote
        className={cn('h-6 w-6', invert ? 'text-gold-300/70' : 'text-gold-300')}
        aria-hidden="true"
      />

      <blockquote
        className={cn(
          'mt-5 flex-1 text-body',
          invert ? 'text-burgundy-100/85' : 'text-ink-800'
        )}
      >
        {testimonial.quote}
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-3.5">
        {testimonial.image && (
          <Image
            src={testimonial.image}
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-pill object-cover"
          />
        )}
        <div className="min-w-0">
          <p
            className={cn(
              'truncate font-tight text-small font-medium',
              invert ? 'text-burgundy-100' : 'text-[color:var(--text-brand)]'
            )}
          >
            {testimonial.role}
          </p>
          <p
            className={cn(
              'truncate text-small',
              invert ? 'text-burgundy-100/55' : 'text-ink-400'
            )}
          >
            {testimonial.company}
          </p>
        </div>
        {testimonial.hasVideo && (
          <PlayCircle
            className={cn(
              'ml-auto h-5 w-5 shrink-0',
              invert ? 'text-gold-300' : 'text-[color:var(--text-brand)]'
            )}
            aria-label="Video testimonial available"
          />
        )}
      </figcaption>

      {testimonial.isPlaceholder && (
        <p
          className={cn(
            'mt-4 border-t pt-3 text-[0.6875rem] uppercase tracking-[0.08em]',
            invert
              ? 'border-burgundy-100/10 text-burgundy-100/35'
              : 'border-ink/10 text-ink-300'
          )}
        >
          Illustrative — pending client approval
        </p>
      )}
    </figure>
  )
}
