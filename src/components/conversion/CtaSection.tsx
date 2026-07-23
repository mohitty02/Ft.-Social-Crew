import { MessageCircle, Phone } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries } from '@/config/countries'
import { whatsappHref, telHref } from '@/lib/i18n/format'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'

/**
 * The burgundy-inverted conversion section — the composition's punctuation.
 *
 * CTA wording comes from the country record because SRS §23 gives each market
 * a different verb: India talks to a growth partner, the USA books an audit,
 * Canada books a consultation, Australia gets an ROI projection, Germany
 * requests a Prozessanalyse, the UAE requests a consultation.
 */
export function CtaSection({
  country,
  heading,
  body,
  eyebrow,
}: {
  country: CountryCode
  heading: string
  body: string
  eyebrow?: string
}) {
  const c = countries[country]
  const isDe = country === 'de'

  return (
    <Section surface="invert" deferred>
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow && (
          <Pill variant="invert" size="md" className="mb-7">
            {eyebrow}
          </Pill>
        )}

        <h2 className="font-display text-display-2 text-burgundy-100">{heading}</h2>

        <p className="mx-auto mt-6 max-w-xl text-lead text-burgundy-100/75">{body}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href={`/${country}/contact/`} variant="invert" size="lg" withArrow>
            {c.primaryCta}
          </Button>
          <Button href={`/${country}/case-studies/`} variant="invertOutline" size="lg">
            {isDe ? 'Referenzen ansehen' : 'See the work'}
          </Button>
        </div>

        {/* Direct-contact shortcuts. WhatsApp only where SRS §15.1 permits it. */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <a
            href={telHref(c.phone)}
            className="inline-flex items-center gap-2 text-small text-burgundy-100/70 underline-offset-4 transition-colors hover:text-burgundy-100 hover:underline"
          >
            <Phone className="h-4 w-4 text-gold-300" aria-hidden="true" />
            {c.phone}
          </a>

          {c.whatsapp && (
            <a
              href={whatsappHref(c.phone, 'Hi, I would like to discuss growth for my business.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-small text-burgundy-100/70 underline-offset-4 transition-colors hover:text-burgundy-100 hover:underline"
            >
              <MessageCircle className="h-4 w-4 text-gold-300" aria-hidden="true" />
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </Section>
  )
}
