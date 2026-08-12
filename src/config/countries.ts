import type { Country, CountryCode } from '@/types'
import { heroImages, cityImages } from './media'

/**
 * The country registry.
 *
 * This file is the whole of SRS §1.7 — "scaling to 20, 50, or 100+ countries
 * changes only data volume, never the codebase". Adding country #7 means
 * appending one object here plus its content records. Nothing in src/app/ or
 * src/components/ changes.
 *
 * Positioning strings are verbatim from the SRS §2.1 matrix.
 */
export const countries: Record<CountryCode, Country> = {
  'in': {
    id: 'c-in',
    code: 'in',
    name: 'India',
    locale: 'en-IN',
    currency: 'INR',
    currencySymbol: '₹',
    timezone: 'Asia/Kolkata',
    status: 'active',
    searchConsoleProperty: 'sc-domain:ftsocialcrew.com/in/',
    positioning: 'Business Growth Agency',
    positioningAlt: ['Digital Growth Partner'],
    positioningRationale:
      'The Indian SMB market still searches primarily through service-category language. Leading with "Business Growth Agency" instead of a narrow service label widens the page\'s relevance to more queries and signals a bigger, more strategic engagement than a single-service vendor.',
    spelling: 'en-IN',
    pricingMode: 'productized',
    whatsapp: true,
    // Real, and the only market where that is true — these are the details the
    // company actually publishes on its own live site. LocalBusiness and
    // Service schema read this record, so it has to match what the pages
    // display and what a customer reaches when they dial it.
    //
    // Replaces a number and an Uttam Nagar address that arrived with the design
    // comp and were never the working ones.
    phone: '+91 88519 39418',
    email: 'ftsocialcrew@gmail.com',
    contactVerified: true,
    office: {
      street: '69, Harsh Vihar, Pitampura',
      city: 'New Delhi',
      region: 'Delhi',
      postalCode: '110034',
      country: 'India',
    },
    primaryCta: 'Talk to a growth partner',
    secondaryCta: 'See our packages',
    leadMagnet: {
      title: 'The India Growth Playbook',
      description:
        'City-tier targeting, channel mix and budget benchmarks for Indian SMBs scaling past their first ₹10 Cr.',
      format: 'Guide',
    },
    heroImage: heroImages['in'],
    cityImage: cityImages['in'],
  },

  'en-us': {
    id: 'c-us',
    code: 'en-us',
    name: 'United States',
    locale: 'en-US',
    currency: 'USD',
    currencySymbol: '$',
    timezone: 'America/New_York',
    status: 'active',
    searchConsoleProperty: 'sc-domain:ftsocialcrew.com/en-us/',
    positioning: 'Growth Consulting Firm',
    positioningAlt: ['Revenue Growth Partner', 'Fractional Growth Team'],
    positioningRationale:
      'US buyers at the SMB and mid-market level are saturated with generic "agency" messaging and increasingly search for alternatives to a full-time hire. This positioning speaks directly to a budget-conscious, ROI-literate buyer comparing us against hiring a VP of Marketing.',
    spelling: 'en-US',
    pricingMode: 'consultative',
    whatsapp: false,
    // Placeholder: 555-01xx is the reserved test range, and the address is a
    // stand-in from the comp. Kept off LocalBusiness schema until real.
    phone: '+1 (415) 555-0100',
    email: 'usa@ftsocialcrew.com',
    contactVerified: false,
    office: {
      street: '2 Embarcadero Center, Suite 800',
      city: 'San Francisco',
      region: 'CA',
      postalCode: '94111',
      country: 'United States',
    },
    primaryCta: 'Book a growth audit',
    secondaryCta: 'Compare to a full-time hire',
    leadMagnet: {
      title: 'B2B Growth Benchmark Report',
      description:
        'CAC, payback and pipeline-velocity benchmarks from 140 US mid-market growth programmes — with the methodology shown.',
      format: 'Report',
    },
    heroImage: heroImages['en-us'],
    cityImage: cityImages['en-us'],
  },

  'en-ca': {
    id: 'c-ca',
    code: 'en-ca',
    name: 'Canada',
    locale: 'en-CA',
    currency: 'CAD',
    currencySymbol: 'CA$',
    timezone: 'America/Toronto',
    status: 'active',
    searchConsoleProperty: 'sc-domain:ftsocialcrew.com/en-ca/',
    positioning: 'Digital Transformation Partner',
    positioningAlt: ['Business Growth Consultant'],
    positioningRationale:
      'Canadian B2B buyers frequently frame vendor relationships as long-term transformation partnerships rather than transactional purchases, and respond well to consultative, less sales-forward language than the US market.',
    spelling: 'en-CA',
    pricingMode: 'consultative',
    whatsapp: false,
    // Placeholder — see the note on the US record.
    phone: '+1 (416) 555-0142',
    email: 'canada@ftsocialcrew.com',
    contactVerified: false,
    office: {
      street: '181 Bay Street, Suite 1800',
      city: 'Toronto',
      region: 'ON',
      postalCode: 'M5J 2T3',
      country: 'Canada',
    },
    primaryCta: 'Book a consultation',
    secondaryCta: 'Read the transformation guide',
    leadMagnet: {
      title: 'Digital Transformation Readiness Framework',
      description:
        'A structured self-assessment across data, channels, process and team — with a phased roadmap for Canadian mid-market firms.',
      format: 'Guide',
    },
    heroImage: heroImages['en-ca'],
    cityImage: cityImages['en-ca'],
  },

  'en-au': {
    id: 'c-au',
    code: 'en-au',
    name: 'Australia',
    locale: 'en-AU',
    currency: 'AUD',
    currencySymbol: 'A$',
    timezone: 'Australia/Sydney',
    status: 'active',
    searchConsoleProperty: 'sc-domain:ftsocialcrew.com/en-au/',
    positioning: 'Performance Marketing Partner',
    positioningAlt: ['Business Growth Consultants'],
    positioningRationale:
      'Australian SMBs are highly ROI- and performance-literate from a mature paid-media culture. "Performance Marketing Partner" mirrors the vocabulary they already use with existing vendors and signals accountability to metrics rather than vague brand promises.',
    spelling: 'en-AU',
    pricingMode: 'consultative',
    whatsapp: false,
    // Placeholder — see the note on the US record.
    phone: '+61 2 8000 0000',
    email: 'australia@ftsocialcrew.com',
    contactVerified: false,
    office: {
      street: '120 Collins Street, Level 12',
      city: 'Melbourne',
      region: 'VIC',
      postalCode: '3000',
      country: 'Australia',
    },
    primaryCta: 'Get your ROI projection',
    secondaryCta: 'Open the ROI calculator',
    leadMagnet: {
      title: 'Performance Marketing ROI Calculator',
      description:
        'Model blended CAC, contribution margin and payback across your channel mix before you commit a dollar of spend.',
      format: 'Calculator',
    },
    heroImage: heroImages['en-au'],
    cityImage: cityImages['en-au'],
  },

  'de': {
    id: 'c-de',
    code: 'de',
    name: 'Deutschland',
    locale: 'de-DE',
    currency: 'EUR',
    currencySymbol: '€',
    timezone: 'Europe/Berlin',
    status: 'active',
    searchConsoleProperty: 'sc-domain:ftsocialcrew.com/de/',
    positioning: 'Business Process Automation Company',
    positioningAlt: ['Digital Engineering Company'],
    positioningRationale:
      'German B2B buying culture prioritises process rigour, engineering credibility and precision over marketing flourish. Positioning as a process-automation or digital-engineering company borrows authority from adjacent, higher-trust categories rather than the lower-trust "agency" category.',
    spelling: 'de-DE',
    pricingMode: 'consultative',
    whatsapp: false,
    // Placeholder — see the note on the US record.
    phone: '+49 30 5555 0000',
    email: 'deutschland@ftsocialcrew.com',
    contactVerified: false,
    office: {
      street: 'Friedrichstraße 76',
      city: 'Berlin',
      region: 'Berlin',
      postalCode: '10117',
      country: 'Deutschland',
    },
    primaryCta: 'Prozessanalyse anfordern',
    secondaryCta: 'Whitepaper herunterladen',
    leadMagnet: {
      title: 'Prozessautomatisierung: Technisches Whitepaper',
      description:
        'Referenzarchitektur, Bewertungsmatrix und dokumentierte Vorgehensweise für die Automatisierung von Marketing- und Vertriebsprozessen im Mittelstand.',
      format: 'Report',
    },
    trustNote:
      'Alle Daten werden DSGVO-konform in der EU verarbeitet. Auftragsverarbeitungsvertrag auf Anfrage.',
    heroImage: heroImages['de'],
    cityImage: cityImages['de'],
  },

  'en-ae': {
    id: 'c-ae',
    code: 'en-ae',
    name: 'United Arab Emirates',
    locale: 'en-AE',
    currency: 'AED',
    currencySymbol: 'AED',
    timezone: 'Asia/Dubai',
    status: 'active',
    searchConsoleProperty: 'sc-domain:ftsocialcrew.com/en-ae/',
    positioning: 'Business Growth & Technology Consulting',
    positioningAlt: ['Premium Business Consulting'],
    positioningRationale:
      'The UAE market, particularly Dubai and Abu Dhabi enterprise and government-adjacent buyers, associates premium positioning and technology fluency with credibility. This signals both strategic seniority and technical capability, matching the aspirational, status-aware tone of the local B2B market.',
    spelling: 'en-AE',
    pricingMode: 'consultative',
    whatsapp: true,
    // Placeholder — see the note on the US record.
    phone: '+971 4 555 0000',
    email: 'uae@ftsocialcrew.com',
    contactVerified: false,
    office: {
      street: 'Boulevard Plaza Tower 1, Level 22',
      city: 'Dubai',
      region: 'Dubai',
      postalCode: '00000',
      country: 'United Arab Emirates',
    },
    primaryCta: 'Request a consultation',
    secondaryCta: 'View enterprise engagements',
    leadMagnet: {
      title: 'Enterprise Growth & Technology Briefing',
      description:
        'A confidential briefing on digital transformation priorities for UAE enterprise and government-adjacent organisations.',
      format: 'Report',
    },
    heroImage: heroImages['en-ae'],
    cityImage: cityImages['en-ae'],
  },
}

export const countryCodes = Object.keys(countries) as CountryCode[]

export const countryList = countryCodes.map((code) => countries[code])

export function getCountry(code: string): Country | undefined {
  return countries[code as CountryCode]
}

export function isCountryCode(code: string): code is CountryCode {
  return code in countries
}

/** SRS §7.1 — x-default points to the global root. */
export const defaultCountry: CountryCode = 'en-us'
