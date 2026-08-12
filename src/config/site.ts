/**
 * Global site configuration.
 *
 * The founder, founding year and the client/sector counts below are real —
 * carried across from the company's previous site, which published them. They
 * are no longer placeholders, and Organization and Person schema now assert
 * them (SRS §7.6, E-E-A-T).
 *
 * STILL UNRESOLVED — the phone, email and street address in config/countries.ts
 * disagree with the previous site: it published +91 8851939418,
 * ftsocialcrew@gmail.com and an address in Pitampura, where this record carries
 * a different number and an Uttam Nagar address marked "client-supplied, from
 * the approved India comp". One of the two is stale. They are deliberately left
 * as they are until the client confirms which, because LocalBusiness schema
 * asserts them as fact and a wrong NAP actively damages local ranking.
 */
export const site = {
  name: 'Ft. Social Crew',
  legalName: 'Ft. Social Crew',
  // Canonical host — drives canonical tags, hreflang, sitemap and Organization
  // schema (SRS §7.1, §7.2, §7.5). Apex, no www: next.config.ts redirects the
  // www host here, so emitting www URLs would point every canonical at a URL
  // that immediately redirects.
  url: 'https://ftsocialcrew.com',
  tagline: 'Global business growth and digital transformation partner',
  description:
    'Ft. Social Crew is a multi-market growth partner operating across India, the USA, Canada, Australia, Germany and the UAE — building compounding organic visibility, trust and qualified pipeline in every market we serve.',
  foundedYear: 2019,
  foundedIn: 'Pitampura, New Delhi',
  founder: {
    name: 'Shruti Garg',
    role: 'Founder',
    /** Her MBA dissertation was on Generative Engine Optimisation. */
    expertise: 'Generative Engine Optimisation',
  },
  /**
   * The company's own published claims, carried across from the previous site.
   * Presented as claims about the business, not as audited figures.
   */
  claims: {
    brandsServed: 120,
    sectorsServed: 15,
  },
  email: 'hello@ftsocialcrew.com',
  social: {
    linkedin: 'https://www.linkedin.com/company/ft-social-crew',
    instagram: 'https://www.instagram.com/ftsocialcrew',
    x: 'https://x.com/ftsocialcrew',
    youtube: 'https://www.youtube.com/@ftsocialcrew',
  },
  /**
   * Founder, founding year and claim counts are now real. The India contact
   * block in config/countries.ts is the one thing still unconfirmed — see the
   * note at the top of this file.
   */
  isPlaceholderData: false,
} as const

/** SRS §14.2 — the conversion + standard event names to emit. */
export const analyticsEvents = [
  'page_view',
  'scroll_depth',
  'outbound_click',
  'file_download',
  'video_play',
  'form_submit',
  'calendly_booking',
  'phone_click',
  'whatsapp_click',
  'live_chat_start',
] as const

export type AnalyticsEvent = (typeof analyticsEvents)[number]
