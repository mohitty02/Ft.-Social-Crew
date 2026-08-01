import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * The signature component.
 *
 * Taken directly from the brand plate, which uses the fully-rounded lozenge in
 * exactly two states — solid blush fill, and gold hairline outline. That
 * alternation is the composition's core rhythm device, so it is a rule here
 * rather than a choice.
 *
 * Gold appears only as a 1px line, never as a fill. That is both the brand's
 * own visual grammar and the reason champagne gold's 1.6:1 contrast on white
 * never becomes an accessibility problem.
 */

type PillVariant = 'solid' | 'outline' | 'ghost' | 'invert'
type PillSize = 'sm' | 'md' | 'lg'

interface PillProps {
  children: ReactNode
  variant?: PillVariant
  size?: PillSize
  className?: string
  as?: 'span' | 'div' | 'li'
}

const variants: Record<PillVariant, string> = {
  // Solid blush fill with burgundy ink — the filled pills on the brand plate.
  solid: 'bg-burgundy-100 text-[color:var(--text-brand)] border border-transparent',
  // Gold hairline on light — the outlined pills, inverted for the light theme.
  outline: 'bg-transparent text-[color:var(--text-brand)] border border-accent-line',
  ghost: 'bg-transparent text-ink-600 border border-ink-300/40',
  // For use on burgundy sections.
  invert: 'bg-burgundy-100/10 text-burgundy-100 border border-accent-line/50',
}

const sizes: Record<PillSize, string> = {
  sm: 'px-3 py-1 text-[0.6875rem] tracking-[0.08em]',
  md: 'px-4 py-1.5 text-eyebrow tracking-[0.08em]',
  lg: 'px-6 py-3 text-small tracking-[0.04em]',
}

export function Pill({
  children,
  variant = 'solid',
  size = 'md',
  className,
  as: Tag = 'span',
}: PillProps) {
  return (
    <Tag
      className={cn(
        'inline-flex items-center justify-center rounded-[var(--radius-chip)] font-tight font-medium uppercase whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </Tag>
  )
}

/**
 * Renders a list of pills alternating solid / outline, reproducing the brand
 * plate's rhythm. Alternation is enforced here so no call site can break it.
 */
export function PillRow({
  items,
  className,
  invert = false,
}: {
  items: string[]
  className?: string
  invert?: boolean
}) {
  return (
    <ul className={cn('flex flex-wrap gap-2.5', className)}>
      {items.map((item, i) => (
        <Pill
          key={item}
          as="li"
          size="md"
          variant={invert ? (i % 2 === 0 ? 'invert' : 'outline') : i % 2 === 0 ? 'solid' : 'outline'}
          className={invert && i % 2 !== 0 ? 'text-burgundy-100' : undefined}
        >
          {item}
        </Pill>
      ))}
    </ul>
  )
}
