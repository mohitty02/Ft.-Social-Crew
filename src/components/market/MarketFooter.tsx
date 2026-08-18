import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react'
import type { CountryCode } from '@/types'
import { site } from '@/config/site'
import type { ResolvedMarketHome } from '@/lib/market/content'
import type { MarketPageData } from '@/lib/market/home'
import { MarketLogo } from './MarketLogo'

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/ftsocialcrew', Glyph: Facebook },
  { label: 'Instagram', href: site.social.instagram, Glyph: Instagram },
  { label: 'LinkedIn', href: site.social.linkedin, Glyph: Linkedin },
  { label: 'YouTube', href: site.social.youtube, Glyph: Youtube },
]

export function MarketFooter({
  country,
  data,
}: {
  country: CountryCode
  data: MarketPageData
}) {
  const home = data.home
  const m = home
  const base = `/${country}`

  const quickLinks = [
    { label: m.nav.home, href: `${base}/` },
    { label: m.nav.about, href: `${base}/about/` },
    { label: m.nav.services, href: `${base}/services/` },
    { label: m.nav.cases, href: `${base}/case-studies/` },
    { label: m.nav.blog, href: `${base}/blog/` },
    { label: m.nav.contact, href: `${base}/contact/` },
  ]

  const columns = [
    { title: m.footer.quickLinks, links: quickLinks },
    { title: m.footer.ourServices, links: data.serviceLinks },
    { title: m.footer.industriesTitle, links: data.industryLinks },
  ]

  return (
    <footer className="bg-steel-900 font-brand text-white">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.25fr_1fr_1.25fr] lg:gap-8">
          {/* Brand */}
          <div>
            <MarketLogo tone="dark" />
            <p className="mt-5 max-w-xs text-[0.8125rem] leading-relaxed text-white/60">
              {m.footer.blurb}
            </p>
            <ul className="mt-6 flex items-center gap-2.5">
              {socials.map(({ label, href, Glyph }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-card bg-white/[0.07] text-white/70 transition-colors duration-200 hover:bg-accent hover:text-white"
                  >
                    <Glyph className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[0.875rem] font-semibold text-white">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-[0.8125rem] text-white/60 transition-colors duration-200 hover:text-brand-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h2 className="text-[0.875rem] font-semibold text-white">
              {m.footer.contact}
            </h2>
            <ul className="mt-5 space-y-4 text-[0.8125rem] text-white/60">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                <address className="not-italic leading-relaxed">
                  {data.contact.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                <a
                  href={data.contact.phoneHref}
                  className="transition-colors duration-200 hover:text-brand-300"
                >
                  {data.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                <a
                  href={data.contact.emailHref}
                  className="transition-colors duration-200 hover:text-brand-300"
                >
                  {data.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-3 px-5 py-5 text-[0.75rem] text-white/45 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>{m.footer.copyright}</p>
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href={`${base}/privacy/`}
                className="transition-colors duration-200 hover:text-white/80"
              >
                {m.footer.privacy}
              </Link>
            </li>
            <li>
              <Link
                href={`${base}/terms/`}
                className="transition-colors duration-200 hover:text-white/80"
              >
                {m.footer.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
