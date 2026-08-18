/**
 * Content types.
 *
 * These mirror the SRS §4.3 table definitions field-for-field. That is
 * deliberate: when the platform in SRS §4/§6/§21.2 is built, the CMS models
 * map 1:1 onto these interfaces and the frontend needs no refactor.
 *
 * `countryId` is present on every content entity because SRS §4 makes Country
 * the primary partition key across almost every table.
 */

export type CountryCode = 'in' | 'en-us' | 'en-ca' | 'en-au' | 'de' | 'en-ae'

export type ContentStatus = 'draft' | 'review' | 'seo_approved' | 'published'

/** SRS §1.5 — the revenue model differs per market, so Pricing does too. */
export type PricingMode = 'productized' | 'consultative'

/** SRS §15.1 — short form on service pages, qualifying form on pricing/contact. */
export type LeadFormVariant = 'short' | 'qualifying'

export interface SeoMeta {
  /** SRS §4.3: SEOMeta is polymorphic (entity_type + entity_id). */
  entityType: string
  entityId: string
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  noindex?: boolean
  /** SRS §7.1 — links country/language equivalents of the same page. */
  hreflangGroupId?: string
}

export interface Country {
  id: string
  code: CountryCode
  name: string
  /** BCP-47, e.g. en-US. Drives <html lang> and Intl formatting. */
  locale: string
  currency: string
  currencySymbol: string
  timezone: string
  status: 'active' | 'draft' | 'archived'
  searchConsoleProperty: string

  /** SRS §2.1 — the positioning that must lead in H1s, titles and ad copy. */
  positioning: string
  positioningAlt: string[]
  /** SRS §2.2 — why this positioning works in this market. */
  positioningRationale: string

  /** SRS §7.4 — spelling must differ between English variants. */
  spelling: 'en-IN' | 'en-US' | 'en-CA' | 'en-AU' | 'de-DE' | 'en-AE'
  pricingMode: PricingMode
  /** SRS §15.1 — WhatsApp only where it is the dominant business channel. */
  whatsapp: boolean
  phone: string
  email: string
  /**
   * Whether this market's phone and postal address are real.
   *
   * Only India is. The other five carry placeholder contact details that came
   * in with the design comps — the numbers are from the reserved 555 test range
   * and the addresses are well-known office towers used as stand-ins.
   *
   * LocalBusiness schema reads this and refuses to assert an unverified address
   * or telephone. Publishing a fabricated physical location in structured data
   * tells Google the company has premises it does not have, and hands a
   * prospect a number that rings nowhere.
   */
  contactVerified: boolean
  office: {
    street: string
    city: string
    region: string
    postalCode: string
    country: string
  }
  /** SRS §23 — the CTA verb this market responds to. */
  primaryCta: string
  secondaryCta: string
  /** SRS §23 — market-specific lead magnet. */
  leadMagnet: { title: string; description: string; format: string }
  /** SRS §23.5 — e.g. GDPR statement for Germany. */
  trustNote?: string
  heroImage: string
  cityImage: string
}

export interface Service {
  id: string
  countryId: CountryCode
  slug: string
  title: string
  /** SRS §9.2 GEO — the direct, quotable answer statement. */
  answer: string
  summary: string
  icon: string
  outcomes: string[]
  deliverables: string[]
  process: { step: string; title: string; description: string }[]
  faqs: Faq[]
  status: ContentStatus
  seo: SeoMeta
}

export interface Industry {
  id: string
  countryId: CountryCode
  slug: string
  name: string
  answer: string
  /** SRS §24 — every vertical has a documented persona + pain points. */
  buyerPersona: string
  painPoints: string[]
  servicesRequired: string[]
  seoStrategy: string
  contentIdeas: string[]
  leadMagnet: string
  caseStudyIdea: string
  image: string
  status: ContentStatus
}

export interface City {
  id: string
  countryId: CountryCode
  slug: string
  name: string
  region: string
  answer: string
  /** SRS §11.3 quality gate — required before a programmatic page may index. */
  localProofPoint: string
  uniqueIntro: string
  testimonialId: string
  population?: string
  image: string
}

export interface CaseStudy {
  id: string
  countryId: CountryCode
  slug: string
  title: string
  client: string
  /** Placeholder client names are flagged so nothing fabricated ships as real. */
  isPlaceholder: boolean
  industry: string
  service: string
  challenge: string
  approach: string[]
  results: { metric: string; label: string; detail: string }[]
  /** Set when the figures are targets or projections rather than achieved results. */
  resultsNote?: string
  beforeAfter?: { before: string; after: string }[]
  timeframe?: string
  impact?: string
  quote?: { text: string; author: string; role: string }
  image: string
  publishedAt: string
}

export interface BlogPost {
  id: string
  countryId: CountryCode
  slug: string
  title: string
  excerpt: string
  answer: string
  category: string
  /** SRS §11.2 — which cluster this supports. */
  cluster: string
  authorId: string
  publishedAt: string
  updatedAt: string
  readingTime: number
  image: string
  body: ContentBlock[]
  faqs?: Faq[]
}

export type ContentBlock =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'callout'; title: string; text: string }
  | { type: 'quote'; text: string; attribution: string }

export interface Author {
  id: string
  name: string
  role: string
  bio: string
  expertise: string[]
  image: string
  isPlaceholder: boolean
}

export interface Testimonial {
  id: string
  countryId: CountryCode
  quote: string
  author: string
  role: string
  company: string
  industry: string
  isPlaceholder: boolean
  image?: string
  rating: number
  hasVideo?: boolean
}

export interface Faq {
  question: string
  answer: string
}

export interface PricingPlan {
  id: string
  countryId: CountryCode
  name: string
  /** Null on consultative markets — SRS §23.6 "consultation-first over self-serve". */
  price: number | null
  period: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export interface Resource {
  id: string
  countryId: CountryCode
  slug: string
  title: string
  description: string
  format: 'Guide' | 'Template' | 'Checklist' | 'Calculator' | 'Report'
  category: string
  image: string
  readingTime?: number
}

export interface Competitor {
  slug: string
  name: string
  positioning: string
  comparison: { dimension: string; us: string; them: string }[]
}

export interface Breadcrumb {
  name: string
  href: string
}
