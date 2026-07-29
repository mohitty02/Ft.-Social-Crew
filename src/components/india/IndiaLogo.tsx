import { cn } from '@/lib/utils/cn'

/**
 * India-market lockup: an angular "FT" mark beside a two-line wordmark.
 *
 * The mark is `currentColor` and the wordmark takes its own tone, so the same
 * component serves the white header and the dark footer with no variant flag.
 */
export function IndiaLogo({
  className,
  markClassName = 'text-brand-500',
  wordClassName = 'text-steel-900',
}: {
  className?: string
  markClassName?: string
  wordClassName?: string
}) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 46 30"
        className={cn('h-7 w-auto shrink-0', markClassName)}
        role="img"
        aria-label="Ft. Social Crew"
      >
        {/* F */}
        <path
          d="M10.2 0 H25.4 L23.6 7.2 H15.2 L14.1 12 H21.9 L20.1 19.2 H12.3 L9.6 30 H2 Z"
          fill="currentColor"
        />
        {/* T */}
        <path
          d="M26.8 0 H46 L44.2 7.2 H38.4 L32.7 30 H25.1 L30.8 7.2 H25 Z"
          fill="currentColor"
        />
      </svg>

      <span
        className={cn(
          'font-brand text-[0.8125rem] font-bold uppercase leading-[1.15] tracking-[0.06em]',
          wordClassName
        )}
      >
        FT Social
        <br />
        Crew
      </span>
    </span>
  )
}
