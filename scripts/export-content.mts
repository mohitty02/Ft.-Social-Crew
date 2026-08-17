/**
 * Dumps the frontend's current content layer to JSON for the CMS importer.
 *
 * This runs once, to move what is presently hard-coded in src/config and
 * src/content into the database. It exports the DERIVED content — what the
 * pages actually render, already localised per market — rather than the raw
 * templates, so the CMS ends up holding finished copy an editor can read.
 *
 *   npx tsx scripts/export-content.mts
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

import { countries, countryCodes } from '../src/config/countries'
import { site } from '../src/config/site'
import { services as serviceDefs, resolveServiceSlug, resolveServiceTitle, resolveServiceShortDescription } from '../src/config/services'
import { industries as industryDefs, resolveIndustryName } from '../src/config/industries'
import { countryHome } from '../src/content/countries'
import { marketHome } from '../src/content/marketHome'
import { authors } from '../src/content/authors'
import { getTestimonials } from '../src/content/testimonials'
import {
  getServices,
  getIndustries,
  getCityList,
  getCaseStudies,
  getBlogPosts,
  getPricing,
  getResources,
} from '../src/lib/data'
import { marketImages, editorial } from '../src/config/media'

const out: Record<string, unknown> = {
  site,
  authors,
  markets: [],
}

const markets: unknown[] = []

for (const code of countryCodes) {
  const c = countries[code]
  const home = countryHome[code]
  const market = marketHome[code]

  const [services, industries, cities, caseStudies, blogPosts, pricing, resources] =
    await Promise.all([
      getServices(code),
      getIndustries(code),
      getCityList(code),
      getCaseStudies(code),
      getBlogPosts(code),
      getPricing(code),
      getResources(code),
    ])

  markets.push({
    // ── Market settings ──
    code: c.code,
    name: c.name,
    locale: c.locale,
    currency: c.currency,
    currencySymbol: c.currencySymbol,
    timezone: c.timezone,
    status: c.status,
    spelling: c.spelling,
    pricingMode: c.pricingMode,
    whatsapp: c.whatsapp,
    positioning: c.positioning,
    positioningAlt: c.positioningAlt,
    positioningRationale: c.positioningRationale,
    phone: c.phone,
    email: c.email,
    office: c.office,
    primaryCta: c.primaryCta,
    secondaryCta: c.secondaryCta,
    leadMagnet: c.leadMagnet,
    trustNote: (c as { trustNote?: string }).trustNote ?? null,
    searchConsoleProperty: c.searchConsoleProperty,
    heroImage: c.heroImage,
    cityImage: c.cityImage,
    theme: (market as { theme?: unknown }).theme ?? null,
    layout: market.layout,

    // ── Home page ──
    home: {
      hero: {
        eyebrow: market.hero.eyebrow,
        headline: market.hero.headline,
        headlineAccent: market.hero.headlineAccent,
        body: market.hero.body,
        primaryCta: market.hero.primaryCta,
        secondaryCta: market.hero.secondaryCta,
        imageAlt: market.hero.imageAlt,
        assurances: market.hero.assurances,
        metrics: market.hero.metrics,
      },
      heroImage: market.hero.image,
      strip: market.strip,
      servicesHead: market.services,
      stats: market.stats,
      casesHead: market.cases,
      process: market.process,
      testimonialsHead: market.testimonials,
      blogHead: market.blog,
      closing: market.closing,
      nav: { ...market.nav, headerCta: market.headerCta },
      footer: market.footer,
      ui: market.ui,
      positioningSection: home.positioningSection,
      trust: { heading: home.trustHeading, points: home.trustPoints },
      seo: {
        answer: home.answer,
        title: `${c.positioning} in ${c.name}`,
        description: home.answer.slice(0, 158),
      },
    },

    // ── Collections ──
    services: services.map((s) => {
      const def = serviceDefs.find((d) => resolveServiceSlug(d, code) === s.slug)
      return {
        slug: s.slug,
        title: s.title,
        icon: s.icon,
        category: def?.category ?? null,
        shortDescription: def ? resolveServiceShortDescription(def, code) : null,
        summary: s.summary,
        answer: s.answer,
        outcomes: s.outcomes,
        deliverables: s.deliverables,
        process: s.process,
        faqs: s.faqs,
      }
    }),

    industries: industries.map((i) => {
      const def = industryDefs.find((d) => d.slug === i.slug)
      return {
        slug: i.slug,
        name: def ? resolveIndustryName(def, code) : i.name,
        icon: def?.icon ?? null,
        buyerPersona: i.buyerPersona,
        painPoints: i.painPoints,
        servicesRequired: i.servicesRequired,
        seoStrategy: i.seoStrategy,
        contentIdeas: i.contentIdeas,
        leadMagnet: i.leadMagnet,
        caseStudyIdea: i.caseStudyIdea,
        primaryServices: def?.primaryServices ?? [],
        image: i.image,
      }
    }),

    cities: cities.map((x) => ({
      slug: x.slug,
      name: x.name,
      region: x.region,
      localProofPoint: x.localProofPoint,
      uniqueIntro: x.uniqueIntro,
      answer: x.answer,
      image: x.image,
    })),

    caseStudies: caseStudies.map((cs) => ({
      slug: cs.slug,
      title: cs.title,
      client: cs.client,
      industry: cs.industry,
      service: cs.service,
      challenge: cs.challenge,
      approach: cs.approach,
      results: cs.results,
      quote: cs.quote,
      isPlaceholder: cs.isPlaceholder,
      publishedAt: cs.publishedAt,
      image: cs.image,
    })),

    testimonials: getTestimonials(code).map((t) => ({
      quote: t.quote,
      author: t.author,
      role: t.role,
      company: t.company,
      industry: t.industry,
      rating: t.rating,
      hasVideo: Boolean((t as { hasVideo?: boolean }).hasVideo),
      isPlaceholder: t.isPlaceholder,
      image: t.image,
    })),

    blogPosts: blogPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      answer: p.answer,
      category: p.category,
      cluster: p.cluster,
      authorId: p.authorId,
      body: p.body,
      faqs: p.faqs,
      readingTime: p.readingTime,
      publishedAt: p.publishedAt,
      updatedAt: p.updatedAt,
      image: p.image,
    })),

    resources: resources.map((r) => ({
      slug: r.slug,
      title: r.title,
      description: r.description,
      format: r.format,
      category: r.category,
      readingTime: r.readingTime,
      image: r.image,
    })),

    pricing: pricing.map((p) => ({
      name: p.name,
      price: p.price,
      period: p.period,
      description: p.description,
      features: p.features,
      highlighted: Boolean(p.highlighted),
      cta: p.cta,
    })),

    faqs: home.faqs.map((f) => ({ scope: 'home', ...f })),

    marketImages: marketImages[code] ?? null,
  })
}

out.markets = markets
out.editorial = editorial

const target = resolve(process.cwd(), 'scripts/content-export.json')
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, JSON.stringify(out, null, 2), 'utf8')

console.log(
  `exported ${markets.length} markets -> ${target} (${(
    Buffer.byteLength(JSON.stringify(out)) / 1024
  ).toFixed(0)} KB)`
)
