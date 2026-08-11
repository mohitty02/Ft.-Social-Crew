'use client'

import { useEffect } from 'react'

/**
 * Remembers a market the visitor chose on purpose.
 *
 * middleware.ts routes the bare root by IP. That is right for a first visit and
 * wrong for every visit after someone has told us otherwise — an Indian founder
 * working from Berlin should not have to re-pick India each time.
 *
 * The cookie is written only on a click inside a region switcher, never merely
 * because a market page was viewed. Landing on /de/ from a shared link is not a
 * choice, and treating it as one would strand that visitor in Germany.
 *
 * One delegated listener rather than a handler per link: the switchers are
 * server-rendered in three different places, and this keeps them that way.
 */

const COOKIE = 'fsc-market'
const ONE_YEAR = 60 * 60 * 24 * 365

export function MarketMemory() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null
      const link = target?.closest?.('[data-market]')
      const market = link?.getAttribute('data-market')
      if (!market) return

      document.cookie = `${COOKIE}=${market}; path=/; max-age=${ONE_YEAR}; samesite=lax`
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
