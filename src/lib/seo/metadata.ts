import type { Metadata } from 'next'
import type { CountryCode } from '@/types'
import { countries, countryCodes, defaultCountry } from '@/config/countries'
import { site } from '@/config/site'

/**
 * Metadata generation — SRS §7.1, §7.2, §13.
 *
 * Every rule here is applied at the platform level rather than per page, so
 * compliance is automatic (SRS §7). No page hand-writes a canonical, an
 * hreflang set or an OG tag.
 */

interface BuildMetadataArgs {
  country: CountryCode
  /** Path after the country segment, e.g. "seo-services". Empty = country home. */
  path?: string
  /**
   * Resolves this page's path in ANOTHER country.
   *
   * Required whenever the slug differs between markets — SRS §7.4 mandates
   * local spelling, so the US conversion page lives at
   * /en-us/conversion-rate-optimization/ while every other English market uses
   * /conversion-rate-optimisation/. Without this, hreflang would point at a
   * 404, which is precisely the "hreflang misconfiguration suppressing country
   * pages from indexing" risk in SRS §25.2.
   *
   * Defaults to the same path in every country.
   */
  pathFor?: (country: CountryCode) => string
  title: string
  description: string
  /** SRS §7.1 — links this page to its equivalents in other countries. */
  hreflangGroupId?: string
  image?: string
  /** SRS §3.1, §3.4 — landing pages are noindex by default. */
  noindex?: boolean
  keywords?: string[]
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
}

/** SRS §21.3 — kebab-case, lowercase, trailing slash. */
export function buildPath(country: CountryCode, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '')
  return clean ? `/${country}/${clean}/` : `/${country}/`
}

export function buildUrl(country: CountryCode, path = ''): string {
  return `${site.url}${buildPath(country, path)}`
}

/**
 * SRS §7.1 — hreflang for every country equivalent, self-referencing on every
 * page, plus x-default. The group is only emitted when the page genuinely
 * exists in the other markets, otherwise we self-tag only.
 */
function buildLanguageAlternates(
  country: CountryCode,
  path: string,
  hreflangGroupId?: string,
  pathFor?: (country: CountryCode) => string
): Record<string, string> {
  const alternates: Record<string, string> = {}
  const resolve = pathFor ?? (() => path)

  if (!hreflangGroupId) {
    // Ungrouped — self-tag only (SRS §13 fallback behaviour).
    alternates[countries[country].locale] = buildUrl(country, path)
    return alternates
  }

  for (const code of countryCodes) {
    alternates[countries[code].locale] = buildUrl(code, resolve(code))
  }
  alternates['x-default'] = buildUrl(defaultCountry, resolve(defaultCountry))
  return alternates
}

export function buildMetadata({
  country,
  path = '',
  pathFor,
  title,
  description,
  hreflangGroupId,
  image,
  noindex = false,
  keywords,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
}: BuildMetadataArgs): Metadata {
  const c = countries[country]
  const url = buildUrl(country, path)

  // SRS §13 — OG image falls back to the country default when none is given.
  const ogImage = image ?? c.heroImage

  return {
    title,
    description,
    keywords,
    alternates: {
      // SRS §7.2 — every page self-canonicalises to its own country URL.
      // Country variants are never canonicalised to a "master" version.
      canonical: url,
      languages: buildLanguageAlternates(country, path, hreflangGroupId, pathFor),
    },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: site.name,
      locale: c.locale.replace('-', '_'),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    // SRS §13 — Twitter Card mirrors OG data.
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

/**
 * SRS §7.4 — unique meta title and description per country variant. The
 * country name and positioning are woven in so no two markets produce the
 * same title string for the same page.
 */
export function titleForCountry(base: string, country: CountryCode): string {
  const c = countries[country]
  return `${base} | ${c.positioning} — ${c.name}`
}
