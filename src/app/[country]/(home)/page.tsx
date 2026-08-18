import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { countryHome } from '@/content/countries'
import { getServices } from '@/lib/data'
import { buildMarketPageData } from '@/lib/market/home'
import { buildMetadata, buildUrl } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, serviceSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { GeoSuggestion } from '@/components/international/GeoSuggestion'
import { MarketHeader } from '@/components/market/MarketHeader'
import { MarketHome } from '@/components/market/MarketHome'
import { MarketFooter } from '@/components/market/MarketFooter'

/**
 * Country home page.
 *
 * Every market renders the same art-directed layout with its own content, in
 * its own language — see `src/content/marketHome.ts` for the copy and
 * `src/lib/market/home.ts` for where the page body comes from.
 *
 * It lives in the `(home)` route group rather than `(chrome)` because it
 * replaces the shared Header and Footer with the market chrome. Route groups
 * are URL-transparent, so this is still /{country}/.
 */
export function generateStaticParams() {
  return countryCodes.map((country) => ({ country }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>
}): Promise<Metadata> {
  const { country } = await params
  if (!isCountryCode(country)) return {}

  const code = country as CountryCode
  const c = countries[code]
  const content = countryHome[code]

  return buildMetadata({
    country: code,
    title: `${c.positioning} in ${c.name}`,
    // SRS §7.4 — unique description per country variant, drawn from the
    // market's own answer statement rather than a shared template.
    description: content.answer.slice(0, 158),
    hreflangGroupId: 'home',
    image: c.heroImage,
    keywords: [c.positioning, ...c.positioningAlt],
  })
}

export default async function CountryHomePage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]

  const [data, services] = await Promise.all([
    buildMarketPageData(code),
    getServices(code),
  ])

  return (
    <>
      {/*
        No FAQPage markup here — this layout has no FAQ section, and FAQPage
        must describe content that is actually visible on the page. The FAQs
        in src/content/countries.ts are still emitted on the pages that
        render them.
      */}
      <JsonLd
        data={graph(
          breadcrumbSchema([{ name: c.name, href: `/${code}/` }]),
          ...services.slice(0, 4).map((s) =>
            serviceSchema({
              country: code,
              name: s.title,
              description: s.summary,
              url: buildUrl(code, s.slug),
              serviceType: s.title,
            })
          )
        )}
      />

      {/* SRS §7.3 — suggestion only, never a redirect. */}
      <GeoSuggestion current={code} tone="market" />

      <MarketHeader
        country={code}
        home={data.home}
        serviceLinks={data.serviceLinks}
        industryLinks={data.industryLinks}
        phone={data.contact.phone}
        phoneHref={data.contact.phoneHref}
      />

      <MarketHome country={code} data={data} />

      <MarketFooter country={code} data={data} />
    </>
  )
}
