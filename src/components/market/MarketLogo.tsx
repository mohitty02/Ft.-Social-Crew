import Image from 'next/image'
import { cn } from '@/lib/utils/cn'

/**
 * The brand mark — the company's actual logo, not a drawn approximation.
 *
 * `/logo-mark.png` is circle-masked at build time from the source artwork,
 * which ships as RGB with no alpha and solid white corners. Unmasked it renders
 * as a white square, which is invisible on the white header and glaring on the
 * dark footer. Masked, the disc sits correctly on either.
 *
 * The disc already contains the wordmark, so there is no adjacent text lockup:
 * setting "Ft. Social Crew" beside a logo that already reads "Ft. Social Crew"
 * says it twice. The accessible name comes from `alt`.
 */
export function MarketLogo({
  className,
  /**
   * Dark surfaces get a hairline ring. The disc is near-black against the
   * #111C22 footer, so without it the cream lettering appears to float with no
   * mark behind it.
   */
  tone = 'light',
}: {
  className?: string
  tone?: 'light' | 'dark'
}) {
  return (
    <Image
      src="/logo-mark.png"
      alt="Ft. Social Crew"
      width={192}
      height={192}
      priority
      className={cn(
        'h-11 w-11 shrink-0 rounded-full object-contain',
        tone === 'dark' && 'ring-1 ring-white/15',
        className
      )}
    />
  )
}
