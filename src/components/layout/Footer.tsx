import Link from 'next/link'
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries, countryList } from '@/config/countries'
import { buildFooterNavigation } from '@/config/navigation'
import { site } from '@/config/site'
import { telHref } from '@/lib/i18n/format'
import { Button } from '@/components/ui/Button'

/**
 * Footer.
 *
 * Carries the localised NAP block (SRS §3.1 "Contact with localised
 * phone/office details", §9.1 "Consistent NAP" for entity SEO), the country
 * switcher, and per-market trust notes — e.g. the GDPR statement Germany
 * requires under SRS §23.5.
 */
export function Footer({ country }: { country: CountryCode }) {
  const c = countries[country]
  const columns = buildFooterNavigation(country)
  const isDe = country === 'de'

  return (
    <footer className="border-t border-ink/10 bg-paper-pure">
      {/* Conversion band */}
      <div className="border-b border-ink/10">
        <div className="container-shell py-14">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-h2 text-burgundy-700">
                {isDe
                  ? 'Sprechen wir über Ihre Prozesse'
                  : `Let's talk about what growth should look like`}
              </h2>
              <p className="mt-3 text-body text-ink-600">
                {isDe
                  ? 'Ein strukturiertes Erstgespräch, keine Verkaufspräsentation.'
                  : 'A straightforward first conversation — no pitch deck, no obligation.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={`/${country}/contact/`} variant="primary" size="lg" withArrow>
                {c.primaryCta}
              </Button>
              <Button href={`/${country}/pricing/`} variant="secondary" size="lg">
                {isDe ? 'Leistungen ansehen' : c.secondaryCta}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-shell py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand + NAP */}
          <div>
            <Link
              href={`/${country}/`}
              className="font-display text-[1.35rem] font-semibold text-burgundy-700"
            >
              Ft. Social Crew
            </Link>
            <p className="mt-3 max-w-xs text-small text-ink-600">
              {c.positioning} — {c.name}.
            </p>

            <address className="mt-6 space-y-3 not-italic">
              <p className="flex items-start gap-2.5 text-small text-ink-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" aria-hidden="true" />
                <span>
                  {c.office.street}
                  <br />
                  {c.office.city}, {c.office.region} {c.office.postalCode}
                  <br />
                  {c.office.country}
                </span>
              </p>
              <p className="flex items-center gap-2.5 text-small">
                <Phone className="h-4 w-4 shrink-0 text-gold-700" aria-hidden="true" />
                <a
                  href={telHref(c.phone)}
                  className="text-ink-600 underline-offset-4 hover:text-burgundy-700 hover:underline"
                >
                  {c.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5 text-small">
                <Mail className="h-4 w-4 shrink-0 text-gold-700" aria-hidden="true" />
                <a
                  href={`mailto:${c.email}`}
                  className="text-ink-600 underline-offset-4 hover:text-burgundy-700 hover:underline"
                >
                  {c.email}
                </a>
              </p>
            </address>

            {/* SRS §23.5 — GDPR handling stated clearly for the German market */}
            {c.trustNote && (
              <p className="mt-6 flex items-start gap-2.5 rounded-md border border-gold-300 bg-burgundy-100/25 p-3.5 text-small text-ink-600">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" aria-hidden="true" />
                <span>{c.trustNote}</span>
              </p>
            )}
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 font-tight text-eyebrow uppercase text-gold-700">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-small text-ink-600 underline-offset-4 transition-colors duration-fast hover:text-burgundy-700 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Regions — makes the single-domain global footprint legible (SRS §1.10) */}
      <div className="border-t border-ink/10">
        <div className="container-shell py-8">
          <p className="mb-4 font-tight text-eyebrow uppercase text-gold-700">
            Regions
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
            {countryList.map((item) => (
              <li key={item.code}>
                <Link
                  href={`/${item.code}/`}
                  className="text-small text-ink-600 underline-offset-4 transition-colors duration-fast hover:text-burgundy-700 hover:underline"
                  aria-current={item.code === country ? 'true' : undefined}
                >
                  {item.name}
                  <span className="ml-1.5 text-ink-300">{item.currency}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="container-shell flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-ink-400">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link
              href={`/${country}/privacy/`}
              className="text-small text-ink-400 underline-offset-4 hover:text-burgundy-700 hover:underline"
            >
              Privacy
            </Link>
            <Link
              href={`/${country}/terms/`}
              className="text-small text-ink-400 underline-offset-4 hover:text-burgundy-700 hover:underline"
            >
              Terms
            </Link>
            <Link
              href={`/${country}/support/`}
              className="text-small text-ink-400 underline-offset-4 hover:text-burgundy-700 hover:underline"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
