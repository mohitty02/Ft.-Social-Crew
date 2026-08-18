import type { CountryCode } from '@/types'

/**
 * Build-time reader for the Laravel CMS.
 *
 * The whole content tree arrives in one request, once per build, and every
 * `@/lib/data` function reads from that snapshot. Nothing here runs per
 * visitor — the public site stays fully prerendered.
 *
 * If the CMS is unreachable or `CMS_URL` is unset, this returns null and the
 * data layer falls back to the content committed in this repository. A build
 * must never fail because the CMS is down, and the site must keep serving.
 */

export interface CmsResult {
  metric: string
  label: string
  detail?: string
}

export interface CmsCaseStudy {
  slug: string
  title: string
  client: string | null
  industry: string | null
  service: string | null
  timeframe: string | null
  challenge: string | null
  approach: string[]
  results: CmsResult[]
  resultsNote: string | null
  beforeAfter: { before: string; after: string }[]
  impact: string | null
  quote: { text?: string; author?: string; role?: string } | null
  isPlaceholder: boolean
  publishedAt: string | null
  image: string | null
}

export interface CmsMarket {
  code: CountryCode
  name: string
  services: {
    slug: string
    title: string
    icon: string | null
    category: string | null
    shortDescription: string | null
    summary: string | null
    answer: string | null
    outcomes: string[]
    deliverables: string[]
    process: { step?: string; title: string; description: string }[]
    faqs: { question: string; answer: string }[]
    image: string | null
  }[]
  industries: {
    slug: string
    name: string
    icon: string | null
    buyerPersona: string | null
    painPoints: string[]
    servicesRequired: string[]
    seoStrategy: string | null
    contentIdeas: string[]
    leadMagnet: string | null
    caseStudyIdea: string | null
    primaryServices: string[]
    image: string | null
  }[]
  cities: {
    slug: string
    name: string
    region: string | null
    localProofPoint: string | null
    uniqueIntro: string | null
    answer: string | null
    image: string | null
  }[]
  caseStudies: CmsCaseStudy[]
  testimonials: {
    quote: string
    author: string | null
    role: string | null
    company: string | null
    industry: string | null
    rating: number
    hasVideo: boolean
    isPlaceholder: boolean
    image: string | null
  }[]
  blogPosts: {
    slug: string
    title: string
    excerpt: string | null
    answer: string | null
    category: string | null
    cluster: string | null
    authorId: string | null
    body: unknown[]
    faqs: { question: string; answer: string }[]
    readingTime: number
    publishedAt: string | null
    updatedAt: string | null
    image: string | null
  }[]
  resources: {
    slug: string
    title: string
    description: string | null
    format: string | null
    category: string | null
    readingTime: number
    image: string | null
  }[]
  pricing: {
    name: string
    price: number | null
    period: string | null
    description: string | null
    features: string[]
    highlighted: boolean
    cta: string | null
  }[]
}

export interface CmsSite {
  generatedAt: string
  markets: CmsMarket[]
}

const CMS_URL = process.env.CMS_URL?.replace(/\/$/, '')

/** One fetch per build, shared by every call site. */
let snapshot: Promise<CmsSite | null> | null = null

async function load(): Promise<CmsSite | null> {
  if (!CMS_URL) return null

  try {
    const res = await fetch(`${CMS_URL}/api/v1/site`, {
      /*
       * `force-cache`, not `no-store`. This runs during prerendering, and a
       * no-store fetch marks the route dynamic — which silently drops every
       * page that reads content back to the repository fallback. The build
       * process is itself the cache lifetime: each deploy is a fresh process,
       * so this is one live read per build and a fully static site after it.
       */
      cache: 'force-cache',
      signal: AbortSignal.timeout(30_000),
      headers: { accept: 'application/json' },
    })

    if (!res.ok) {
      console.warn(`[cms] ${res.status} from ${CMS_URL} — falling back to repository content`)
      return null
    }

    const data = (await res.json()) as CmsSite
    const markets = data.markets?.length ?? 0
    console.log(`[cms] loaded ${markets} markets from ${CMS_URL}`)

    return markets > 0 ? data : null
  } catch (error) {
    console.warn(
      `[cms] unreachable (${(error as Error).message}) — falling back to repository content`
    )
    return null
  }
}

export function getCmsSite(): Promise<CmsSite | null> {
  snapshot ??= load()
  return snapshot
}

export async function getCmsMarket(country: CountryCode): Promise<CmsMarket | null> {
  const site = await getCmsSite()
  return site?.markets.find((m) => m.code === country) ?? null
}

export const cmsConfigured = Boolean(CMS_URL)
