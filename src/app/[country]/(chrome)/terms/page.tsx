import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { site } from '@/config/site'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section } from '@/components/layout/Section'
import { LegalBody } from '@/components/content/LegalBody'

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
    path: 'terms',
    title: `Terms of service — ${c.name}`,
    description: `The terms governing use of this website and engagements with Ft. Social Crew in ${c.name}.`,
    hreflangGroupId: 'terms',
  })
}

export default async function TermsPage({
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
    { name: isDe ? 'AGB' : 'Terms', href: `/${code}/terms/` },
  ]

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(breadcrumbs))} />

      <PageHero
        eyebrow={isDe ? 'AGB' : 'Terms'}
        title={isDe ? 'Allgemeine Geschäftsbedingungen' : 'Terms of service'}
        intro={`The terms governing use of this website and engagements with Ft. Social Crew in ${c.name}.`}
        answer={`These terms govern use of the Ft. Social Crew website and any engagement entered into in ${c.name}. Engagement-specific commercial terms are set out in the individual statement of work, which takes precedence where the two differ.`}
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <LegalBody
          country={code}
          sections={[
            {
              heading: isDe ? '1. Geltungsbereich' : '1. Scope',
              body: `These terms apply to use of this website and to any engagement with ${site.legalName} in ${c.name}. Where an individual statement of work differs from these terms, the statement of work takes precedence.`,
            },
            {
              heading: isDe ? '2. Leistungen' : '2. Services',
              body: isDe
                ? 'Der Leistungsumfang wird je Projekt schriftlich vereinbart. Änderungen bedürfen der Schriftform.'
                : 'Scope is agreed in writing per engagement. Changes to scope are agreed in writing before work begins on them, not invoiced retrospectively.',
            },
            {
              heading: isDe ? '3. Vergütung' : '3. Fees',
              body: isDe
                ? `Alle Preise verstehen sich in ${c.currency} zzgl. gesetzlicher Umsatzsteuer. Mediabudgets werden direkt an die jeweilige Plattform gezahlt.`
                : `All fees are quoted in ${c.currency} and exclude applicable taxes. Media spend is paid directly to the advertising platform and is never invoiced through us.`,
            },
            {
              heading: isDe ? '4. Laufzeit und Kündigung' : '4. Term and termination',
              body: isDe
                ? 'Phasen sind einzeln beauftragbar. Laufende Retainer sind mit einer Frist von 30 Tagen kündbar.'
                : 'Retained engagements may be terminated by either party on thirty days written notice. No severance or early-termination penalty applies.',
            },
            {
              heading: isDe ? '5. Eigentum an Arbeitsergebnissen' : '5. Ownership of work',
              body: isDe
                ? 'Sämtliche im Rahmen des Projekts erstellten Inhalte, Dokumentationen und Konfigurationen gehen mit vollständiger Bezahlung in Ihr Eigentum über.'
                : 'All content, documentation, dashboards and configurations produced for you become your property on payment. This includes work produced before an engagement ends.',
            },
            {
              heading: isDe ? '6. Vertraulichkeit' : '6. Confidentiality',
              body: isDe
                ? 'Beide Parteien behandeln vertrauliche Informationen der jeweils anderen Partei vertraulich. Eine Nennung als Referenz erfolgt nur nach ausdrücklicher schriftlicher Zustimmung.'
                : 'Both parties keep the other\'s confidential information confidential. We reference clients publicly only with explicit written permission, which is why several of our case studies are anonymised.',
            },
            {
              heading: isDe ? '7. Haftung' : '7. Liability',
              body: isDe
                ? 'Die Haftung ist auf die im jeweiligen Projektzeitraum gezahlte Vergütung begrenzt, soweit gesetzlich zulässig.'
                : 'Liability is limited to fees paid during the engagement period, to the extent permitted by applicable law.',
            },
            {
              heading: isDe ? '8. Anwendbares Recht' : '8. Governing law',
              body: isDe
                ? 'Es gilt deutsches Recht. Gerichtsstand ist Berlin.'
                : `These terms are governed by the law of ${c.office.country}, and the courts of ${c.office.city} have jurisdiction.`,
            },
          ]}
        />
      </Section>
    </>
  )
}
