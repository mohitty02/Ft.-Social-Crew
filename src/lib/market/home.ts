import type { CountryCode } from '@/types'
import { countries } from '@/config/countries'
import { industries as industryDefs, resolveIndustryName } from '@/config/industries'
import {
  services as serviceDefs,
  resolveServiceSlug,
  resolveServiceTitle,
  resolveServiceShortDescription,
} from '@/config/services'
import { getServices, getCaseStudies, getBlogPosts } from '@/lib/data'
import { getTestimonials } from '@/lib/data'
import { indiaCurated } from '@/content/marketHome'
import { resolveMarketHome, resolveMarketSettings, type ResolvedMarketHome } from './content'
import { formatDate, telHref } from '@/lib/i18n/format'

/**
 * Assembles everything the market home layout renders, per country.
 *
 * The layout is one component for all six markets; only the data differs. Five
 * markets read the repository's own per-country content through the CMS
 * boundary in `@/lib/data` — already localised, already anonymised. India
 * renders the client's approved comp content instead (see `indiaCurated`).
 *
 * Keeping the branch here rather than inside the components means the layout
 * itself never knows which market it is drawing.
 */

export interface MarketLink {
  label: string
  href: string
}

export interface MarketPageData {
  /** The market's home-page copy, CMS first. */
  home: ResolvedMarketHome
  services: { icon: string; title: string; description: string; href: string }[]
  cases: {
    client: string
    industry: string
    href: string
    results: { value: string; label: string }[]
  }[]
  testimonials: { quote: string; name: string; role: string; client: string }[]
  posts: { category: string; date: string; title: string; href: string; image: string }[]
  contact: {
    phone: string
    phoneHref: string
    email: string
    emailHref: string
    address: string[]
  }
  serviceLinks: MarketLink[]
  industryLinks: MarketLink[]
}

/** Market-correct vertical label for a slug: `real-estate` → `Immobilien` on /de/. */
function industryLabel(slug: string, country: CountryCode): string {
  const def = industryDefs.find((i) => i.slug === slug)
  if (def) return resolveIndustryName(def, country)
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export async function buildMarketPageData(
  country: CountryCode
): Promise<MarketPageData> {
  const c = countries[country]
  const base = `/${country}`

  // Menu and footer link lists are generated from the taxonomies, so a new
  // service or vertical appears here without this file changing.
  const serviceLinks: MarketLink[] = serviceDefs.slice(0, 6).map((s) => ({
    label: resolveServiceTitle(s, country),
    href: `${base}/${resolveServiceSlug(s, country)}/`,
  }))

  const industryLinks: MarketLink[] = industryDefs.slice(0, 6).map((i) => ({
    label: resolveIndustryName(i, country),
    href: `${base}/industries/${i.slug}/`,
  }))

  const [posts, home, settings] = await Promise.all([
    getBlogPosts(country),
    resolveMarketHome(country),
    resolveMarketSettings(country),
  ])

  const mappedPosts = posts.slice(0, 4).map((p) => ({
    category: p.category,
    date: formatDate(p.publishedAt, country),
    title: p.title,
    href: `${base}/blog/${p.slug}/`,
    image: p.image,
  }))

  /*
   * Contact details come from the resolved market settings for every market,
   * CMS first. India used to carry a hard-coded address here, transcribed
   * from the original comp — that now silently overrode what the client had
   * updated in the CMS, so it is gone. The same record feeds LocalBusiness
   * schema, so the page and the structured data cannot disagree.
   */
  const address = [
    `${settings.office.street},`,
    [settings.office.city, settings.office.region].filter(Boolean).join(', '),
    [settings.office.postalCode, settings.office.country].filter(Boolean).join(', '),
  ].filter((line) => line.replace(/[,\s]/g, '').length > 0)

  const contact = {
    phone: settings.phone,
    phoneHref: telHref(settings.phone),
    email: settings.email,
    emailHref: `mailto:${settings.email}`,
    address,
  }

  if (country === 'in') {
    return {
      services: indiaCurated.services.map((s) => ({
        icon: s.icon,
        title: s.title,
        description: s.description,
        href: `${base}/${s.slug}/`,
      })),
      cases: indiaCurated.cases.map((cs) => ({
        client: cs.client,
        industry: cs.industry,
        href: `${base}/case-studies/`,
        results: cs.results.map((r) => ({ value: r.value, label: r.label })),
      })),
      testimonials: indiaCurated.testimonials.map((t) => ({
        quote: t.quote,
        name: t.name,
        role: t.role,
        client: t.client,
      })),
      home,
      posts: mappedPosts,
      contact,
      serviceLinks,
      industryLinks,
    }
  }

  const [services, cases] = await Promise.all([
    getServices(country),
    getCaseStudies(country),
  ])
  const testimonials = await getTestimonials(country)

  return {
    services: services.slice(0, 6).map((s) => ({
      icon: s.icon,
      title: s.title,
      // The full framing paragraph is too long for a compact card; the
      // taxonomy's short description is what that slot was written for.
      description: (() => {
        const def = serviceDefs.find(
          (d) => resolveServiceSlug(d, country) === s.slug
        )
        return def ? resolveServiceShortDescription(def, country) : s.summary
      })(),
      href: `${base}/${s.slug}/`,
    })),

    cases: cases.slice(0, 3).map((cs) => ({
      client: cs.client,
      industry: industryLabel(cs.industry, country),
      href: `${base}/case-studies/${cs.slug}/`,
      results: cs.results.map((r) => ({ value: r.metric, label: r.label })),
    })),

    testimonials: testimonials.map((t) => ({
      quote: t.quote,
      name: t.author,
      role: t.role,
      client: t.company,
    })),

    home,
    posts: mappedPosts,

    contact,

    serviceLinks,
    industryLinks,
  }
}
