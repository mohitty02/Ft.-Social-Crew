import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import { Pill } from '@/components/ui/Pill'

/**
 * Card system.
 *
 * Borders over shadows throughout — heavy drop shadows are the fastest way to
 * make a page read as a template. Hover is a 2px lift plus a border-darken,
 * both transform/opacity-safe so nothing here can contribute to CLS.
 */

export function LinkCard({
  href,
  children,
  className,
  invert = false,
}: {
  href: string
  children: ReactNode
  className?: string
  invert?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex h-full flex-col rounded-card border p-7 transition-all duration-base ease-out',
        'hover:-translate-y-0.5',
        invert
          ? 'border-burgundy-100/15 bg-burgundy-100/[0.04] hover:border-accent-line/50'
          : 'border-ink/10 bg-paper-pure hover:border-burgundy-700/30',
        className
      )}
    >
      {children}
    </Link>
  )
}

export function CardArrow({ invert = false }: { invert?: boolean }) {
  return (
    <ArrowUpRight
      className={cn(
        'h-5 w-5 shrink-0 transition-transform duration-base ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
        invert ? 'text-gold-300' : 'text-[color:var(--text-brand)]'
      )}
      aria-hidden="true"
    />
  )
}

/** Service card — icon, title, summary, outcome count. */
export function ServiceCard({
  href,
  title,
  summary,
  icon,
  index,
}: {
  href: string
  title: string
  summary: string
  icon: ReactNode
  index: number
}) {
  return (
    <LinkCard href={href}>
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-pill border',
            // Alternating fill / hairline — the brand plate's rhythm, applied
            // at component scale.
            index % 2 === 0
              ? 'border-transparent bg-burgundy-100 text-[color:var(--text-brand)]'
              : 'border-accent-line bg-transparent text-[color:var(--text-brand)]'
          )}
        >
          {icon}
        </span>
        <CardArrow />
      </div>
      <h3 className="mt-6 font-display text-h3 text-[color:var(--text-brand)]">{title}</h3>
      <p className="mt-3 flex-1 text-small text-ink-600">{summary}</p>
    </LinkCard>
  )
}

/** Industry card — image-led, because verticals are recognised visually. */
export function IndustryCard({
  href,
  name,
  painPoint,
  image,
}: {
  href: string
  name: string
  painPoint: string
  image: string
}) {
  return (
    <LinkCard href={href} className="overflow-hidden p-0">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-burgundy-100">
        <Image
          src={image}
          alt={`${name} sector`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-h3 text-[color:var(--text-brand)]">{name}</h3>
          <CardArrow />
        </div>
        <p className="mt-2.5 flex-1 text-small text-ink-600">{painPoint}</p>
      </div>
    </LinkCard>
  )
}

/** City card — carries the mandatory local proof point (SRS §11.3). */
export function CityCard({
  href,
  name,
  region,
  proofPoint,
}: {
  href: string
  name: string
  region: string
  proofPoint: string
}) {
  return (
    <LinkCard href={href}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-h3 text-[color:var(--text-brand)]">{name}</h3>
          <p className="mt-1 font-tight text-eyebrow uppercase text-accent">
            {region}
          </p>
        </div>
        <CardArrow />
      </div>
      <p className="mt-4 flex-1 text-small text-ink-600">{proofPoint}</p>
    </LinkCard>
  )
}

/** Blog card. */
export function BlogCard({
  href,
  title,
  excerpt,
  category,
  readingTime,
  image,
  date,
}: {
  href: string
  title: string
  excerpt: string
  category: string
  readingTime: number
  image: string
  date: string
}) {
  return (
    <LinkCard href={href} className="overflow-hidden p-0">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-burgundy-100">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2.5">
          <Pill variant="solid" size="sm">
            {category}
          </Pill>
          <span className="text-small text-ink-400">{readingTime} min read</span>
        </div>
        <h3 className="mt-4 font-display text-h4 text-[color:var(--text-brand)]">{title}</h3>
        <p className="mt-2.5 flex-1 text-small text-ink-600">{excerpt}</p>
        <time className="mt-5 text-small text-ink-300" dateTime={date}>
          {date}
        </time>
      </div>
    </LinkCard>
  )
}

/** Case study card — leads with the metric, because the metric is the product. */
export function CaseStudyCard({
  href,
  title,
  industry,
  headlineMetric,
  metricLabel,
  image,
  isPlaceholder,
}: {
  href: string
  title: string
  industry: string
  headlineMetric: string
  metricLabel: string
  image: string
  isPlaceholder: boolean
}) {
  return (
    <LinkCard href={href} className="overflow-hidden p-0">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-burgundy-100">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-burgundy-950/85 to-transparent p-6">
          <p className="tabular font-display text-[2.5rem] leading-none text-burgundy-100">
            {headlineMetric}
          </p>
          <p className="mt-1.5 font-tight text-eyebrow uppercase text-gold-300">
            {metricLabel}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-h4 text-[color:var(--text-brand)]">{title}</h3>
          <CardArrow />
        </div>
        <p className="mt-2.5 flex-1 font-tight text-eyebrow uppercase text-accent">
          {industry}
        </p>
        {isPlaceholder && (
          <p className="mt-4 border-t border-ink/10 pt-3 text-[0.6875rem] uppercase tracking-[0.08em] text-ink-300">
            Illustrative figures — client confidential
          </p>
        )}
      </div>
    </LinkCard>
  )
}

/** Resource card. */
export function ResourceCard({
  href,
  title,
  description,
  format,
  image,
}: {
  href: string
  title: string
  description: string
  format: string
  image: string
}) {
  return (
    <LinkCard href={href} className="overflow-hidden p-0">
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-burgundy-100">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Pill variant="outline" size="sm">
          {format}
        </Pill>
        <h3 className="mt-4 font-display text-h4 text-[color:var(--text-brand)]">{title}</h3>
        <p className="mt-2.5 flex-1 text-small text-ink-600">{description}</p>
      </div>
    </LinkCard>
  )
}
