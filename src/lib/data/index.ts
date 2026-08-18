import type {
  CountryCode,
  Service,
  Industry,
  City,
  CaseStudy,
  BlogPost,
  PricingPlan,
  Resource,
  Competitor,
  Faq,
} from '@/types'
import { countries } from '@/config/countries'
import { getCmsMarket } from '@/lib/cms/client'
import {
  services as serviceDefs,
  resolveServiceSlug,
  resolveServiceTitle,
  resolveServiceShortDescription,
  getServiceDefinition,
} from '@/config/services'
import {
  industries as industryDefs,
  getIndustryDefinition,
  resolveIndustryName,
} from '@/config/industries'
import { getCities, getCity } from '@/config/cities'
import { getTestimonialsByIndustry } from '@/content/testimonials'
import { localiseSpelling } from '@/lib/i18n/format'
import {
  industryImages,
  caseStudyImages,
  blogImages,
  resourceImages,
  editorial,
} from '@/config/media'

/**
 * ══════════════════════════════════════════════════════════════════
 *  THE CMS BOUNDARY
 * ══════════════════════════════════════════════════════════════════
 *
 * Every page in the application imports its content from this module and from
 * nowhere else. Today these functions read typed local content. When the
 * platform in SRS §21.2 exists, each one becomes a fetch against
 * /api/{country}/{resource} and NOT ONE PAGE OR COMPONENT CHANGES.
 *
 * They are declared async for exactly that reason — the swap must be
 * non-breaking.
 */

// ─────────────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────────────

/**
 * SRS §7.4 — service copy must be substantively different per market, not one
 * body text with a country name swapped in. The framing below shifts with the
 * market's buying logic from SRS §2.2.
 */
const serviceFraming: Record<CountryCode, (title: string) => string> = {
  'in': (t) =>
    `${t} delivered as part of one growth plan rather than as an isolated service — planned alongside your other channels, reported against pipeline, and priced transparently in INR.`,
  'en-us': (t) =>
    `${t} run by a fractional team with a named strategist and operator, benchmarked against a 140-company dataset so you know whether your numbers are actually competitive.`,
  'en-ca': (t) =>
    `${t} delivered as a phase within a broader transformation programme, with a documented handover so your team can operate the capability independently afterwards.`,
  'en-au': (t) =>
    `${t} managed against contribution margin and payback period, with the full model held in your own spreadsheet so every figure we report can be checked.`,
  'de': (t) =>
    `${t} nach dokumentierter Vorgehensweise: Ist-Aufnahme, Zielarchitektur, Implementierung und vollständige Übergabe — DSGVO-konform innerhalb der EU.`,
  'en-ae': (t) =>
    `${t} delivered by senior consultants engaged throughout the programme, combining strategic advisory with the capability to implement within your existing systems landscape.`,
}

const serviceOutcomes: Record<CountryCode, string[]> = {
  'in': [
    'A single quarterly roadmap covering every channel',
    'City-level targeting for metro and tier-2 markets',
    'Transparent INR pricing with no hidden scope',
    'Monthly reporting tied to qualified enquiries',
  ],
  'en-us': [
    'Named strategist, operator and analyst from week one',
    'Benchmarked against 140 comparable growth programmes',
    'Documented decisions you keep if you take it in-house',
    'Thirty-day exit with no severance exposure',
  ],
  'en-ca': [
    'Readiness assessment before any spend is recommended',
    'Phased delivery — each phase standalone and complete',
    'Bilingual EN/FR capability where Quebec matters',
    'Runbooks and training so your team owns the result',
  ],
  'en-au': [
    'Blended CAC reporting, not channel-flattering ROAS',
    'Contribution margin model held in your spreadsheet',
    'Underperformance flagged the month it happens',
    'AUD pricing with no conversion surprises',
  ],
  'de': [
    'Vollständig dokumentierte Prozessaufnahme',
    'Definierte Referenzarchitektur vor Implementierung',
    'DSGVO-konforme Verarbeitung ausschließlich in der EU',
    'Betriebshandbuch und Schulung bei Übergabe',
  ],
  'en-ae': [
    'Senior consultants engaged throughout the programme',
    'Advisory grounded in real delivery capability',
    'Discretion and confidentiality as standard',
    'AED engagement terms with defined milestones',
  ],
}

function serviceProcess(country: CountryCode) {
  if (country === 'de') {
    return [
      { step: '01', title: 'Ist-Aufnahme', description: 'Vollständige Erfassung des bestehenden Prozesses inklusive Schnittstellen, Verantwortlichkeiten und bekannter Fehlerquellen.' },
      { step: '02', title: 'Zielarchitektur', description: 'Definition der Zielarchitektur mit Datenflüssen, Fehlerbehandlung und Überwachung — vor der Implementierung abgenommen.' },
      { step: '03', title: 'Implementierung', description: 'Umsetzung in abgegrenzten Phasen, jede mit eigenständig betreibbarem Ergebnis und dokumentierter Abnahme.' },
      { step: '04', title: 'Übergabe', description: 'Betriebshandbuch, Monitoring und Schulung, damit Ihr Team das Ergebnis eigenständig betreibt.' },
    ]
  }
  return [
    { step: '01', title: 'Audit', description: 'A structured diagnosis of where growth is actually constrained — not where it is easiest to sell you a solution.' },
    { step: '02', title: 'Architecture', description: 'The plan: which channels, in what sequence, against which numbers, with the dependencies made explicit.' },
    { step: '03', title: 'Execution', description: 'Delivery in defined cycles, with leading indicators reported throughout so nothing runs unmeasured.' },
    { step: '04', title: 'Compounding', description: 'Reinvesting what works, retiring what does not, and documenting both so the knowledge stays with you.' },
  ]
}

function serviceFaqs(country: CountryCode, title: string): Faq[] {
  const c = countries[country]
  if (country === 'de') {
    return [
      {
        question: `Was umfasst ${title} bei Ft. Social Crew?`,
        answer: `${title} umfasst die dokumentierte Aufnahme des Ist-Zustands, die Definition einer Zielarchitektur, die phasenweise Implementierung sowie eine vollständige Übergabe mit Betriebshandbuch und Schulung. Die Datenverarbeitung erfolgt DSGVO-konform ausschließlich innerhalb der EU.`,
      },
      {
        question: `Wie wird der Erfolg gemessen?`,
        answer: `Jede Kennzahl nennt Zeitraum, Ausgangswert und Messmethode. Vor Projektbeginn wird gemeinsam definiert, welche Kennzahlen den Projekterfolg abbilden — danach wird ausschließlich gegen diese berichtet.`,
      },
      {
        question: `Wie lange dauert die Umsetzung?`,
        answer: `Die Ist-Aufnahme dauert zwei bis vier Wochen. Die Implementierung erfolgt anschließend in Phasen von sechs bis zehn Wochen, wobei jede Phase ein eigenständig betreibbares Ergebnis liefert.`,
      },
    ]
  }
  return [
    {
      question: `What does ${title} include in ${c.name}?`,
      answer: localiseSpelling(
        `Our ${title} engagements begin with an audit of the current position, followed by an architecture stage where we agree the plan and the numbers it will be measured against. Execution runs in defined cycles with leading indicators reported throughout, and everything we learn is documented so the knowledge stays with you.`,
        country
      ),
    },
    {
      question: `How is ${title} measured?`,
      answer: localiseSpelling(
        `Against commercial outcomes agreed before work starts — not against activity metrics. Every figure we report states its timeframe, its baseline and its attribution method, because a number without those three cannot be verified.`,
        country
      ),
    },
    {
      question: `How long before we see results from ${title}?`,
      answer: localiseSpelling(
        `Paid and conversion work produces measurable data within weeks. Organic and authority-building work compounds over quarters, typically showing meaningful movement by month three. We report leading indicators throughout so you are never waiting without visibility.`,
        country
      ),
    },
    {
      question: `Can we engage ${title} on its own?`,
      answer: localiseSpelling(
        `Yes, though it is designed to work alongside the rest of the system. If a single service is genuinely what you need, we will scope it that way — and tell you plainly if we think it will underperform in isolation.`,
        country
      ),
    },
  ]
}

async function localServices(country: CountryCode): Promise<Service[]> {
  return serviceDefs.map((def) => {
    const title = resolveServiceTitle(def, country)
    const slug = resolveServiceSlug(def, country)
    const c = countries[country]

    return {
      id: `svc-${country}-${def.slug}`,
      countryId: country,
      slug,
      title,
      // SRS §9.2 GEO — the direct, quotable answer statement.
      //
      // German gets its own sentence rather than the English template with a
      // translated tail. The English one lowercases the description's first
      // letter to splice it after a colon, which is exactly wrong in German
      // where that word is a capitalised noun — and SRS §7.4 asks for German,
      // not translated English. `shortDescriptionDe` was previously read only
      // by the market home, so every German service page quoted English.
      answer:
        country === 'de'
          ? `${title} von Ft. Social Crew für den deutschen Markt: ${resolveServiceShortDescription(def, country)}`
          : localiseSpelling(
              `${title} from Ft. Social Crew in ${c.name} is delivered as ${c.positioning.toLowerCase()} work: ${def.shortDescription.charAt(0).toLowerCase()}${def.shortDescription.slice(1)}`,
              country
            ),
      summary: localiseSpelling(serviceFraming[country](title), country),
      icon: def.icon,
      outcomes: serviceOutcomes[country],
      deliverables: buildDeliverables(def.slug, country),
      process: serviceProcess(country),
      faqs: serviceFaqs(country, title),
      status: 'published',
      seo: {
        entityType: 'service',
        entityId: `svc-${country}-${def.slug}`,
        title: `${title} in ${c.name}`,
        description: localiseSpelling(serviceFraming[country](title), country).slice(0, 158),
        hreflangGroupId: `svc-${def.slug}`,
      },
    }
  })
}

function buildDeliverables(slug: string, country: CountryCode): string[] {
  const map: Record<string, string[]> = {
    'seo-services': [
      'Technical audit and remediation roadmap',
      'Keyword and intent mapping per market',
      'Topical cluster architecture — pillar, cluster, supporting',
      'On-page optimisation across priority templates',
      'Structured data and schema implementation',
      'Monthly index coverage and ranking reporting',
    ],
    'paid-advertising': [
      'Channel selection against contribution margin',
      'Account structure and campaign build',
      'Creative testing programme',
      'Audience and bid strategy management',
      'Blended CAC and payback reporting',
      'Budget reallocation recommendations',
    ],
    'social-media-management': [
      'Channel strategy and posting cadence',
      'Content repurposing from published authority content',
      'Community management and response handling',
      'Creative production calendar',
      'Engagement and referral-traffic reporting',
    ],
    'content-marketing': [
      'Topical cluster planning per service line',
      'Editorial calendar with assigned briefs',
      'Long-form pillar and cluster content',
      'Answer-block and FAQ structuring for AI visibility',
      'Internal linking and content-gap analysis',
    ],
    'web-design-development': [
      'Information architecture and wireframes',
      'Design system and component library',
      'Accessible, performance-budgeted build',
      'Core Web Vitals validation before launch',
      'Analytics and conversion tracking setup',
    ],
    'branding-creative': [
      'Positioning and messaging framework',
      'Visual identity system',
      'Brand guidelines and asset library',
      'Campaign creative concepts',
      'Sales and pitch collateral',
    ],
    'conversion-rate-optimisation': [
      'Conversion research — analytics, heatmaps, session review',
      'Hypothesis backlog prioritised by expected impact',
      'Experiment design and implementation',
      'Statistical analysis and rollout decisions',
      'Documented learning library',
    ],
    'process-automation': [
      'Current-state process documentation',
      'Target architecture with error handling',
      'Integration build and testing',
      'Monitoring and alerting setup',
      'Runbook, handover and team training',
    ],
    'growth-consulting': [
      'Growth diagnosis and constraint analysis',
      'Channel economics and budget modelling',
      'Quarterly roadmap with owners and milestones',
      'Team structure and hiring recommendations',
      'Executive reporting and board materials',
    ],
    'analytics-reporting': [
      'Measurement plan and event taxonomy',
      'Analytics and tag implementation',
      'Attribution model configuration',
      'Executive dashboard build',
      'Monthly commentary, not just numbers',
    ],

    // Sub-service tier. These lists are the previous site's own published
    // scope, carried across so a migrated page promises what it always
    // promised — not a freshly invented offer under an old name.
    'local-seo-services': [
      'Google Business Profile setup, optimisation and management',
      'Local citation audit, correction and new directory submissions',
      'Geo-targeted landing pages for every service area',
      'Review strategy to grow authentic ratings across platforms',
      'Local keyword research and on-page optimisation',
      'Google Maps three-pack ranking for high-intent local searches',
      'Monthly local ranking and visibility reporting',
    ],
    'aeo-geo-services': [
      'Audit of current brand visibility across AI platforms',
      'Content restructuring into question-and-answer formats',
      'Topical authority building through pillar-and-cluster content',
      'Schema markup implementation for AI-readable content',
      'Monthly reporting on AI visibility, brand mentions and answer appearances',
    ],
    'app-store-optimisation': [
      'Full App Store and Google Play listing audit',
      'Keyword research specific to in-store search behaviour',
      'App title, subtitle and description optimisation',
      'Screenshot and visual asset recommendations for higher conversion',
      'Competitor analysis and positioning strategy',
      'Rating and review management strategy',
    ],
    'lead-generation': [
      'Ideal Customer Profile mapping',
      'Channel selection and offer design',
      'Outreach and campaign execution',
      'LinkedIn, Facebook and Instagram lead generation',
      'Appointment setting and prospect research',
      'Qualification, handoff and CRM lead management',
    ],
    'personal-branding': [
      'Founder positioning — what you are known for, to whom, and why it matters',
      'Done-for-you presence management: calendar, writing, cadence, engagement',
      'LinkedIn profile optimisation and B2B content strategy',
      'Thought leadership drawn from your actual experience',
      'Authority building through guest contributions, podcasts and speaking',
      'Idea capture, drafting, approval and scheduled publishing',
    ],
    'google-ads': [
      'Full account audit or new campaign build',
      'Search, Display, Shopping and YouTube campaign management',
      'Keyword research and negative keyword strategy',
      'Ad copywriting and A/B testing',
      'Landing page review and conversion optimisation',
      'Conversion tracking setup and attribution reporting',
      'Retargeting campaigns to re-engage warm audiences',
      'Weekly optimisation and monthly performance reporting',
    ],
    'meta-ads': [
      'Full Meta Ads account audit or new account setup',
      'Ad creative design and copywriting across all formats',
      'Campaign structure for awareness, lead generation and conversion',
      'A/B testing framework for continuous creative improvement',
      'Meta Pixel setup and event tracking',
      'Catalogue and dynamic ad setup for e-commerce brands',
    ],
    'linkedin-ads': [
      'Professional targeting by job title, seniority, industry and company size',
      'Sponsored Content, Message Ads, Lead Gen Forms and Conversation Ads',
      'Ad copy and creative designed for a professional audience',
      'LinkedIn Insight Tag setup and conversion tracking',
      'Funnel strategy from awareness through to lead conversion',
      'Retargeting from website visitors and LinkedIn engagement',
      'Monthly reporting on reach, cost per lead and pipeline contribution',
    ],
    'ecommerce-ads': [
      'Google Shopping and Performance Max campaign management',
      'Meta catalogue and dynamic product ad campaigns',
      'Prospecting and retargeting across Google and Meta',
      'GA4 and Meta Pixel tracking setup and event configuration',
      'Creative strategy for product-focused ad formats',
      'Cart abandonment and re-engagement sequences',
      'ROAS-focused optimisation with product-level reporting',
    ],
    'wordpress-development': [
      'Custom design aligned to your brand identity',
      'Mobile-first, responsive build tested across devices',
      'SEO foundation set at the point of build',
      'Contact form, CRM, booking and payment gateway integration',
      'Plugin selection and configuration without unnecessary bloat',
      'Security hardening and ongoing maintenance options',
      'Client training and post-launch support',
    ],
    'shopify-development': [
      'Custom Shopify theme design and development',
      'Full store architecture — home, collections, products, cart, checkout',
      'Mobile-first, speed-optimised development',
      'Conversion-focused product pages with trust elements',
      'Shopify app selection and configuration',
      'Payment gateway and shipping integration',
      'Migration from WooCommerce, Wix, Magento or others',
    ],
    'ecommerce-development': [
      'Platform selection guidance — WooCommerce, Shopify or custom',
      'Store build and product catalogue setup',
      'Payment gateway and shipping integration',
      'E-commerce SEO across product and category pages',
      'Ongoing support and feature additions',
    ],
    'ui-ux-design': [
      'User research, persona development and journey mapping',
      'Information architecture and sitemap planning',
      'Wireframing and low-fidelity prototypes',
      'High-fidelity UI design across desktop, tablet and mobile',
      'Interactive prototypes for user testing',
      'Design system and component library documentation',
      'Handoff-ready files for development teams',
      'Post-design consultation and implementation support',
    ],
    'software-development': [
      'Requirements gathering and system architecture',
      'Custom application development',
      'Third-party API and tool integrations',
      'QA and testing before launch',
      'Ongoing support and feature development',
    ],
    'hrm-crm-systems': [
      'System designed around your specific policies and workflows',
      'Employee onboarding and digital document management',
      'Attendance, shift and leave management with automated tracking',
      'Payroll processing and payslip generation',
      'Performance management, goal tracking and appraisal workflows',
      'Role-based access for HR, managers and employees',
      'Integration with existing payroll, accounting and communication tools',
      'Secure, scalable architecture with cloud hosting options',
    ],
    'ai-automation': [
      'Process audit to find genuinely automatable tasks',
      'AI chatbot and lead qualification setup',
      'Workflow automation across your existing tools',
      'CRM and AI system integration',
      'Ongoing monitoring and optimisation',
    ],
  }
  const base = map[slug] ?? map['seo-services']
  return base.map((d) => localiseSpelling(d, country))
}

export async function getServiceBySlug(
  country: CountryCode,
  slug: string
): Promise<Service | undefined> {
  const all = await getServices(country)
  return all.find((s) => s.slug === slug)
}

// ─────────────────────────────────────────────────────────────────
// INDUSTRIES — SRS §24 supplies a complete brief per vertical
// ─────────────────────────────────────────────────────────────────

async function localIndustries(country: CountryCode): Promise<Industry[]> {
  const c = countries[country]

  return industryDefs.map((def) => ({
    id: `ind-${country}-${def.slug}`,
    countryId: country,
    slug: def.slug,
    name: resolveIndustryName(def, country),
    answer: localiseSpelling(
      `Ft. Social Crew works with ${def.name.toLowerCase()} organisations in ${c.name} as ${c.positioning.toLowerCase()} — addressing ${def.painPoints[0].toLowerCase()} through ${def.servicesRequired.slice(0, 2).join(' and ').toLowerCase()}.`,
      country
    ),
    buyerPersona: localiseSpelling(def.buyerPersona, country),
    painPoints: def.painPoints.map((p) => localiseSpelling(p, country)),
    servicesRequired: def.servicesRequired.map((s) => localiseSpelling(s, country)),
    seoStrategy: localiseSpelling(def.seoStrategy, country),
    contentIdeas: def.contentIdeas.map((i) => localiseSpelling(i, country)),
    leadMagnet: localiseSpelling(def.leadMagnet, country),
    caseStudyIdea: localiseSpelling(def.caseStudyIdea, country),
    image: industryImages[def.slug] ?? editorial.strategy,
    status: 'published',
  }))
}

export async function getIndustryBySlug(
  country: CountryCode,
  slug: string
): Promise<Industry | undefined> {
  const all = await getIndustries(country)
  return all.find((i) => i.slug === slug)
}

// ─────────────────────────────────────────────────────────────────
// CITIES — SRS §11.3 quality gate applies here
// ─────────────────────────────────────────────────────────────────

async function localCityList(country: CountryCode): Promise<City[]> {
  const c = countries[country]

  return getCities(country).map((def) => ({
    id: `city-${country}-${def.slug}`,
    countryId: country,
    slug: def.slug,
    name: def.name,
    region: def.region,
    answer:
      country === 'de'
        ? `Ft. Social Crew betreut Unternehmen in ${def.name} als ${c.positioning} — mit dokumentierter Vorgehensweise und DSGVO-konformer Verarbeitung.`
        : localiseSpelling(
            `Ft. Social Crew works with businesses in ${def.name}, ${def.region} as ${c.positioning.toLowerCase()}. ${def.localProofPoint}.`,
            country
          ),
    localProofPoint: def.localProofPoint,
    uniqueIntro:
      country === 'de'
        ? `${def.name} unterscheidet sich in Wettbewerbsintensität und Suchverhalten deutlich von anderen deutschen Standorten. ${def.localProofPoint}. Entsprechend planen wir Kampagnen und Inhalte standortspezifisch statt bundesweit einheitlich.`
        : localiseSpelling(
            `${def.name} behaves differently from the rest of ${c.name} in both competitive intensity and search behaviour. ${def.localProofPoint}. We plan campaigns and content for this market specifically rather than applying a single national strategy.`,
            country
          ),
    testimonialId: '',
    image: c.cityImage,
  }))
}

export async function getCityBySlug(
  country: CountryCode,
  slug: string
): Promise<City | undefined> {
  const all = await getCityList(country)
  return all.find((c) => c.slug === slug)
}

// ─────────────────────────────────────────────────────────────────
// CASE STUDIES — SRS §23 prioritises different verticals per market
// ─────────────────────────────────────────────────────────────────

const caseStudyPriority: Record<CountryCode, string[]> = {
  'in': ['ecommerce', 'real-estate', 'education', 'healthcare'],
  'en-us': ['saas', 'ecommerce', 'professional-services', 'it-companies'],
  'en-ca': ['manufacturing', 'professional-services', 'ecommerce', 'finance'],
  'en-au': ['ecommerce', 'hospitality', 'professional-services', 'construction'],
  'de': ['manufacturing', 'it-companies', 'ecommerce', 'finance'],
  'en-ae': ['real-estate', 'hospitality', 'professional-services', 'finance'],
}

async function localCaseStudies(country: CountryCode): Promise<CaseStudy[]> {
  const c = countries[country]
  const verticals = caseStudyPriority[country]

  return verticals.map((vertical, i) => {
    const ind = getIndustryDefinition(vertical)!
    const isDe = country === 'de'

    return {
      id: `cs-${country}-${vertical}`,
      countryId: country,
      slug: `${vertical}-growth-programme`,
      title: isDe
        ? `${ind.name}: dokumentierte Prozessautomatisierung im Mittelstand`
        : localiseSpelling(
            `${ind.name}: ${ind.caseStudyIdea.replace(/ story$/, '')}`,
            country
          ),
      client: isDe
        ? `Vertraulich — ${resolveIndustryName(ind, country)}`
        : `Confidential — ${ind.name}`,
      isPlaceholder: true,
      industry: vertical,
      service: ind.primaryServices[0],
      challenge: isDe
        ? `${ind.painPoints[0]}. Hinzu kam eine unvollständig dokumentierte Prozesslandschaft, die eine belastbare Ursachenanalyse zunächst verhinderte.`
        : localiseSpelling(
            `${ind.painPoints[0]}. Compounding the problem, attribution was unreliable enough that the team could not agree on which channel was actually responsible.`,
            country
          ),
      approach: isDe
        ? [
            'Vollständige Aufnahme des Ist-Prozesses inklusive aller Schnittstellen',
            'Definition der Zielarchitektur mit Fehlerbehandlung und Monitoring',
            'Phasenweise Implementierung mit eigenständig betreibbaren Ergebnissen',
            'Übergabe mit Betriebshandbuch und Schulung des internen Teams',
          ]
        : [
            localiseSpelling(`Diagnosis across ${ind.servicesRequired.slice(0, 2).join(' and ').toLowerCase()} to establish the actual constraint`, country),
            localiseSpelling(ind.seoStrategy, country),
            localiseSpelling('Conversion research on the pages already carrying qualified traffic', country),
            localiseSpelling('Measurement rebuilt so every subsequent decision had a defensible baseline', country),
          ],
      results: [
        { metric: `+${118 + i * 27}%`, label: isDe ? 'Organische Sichtbarkeit' : 'Organic visibility', detail: isDe ? '12 Monate, gegenüber Ausgangswert' : '12 months vs. baseline' },
        { metric: `−${31 + i * 5}%`, label: isDe ? 'Kosten pro Lead' : 'Cost per lead', detail: isDe ? 'Geblendet über alle Kanäle' : 'Blended across all channels' },
        { metric: `${2 + i}.${4 + i}×`, label: isDe ? 'Qualifizierte Anfragen' : 'Qualified enquiries', detail: isDe ? 'Gegenüber Vorjahreszeitraum' : 'Vs. same period prior year' },
      ],
      quote: {
        text: isDe
          ? 'Die dokumentierte Vorgehensweise war der entscheidende Unterschied zu vorherigen Anbietern.'
          : localiseSpelling('The difference was that every recommendation arrived with the reasoning attached.', country),
        author: isDe ? 'Geschäftsführung' : 'Client leadership',
        role: ind.buyerPersona.split(',')[0],
      },
      image: caseStudyImages[i % caseStudyImages.length],
      publishedAt: `2026-0${(i % 9) + 1}-15`,
    }
  })
}

export async function getCaseStudyBySlug(
  country: CountryCode,
  slug: string
): Promise<CaseStudy | undefined> {
  const all = await getCaseStudies(country)
  return all.find((cs) => cs.slug === slug)
}

// ─────────────────────────────────────────────────────────────────
// BLOG — SRS §11.2 cluster model, §12 cadence
// ─────────────────────────────────────────────────────────────────

interface BlogSeed {
  slug: string
  title: string
  titleDe?: string
  excerpt: string
  excerptDe?: string
  answer: string
  answerDe?: string
  category: string
  cluster: string
  authorId: string
  /**
   * Markets this post is published in. Absent means every market.
   *
   * Needed once real posts arrived from the previous site: a checklist naming
   * Delhi NCR, JustDial and Razorpay is genuinely useful in India and simply
   * wrong on the German or US site. The seeds that carry local specifics are
   * scoped to the markets where those specifics hold, rather than being
   * flattened into something true everywhere and useful nowhere.
   */
  markets?: CountryCode[]
  /**
   * The post's own body, migrated verbatim.
   *
   * Seeds without this fall back to buildBlogBody()'s shared template, which
   * is how the original six were written. A migrated post has real prose and
   * must not be replaced by boilerplate that happens to share its headline.
   */
  sections?: { heading: string; text: string }[]
  /** Migrated posts keep their original publish date. */
  publishedAt?: string
}

const blogSeeds: BlogSeed[] = [
  {
    slug: 'how-much-does-seo-cost',
    title: 'How much does SEO cost — and what actually drives the number?',
    titleDe: 'Was kostet SEO — und wovon hängt der Preis tatsächlich ab?',
    excerpt: 'A breakdown of what sits behind an SEO retainer, why quotes vary so widely, and how to tell a scoped proposal from a guess.',
    excerptDe: 'Eine Aufschlüsselung dessen, was hinter einem SEO-Retainer steht, warum Angebote so stark variieren und woran ein seriös kalkuliertes Angebot erkennbar ist.',
    answer: 'SEO cost is driven by four variables: the technical debt in the existing site, the number of markets and cities targeted, content volume required to reach topical authority, and the competitive intensity of the target keywords. A credible proposal shows its assumptions on all four.',
    answerDe: 'Die Kosten für SEO werden von vier Faktoren bestimmt: technische Altlasten der bestehenden Website, Anzahl der Zielmärkte und Städte, erforderliches Inhaltsvolumen für thematische Autorität sowie Wettbewerbsintensität der Zielbegriffe.',
    category: 'SEO',
    cluster: 'seo-services',
    authorId: 'a-2',
  },
  {
    slug: 'agency-vs-fractional-team',
    title: 'Agency, freelancer or fractional team — which staffing model fits',
    titleDe: 'Agentur, Freelancer oder Fractional Team — welches Modell passt',
    excerpt: 'The three models solve different problems. Choosing the wrong one is the most common and most expensive growth-staffing mistake.',
    excerptDe: 'Die drei Modelle lösen unterschiedliche Probleme. Die falsche Wahl ist der häufigste und teuerste Fehler bei der Besetzung von Wachstumsfunktionen.',
    answer: 'An agency suits defined, repeatable execution. A freelancer suits a single specialist gap. A fractional team suits companies that need strategy, execution and analytics simultaneously but cannot justify three full-time hires — which is most companies between $2M and $50M in revenue.',
    answerDe: 'Eine Agentur eignet sich für definierte, wiederholbare Ausführung. Ein Freelancer schließt eine einzelne Fachlücke. Ein Fractional Team passt, wenn Strategie, Umsetzung und Analytik gleichzeitig benötigt werden.',
    category: 'Growth',
    cluster: 'growth-consulting',
    authorId: 'a-1',
  },
  {
    slug: 'why-last-click-roas-misleads',
    title: 'Why last-click ROAS makes every channel look profitable',
    titleDe: 'Warum Last-Click-ROAS jeden Kanal profitabel erscheinen lässt',
    excerpt: 'Channel-level return figures routinely sum to more revenue than the business actually made. Here is the arithmetic behind that.',
    excerptDe: 'Kanalbezogene Renditekennzahlen summieren sich regelmäßig zu mehr Umsatz, als das Unternehmen tatsächlich erzielt hat. Hier die zugrunde liegende Rechnung.',
    answer: 'Last-click ROAS assigns full credit for a conversion to the final touchpoint, so paid search claims demand that organic and paid social created. Blended CAC — total acquisition spend divided by total new customers — is the only acquisition figure that cannot be inflated by attribution choices.',
    answerDe: 'Last-Click-ROAS weist den vollständigen Konversionswert dem letzten Kontaktpunkt zu. Geblendete Akquisekosten sind die einzige Kennzahl, die durch Attributionsentscheidungen nicht verzerrt werden kann.',
    category: 'Analytics',
    cluster: 'analytics-reporting',
    authorId: 'a-4',
  },
  {
    slug: 'programmatic-seo-quality-gate',
    title: 'Programmatic SEO at scale without the thin-content penalty',
    titleDe: 'Programmatische SEO im großen Maßstab ohne Thin-Content-Risiko',
    excerpt: 'Generating thousands of pages from structured data is straightforward. Keeping them worth indexing is the actual discipline.',
    excerptDe: 'Tausende Seiten aus strukturierten Daten zu erzeugen ist einfach. Sie indexierungswürdig zu halten ist die eigentliche Disziplin.',
    answer: 'A programmatic page should only be indexable once it carries a unique local or industry proof point, a unique introduction, at least one relevant testimonial or case study reference, and correct localised schema. Pages below that bar stay noindexed until enriched, which protects both crawl budget and site-wide quality signals.',
    answerDe: 'Eine programmatisch erzeugte Seite sollte erst indexiert werden, wenn sie einen einzigartigen lokalen Beleg, eine eigene Einleitung, mindestens eine relevante Referenz und korrektes lokalisiertes Schema enthält.',
    category: 'SEO',
    cluster: 'seo-services',
    authorId: 'a-2',
  },
  {
    slug: 'answer-engine-optimisation-guide',
    title: 'Answer engine optimisation: structuring content so AI can cite it',
    titleDe: 'Answer Engine Optimisation: Inhalte so strukturieren, dass KI sie zitieren kann',
    excerpt: 'AI Overviews, ChatGPT and Perplexity extract differently from how search engines rank. The structural changes are small and specific.',
    excerptDe: 'KI-Übersichten extrahieren anders, als Suchmaschinen ranken. Die erforderlichen strukturellen Änderungen sind klein und konkret.',
    answer: 'Answer engines extract self-contained statements. The highest-leverage change is placing one direct, quotable answer to the page\'s core question within the first 200 words, followed by explicit question-and-answer pairs marked up with FAQPage schema.',
    answerDe: 'Answer Engines extrahieren in sich geschlossene Aussagen. Die wirksamste Maßnahme ist eine direkte, zitierfähige Antwort innerhalb der ersten 200 Wörter.',
    category: 'AI Search',
    cluster: 'content-marketing',
    authorId: 'a-2',
  },
  {
    slug: 'conversion-research-before-testing',
    title: 'Most A/B tests fail because the research stage was skipped',
    titleDe: 'Die meisten A/B-Tests scheitern, weil die Analysephase übersprungen wurde',
    excerpt: 'Testing without a hypothesis derived from evidence is guessing with extra steps and a statistics bill.',
    excerptDe: 'Testen ohne evidenzbasierte Hypothese ist Raten mit zusätzlichen Schritten.',
    answer: 'A conversion test is only as good as the hypothesis behind it. Research — analytics review, session recordings, heatmaps, user interviews and form analytics — should precede any experiment, because the constraint is usually not the element teams instinctively want to test.',
    answerDe: 'Ein Conversion-Test ist nur so gut wie die zugrunde liegende Hypothese. Die Analysephase sollte jedem Experiment vorausgehen.',
    category: 'CRO',
    cluster: 'conversion-rate-optimisation',
    authorId: 'a-5',
  },

  // ── Migrated from the previous site ───────────────────────────────────────
  // Bodies are the original posts, carried across rather than regenerated.
  //
  // Twelve further posts were left behind deliberately: they are the WordPress
  // theme's demo content, still carrying "standard dummy text ever since the
  // 1500s, when an unknown printer took a galley of type". Publishing lorem
  // ipsum under real headlines is worse than not publishing it.
  //
  // None are scoped to `de`. They are English, and SRS §7.4 asks the German
  // market to read German rather than translated English — an English post
  // under German chrome reads as an unfinished site. They join /de/ when
  // translated, not before.

  {
    slug: 'local-seo-checklist-delhi-ncr',
    title: 'Local SEO checklist for Delhi NCR businesses',
    excerpt:
      'If your customers search "near me" before they search your brand name, local SEO decides whether they find you or your competitor.',
    answer:
      'A local SEO checklist runs through six things in order: claim and fully complete the Google Business Profile, keep NAP identical everywhere, build accurate citations, generate reviews systematically, publish a page per service area, and add local business schema. Most businesses that follow it consistently see map pack movement within 60 to 90 days.',
    category: 'Local SEO',
    cluster: 'local-seo-services',
    authorId: 'a-1',
    markets: ['in'],
    publishedAt: '2026-07-06',
    sections: [
      {
        heading: 'Claim and fully complete your Google Business Profile',
        text: 'An unclaimed or half-filled profile is the single biggest local SEO gap we see. Add your exact business name, address, and phone number, choose accurate categories, list every service you offer, and upload real photos of your location and team.',
      },
      {
        heading: 'Keep NAP consistent everywhere',
        text: "Your Name, Address, and Phone number should be identical — down to the abbreviation style — across your website, Google Business Profile, and every directory listing. Inconsistency confuses Google's local ranking algorithm and erodes trust signals.",
      },
      {
        heading: 'Build local citations',
        text: 'Submit your business to Google Maps, JustDial, Sulekha, IndiaMART, and Bing Places. Volume matters less than consistency — ten accurate citations beat fifty conflicting ones.',
      },
      {
        heading: 'Generate reviews systematically',
        text: "Don't wait for reviews to happen. Send a direct Google review link by WhatsApp or email right after a project wraps up, when satisfaction is highest.",
      },
      {
        heading: 'Build location-specific landing pages',
        text: 'If you serve Gurgaon, Noida, and Faridabad, each deserves its own page with locally relevant content, not one generic "areas we serve" paragraph.',
      },
      {
        heading: 'Add local business schema',
        text: 'Structured data on your website that mirrors your Google Business Profile helps Google connect the two and strengthens your local ranking signals.',
      },
    ],
  },
  {
    slug: 'brand-identity-basics-service-businesses',
    title: 'Brand identity basics for service businesses',
    excerpt:
      'Service businesses often invest in a logo and call it branding, then wonder why their marketing still feels inconsistent.',
    answer:
      'A real brand identity covers more ground than a logo alone: positioning that answers who you serve and why you specifically, a visual system that holds across every channel, and a consistent tone of voice. Inconsistent branding makes every other marketing channel work harder.',
    category: 'Branding',
    cluster: 'branding-creative',
    authorId: 'a-4',
    publishedAt: '2026-07-06',
    sections: [
      {
        heading: 'Positioning comes first',
        text: 'Before any visual design work, you need a clear answer to who you serve, what makes you different from competitors, and why a prospect should choose you specifically. Without this, every other branding decision is a guess.',
      },
      {
        heading: 'Visual identity beyond the logo',
        text: 'Colour palette, typography, and imagery style all need to work consistently across your website, ads, and social presence — not just live inside a logo file that only shows up on your business card.',
      },
      {
        heading: 'Tone of voice',
        text: 'How you write — formal or casual, technical or plain-spoken — is part of your brand identity too, and it should stay consistent whether a prospect reads your website, an ad, or a WhatsApp reply.',
      },
      {
        heading: 'Why this affects everything else',
        text: 'Inconsistent branding makes every other marketing channel work harder. Clear positioning and consistent identity lower the cost of building trust across SEO, ads, and social all at once.',
      },
    ],
  },
  {
    slug: 'how-ai-overviews-changing-google-search',
    title: 'How AI Overviews are changing Google search results',
    excerpt:
      "Google's AI Overviews now answer many searches directly at the top of the results page, before a single blue link appears.",
    answer:
      'AI Overviews pull from multiple sources, so being cited matters as much as ranking first — a page at position four or five that gets included may drive more value than a top result users skip. Pages that answer the implied question in the first 40 to 60 words are easier to extract and cite.',
    category: 'AI Search',
    cluster: 'aeo-geo-services',
    authorId: 'a-1',
    publishedAt: '2026-07-06',
    sections: [
      {
        heading: 'Being cited matters as much as ranking first',
        text: 'AI Overviews pull answers from multiple sources, so being cited matters as much as ranking first. A page at position four or five that gets included in the overview may now drive more value than the top organic result that users skip past.',
      },
      {
        heading: 'Direct-answer content gets cited more',
        text: 'Pages that answer the implied question clearly in the first 40 to 60 words, before expanding into detail, are easier for AI systems to extract and cite than pages that build up to the answer slowly.',
      },
      {
        heading: 'Structured data still matters',
        text: "FAQ schema, clear headings, and well-organised lists help both traditional crawlers and AI systems parse your content's structure accurately.",
      },
      {
        heading: 'What this means practically',
        text: "Write the direct answer first, support it with detailed evidence afterwards, and keep the heading structure clean. It's a small shift in how you write, not a reason to abandon SEO fundamentals.",
      },
    ],
  },
  {
    slug: 'negative-keywords-most-ignored-setting',
    title: 'Negative keywords: the most ignored Google Ads setting',
    excerpt:
      'Most Google Ads accounts we audit have never touched their negative keyword list.',
    answer:
      'Negative keywords stop ads showing for searches containing specific terms even when the target keyword technically matches. Reviewing the search term report weekly for the first month of a new campaign usually reveals ten to twenty worth adding immediately.',
    category: 'Paid Ads',
    cluster: 'google-ads',
    authorId: 'a-2',
    publishedAt: '2026-07-06',
    sections: [
      {
        heading: 'What negative keywords actually do',
        text: 'They stop your ads from showing for searches that include specific terms, even if your target keyword technically matches. Without them, broad match keywords can trigger your ad for searches with completely different intent.',
      },
      {
        heading: 'Common wasted-spend triggers',
        text: 'Searches containing "free", "jobs", "salary", "course", or "how to do it myself" frequently trigger ads for commercial keywords, generating clicks from people who were never going to become customers.',
      },
      {
        heading: 'Build the list from search term reports',
        text: 'Your Google Ads search term report shows exactly what people typed before your ad showed. Reviewing this weekly for the first month of any new campaign usually reveals ten to twenty negative keywords worth adding immediately.',
      },
      {
        heading: 'Revisit it regularly',
        text: "Negative keyword lists aren't a one-time setup. New irrelevant search terms appear as your campaigns scale, so this is an ongoing maintenance task, not a launch checklist item.",
      },
    ],
  },
  {
    slug: 'google-ads-budget-planning-first-time',
    title: 'Google Ads budget planning for first-time advertisers',
    excerpt:
      'The most common question we get from first-time Google Ads advertisers isn’t "will this work" — it’s "how much should I actually spend."',
    answer:
      'Budget from your own industry’s cost per click rather than a round number, treat the first two to four weeks as a data-gathering phase, and keep Search, Shopping and Performance Max budgets separate so you can tell which is working. Without conversion tracking you are optimising toward clicks, not leads.',
    category: 'Paid Ads',
    cluster: 'google-ads',
    authorId: 'a-2',
    markets: ['in'],
    publishedAt: '2026-07-06',
    sections: [
      {
        heading: "Start with your industry's cost per click",
        text: 'Cost per click varies enormously by industry — a few rupees for some local services, much higher for competitive B2B or legal keywords. Research your specific category before setting a number, rather than picking a round figure that sounds reasonable.',
      },
      {
        heading: 'Budget for learning, not just clicks',
        text: "Your first two to four weeks of spend should be treated as a data-gathering phase. Google's algorithm needs conversion data before it can optimise delivery, and you'll likely adjust keywords and targeting once you see what's actually converting.",
      },
      {
        heading: 'Separate Search, Shopping and Performance Max budgets',
        text: "Each campaign type behaves differently. Mixing budgets across all three from day one makes it hard to tell which is actually driving results. Start with Search if you're targeting specific buyer intent, and add other campaign types once you have a baseline.",
      },
      {
        heading: "Don't skip conversion tracking",
        text: "Without proper conversion tracking, you're optimising toward clicks, not leads — a guaranteed way to spend more per actual customer than necessary.",
      },
      {
        heading: 'A reasonable starting range',
        text: "For most Delhi NCR small and mid-sized businesses, a modest starting monthly budget is enough to gather meaningful data within the first month, before scaling based on what's working.",
      },
    ],
  },
  {
    slug: 'meta-ads-creative-testing-small-budgets',
    title: 'A Meta Ads creative testing framework for small budgets',
    excerpt:
      "Large brands can test dozens of ad creatives at once. Most small businesses can't, and don't need to.",
    answer:
      'Test one variable at a time, start with three to four variations rather than fifteen, give each test three to five days before calling a winner, and pause the losers. Testing only saves budget if underperforming ads are actually switched off.',
    category: 'Paid Ads',
    cluster: 'meta-ads',
    authorId: 'a-2',
    publishedAt: '2026-07-06',
    sections: [
      {
        heading: 'Test one variable at a time',
        text: "Change either the image, the headline, or the offer between variations — not all three at once. Otherwise you won't know which change actually drove the difference in performance.",
      },
      {
        heading: 'Start with three to four variations, not fifteen',
        text: 'On a limited budget, spreading spend across too many variations means none of them gather enough data to draw a real conclusion. Three to four focused variations reach statistical relevance faster.',
      },
      {
        heading: 'Let each test run long enough',
        text: 'Judging results after a few hours or a single day almost always leads to the wrong conclusion. Give each test at least three to five days before deciding a winner.',
      },
      {
        heading: "Kill losers, don't just add winners",
        text: 'Testing only works as a budget-saving tool if you actually pause underperforming ads once a winner is clear, rather than letting everything run indefinitely.',
      },
    ],
  },
  {
    slug: 'facebook-vs-instagram-ads-where-to-start',
    title: 'Facebook Ads vs Instagram Ads: where to spend first',
    excerpt:
      "Meta lets you run both from one campaign, so this isn't really an either-or decision anymore.",
    answer:
      'Instagram performs better for visually driven products and younger audiences; Facebook holds broader reach and older demographics, particularly for local services and B2B. Launch across both with automatic placements, then shift budget toward whichever returns a lower cost per result after one to two weeks.',
    category: 'Paid Ads',
    cluster: 'meta-ads',
    authorId: 'a-6',
    publishedAt: '2026-07-06',
    sections: [
      {
        heading: 'Instagram favours visual, younger audiences',
        text: 'Instagram tends to perform better for visually driven products — fashion, food, design, lifestyle — and skews toward a younger demographic that engages heavily with Reels and Stories.',
      },
      {
        heading: 'Facebook still wins for broader reach and older demographics',
        text: "Facebook's user base skews older and remains strong for local services, B2B, and community-driven marketing, particularly through Groups and longer-form posts.",
      },
      {
        heading: 'Let the data decide the budget split',
        text: 'Rather than committing upfront to a single platform, launch across both through automatic placements. After one to two weeks of performance data, shift budget toward whichever platform shows a lower cost per result.',
      },
      {
        heading: 'Creative needs to match the platform',
        text: 'A polished, static image ad can underperform on Instagram Reels placements, where native-feeling video does better. Build creative variations for each format rather than reusing one asset everywhere.',
      },
    ],
  },
  {
    slug: 'organic-vs-paid-social-what-each-is-for',
    title: 'Organic vs paid social: what each one is actually for',
    excerpt:
      'A common mistake we see is businesses expecting organic posts to drive sales directly, or expecting paid ads alone to build brand loyalty.',
    answer:
      'Organic social builds familiarity and credibility over time and makes paid ads perform better; paid social puts a specific message in front of a specific audience on a timeline you control. Measure organic on engagement and reach, paid on cost per lead — judging both by the same metric usually leads to cutting the wrong one.',
    category: 'Social',
    cluster: 'social-media-management',
    authorId: 'a-6',
    publishedAt: '2026-07-06',
    sections: [
      {
        heading: 'Organic social builds trust over time',
        text: 'Consistent, useful organic content builds familiarity and credibility. It rarely drives immediate conversions on its own, but it makes your paid ads perform better because prospects already recognise your brand when the ad appears.',
      },
      {
        heading: 'Paid social drives reach and action',
        text: "Paid social gets a specific message in front of a specific audience at scale, on a timeline you control. It's the right tool when you need leads or sales by a certain date, not just awareness.",
      },
      {
        heading: 'The two work best together',
        text: 'Your best-performing organic posts are usually strong candidates for paid amplification — you already know the content resonates before spending budget behind it.',
      },
      {
        heading: 'Set separate goals for each',
        text: 'Measure organic social on engagement, reach, and follower quality. Measure paid social on cost per lead or cost per sale. Judging both by the same metric usually leads to cutting the wrong one.',
      },
    ],
  },
  {
    slug: 'website-redesign-checklist-before-rebuild',
    title: 'Website redesign checklist before you rebuild',
    excerpt:
      "A redesign is the easiest way to accidentally destroy years of SEO progress if it's done without a plan.",
    answer:
      'Before a redesign: audit the pages already ranking, map every URL and plan 301 redirects, avoid rebranding at the same time, set a performance budget before design starts, and verify redirects on a staged site before the old one comes down.',
    category: 'Web',
    cluster: 'web-design-development',
    authorId: 'a-3',
    publishedAt: '2026-07-06',
    sections: [
      {
        heading: "Audit what's already working",
        text: 'Pull your top-performing pages by organic traffic before touching anything. Whatever is currently ranking needs a clear migration path in the new design, not just "we’ll recreate it later."',
      },
      {
        heading: 'Map every URL',
        text: 'Document your current URL structure and plan 301 redirects for anything that changes. A redesign that quietly 404s a dozen ranking pages is one of the most common causes of a traffic crash after launch.',
      },
      {
        heading: "Don't redesign and rebrand at the same time",
        text: 'Changing your domain, messaging, and visual identity all in one project makes it impossible to know which change caused which result if something goes wrong. Separate these where you can.',
      },
      {
        heading: 'Set a performance budget',
        text: 'Decide your target page weight and load time before design starts, not after developers hand you a beautiful but bloated homepage that fails Core Web Vitals.',
      },
      {
        heading: 'Test before you launch',
        text: 'Stage the new site, run it through a technical SEO checklist, and verify redirects work before the old site comes down — not after.',
      },
    ],
  },
  {
    slug: 'when-business-needs-custom-software',
    title: 'When a small business actually needs custom software',
    excerpt:
      "Custom software isn't the right answer for every business, and we say that as a company that builds it.",
    answer:
      'The signals are re-entering the same data in several places, paying for feature bundles to get one or two you use, and building workarounds so an off-the-shelf tool fits your process. If your process is standard and a mainstream tool fits it, custom software adds cost for little benefit.',
    category: 'Software',
    cluster: 'software-development',
    authorId: 'a-3',
    publishedAt: '2026-07-06',
    sections: [
      {
        heading: "You're maintaining the same data in multiple places",
        text: 'If your team re-enters the same customer or order information across a spreadsheet, an accounting tool, and a CRM, that duplicated effort is a strong signal that a connected system would save real hours every week.',
      },
      {
        heading: "You're paying for features you don't use",
        text: 'Generic SaaS pricing tiers often force you to pay for a bundle of features to get the one or two you actually need. At a certain scale, a custom-built tool with exactly what you use can cost less over time.',
      },
      {
        heading: "Your process doesn't fit the software",
        text: 'If your team has built workarounds — extra spreadsheets, manual approval chains, copy-pasted reports — to make an off-the-shelf tool fit your actual workflow, that workaround is where custom software usually pays off fastest.',
      },
      {
        heading: 'When off-the-shelf is still the right call',
        text: "If your process is standard and a mainstream tool already fits it well, custom software adds cost and maintenance for little benefit. Not every business has outgrown its spreadsheets yet, and that's fine.",
      },
    ],
  },
  {
    slug: 'ai-automation-business-processes-2026',
    title: 'Five business processes you can automate with AI this year',
    excerpt: 'Most businesses overcomplicate their first AI automation project.',
    answer:
      'The highest-return starting points are the repetitive, rule-based tasks a team already does daily: lead qualification, appointment scheduling, support triage, routine reporting and follow-up sequences. Pick the single task consuming the most hours per week, automate that one well, and expand from there.',
    category: 'Automation',
    cluster: 'ai-automation',
    authorId: 'a-3',
    publishedAt: '2026-07-06',
    sections: [
      {
        heading: 'Lead qualification',
        text: 'An AI chatbot or form-logic system can ask qualifying questions the moment a lead comes in, scoring and routing them before a human ever gets involved — cutting response time from hours to seconds.',
      },
      {
        heading: 'Appointment scheduling',
        text: 'Back-and-forth scheduling emails are a classic time sink. AI scheduling assistants can handle availability, confirmations, and reminders without manual intervention.',
      },
      {
        heading: 'Customer support triage',
        text: 'AI can handle the first response to common questions — order status, business hours, pricing basics — and escalate only the queries that actually need a human.',
      },
      {
        heading: 'Routine reporting',
        text: 'Pulling numbers from ad platforms, analytics, and CRMs into a weekly report is repetitive and time-consuming. AI automation can assemble and even summarise these reports automatically.',
      },
      {
        heading: 'Follow-up sequences',
        text: "Leads that don't convert immediately often just get forgotten. AI-driven follow-up sequences keep them warm without your team manually tracking every contact.",
      },
      {
        heading: 'Where to start',
        text: 'Pick the single task that consumes the most hours per week across your team, automate that one process well, and expand from there — rather than trying to automate everything at once.',
      },
    ],
  },
  {
    slug: 'how-to-vet-digital-marketing-agency',
    title: 'How to vet a digital marketing agency before you sign',
    excerpt:
      "Digital marketing is one of the easiest services to oversell and underdeliver, mostly because clients often don't know what questions to ask before signing.",
    answer:
      'Ask what they report on, who does the day-to-day work, how flexible the contract is, for a specific example from a similar client, and what happens if the first few months underperform. No ethical agency guarantees rankings, but a good one has a plan for underperformance.',
    category: 'Growth',
    cluster: 'growth-consulting',
    authorId: 'a-4',
    publishedAt: '2026-07-06',
    sections: [
      {
        heading: 'Ask what they actually report on',
        text: 'Reporting should cover leads, cost per lead, and pipeline value — not just traffic and position tracking. Surface metrics are the easiest thing to make look good while the numbers that matter stay flat.',
      },
      {
        heading: 'Ask who actually does the work',
        text: 'Some agencies sell a senior strategist in the pitch meeting and hand execution to a junior team or subcontractor. Ask who manages your account day to day, by name.',
      },
      {
        heading: 'Ask about contract flexibility',
        text: 'Long lock-in contracts with no early exit option are a red flag, especially from an agency confident in its own results.',
      },
      {
        heading: 'Ask for real examples, not just testimonials',
        text: 'Request a specific example of a client in a similar industry and what actually changed in their numbers. A testimonial says someone was happy; a number says something worked.',
      },
      {
        heading: "Ask what happens if results don't show up",
        text: 'No ethical agency can guarantee rankings, but a good one should have a clear plan for what happens if the first few months underperform.',
      },
    ],
  },
  {
    slug: 'google-reviews-strategy-local-business',
    title: 'A Google reviews strategy for local service businesses',
    excerpt:
      'Reviews influence both your local search ranking and whether a prospect actually calls you once they find your listing.',
    answer:
      'Ask right after a positive interaction rather than weeks later, send a one-click review link, respond to every review including the negative ones, and keep a steady stream going. Consistency over time reads as more authentic than a single burst followed by silence.',
    category: 'Local SEO',
    cluster: 'local-seo-services',
    authorId: 'a-1',
    publishedAt: '2026-07-06',
    sections: [
      {
        heading: 'Ask at the right moment',
        text: 'The best time to request a review is right after a positive interaction — project completion, a resolved support issue, a successful delivery — not weeks later when the experience has faded.',
      },
      {
        heading: 'Make it a one-click process',
        text: 'Send a direct link to your Google review form, ideally via WhatsApp or SMS, rather than asking customers to search for your business and find the review option themselves.',
      },
      {
        heading: 'Respond to every review',
        text: 'Responding to both positive and negative reviews signals to Google, and to future customers reading them, that your business is actively managed and cares about feedback.',
      },
      {
        heading: 'Handle negative reviews calmly and publicly',
        text: 'A defensive or angry public response does more damage than the original negative review. Acknowledge the concern, respond professionally, and move the detailed conversation offline.',
      },
      {
        heading: 'Consistency beats a one-time push',
        text: 'A steady stream of new reviews over time looks more authentic to both Google and prospective customers than a single burst followed by silence.',
      },
    ],
  },
  {
    slug: 'woocommerce-vs-shopify-india-2026',
    title: 'WooCommerce vs Shopify for Indian businesses',
    excerpt: 'We get asked this question in nearly every ecommerce discovery call.',
    answer:
      "WooCommerce gives full ownership of code, hosting and data, and suits businesses already on WordPress that need deep customisation. Shopify handles hosting, security and updates for a predictable monthly cost. Both support Razorpay and PayU, so payment gateways rarely decide it.",
    category: 'E-Commerce',
    cluster: 'ecommerce-development',
    authorId: 'a-3',
    markets: ['in'],
    publishedAt: '2026-07-06',
    sections: [
      {
        heading: 'WooCommerce: more control, more responsibility',
        text: "WooCommerce runs on WordPress, giving you full ownership of your store's code, hosting, and data. It suits businesses already running WordPress, needing deep customisation, or with particular integration requirements. The trade-off is managing hosting, security, and updates yourself — or paying someone to.",
      },
      {
        heading: 'Shopify: managed and fast to launch',
        text: 'Shopify handles hosting, security, and updates for you, with a large app ecosystem for extending functionality. It suits businesses that want to launch quickly with minimal technical overhead, accepting a recurring platform cost instead of managing backend systems.',
      },
      {
        heading: 'Payment gateways in India',
        text: 'Both platforms support Razorpay, PayU, and other India-focused processors, so this is rarely the deciding factor.',
      },
      {
        heading: 'Cost over time',
        text: 'WooCommerce has lower recurring platform costs but can demand more in hosting and development. Shopify gives predictable monthly costs, though pricing scales with transaction volume and app subscriptions.',
      },
      {
        heading: 'Our recommendation',
        text: 'Existing WordPress users wanting extensive customisation are usually better served by WooCommerce. Businesses prioritising a fast launch with less administrative overhead generally do better on Shopify. We build and migrate stores on both.',
      },
    ],
  },
  {
    slug: 'cost-per-lead-benchmarks-india',
    title: 'What a good cost per lead actually looks like',
    excerpt:
      'Every business asks what a "good" cost per lead looks like. The honest answer is that it depends heavily on your industry, deal size, and sales cycle.',
    answer:
      'A single generic cost-per-lead number is more misleading than helpful. Judge it against what a customer is actually worth: a high cost per lead can be profitable with long retention, and a low one can lose money with weak conversion. Your own tracked history beats any industry average.',
    category: 'Paid Ads',
    cluster: 'paid-advertising',
    authorId: 'a-2',
    markets: ['in'],
    publishedAt: '2026-07-06',
    sections: [
      {
        heading: 'Why deal size changes the math',
        text: 'A real estate developer selling multi-lakh properties can sustainably pay far more per lead than a local service business with a smaller average ticket size, because the potential return per customer is completely different.',
      },
      {
        heading: 'Compare cost per lead to customer lifetime value',
        text: 'A high cost per lead can still be profitable if customers stay for years or refer others. A low cost per lead can still lose money if conversion rates or retention are weak. Judge cost per lead against what a customer is actually worth to your business.',
      },
      {
        heading: 'Industry competitiveness drives baseline costs',
        text: 'Highly competitive categories like legal services, real estate, and B2B software tend to have higher baseline costs per click and per lead simply because more advertisers are bidding for the same audience.',
      },
      {
        heading: 'Track your own number before chasing an industry average',
        text: 'Your own historical cost per lead, tracked consistently, is a more useful benchmark than an industry average pulled from a market very different from yours.',
      },
    ],
  },
]

async function localBlogPosts(country: CountryCode): Promise<BlogPost[]> {
  const isDe = country === 'de'

  const published = blogSeeds.filter((seed) => {
    if (seed.markets && !seed.markets.includes(country)) return false

    // The German market only sees posts that actually have German copy. The
    // fallbacks below would otherwise render an English post under German
    // chrome, which SRS §7.4 rules out and which reads as an unfinished site.
    // A migrated post joins /de/ the moment titleDe is filled in — no other
    // change needed.
    if (country === 'de' && !seed.titleDe) return false

    return true
  })

  return published.map((seed, i) => ({
    id: `blog-${country}-${seed.slug}`,
    countryId: country,
    slug: seed.slug,
    title: isDe && seed.titleDe ? seed.titleDe : localiseSpelling(seed.title, country),
    excerpt: isDe && seed.excerptDe ? seed.excerptDe : localiseSpelling(seed.excerpt, country),
    answer: isDe && seed.answerDe ? seed.answerDe : localiseSpelling(seed.answer, country),
    category: seed.category,
    cluster: seed.cluster,
    authorId: seed.authorId,
    // Migrated posts keep the date they were actually published. The rest are
    // spread across the year; the day is wrapped rather than `10 + i`, which
    // silently produces 2026-07-32 once the seed list passes twenty-one.
    publishedAt: seed.publishedAt ?? `2026-0${(i % 7) + 1}-${10 + (i % 18)}`,
    updatedAt: seed.publishedAt ?? `2026-07-${10 + (i % 18)}`,
    readingTime: 6 + (i % 5),
    image: blogImages[i % blogImages.length],
    body: buildBlogBody(seed, country),
    faqs: [
      {
        question: isDe ? 'Wie lässt sich das im eigenen Unternehmen anwenden?' : localiseSpelling('How do we apply this in our own business?', country),
        answer: isDe
          ? 'Beginnen Sie mit einer Bestandsaufnahme der aktuellen Kennzahlen und dokumentieren Sie den Ausgangswert, bevor Änderungen vorgenommen werden.'
          : localiseSpelling('Start by documenting your current baseline before changing anything. Most of the value in this approach comes from being able to prove what changed and why.', country),
      },
    ],
  }))
}

function buildBlogBody(seed: BlogSeed, country: CountryCode) {
  const isDe = country === 'de'
  const c = countries[country]

  // A migrated post carries its own prose. Running it through the template
  // below would replace a real article with boilerplate that happens to share
  // its headline — the one outcome a content migration must not produce.
  if (seed.sections) {
    return [
      { type: 'paragraph' as const, text: localiseSpelling(seed.answer, country) },
      ...seed.sections.flatMap((section) => [
        { type: 'heading' as const, level: 2 as const, text: localiseSpelling(section.heading, country) },
        { type: 'paragraph' as const, text: localiseSpelling(section.text, country) },
      ]),
    ]
  }

  if (isDe) {
    return [
      { type: 'paragraph' as const, text: seed.answerDe ?? seed.answer },
      { type: 'heading' as const, level: 2 as const, text: 'Ausgangslage' },
      { type: 'paragraph' as const, text: 'Die meisten Organisationen beginnen an dieser Stelle mit der Werkzeugauswahl. Das ist die falsche Reihenfolge — ein Werkzeug kann einen Prozess nur so gut abbilden, wie dieser vorher verstanden und dokumentiert wurde.' },
      { type: 'heading' as const, level: 2 as const, text: 'Vorgehen' },
      { type: 'list' as const, ordered: true, items: ['Ist-Zustand vollständig dokumentieren', 'Zielarchitektur definieren und abnehmen lassen', 'In abgegrenzten Phasen implementieren', 'Mit Betriebshandbuch und Schulung übergeben'] },
      { type: 'callout' as const, title: 'Wesentlich', text: 'Jede Kennzahl sollte Zeitraum, Ausgangswert und Messmethode nennen. Ohne diese drei Angaben ist sie nicht überprüfbar.' },
      { type: 'heading' as const, level: 2 as const, text: 'Fazit' },
      { type: 'paragraph' as const, text: 'Der Unterschied zwischen einem funktionierenden und einem gescheiterten Projekt liegt selten in der Technologie. Er liegt in der Dokumentation der Prozesse, auf denen die Technologie aufsetzt.' },
    ]
  }

  return [
    { type: 'paragraph' as const, text: localiseSpelling(seed.answer, country) },
    { type: 'heading' as const, level: 2 as const, text: localiseSpelling('Why this comes up so often', country) },
    { type: 'paragraph' as const, text: localiseSpelling(`In ${c.name}, this question tends to surface at the point where a business has outgrown its first marketing setup but has not yet built the measurement discipline to know what to change. The instinct is to add another channel. The more useful move is usually to establish a defensible baseline first.`, country) },
    { type: 'heading' as const, level: 2 as const, text: localiseSpelling('What good looks like', country) },
    { type: 'list' as const, ordered: false, items: [
      localiseSpelling('Every claim states its timeframe, baseline and attribution method', country),
      localiseSpelling('Decisions are documented, including the ones that turned out wrong', country),
      localiseSpelling('Leading indicators are reported between the lagging ones', country),
      localiseSpelling('Underperformance is raised the month it happens, not at quarter end', country),
    ] },
    { type: 'callout' as const, title: localiseSpelling('The practical test', country), text: localiseSpelling('If a metric cannot survive being checked by someone who wants it to be wrong, it is not a metric. It is a marketing claim.', country) },
    { type: 'heading' as const, level: 2 as const, text: localiseSpelling('Where to start', country) },
    { type: 'paragraph' as const, text: localiseSpelling('Document what you currently believe to be true, then check it. In our experience roughly a third of what a business assumes about its own funnel does not survive that exercise — and finding out early is considerably cheaper than finding out after a year of optimising the wrong constraint.', country) },
  ]
}

export async function getBlogPostBySlug(
  country: CountryCode,
  slug: string
): Promise<BlogPost | undefined> {
  const all = await getBlogPosts(country)
  return all.find((p) => p.slug === slug)
}

// ─────────────────────────────────────────────────────────────────
// PRICING — SRS §1.5 / §23: two distinct modes, not one grid
// ─────────────────────────────────────────────────────────────────

async function localPricing(country: CountryCode): Promise<PricingPlan[]> {
  const c = countries[country]

  // SRS §1.5 — productized packages, primarily India and UAE.
  // SRS §23.1 — INR-denominated transparent pricing for India.
  if (c.pricingMode === 'productized') {
    return [
      {
        id: `price-${country}-1`,
        countryId: country,
        name: 'Foundation',
        price: 75000,
        period: 'month',
        description: 'For businesses establishing a first credible digital presence in one city.',
        features: [
          'Technical SEO audit and remediation',
          'One city, up to 25 target keywords',
          '4 authority articles per month',
          'Google Business Profile management',
          'Monthly reporting call',
          'WhatsApp support channel',
        ],
        cta: 'Start with Foundation',
      },
      {
        id: `price-${country}-2`,
        countryId: country,
        name: 'Growth',
        price: 165000,
        period: 'month',
        description: 'For businesses ready to compete across multiple cities and channels.',
        features: [
          'Everything in Foundation',
          'Up to 4 cities, 80 target keywords',
          '8 authority articles per month',
          'Google and Meta ads management',
          'Conversion optimisation programme',
          'Landing pages for priority campaigns',
          'Fortnightly reporting call',
        ],
        highlighted: true,
        cta: 'Start with Growth',
      },
      {
        id: `price-${country}-3`,
        countryId: country,
        name: 'Scale',
        price: 340000,
        period: 'month',
        description: 'For established businesses running a full multi-city growth programme.',
        features: [
          'Everything in Growth',
          'Unlimited cities and keyword scope',
          '16 authority articles per month',
          'Full paid channel management',
          'Marketing and process automation',
          'Dedicated growth strategist',
          'Weekly reporting and quarterly planning',
        ],
        cta: 'Talk to us about Scale',
      },
    ]
  }

  // SRS §23.6 — "consultation-first CTAs over self-serve pricing".
  // SRS §23.3 — "consultation-booking CTAs over hard-sell forms".
  const isDe = country === 'de'
  return [
    {
      id: `price-${country}-1`,
      countryId: country,
      name: isDe ? 'Prozessanalyse' : 'Diagnostic',
      price: null,
      period: 'engagement',
      description: isDe
        ? 'Strukturierte Aufnahme des Ist-Zustands mit priorisierten Automatisierungspotenzialen.'
        : localiseSpelling('A scoped assessment producing a written diagnosis and a phased roadmap you own outright.', country),
      features: isDe
        ? ['Vollständige Ist-Aufnahme', 'Schnittstellen- und Risikodokumentation', 'Priorisierte Handlungsempfehlungen', 'Festpreis, definierter Zeitraum']
        : [
            localiseSpelling('Structured review across channels, data and process', country),
            localiseSpelling('Benchmarked against comparable programmes', country),
            localiseSpelling('Written diagnosis with prioritised recommendations', country),
            localiseSpelling('Fixed fee, fixed timeframe, no obligation to continue', country),
          ],
      cta: c.primaryCta,
    },
    {
      id: `price-${country}-2`,
      countryId: country,
      name: isDe ? 'Programm' : 'Engagement',
      price: null,
      period: 'monthly retainer',
      description: isDe
        ? 'Phasenweise Implementierung mit eigenständig betreibbaren Ergebnissen je Phase.'
        : localiseSpelling('An ongoing retained engagement with a named team and agreed quarterly outcomes.', country),
      features: isDe
        ? ['Definierte Phasen mit Festpreis', 'Referenzarchitektur vor Implementierung', 'Monitoring und Fehlerbehandlung', 'Betriebshandbuch und Schulung']
        : [
            localiseSpelling('Named strategist, operator and analyst', country),
            localiseSpelling('Quarterly roadmap with agreed success measures', country),
            localiseSpelling('Documented decisions and shared workspace', country),
            localiseSpelling('Thirty days notice, no long-term lock-in', country),
          ],
      highlighted: true,
      cta: c.primaryCta,
    },
    {
      id: `price-${country}-3`,
      countryId: country,
      name: isDe ? 'Enterprise' : 'Enterprise',
      price: null,
      period: 'custom',
      description: isDe
        ? 'Mehrjährige Programme für komplexe Systemlandschaften und regulierte Branchen.'
        : localiseSpelling('Multi-year programmes for complex systems landscapes and regulated sectors.', country),
      features: isDe
        ? ['Individuelle Vertragsgestaltung', 'Dedizierte Ansprechpartner', 'Erweiterte Compliance-Anforderungen', 'Mehrjährige Roadmap']
        : [
            localiseSpelling('Custom commercial and contractual terms', country),
            localiseSpelling('Senior consultants engaged throughout', country),
            localiseSpelling('Extended compliance and security requirements', country),
            localiseSpelling('Multi-year roadmap with executive reporting', country),
          ],
      cta: isDe ? 'Kontakt aufnehmen' : localiseSpelling('Discuss an enterprise engagement', country),
    },
  ]
}

// ─────────────────────────────────────────────────────────────────
// RESOURCES — SRS §11.1 targets 100 per country
// ─────────────────────────────────────────────────────────────────

async function localResources(country: CountryCode): Promise<Resource[]> {
  const c = countries[country]
  const isDe = country === 'de'

  const seeds: { slug: string; title: string; description: string; format: Resource['format']; category: string }[] = [
    {
      slug: 'growth-diagnostic-checklist',
      title: isDe ? 'Checkliste: Wachstumsdiagnose' : localiseSpelling('Growth diagnostic checklist', country),
      description: isDe
        ? 'Vierzig Prüfpunkte über Kanäle, Daten, Prozesse und Team zur Identifikation des tatsächlichen Engpasses.'
        : localiseSpelling('Forty checks across channels, data, process and team to locate where growth is actually constrained.', country),
      format: 'Checklist',
      category: 'Strategy',
    },
    {
      slug: c.leadMagnet.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      title: c.leadMagnet.title,
      description: c.leadMagnet.description,
      format: c.leadMagnet.format as Resource['format'],
      category: 'Featured',
    },
    {
      slug: 'technical-seo-audit-template',
      title: isDe ? 'Vorlage: Technisches SEO-Audit' : localiseSpelling('Technical SEO audit template', country),
      description: isDe
        ? 'Strukturierte Vorlage für Crawling, Indexierung, Core Web Vitals und strukturierte Daten.'
        : localiseSpelling('A structured template covering crawling, indexation, Core Web Vitals and structured data.', country),
      format: 'Template',
      category: 'SEO',
    },
    {
      slug: 'attribution-model-guide',
      title: isDe ? 'Leitfaden: Attributionsmodelle' : localiseSpelling('Attribution model guide', country),
      description: isDe
        ? 'Welches Attributionsmodell wann angemessen ist — und warum Last-Click fast immer irreführt.'
        : localiseSpelling('Which attribution model is appropriate when, and why last-click almost always misleads.', country),
      format: 'Guide',
      category: 'Analytics',
    },
  ]

  return seeds.map((s, i) => ({
    id: `res-${country}-${s.slug}`,
    countryId: country,
    slug: s.slug,
    title: s.title,
    description: s.description,
    format: s.format,
    category: s.category,
    image: resourceImages[i % resourceImages.length],
    readingTime: 8 + i * 3,
  }))
}

// ─────────────────────────────────────────────────────────────────
// COMPARISON — SRS §3.2 /compare/{competitor}/, §10.1 comparison intent
// ─────────────────────────────────────────────────────────────────

/** SRS uses the placeholder "agency-x". Real competitor names pending. */
export const competitors: Competitor[] = [
  {
    slug: 'agency-x',
    name: 'A traditional full-service agency',
    positioning: 'Retained agency selling channel execution across a broad client roster',
    comparison: [
      { dimension: 'Engagement model', us: 'Fractional team with named strategist, operator and analyst', them: 'Account manager plus pooled specialist resource' },
      { dimension: 'Reporting', us: 'Blended CAC and contribution margin, model held by you', them: 'Channel-level ROAS in the agency reporting tool' },
      { dimension: 'Commitment', us: 'Thirty days notice', them: 'Typically twelve-month minimum term' },
      { dimension: 'Documentation', us: 'Every decision recorded in a workspace you keep', them: 'Knowledge generally stays with the agency' },
      { dimension: 'Scope', us: 'Strategy, execution and analytics as one accountability', them: 'Execution against a brief you are expected to write' },
      { dimension: 'Pricing transparency', us: 'Firm number in the first conversation', them: 'Usually after a multi-stage discovery process' },
    ],
  },
  {
    slug: 'in-house-hire',
    name: 'Hiring in-house',
    positioning: 'Recruiting a full-time marketing leader or growth manager',
    comparison: [
      { dimension: 'Time to productivity', us: 'Two weeks to first deliverable', them: 'Four months to hire, two more to ramp' },
      { dimension: 'Capability range', us: 'Strategy, execution and analytics simultaneously', them: "One person's skill profile" },
      { dimension: 'Cost', us: 'Monthly retainer, scalable up or down', them: 'Salary, benefits, equity, tooling and management overhead' },
      { dimension: 'Risk', us: 'Thirty days notice, no severance', them: 'Severance exposure and a re-hire cycle if it fails' },
      { dimension: 'Continuity', us: 'Team continuity, documented handovers', them: 'Knowledge leaves when the person does' },
      { dimension: 'Long-term fit', us: 'Best while the function is being built', them: 'Better once the function is established and stable' },
    ],
  },
]

export function getCompetitor(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug)
}

// ─────────────────────────────────────────────────────────────────
// Convenience re-exports so pages import from one place only
// ─────────────────────────────────────────────────────────────────

export { getTestimonialsByIndustry }
export { getServiceDefinition, getIndustryDefinition, getCity }


// ═══════════════════════════════════════════════════════════════════
//  THE CMS BOUNDARY, WIRED
// ═══════════════════════════════════════════════════════════════════
//
// Everything above generates content from the taxonomies committed in this
// repository. Everything below prefers the Laravel CMS and falls back to that
// generated content when the CMS has nothing to say — because it holds no
// records for a market yet, or because it could not be reached at build time.
//
// The fallback is the point: editors get a live CMS, and a build still
// succeeds and still ships a complete site if that CMS is down.

/** Fills the fields the internal types require but the API does not carry. */
function withDefaults<T>(value: T | null | undefined, fallback: T): T {
  return value === null || value === undefined || value === '' ? fallback : value
}

export async function getServices(country: CountryCode): Promise<Service[]> {
  const market = await getCmsMarket(country)
  if (!market?.services?.length) return localServices(country)

  const c = countries[country]

  return market.services.map((s) => ({
    id: `svc-${country}-${s.slug}`,
    countryId: country,
    slug: s.slug,
    title: s.title,
    answer: withDefaults(s.answer, `${s.title} from Ft. Social Crew in ${c.name}.`),
    summary: withDefaults(s.summary, withDefaults(s.shortDescription, '')),
    icon: withDefaults(s.icon, 'Compass'),
    outcomes: s.outcomes ?? [],
    deliverables: s.deliverables ?? [],
    process: (s.process ?? []).map((p, i) => ({
      step: withDefaults(p.step, String(i + 1).padStart(2, '0')),
      title: p.title,
      description: p.description,
    })),
    faqs: s.faqs ?? [],
    status: 'published',
    seo: {
      entityType: 'service',
      entityId: `svc-${country}-${s.slug}`,
      title: `${s.title} in ${c.name}`,
      description: withDefaults(s.summary, s.title).slice(0, 158),
      hreflangGroupId: `svc-${s.slug}`,
    },
  }))
}

export async function getIndustries(country: CountryCode): Promise<Industry[]> {
  const market = await getCmsMarket(country)
  if (!market?.industries?.length) return localIndustries(country)

  return market.industries.map((i) => ({
    id: `ind-${country}-${i.slug}`,
    countryId: country,
    slug: i.slug,
    name: i.name,
    answer: withDefaults(i.seoStrategy, i.name),
    buyerPersona: withDefaults(i.buyerPersona, ''),
    painPoints: i.painPoints ?? [],
    servicesRequired: i.servicesRequired ?? [],
    seoStrategy: withDefaults(i.seoStrategy, ''),
    contentIdeas: i.contentIdeas ?? [],
    leadMagnet: withDefaults(i.leadMagnet, ''),
    caseStudyIdea: withDefaults(i.caseStudyIdea, ''),
    image: withDefaults(i.image, industryImages[i.slug] ?? editorial.strategy),
    status: 'published',
  }))
}

export async function getCityList(country: CountryCode): Promise<City[]> {
  const market = await getCmsMarket(country)
  if (!market?.cities?.length) return localCityList(country)

  const c = countries[country]

  return market.cities.map((x) => ({
    id: `city-${country}-${x.slug}`,
    countryId: country,
    slug: x.slug,
    name: x.name,
    region: withDefaults(x.region, ''),
    answer: withDefaults(x.answer, ''),
    localProofPoint: withDefaults(x.localProofPoint, ''),
    uniqueIntro: withDefaults(x.uniqueIntro, ''),
    testimonialId: '',
    image: withDefaults(x.image, c.cityImage),
  }))
}

export async function getCaseStudies(country: CountryCode): Promise<CaseStudy[]> {
  const market = await getCmsMarket(country)
  if (!market?.caseStudies?.length) return localCaseStudies(country)

  return market.caseStudies.map((cs, i) => ({
    id: `cs-${country}-${cs.slug}`,
    countryId: country,
    slug: cs.slug,
    title: cs.title,
    client: withDefaults(cs.client, 'Confidential'),
    isPlaceholder: Boolean(cs.isPlaceholder),
    industry: withDefaults(cs.industry, 'professional-services'),
    service: withDefaults(cs.service, ''),
    challenge: withDefaults(cs.challenge, ''),
    approach: cs.approach ?? [],
    results: (cs.results ?? []).map((r) => ({
      metric: r.metric,
      label: r.label,
      detail: withDefaults(r.detail, ''),
    })),
    // Carried through so a page can show the caveat next to the figures —
    // some engagements report targets rather than achieved results.
    resultsNote: withDefaults(cs.resultsNote, ''),
    beforeAfter: cs.beforeAfter ?? [],
    timeframe: withDefaults(cs.timeframe, ''),
    impact: withDefaults(cs.impact, ''),
    quote: cs.quote?.text
      ? {
          text: cs.quote.text,
          author: withDefaults(cs.quote.author, ''),
          role: withDefaults(cs.quote.role, ''),
        }
      : undefined,
    image: withDefaults(cs.image, caseStudyImages[i % caseStudyImages.length]),
    publishedAt: withDefaults(cs.publishedAt, '2026-01-15'),
  }))
}

export async function getBlogPosts(country: CountryCode): Promise<BlogPost[]> {
  const market = await getCmsMarket(country)
  if (!market?.blogPosts?.length) return localBlogPosts(country)

  return market.blogPosts.map((p, i) => ({
    id: `blog-${country}-${p.slug}`,
    countryId: country,
    slug: p.slug,
    title: p.title,
    excerpt: withDefaults(p.excerpt, ''),
    answer: withDefaults(p.answer, ''),
    category: withDefaults(p.category, 'Growth'),
    cluster: withDefaults(p.cluster, ''),
    authorId: withDefaults(p.authorId, 'a-1'),
    publishedAt: withDefaults(p.publishedAt, '2026-01-10'),
    updatedAt: withDefaults(p.updatedAt, withDefaults(p.publishedAt, '2026-01-10')),
    readingTime: p.readingTime || 6,
    image: withDefaults(p.image, blogImages[i % blogImages.length]),
    body: (p.body ?? []) as BlogPost['body'],
    faqs: p.faqs ?? [],
  }))
}

export async function getPricing(country: CountryCode): Promise<PricingPlan[]> {
  const market = await getCmsMarket(country)
  if (!market?.pricing?.length) return localPricing(country)

  return market.pricing.map((p, i) => ({
    id: `price-${country}-${i + 1}`,
    countryId: country,
    name: p.name,
    price: p.price,
    period: withDefaults(p.period, 'month'),
    description: withDefaults(p.description, ''),
    features: p.features ?? [],
    highlighted: Boolean(p.highlighted),
    cta: withDefaults(p.cta, countries[country].primaryCta),
  }))
}

export async function getResources(country: CountryCode): Promise<Resource[]> {
  const market = await getCmsMarket(country)
  if (!market?.resources?.length) return localResources(country)

  return market.resources.map((r, i) => ({
    id: `res-${country}-${r.slug}`,
    countryId: country,
    slug: r.slug,
    title: r.title,
    description: withDefaults(r.description, ''),
    format: withDefaults(r.format, 'Guide') as Resource['format'],
    category: withDefaults(r.category, 'Strategy'),
    image: withDefaults(r.image, resourceImages[i % resourceImages.length]),
    readingTime: r.readingTime || 8,
  }))
}
