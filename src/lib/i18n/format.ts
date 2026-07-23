import type { CountryCode } from '@/types'
import { countries } from '@/config/countries'

/**
 * Locale-aware formatting — SRS §6.1: "Locale-aware fields (currency, date
 * format, phone format) render automatically based on the country record."
 *
 * Nothing in the component tree hard-codes a currency symbol or date format.
 */

export function formatCurrency(
  amount: number,
  country: CountryCode,
  options: { compact?: boolean } = {}
): string {
  const c = countries[country]
  try {
    return new Intl.NumberFormat(c.locale, {
      style: 'currency',
      currency: c.currency,
      maximumFractionDigits: 0,
      notation: options.compact ? 'compact' : 'standard',
    }).format(amount)
  } catch {
    return `${c.currencySymbol}${amount.toLocaleString()}`
  }
}

export function formatDate(iso: string, country: CountryCode): string {
  const c = countries[country]
  try {
    return new Intl.DateTimeFormat(c.locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function formatNumber(n: number, country: CountryCode): string {
  const c = countries[country]
  try {
    return new Intl.NumberFormat(c.locale).format(n)
  } catch {
    return String(n)
  }
}

/** Strips a phone number down to a tel: href. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

/** SRS §15.1 — WhatsApp click-to-chat, India and UAE only. */
export function whatsappHref(phone: string, message: string): string {
  const number = phone.replace(/[^\d]/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

/**
 * SRS §7.4 — English-market pages must use local spelling. Content is
 * authored per market, but shared strings pass through here.
 */
export function localiseSpelling(text: string, country: CountryCode): string {
  if (country !== 'en-us') return text
  return text
    .replace(/optimisation/g, 'optimization')
    .replace(/Optimisation/g, 'Optimization')
    .replace(/optimise/g, 'optimize')
    .replace(/Optimise/g, 'Optimize')
    .replace(/optimised/g, 'optimized')
    .replace(/organisation/g, 'organization')
    .replace(/Organisation/g, 'Organization')
    .replace(/personalis/g, 'personaliz')
    .replace(/analyse/g, 'analyze')
    .replace(/behaviour/g, 'behavior')
    .replace(/Behaviour/g, 'Behavior')
    .replace(/colour/g, 'color')
    .replace(/centre/g, 'center')
    .replace(/programme/g, 'program')
    .replace(/Programme/g, 'Program')
    .replace(/enrolment/g, 'enrollment')
    .replace(/neighbourhood/g, 'neighborhood')
    .replace(/Neighbourhood/g, 'Neighborhood')
    .replace(/rigour/g, 'rigor')
    .replace(/localis/g, 'localiz')
}
