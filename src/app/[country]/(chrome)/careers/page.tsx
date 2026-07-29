import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MapPin, Clock } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, faqSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'
import { CtaSection } from '@/components/conversion/CtaSection'
import { Pill } from '@/components/ui/Pill'
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
    path: 'careers',
    title: `Careers — ${c.name}`,
    description: `Open roles and how we work across six markets. Remote-first, documented process, senior people doing the actual work.`,
    hreflangGroupId: 'careers',
  })
}

const roles = [
  { title: 'Senior SEO Strategist', type: 'Full-time', location: 'Remote' },
  { title: 'Performance Marketing Lead', type: 'Full-time', location: 'Remote' },
  { title: 'Conversion Researcher', type: 'Full-time', location: 'Remote' },
  { title: 'Content Strategist (German-native)', type: 'Full-time', location: 'Remote — DACH' },
  { title: 'Marketing Automation Engineer', type: 'Full-time', location: 'Remote' },
]

export default async function CareersPage({
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
    { name: isDe ? 'Karriere' : 'Careers', href: `/${code}/careers/` },
  ]

  const faqs = [
    {
      question: isDe ? 'Wie arbeiten Sie?' : 'How do you work?',
      answer: isDe
        ? 'Remote-first mit dokumentierten Prozessen. Die Personen im Erstgespräch mit dem Kunden sind die Personen im Projekt.'
        : 'Remote-first, documented process, and the people in the client conversation are the people on the engagement. No pooled resource models, no account managers relaying briefs to unnamed specialists.',
    },
    {
      question: isDe ? 'Wie läuft der Bewerbungsprozess?' : 'What does the hiring process look like?',
      answer: isDe
        ? 'Ein erstes Gespräch, eine fachliche Aufgabe mit realem Kontext, ein Abschlussgespräch. Die Aufgabe wird vergütet.'
        : 'An initial conversation, a paid practical exercise using real (anonymised) context, and a final conversation. We pay for the exercise because asking for free work is not a great first impression.',
    },
  ]

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(breadcrumbs), faqSchema(faqs))} />

      <PageHero
        eyebrow={isDe ? 'Karriere' : 'Careers'}
        title={isDe ? 'Arbeiten bei Ft. Social Crew' : 'Work with us'}
        intro={
          isDe
            ? 'Remote-first, dokumentierte Prozesse, sechs Märkte. Senior-Profile, die die Arbeit selbst machen.'
            : 'Remote-first across six markets. Senior people who do the work rather than delegate it, and a documented process so nobody is guessing what good looks like.'
        }
        answer={`Ft. Social Crew hires remote-first across six markets for senior strategy, channel and engineering roles. The process is one conversation, one paid practical exercise, and a final conversation.`}
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <SectionHeader
          eyebrow={isDe ? 'Offene Stellen' : 'Open roles'}
          heading={isDe ? 'Aktuell ausgeschrieben' : 'Currently hiring'}
        />
        <ul className="mt-10 divide-y divide-ink/10 overflow-hidden rounded-lg border border-ink/10 bg-paper-pure">
          {roles.map((role) => (
            <li key={role.title}>
              <a
                href={`mailto:${c.email}?subject=${encodeURIComponent(role.title)}`}
                className="flex flex-wrap items-center justify-between gap-4 p-6 transition-colors duration-base hover:bg-burgundy-100/30"
              >
                <span>
                  <span className="block font-display text-h4 text-burgundy-700">
                    {role.title}
                  </span>
                  <span className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-small text-ink-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {role.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {role.location}
                    </span>
                  </span>
                </span>
                <Pill variant="outline" size="sm">
                  {isDe ? 'Bewerben' : 'Apply'}
                </Pill>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-small text-ink-400">
          {isDe
            ? 'Keine passende Rolle? Initiativbewerbungen sind willkommen.'
            : 'Nothing fitting? We read speculative applications properly — send one.'}
        </p>
      </Section>

      <Section surface="white" deferred>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="FAQ" heading={isDe ? 'Häufige Fragen' : 'Working here'} />
          <Reveal>
            <FaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </Section>

      <CtaSection
        country={code}
        eyebrow={isDe ? 'Karriere' : 'Careers'}
        heading={isDe ? 'Initiativbewerbung' : 'Send a speculative application'}
        body={
          isDe
            ? 'Wir lesen jede Bewerbung. Antwort erfolgt in jedem Fall.'
            : 'We read every one and reply either way, which should not be remarkable but apparently is.'
        }
      />
    </>
  )
}
