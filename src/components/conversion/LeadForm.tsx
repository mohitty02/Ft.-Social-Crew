'use client'

import { useState, type FormEvent } from 'react'
import { Check, Send } from 'lucide-react'
import type { CountryCode, LeadFormVariant } from '@/types'
import { countries } from '@/config/countries'
import { services, resolveServiceTitle } from '@/config/services'
import { analytics } from '@/lib/analytics/events'
import { cn } from '@/lib/utils/cn'

/**
 * Lead capture form.
 *
 * SRS §15.1 specifies two distinct form lengths, not one:
 *   short      — name / email / service interest, on SERVICE pages
 *   qualifying — longer, on PRICING and CONTACT pages
 * so `variant` is a first-class prop rather than a styling flag.
 *
 * Per the build brief there is NO form processing. `handleSubmit` below is the
 * single documented injection point: wiring it to the SRS §14.3 CRM webhook is
 * a change to one function, and every field, label, validation state and
 * analytics event around it is already in place.
 */
export function LeadForm({
  country,
  variant = 'short',
  formId = 'lead-form',
  className,
}: {
  country: CountryCode
  variant?: LeadFormVariant
  formId?: string
  className?: string
}) {
  const [submitted, setSubmitted] = useState(false)
  const c = countries[country]
  const isDe = country === 'de'
  const isQualifying = variant === 'qualifying'

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // ── INJECTION POINT ───────────────────────────────────────────
    // Static build: no network call. To activate, POST the FormData to
    // the CRM webhook described in SRS §14.3 with full UTM/country/source
    // attribution, then keep the analytics event below.
    // ──────────────────────────────────────────────────────────────

    analytics.formSubmit(country, formId)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className={cn(
          'rounded-card border border-accent-line bg-accent-soft p-8 text-center',
          className
        )}
        role="status"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-pill bg-burgundy-700">
          <Check className="h-6 w-6 text-burgundy-100" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-h3 text-[color:var(--text-brand)]">
          {isDe ? 'Vielen Dank' : 'Thank you'}
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-body text-ink-600">
          {isDe
            ? 'Diese Demonstration versendet keine Daten. In der Produktivumgebung würde Ihre Anfrage direkt an das zuständige Team weitergeleitet.'
            : 'This demonstration does not transmit data. In production your enquiry would route straight to the regional team with full attribution attached.'}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-5', className)}
      aria-labelledby={`${formId}-heading`}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label={isDe ? 'Name' : 'Full name'}
          type="text"
          autoComplete="name"
          required
        />
        <Field
          id={`${formId}-email`}
          label={isDe ? 'E-Mail (geschäftlich)' : 'Work email'}
          type="email"
          autoComplete="email"
          required
        />
      </div>

      {isQualifying && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id={`${formId}-company`}
            label={isDe ? 'Unternehmen' : 'Company'}
            type="text"
            autoComplete="organization"
            required
          />
          <Field
            id={`${formId}-phone`}
            label={isDe ? 'Telefon' : 'Phone'}
            type="tel"
            autoComplete="tel"
          />
        </div>
      )}

      <div>
        <label
          htmlFor={`${formId}-service`}
          className="mb-2 block font-tight text-small font-medium text-ink-800"
        >
          {isDe ? 'Interessensgebiet' : 'What do you need help with?'}
        </label>
        <select
          id={`${formId}-service`}
          name="service"
          required
          className="w-full rounded-md border border-ink/20 bg-paper-pure px-4 py-3 text-body text-ink transition-colors duration-fast focus:border-burgundy-700"
        >
          <option value="">{isDe ? 'Bitte auswählen' : 'Select an area'}</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {resolveServiceTitle(s, country)}
            </option>
          ))}
        </select>
      </div>

      {isQualifying && (
        <>
          <div>
            <label
              htmlFor={`${formId}-budget`}
              className="mb-2 block font-tight text-small font-medium text-ink-800"
            >
              {isDe ? 'Budgetrahmen (monatlich)' : `Monthly budget range (${c.currency})`}
            </label>
            <select
              id={`${formId}-budget`}
              name="budget"
              className="w-full rounded-md border border-ink/20 bg-paper-pure px-4 py-3 text-body text-ink transition-colors duration-fast focus:border-burgundy-700"
            >
              <option value="">{isDe ? 'Bitte auswählen' : 'Select a range'}</option>
              <option value="exploring">{isDe ? 'Noch offen' : 'Still exploring'}</option>
              <option value="tier-1">{isDe ? 'Bis 5.000' : 'Up to 5,000'}</option>
              <option value="tier-2">5,000 – 15,000</option>
              <option value="tier-3">15,000 – 50,000</option>
              <option value="tier-4">{isDe ? 'Über 50.000' : '50,000+'}</option>
            </select>
          </div>

          <div>
            <label
              htmlFor={`${formId}-message`}
              className="mb-2 block font-tight text-small font-medium text-ink-800"
            >
              {isDe ? 'Worum geht es konkret?' : 'What are you trying to achieve?'}
            </label>
            <textarea
              id={`${formId}-message`}
              name="message"
              rows={4}
              className="w-full rounded-md border border-ink/20 bg-paper-pure px-4 py-3 text-body text-ink transition-colors duration-fast focus:border-burgundy-700"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-pill bg-burgundy-700 px-8 font-tight text-body font-medium text-burgundy-100 transition-colors duration-base hover:bg-burgundy-800 sm:w-auto"
      >
        {c.primaryCta}
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>

      <p className="text-small text-ink-400">
        {isDe
          ? 'Ihre Daten werden DSGVO-konform verarbeitet und nicht an Dritte weitergegeben.'
          : 'We reply within one business day. Your details are never shared or sold.'}
      </p>
    </form>
  )
}

function Field({
  id,
  label,
  type,
  required,
  autoComplete,
}: {
  id: string
  label: string
  type: string
  required?: boolean
  autoComplete?: string
}) {
  return (
    <div>
      {/* Labels are always visible — never placeholder-as-label (WCAG 2.1 AA). */}
      <label
        htmlFor={id}
        className="mb-2 block font-tight text-small font-medium text-ink-800"
      >
        {label}
        {required && (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-md border border-ink/20 bg-paper-pure px-4 py-3 text-body text-ink transition-colors duration-fast focus:border-burgundy-700"
      />
    </div>
  )
}
