import type { MetadataRoute } from 'next'
import { countryCodes, countries } from '@/config/countries'
import { citiesByCountry } from '@/config/cities'
import { industries } from '@/config/industries'
import {
  services as serviceDefs,
  cityServiceDefinitions,
  resolveServiceSlug,
} from '@/config/services'
import { getBlogPosts, getCaseStudies, competitors } from '@/lib/data'
import { site } from '@/config/site'
import { buildUrl } from '@/lib/seo/metadata'

/**
 * XML sitemap.
 *
 * SRS §7.5 requires segmentation per country + content type, and §8.3 requires
 * chunking to stay under the 50,000 URL / 50 MB limit. At current volume the
 * whole site fits in one document comfortably; the entries below are emitted
 * grouped by country and type so splitting into a sitemap index is a
 * mechanical change when volume demands it.
 *
 * SRS §7.7: "priority indexing signals favour money pages over low-value
 * combinatorial pages" — reflected in the priority values.
 *
 * SRS §3.1: campaign landing pages are noindex and are deliberately ABSENT.
 *
 * The bare root is also absent: middleware.ts geo-routes `/` to a market, so
 * listing it would submit a URL that answers 307 and earn a "Page with
 * redirect" exclusion in Search Console. The six country homes below are the
 * real entry points.
 */
// Emitted at build time rather than on publish event (SRS §8). Same output,
// different trigger — and it keeps the sitemap off the server runtime.
export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const country of countryCodes) {
    const c = countries[country]
    if (c.status !== 'active') continue

    // Country home — highest priority money page
    entries.push({
      url: buildUrl(country),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    })

    // Core hubs and money pages
    const hubs: [string, number][] = [
      ['services', 0.9],
      ['industries', 0.8],
      ['locations', 0.8],
      ['case-studies', 0.8],
      ['pricing', 0.9],
      ['contact', 0.9],
      ['about', 0.7],
      ['testimonials', 0.6],
      ['blog', 0.7],
      ['resources', 0.6],
      ['careers', 0.4],
      ['support', 0.4],
      ['privacy', 0.2],
      ['terms', 0.2],
    ]
    for (const [path, priority] of hubs) {
      entries.push({
        url: buildUrl(country, path),
        lastModified: now,
        changeFrequency: 'monthly',
        priority,
      })
    }

    // Services — money pages (SRS §7.7)
    for (const def of serviceDefs) {
      entries.push({
        url: buildUrl(country, resolveServiceSlug(def, country)),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.9,
      })
    }

    // Industries and industry × service
    for (const ind of industries) {
      entries.push({
        url: buildUrl(country, `industries/${ind.slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
      for (const svc of ind.primaryServices) {
        const def = serviceDefs.find((s) => s.slug === svc)
        if (!def) continue
        entries.push({
          url: buildUrl(country, `industries/${ind.slug}/${resolveServiceSlug(def, country)}`),
          lastModified: now,
          changeFrequency: 'monthly',
          // Long-tail combinatorial — deliberately lower than money pages.
          priority: 0.5,
        })
      }
    }

    // Cities and city × service
    for (const city of citiesByCountry[country] ?? []) {
      entries.push({
        url: buildUrl(country, `locations/${city.slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
      // Same source of truth as the route generator and the linking
      // components — the sitemap cannot list a page that was not built.
      for (const def of cityServiceDefinitions) {
        entries.push({
          url: buildUrl(country, `locations/${city.slug}/${resolveServiceSlug(def, country)}`),
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.4,
        })
      }
    }

    // Case studies
    const caseStudies = await getCaseStudies(country)
    for (const cs of caseStudies) {
      entries.push({
        url: buildUrl(country, `case-studies/${cs.slug}`),
        lastModified: new Date(cs.publishedAt),
        changeFrequency: 'yearly',
        priority: 0.6,
      })
    }

    // Blog
    const posts = await getBlogPosts(country)
    for (const post of posts) {
      entries.push({
        url: buildUrl(country, `blog/${post.slug}`),
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }

    // Comparison — high commercial intent (SRS §10.1)
    for (const comp of competitors) {
      entries.push({
        url: buildUrl(country, `compare/${comp.slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}
