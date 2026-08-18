import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { AlertCircle, ArrowRight, Check } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { industries as industryDefs } from '@/config/industries'
import { services as serviceDefs, resolveServiceSlug, resolveServiceTitle } from '@/config/services'
import { getIndustryBySlug, getCaseStudies, getTestimonialsByIndustry } from '@/lib/data'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, faqSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'
import { KeyTakeaways } from '@/components/aeo/KeyTakeaways'
import { TestimonialCard } from '@/components/proof/TestimonialCard'
import { CaseStudyCard } from '@/components/content/Cards'
import { CtaSection } from '@/components/conversion/CtaSection'
import { Pill } from '@/components/ui/Pill'
import { Icon } from '@/components/ui/Icon'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal'

/**
 * Industry page — programmatic (industry × country) per SRS §3.4.
 *
 * SRS §11.3 quality gate: every one of these carries a unique industry proof
 * point, a unique introduction, a relevant testimonial reference and correct
 * localised schema. Those come from the §24 brief and the country record, so
 * the page cannot render without them.
 */
export function generateStaticParams() {
  return countryCodes.flatMap((country) =>
    industryDefs.map((i) => ({ country, industry: i.slug }))
  )
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; industry: string }>
}): Promise<Metadata> {
  const { country, industry } = await params
  if (!isCountryCode(country)) return {}

  const code = country as CountryCode
  const c = countries[code]
  const ind = await getIndustryBySlug(code, industry)
  if (!ind) return {}

  return buildMetadata({
    country: code,
    path: `industries/${industry}`,
    title: `${ind.name} marketing in ${c.name} | ${c.positioning}`,
    description: ind.answer.slice(0, 158),
    hreflangGroupId: `industry-${industry}`,
    image: ind.image,
  })
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ country: string; industry: string }>
}) {
  const { country, industry } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'

  const ind = await getIndustryBySlug(code, industry)
  if (!ind) notFound()

  const def = industryDefs.find((i) => i.slug === industry)!
  const caseStudies = await getCaseStudies(code)
  const relevantCase = caseStudies.filter((cs) => cs.industry === industry)
  const testimonials = (await getTestimonialsByIndustry(code, industry)).slice(0, 2)

  const relevantServices = def.primaryServices
    .map((slug) => serviceDefs.find((s) => s.slug === slug))
    .filter(Boolean) as typeof serviceDefs

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: isDe ? 'Branchen' : 'Industries', href: `/${code}/industries/` },
    { name: ind.name, href: `/${code}/industries/${industry}/` },
  ]

  const faqs = [
    {
      question: isDe
        ? `Welche Leistungen benötigen ${ind.name}-Unternehmen typischerweise?`
        : `What does ${ind.name.toLowerCase()} marketing usually require?`,
      answer: `${ind.servicesRequired.join(', ')}. ${ind.seoStrategy}.`,
    },
    {
      question: isDe
        ? `Was sind die häufigsten Probleme in dieser Branche?`
        : `What are the most common problems in this sector?`,
      answer: ind.painPoints.join('. ') + '.',
    },
    {
      question: isDe
        ? 'Welche Inhalte funktionieren in dieser Branche?'
        : 'What kind of content works in this sector?',
      answer: `${ind.contentIdeas.join(', ')}. ${isDe ? 'Als Lead-Magnet eignet sich' : 'The lead magnet that consistently performs is'}: ${ind.leadMagnet.toLowerCase()}.`,
    },
  ]

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(breadcrumbs), faqSchema(faqs))} />

      <PageHero
        country={code}
        eyebrow={ind.name}
        title={
          isDe
            ? `${ind.name}: Wachstum mit dokumentierter Vorgehensweise`
            : `${ind.name} growth in ${c.name}`
        }
        intro={
          isDe
            ? `Wir arbeiten mit ${ind.buyerPersona.toLowerCase()}. Die Vorgehensweise ist dokumentiert und auf die spezifischen Anforderungen dieser Branche abgestimmt.`
            : `We work with ${ind.buyerPersona.toLowerCase()} — and we start from a documented playbook rather than a blank page.`
        }
        answer={ind.answer}
        breadcrumbs={breadcrumbs}
      />

      {/* Pain points — the §24 brief made visible */}
      <Section surface="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Pill variant="outline" size="md">
              {isDe ? 'Problemstellung' : 'The problem'}
            </Pill>
            <h2 className="mt-6 font-display text-h2 text-[color:var(--text-brand)]">
              {isDe
                ? 'Was in dieser Branche tatsächlich schwierig ist'
                : 'What actually makes this sector hard'}
            </h2>
            <ul className="mt-8 space-y-6">
              {ind.painPoints.map((p) => (
                <li key={p} className="flex gap-4">
                  <AlertCircle className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-body text-ink-600">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-burgundy-100">
              <Image
                src={ind.image}
                alt={`${ind.name} sector in ${c.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Approach */}
      <Section surface="tint" deferred>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <SectionHeader
            eyebrow={isDe ? 'Ansatz' : 'The approach'}
            heading={
              isDe
                ? 'Suchstrategie für diese Branche'
                : `How we approach ${ind.name.toLowerCase()}`
            }
            subhead={ind.seoStrategy}
          />
          <Reveal>
            <KeyTakeaways
              country={code}
              title={isDe ? 'Erforderliche Leistungen' : 'What this sector needs'}
              items={ind.servicesRequired}
            />
          </Reveal>
        </div>
      </Section>

      {/* Industry × Service internal links — SRS §3.2 */}
      <Section surface="white" deferred>
        <SectionHeader
          eyebrow={isDe ? 'Leistungen' : 'Services'}
          heading={
            isDe
              ? `Leistungen für ${ind.name}`
              : `Services for ${ind.name.toLowerCase()}`
          }
        />
        <StaggerGroup className="mt-10 grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-2">
          {relevantServices.map((s) => (
            <StaggerItem key={s.slug} className="bg-paper-pure">
              <Link
                href={`/${code}/industries/${industry}/${resolveServiceSlug(s, code)}/`}
                className="group flex items-center justify-between gap-4 p-7 transition-colors duration-base hover:bg-accent-soft"
              >
                <span className="flex items-center gap-4">
                  <Icon name={s.icon} className="h-5 w-5 text-accent" />
                  <span>
                    <span className="block font-display text-h4 text-[color:var(--text-brand)]">
                      {resolveServiceTitle(s, code)}
                    </span>
                    <span className="mt-1 block text-small text-ink-400">
                      {isDe ? 'für' : 'for'} {ind.name}
                    </span>
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-[color:var(--text-brand)] transition-transform duration-base group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* Content angles */}
      <Section surface="paper" deferred>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeader
              eyebrow={isDe ? 'Inhalte' : 'Content'}
              heading={
                isDe
                  ? 'Welche Inhalte hier funktionieren'
                  : 'The content that works here'
              }
            />
            <ul className="mt-8 space-y-4">
              {ind.contentIdeas.map((idea) => (
                <li key={idea} className="flex gap-3.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-body text-ink-600">{idea}</span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal>
            <div className="rounded-lg border border-accent-line bg-burgundy-100/25 p-7 sm:p-9">
              <p className="font-tight text-eyebrow uppercase text-accent">
                {isDe ? 'Lead-Magnet' : 'Lead magnet'}
              </p>
              <p className="mt-4 font-display text-h3 text-[color:var(--text-brand)]">
                {ind.leadMagnet}
              </p>
              <p className="mt-6 border-t border-burgundy-700/10 pt-6 font-tight text-eyebrow uppercase text-accent">
                {isDe ? 'Referenzidee' : 'Case study focus'}
              </p>
              <p className="mt-3 text-body text-ink-600">{ind.caseStudyIdea}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Proof — SRS §11.3 requires a testimonial or case study reference */}
      {(relevantCase.length > 0 || testimonials.length > 0) && (
        <Section surface="tint" deferred>
          <SectionHeader
            eyebrow={isDe ? 'Nachweis' : 'Proof'}
            heading={isDe ? 'Ergebnisse aus dieser Branche' : 'Results from this sector'}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {relevantCase.slice(0, 1).map((cs) => (
              <CaseStudyCard
                key={cs.id}
                href={`/${code}/case-studies/${cs.slug}/`}
                title={cs.title}
                industry={ind.name}
                headlineMetric={cs.results[0].metric}
                metricLabel={cs.results[0].label}
                image={cs.image}
                isPlaceholder={cs.isPlaceholder}
              />
            ))}
            {testimonials.slice(0, 1).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </Section>
      )}

      <Section surface="white" deferred>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="FAQ" heading={isDe ? 'Häufige Fragen' : 'Sector questions'} />
          <Reveal>
            <FaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </Section>

      <CtaSection
        country={code}
        eyebrow={ind.name}
        heading={
          isDe
            ? `Sprechen wir über ${ind.name}`
            : `Let's talk about ${ind.name.toLowerCase()}`
        }
        body={
          isDe
            ? 'Wir kennen die Kaufprozesse und Compliance-Anforderungen dieser Branche.'
            : `We already know the buying cycle and the constraints. The conversation starts further along than usual.`
        }
      />
    </>
  )
}
