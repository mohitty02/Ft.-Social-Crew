import type { CountryCode } from '@/types'
import { services, resolveServiceSlug, resolveServiceTitle } from './services'
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

  const serviceLinks = services.map((s) => ({
    label: resolveServiceTitle(s, country),
    href: `${base}/${resolveServiceSlug(s, country)}/`,
    description: s.shortDescription,
  }))

  const half = Math.ceil(serviceLinks.length / 2)
  const industryHalf = Math.ceil(industries.length / 2)
  const cities = getCities(country)

  return [
    {
      label: 'Services',
      href: `${base}/services/`,
      columns: [
        { title: 'Growth & acquisition', links: serviceLinks.slice(0, half) },
        { title: 'Platform & advisory', links: serviceLinks.slice(half) },
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
      links: services.slice(0, 6).map((s) => ({
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
