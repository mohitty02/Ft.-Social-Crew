'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, Globe } from 'lucide-react'
import { countries, countryCodes } from '@/config/countries'
import type { CountryCode } from '@/types'

/**
 * Soft geo-suggestion banner.
 *
 * SRS §7.3, verbatim: "IP-based geo-detection offers a soft redirect suggestion
 * banner — never a forced redirect, to keep every country's content crawlable
 * and directly accessible."
 *
 * So this suggests and never navigates on the visitor's behalf. It runs after
 * hydration, uses the browser's own locale rather than an IP lookup (no
 * third-party request, no privacy exposure, no cost to LCP), and remembers a
 * dismissal.
 */

const DISMISS_KEY = 'fsc-geo-dismissed'

/** Maps a browser locale to the nearest market we operate in. */
function suggestCountry(locale: string): CountryCode | null {
  const lower = locale.toLowerCase()

  const exact = countryCodes.find(
    (code) => countries[code].locale.toLowerCase() === lower
  )
  if (exact) return exact

  const region = lower.split('-')[1]
  const byRegion: Record<string, CountryCode> = {
    in: 'in',
    us: 'en-us',
    ca: 'en-ca',
    au: 'en-au',
    de: 'de',
    at: 'de',
    ch: 'de',
    ae: 'en-ae',
  }
  if (region && byRegion[region]) return byRegion[region]

  if (lower.startsWith('de')) return 'de'
  return null
}

/**
 * The banner sits above the header, so it has to match whichever design
 * system that header belongs to. Country home pages run the green market
 * system (src/components/market/); every other route runs the global
 * burgundy one.
 */
const tones = {
  global: {
    bar: 'border-b border-gold-300 bg-burgundy-100/50',
    icon: 'text-gold-700',
    text: 'text-small text-ink-800',
    link: 'font-medium text-burgundy-700 underline decoration-gold-300 decoration-2 underline-offset-4',
    close: 'border-ink/15 hover:border-burgundy-700/40',
    closeIcon: 'text-ink-600',
  },
  market: {
    bar: 'border-b border-brand-200 bg-brand-50 font-brand',
    icon: 'text-brand-600',
    text: 'text-[0.8125rem] text-steel-700',
    link: 'font-semibold text-brand-700 underline decoration-brand-300 decoration-2 underline-offset-4',
    close: 'border-steel-200 hover:border-brand-400',
    closeIcon: 'text-steel-600',
  },
} as const

export function GeoSuggestion({
  current,
  tone = 'global',
}: {
  current?: CountryCode
  tone?: keyof typeof tones
}) {
  const [suggested, setSuggested] = useState<CountryCode | null>(null)
  const t = tones[tone]

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) return
    } catch {
      return
    }

    const match = suggestCountry(navigator.language || '')
    if (match && match !== current) setSuggested(match)
  }, [current])

  if (!suggested) return null

  const c = countries[suggested]

  function dismiss() {
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      /* storage unavailable — banner simply reappears next visit */
    }
    setSuggested(null)
  }

  return (
    <div
      role="region"
      aria-label="Regional site suggestion"
      className={t.bar}
    >
      <div className="container-shell flex flex-wrap items-center gap-x-5 gap-y-2 py-3">
        <Globe className={`h-4 w-4 shrink-0 ${t.icon}`} aria-hidden="true" />
        <p className={`flex-1 ${t.text}`}>
          It looks like you are in {c.name}. We have a site built for that
          market —{' '}
          <Link href={`/${suggested}/`} className={t.link}>
            view the {c.name} site
          </Link>
          . You can stay here if you prefer.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-pill border transition-colors ${t.close}`}
          aria-label="Dismiss regional suggestion"
        >
          <X className={`h-4 w-4 ${t.closeIcon}`} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
