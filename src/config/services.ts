/**
 * Service taxonomy — the ten core services.
 *
 * Derived from the five service pills on the brand plate (Digital Marketing,
 * Advertising, Branding, Graphic & Web Design, Social Media Management) plus
 * the services named across SRS §9.1, §23 and §24. SRS §11.1 targets 50
 * services per country as "core + sub-service variants"; these ten are the
 * core tier that every sub-variant hangs from.
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
]

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
