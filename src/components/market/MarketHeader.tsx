'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone, ArrowRight } from 'lucide-react'
import type { CountryCode } from '@/types'
import { marketHome } from '@/content/marketHome'
import type { MarketLink } from '@/lib/market/home'
import { cn } from '@/lib/utils/cn'
import { MarketLogo } from './MarketLogo'

/**
 * Market home header.
 *
 * Separate from the shared `components/layout/Header` on purpose: the market
 * layout runs the green system, a phone-first right cluster and a flat service
 * menu rather than the global mega-menu. Every label comes from
 * `marketHome[country]`, so Germany reads as German.
 */
export function MarketHeader({
  country,
  serviceLinks,
  industryLinks,
  phone,
  phoneHref,
}: {
  country: CountryCode
  serviceLinks: MarketLink[]
  industryLinks: MarketLink[]
  phone: string
  phoneHref: string
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const m = marketHome[country]
  const base = `/${country}`

  const nav: { label: string; href: string; children?: MarketLink[] }[] = [
    { label: m.nav.home, href: `${base}/` },
    { label: m.nav.about, href: `${base}/about/` },
    { label: m.nav.services, href: `${base}/services/`, children: serviceLinks },
    { label: m.nav.industries, href: `${base}/industries/`, children: industryLinks },
    { label: m.nav.cases, href: `${base}/case-studies/` },
    { label: m.nav.blog, href: `${base}/blog/` },
    { label: m.nav.contact, href: `${base}/contact/` },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-white font-brand transition-shadow duration-300',
        scrolled
          ? 'border-steel-200 shadow-[0_6px_24px_-18px_rgba(17,28,34,0.45)]'
          : 'border-steel-100'
      )}
    >
      <div className="mx-auto flex h-[74px] w-full max-w-[1280px] items-center justify-between gap-6 px-5 md:px-8">
        <Link href={`${base}/`} aria-label="Ft. Social Crew" className="shrink-0">
          <MarketLogo />
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-0.5 xl:flex"
          aria-label="Main"
          onMouseLeave={() => setOpenMenu(null)}
        >
          {nav.map((item) => {
            const isHome = item.href === `${base}/`

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenMenu(item.label)}
              >
                <Link
                  href={item.href}
                  aria-current={isHome ? 'page' : undefined}
                  aria-expanded={item.children ? openMenu === item.label : undefined}
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 text-[0.8125rem] font-medium transition-colors duration-150',
                    isHome ? 'text-brand-600' : 'text-steel-700 hover:text-brand-600'
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 transition-transform duration-200',
                        openMenu === item.label && 'rotate-180'
                      )}
                      aria-hidden="true"
                    />
                  )}
                </Link>

                {/* Active-page underline, as in the comp. */}
                {isHome && (
                  <span
                    className="absolute inset-x-3 -bottom-[9px] h-[2px] rounded-full bg-brand-600"
                    aria-hidden="true"
                  />
                )}

                {item.children && openMenu === item.label && (
                  <div className="absolute left-1/2 top-full w-[17rem] -translate-x-1/2 pt-3">
                    <ul className="animate-fade-up rounded-xl border border-steel-200 bg-white p-2 shadow-[0_24px_50px_-20px_rgba(17,28,34,0.28)]">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpenMenu(null)}
                            className="block rounded-lg px-3 py-2.5 text-[0.8125rem] font-medium text-steel-700 transition-colors duration-150 hover:bg-brand-50 hover:text-brand-700"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Right cluster */}
        <div className="flex shrink-0 items-center gap-4">
          <a
            href={phoneHref}
            className="hidden items-center gap-2 text-[0.8125rem] font-medium text-steel-800 transition-colors duration-150 hover:text-brand-600 lg:flex"
          >
            <Phone className="h-4 w-4 text-brand-600" aria-hidden="true" />
            {phone}
          </a>

          <Link
            href={`${base}/contact/`}
            className="hidden items-center rounded-lg bg-brand-700 px-5 py-3 text-[0.8125rem] font-semibold text-white transition-colors duration-200 hover:bg-brand-800 md:inline-flex"
          >
            {m.headerCta}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-steel-200 text-steel-800 xl:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-white xl:hidden">
          <div className="flex h-[74px] items-center justify-between border-b border-steel-100 px-5">
            <MarketLogo />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-steel-200 text-steel-800"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="h-[calc(100dvh-74px)] overflow-y-auto px-5 pb-16 pt-4">
            <nav aria-label="Mobile">
              <ul>
                {nav.map((item) => (
                  <li key={item.label} className="border-b border-steel-100">
                    {item.children ? (
                      <details className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[0.9375rem] font-semibold text-steel-900 [&::-webkit-details-marker]:hidden">
                          {item.label}
                          <ChevronDown
                            className="h-4 w-4 text-steel-500 transition-transform duration-200 group-open:rotate-180"
                            aria-hidden="true"
                          />
                        </summary>
                        <ul className="pb-3">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2.5 text-sm text-steel-600"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-4 text-[0.9375rem] font-semibold text-steel-900"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <Link
              href={`${base}/contact/`}
              onClick={() => setMobileOpen(false)}
              className="mt-7 flex items-center justify-center gap-2 rounded-lg bg-brand-700 px-5 py-4 text-sm font-semibold text-white"
            >
              {m.headerCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <a
              href={phoneHref}
              className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-steel-200 px-5 py-4 text-sm font-semibold text-steel-900"
            >
              <Phone className="h-4 w-4 text-brand-600" aria-hidden="true" />
              {phone}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
