import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter, Inter_Tight, Poppins } from 'next/font/google'
import { site } from '@/config/site'
import { JsonLd } from '@/components/seo/JsonLd'
import { MarketMemory } from '@/components/international/MarketMemory'
import { graph, organizationSchema, websiteSchema } from '@/lib/seo/schema'
import '@/styles/globals.css'

/**
 * Fonts — self-hosted through next/font, so there are ZERO external font
 * requests and no render-blocking third-party connection.
 *
 * Three variable families, latin + latin-ext only (German diacritics). Only
 * the display face preloads; `adjustFontFallback` eliminates the swap-shift
 * that would otherwise cost us CLS.
 *
 * Fraunces (editorial serif) carries the luxury register; Inter carries
 * legibility; Inter Tight carries the brand plate's ALL-CAPS lockup voice in
 * eyebrows, pills and labels.
 */
const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: true,
})

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
  preload: false,
})

const interTight = Inter_Tight({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-tight',
  display: 'swap',
  weight: ['400', '500', '600'],
  preload: false,
})

/**
 * India market face. The India home page is art-directed against a geometric
 * sans with no serif register at all, so Fraunces is not used there. Latin
 * only and `preload: false` — this face is requested by one route, and
 * preloading it on the other five markets' pages would be wasted bytes.
 */
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-brand',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: true, address: true, email: true },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#470826',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${interTight.variable} ${poppins.variable}`}
    >
      <body className="font-sans antialiased">
        {/* WCAG 2.1 AA — skip link is the first focusable element. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-burgundy-700 focus:px-5 focus:py-3 focus:text-small focus:text-burgundy-100"
        >
          Skip to main content
        </a>

        {/* Site-wide entity graph — SRS §9.2 requires consistent entity facts
            so AI systems build a stable picture of the brand. */}
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />

        {/* Records a deliberate region choice so middleware.ts stops
            IP-routing the root for this visitor. Renders nothing. */}
        <MarketMemory />

        {children}
      </body>
    </html>
  )
}
