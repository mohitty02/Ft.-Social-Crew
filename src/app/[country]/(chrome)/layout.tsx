import { notFound } from 'next/navigation'
import type { CountryCode } from '@/types'
import { isCountryCode } from '@/config/countries'
import { buildMarketPageData } from '@/lib/market/home'
import { MarketHeader } from '@/components/market/MarketHeader'
import { MarketFooter } from '@/components/market/MarketFooter'
import { StickyCta } from '@/components/conversion/StickyCta'
import { GeoSuggestion } from '@/components/international/GeoSuggestion'

/**
 * Shared chrome for every country route except the home page.
 *
 * Route groups are URL-transparent, so `(chrome)/about/page.tsx` still serves
 * `/{country}/about/`. Internal pages carry the same header and footer as the
 * home page — one chrome across the whole site, per market.
 */
export default async function ChromeLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const data = await buildMarketPageData(code)

  return (
    <>
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

      <main id="main" className="bg-white font-brand">
        {children}
      </main>

      <MarketFooter country={code} data={data} />

      {/* SRS §22.1 — mobile is the primary breakpoint, so the primary
          conversion mechanism lives there. */}
      <StickyCta country={code} />
    </>
  )
}
