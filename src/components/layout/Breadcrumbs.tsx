import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Breadcrumb } from '@/types'
import { cn } from '@/lib/utils/cn'

/**
 * SRS §7.6 — the visible breadcrumb trail always reflects the URL hierarchy
 * (Country > Section > Page), and BreadcrumbList schema mirrors this exactly.
 * Both are built from the same array, so they cannot drift apart.
 */
export function Breadcrumbs({
  items,
  invert = false,
  className,
}: {
  items: Breadcrumb[]
  invert?: boolean
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-small', className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span
                  aria-current="page"
                  className={cn(
                    'font-medium',
                    invert ? 'text-burgundy-100' : 'text-burgundy-700'
                  )}
                >
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className={cn(
                      'transition-colors duration-fast hover:underline underline-offset-4',
                      invert
                        ? 'text-burgundy-100/70 hover:text-burgundy-100'
                        : 'text-ink-400 hover:text-burgundy-700'
                    )}
                  >
                    {item.name}
                  </Link>
                  <ChevronRight
                    className={cn(
                      'h-3.5 w-3.5 shrink-0',
                      invert ? 'text-burgundy-100/40' : 'text-ink-300'
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
