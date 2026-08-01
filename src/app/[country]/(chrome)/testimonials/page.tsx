import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { getTestimonials } from '@/content/testimonials'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, faqSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { TestimonialCard } from '@/components/proof/TestimonialCard'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'
import { CtaSection } from '@/components/conversion/CtaSection'
import { StaggerGroup, StaggerItem, Reveal } from '@/components/motion/Reveal'

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
    path: 'testimonials',
    title: `Client testimonials — ${c.name}`,
    description: `What clients in ${c.name} say about working with us — including the parts that were uncomfortable.`,
    hreflangGroupId: 'testimonials',
  })
}

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'
  const testimonials = getTestimonials(code)

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: isDe ? 'Kundenstimmen' : 'Testimonials', href: `/${code}/testimonials/` },
  ]

  const faqs = [
    {
      question: isDe ? 'Warum werden keine Firmennamen genannt?' : 'Why are company names withheld?',
      answer: isDe
        ? 'Viele Projekte unterliegen Vertraulichkeitsvereinbarungen. Referenzgespräche vermitteln wir nach Freigabe.'
        : 'Many engagements carry confidentiality terms. Where a client permits it we name them; otherwise we describe the sector and city, and can usually arrange a reference call.',
    },
    {
      question: isDe ? 'Kann ich mit Referenzkunden sprechen?' : 'Can we speak to a reference client?',
      answer: isDe
        ? 'Ja, bei ernsthaftem Interesse und nach Zustimmung des jeweiligen Kunden.'
        : 'Yes — once an engagement is under serious consideration, we can usually arrange a conversation with a client in a comparable sector.',
    },
  ]

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(breadcrumbs), faqSchema(faqs))} />

      <PageHero
        country={code}
        eyebrow={isDe ? 'Kundenstimmen' : 'Testimonials'}
        title={isDe ? 'Rückmeldungen unserer Kunden' : 'In their words, not ours'}
        intro={
          isDe
            ? 'Wir veröffentlichen auch die unbequemen Rückmeldungen — sie sind aussagekräftiger als die bequemen.'
            : `We include the uncomfortable feedback too. It tends to be more informative than the comfortable kind.`
        }
        answer={
          isDe
            ? `Kunden von Ft. Social Crew in Deutschland heben insbesondere die dokumentierte Vorgehensweise, DSGVO-Konformität und die vollständige Projektübergabe hervor.`
            : `Clients of Ft. Social Crew in ${c.name} most often cite transparency about what is not working, verifiable reporting methodology, and continuity of the people doing the work.`
        }
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <TestimonialCard testimonial={t} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section surface="white" deferred>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="FAQ" heading={isDe ? 'Häufige Fragen' : 'About these'} />
          <Reveal>
            <FaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </Section>

      <CtaSection
        country={code}
        eyebrow={isDe ? 'Referenzen' : 'References'}
        heading={isDe ? 'Referenzgespräch anfragen' : 'Ask for a reference conversation'}
        body={
          isDe
            ? 'Wir vermitteln nach Freigabe ein Gespräch mit einem Kunden aus vergleichbarer Branche.'
            : 'We will connect you with a client in a comparable sector, subject to their agreement.'
        }
      />
    </>
  )
}
