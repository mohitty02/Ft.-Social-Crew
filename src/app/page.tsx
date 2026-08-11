import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Globe } from 'lucide-react'
import { countryList, defaultCountry } from '@/config/countries'
import { site } from '@/config/site'
import { Pill } from '@/components/ui/Pill'
import { GeoSuggestion } from '@/components/international/GeoSuggestion'

/**
 * Global region selector.
 *
 * This page used to BE the root experience — SRS §7.3 called for a soft
 * suggestion banner and "never a forced redirect". At the client's request
 * middleware.ts now geo-routes `/` to a market, so a visitor only lands here
 * deliberately, via `/?global=1` or the escape hatch in the switchers.
 *
 * It is therefore noindex: crawlers hitting `/` get the 307 and never see this
 * page, and `?global=1` should not compete with the six country homes for the
 * brand query. x-default moves to the US market, matching what
 * buildLanguageAlternates() emits on every other page and what an unmatched IP
 * actually resolves to.
 */
export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  robots: { index: false, follow: true },
  alternates: {
    languages: {
      ...Object.fromEntries(
        countryList.map((c) => [c.locale, `${site.url}/${c.code}/`])
      ),
      'x-default': `${site.url}/${defaultCountry}/`,
    },
  },
}

export default function GlobalRootPage() {
  return (
    <>
      <GeoSuggestion />

      <main id="main" className="min-h-screen bg-paper">
        <div className="container-shell py-16 lg:py-24">
          <header className="max-w-3xl">
            <Pill variant="outline" size="md">
              <Globe className="mr-1.5 h-3 w-3" aria-hidden="true" />
              Global
            </Pill>
            <p className="mt-7 font-display text-[1.5rem] font-semibold text-[color:var(--text-brand)]">
              Ft. Social Crew
            </p>
            <h1 className="mt-5 font-display text-display-1 text-[color:var(--text-brand)]">
              One team.{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Six markets.</span>
                <span
                  className="absolute inset-x-0 bottom-[0.12em] z-0 h-[3px] bg-gold-300"
                  aria-hidden="true"
                />
              </span>
            </h1>
            <p className="mt-7 max-w-prose text-lead text-ink-600">
              We operate as a growth partner across India, the United States,
              Canada, Australia, Germany and the United Arab Emirates — with a
              different argument in each market, because the buyer is different
              in each market. Choose your region to see the one built for you.
            </p>
          </header>

          {/* The selector is real, crawlable content — not a modal gate. */}
          <nav aria-label="Select your region" className="mt-14">
            <h2 className="mb-6 font-tight text-eyebrow uppercase text-accent">
              Select your region
            </h2>
            <ul className="grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
              {countryList.map((c) => (
                <li key={c.code} className="bg-paper-pure">
                  <Link
                    href={`/${c.code}/`}
                    data-market={c.code}
                    className="group flex h-full flex-col p-7 transition-colors duration-base hover:bg-accent-soft"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-display text-h3 text-[color:var(--text-brand)]">
                        {c.name}
                      </span>
                      <ArrowRight
                        className="mt-1.5 h-5 w-5 shrink-0 text-[color:var(--text-brand)] transition-transform duration-base ease-out group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-3 flex-1 text-small text-ink-600">
                      {c.positioning}
                    </p>
                    <p className="mt-6 font-tight text-eyebrow uppercase text-accent">
                      /{c.code}/ · {c.currency} · {c.locale}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-10 max-w-prose text-small text-ink-400">
            Every regional site is directly accessible and independently
            indexable. We send you to your own market on arrival, but nothing is
            locked — if you want to read the German market pages from Toronto,
            pick Deutschland above and we will remember it.
          </p>
        </div>
      </main>
    </>
  )
}
