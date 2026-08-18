import Image from 'next/image'
import { Check, ArrowRight } from 'lucide-react'
import type { CountryCode } from '@/types'
import type { ResolvedMarketHome } from '@/lib/market/content'
import { marketImages } from '@/config/media'
import { cn } from '@/lib/utils/cn'
import { MarketIcon } from './MarketIcon'

/**
 * The two argument sections every market home carries: how we work, and why
 * to trust it.
 *
 * Each market renders a structurally different frame — not the same block
 * recoloured. The variant is declared in `marketHome[code].layout`, and the
 * copy comes from `countryHome[code]`, which was already authored per market
 * and per language.
 */

const SHELL = 'mx-auto w-full max-w-[1280px] px-5 md:px-8'

function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-accent', className)}>
      {children}
    </p>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION ONE — how this market works
   ═══════════════════════════════════════════════════════════════ */

export function ApproachSection({
  country,
  home,
}: {
  country: CountryCode
  home: ResolvedMarketHome
}) {
  const s = home.positioningSection
  const variant = home.layout.approach
  const img = marketImages[country]

  const head = (
    <>
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <h2 className="mt-3 text-[clamp(1.5rem,1.1rem+1.4vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-steel-900">
        {s.heading}
      </h2>
    </>
  )

  /* ── India: text beside a 2×2 card grid ───────────────────── */
  if (variant === 'split-cards') {
    return (
      <section className={cn(SHELL, 'py-16 lg:py-20')}>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            {head}
            <div className="mt-6 space-y-4">
              {s.body.map((p) => (
                <p key={p.slice(0, 24)} className="text-[0.9375rem] leading-[1.75] text-steel-600">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2">
            {s.points.map((p) => (
              <li
                key={p.title}
                className="rounded-card border border-steel-200 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_20px_44px_-26px_rgba(11,74,49,0.4)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-card bg-accent-soft text-accent">
                  <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[0.9375rem] font-semibold text-steel-900">{p.title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-steel-500">{p.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  /* ── US: full-width numbered rows, benchmark-table register ─ */
  if (variant === 'numbered-rows') {
    return (
      <section className="border-y border-steel-200 bg-steel-50 py-16 lg:py-20">
        <div className={SHELL}>
          <div className="max-w-3xl">
            {head}
            <p className="mt-5 text-[0.9375rem] leading-[1.75] text-steel-600">{s.body[0]}</p>
          </div>

          <ul className="mt-12 border-t border-steel-200">
            {s.points.map((p, i) => (
              <li
                key={p.title}
                className="grid items-baseline gap-3 border-b border-steel-200 py-6 md:grid-cols-[4rem_18rem_1fr] md:gap-8"
              >
                <span className="text-[0.8125rem] font-semibold tabular text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[1rem] font-semibold text-steel-900">{p.title}</h3>
                <p className="text-[0.875rem] leading-relaxed text-steel-600">{p.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  /* ── Canada: vertical phased timeline ─────────────────────── */
  if (variant === 'phase-timeline') {
    return (
      <section className={cn(SHELL, 'py-16 lg:py-24')}>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="text-center">{s.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-[clamp(1.5rem,1.1rem+1.4vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-steel-900">
            {s.heading}
          </h2>
          <p className="mt-5 text-[0.9375rem] leading-[1.75] text-steel-600">{s.body[0]}</p>
        </div>

        <ol className="relative mx-auto mt-14 max-w-2xl">
          <div
            className="absolute bottom-6 left-[1.375rem] top-6 w-px bg-accent-line"
            aria-hidden="true"
          />
          {s.points.map((p, i) => (
            <li key={p.title} className="relative flex gap-6 pb-10 last:pb-0">
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent-line bg-white text-[0.8125rem] font-semibold tabular text-accent">
                {i + 1}
              </span>
              <div className="rounded-card border border-steel-200 bg-white p-6">
                <h3 className="text-[0.9375rem] font-semibold text-steel-900">{p.title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-steel-500">{p.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    )
  }

  /* ── Australia: plain two-column ledger, ruled ─────────────── */
  if (variant === 'ledger') {
    return (
      <section className={cn(SHELL, 'py-16 lg:py-20')}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            {head}
            <div className="mt-6 space-y-4">
              {s.body.map((p) => (
                <p key={p.slice(0, 24)} className="text-[0.9375rem] leading-[1.75] text-steel-600">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <dl className="divide-y divide-steel-200 border-y border-steel-200">
            {s.points.map((p) => (
              <div key={p.title} className="grid gap-2 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <dt className="text-[0.9375rem] font-semibold text-steel-900">{p.title}</dt>
                <dd className="text-[0.875rem] leading-relaxed text-steel-600">{p.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    )
  }

  /* ── Germany: dense bordered specification table ───────────── */
  if (variant === 'spec-table') {
    return (
      <section className="bg-[color:var(--bg-tint)] py-14 lg:py-16">
        <div className={SHELL}>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              {head}
              <div className="mt-5 space-y-3.5">
                {s.body.map((p) => (
                  <p key={p.slice(0, 24)} className="text-[0.875rem] leading-[1.7] text-steel-600">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* The table scrolls inside its own box so the page itself never
                scrolls horizontally on a narrow screen. */}
            <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
              <table className="w-full min-w-[30rem] border-collapse border border-steel-300 bg-white text-left">
                <tbody>
                  {s.points.map((p, i) => (
                    <tr key={p.title} className={cn(i > 0 && 'border-t border-steel-300')}>
                      <th
                        scope="row"
                        className="w-[42%] border-r border-steel-300 p-4 align-top text-[0.8125rem] font-semibold text-steel-900"
                      >
                        {p.title}
                      </th>
                      <td className="p-4 align-top text-[0.8125rem] leading-relaxed text-steel-600">
                        {p.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    )
  }

  /* ── UAE: asymmetric mosaic against a large image panel ───── */
  return (
    <section className={cn(SHELL, 'py-16 lg:py-24')}>
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-card lg:aspect-[3/4]">
          <Image
            src={img.detail}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-900/55 via-transparent to-transparent"
            aria-hidden="true"
          />
        </div>

        <div>
          {head}
          <p className="mt-5 text-[0.9375rem] leading-[1.75] text-steel-600">{s.body[0]}</p>

          <ul className="mt-8 space-y-px overflow-hidden rounded-card border border-steel-200">
            {s.points.map((p) => (
              <li key={p.title} className="bg-white p-6 odd:bg-accent-soft/60">
                <h3 className="text-[0.9375rem] font-semibold text-steel-900">{p.title}</h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-steel-500">
                  {p.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION TWO — why this market trusts it
   ═══════════════════════════════════════════════════════════════ */

export function TrustSection({
  country,
  home,
}: {
  country: CountryCode
  home: ResolvedMarketHome
}) {
  const variant = home.layout.trust
  const img = marketImages[country]
  const cta = home.closing.button
  const base = `/${country}`

  /* ── India: dark band, checklist beside a photograph ──────── */
  if (variant === 'dark-split') {
    return (
      <section className={cn(SHELL, 'pb-16 lg:pb-20')}>
        <div className="overflow-hidden rounded-card bg-brand-800">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-14">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brand-200">
                {home.trustHeading}
              </p>
              <ul className="mt-8 space-y-5">
                {home.trustPoints.map((p) => (
                  <li key={p} className="flex gap-3.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" strokeWidth={2.5} aria-hidden="true" />
                    <span className="text-[0.875rem] leading-relaxed text-white/80">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-[18rem] lg:min-h-full">
              <Image
                src={img.band}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }

  /* ── US: sharp four-up panel on tint ──────────────────────── */
  if (variant === 'quad-panel') {
    return (
      <section className="border-y border-steel-200 bg-[color:var(--bg-tint)] py-16 lg:py-20">
        <div className={SHELL}>
          <h2 className="max-w-2xl text-[clamp(1.5rem,1.1rem+1.4vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-steel-900">
            {home.trustHeading}
          </h2>
          <ul className="mt-10 grid gap-px overflow-hidden border border-steel-200 bg-steel-200 sm:grid-cols-2">
            {home.trustPoints.map((p, i) => (
              <li key={p} className="bg-white p-7">
                <span className="text-[0.75rem] font-semibold tabular text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-steel-700">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  /* ── Canada: soft rounded tiles, open spacing ─────────────── */
  if (variant === 'soft-tiles') {
    return (
      <section className={cn(SHELL, 'pb-16 lg:pb-24')}>
        <h2 className="mx-auto max-w-2xl text-center text-[clamp(1.5rem,1.1rem+1.4vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-steel-900">
          {home.trustHeading}
        </h2>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {home.trustPoints.map((p) => (
            <li
              key={p}
              className="flex gap-4 rounded-card border border-accent-line bg-accent-soft/50 p-7"
            >
              <MarketIcon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-[0.9375rem] leading-relaxed text-steel-700">{p}</p>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  /* ── Australia: single ruled strip, no ornament ───────────── */
  if (variant === 'plain-strip') {
    return (
      <section className={cn(SHELL, 'pb-16 lg:pb-20')}>
        <div className="border-y-2 border-steel-900 py-10">
          <h2 className="text-[clamp(1.5rem,1.1rem+1.4vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-steel-900">
            {home.trustHeading}
          </h2>
          <ul className="mt-8 grid gap-x-10 gap-y-4 md:grid-cols-2">
            {home.trustPoints.map((p) => (
              <li key={p} className="flex gap-3 border-t border-steel-200 pt-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <p className="text-[0.875rem] leading-relaxed text-steel-700">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  /* ── Germany: dense numbered list, no imagery ─────────────── */
  if (variant === 'dense-list') {
    return (
      <section className={cn(SHELL, 'pb-14 lg:pb-16')}>
        <div className="border border-steel-300 bg-white">
          <h2 className="border-b border-steel-300 bg-[color:var(--bg-tint)] px-6 py-4 text-[1rem] font-semibold text-steel-900">
            {home.trustHeading}
          </h2>
          <ol className="divide-y divide-steel-300">
            {home.trustPoints.map((p, i) => (
              <li key={p} className="flex gap-4 px-6 py-4">
                <span className="text-[0.8125rem] font-semibold tabular text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[0.875rem] leading-relaxed text-steel-700">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  /* ── UAE: full-bleed image with an overlaid card ──────────── */
  return (
    <section className={cn(SHELL, 'pb-16 lg:pb-24')}>
      <div className="relative overflow-hidden rounded-card">
        <div className="relative aspect-[16/10] sm:aspect-[21/9]">
          <Image
            src={img.band}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-900/70" aria-hidden="true" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-6 py-8 sm:px-12 lg:px-16">
            <div className="max-w-xl rounded-card bg-white/95 p-7 backdrop-blur-sm lg:p-9">
              <h2 className="text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-steel-900">
                {home.trustHeading}
              </h2>
              <ul className="mt-5 space-y-3">
                {home.trustPoints.map((p) => (
                  <li key={p} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />
                    <span className="text-[0.8125rem] leading-relaxed text-steel-600">{p}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`${base}/contact/`}
                className="mt-7 inline-flex items-center gap-2 rounded-card bg-brand-700 px-5 py-3 text-[0.8125rem] font-semibold text-white transition-colors duration-200 hover:bg-brand-800"
              >
                {cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
