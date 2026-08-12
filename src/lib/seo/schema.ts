import type { CountryCode, Breadcrumb, Faq, CaseStudy, BlogPost, Author } from '@/types'
import { countries } from '@/config/countries'
import { site } from '@/config/site'
import { buildUrl } from './metadata'

/**
 * Schema.org generation — SRS §7.6 and §13.
 *
 * "generated from structured fields, never hand-coded per page" (SRS §7.6).
 * Every function here is a pure function of content data, which is what keeps
 * LocalBusiness valid per country without manual QA per page (SRS §1.12).
 */

type Json = Record<string, unknown>

const ORG_ID = `${site.url}/#organization`

export function organizationSchema(): Json {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    foundingDate: String(site.foundedYear),
    foundingLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: site.foundedIn },
    },
    // A named, attributable founder is the single cheapest E-E-A-T signal an
    // agency site can carry, and the one most of them omit (SRS §7.6).
    founder: {
      '@type': 'Person',
      name: site.founder.name,
      jobTitle: site.founder.role,
      knowsAbout: site.founder.expertise,
    },
    email: site.email,
    // SRS §9.2 — consistent entity facts across the site and third-party
    // profiles, so AI systems build a stable picture of the brand.
    sameAs: Object.values(site.social),
    areaServed: Object.values(countries).map((c) => ({
      '@type': 'Country',
      name: c.name,
    })),
    knowsAbout: [
      'Search Engine Optimization',
      'Performance Marketing',
      'Growth Consulting',
      'Business Process Automation',
      'Conversion Rate Optimization',
      'Digital Transformation',
    ],
  }
}

/** SRS §7.6 — LocalBusiness per country. */
export function localBusinessSchema(country: CountryCode): Json {
  const c = countries[country]
  return {
    '@type': 'ProfessionalService',
    '@id': `${buildUrl(country)}#localbusiness`,
    name: `${site.name} — ${c.name}`,
    description: `${c.positioning} serving ${c.name}.`,
    url: buildUrl(country),
    parentOrganization: { '@id': ORG_ID },
    telephone: c.phone,
    email: c.email,
    priceRange: '$$$',
    currenciesAccepted: c.currency,
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.office.street,
      addressLocality: c.office.city,
      addressRegion: c.office.region,
      postalCode: c.office.postalCode,
      addressCountry: c.office.country,
    },
    areaServed: { '@type': 'Country', name: c.name },
  }
}

export function websiteSchema(): Json {
  return {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { '@id': ORG_ID },
  }
}

export function serviceSchema(args: {
  country: CountryCode
  name: string
  description: string
  url: string
  serviceType: string
}): Json {
  const c = countries[args.country]
  return {
    '@type': 'Service',
    name: args.name,
    description: args.description,
    url: args.url,
    serviceType: args.serviceType,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: c.name },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: args.url,
      servicePhone: c.phone,
    },
  }
}

/** SRS §7.6 — mirrors the visible breadcrumb trail exactly. */
export function breadcrumbSchema(items: Breadcrumb[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  }
}

/** SRS §9.2 AEO — explicit Q/A pairs to increase AI Overview eligibility. */
export function faqSchema(faqs: Faq[]): Json {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function articleSchema(post: BlogPost, author: Author, url: string): Json {
  return {
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      knowsAbout: author.expertise,
    },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: post.category,
    wordCount: post.body.reduce(
      (n, b) => n + ('text' in b ? b.text.split(/\s+/).length : 0),
      0
    ),
  }
}

export function personSchema(author: Author): Json {
  return {
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    knowsAbout: author.expertise,
    worksFor: { '@id': ORG_ID },
  }
}

export function caseStudySchema(cs: CaseStudy, url: string): Json {
  return {
    '@type': 'Article',
    headline: cs.title,
    description: cs.challenge,
    image: cs.image,
    datePublished: cs.publishedAt,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
}

/**
 * SRS §7.6 — Review / AggregateRating.
 * Only emitted where real ratings exist; never fabricated to win a rich result.
 */
export function aggregateRatingSchema(rating: number, count: number): Json {
  return {
    '@type': 'AggregateRating',
    ratingValue: rating.toFixed(1),
    reviewCount: count,
    bestRating: 5,
    worstRating: 1,
  }
}

/** SRS §9.2 — entity definition for answer engines. */
export function definedTermSchema(term: string, definition: string): Json {
  return {
    '@type': 'DefinedTerm',
    name: term,
    description: definition,
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: `${site.name} Glossary` },
  }
}

/** Wraps any set of schema nodes into a single @graph document. */
export function graph(...nodes: Json[]): Json {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) }
}
