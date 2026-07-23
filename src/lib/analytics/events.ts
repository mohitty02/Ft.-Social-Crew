import type { AnalyticsEvent } from '@/config/site'

/**
 * Analytics abstraction — SRS §14.
 *
 * The static build ships ZERO third-party scripts, which is how the Lighthouse
 * and Core Web Vitals targets stay achievable. This module emits the SRS §14.2
 * event names into a queue; wiring GA4 (with country as a custom dimension,
 * per §14.1) later means writing one adapter and nothing else.
 */

interface EventPayload {
  country?: string
  [key: string]: string | number | boolean | undefined
}

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

export function track(event: AnalyticsEvent, payload: EventPayload = {}): void {
  if (typeof window === 'undefined') return

  // SRS §14.1 — country is a custom dimension on every event so both unified
  // and per-country reporting work from one property.
  const enriched = { event, ...payload }

  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(enriched)

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', enriched)
  }
}

/** SRS §14.2 conversion events, as named helpers so call sites stay readable. */
export const analytics = {
  formSubmit: (country: string, formId: string) =>
    track('form_submit', { country, formId }),
  phoneClick: (country: string) => track('phone_click', { country }),
  whatsappClick: (country: string) => track('whatsapp_click', { country }),
  calendlyBooking: (country: string) => track('calendly_booking', { country }),
  liveChatStart: (country: string) => track('live_chat_start', { country }),
  fileDownload: (country: string, file: string) =>
    track('file_download', { country, file }),
  outboundClick: (country: string, href: string) =>
    track('outbound_click', { country, href }),
}
