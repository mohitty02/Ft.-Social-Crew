import type { Testimonial, CountryCode } from '@/types'
import { portraits } from '@/config/media'

/**
 * Testimonials — SRS §23 requires local testimonials per market, and §23.2
 * specifically calls for client video testimonials in the USA.
 *
 * PLACEHOLDER DATA. The SRS supplies no real client quotes. Every record is
 * flagged so the UI can label it; no invented company is presented as a
 * verified client.
 */
export const testimonials: Testimonial[] = [
  // India — SRS §23.1: client logos, INR transparent pricing, WhatsApp reviews
  {
    id: 't-in-1',
    countryId: 'in',
    quote:
      'We had four vendors and no single view of what was working. Consolidating into one growth plan was uncomfortable for a quarter and obviously correct by the second.',
    author: 'Managing Director',
    role: 'Managing Director',
    company: 'E-commerce group, Mumbai',
    industry: 'ecommerce',
    isPlaceholder: true,
    image: portraits[3],
    rating: 5,
  },
  {
    id: 't-in-2',
    countryId: 'in',
    quote:
      'The tier-2 city pages were the part we were most sceptical about and they now produce more qualified enquiries than our metro campaigns.',
    author: 'Marketing Head',
    role: 'Marketing Head',
    company: 'Education group, Pune',
    industry: 'education',
    isPlaceholder: true,
    image: portraits[0],
    rating: 5,
  },
  {
    id: 't-in-3',
    countryId: 'in',
    quote:
      'Published pricing meant we could budget before the first call. That alone put them ahead of every agency we shortlisted.',
    author: 'Founder',
    role: 'Founder',
    company: 'Real estate developer, Bengaluru',
    industry: 'real-estate',
    isPlaceholder: true,
    image: portraits[1],
    rating: 5,
  },

  // USA — SRS §23.2: real metrics, video testimonials, transparent process
  {
    id: 't-us-1',
    countryId: 'en-us',
    quote:
      'We were three months into a VP Marketing search. Six weeks with the fractional team told us more about our funnel than the search would have in a year.',
    author: 'CEO',
    role: 'Chief Executive Officer',
    company: 'B2B SaaS, Series B, San Francisco',
    industry: 'saas',
    isPlaceholder: true,
    image: portraits[5],
    rating: 5,
    hasVideo: true,
  },
  {
    id: 't-us-2',
    countryId: 'en-us',
    quote:
      'They told us in month two that a channel we had championed internally was not clearing its cost of capital. That conversation was worth the entire retainer.',
    author: 'Head of Growth',
    role: 'Head of Growth',
    company: 'DTC brand, Austin',
    industry: 'ecommerce',
    isPlaceholder: true,
    image: portraits[4],
    rating: 5,
    hasVideo: true,
  },
  {
    id: 't-us-3',
    countryId: 'en-us',
    quote:
      'Every claim came with the baseline and the attribution model attached. After four agencies, that was genuinely novel.',
    author: 'VP Marketing',
    role: 'VP Marketing',
    company: 'Professional services firm, Chicago',
    industry: 'professional-services',
    isPlaceholder: true,
    image: portraits[7],
    rating: 5,
  },

  // Canada — SRS §23.3: CAD pricing clarity, Canadian testimonials
  {
    id: 't-ca-1',
    countryId: 'en-ca',
    quote:
      'The assessment phase found two process problems we had been treating as marketing problems. We would have spent a year optimising the wrong thing.',
    author: 'Director of Operations',
    role: 'Director of Operations',
    company: 'Manufacturing firm, Calgary',
    industry: 'manufacturing',
    isPlaceholder: true,
    image: portraits[1],
    rating: 5,
  },
  {
    id: 't-ca-2',
    countryId: 'en-ca',
    quote:
      'Phased delivery meant we could pause after phase two while our own priorities shifted, and pick it up six months later without anything half-built.',
    author: 'Chief Marketing Officer',
    role: 'Chief Marketing Officer',
    company: 'Mid-market retail, Toronto',
    industry: 'ecommerce',
    isPlaceholder: true,
    image: portraits[0],
    rating: 5,
  },
  {
    id: 't-ca-3',
    countryId: 'en-ca',
    quote:
      'The bilingual work was built in French from the start rather than translated, and the difference in how it performed in Quebec was not subtle.',
    author: 'Marketing Director',
    role: 'Marketing Director',
    company: 'Professional services, Montréal',
    industry: 'professional-services',
    isPlaceholder: true,
    image: portraits[6],
    rating: 5,
  },

  // Australia — SRS §23.4: AUD pricing, verifiable ROI metrics
  {
    id: 't-au-1',
    countryId: 'en-au',
    quote:
      'Blended CAC was confronting the first month. It was also the first honest number anyone had shown us.',
    author: 'Founder',
    role: 'Founder',
    company: 'E-commerce brand, Melbourne',
    industry: 'ecommerce',
    isPlaceholder: true,
    image: portraits[4],
    rating: 5,
  },
  {
    id: 't-au-2',
    countryId: 'en-au',
    quote:
      'We hold the model in our own spreadsheet. Being able to check their arithmetic changed the entire working relationship.',
    author: 'Commercial Director',
    role: 'Commercial Director',
    company: 'Hospitality group, Sydney',
    industry: 'hospitality',
    isPlaceholder: true,
    image: portraits[7],
    rating: 5,
  },
  {
    id: 't-au-3',
    countryId: 'en-au',
    quote:
      'They recommended we cut a channel we were spending well on. It reduced their own fee. That is when we stopped shopping around.',
    author: 'General Manager',
    role: 'General Manager',
    company: 'Professional services, Brisbane',
    industry: 'professional-services',
    isPlaceholder: true,
    image: portraits[3],
    rating: 5,
  },

  // Germany — SRS §23.5: EUR pricing, GDPR, certifications, documented process
  {
    id: 't-de-1',
    countryId: 'de',
    quote:
      'Die Prozessaufnahme hat Schnittstellen dokumentiert, von denen selbst unsere IT nichts wusste. Das war der eigentliche Wert.',
    author: 'Leiter IT',
    role: 'Leiter IT',
    company: 'Maschinenbau, München',
    industry: 'manufacturing',
    isPlaceholder: true,
    image: portraits[1],
    rating: 5,
  },
  {
    id: 't-de-2',
    countryId: 'de',
    quote:
      'Auftragsverarbeitungsvertrag und Löschkonzept lagen vor Projektbeginn vor. Bei drei vorherigen Anbietern war das ein monatelanges Thema.',
    author: 'Geschäftsführerin',
    role: 'Geschäftsführerin',
    company: 'Logistikunternehmen, Hamburg',
    industry: 'manufacturing',
    isPlaceholder: true,
    image: portraits[0],
    rating: 5,
  },
  {
    id: 't-de-3',
    countryId: 'de',
    quote:
      'Das Betriebshandbuch bei Übergabe war vollständig. Unser Team betreibt die Automatisierung seitdem eigenständig.',
    author: 'Bereichsleiter Vertrieb',
    role: 'Bereichsleiter Vertrieb',
    company: 'Industrieunternehmen, Frankfurt',
    industry: 'it-companies',
    isPlaceholder: true,
    image: portraits[5],
    rating: 5,
  },

  // UAE — SRS §23.6: AED pricing, premium branding, enterprise client logos
  {
    id: 't-ae-1',
    countryId: 'en-ae',
    quote:
      'The people in the first meeting were the people on the programme twelve months later. In this market that is rarer than it should be.',
    author: 'Group Director',
    role: 'Group Director',
    company: 'Real estate group, Dubai',
    industry: 'real-estate',
    isPlaceholder: true,
    image: portraits[6],
    rating: 5,
  },
  {
    id: 't-ae-2',
    countryId: 'en-ae',
    quote:
      'They scoped down our original brief in the first session. Advising us to spend less established more credibility than any proposal could have.',
    author: 'Chief Digital Officer',
    role: 'Chief Digital Officer',
    company: 'Enterprise organisation, Abu Dhabi',
    industry: 'professional-services',
    isPlaceholder: true,
    image: portraits[3],
    rating: 5,
  },
  {
    id: 't-ae-3',
    countryId: 'en-ae',
    quote:
      'Understanding of free-zone procurement timelines meant the plan was realistic from the first draft rather than the third.',
    author: 'Head of Marketing',
    role: 'Head of Marketing',
    company: 'Hospitality group, Dubai',
    industry: 'hospitality',
    isPlaceholder: true,
    image: portraits[7],
    rating: 5,
  },
]

export function getTestimonials(country: CountryCode): Testimonial[] {
  return testimonials.filter((t) => t.countryId === country)
}

export function getTestimonialsByIndustry(
  country: CountryCode,
  industry: string
): Testimonial[] {
  const local = testimonials.filter((t) => t.countryId === country)
  const matching = local.filter((t) => t.industry === industry)
  return matching.length ? matching : local
}
