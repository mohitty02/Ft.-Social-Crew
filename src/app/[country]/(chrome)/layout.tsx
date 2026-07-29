import { notFound } from 'next/navigation'
import type { CountryCode } from '@/types'
import { isCountryCode } from '@/config/countries'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyCta } from '@/components/conversion/StickyCta'
import { GeoSuggestion } from '@/components/international/GeoSuggestion'

/**
 * Shared chrome for every country route except the home page.
 *
 * Route groups are URL-transparent, so `(chrome)/about/page.tsx` still serves
 * `/{country}/about/`. Splitting the chrome out of the country layout is what
 * lets `(home)` render a market-specific header and footer.
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

  return (
    <>
      {/* SRS §7.3 — suggestion only, never a redirect. */}
      <GeoSuggestion current={code} />

      <Header country={code} />

      <main id="main">{children}</main>

      <Footer country={code} />

      {/* SRS §22.1 — mobile is the primary breakpoint, so the primary
          conversion mechanism lives there. */}
      <StickyCta country={code} />
    </>
  )
}
