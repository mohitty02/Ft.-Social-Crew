/**
 * Global site configuration.
 *
 * NOTE — company facts below are PLACEHOLDERS. The SRS does not supply the
 * founding year, founder names, registered addresses or phone numbers, but
 * Organization / LocalBusiness / Person schema (SRS §7.6) and E-E-A-T both
 * require them. Replace before launch; nothing here is presented on-page as a
 * verified claim.
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
  email: 'hello@ftsocialcrew.com',
  social: {
    linkedin: 'https://www.linkedin.com/company/ft-social-crew',
    instagram: 'https://www.instagram.com/ftsocialcrew',
    x: 'https://x.com/ftsocialcrew',
    youtube: 'https://www.youtube.com/@ftsocialcrew',
  },
  /** Placeholder company facts — see note above. */
  isPlaceholderData: true,
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
