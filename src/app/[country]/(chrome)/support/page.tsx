import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Phone, Mail, MessageCircle, LifeBuoy } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { telHref, whatsappHref } from '@/lib/i18n/format'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, faqSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'
import { CtaSection } from '@/components/conversion/CtaSection'
import { Reveal } from '@/components/motion/Reveal'

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
    path: 'support',
    title: `Client support — ${c.name}`,
    description: `Existing client support for ${c.name} — response times, escalation path and direct contacts.`,
    hreflangGroupId: 'support',
  })
}

export default async function SupportPage({
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
    { name: 'Support', href: `/${code}/support/` },
  ]

  const faqs = [
    {
      question: isDe ? 'Wie schnell erhalte ich Antwort?' : 'What are your response times?',
      answer: isDe
        ? 'Anfragen während der Geschäftszeiten werden innerhalb von vier Stunden beantwortet, kritische Störungen innerhalb einer Stunde.'
        : 'Within four business hours for standard requests, within one hour for anything affecting live campaigns or tracking. Escalation goes to the engagement lead, not a queue.',
    },
    {
      question: isDe ? 'An wen wende ich mich?' : 'Who do I actually reach?',
      answer: isDe
        ? 'Direkt an das Projektteam. Es gibt keine vorgelagerte Support-Ebene.'
        : 'The people on your engagement. There is no first-line support layer between you and the team doing the work.',
    },
    {
      question: isDe ? 'Wie melde ich eine Störung?' : 'How do I report something broken?',
      answer: isDe
        ? 'Per Telefon oder E-Mail mit Angabe der betroffenen Kampagne oder Seite. Bei kritischen Störungen bitte telefonisch.'
        : 'Phone for anything urgent, email otherwise. Include the campaign or URL affected and when it started — it roughly halves resolution time.',
    },
  ]

  const channels = [
    {
      icon: Phone,
      label: isDe ? 'Telefon' : 'Phone',
      value: c.phone,
      href: telHref(c.phone),
      note: isDe ? 'Für dringende Fälle' : 'For anything urgent',
    },
    {
      icon: Mail,
      label: 'Email',
      value: c.email,
      href: `mailto:${c.email}`,
      note: isDe ? 'Antwort innerhalb von vier Stunden' : 'Four business hours',
    },
    ...(c.whatsapp
      ? [
          {
            icon: MessageCircle,
            label: 'WhatsApp',
            value: isDe ? 'Direktnachricht' : 'Message the team',
            href: whatsappHref(c.phone, 'Support request:'),
            note: isDe ? 'Schnellste Reaktion' : 'Fastest response',
          },
        ]
      : []),
  ]

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(breadcrumbs), faqSchema(faqs))} />

      <PageHero
        country={code}
        eyebrow="Support"
        title={isDe ? 'Support für bestehende Kunden' : 'Support for existing clients'}
        intro={
          isDe
            ? 'Direkter Kontakt zum Projektteam. Keine vorgelagerte Support-Ebene.'
            : 'You reach the people on your engagement directly. There is no first-line layer to get through.'
        }
        answer={`Ft. Social Crew ${c.name} responds to standard support requests within four business hours and to anything affecting live campaigns or tracking within one hour. Clients reach their engagement team directly on ${c.phone} or at ${c.email}.`}
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <SectionHeader
          eyebrow={isDe ? 'Kanäle' : 'Channels'}
          heading={isDe ? 'So erreichen Sie uns' : 'How to reach us'}
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((ch) => (
            <a
              key={ch.label}
              href={ch.href}
              className="bg-paper-pure p-7 transition-colors duration-base hover:bg-accent-soft"
            >
              <ch.icon className="h-5 w-5 text-accent" aria-hidden="true" />
              <p className="mt-5 font-tight text-eyebrow uppercase text-ink-400">
                {ch.label}
              </p>
              <p className="mt-1.5 text-body text-[color:var(--text-brand)]">{ch.value}</p>
              <p className="mt-3 text-small text-ink-400">{ch.note}</p>
            </a>
          ))}
        </div>

        <div className="mt-10 flex gap-4 rounded-lg border border-accent-line bg-burgundy-100/25 p-6">
          <LifeBuoy className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          <p className="text-body text-ink-600">
            {isDe
              ? 'Bei kritischen Störungen an laufenden Kampagnen oder Tracking bitte telefonisch melden — Reaktion innerhalb einer Stunde.'
              : 'For anything affecting live campaigns or tracking, call rather than email. One-hour response, escalated straight to the engagement lead.'}
          </p>
        </div>
      </Section>

      <Section surface="white" deferred>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="FAQ" heading={isDe ? 'Häufige Fragen' : 'Support questions'} />
          <Reveal>
            <FaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </Section>

      <CtaSection
        country={code}
        eyebrow="Support"
        heading={isDe ? 'Noch kein Kunde?' : 'Not a client yet?'}
        body={
          isDe
            ? 'Für allgemeine Anfragen nutzen Sie bitte die Kontaktseite.'
            : 'General enquiries go through the contact page — this line is for people already working with us.'
        }
      />
    </>
  )
}
