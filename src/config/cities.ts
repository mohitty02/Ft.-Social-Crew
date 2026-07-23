import type { CountryCode } from '@/types'

/**
 * City registry.
 *
 * SRS §23 names cities explicitly for Canada (§23.3), Australia (§23.4),
 * Germany (§23.5) and the UAE (§23.6). For India it says only "top 10-15
 * metro/tier-2 cities" (§23.1) and for the USA it specifies industry- and
 * use-case-specific landing pages rather than city pages (§23.2) — so those
 * two lists are our inference and are marked as such.
 */

export interface CityDefinition {
  slug: string
  name: string
  region: string
  /** SRS §11.3 quality gate — a unique local proof point is mandatory. */
  localProofPoint: string
  /** True where the SRS names the city directly. */
  fromSrs: boolean
}

export const citiesByCountry: Record<CountryCode, CityDefinition[]> = {
  // SRS §23.1 — "City-specific landing pages for top 10-15 metro/tier-2 cities".
  // The specific list is INFERRED.
  'in': [
    { slug: 'mumbai', name: 'Mumbai', region: 'Maharashtra', localProofPoint: 'Financial-services and e-commerce clients concentrated in the BKC and Lower Parel corridors', fromSrs: false },
    { slug: 'delhi-ncr', name: 'Delhi NCR', region: 'Delhi', localProofPoint: 'Largest concentration of our B2B and education-sector engagements', fromSrs: false },
    { slug: 'bengaluru', name: 'Bengaluru', region: 'Karnataka', localProofPoint: 'SaaS and technology client base with product-led growth requirements', fromSrs: false },
    { slug: 'hyderabad', name: 'Hyderabad', region: 'Telangana', localProofPoint: 'Healthcare and pharmaceutical marketing under compliance constraints', fromSrs: false },
    { slug: 'chennai', name: 'Chennai', region: 'Tamil Nadu', localProofPoint: 'Manufacturing and automotive supplier digital-presence programmes', fromSrs: false },
    { slug: 'pune', name: 'Pune', region: 'Maharashtra', localProofPoint: 'Education and IT services clusters with strong tier-2 search demand', fromSrs: false },
    { slug: 'ahmedabad', name: 'Ahmedabad', region: 'Gujarat', localProofPoint: 'Textile, chemicals and export-led manufacturing search behaviour', fromSrs: false },
    { slug: 'kolkata', name: 'Kolkata', region: 'West Bengal', localProofPoint: 'Regional retail and professional-services engagements in the east', fromSrs: false },
    { slug: 'jaipur', name: 'Jaipur', region: 'Rajasthan', localProofPoint: 'Hospitality and real-estate demand with strong seasonal patterns', fromSrs: false },
    { slug: 'chandigarh', name: 'Chandigarh', region: 'Punjab', localProofPoint: 'Tier-2 healthcare and education operators across the tricity region', fromSrs: false },
  ],

  // SRS §23.2 specifies industry/use-case landing pages for the USA rather
  // than city pages. City list is INFERRED to complete the location template.
  'en-us': [
    { slug: 'new-york', name: 'New York', region: 'NY', localProofPoint: 'Professional-services and finance clients with long, multi-stakeholder cycles', fromSrs: false },
    { slug: 'san-francisco', name: 'San Francisco', region: 'CA', localProofPoint: 'Series A–C SaaS companies running fractional growth engagements', fromSrs: false },
    { slug: 'austin', name: 'Austin', region: 'TX', localProofPoint: 'Fast-scaling technology and DTC brands with CAC-efficiency mandates', fromSrs: false },
    { slug: 'chicago', name: 'Chicago', region: 'IL', localProofPoint: 'Mid-market manufacturing and logistics digital programmes', fromSrs: false },
    { slug: 'los-angeles', name: 'Los Angeles', region: 'CA', localProofPoint: 'E-commerce and consumer brands with heavy paid-social dependency', fromSrs: false },
    { slug: 'boston', name: 'Boston', region: 'MA', localProofPoint: 'Healthcare, biotech and education marketing under compliance review', fromSrs: false },
    { slug: 'seattle', name: 'Seattle', region: 'WA', localProofPoint: 'B2B technology clients with product-led growth motions', fromSrs: false },
    { slug: 'miami', name: 'Miami', region: 'FL', localProofPoint: 'Real estate and hospitality operators with cross-border audiences', fromSrs: false },
  ],

  // SRS §23.3 — named verbatim.
  'en-ca': [
    { slug: 'toronto', name: 'Toronto', region: 'ON', localProofPoint: 'Largest Canadian engagement base across financial and professional services', fromSrs: true },
    { slug: 'vancouver', name: 'Vancouver', region: 'BC', localProofPoint: 'Technology and mid-market retail transformation programmes', fromSrs: true },
    { slug: 'montreal', name: 'Montréal', region: 'QC', localProofPoint: 'Bilingual EN/FR content programmes for Quebec-facing organisations', fromSrs: true },
    { slug: 'calgary', name: 'Calgary', region: 'AB', localProofPoint: 'Energy-adjacent and industrial services digital transformation work', fromSrs: true },
  ],

  // SRS §23.4 — named verbatim.
  'en-au': [
    { slug: 'sydney', name: 'Sydney', region: 'NSW', localProofPoint: 'Highest concentration of AU performance-marketing engagements', fromSrs: true },
    { slug: 'melbourne', name: 'Melbourne', region: 'VIC', localProofPoint: 'E-commerce and hospitality clients measured on contribution margin', fromSrs: true },
    { slug: 'brisbane', name: 'Brisbane', region: 'QLD', localProofPoint: 'Professional services and construction operators in a growth market', fromSrs: true },
    { slug: 'perth', name: 'Perth', region: 'WA', localProofPoint: 'Resources-adjacent B2B services with narrow, high-value audiences', fromSrs: true },
  ],

  // SRS §23.5 — named verbatim. German-language pages.
  'de': [
    { slug: 'berlin', name: 'Berlin', region: 'Berlin', localProofPoint: 'Technologie- und Startup-Kunden mit Fokus auf skalierbare Prozesse', fromSrs: true },
    { slug: 'muenchen', name: 'München', region: 'Bayern', localProofPoint: 'Mittelstand und Industriekunden mit dokumentierten Automatisierungsprojekten', fromSrs: true },
    { slug: 'frankfurt', name: 'Frankfurt', region: 'Hessen', localProofPoint: 'Finanz- und Beratungsunternehmen mit hohen Compliance-Anforderungen', fromSrs: true },
    { slug: 'hamburg', name: 'Hamburg', region: 'Hamburg', localProofPoint: 'Logistik- und Handelsunternehmen mit komplexen Datenprozessen', fromSrs: true },
  ],

  // SRS §23.6 — named verbatim, "with premium visual treatment".
  'en-ae': [
    { slug: 'dubai', name: 'Dubai', region: 'Dubai', localProofPoint: 'Enterprise real-estate and hospitality engagements across the emirate', fromSrs: true },
    { slug: 'abu-dhabi', name: 'Abu Dhabi', region: 'Abu Dhabi', localProofPoint: 'Government-adjacent and enterprise consulting transformation programmes', fromSrs: true },
  ],
}

export function getCities(countryCode: CountryCode): CityDefinition[] {
  return citiesByCountry[countryCode] ?? []
}

export function getCity(countryCode: CountryCode, slug: string): CityDefinition | undefined {
  return getCities(countryCode).find((c) => c.slug === slug)
}
