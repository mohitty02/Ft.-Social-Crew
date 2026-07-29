import { notFound } from 'next/navigation'
import type { CountryCode } from '@/types'
import { countryCodes, countries, isCountryCode } from '@/config/countries'
import { JsonLd } from '@/components/seo/JsonLd'
import { graph, localBusinessSchema } from '@/lib/seo/schema'

/**
 * The country shell.
 *
 * `generateStaticParams` reads the country registry, which is the whole of
 * SRS §1.7 in practice: adding country #7 means appending one object to
 * src/config/countries.ts. This file does not change. Neither does any page.
 *
 * LocalBusiness schema is emitted here rather than per page, so SRS §7.6's
 * "LocalBusiness (per country)" requirement is satisfied for every route in
 * the folder without a single page hand-writing it (SRS §1.12).
 *
 * Chrome (header, footer, sticky CTA) is NOT here — it lives in the
 * `(chrome)` route group. The home route sits in `(home)` instead, so a
 * market whose home page ships its own art-directed header and footer (India,
 * see src/components/india/) can opt out of the shared chrome without every
 * other route in the folder being affected.
 */
export function generateStaticParams() {
  return countryCodes.map((country) => ({ country }))
}

export const dynamicParams = false

export default async function CountryLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]

  return (
    <div lang={c.locale}>
      {/*
        The App Router root layout owns <html> and cannot see the [country]
        param, so the document language is corrected here. The wrapping
        `lang` above is spec-valid and is what assistive technology actually
        honours; this sets documentElement.lang before paint so the document
        language is right too. Hreflang (emitted server-side) remains the
        signal search engines use for market targeting.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(c.locale)}`,
        }}
      />

      <JsonLd data={graph(localBusinessSchema(code))} />

      {/* SRS §7.3's geo-suggestion banner sits ABOVE the header, so it is
          rendered next to the header rather than here — it has to match
          whichever design system that header belongs to. */}
      {children}
    </div>
  )
}
