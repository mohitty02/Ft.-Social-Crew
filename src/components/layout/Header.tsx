'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries, countryList } from '@/config/countries'
import { buildNavigation } from '@/config/navigation'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

/**
 * Site header.
 *
 * The mega-menu exposing Services × Industries × Locations is doing strategic
 * work, not decorative work: SRS §1.10 names programmatic content coverage as a
 * competitive advantage over boutique agencies, and this is where that
 * advantage becomes visible in about two seconds.
 */
export function Header({ country }: { country: CountryCode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [countryOpen, setCountryOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const c = countries[country]
  const nav = buildNavigation(country)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Escape closes any open layer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setCountryOpen(false)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-base',
        scrolled
          ? 'border-ink/10 bg-paper/90 backdrop-blur-md'
          : 'border-transparent bg-paper'
      )}
    >
      <div className="container-shell">
        <div className="flex h-[72px] items-center justify-between gap-6">
          {/* Wordmark */}
          <Link
            href={`/${country}/`}
            className="flex shrink-0 items-baseline gap-1.5"
            aria-label={`Ft. Social Crew — ${c.name} home`}
          >
            <span className="font-display text-[1.35rem] font-semibold leading-none text-[color:var(--text-brand)]">
              Ft. Social Crew
            </span>
            <span className="hidden h-1.5 w-1.5 rounded-pill bg-gold-300 sm:block" aria-hidden="true" />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => group.columns && setOpenMenu(group.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                {group.columns ? (
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-pill px-3.5 py-2 font-tight text-small text-ink-800 transition-colors duration-fast hover:text-[color:var(--text-brand)]"
                    aria-expanded={openMenu === group.label}
                    onClick={() =>
                      setOpenMenu(openMenu === group.label ? null : group.label)
                    }
                  >
                    {group.label}
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 transition-transform duration-base',
                        openMenu === group.label && 'rotate-180'
                      )}
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <Link
                    href={group.href}
                    className="block rounded-pill px-3.5 py-2 font-tight text-small text-ink-800 transition-colors duration-fast hover:text-[color:var(--text-brand)]"
                  >
                    {group.label}
                  </Link>
                )}

                {group.columns && openMenu === group.label && (
                  <div className="absolute left-1/2 top-full w-[min(56rem,90vw)] -translate-x-1/2 pt-3">
                    <div className="animate-fade-up rounded-card border border-ink/10 bg-paper-pure p-7 shadow-[0_24px_60px_-24px_rgba(71,8,38,0.28)]">
                      <div className="grid gap-8 md:grid-cols-[1fr_1fr_auto]">
                        {group.columns.map((col, ci) => (
                          <div key={ci}>
                            {col.title.trim() && (
                              <p className="mb-4 font-tight text-eyebrow uppercase text-accent">
                                {col.title}
                              </p>
                            )}
                            <ul className="space-y-1">
                              {col.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className="block rounded-md px-3 py-2 transition-colors duration-fast hover:bg-accent-soft"
                                    onClick={() => setOpenMenu(null)}
                                  >
                                    <span className="block text-small font-medium text-[color:var(--text-brand)]">
                                      {link.label}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        {group.featured && (
                          <div className="w-full max-w-[16rem] rounded-card border border-accent-line bg-accent-soft p-6 md:w-64">
                            <p className="font-display text-h4 text-[color:var(--text-brand)]">
                              {group.featured.title}
                            </p>
                            <p className="mt-2.5 text-small text-ink-600">
                              {group.featured.description}
                            </p>
                            <Link
                              href={group.featured.href}
                              className="mt-4 inline-block font-tight text-small text-[color:var(--text-brand)] underline decoration-gold-300 decoration-2 underline-offset-4"
                              onClick={() => setOpenMenu(null)}
                            >
                              {group.featured.cta}
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            {/* Country switcher — SRS §1.10, global footprint made legible */}
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setCountryOpen(!countryOpen)}
                aria-expanded={countryOpen}
                aria-label={`Change region. Current region: ${c.name}`}
                className="flex items-center gap-1.5 rounded-pill border border-ink/15 px-3.5 py-2 font-tight text-small text-ink-800 transition-colors duration-fast hover:border-burgundy-700/40 hover:text-[color:var(--text-brand)]"
              >
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="uppercase tracking-[0.06em]">{country}</span>
              </button>

              {countryOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-72 animate-fade-up rounded-card border border-ink/10 bg-paper-pure p-2 shadow-[0_24px_60px_-24px_rgba(71,8,38,0.28)]">
                  <p className="px-3 py-2 font-tight text-eyebrow uppercase text-accent">
                    Select region
                  </p>
                  <ul>
                    {countryList.map((item) => (
                      <li key={item.code}>
                        <Link
                          href={`/${item.code}/`}
                          data-market={item.code}
                          onClick={() => setCountryOpen(false)}
                          className={cn(
                            'flex items-baseline justify-between gap-3 rounded-md px-3 py-2.5 transition-colors duration-fast hover:bg-accent-soft',
                            item.code === country && 'bg-accent-soft'
                          )}
                          aria-current={item.code === country ? 'true' : undefined}
                        >
                          <span className="text-small font-medium text-[color:var(--text-brand)]">
                            {item.name}
                          </span>
                          <span className="shrink-0 text-[0.6875rem] uppercase tracking-[0.08em] text-ink-400">
                            {item.code} · {item.currency}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Button
              href={`/${country}/contact/`}
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
            >
              {c.primaryCta}
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-pill border border-ink/15 lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5 text-[color:var(--text-brand)]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet — mobile is the primary breakpoint (SRS §22.1) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-paper lg:hidden">
          <div className="flex h-[72px] items-center justify-between border-b border-ink/10 px-5">
            <span className="font-display text-[1.35rem] font-semibold text-[color:var(--text-brand)]">
              Ft. Social Crew
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-pill border border-ink/15"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-[color:var(--text-brand)]" aria-hidden="true" />
            </button>
          </div>

          <div className="h-[calc(100vh-72px)] overflow-y-auto px-5 pb-28 pt-6">
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {nav.map((group) => (
                  <li key={group.label}>
                    {group.columns ? (
                      <details className="group border-b border-ink/10 py-1">
                        <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-display text-h4 text-[color:var(--text-brand)] [&::-webkit-details-marker]:hidden">
                          {group.label}
                          <ChevronDown
                            className="h-4 w-4 transition-transform duration-base group-open:rotate-180"
                            aria-hidden="true"
                          />
                        </summary>
                        <ul className="pb-3 pl-1">
                          {group.columns.flatMap((col) => col.links).map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2.5 text-body text-ink-600"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <Link
                        href={group.href}
                        onClick={() => setMobileOpen(false)}
                        className="block border-b border-ink/10 py-4 font-display text-h4 text-[color:var(--text-brand)]"
                      >
                        {group.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8">
              <p className="mb-3 font-tight text-eyebrow uppercase text-accent">
                Select region
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {countryList.map((item) => (
                  <li key={item.code}>
                    <Link
                      href={`/${item.code}/`}
                      data-market={item.code}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'block rounded-md border px-3.5 py-3 text-small',
                        item.code === country
                          ? 'border-accent-line bg-accent-soft text-[color:var(--text-brand)]'
                          : 'border-ink/10 text-ink-600'
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              href={`/${country}/contact/`}
              variant="primary"
              size="lg"
              className="mt-8 w-full"
              withArrow
            >
              {c.primaryCta}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
