import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mail, Phone, MapPin, MessageCircle, Calendar, Clock } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { telHref, whatsappHref } from '@/lib/i18n/format'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, faqSchema, localBusinessSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'
import { LeadForm } from '@/components/conversion/LeadForm'
import { Reveal } from '@/components/motion/Reveal'

/**
 * Contact — SRS §3.1 requires localised phone and office details per country,
 * and §9.1 (Entity SEO) requires consistent NAP for Knowledge Panel readiness.
 * Both come from the country record, so they cannot drift between pages.
 *
 * SRS §15.1: contact pages get the LONGER QUALIFYING form. WhatsApp appears
 * only for India and the UAE. Calendly is placed as a lazy embed slot.
 */
export function generateStaticParams() {
  return countryCodes.map((country) => ({ country }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>
}): Promise<Metadata> {
  const { country } = await params
  if (!isCountryCode(country)) return {}
  const code = country as CountryCode
  const c = countries[code]

  return buildMetadata({
    country: code,
    path: 'contact',
    title: `Contact the ${c.name} team`,
    description: `Speak to our ${c.name} team. ${c.office.city} office, ${c.phone}, ${c.email}. We reply within one business day.`,
    hreflangGroupId: 'contact',
  })
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: isDe ? 'Kontakt' : 'Contact', href: `/${code}/contact/` },
  ]

  const faqs = [
    {
      question: isDe ? 'Wie schnell erhalte ich eine Antwort?' : 'How quickly will you respond?',
      answer: isDe
        ? 'Innerhalb eines Werktages, in der Regel deutlich schneller.'
        : 'Within one business day, usually considerably sooner. Enquiries route directly to the regional team rather than to a shared inbox.',
    },
    {
      question: isDe ? 'Was passiert im Erstgespräch?' : 'What happens in the first conversation?',
      answer: isDe
        ? 'Wir klären den Ist-Zustand, den Anlass und die Rahmenbedingungen. Kein Verkaufsgespräch, keine Präsentation.'
        : 'We establish where you are, what changed to make this a priority, and what constraints exist. No deck, no pitch. If we are not the right partner we will say so and, where we can, point you somewhere better.',
    },
    {
      question: isDe
        ? 'Arbeiten Sie auch mit Unternehmen außerhalb Deutschlands?'
        : `Do you work with businesses outside ${c.name}?`,
      answer: isDe
        ? 'Ja. Wir sind in sechs Märkten tätig. Die Betreuung erfolgt jeweils durch das regionale Team.'
        : `Yes — we operate across six markets. You would be served by the regional team for wherever your customers actually are, not necessarily the one you contacted.`,
    },
  ]

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(breadcrumbs),
          faqSchema(faqs),
          localBusinessSchema(code)
        )}
      />

      <PageHero
        country={code}
        eyebrow={isDe ? 'Kontakt' : 'Contact'}
        title={isDe ? 'Sprechen wir' : `Talk to the ${c.name} team`}
        intro={
          isDe
            ? 'Ein strukturiertes Erstgespräch ohne Verkaufspräsentation. Wir sagen Ihnen offen, ob wir der richtige Partner sind.'
            : `A straightforward first conversation. If we are not the right partner for what you need, we will tell you — and where we can, point you toward someone who is.`
        }
        answer={
          isDe
            ? `Ft. Social Crew Deutschland erreichen Sie unter ${c.phone} oder ${c.email}. Das Büro befindet sich in ${c.office.city}. Antwort erfolgt innerhalb eines Werktages.`
            : `Ft. Social Crew ${c.name} can be reached on ${c.phone} or at ${c.email}. The ${c.office.city} office serves the ${c.name} market. We reply within one business day.`
        }
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* NAP — consistent across the site per SRS §9.1 */}
          <div>
            <h2 className="font-tight text-eyebrow uppercase text-accent">
              {isDe ? 'Direktkontakt' : 'Direct contact'}
            </h2>

            <div className="mt-7 space-y-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10">
              <a
                href={telHref(c.phone)}
                className="flex items-center gap-4 bg-paper-pure p-6 transition-colors duration-base hover:bg-accent-soft"
              >
                <Phone className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <span className="block font-tight text-eyebrow uppercase text-ink-400">
                    {isDe ? 'Telefon' : 'Phone'}
                  </span>
                  <span className="mt-1 block text-body text-[color:var(--text-brand)]">{c.phone}</span>
                </span>
              </a>

              <a
                href={`mailto:${c.email}`}
                className="flex items-center gap-4 bg-paper-pure p-6 transition-colors duration-base hover:bg-accent-soft"
              >
                <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block font-tight text-eyebrow uppercase text-ink-400">
                    Email
                  </span>
                  <span className="mt-1 block truncate text-body text-[color:var(--text-brand)]">
                    {c.email}
                  </span>
                </span>
              </a>

              {/* SRS §15.1 — WhatsApp only where it is the dominant channel */}
              {c.whatsapp && (
                <a
                  href={whatsappHref(c.phone, 'Hi, I would like to discuss growth for my business.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-paper-pure p-6 transition-colors duration-base hover:bg-accent-soft"
                >
                  <MessageCircle className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <span>
                    <span className="block font-tight text-eyebrow uppercase text-ink-400">
                      WhatsApp
                    </span>
                    <span className="mt-1 block text-body text-[color:var(--text-brand)]">
                      {isDe ? 'Direktnachricht' : 'Message us directly'}
                    </span>
                  </span>
                </a>
              )}

              <div className="flex items-start gap-4 bg-paper-pure p-6">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <address className="not-italic">
                  <span className="block font-tight text-eyebrow uppercase text-ink-400">
                    {isDe ? 'Büro' : 'Office'}
                  </span>
                  <span className="mt-1 block text-body text-ink-600">
                    {c.office.street}
                    <br />
                    {c.office.city}, {c.office.region} {c.office.postalCode}
                    <br />
                    {c.office.country}
                  </span>
                </address>
              </div>

              <div className="flex items-start gap-4 bg-paper-pure p-6">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <span className="block font-tight text-eyebrow uppercase text-ink-400">
                    {isDe ? 'Zeitzone' : 'Timezone'}
                  </span>
                  <span className="mt-1 block text-body text-ink-600">{c.timezone}</span>
                </span>
              </div>
            </div>

            {/* Calendly — SRS §15.1 places direct booking on contact and
                pricing pages. Rendered as a deferred slot so a third-party
                embed never costs us LCP. */}
            <div className="mt-6 rounded-lg border border-accent-line bg-burgundy-100/25 p-6">
              <Calendar className="h-5 w-5 text-accent" aria-hidden="true" />
              <h3 className="mt-4 font-display text-h4 text-[color:var(--text-brand)]">
                {isDe ? 'Termin direkt buchen' : 'Book a time directly'}
              </h3>
              <p className="mt-2 text-small text-ink-600">
                {isDe
                  ? 'Buchungsintegration wird in der Produktivumgebung geladen.'
                  : 'Scheduling embed loads in production — deferred here so it never delays first paint.'}
              </p>
            </div>

            {c.trustNote && (
              <p className="mt-6 text-small text-ink-400">{c.trustNote}</p>
            )}
          </div>

          {/* SRS §15.1 — contact pages get the LONGER QUALIFYING form */}
          <Reveal>
            <div className="rounded-xl border border-ink/10 bg-paper-pure p-7 sm:p-10">
              <h2 id="contact-form-heading" className="font-display text-h2 text-[color:var(--text-brand)]">
                {isDe ? 'Anfrage senden' : 'Send an enquiry'}
              </h2>
              <p className="mt-3 text-body text-ink-600">
                {isDe
                  ? 'Etwas mehr Kontext hilft uns, direkt eine belastbare erste Einschätzung zu geben.'
                  : 'A little more context than usual, so the first reply can be genuinely useful rather than a request for a call.'}
              </p>
              <LeadForm
                country={code}
                variant="qualifying"
                formId="contact-main"
                className="mt-8"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section surface="tint" deferred>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="FAQ" heading={isDe ? 'Häufige Fragen' : 'Before you write'} />
          <Reveal>
            <FaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </Section>
    </>
  )
}
