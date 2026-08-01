/**
 * Industry taxonomy — the fourteen verticals enumerated in SRS §24.1–24.14.
 *
 * Nothing here is inferred: the SRS supplies a complete brief per vertical
 * (buyer persona, pain points, services required, SEO strategy, content ideas,
 * landing pages, lead magnets, ads keywords, LinkedIn/Meta strategy, case
 * study ideas). The content below is a faithful condensation of those tables.
 */

export interface IndustryDefinition {
  slug: string
  name: string
  /** SRS §7.4 — the German market reads German, not translated English. */
  nameDe?: string
  icon: string
  buyerPersona: string
  painPoints: string[]
  servicesRequired: string[]
  seoStrategy: string
  contentIdeas: string[]
  leadMagnet: string
  caseStudyIdea: string
  /** Which of the ten core services matter most here. */
  primaryServices: string[]
}

export const industries: IndustryDefinition[] = [
  {
    slug: 'healthcare',
    name: 'Healthcare',
    nameDe: 'Gesundheitswesen',
    icon: 'HeartPulse',
    buyerPersona: 'Clinic owners, hospital marketing managers, healthcare group operators',
    painPoints: [
      'Patient acquisition cost climbing faster than practice revenue',
      'Compliance-sensitive advertising with narrow creative latitude',
      'Online reputation management across multiple locations and providers',
    ],
    servicesRequired: [
      'Local SEO',
      'Reputation management',
      'Compliance-aware paid ads',
      'Website and booking UX',
    ],
    seoStrategy:
      'Local pack optimisation, provider and schema markup, condition-and-treatment content clusters',
    contentIdeas: [
      'How to choose a specialist clinic',
      'Patient FAQ content by condition',
      'Provider spotlight posts',
    ],
    leadMagnet: 'Patient acquisition checklist and compliance-safe marketing guide',
    caseStudyIdea: 'Multi-location clinic group patient-volume growth story',
    primaryServices: ['seo-services', 'paid-advertising', 'web-design-development', 'conversion-rate-optimisation'],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    nameDe: 'Immobilien',
    icon: 'Building2',
    buyerPersona: 'Brokerages, individual agents, property developers',
    painPoints: [
      'Inconsistent lead flow across market cycles',
      'High cost-per-lead in saturated portals',
      'Difficulty standing out when every listing looks identical',
    ],
    servicesRequired: ['Local SEO', 'Listing-page optimisation', 'Paid lead generation', 'CRM and nurture setup'],
    seoStrategy: 'Neighbourhood and city landing pages, listing schema, "homes for sale in [area]" clusters',
    contentIdeas: ['Neighbourhood guides', 'Buyer and seller FAQ content', 'Market-trend reports'],
    leadMagnet: 'Home buying and selling guide, market report download',
    caseStudyIdea: 'Brokerage lead-volume and cost-per-lead improvement story',
    primaryServices: ['seo-services', 'paid-advertising', 'process-automation', 'web-design-development'],
  },
  {
    slug: 'law-firms',
    name: 'Law Firms',
    nameDe: 'Kanzleien',
    icon: 'Scale',
    buyerPersona: 'Managing partners, solo practitioners, firm marketing directors',
    painPoints: [
      'Building trust online in a category where credibility is everything',
      'Ethical advertising constraints limiting direct-response tactics',
      'Long sales cycles with attribution that breaks down',
    ],
    servicesRequired: ['Local SEO', 'Authority content', 'Reputation management', 'PPC for high-value practice areas'],
    seoStrategy: 'Practice-area pages, attorney bio schema, city and practice-area clusters',
    contentIdeas: [
      'What to do after a specific legal situation',
      'Compliant case-outcome summaries',
      'Practice-area FAQ content',
    ],
    leadMagnet: 'A "what to expect" guide per practice area',
    caseStudyIdea: 'Practice-area lead-quality and case-volume growth story',
    primaryServices: ['seo-services', 'content-marketing', 'paid-advertising', 'analytics-reporting'],
  },
  {
    slug: 'dentists',
    name: 'Dentists',
    nameDe: 'Zahnarztpraxen',
    icon: 'Smile',
    buyerPersona: 'Independent dental practice owners, DSO marketing managers',
    painPoints: [
      'New patient acquisition against high local competition density',
      'Appointment no-shows eroding chair utilisation',
      'Treatment-level marketing that has to stay compliant',
    ],
    servicesRequired: ['Local SEO', 'Google Business Profile management', 'Booking-funnel optimisation'],
    seoStrategy: '"Dentist near me" local pack focus, treatment-specific pages, review schema',
    contentIdeas: ['Treatment explainer posts', 'Compliant before-and-after content', 'Patient FAQ'],
    leadMagnet: 'New patient offer and treatment cost guide',
    caseStudyIdea: 'New-patient booking increase story for a multi-chair practice',
    primaryServices: ['seo-services', 'paid-advertising', 'conversion-rate-optimisation', 'web-design-development'],
  },
  {
    slug: 'saas',
    name: 'SaaS',
    nameDe: 'SaaS',
    icon: 'Cloud',
    buyerPersona: 'Founders, Heads of Growth, VP Marketing at B2B SaaS companies',
    painPoints: [
      'CAC efficiency deteriorating as easy channels saturate',
      'Product-led and sales-led motions pulling in different directions',
      'Content that ranks but does not convert technical buyers',
    ],
    servicesRequired: ['SEO', 'Content marketing', 'Fractional growth leadership', 'Conversion optimisation'],
    seoStrategy: 'Bottom-funnel comparison and alternative pages, integration pages, use-case content clusters',
    contentIdeas: ['Technical how-to guides', 'Comparison posts', 'Product-led SEO content'],
    leadMagnet: 'ROI calculator, benchmark report, free audit offer',
    caseStudyIdea: 'Pipeline and MRR growth story tied to a specific SEO or content initiative',
    primaryServices: ['seo-services', 'content-marketing', 'growth-consulting', 'conversion-rate-optimisation'],
  },
  {
    slug: 'it-companies',
    name: 'IT Companies',
    nameDe: 'IT-Dienstleister',
    icon: 'Server',
    buyerPersona: 'IT services founders, managed service provider owners, CTOs',
    painPoints: [
      'Differentiating in a commoditised market where every competitor claims the same',
      'Generating enterprise-grade trust signals as a mid-sized provider',
      'Marketing that speaks credibly to technical buyers',
    ],
    servicesRequired: ['SEO', 'LinkedIn thought leadership', 'Case-study driven content', 'Paid lead generation'],
    seoStrategy: 'Service and industry clusters such as "IT support for law firms", technical authority content',
    contentIdeas: ['Security and compliance explainers', 'Technical thought leadership'],
    leadMagnet: 'IT readiness checklist, security audit offer',
    caseStudyIdea: 'Uptime and security-incident-reduction story for a client engagement',
    primaryServices: ['seo-services', 'content-marketing', 'growth-consulting', 'analytics-reporting'],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    nameDe: 'Maschinen- und Anlagenbau',
    icon: 'Factory',
    buyerPersona: 'Plant managers, manufacturing marketing leads, B2B sales directors',
    painPoints: [
      'Long, technical sales cycles that resist conventional funnels',
      'Limited existing digital presence to build from',
      'Niche audience size making broad channels wasteful',
    ],
    servicesRequired: ['SEO for spec-driven search', 'LinkedIn ABM', 'Trade-show digital support'],
    seoStrategy: 'Product-spec and application-specific content, supplier-directory optimisation',
    contentIdeas: ['Application and use-case guides', 'Spec-sheet supporting content', 'Industry trend reports'],
    leadMagnet: 'Spec comparison guide, RFQ-readiness checklist',
    caseStudyIdea: 'New-account acquisition story tied to improved digital presence',
    primaryServices: ['seo-services', 'process-automation', 'content-marketing', 'web-design-development'],
  },
  {
    slug: 'construction',
    name: 'Construction',
    nameDe: 'Bauwesen',
    icon: 'HardHat',
    buyerPersona: 'General contractors, construction company owners, project marketing leads',
    painPoints: [
      'Seasonal lead volatility making capacity planning difficult',
      'Project-based sales cycles with long gaps between wins',
      'Intense local competition on the same search terms',
    ],
    servicesRequired: ['Local SEO', 'Project-portfolio website optimisation', 'Paid lead generation'],
    seoStrategy: 'Service and city clusters such as "commercial contractor in [city]", project-gallery schema',
    contentIdeas: ['Project spotlight posts', 'How to choose a contractor guides'],
    leadMagnet: 'Project cost estimate guide, contractor vetting checklist',
    caseStudyIdea: 'Project pipeline growth story for a regional contractor',
    primaryServices: ['seo-services', 'paid-advertising', 'web-design-development', 'branding-creative'],
  },
  {
    slug: 'education',
    name: 'Education',
    nameDe: 'Bildung',
    icon: 'GraduationCap',
    buyerPersona: 'School and institute administrators, ed-tech marketing leads, training providers',
    painPoints: [
      'Enrolment volume tied to narrow admissions windows',
      'Seasonal demand cycles with heavy peaks',
      'Budget scrutiny on every marketing line item',
    ],
    servicesRequired: ['SEO', 'Admissions funnel optimisation', 'Paid lead generation', 'Content marketing'],
    seoStrategy: 'Program-specific pages, "[program] near me" and comparison clusters',
    contentIdeas: ['Program guides', 'Career-outcome content', 'Admissions FAQ'],
    leadMagnet: 'Program brochure download, career-outcomes report',
    caseStudyIdea: 'Enrolment growth story for an intake cycle',
    primaryServices: ['seo-services', 'paid-advertising', 'conversion-rate-optimisation', 'content-marketing'],
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    nameDe: 'Gastgewerbe',
    icon: 'UtensilsCrossed',
    buyerPersona: 'Hotel and resort marketing managers, restaurant group owners',
    painPoints: [
      'OTA dependency and the commission cost that comes with it',
      'Seasonal demand leaving capacity unsold off-peak',
      'Review management across many properties and platforms',
    ],
    servicesRequired: ['Local SEO', 'Direct-booking funnel optimisation', 'Reputation management', 'Paid social'],
    seoStrategy: 'Location and amenity clusters, booking schema, review and rating schema',
    contentIdeas: ['Destination guides', 'Seasonal offer content', 'Event and venue spotlights'],
    leadMagnet: 'Destination guide download, exclusive direct-booking offer',
    caseStudyIdea: 'Direct-booking share increase story reducing OTA dependency',
    primaryServices: ['seo-services', 'social-media-management', 'conversion-rate-optimisation', 'paid-advertising'],
  },
  {
    slug: 'finance',
    name: 'Finance',
    nameDe: 'Finanzwesen',
    icon: 'Landmark',
    buyerPersona: 'Financial advisors, fintech marketing leads, accounting firm partners',
    painPoints: [
      'Trust and compliance constraints on every piece of creative',
      'Long consideration cycles with multiple stakeholders',
      'Differentiation in a category where everyone sounds identical',
    ],
    servicesRequired: ['SEO', 'Compliant content marketing', 'LinkedIn authority building', 'Paid lead generation'],
    seoStrategy: 'Service and audience-specific clusters such as "financial advisor for [audience]"',
    contentIdeas: ['Educational financial-literacy content', 'Compliant case outcome summaries'],
    leadMagnet: 'Financial planning checklist, compliant guide download',
    caseStudyIdea: 'Client acquisition and AUM growth story, compliance-reviewed',
    primaryServices: ['seo-services', 'content-marketing', 'analytics-reporting', 'branding-creative'],
  },
  {
    slug: 'automotive',
    name: 'Automotive',
    nameDe: 'Automotive',
    icon: 'Car',
    buyerPersona: 'Dealership marketing managers, auto service centre owners',
    painPoints: [
      'Inventory-driven marketing complexity that changes weekly',
      'Local competition bidding on identical terms',
      'Service-bay utilisation swinging month to month',
    ],
    servicesRequired: ['Local SEO', 'Inventory feed optimisation', 'Paid lead generation', 'Reputation management'],
    seoStrategy: 'Model and city clusters, service-type local pages, review schema',
    contentIdeas: ['Buying-guide content', 'Maintenance-tips posts', 'Model comparison content'],
    leadMagnet: 'Buying guide download, service discount offer',
    caseStudyIdea: 'Service-bay booking or sales-lead growth story',
    primaryServices: ['seo-services', 'paid-advertising', 'process-automation', 'analytics-reporting'],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    nameDe: 'E-Commerce',
    icon: 'ShoppingBag',
    buyerPersona: 'DTC founders, e-commerce marketing managers',
    painPoints: [
      'Rising CAC compressing contribution margin',
      'Retention and repeat-purchase rate below what the model needs',
      'Platform algorithm dependency creating revenue volatility',
    ],
    servicesRequired: ['SEO', 'Paid social and search', 'CRO', 'Email and retention marketing'],
    seoStrategy: 'Category and product-page optimisation, buying-guide content clusters',
    contentIdeas: ['Buying guides', 'Product comparison content', 'UGC-driven content'],
    leadMagnet: 'Discount-gated email signup, buying guide download',
    caseStudyIdea: 'Revenue and repeat-purchase-rate growth story',
    primaryServices: ['paid-advertising', 'conversion-rate-optimisation', 'seo-services', 'process-automation'],
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    nameDe: 'Professional Services',
    icon: 'Briefcase',
    buyerPersona: 'Consulting firm partners, agency owners, B2B service providers',
    painPoints: [
      'Differentiating expertise when every competitor claims the same depth',
      'Long relationship-driven sales cycles',
      'Referral dependency creating a growth ceiling',
    ],
    servicesRequired: ['SEO', 'Thought-leadership content', 'LinkedIn authority building', 'ABM'],
    seoStrategy: 'Service and industry-specific clusters, authority and expertise content',
    contentIdeas: ['Frameworks and methodology content', 'Industry trend analysis'],
    leadMagnet: 'Framework and methodology guide, benchmark report',
    caseStudyIdea: 'Engagement outcome story with quantified business impact',
    primaryServices: ['content-marketing', 'seo-services', 'growth-consulting', 'branding-creative'],
  },
]

export const industrySlugs = industries.map((i) => i.slug)

export function getIndustryDefinition(slug: string): IndustryDefinition | undefined {
  return industries.find((i) => i.slug === slug)
}

/** Resolves the market-correct vertical name. */
export function resolveIndustryName(
  def: IndustryDefinition,
  countryCode: string
): string {
  return countryCode === 'de' && def.nameDe ? def.nameDe : def.name
}
