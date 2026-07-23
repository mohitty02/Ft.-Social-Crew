import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { CountryCode } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { getBlogPosts } from '@/lib/data'
import { formatDate } from '@/lib/i18n/format'
import { buildMetadata } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/hero/PageHero'
import { Section, SectionHeader } from '@/components/layout/Section'
import { BlogCard } from '@/components/content/Cards'
import { CtaSection } from '@/components/conversion/CtaSection'
import { PillRow } from '@/components/ui/Pill'
import { StaggerGroup, StaggerItem } from '@/components/motion/Reveal'

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
    path: 'blog',
    title: `Blog | ${c.positioning} in ${c.name}`,
    description: `Practical writing on growth, search, measurement and process — organised into topic clusters rather than published at random.`,
    hreflangGroupId: 'blog',
  })
}

export default async function BlogHubPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'
  const posts = await getBlogPosts(code)
  const categories = Array.from(new Set(posts.map((p) => p.category)))

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: 'Blog', href: `/${code}/blog/` },
  ]

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(breadcrumbs))} />

      <PageHero
        eyebrow="Blog"
        title={
          isDe
            ? 'Fachbeiträge zu Wachstum, Suche und Messbarkeit'
            : 'Writing on growth, search and measurement'
        }
        intro={
          isDe
            ? 'Beiträge sind in Themencluster organisiert und bauen aufeinander auf, statt einzeln zu erscheinen.'
            : `Organised into topic clusters that build on each other, rather than published as disconnected posts. ${isDe ? '' : 'No listicles.'}`
        }
        answer={
          isDe
            ? 'Der Ft. Social Crew Blog behandelt Prozessautomatisierung, technische Suchmaschinenoptimierung, Attributionsmodelle und Conversion-Analyse — jeweils mit dokumentierter Methodik.'
            : `The Ft. Social Crew blog covers SEO cost and scope, staffing models, attribution, programmatic SEO quality gating, answer engine optimisation and conversion research — each organised into a topic cluster that supports a pillar page.`
        }
        breadcrumbs={breadcrumbs}
      >
        <PillRow items={categories} />
      </PageHero>

      <Section surface="paper">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <BlogCard
                href={`/${code}/blog/${post.slug}/`}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                readingTime={post.readingTime}
                image={post.image}
                date={formatDate(post.publishedAt, code)}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <CtaSection
        country={code}
        eyebrow={isDe ? 'Nächster Schritt' : 'Next step'}
        heading={
          isDe
            ? 'Fragen zu einem Beitrag?'
            : 'Want this applied to your situation?'
        }
        body={
          isDe
            ? 'Wir ordnen die Inhalte gerne auf Ihren konkreten Fall ein.'
            : 'Reading about a method and knowing whether it fits your constraint are different things. We will tell you which.'
        }
      />
    </>
  )
}
