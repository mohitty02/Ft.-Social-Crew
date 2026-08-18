import type { CountryCode } from '@/types'
import { countries } from '@/config/countries'
import { countryHome } from '@/content/countries'
import { marketHome, type MarketHome } from '@/content/marketHome'
import { getCmsMarket } from '@/lib/cms/client'

/**
 * Resolves the home page's copy for a market.
 *
 * Everything the art-directed home layout renders — hero, strip, stats,
 * process, the two argument sections, chrome labels, microcopy — comes from
 * here, CMS first. The committed records in `@/content/marketHome` and
 * `@/content/countries` stay as the fallback, so a market the CMS has not
 * been filled in for still ships, and so does a build that cannot reach it.
 *
 * Merging is per field rather than wholesale: an editor who clears one string
 * should not blank a whole section, and a CMS record written before a new
 * field existed should still render.
 */

function pick<T>(cms: T | null | undefined, local: T): T {
  if (cms === null || cms === undefined) return local
  if (typeof cms === 'string' && cms.trim() === '') return local
  if (Array.isArray(cms) && cms.length === 0) return local
  return cms
}

function merge<T extends object>(cms: Partial<T> | null | undefined, local: T): T {
  if (!cms) return local
  const out = { ...local }
  for (const key of Object.keys(local) as (keyof T)[]) {
    out[key] = pick(cms[key] as T[keyof T], local[key])
  }
  return out
}

export interface ResolvedMarketHome extends MarketHome {
  /** From `countryHome`; the two argument sections read these. */
  positioningSection: (typeof countryHome)[CountryCode]['positioningSection']
  trustHeading: string
  trustPoints: string[]
  heroImage: string
}

export async function resolveMarketHome(
  country: CountryCode
): Promise<ResolvedMarketHome> {
  const local = marketHome[country]
  const localCountry = countryHome[country]

  const base: ResolvedMarketHome = {
    ...local,
    positioningSection: localCountry.positioningSection,
    trustHeading: localCountry.trustHeading,
    trustPoints: localCountry.trustPoints,
    heroImage: local.hero.image,
  }

  const market = await getCmsMarket(country)
  const home = (market as { home?: Record<string, unknown> } | null)?.home
  if (!home) return base

  const cmsHero = (home.hero ?? {}) as Record<string, unknown>
  const cmsNav = (home.nav ?? {}) as Record<string, unknown>
  const cmsTrust = (home.trust ?? {}) as { heading?: string; points?: string[] }
  const cmsPositioning = home.positioningSection as
    | ResolvedMarketHome['positioningSection']
    | undefined

  return {
    ...base,

    layout: merge(home.layout as Partial<MarketHome['layout']>, local.layout),
    nav: merge(cmsNav as Partial<MarketHome['nav']>, local.nav),
    headerCta: pick(cmsNav.headerCta as string, local.headerCta),

    hero: {
      ...merge(cmsHero as Partial<MarketHome['hero']>, local.hero),
      // Held separately because the CMS stores it as a media reference.
      image: pick(home.heroImage as string, local.hero.image),
    },
    heroImage: pick(home.heroImage as string, local.hero.image),

    strip: merge(home.strip as Partial<MarketHome['strip']>, local.strip),
    services: merge(home.servicesHead as Partial<MarketHome['services']>, local.services),
    stats: pick(home.stats as MarketHome['stats'], local.stats),
    cases: merge(home.casesHead as Partial<MarketHome['cases']>, local.cases),
    process: merge(home.process as Partial<MarketHome['process']>, local.process),
    testimonials: merge(
      home.testimonialsHead as Partial<MarketHome['testimonials']>,
      local.testimonials
    ),
    blog: merge(home.blogHead as Partial<MarketHome['blog']>, local.blog),
    closing: merge(home.closing as Partial<MarketHome['closing']>, local.closing),
    footer: merge(home.footer as Partial<MarketHome['footer']>, local.footer),
    ui: merge(home.ui as Partial<MarketHome['ui']>, local.ui),

    positioningSection: cmsPositioning?.heading
      ? merge(cmsPositioning, localCountry.positioningSection)
      : localCountry.positioningSection,
    trustHeading: pick(cmsTrust.heading, localCountry.trustHeading),
    trustPoints: pick(cmsTrust.points, localCountry.trustPoints),
  }
}

/** Market facts — phone, email, address — CMS first. */
export async function resolveMarketSettings(country: CountryCode) {
  const local = countries[country]
  const market = await getCmsMarket(country)
  const cms = market as unknown as Record<string, unknown> | null

  return {
    phone: pick(cms?.phone as string, local.phone),
    email: pick(cms?.email as string, local.email),
    office: merge(cms?.office as Partial<typeof local.office>, local.office),
    positioning: pick(cms?.positioning as string, local.positioning),
    primaryCta: pick(cms?.primaryCta as string, local.primaryCta),
    secondaryCta: pick(cms?.secondaryCta as string, local.secondaryCta),
  }
}
