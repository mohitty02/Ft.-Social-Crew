import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Check, LayoutGrid, Phone, TrendingUp } from 'lucide-react'
import type { CountryCode } from '@/types'
import { marketHome } from '@/content/marketHome'
import type { MarketPageData } from '@/lib/market/home'
import { cn } from '@/lib/utils/cn'
import { MarketIcon } from './MarketIcon'
import { MarketTestimonials } from './MarketTestimonials'
import { ApproachSection, TrustSection } from './MarketSections'

const SHELL = 'mx-auto w-full max-w-[1280px] px-5 md:px-8'

/* ─────────────────────────────────────────────────────────────
   Small shared parts
   ───────────────────────────────────────────────────────────── */

function Eyebrow({
  children,
  align = 'left',
}: {
  children: React.ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <p
      className={cn(
        'text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-accent',
        align === 'center' && 'text-center'
      )}
    >
      {children}
    </p>
  )
}

function SectionHeading({
  children,
  align = 'left',
  className,
}: {
  children: React.ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <h2
      className={cn(
        'text-[clamp(1.5rem,1.1rem+1.4vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-steel-900',
        align === 'center' && 'text-center',
        className
      )}
    >
      {children}
    </h2>
  )
}

/** A hero overlay metric card. */
function MetricCard({
  label,
  value,
  delta,
  note,
  spark,
  className,
}: {
  label: string
  value: string
  delta?: string
  note: string
  spark?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-card border border-steel-200/80 bg-white/95 p-3.5 shadow-[0_16px_40px_-20px_rgba(17,28,34,0.35)] backdrop-blur-sm',
        className
      )}
    >
      <p className="flex items-center gap-1.5 text-[0.625rem] font-medium leading-tight text-steel-500">
        <MarketIcon name="users" className="h-3 w-3 shrink-0 text-accent" />
        {label}
      </p>
      <p className="mt-1.5 text-[1.25rem] font-semibold leading-none text-steel-900 tabular">
        {value}
      </p>
      <p className="mt-1.5 flex items-center gap-1 text-[0.625rem] font-medium leading-tight text-accent">
        {delta ? (
          <>
            <TrendingUp className="h-3 w-3 shrink-0" aria-hidden="true" />
            {delta} <span className="text-steel-400">{note}</span>
          </>
        ) : (
          <span className="text-steel-400">{note}</span>
        )}
      </p>

      {spark && (
        <svg
          viewBox="0 0 72 20"
          className="mt-2 h-5 w-full text-brand-400"
          aria-hidden="true"
        >
          <polyline
            points="0,17 12,13 24,15 36,8 48,10 60,4 72,2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   The layout — one component, six markets. Everything it renders
   arrives as props; it never branches on which country it is.
   ───────────────────────────────────────────────────────────── */

export function MarketHome({
  country,
  data,
}: {
  country: CountryCode
  data: MarketPageData
}) {
  const m = marketHome[country]
  const base = `/${country}`
  const [mLeads, mRoas, mRevenue, mCampaigns] = m.hero.metrics

  return (
    <main id="main" className="bg-white font-brand">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(60%_100%_at_75%_0%,rgba(31,139,91,0.10),transparent_70%)]"
          aria-hidden="true"
        />

        <div className={cn(SHELL, 'relative grid gap-12 py-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:py-16')}>
          <div>
            <p className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-steel-800">
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {m.hero.eyebrow}
            </p>

            <h1 className="mt-6 text-[clamp(2.25rem,1.35rem+3.1vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-steel-900">
              {m.hero.headline}
              <span className="mt-1 block text-accent">{m.hero.headlineAccent}</span>
            </h1>

            <p className="mt-6 max-w-[33rem] text-[0.9375rem] leading-[1.7] text-steel-600">
              {m.hero.body}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={`${base}/contact/`}
                className="inline-flex items-center gap-2 rounded-card bg-brand-700 px-6 py-3.5 text-[0.875rem] font-semibold text-white transition-colors duration-200 hover:bg-brand-800"
              >
                {m.hero.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={`${base}/services/`}
                className="inline-flex items-center gap-2 rounded-card border border-steel-200 bg-white px-6 py-3.5 text-[0.875rem] font-semibold text-steel-900 transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                {m.hero.secondaryCta}
                <LayoutGrid className="h-4 w-4 text-steel-500" aria-hidden="true" />
              </Link>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
              {m.hero.assurances.map((item) => (
                <li key={item.title}>
                  <p className="flex items-center gap-2 text-[0.8125rem] font-semibold text-steel-900">
                    <Check
                      className="h-4 w-4 shrink-0 rounded-full bg-brand-100 p-[3px] text-accent"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                    {item.title}
                  </p>
                  <p className="mt-2 text-[0.6875rem] leading-relaxed text-steel-500">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Photograph + floating metrics */}
          <div className="relative">
            <div
              className="absolute -right-6 -top-6 h-[70%] w-[70%] rounded-full bg-brand-100/70 blur-[2px]"
              aria-hidden="true"
            />

            <div className="relative aspect-[4/3] overflow-hidden rounded-card">
              <Image
                src={m.hero.image}
                alt={m.hero.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Overlays are hidden on the narrowest screens, where they would
                cover the subject. The same figures appear in a grid below. */}
            <MetricCard {...mLeads} className="absolute -left-3 top-6 hidden w-[9.5rem] sm:block" />
            <MetricCard {...mRoas} className="absolute -right-3 top-2 hidden w-[9rem] sm:block" />
            <MetricCard {...mRevenue} className="absolute -left-4 bottom-10 hidden w-[9.5rem] sm:block" />
            <MetricCard {...mCampaigns} className="absolute -right-4 bottom-6 hidden w-[9.5rem] sm:block" />

            <div className="mt-4 grid grid-cols-2 gap-3 sm:hidden">
              {m.hero.metrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} spark={false} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Credential strip ── */}
      <section className={cn(SHELL, 'pb-4')} aria-label={m.strip.label}>
        <div className="grid grid-cols-3 items-center gap-x-6 gap-y-7 rounded-card border border-steel-200 bg-white px-6 py-7 sm:grid-cols-5 lg:grid-cols-9 lg:gap-x-2">
          {m.strip.items.map((name) => (
            <span
              key={name}
              className="text-center text-[0.9375rem] font-bold uppercase leading-tight tracking-tight text-steel-400 transition-colors duration-200 hover:text-steel-600 lg:text-[0.75rem] xl:text-[0.8125rem]"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      <ApproachSection country={country} />

      {/* ── Services ── */}
      <section className={cn(SHELL, 'py-16 lg:py-20')}>
        <Eyebrow align="center">{m.services.eyebrow}</Eyebrow>
        <SectionHeading align="center" className="mt-3">
          {m.services.heading}
        </SectionHeading>
        <p className="mx-auto mt-3 max-w-xl text-center text-[0.875rem] leading-relaxed text-steel-500">
          {m.services.subhead}
        </p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {data.services.map((service) => (
            <li key={service.href} className="flex">
              <div className="group flex w-full flex-col rounded-card border border-steel-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-line hover:shadow-[0_20px_44px_-26px_rgba(11,74,49,0.45)]">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-card bg-accent-soft text-accent">
                  <MarketIcon name={service.icon} />
                </span>
                <h3 className="mt-5 text-center text-[0.875rem] font-semibold leading-snug text-steel-900">
                  {service.title}
                </h3>
                <p className="mt-2.5 flex-1 text-center text-[0.75rem] leading-relaxed text-steel-500">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-accent transition-colors duration-200 group-hover:text-accent"
                >
                  {m.ui.learnMore}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Stats band ── */}
      <section className={SHELL}>
        <ul className="grid gap-8 rounded-card bg-brand-800 px-8 py-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4 lg:px-10">
          {m.stats.map((stat) => (
            <li key={stat.label} className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card border border-white/15 bg-white/[0.07] text-brand-200">
                <MarketIcon name={stat.icon} />
              </span>
              <span>
                <span className="block text-[1.5rem] font-semibold leading-none text-white tabular">
                  {stat.value}
                </span>
                <span className="mt-1.5 block text-[0.75rem] leading-snug text-white/60">
                  {stat.label}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Case studies ── */}
      <section className={cn(SHELL, 'py-16 lg:py-20')}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{m.cases.eyebrow}</Eyebrow>
            <SectionHeading className="mt-3">{m.cases.heading}</SectionHeading>
          </div>
          <Link
            href={`${base}/case-studies/`}
            className="inline-flex items-center gap-2 rounded-card border border-steel-200 bg-white px-5 py-3 text-[0.8125rem] font-semibold text-steel-900 transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            {m.cases.viewAll}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.cases.map((cs) => (
            <li key={cs.client} className="flex">
              <article className="flex w-full flex-col rounded-card border border-steel-200 bg-white p-7">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[1.0625rem] font-bold uppercase leading-tight tracking-tight text-steel-800">
                    {/* Vertical names run long in some markets
                        ("Vertraulich — Maschinen- und Anlagenbau"), so the
                        metrics row below is bottom-anchored rather than
                        following the title. */}
                    {cs.client}
                  </p>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-steel-100 px-2.5 py-1.5 text-[0.6875rem] font-medium text-steel-600">
                    <MarketIcon name="building" className="h-3 w-3" />
                    {cs.industry}
                  </span>
                </div>

                <dl className="mt-auto grid grid-cols-3 gap-3 pt-7">
                  {cs.results.map((r, i) => (
                    <div key={r.label}>
                      <dd
                        className={cn(
                          'text-[1.25rem] font-semibold leading-none tabular',
                          i === 1 ? 'text-accent' : 'text-steel-900'
                        )}
                      >
                        {r.value}
                      </dd>
                      <dt className="mt-2 text-[0.6875rem] leading-tight text-steel-500">
                        {r.label}
                      </dt>
                    </div>
                  ))}
                </dl>

                <Link
                  href={cs.href}
                  className="mt-7 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-accent transition-colors duration-200 hover:text-accent"
                >
                  {m.ui.viewCaseStudy}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Process ── */}
      <section className={cn(SHELL, 'pb-16 lg:pb-20')}>
        <Eyebrow align="center">{m.process.eyebrow}</Eyebrow>
        <SectionHeading align="center" className="mt-3">
          {m.process.heading}
        </SectionHeading>

        <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          <div
            className="absolute left-[10%] right-[10%] top-7 hidden border-t border-dashed border-steel-300 lg:block"
            aria-hidden="true"
          />

          {m.process.steps.map((step, i) => (
            <li key={step.title} className="relative text-center">
              <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-steel-200 bg-white text-accent shadow-[0_10px_26px_-16px_rgba(17,28,34,0.4)]">
                <MarketIcon name={step.icon} className="h-[22px] w-[22px]" />
              </span>
              <h3 className="mt-5 text-[0.875rem] font-semibold text-steel-900">
                {i + 1}. {step.title}
              </h3>
              <p className="mx-auto mt-2 max-w-[15rem] text-[0.75rem] leading-relaxed text-steel-500">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <TrustSection country={country} />

      {/* ── Testimonials ── */}
      <section className={cn(SHELL, 'pb-16 lg:pb-20')}>
        <Eyebrow align="center">{m.testimonials.eyebrow}</Eyebrow>
        <SectionHeading align="center" className="mt-3">
          {m.testimonials.heading}
        </SectionHeading>

        <div className="mt-12">
          <MarketTestimonials items={data.testimonials} labels={m.ui} />
        </div>
      </section>

      {/* ── Blog ── */}
      <section className={cn(SHELL, 'pb-16 lg:pb-20')}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{m.blog.eyebrow}</Eyebrow>
            <SectionHeading className="mt-3">{m.blog.heading}</SectionHeading>
          </div>
          <Link
            href={`${base}/blog/`}
            className="inline-flex items-center gap-2 rounded-card border border-steel-200 bg-white px-5 py-3 text-[0.8125rem] font-semibold text-steel-900 transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            {m.blog.viewAll}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.posts.map((post) => (
            <li key={post.href} className="flex">
              <article className="group flex w-full flex-col overflow-hidden rounded-card border border-steel-200 bg-white transition-shadow duration-300 hover:shadow-[0_20px_44px_-26px_rgba(17,28,34,0.35)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-md bg-accent-soft px-2.5 py-1 text-[0.625rem] font-semibold text-accent">
                      {post.category}
                    </span>
                    <span className="text-[0.6875rem] text-steel-400">{post.date}</span>
                  </div>

                  <h3 className="mt-4 flex-1 text-[0.875rem] font-semibold leading-snug text-steel-900">
                    <Link href={post.href} className="transition-colors duration-200 group-hover:text-accent">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-5 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-accent">
                    {m.ui.readMore}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Closing CTA ── */}
      <section className={cn(SHELL, 'pb-16 lg:pb-20')}>
        <div className="relative overflow-hidden rounded-card bg-brand-800 px-8 py-12 lg:px-14">
          <div
            className="pointer-events-none absolute -right-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(79,168,127,0.28),transparent_62%)]"
            aria-hidden="true"
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-[clamp(1.5rem,1.15rem+1.3vw,1.9rem)] font-semibold tracking-[-0.02em] text-white">
                {m.closing.heading}
              </h2>
              <p className="mt-3 text-[0.875rem] text-white/70">{m.closing.body}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`${base}/contact/`}
                className="inline-flex items-center gap-2 rounded-card bg-white px-6 py-3.5 text-[0.875rem] font-semibold text-brand-800 transition-colors duration-200 hover:bg-accent-soft"
              >
                {m.closing.button}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <a
                href={data.contact.phoneHref}
                className="inline-flex items-center gap-3 text-[0.9375rem] font-semibold text-white transition-opacity duration-200 hover:opacity-80"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                {data.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
