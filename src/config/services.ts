/**
 * Service taxonomy — ten core services plus the sub-service tier.
 *
 * The core ten derive from the five service pills on the brand plate (Digital
 * Marketing, Advertising, Branding, Graphic & Web Design, Social Media
 * Management) plus the services named across SRS §9.1, §23 and §24.
 *
 * SRS §11.1 targets 50 services per country as "core + sub-service variants",
 * and the sub-service tier is where the previous site's catalogue lands: Google
 * Ads, Meta Ads, LinkedIn Ads and E-Commerce Ads are how buyers actually search
 * for paid media, and each carried its own page and its own rankings before
 * this rebuild consolidated them into `paid-advertising`. Folding them into a
 * parent loses the query; giving each its own money page with `parentSlug`
 * pointing home keeps both the long-tail entry point and the hierarchy.
 */

export interface ServiceDefinition {
  slug: string
  /** SRS §7.4 — US spelling differs from AU/CA/IN. */
  slugUs?: string
  title: string
  titleUs?: string
  titleDe?: string
  icon: string
  category: 'Acquisition' | 'Conversion' | 'Brand' | 'Platform' | 'Advisory'
  shortDescription: string
  /** SRS §7.4 — the German market reads German, not translated English. */
  shortDescriptionDe?: string
  /**
   * The core service this one specialises. Absent on the core ten.
   *
   * Drives grouping on the services hub and the "related services" links, so a
   * visitor who lands on /google-ads/ from search can climb to the full paid
   * media offer instead of dead-ending on a single channel.
   */
  parentSlug?: string
}

export const services: ServiceDefinition[] = [
  {
    slug: 'seo-services',
    title: 'Search Engine Optimisation',
    titleUs: 'Search Engine Optimization',
    titleDe: 'SEO & Suchmaschinenoptimierung',
    icon: 'Search',
    category: 'Acquisition',
    shortDescription:
      'Compounding organic visibility built on technical foundations, topical authority and content that answers real buyer questions.',
    shortDescriptionDe:
      'Nachhaltige organische Sichtbarkeit auf technischer Grundlage, thematischer Autorität und Inhalten, die reale Kauffragen beantworten.',
  },
  {
    slug: 'paid-advertising',
    title: 'Paid Advertising',
    titleDe: 'Performance Advertising',
    icon: 'Target',
    category: 'Acquisition',
    shortDescription:
      'Google, Meta and LinkedIn campaigns managed to contribution margin — not to impressions, clicks or vanity reach.',
    shortDescriptionDe:
      'Google-, Meta- und LinkedIn-Kampagnen, gesteuert nach Deckungsbeitrag — nicht nach Impressionen oder Klicks.',
  },
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    titleDe: 'Social Media Management',
    icon: 'MessageCircle',
    category: 'Brand',
    shortDescription:
      'Always-on channel management that turns published authority content into daily distribution and inbound demand.',
    shortDescriptionDe:
      'Laufende Kanalbetreuung, die veröffentlichte Fachinhalte in tägliche Distribution und eingehende Nachfrage überführt.',
  },
  {
    slug: 'content-marketing',
    title: 'Content Marketing',
    titleDe: 'Content Marketing',
    icon: 'PenTool',
    category: 'Acquisition',
    shortDescription:
      'Pillar, cluster and supporting content mapped to search intent and structured so answer engines can cite it.',
    shortDescriptionDe:
      'Pillar-, Cluster- und Supporting-Inhalte entlang der Suchintention, strukturiert für die Zitierbarkeit durch Answer Engines.',
  },
  {
    slug: 'web-design-development',
    title: 'Web Design & Development',
    titleDe: 'Web Design & Entwicklung',
    icon: 'Layout',
    category: 'Platform',
    shortDescription:
      'Fast, accessible, search-ready websites engineered against Core Web Vitals budgets from the first commit.',
    shortDescriptionDe:
      'Schnelle, barrierearme und suchoptimierte Websites, entwickelt gegen definierte Core-Web-Vitals-Budgets ab dem ersten Commit.',
  },
  {
    slug: 'branding-creative',
    title: 'Branding & Creative',
    titleDe: 'Branding & Kreation',
    icon: 'Palette',
    category: 'Brand',
    shortDescription:
      'Positioning, identity and creative systems that make a growth-stage business look like the credible choice.',
    shortDescriptionDe:
      'Positionierung, Identität und Gestaltungssysteme, die ein wachsendes Unternehmen als glaubwürdige Wahl erkennbar machen.',
  },
  {
    slug: 'conversion-rate-optimisation',
    slugUs: 'conversion-rate-optimization',
    title: 'Conversion Rate Optimisation',
    titleUs: 'Conversion Rate Optimization',
    titleDe: 'Conversion-Optimierung',
    icon: 'TrendingUp',
    category: 'Conversion',
    shortDescription:
      'Research-led experimentation on the pages that already carry your traffic — the cheapest growth available.',
    shortDescriptionDe:
      'Analysegestützte Experimente auf den Seiten, die bereits Traffic tragen — das günstigste verfügbare Wachstum.',
  },
  {
    slug: 'process-automation',
    title: 'Marketing & Process Automation',
    titleDe: 'Prozessautomatisierung',
    icon: 'Workflow',
    category: 'Platform',
    shortDescription:
      'Documented, engineered automation across marketing and sales operations — fewer manual steps, fewer silent failures.',
    shortDescriptionDe:
      'Dokumentierte, technisch saubere Automatisierung in Marketing und Vertrieb — weniger manuelle Schritte, weniger stille Ausfälle.',
  },
  {
    slug: 'growth-consulting',
    title: 'Growth Consulting & Fractional Teams',
    titleDe: 'Growth Consulting',
    icon: 'Compass',
    category: 'Advisory',
    shortDescription:
      'Embedded senior growth leadership without a full-time hire — strategy, hiring plan and execution oversight.',
    shortDescriptionDe:
      'Erfahrene Wachstumsführung ohne Festanstellung — Strategie, Personalplanung und Steuerung der Umsetzung.',
  },
  {
    slug: 'analytics-reporting',
    title: 'Analytics & Reporting',
    titleDe: 'Analytics & Reporting',
    icon: 'BarChart3',
    category: 'Platform',
    shortDescription:
      'Attribution, funnels and executive dashboards that make every marketing decision defensible with data.',
    shortDescriptionDe:
      'Attribution, Funnels und Management-Dashboards, die jede Marketingentscheidung datenbasiert begründbar machen.',
  },

  // ── Sub-service tier ──────────────────────────────────────────────────────
  // Each of these carried its own page and its own rankings on the previous
  // site. They are the terms buyers actually search — nobody types "paid
  // advertising agency", they type "google ads agency" — so each keeps a money
  // page and climbs to its parent rather than being absorbed into it.

  {
    slug: 'local-seo-services',
    title: 'Local SEO',
    titleDe: 'Local SEO',
    icon: 'MapPin',
    category: 'Acquisition',
    parentSlug: 'seo-services',
    shortDescription:
      'Google Business Profile, citations and geo-targeted pages that win the Maps three-pack in the areas you actually serve.',
    shortDescriptionDe:
      'Google-Unternehmensprofil, Brancheneinträge und standortbezogene Seiten, die im lokalen Kartenbereich der tatsächlich bedienten Gebiete sichtbar machen.',
  },
  {
    slug: 'aeo-geo-services',
    title: 'Answer & Generative Engine Optimisation',
    titleUs: 'Answer & Generative Engine Optimization',
    titleDe: 'Answer- & Generative-Engine-Optimierung',
    icon: 'Sparkles',
    category: 'Acquisition',
    parentSlug: 'seo-services',
    shortDescription:
      'Being the cited answer inside ChatGPT, Gemini, Perplexity and featured snippets — not just a blue link on page one.',
    shortDescriptionDe:
      'Die zitierte Antwort in ChatGPT, Gemini, Perplexity und Featured Snippets sein — nicht nur ein blauer Link auf Seite eins.',
  },
  {
    slug: 'app-store-optimisation',
    slugUs: 'app-store-optimization',
    title: 'App Store Optimisation',
    titleUs: 'App Store Optimization',
    titleDe: 'App-Store-Optimierung',
    icon: 'Smartphone',
    category: 'Acquisition',
    parentSlug: 'seo-services',
    shortDescription:
      'Listing, keyword and creative work that gets an app found by the users who need it, in stores where most apps never are.',
    shortDescriptionDe:
      'Listing-, Keyword- und Creative-Arbeit, die eine App bei den passenden Nutzern sichtbar macht — in Stores, in denen die meisten Apps nie gefunden werden.',
  },
  {
    slug: 'lead-generation',
    title: 'Lead Generation',
    titleDe: 'Leadgenerierung',
    icon: 'Magnet',
    category: 'Acquisition',
    shortDescription:
      'Outreach, offer and follow-up built backwards from the people your sales team actually wants to talk to.',
    shortDescriptionDe:
      'Ansprache, Angebot und Nachfassen — rückwärts entwickelt von den Personen, mit denen Ihr Vertrieb wirklich sprechen will.',
  },
  {
    slug: 'personal-branding',
    title: 'Personal Branding',
    titleDe: 'Personal Branding',
    icon: 'UserRound',
    category: 'Brand',
    parentSlug: 'branding-creative',
    shortDescription:
      'Founder and executive presence run as a system — positioning, thought leadership and a publishing cadence that holds.',
    shortDescriptionDe:
      'Sichtbarkeit von Gründern und Führungskräften als System — Positionierung, Thought Leadership und ein Publikationsrhythmus, der hält.',
  },
  {
    slug: 'google-ads',
    title: 'Google Ads',
    titleDe: 'Google Ads',
    icon: 'MousePointerClick',
    category: 'Acquisition',
    parentSlug: 'paid-advertising',
    shortDescription:
      'Search, Shopping, Display and YouTube managed to qualified leads and tracked revenue — not to clicks.',
    shortDescriptionDe:
      'Search-, Shopping-, Display- und YouTube-Kampagnen, gesteuert auf qualifizierte Leads und messbaren Umsatz — nicht auf Klicks.',
  },
  {
    slug: 'meta-ads',
    title: 'Meta Ads',
    titleDe: 'Meta Ads',
    icon: 'Megaphone',
    category: 'Acquisition',
    parentSlug: 'paid-advertising',
    shortDescription:
      'Facebook and Instagram campaigns with a real creative testing framework behind them, and pixel data you can trust.',
    shortDescriptionDe:
      'Facebook- und Instagram-Kampagnen mit einem echten Creative-Testing-Rahmen und Pixel-Daten, auf die Verlass ist.',
  },
  {
    slug: 'linkedin-ads',
    title: 'LinkedIn Ads',
    titleDe: 'LinkedIn Ads',
    icon: 'Linkedin',
    category: 'Acquisition',
    parentSlug: 'paid-advertising',
    shortDescription:
      'B2B targeting by job title, seniority, industry and company size — reaching people for who they are professionally.',
    shortDescriptionDe:
      'B2B-Targeting nach Position, Senioritätsgrad, Branche und Unternehmensgröße — Menschen über ihre berufliche Rolle erreichen.',
  },
  {
    slug: 'ecommerce-ads',
    title: 'E-Commerce Ads',
    titleDe: 'E-Commerce Ads',
    icon: 'ShoppingCart',
    category: 'Acquisition',
    parentSlug: 'paid-advertising',
    shortDescription:
      'Shopping, Performance Max and dynamic product campaigns optimised to ROAS at product level, not store average.',
    shortDescriptionDe:
      'Shopping-, Performance-Max- und dynamische Produktkampagnen, optimiert auf ROAS je Produkt statt auf den Shop-Durchschnitt.',
  },
  {
    slug: 'wordpress-development',
    title: 'WordPress Development',
    titleDe: 'WordPress-Entwicklung',
    icon: 'Code',
    category: 'Platform',
    parentSlug: 'web-design-development',
    shortDescription:
      'Custom WordPress builds that stay lean and fast, with the SEO foundation laid at build time rather than bolted on by plugin.',
    shortDescriptionDe:
      'Individuelle WordPress-Umsetzungen, die schlank und schnell bleiben — SEO-Grundlage ab Entwicklung statt per Plugin nachgerüstet.',
  },
  {
    slug: 'shopify-development',
    title: 'Shopify Development',
    titleDe: 'Shopify-Entwicklung',
    icon: 'Store',
    category: 'Platform',
    parentSlug: 'web-design-development',
    shortDescription:
      'Custom themes, conversion-led product pages, and clean migrations from WooCommerce, Wix or Magento.',
    shortDescriptionDe:
      'Individuelle Themes, konversionsstarke Produktseiten und saubere Migrationen von WooCommerce, Wix oder Magento.',
  },
  {
    slug: 'ecommerce-development',
    title: 'E-Commerce Development',
    titleDe: 'E-Commerce-Entwicklung',
    icon: 'Package',
    category: 'Platform',
    parentSlug: 'web-design-development',
    shortDescription:
      'Platform choice, catalogue, payments and checkout built around the step where most stores lose the sale.',
    shortDescriptionDe:
      'Plattformwahl, Katalog, Zahlung und Checkout — aufgebaut um genau den Schritt, an dem die meisten Shops den Verkauf verlieren.',
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    titleDe: 'UI/UX-Design',
    icon: 'Frame',
    category: 'Conversion',
    parentSlug: 'web-design-development',
    shortDescription:
      'Research, journey mapping and interface design grounded in how real users actually navigate and decide.',
    shortDescriptionDe:
      'Research, Journey Mapping und Interface-Design auf Basis dessen, wie reale Nutzer tatsächlich navigieren und entscheiden.',
  },
  {
    slug: 'software-development',
    title: 'Custom Software Development',
    titleDe: 'Individuelle Softwareentwicklung',
    icon: 'Terminal',
    category: 'Platform',
    shortDescription:
      'Applications shaped to the workflow a business already runs — for teams that have outgrown spreadsheets and disconnected tools.',
    shortDescriptionDe:
      'Anwendungen entlang bestehender Arbeitsabläufe — für Teams, denen Tabellen und unverbundene Tools nicht mehr genügen.',
  },
  {
    slug: 'hrm-crm-systems',
    title: 'HRM & CRM Systems',
    titleDe: 'HRM- & CRM-Systeme',
    icon: 'Users',
    category: 'Platform',
    parentSlug: 'software-development',
    shortDescription:
      'People and customer systems built around your actual policies — onboarding, attendance, payroll, pipeline and permissions.',
    shortDescriptionDe:
      'Personal- und Kundensysteme entlang Ihrer tatsächlichen Richtlinien — Onboarding, Zeiterfassung, Abrechnung, Pipeline und Rechte.',
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    titleDe: 'KI-Automatisierung',
    icon: 'Bot',
    category: 'Platform',
    parentSlug: 'process-automation',
    shortDescription:
      'Automation measured in hours saved rather than features shipped, starting from an audit of what is genuinely automatable.',
    shortDescriptionDe:
      'Automatisierung, gemessen in eingesparten Stunden statt in ausgelieferten Funktionen — beginnend mit einem Audit des wirklich Automatisierbaren.',
  },
]

/** The core tier — services with no parent. Drives grouping on the hub. */
export const coreServices = services.filter((s) => !s.parentSlug)

/** Sub-services of a given core service, in taxonomy order. */
export function getSubServices(parentSlug: string): ServiceDefinition[] {
  return services.filter((s) => s.parentSlug === parentSlug)
}

export const serviceSlugs = services.map((s) => s.slug)

/**
 * Which services get city × service pages generated.
 *
 * SRS §7.7 is explicit that "priority indexing signals favour money pages over
 * low-value combinatorial pages", and §1.12 warns about crawl budget once page
 * count scales into the thousands. Generating all 10 services × every city
 * would produce hundreds of thin pages competing with the money pages.
 *
 * This is the SINGLE SOURCE OF TRUTH: the route generator, every component
 * that links to these pages, and the sitemap all read it. Adding a service
 * here creates the pages, the links and the sitemap entries together — they
 * cannot drift out of sync and produce 404s.
 */
export const PROGRAMMATIC_CITY_SERVICES = [
  'seo-services',
  'paid-advertising',
  'web-design-development',
  'growth-consulting',
] as const

export function isProgrammaticCityService(slug: string): boolean {
  return (PROGRAMMATIC_CITY_SERVICES as readonly string[]).includes(slug)
}

/** The service definitions that have city pages, in taxonomy order. */
export const cityServiceDefinitions = services.filter((s) =>
  isProgrammaticCityService(s.slug)
)

export function getServiceDefinition(slug: string): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug || s.slugUs === slug)
}

/** Resolves the market-correct slug — SRS §7.4 requires local spelling. */
export function resolveServiceSlug(def: ServiceDefinition, countryCode: string): string {
  return countryCode === 'en-us' && def.slugUs ? def.slugUs : def.slug
}

/** Resolves the market-correct title. */
export function resolveServiceTitle(def: ServiceDefinition, countryCode: string): string {
  if (countryCode === 'de' && def.titleDe) return def.titleDe
  if (countryCode === 'en-us' && def.titleUs) return def.titleUs
  return def.title
}

/** Resolves the market-correct short description. */
export function resolveServiceShortDescription(
  def: ServiceDefinition,
  countryCode: string
): string {
  return countryCode === 'de' && def.shortDescriptionDe
    ? def.shortDescriptionDe
    : def.shortDescription
}
