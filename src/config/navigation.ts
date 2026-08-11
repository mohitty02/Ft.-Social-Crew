import type { CountryCode } from '@/types'
import {
  services,
  coreServices,
  resolveServiceSlug,
  resolveServiceTitle,
  resolveServiceShortDescription,
} from './services'
import { industries } from './industries'
import { getCities } from './cities'

/**
 * Navigation is generated from the taxonomies, never hand-listed — so a new
 * service, industry or city appears in the mega-menu automatically. This is
 * the navigational half of SRS §1.7.
 */

export interface NavLink {
  label: string
  href: string
  description?: string
}

export interface NavGroup {
  label: string
  href: string
  columns?: { title: string; links: NavLink[] }[]
  featured?: { title: string; description: string; href: string; cta: string }
}

export function buildNavigation(country: CountryCode): NavGroup[] {
  const base = `/${country}`

  const toLink = (s: (typeof services)[number]) => ({
    label: resolveServiceTitle(s, country),
    href: `${base}/${resolveServiceSlug(s, country)}/`,
    // Not `s.shortDescription` — that hard-codes English into the German
    // mega-menu, beside a German label.
    description: resolveServiceShortDescription(s, country),
  })

  // Only the core tier reaches the mega-menu. Listing all of them would put
  // twenty-plus items behind one hover, which is a directory rather than a
  // menu; the specialisms are reachable from the hub and from their parent's
  // own page, where the visitor has already shown interest in that area.
  //
  // The split is by real category, not by halving the array — a positional
  // split silently mislabels every entry the moment a service is added.
  const acquisitionLinks = coreServices
    .filter((s) => s.category === 'Acquisition' || s.category === 'Conversion')
    .map(toLink)
  const platformLinks = coreServices
    .filter((s) => s.category !== 'Acquisition' && s.category !== 'Conversion')
    .map(toLink)

  const industryHalf = Math.ceil(industries.length / 2)
  const cities = getCities(country)

  return [
    {
      label: 'Services',
      href: `${base}/services/`,
      columns: [
        { title: 'Growth & acquisition', links: acquisitionLinks },
        { title: 'Platform & advisory', links: platformLinks },
      ],
      featured: {
        title: 'How we work',
        description:
          'A documented four-stage method — audit, architecture, execution, compounding. Same standard of evidence in every market.',
        href: `${base}/about/`,
        cta: 'See the methodology',
      },
    },
    {
      label: 'Industries',
      href: `${base}/industries/`,
      columns: [
        {
          title: 'Verticals',
          links: industries.slice(0, industryHalf).map((i) => ({
            label: i.name,
            href: `${base}/industries/${i.slug}/`,
          })),
        },
        {
          title: 'Verticals',
          links: industries.slice(industryHalf).map((i) => ({
            label: i.name,
            href: `${base}/industries/${i.slug}/`,
          })),
        },
      ],
    },
    {
      label: 'Locations',
      href: `${base}/locations/`,
      columns: [
        {
          title: 'Where we operate',
          links: cities.slice(0, Math.ceil(cities.length / 2)).map((c) => ({
            label: c.name,
            href: `${base}/locations/${c.slug}/`,
          })),
        },
        {
          title: ' ',
          links: cities.slice(Math.ceil(cities.length / 2)).map((c) => ({
            label: c.name,
            href: `${base}/locations/${c.slug}/`,
          })),
        },
      ],
    },
    {
      label: 'Work',
      href: `${base}/case-studies/`,
      columns: [
        {
          title: 'Proof',
          links: [
            { label: 'Case studies', href: `${base}/case-studies/` },
            { label: 'Testimonials', href: `${base}/testimonials/` },
            { label: 'Comparisons', href: `${base}/compare/agency-x/` },
          ],
        },
        {
          title: 'Learn',
          links: [
            { label: 'Blog', href: `${base}/blog/` },
            { label: 'Resources', href: `${base}/resources/` },
            { label: 'Pricing', href: `${base}/pricing/` },
          ],
        },
      ],
    },
    { label: 'About', href: `${base}/about/` },
  ]
}

export function buildFooterNavigation(country: CountryCode) {
  const base = `/${country}`
  return [
    {
      title: 'Services',
      // Core tier only — a footer column is not the place for the full
      // twenty-plus catalogue. `services` would silently start emitting
      // specialisms here the moment the taxonomy grew.
      links: coreServices.slice(0, 6).map((s) => ({
        label: resolveServiceTitle(s, country),
        href: `${base}/${resolveServiceSlug(s, country)}/`,
      })),
    },
    {
      title: 'Industries',
      links: industries.slice(0, 6).map((i) => ({
        label: i.name,
        href: `${base}/industries/${i.slug}/`,
      })),
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: `${base}/about/` },
        { label: 'Case studies', href: `${base}/case-studies/` },
        { label: 'Testimonials', href: `${base}/testimonials/` },
        { label: 'Careers', href: `${base}/careers/` },
        { label: 'Support', href: `${base}/support/` },
        { label: 'Contact', href: `${base}/contact/` },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: `${base}/blog/` },
        { label: 'Resources', href: `${base}/resources/` },
        { label: 'Pricing', href: `${base}/pricing/` },
        { label: 'Locations', href: `${base}/locations/` },
        { label: 'Privacy', href: `${base}/privacy/` },
        { label: 'Terms', href: `${base}/terms/` },
      ],
    },
  ]
}
