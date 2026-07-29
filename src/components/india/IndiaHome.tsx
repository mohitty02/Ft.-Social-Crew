import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Check, LayoutGrid, Phone, TrendingUp } from 'lucide-react'
import {
  indiaHero,
  indiaClientLogos,
  indiaServices,
  indiaStats,
  indiaCaseStudies,
  indiaProcess,
  indiaBlogPosts,
  indiaContact,
} from '@/config/india'
import { cn } from '@/lib/utils/cn'
import { IndiaIcon } from './IndiaIcon'
import { IndiaTestimonials } from './IndiaTestimonials'

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
        'text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brand-600',
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
        'rounded-xl border border-steel-200/80 bg-white/95 p-3.5 shadow-[0_16px_40px_-20px_rgba(17,28,34,0.35)] backdrop-blur-sm',
        className
      )}
    >
      <p className="flex items-center gap-1.5 text-[0.625rem] font-medium text-steel-500">
        <IndiaIcon name="users" className="h-3 w-3 text-brand-500" />
        {label}
      </p>
      <p className="mt-1.5 text-[1.25rem] font-semibold leading-none text-steel-900 tabular">
        {value}
      </p>
      <p className="mt-1.5 flex items-center gap-1 text-[0.625rem] font-medium text-brand-600">
        {delta ? (
          <>
            <TrendingUp className="h-3 w-3" aria-hidden="true" />
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
   Sections
   ───────────────────────────────────────────────────────────── */

function Hero() {
  const m = indiaHero.metrics

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Soft market wash behind the hero — decorative only. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(60%_100%_at_75%_0%,rgba(31,139,91,0.10),transparent_70%)]"
        aria-hidden="true"
      />

      <div className={cn(SHELL, 'relative grid gap-12 py-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:py-16')}>
        <div>
          <p className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-steel-800">
            <span className="h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
            {indiaHero.eyebrow}
          </p>

          <h1 className="mt-6 text-[clamp(2.25rem,1.35rem+3.1vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-steel-900">
            {indiaHero.headline}
            <span className="mt-1 block text-brand-600">
              {indiaHero.headlineAccent}
            </span>
          </h1>

          <p className="mt-6 max-w-[33rem] text-[0.9375rem] leading-[1.7] text-steel-600">
            {indiaHero.body}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={indiaHero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3.5 text-[0.875rem] font-semibold text-white transition-colors duration-200 hover:bg-brand-800"
            >
              {indiaHero.primaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={indiaHero.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-lg border border-steel-200 bg-white px-6 py-3.5 text-[0.875rem] font-semibold text-steel-900 transition-colors duration-200 hover:border-brand-300 hover:text-brand-700"
            >
              {indiaHero.secondaryCta.label}
              <LayoutGrid className="h-4 w-4 text-steel-500" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {indiaHero.assurances.map((item) => (
              <li key={item.title}>
                <p className="flex items-center gap-2 text-[0.8125rem] font-semibold text-steel-900">
                  <Check
                    className="h-4 w-4 shrink-0 rounded-full bg-brand-100 p-[3px] text-brand-700"
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

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={indiaHero.image}
              alt={indiaHero.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Overlays — hidden on the narrowest screens, where they would
              cover the subject. The same figures appear in a grid below. */}
          <MetricCard
            className="absolute -left-3 top-6 hidden w-[9.5rem] sm:block"
            label={m.leads.label}
            value={m.leads.value}
            delta={m.leads.delta}
            note={m.leads.note}
            spark
          />
          <MetricCard
            className="absolute -right-3 top-2 hidden w-[8.5rem] sm:block"
            label={m.roas.label}
            value={m.roas.value}
            delta={m.roas.delta}
            note={m.roas.note}
          />
          <MetricCard
            className="absolute -left-4 bottom-10 hidden w-[9.5rem] sm:block"
            label={m.revenue.label}
            value={m.revenue.value}
            delta={m.revenue.delta}
            note={m.revenue.note}
          />
          <MetricCard
            className="absolute -right-4 bottom-6 hidden w-[9.5rem] sm:block"
            label={m.campaigns.label}
            value={m.campaigns.value}
            note={m.campaigns.note}
          />

          <div className="mt-4 grid grid-cols-2 gap-3 sm:hidden">
            <MetricCard label={m.leads.label} value={m.leads.value} delta={m.leads.delta} note={m.leads.note} />
            <MetricCard label={m.roas.label} value={m.roas.value} delta={m.roas.delta} note={m.roas.note} />
            <MetricCard label={m.revenue.label} value={m.revenue.value} delta={m.revenue.delta} note={m.revenue.note} />
            <MetricCard label={m.campaigns.label} value={m.campaigns.value} note={m.campaigns.note} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ClientLogos() {
  return (
    <section className={cn(SHELL, 'pb-4')} aria-label="Brands we work with">
      <div className="grid grid-cols-3 items-center gap-x-6 gap-y-7 rounded-2xl border border-steel-200 bg-white px-6 py-7 sm:grid-cols-5 lg:grid-cols-9 lg:gap-x-2">
        {indiaClientLogos.map((name) => (
          <span
            key={name}
            className="text-center text-[0.9375rem] font-bold uppercase tracking-tight text-steel-400 transition-colors duration-200 hover:text-steel-600 lg:text-[0.8125rem] xl:text-[0.9375rem]"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className={cn(SHELL, 'py-16 lg:py-20')}>
      <Eyebrow align="center">What we do</Eyebrow>
      <SectionHeading align="center" className="mt-3">
        360° Digital Marketing Services
      </SectionHeading>
      <p className="mx-auto mt-3 max-w-xl text-center text-[0.875rem] leading-relaxed text-steel-500">
        End-to-end solutions to grow your brand, generate leads and maximize ROI.
      </p>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {indiaServices.map((service) => (
          <li key={service.title} className="flex">
            <div className="group flex w-full flex-col rounded-2xl border border-steel-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_20px_44px_-26px_rgba(11,74,49,0.45)]">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <IndiaIcon name={service.icon} />
              </span>
              <h3 className="mt-5 text-center text-[0.875rem] font-semibold leading-snug text-steel-900">
                {service.title}
              </h3>
              <p className="mt-2.5 flex-1 text-center text-[0.75rem] leading-relaxed text-steel-500">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="mt-5 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-brand-600 transition-colors duration-200 group-hover:text-brand-700"
              >
                Learn More
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Stats() {
  return (
    <section className={SHELL}>
      <ul className="grid gap-8 rounded-2xl bg-brand-800 px-8 py-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4 lg:px-10">
        {indiaStats.map((stat) => (
          <li key={stat.label} className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] text-brand-200">
              <IndiaIcon name={stat.icon} />
            </span>
            <span>
              <span className="block text-[1.5rem] font-semibold leading-none text-white tabular">
                {stat.value}
              </span>
              <span className="mt-1.5 block text-[0.75rem] text-white/60">
                {stat.label}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function CaseStudies() {
  return (
    <section className={cn(SHELL, 'py-16 lg:py-20')}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Case Studies</Eyebrow>
          <SectionHeading className="mt-3">Real Results. Real Impact.</SectionHeading>
        </div>
        <Link
          href="/in/case-studies/"
          className="inline-flex items-center gap-2 rounded-lg border border-steel-200 bg-white px-5 py-3 text-[0.8125rem] font-semibold text-steel-900 transition-colors duration-200 hover:border-brand-300 hover:text-brand-700"
        >
          View All Case Studies
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {indiaCaseStudies.map((cs) => (
          <li key={cs.client} className="flex">
            <article className="flex w-full flex-col rounded-2xl border border-steel-200 bg-white p-7">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[1.0625rem] font-bold uppercase tracking-tight text-steel-800">
                  {cs.client}
                </p>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-steel-100 px-2.5 py-1.5 text-[0.6875rem] font-medium text-steel-600">
                  <IndiaIcon name="building" className="h-3 w-3" />
                  {cs.industry}
                </span>
              </div>

              <dl className="mt-7 grid grid-cols-3 gap-3">
                {cs.results.map((r, i) => (
                  <div key={r.label}>
                    <dd
                      className={cn(
                        'text-[1.25rem] font-semibold leading-none tabular',
                        i === 1 ? 'text-brand-600' : 'text-steel-900'
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
                className="mt-7 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-brand-600 transition-colors duration-200 hover:text-brand-700"
              >
                View Case Study
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Process() {
  return (
    <section className={cn(SHELL, 'pb-16 lg:pb-20')}>
      <Eyebrow align="center">Our Process</Eyebrow>
      <SectionHeading align="center" className="mt-3">
        A Proven Process for Predictable Growth
      </SectionHeading>

      <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        {/* The connecting rule sits behind the step markers. */}
        <div
          className="absolute left-[10%] right-[10%] top-7 hidden border-t border-dashed border-steel-300 lg:block"
          aria-hidden="true"
        />

        {indiaProcess.map((step, i) => (
          <li key={step.title} className="relative text-center">
            <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-steel-200 bg-white text-brand-600 shadow-[0_10px_26px_-16px_rgba(17,28,34,0.4)]">
              <IndiaIcon name={step.icon} className="h-[22px] w-[22px]" />
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
  )
}

function Testimonials() {
  return (
    <section className={cn(SHELL, 'pb-16 lg:pb-20')}>
      <Eyebrow align="center">What our clients say</Eyebrow>
      <SectionHeading align="center" className="mt-3">
        Trusted by Businesses, Loved by Clients
      </SectionHeading>

      <div className="mt-12">
        <IndiaTestimonials />
      </div>
    </section>
  )
}

function Blog() {
  return (
    <section className={cn(SHELL, 'pb-16 lg:pb-20')}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>From our blog</Eyebrow>
          <SectionHeading className="mt-3">Latest Insights &amp; Updates</SectionHeading>
        </div>
        <Link
          href="/in/blog/"
          className="inline-flex items-center gap-2 rounded-lg border border-steel-200 bg-white px-5 py-3 text-[0.8125rem] font-semibold text-steel-900 transition-colors duration-200 hover:border-brand-300 hover:text-brand-700"
        >
          View All Blogs
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {indiaBlogPosts.map((post) => (
          <li key={post.title} className="flex">
            <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-steel-200 bg-white transition-shadow duration-300 hover:shadow-[0_20px_44px_-26px_rgba(17,28,34,0.35)]">
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
                  <span className="rounded-md bg-brand-50 px-2.5 py-1 text-[0.625rem] font-semibold text-brand-700">
                    {post.category}
                  </span>
                  <span className="text-[0.6875rem] text-steel-400">{post.date}</span>
                </div>

                <h3 className="mt-4 flex-1 text-[0.875rem] font-semibold leading-snug text-steel-900">
                  <Link href={post.href} className="transition-colors duration-200 group-hover:text-brand-700">
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-5 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-brand-600">
                  Read More
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

function ClosingCta() {
  return (
    <section className={cn(SHELL, 'pb-16 lg:pb-20')}>
      <div className="relative overflow-hidden rounded-2xl bg-brand-800 px-8 py-12 lg:px-14">
        {/* Decorative sweep, matching the comp. */}
        <div
          className="pointer-events-none absolute -right-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(79,168,127,0.28),transparent_62%)]"
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-[clamp(1.5rem,1.15rem+1.3vw,1.9rem)] font-semibold tracking-[-0.02em] text-white">
              Ready to Grow Your Business?
            </h2>
            <p className="mt-3 text-[0.875rem] text-white/70">
              Let&rsquo;s build a strategy that drives real results for your brand.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/in/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-[0.875rem] font-semibold text-brand-800 transition-colors duration-200 hover:bg-brand-50"
            >
              Get Free Strategy Call
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <a
              href={indiaContact.phoneHref}
              className="inline-flex items-center gap-3 text-[0.9375rem] font-semibold text-white transition-opacity duration-200 hover:opacity-80"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </span>
              {indiaContact.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────────────────────────────────────── */

export function IndiaHome() {
  return (
    <main id="main" className="bg-white font-brand">
      <Hero />
      <ClientLogos />
      <Services />
      <Stats />
      <CaseStudies />
      <Process />
      <Testimonials />
      <Blog />
      <ClosingCta />
    </main>
  )
}
