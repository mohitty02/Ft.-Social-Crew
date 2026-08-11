import { NextResponse, type NextRequest } from 'next/server'
import { countryCodes, defaultCountry } from '@/config/countries'
import { site } from '@/config/site'
import type { CountryCode } from '@/types'

/**
 * Two request-time rules: canonical host, then IP-based market routing.
 *
 * Both build their target with the standard URL parser and set `Location` by
 * hand instead of calling NextResponse.redirect(nextUrl). NextURL normalises
 * the path against `trailingSlash` on the way out and emits /in for /in/, which
 * Vercel then 308s back to /in/ — two hops for every arriving visitor, and the
 * same slash loss on every www URL. A plain URL is passed through untouched.
 *
 * The header must be absolute: middleware parses it with `new URL()` and throws
 * a 500 on a relative value. Vercel shortens it back to a path on the wire.
 */

const CANONICAL_HOST = new URL(site.url).host // ftsocialcrew.com
const WWW_HOST = `www.${CANONICAL_HOST}`

/**
 * ISO 3166-1 alpha-2 (what `x-vercel-ip-country` sends) → our market.
 *
 * Neighbours fold into the nearest market we actually operate: the alternative
 * is dropping an Austrian visitor onto the US site when a German one exists.
 * Anything unlisted falls through to `defaultCountry`.
 */
const MARKET_BY_GEO: Record<string, CountryCode> = {
  IN: 'in',

  US: 'en-us',

  CA: 'en-ca',

  AU: 'en-au',
  NZ: 'en-au',

  DE: 'de',
  AT: 'de',
  CH: 'de',
  LI: 'de',

  AE: 'en-ae',
  SA: 'en-ae',
  QA: 'en-ae',
  KW: 'en-ae',
  OM: 'en-ae',
  BH: 'en-ae',
}

/** Written by MarketMemory when a region switcher is clicked. */
const PREFERENCE_COOKIE = 'fsc-market'

/** `/?global=1` reaches the real region selector without being bounced. */
const ESCAPE_PARAM = 'global'

function resolveMarket(req: NextRequest): CountryCode {
  // A market the visitor picked by hand outranks whatever their IP says — an
  // Indian founder working from Berlin keeps the India site.
  const preferred = req.cookies.get(PREFERENCE_COOKIE)?.value
  if (preferred && (countryCodes as string[]).includes(preferred)) {
    return preferred as CountryCode
  }

  const geo = req.headers.get('x-vercel-ip-country')?.toUpperCase()
  return (geo && MARKET_BY_GEO[geo]) || defaultCountry
}

export function middleware(req: NextRequest) {
  // 1. Canonical host. Serving the same page on both hosts splits its ranking
  //    signals, so www is permanent (308) — unlike the geo hop below, this
  //    answer is the same for everyone and safe to cache forever.
  if (req.headers.get('host') === WWW_HOST) {
    const target = new URL(req.url)
    target.protocol = 'https:'
    target.host = CANONICAL_HOST
    target.port = ''
    return new NextResponse(null, {
      status: 308,
      headers: { Location: target.toString() },
    })
  }

  // 2. Market routing, root only. This overrides SRS §7.3 ("soft redirect
  //    suggestion banner — never a forced redirect") at the client's request.
  //    Two properties keep it from costing anything in search: every market URL
  //    (/in/, /de/, …) stays directly reachable and is never rewritten, and the
  //    rule is identical for every request, Googlebot included — exempting
  //    crawlers would serve them different content than a user on the same IP,
  //    which is cloaking and a far bigger risk than the redirect itself.
  //
  //    307, not 308: the right destination depends on who is asking, so it must
  //    never be cached as a permanent property of `/`.
  if (req.nextUrl.pathname === '/') {
    if (req.nextUrl.searchParams.has(ESCAPE_PARAM)) return NextResponse.next()

    const target = new URL(`/${resolveMarket(req)}/`, req.url)
    return new NextResponse(null, {
      status: 307,
      headers: { Location: target.toString() },
    })
  }

  return NextResponse.next()
}

export const config = {
  // Everything except build output, so the host rule covers real URLs
  // (/sitemap.xml, /robots.txt, every market page) without paying an
  // invocation on immutable assets that are only ever requested from the
  // canonical host anyway.
  matcher: ['/((?!_next/static|_next/image).*)'],
}
