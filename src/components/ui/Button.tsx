import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

/**
 * Primary = solid burgundy. Secondary = burgundy hairline outline.
 * Tertiary = underlined text link — the quiet counterweight to the oversized
 * display type, exactly as "WORK WITH US" functions on the brand plate.
 */

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'invert' | 'invertOutline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  withArrow?: boolean
}

interface LinkButtonProps extends BaseProps {
  href: string
  external?: boolean
  onClick?: never
  type?: never
}

interface ActionButtonProps extends BaseProps {
  href?: never
  external?: never
  onClick?: () => void
  type?: 'button' | 'submit'
}

type ButtonProps = LinkButtonProps | ActionButtonProps

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-burgundy-700 text-burgundy-100 hover:bg-burgundy-800 active:bg-burgundy-900 border border-burgundy-700',
  secondary:
    'bg-transparent text-burgundy-700 border border-burgundy-700/30 hover:border-burgundy-700 hover:bg-burgundy-50',
  tertiary:
    'bg-transparent text-burgundy-700 border-0 underline underline-offset-[6px] decoration-gold-300 decoration-2 hover:decoration-burgundy-700 px-0',
  invert:
    'bg-burgundy-100 text-burgundy-700 hover:bg-paper-pure border border-burgundy-100',
  invertOutline:
    'bg-transparent text-burgundy-100 border border-gold-300/60 hover:border-gold-300 hover:bg-burgundy-100/10',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-small',
  md: 'px-6 py-3 text-small',
  lg: 'px-8 py-4 text-body',
}

function classes(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(
    'group inline-flex items-center justify-center gap-2 rounded-pill font-tight font-medium',
    'transition-all duration-base ease-out',
    // 44px minimum touch target — mobile is the primary breakpoint.
    'min-h-[44px]',
    variants[variant],
    variant === 'tertiary' ? 'py-2' : sizes[size],
    className
  )
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className,
    withArrow = false,
  } = props

  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-base ease-out group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  )

  if ('href' in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes(variant, size, className)}
        >
          {content}
        </a>
      )
    }
    return (
      <Link href={props.href} className={classes(variant, size, className)}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={(props as ActionButtonProps).type ?? 'button'}
      onClick={(props as ActionButtonProps).onClick}
      className={classes(variant, size, className)}
    >
      {content}
    </button>
  )
}
