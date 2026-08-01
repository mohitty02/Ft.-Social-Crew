import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { CountryCode, ContentBlock } from '@/types'
import { countries, countryCodes, isCountryCode } from '@/config/countries'
import { getBlogPosts, getBlogPostBySlug } from '@/lib/data'
import { getAuthor } from '@/content/authors'
import { formatDate } from '@/lib/i18n/format'
import { buildMetadata, buildUrl } from '@/lib/seo/metadata'
import { graph, breadcrumbSchema, articleSchema, faqSchema, personSchema } from '@/lib/seo/schema'

import { JsonLd } from '@/components/seo/JsonLd'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { AnswerBlock } from '@/components/aeo/AnswerBlock'
import { FaqAccordion } from '@/components/aeo/FaqAccordion'
import { BlogCard } from '@/components/content/Cards'
import { CtaSection } from '@/components/conversion/CtaSection'
import { Pill } from '@/components/ui/Pill'

/**
 * Blog post.
 *
 * Article + Person schema (SRS §7.6), author bio for E-E-A-T expertise, the
 * GEO answer statement immediately under the H1 (SRS §9.2), and an FAQ block
 * with FAQPage schema. Body content renders from structured blocks rather than
 * raw HTML, which is what makes a future block editor a drop-in.
 */
export async function generateStaticParams() {
  const params: { country: string; slug: string }[] = []
  for (const country of countryCodes) {
    const posts = await getBlogPosts(country)
    for (const p of posts) params.push({ country, slug: p.slug })
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
  const post = await getBlogPostBySlug(code, slug)
  if (!post) return {}
  const author = getAuthor(post.authorId)

  return buildMetadata({
    country: code,
    path: `blog/${slug}`,
    title: post.title,
    description: post.excerpt.slice(0, 158),
    hreflangGroupId: `blog-${slug}`,
    image: post.image,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: [author.name],
  })
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'heading':
      return block.level === 2 ? (
        <h2 className="mt-12 font-display text-h2 text-[color:var(--text-brand)]">{block.text}</h2>
      ) : (
        <h3 className="mt-9 font-display text-h3 text-[color:var(--text-brand)]">{block.text}</h3>
      )
    case 'paragraph':
      return <p className="mt-5 text-body text-ink-600">{block.text}</p>
    case 'list':
      return block.ordered ? (
        <ol className="mt-6 list-decimal space-y-3 pl-5 text-body text-ink-600 marker:text-accent">
          {block.items.map((i) => (
            <li key={i} className="pl-1.5">
              {i}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="mt-6 list-disc space-y-3 pl-5 text-body text-ink-600 marker:text-gold-300">
          {block.items.map((i) => (
            <li key={i} className="pl-1.5">
              {i}
            </li>
          ))}
        </ul>
      )
    case 'callout':
      return (
        <aside className="mt-9 rounded-lg border border-accent-line bg-burgundy-100/25 p-6">
          <p className="font-tight text-eyebrow uppercase text-accent">{block.title}</p>
          <p className="mt-3 text-body text-ink-800">{block.text}</p>
        </aside>
      )
    case 'quote':
      return (
        <figure className="mt-9 border-l-2 border-accent-line pl-6">
          <blockquote className="font-display text-h3 text-[color:var(--text-brand)]">
            {block.text}
          </blockquote>
          <figcaption className="mt-3 text-small text-ink-400">
            {block.attribution}
          </figcaption>
        </figure>
      )
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ country: string; slug: string }>
}) {
  const { country, slug } = await params
  if (!isCountryCode(country)) notFound()

  const code = country as CountryCode
  const c = countries[code]
  const isDe = code === 'de'

  const post = await getBlogPostBySlug(code, slug)
  if (!post) notFound()

  const author = getAuthor(post.authorId)
  const all = await getBlogPosts(code)
  const related = all.filter((p) => p.slug !== slug).slice(0, 3)

  const breadcrumbs = [
    { name: c.name, href: `/${code}/` },
    { name: 'Blog', href: `/${code}/blog/` },
    { name: post.category, href: `/${code}/blog/${slug}/` },
  ]

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(breadcrumbs),
          articleSchema(post, author, buildUrl(code, `blog/${slug}`)),
          personSchema(author),
          ...(post.faqs ? [faqSchema(post.faqs)] : [])
        )}
      />

      <article>
        <section className="bg-paper pb-12 pt-8">
          <div className="container-shell">
            <Breadcrumbs items={breadcrumbs} className="mb-10" />

            <div className="mx-auto max-w-3xl">
              <Pill variant="outline" size="md">
                {post.category}
              </Pill>

              <h1 className="mt-6 font-display text-display-2 text-[color:var(--text-brand)]">
                {post.title}
              </h1>

              {/* SRS §9.2 GEO — quotable answer within the first 200 words */}
              <AnswerBlock country={code} className="mt-8">{post.answer}</AnswerBlock>

              <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-ink/10 py-5">
                <Image
                  src={author.image}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-pill object-cover"
                />
                <div>
                  <p className="font-tight text-small font-medium text-[color:var(--text-brand)]">
                    {author.name}
                  </p>
                  <p className="text-small text-ink-400">{author.role}</p>
                </div>
                <div className="ml-auto text-small text-ink-400">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt, code)}
                  </time>
                  <span className="mx-2" aria-hidden="true">
                    ·
                  </span>
                  {post.readingTime} min
                </div>
              </div>
            </div>

            <div className="relative mx-auto mt-10 aspect-[21/9] max-w-4xl overflow-hidden rounded-xl bg-burgundy-100">
              <Image
                src={post.image}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <Section surface="paper">
          <div className="mx-auto max-w-prose">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          {post.faqs && post.faqs.length > 0 && (
            <div className="mx-auto mt-16 max-w-prose">
              <h2 className="font-display text-h2 text-[color:var(--text-brand)]">
                {isDe ? 'Häufige Fragen' : 'Frequently asked'}
              </h2>
              <div className="mt-6">
                <FaqAccordion faqs={post.faqs} />
              </div>
            </div>
          )}

          {/* Author bio — E-E-A-T expertise signal, Person schema above */}
          <aside className="mx-auto mt-16 max-w-prose rounded-lg border border-ink/10 bg-paper-pure p-7">
            <div className="flex items-start gap-5">
              <Image
                src={author.image}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-pill object-cover"
              />
              <div>
                <p className="font-display text-h4 text-[color:var(--text-brand)]">{author.name}</p>
                <p className="mt-1 font-tight text-eyebrow uppercase text-accent">
                  {author.role}
                </p>
                <p className="mt-3 text-small text-ink-600">{author.bio}</p>
              </div>
            </div>
          </aside>
        </Section>

        <Section surface="white" deferred>
          <SectionHeader
            eyebrow={isDe ? 'Weiterlesen' : 'Keep reading'}
            heading={isDe ? 'Verwandte Beiträge' : 'Related in this cluster'}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogCard
                key={p.id}
                href={`/${code}/blog/${p.slug}/`}
                title={p.title}
                excerpt={p.excerpt}
                category={p.category}
                readingTime={p.readingTime}
                image={p.image}
                date={formatDate(p.publishedAt, code)}
              />
            ))}
          </div>
          <div className="mt-10">
            <Link
              href={`/${code}/blog/`}
              className="font-tight text-small text-[color:var(--text-brand)] underline decoration-gold-300 decoration-2 underline-offset-4"
            >
              {isDe ? 'Alle Beiträge' : 'All articles'}
            </Link>
          </div>
        </Section>
      </article>

      <CtaSection
        country={code}
        eyebrow={post.category}
        heading={
          isDe ? 'Anwendung auf Ihren Fall' : 'Apply this to your own situation'
        }
        body={
          isDe
            ? 'Wir prüfen, welcher Teil davon in Ihrem Kontext tatsächlich relevant ist.'
            : 'We will work out which part of this is actually relevant to your constraint — and which part is not.'
        }
      />
    </>
  )
}
