import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Quote } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { getCaseStudies, getCaseStudyBySlug } from '@/lib/data'
import { getIndustryDefinition } from '@/config/industries'
import { formatDate } from '@/lib/i18n/format'
import { buildMetadata, buildUrl } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, caseStudySchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { AnswerBlock } from '@/components/aeo/AnswerBlock'
import { StatStrip } from '@/components/proof/StatStrip'
import { CaseStudyCard } from '@/components/content/Cards'
import { CtaSection } from '@/components/conversion/CtaSection'
import { Pill } from '@/components/ui/Pill'
import { Reveal } from '@/components/motion/Reveal'

export async function generateStaticParams() {
  const params: { country: string; slug: string }[] = []
  for (const country of countryCodes) {
    const studies = await getCaseStudies(country)
    for (const cs of studies) params.push({ country, slug: cs.slug })
  }
  return params
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; slug: string }>
}): Promise<Metadata> {
  const { country, slug } = await params
  if (!isCountryCode(country)) return {}

  const code = country as CountryCode
  const cs = await getCaseStudyBySlug(code, slug)
  if (!cs) return {}

  return buildMetadata({
    country: code,
    path: `case-studies/${slug}`,
    title: cs.title,
    description: cs.challenge.slice(0, 158),
    image: cs.image,
    type: 'article',
    publishedTime: cs.publishedAt,
  })
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ country: string; slug: string }>
}) {
  const { country, slug } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'

  const cs = await getCaseStudyBySlug(code, slug)
  if (!cs) notFound()

  const all = await getCaseStudies(code)
  const related = all.filter((x) => x.slug !== slug).slice(0, 2)
  const industry = getIndustryDefinition(cs.industry)

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: isDe ? 'Referenzen' : 'Case studies', href: `/${code}/case-studies/` },
    { name: industry?.name ?? cs.industry, href: `/${code}/case-studies/${slug}/` },
  ]

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(breadcrumbs),
          caseStudySchema(cs, buildUrl(code, `case-studies/${slug}`))
        )}
      />

      <article>
        <section className="border-b border-ink/10 bg-paper pb-14 pt-8">
          <div className="container-shell">
            <Breadcrumbs items={breadcrumbs} className="mb-10" />

            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <Pill variant="outline" size="md">
                  {industry?.name ?? cs.industry}
                </Pill>
                <h1 className="mt-6 font-display text-display-2 text-[color:var(--text-brand)]">
                  {cs.title}
                </h1>
                <p className="mt-5 font-tight text-eyebrow uppercase text-accent">
                  {cs.client} · <time dateTime={cs.publishedAt}>{formatDate(cs.publishedAt, code)}</time>
                </p>
              </div>

              <div className="lg:pt-14">
                <AnswerBlock label={isDe ? 'Ausgangslage' : 'The challenge'}>
                  {cs.challenge}
                </AnswerBlock>
              </div>
            </div>

            <div className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-xl bg-burgundy-100">
              <Image
                src={cs.image}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Results first — SRS §23.2 requires real metrics with methodology */}
        <Section surface="paper">
          <SectionHeader
            eyebrow={isDe ? 'Ergebnisse' : 'Results'}
            heading={isDe ? 'Messbare Veränderung' : 'What changed, and over what period'}
          />
          <StatStrip
            className="mt-10"
            columns={3}
            stats={cs.results.map((r) => ({
              value: r.metric,
              label: r.label,
              detail: r.detail,
            }))}
          />
          {cs.isPlaceholder && (
            <p className="mt-6 max-w-prose text-small text-ink-400">
              {isDe
                ? 'Hinweis: Die dargestellten Kennzahlen sind illustrativ. Reale Projektzahlen werden nach Freigabe durch den Kunden ergänzt.'
                : 'Note: figures shown are illustrative pending client approval. Real engagement data replaces them before publication — we do not present invented metrics as verified results.'}
            </p>
          )}
        </Section>

        <Section surface="tint" deferred>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <SectionHeader
                eyebrow={isDe ? 'Vorgehen' : 'Approach'}
                heading={isDe ? 'Wie wir vorgegangen sind' : 'What we actually did'}
              />
              <ol className="mt-8 space-y-6">
                {cs.approach.map((step, i) => (
                  <li key={step} className="flex gap-5">
                    <span className="tabular shrink-0 font-display text-h3 text-gold-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="pt-1 text-body text-ink-600">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {cs.quote && (
              <Reveal>
                <figure className="rounded-xl border border-accent-line bg-paper-pure p-8 sm:p-10">
                  <Quote className="h-7 w-7 text-gold-300" aria-hidden="true" />
                  <blockquote className="mt-6 font-display text-h3 text-[color:var(--text-brand)]">
                    {cs.quote.text}
                  </blockquote>
                  <figcaption className="mt-7 border-t border-ink/10 pt-5">
                    <p className="font-tight text-small font-medium text-[color:var(--text-brand)]">
                      {cs.quote.author}
                    </p>
                    <p className="mt-1 text-small text-ink-400">{cs.quote.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            )}
          </div>
        </Section>

        {related.length > 0 && (
          <Section surface="white" deferred>
            <SectionHeader
              eyebrow={isDe ? 'Weitere Referenzen' : 'More work'}
              heading={isDe ? 'Weitere Projekte' : 'Other engagements'}
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {related.map((r) => (
                <CaseStudyCard
                  key={r.id}
                  href={`/${code}/case-studies/${r.slug}/`}
                  title={r.title}
                  industry={getIndustryDefinition(r.industry)?.name ?? r.industry}
                  headlineMetric={r.results[0].metric}
                  metricLabel={r.results[0].label}
                  image={r.image}
                  isPlaceholder={r.isPlaceholder}
                />
              ))}
            </div>
          </Section>
        )}
      </article>

      <CtaSection
        country={code}
        eyebrow={industry?.name ?? cs.industry}
        heading={
          isDe
            ? 'Ähnliche Ausgangslage?'
            : 'Recognise the problem?'
        }
        body={
          isDe
            ? 'Wir beginnen mit einer Aufnahme des Ist-Zustands, nicht mit einem Angebot.'
            : 'We will start by working out whether your constraint is actually the same one.'
        }
      />
    </>
  )
}
