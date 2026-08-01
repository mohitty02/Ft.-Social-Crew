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

/**
 * Privacy — localised per country (SRS §3.1). Germany surfaces the GDPR
 * statement SRS §23.5 requires as a trust signal, from the country record.
 *
 * PLACEHOLDER LEGAL TEXT. This is illustrative structure, not reviewed legal
 * copy, and is labelled as such on the page.
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
    path: 'privacy',
    title: `Privacy policy — ${c.name}`,
    description: `How Ft. Social Crew collects, uses and protects personal data for visitors and clients in ${c.name}.`,
    hreflangGroupId: 'privacy',
  })
}

export default async function PrivacyPage({
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
    { name: isDe ? 'Datenschutz' : 'Privacy', href: `/${code}/privacy/` },
  ]

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(breadcrumbs))} />

      <PageHero
        country={code}
        eyebrow={isDe ? 'Datenschutz' : 'Privacy'}
        title={isDe ? 'Datenschutzerklärung' : 'Privacy policy'}
        intro={c.trustNote ?? `How we handle personal data for visitors and clients in ${c.name}.`}
        answer={
          isDe
            ? 'Ft. Social Crew verarbeitet personenbezogene Daten ausschließlich innerhalb der EU und DSGVO-konform. Ein Auftragsverarbeitungsvertrag wird auf Anfrage bereitgestellt.'
            : `Ft. Social Crew collects only the personal data needed to respond to enquiries and deliver client engagements in ${c.name}. Data is never sold, and enquiry details are shared only with the regional team handling your request.`
        }
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <LegalBody
          country={code}
          sections={[
            {
              heading: isDe ? '1. Verantwortlicher' : '1. Who we are',
              body: `${site.legalName}, ${c.office.street}, ${c.office.city}, ${c.office.country}. ${isDe ? 'Kontakt' : 'Contact'}: ${c.email}, ${c.phone}.`,
            },
            {
              heading: isDe ? '2. Erhobene Daten' : '2. What we collect',
              body: isDe
                ? 'Bei Kontaktanfragen: Name, E-Mail-Adresse, Unternehmen, Telefonnummer und der Inhalt Ihrer Anfrage. Zusätzlich technische Nutzungsdaten in aggregierter Form.'
                : 'When you submit an enquiry: your name, email address, company, phone number where provided, and the content of your message. Separately, aggregated technical usage data such as pages viewed and referral source.',
            },
            {
              heading: isDe ? '3. Zweck der Verarbeitung' : '3. Why we collect it',
              body: isDe
                ? 'Zur Beantwortung Ihrer Anfrage, zur Erbringung vereinbarter Leistungen sowie zur Verbesserung unserer Website.'
                : 'To respond to your enquiry, to deliver agreed services, and to understand which parts of the site are useful. Nothing else.',
            },
            {
              heading: isDe ? '4. Weitergabe an Dritte' : '4. Who we share it with',
              body: isDe
                ? 'Keine Weitergabe an Dritte zu Werbezwecken. Auftragsverarbeiter werden vertraglich gebunden und ausschließlich innerhalb der EU eingesetzt.'
                : 'We do not sell data and we do not share it for advertising. Processors used for hosting, analytics and CRM are contractually bound and named on request.',
            },
            {
              heading: isDe ? '5. Speicherdauer' : '5. How long we keep it',
              body: isDe
                ? 'Anfragedaten werden 24 Monate nach dem letzten Kontakt gelöscht, sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen.'
                : 'Enquiry data is deleted 24 months after last contact unless a legal retention requirement applies or you are an active client.',
            },
            {
              heading: isDe ? '6. Ihre Rechte' : '6. Your rights',
              body: isDe
                ? 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Wenden Sie sich hierfür an die oben genannte Kontaktadresse.'
                : 'You can request a copy of your data, ask us to correct or delete it, or object to processing. Write to the email address above and we will action it within 30 days.',
            },
            {
              heading: isDe ? '7. Cookies' : '7. Cookies',
              body: isDe
                ? 'Diese Website verwendet keine Marketing-Cookies. Analysecookies werden nur nach ausdrücklicher Einwilligung gesetzt.'
                : 'This site sets no marketing cookies. Analytics cookies are set only with explicit consent, and the site functions fully without them.',
            },
          ]}
        />
      </Section>
    </>
  )
}
