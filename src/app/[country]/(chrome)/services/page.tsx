import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { getServices } from '@/lib/data'
import { buildMetadata, buildUrl } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, serviceSchema, faqSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { ServiceCard } from '@/components/content/Cards'
import { Icon } from '@/components/ui/Icon'
import { KeyTakeaways } from '@/components/aeo/KeyTakeaways'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'
import { CtaSection } from '@/components/conversion/CtaSection'
import { StaggerGroup, StaggerItem, Reveal } from '@/components/motion/Reveal'

/**
 * Services hub — the pillar page in SRS §11.2's cluster model. Links out to
 * every service (cluster) page, which each link back here.
 *
 * URL: /{country}/services/ per SRS §3.1. Detail pages live at
 * /{country}/{service-slug}/ per the SRS §3.2 table.
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
    path: 'services',
    title: `Services | ${c.positioning} in ${c.name}`,
    description: `Ten core services delivered as ${c.positioning.toLowerCase()} work in ${c.name} — planned together as one growth system rather than sold as separate line items.`,
    hreflangGroupId: 'services',
  })
}

export default async function ServicesHubPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'
  const services = await getServices(code)

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: isDe ? 'Leistungen' : 'Services', href: `/${code}/services/` },
  ]

  const faqs = [
    {
      question: isDe
        ? 'Können einzelne Leistungen separat beauftragt werden?'
        : 'Can we engage a single service on its own?',
      answer: isDe
        ? 'Ja. Die Leistungen sind jedoch so konzipiert, dass sie zusammenwirken. Wenn eine isolierte Beauftragung voraussichtlich unterdurchschnittlich wirkt, sagen wir das vorab.'
        : 'Yes. They are designed to work together, though, so if we think a service will underperform in isolation we will say so before you commit rather than after.',
    },
    {
      question: isDe
        ? 'Wie werden die Leistungen priorisiert?'
        : 'How do you decide which services we actually need?',
      answer: isDe
        ? 'Durch eine strukturierte Ist-Analyse. Priorisiert wird nach tatsächlichem Engpass, nicht nach Leistungsumfang.'
        : 'Through a diagnostic that identifies where growth is actually constrained. We prioritise by constraint, not by what is easiest to sell — which sometimes means recommending fewer services than you came in expecting.',
    },
    {
      question: isDe
        ? 'Sind die Leistungen in allen Märkten identisch?'
        : 'Are these services the same in every country?',
      answer: isDe
        ? 'Der Leistungsumfang ist vergleichbar, die Umsetzung unterscheidet sich je Markt erheblich — Suchverhalten, Kanalmix und Wettbewerbsintensität sind nicht übertragbar.'
        : `The capability set is comparable across markets, but delivery differs substantially. Search behaviour, channel mix and competitive intensity in ${c.name} do not transfer from anywhere else, so neither does the plan.`,
    },
  ]

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(breadcrumbs),
          faqSchema(faqs),
          ...services.map((s) =>
            serviceSchema({
              country: code,
              name: s.title,
              description: s.summary,
              url: buildUrl(code, s.slug),
              serviceType: s.title,
            })
          )
        )}
      />

      <PageHero
        country={code}
        eyebrow={isDe ? 'Leistungen' : 'Services'}
        title={
          isDe
            ? 'Zehn Leistungsbereiche, eine Vorgehensweise'
            : 'Ten services, planned as one system'
        }
        intro={
          isDe
            ? 'Jeder Bereich folgt derselben dokumentierten Vorgehensweise: Ist-Aufnahme, Zielarchitektur, Implementierung, Übergabe. Die Reihenfolge richtet sich nach technischer Abhängigkeit, nicht nach Präferenz.'
            : `Every service below runs the same four-stage method — audit, architecture, execution, compounding. What differs is which ones your business actually needs, and in what order.`
        }
        answer={
          isDe
            ? `Ft. Social Crew bietet in Deutschland zehn Kernleistungen von SEO und Performance Advertising bis Prozessautomatisierung und Digital Engineering — alle nach dokumentierter Vorgehensweise und DSGVO-konform.`
            : `Ft. Social Crew offers ten core services in ${c.name}, spanning acquisition (SEO, paid advertising, content), conversion, brand, platform and advisory. They are sold and planned as one system because growth constraints rarely sit in a single channel.`
        }
        breadcrumbs={breadcrumbs}
      />

      <Section surface="paper">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <StaggerItem key={service.id}>
              <ServiceCard
                href={`/${code}/${service.slug}/`}
                title={service.title}
                summary={service.summary}
                icon={<Icon name={service.icon} />}
                index={i}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section surface="tint" deferred>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeader
              eyebrow={isDe ? 'Auswahl' : 'Choosing'}
              heading={
                isDe
                  ? 'Welche Leistungen für Sie relevant sind'
                  : 'How to work out which of these you need'
              }
              subhead={
                isDe
                  ? 'Die häufigste Fehlentscheidung ist, einen Kanal hinzuzufügen, bevor die Messgrundlage steht.'
                  : 'The most common and expensive mistake is adding a channel before establishing a baseline you can defend.'
              }
            />
          </div>
          <Reveal>
            <KeyTakeaways
              country={code}
              title={isDe ? 'Kurzfassung' : 'The short version'}
              items={
                isDe
                  ? [
                      'Beginnen Sie mit der Messgrundlage, nicht mit einem neuen Kanal',
                      'Priorisieren Sie nach Engpass, nicht nach Leistungsumfang',
                      'Drei gut umgesetzte Kanäle schlagen sechs halbherzige',
                      'Jede Kennzahl braucht Zeitraum, Ausgangswert und Messmethode',
                    ]
                  : [
                      'Start with measurement, not with an additional channel',
                      'Prioritise by constraint, not by what is easiest to buy',
                      'Three channels run properly beat six run thinly',
                      'Every metric needs a timeframe, a baseline and an attribution method',
                    ]
              }
            />
          </Reveal>
        </div>
      </Section>

      <Section surface="white" deferred>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader
            eyebrow="FAQ"
            heading={isDe ? 'Häufige Fragen' : 'Common questions'}
          />
          <Reveal>
            <FaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </Section>

      <CtaSection
        country={code}
        eyebrow={isDe ? 'Nächster Schritt' : 'Next step'}
        heading={
          isDe
            ? 'Beginnen Sie mit einer Prozessanalyse'
            : 'Start with the diagnosis, not the services'
        }
        body={
          isDe
            ? 'Wir nehmen den Ist-Zustand auf und priorisieren, bevor irgendetwas beauftragt wird.'
            : 'We will tell you which of these you need and, more usefully, which you do not.'
        }
      />
    </>
  )
}
