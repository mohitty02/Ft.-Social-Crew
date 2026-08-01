import type { ReactNode, ElementType } from 'react'
import { cn } from '@/lib/utils/cn'
import { Pill } from '@/components/ui/Pill'

/**
 * Section surface rhythm.
 *
 * The brand plate alternates filled and outlined pills down the stack. Scaled
 * to page level that becomes an alternating surface cadence:
 *   paper → tint → paper → invert → paper
 * The burgundy-inverted section is punctuation, roughly one section in five —
 * which keeps the drama of the source composition without building a dark site.
 */

type Surface = 'paper' | 'white' | 'tint' | 'invert' | 'ink'

interface SectionProps {
  children: ReactNode
  surface?: Surface
  className?: string
  id?: string
  as?: ElementType
  /** Long below-fold sections skip layout/paint until near the viewport. */
  deferred?: boolean
}

const surfaces: Record<Surface, string> = {
  paper: 'bg-paper text-ink',
  white: 'bg-paper-pure text-ink',
  tint: 'bg-accent-soft text-ink',
  invert: 'bg-burgundy-700 text-burgundy-100 grain',
  ink: 'bg-ink text-paper',
}

export function Section({
  children,
  surface = 'paper',
  className,
  id,
  as: Tag = 'section',
  deferred = false,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'relative py-[var(--section-y)]',
        surfaces[surface],
        deferred && 'cv-auto',
        className
      )}
    >
      <div className="container-shell relative">{children}</div>
    </Tag>
  )
}

/**
 * Section header. Eyebrow is set in the brand's ALL-CAPS lockup voice — the
 * small quiet label that counterweights the display type.
 */
export function SectionHeader({
  eyebrow,
  heading,
  subhead,
  align = 'left',
  invert = false,
  className,
  as: Heading = 'h2',
}: {
  eyebrow?: string
  heading: string
  subhead?: string
  align?: 'left' | 'center'
  invert?: boolean
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <Pill variant={invert ? 'invert' : 'outline'} size="md" className="mb-6">
          {eyebrow}
        </Pill>
      )}
      <Heading
        className={cn(
          'font-display text-h2',
          invert ? 'text-burgundy-100' : 'text-[color:var(--text-brand)]'
        )}
      >
        {heading}
      </Heading>
      {subhead && (
        <p
          className={cn(
            'mt-5 text-lead max-w-prose',
            align === 'center' && 'mx-auto',
            invert ? 'text-burgundy-100/75' : 'text-ink-600'
          )}
        >
          {subhead}
        </p>
      )}
    </div>
  )
}
