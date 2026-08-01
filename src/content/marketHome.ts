import type { CountryCode } from '@/types'
import { marketImages } from '@/config/media'

/**
 * Home-page copy for the art-directed market layout.
 *
 * `src/content/countries.ts` holds the copy for the older global template.
 * This file holds what the market layout needs on top of that: the chrome
 * labels, hero, process and section headings — everything that has to be
 * written in the market's own language for the market's own buyer.
 *
 * Six independently authored records, not one template with a country name
 * interpolated. Germany reads as German throughout, not as translated English,
 * per SRS §7.4.
 *
 * The page body itself (services, case studies, testimonials, posts) is NOT
 * here — it comes from the data layer in `@/lib/data`, which is already
 * per-country and already localised. See `indiaCurated` below for the one
 * exception.
 */

export interface MarketNav {
  home: string
  about: string
  services: string
  industries: string
  cases: string
  blog: string
  contact: string
}

export interface MarketHome {
  nav: MarketNav
  headerCta: string
  hero: {
    eyebrow: string
    headline: string
    headlineAccent: string
    body: string
    primaryCta: string
    secondaryCta: string
    image: string
    imageAlt: string
    assurances: { title: string; description: string }[]
    /** The four cards floating over the hero photograph. */
    metrics: {
      label: string
      value: string
      /** Rendered with an upward trend glyph when present. */
      delta?: string
      note: string
      spark?: boolean
    }[]
  }
  /** The logo/credential strip under the hero. */
  strip: { label: string; items: readonly string[] }
  services: { eyebrow: string; heading: string; subhead: string }
  /** The dark band. Five figures, every one of them checkable. */
  stats: { icon: string; value: string; label: string }[]
  cases: { eyebrow: string; heading: string; viewAll: string }
  process: {
    eyebrow: string
    heading: string
    steps: { icon: string; title: string; description: string }[]
  }
  testimonials: { eyebrow: string; heading: string }
  blog: { eyebrow: string; heading: string; viewAll: string }
  closing: { heading: string; body: string; button: string }
  footer: {
    blurb: string
    quickLinks: string
    ourServices: string
    industriesTitle: string
    contact: string
    copyright: string
    privacy: string
    terms: string
  }
  ui: {
    learnMore: string
    viewCaseStudy: string
    readMore: string
    ratedFive: string
    prev: string
    next: string
  }
}

export const marketHome: Record<CountryCode, MarketHome> = {
  // ─────────────────────────────────────────────────────────────
  // INDIA — transcribed from the approved comp. Unlike the other five
  // markets, the figures and client names here are the client's own
  // supplied content rather than the repository's placeholder data.
  // ─────────────────────────────────────────────────────────────
  'in': {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      industries: 'Industries',
      cases: 'Case Studies',
      blog: 'Blog',
      contact: 'Contact Us',
    },
    headerCta: 'Get a Free Strategy Call',
    hero: {
      eyebrow: 'Digital Marketing Agency in Delhi NCR',
      headline: 'Digital Strategies.',
      headlineAccent: 'Real Results.',
      body: 'We help brands in Delhi NCR and beyond grow with performance-driven digital marketing that delivers leads, builds visibility and maximizes ROI.',
      primaryCta: 'Get Free Strategy Call',
      secondaryCta: 'Explore Services',
      image: marketImages['in'].hero,
      imageAlt:
        'The Ft. Social Crew campaign team reviewing performance dashboards together',
      assurances: [
        { title: 'Result Driven', description: 'Focused on measurable growth & ROI' },
        { title: 'Customized Strategy', description: 'Tailored strategies for your business goals' },
        { title: 'Transparent Reporting', description: 'Real-time reports with complete transparency' },
        { title: 'ROI Focused', description: 'Every campaign optimized for better returns' },
      ],
      metrics: [
        { label: 'Leads Generated', value: '12,540', delta: '32.5%', note: 'this month', spark: true },
        { label: 'ROAS', value: '4.8x', delta: '26%', note: 'this month' },
        { label: 'Revenue Growth', value: '₹48.7L', delta: '28.4%', note: 'this month' },
        { label: 'Active Campaigns', value: '24', note: 'Running Now' },
      ],
    },
    strip: {
      label: 'Brands we work with',
      items: [
        'MAX Healthcare',
        'CARRARO',
        'SKYJUMPP',
        'RATTAN INDIA',
        'Dr. Morepen',
        'BAJAJ FINSERV',
        'TATA',
        'acer',
        'POLYCAB',
      ],
    },
    services: {
      eyebrow: 'What we do',
      heading: '360° Digital Marketing Services',
      subhead:
        'End-to-end solutions to grow your brand, generate leads and maximize ROI.',
    },
    stats: [
      { icon: 'shield', value: '350+', label: 'Projects Delivered' },
      { icon: 'users', value: '150+', label: 'Happy Clients' },
      { icon: 'heart', value: '₹50Cr+', label: 'Revenue Generated' },
      { icon: 'building', value: '8+', label: 'Years of Experience' },
      { icon: 'lock', value: '98%', label: 'Client Retention Rate' },
    ],
    cases: {
      eyebrow: 'Case Studies',
      heading: 'Real Results. Real Impact.',
      viewAll: 'View All Case Studies',
    },
    process: {
      eyebrow: 'Our Process',
      heading: 'A Proven Process for Predictable Growth',
      steps: [
        { icon: 'shield', title: 'Discover', description: 'Understand your business, objectives and target audience.' },
        { icon: 'users', title: 'Strategize', description: 'Create a customized strategy tailored to your goals.' },
        { icon: 'target', title: 'Execute', description: 'Launch data-driven campaigns that deliver results.' },
        { icon: 'chart', title: 'Optimize', description: 'Continuously analyze and optimize for maximum ROI.' },
        { icon: 'scale', title: 'Scale', description: 'Scale what works and drive sustainable growth.' },
      ],
    },
    testimonials: {
      eyebrow: 'What our clients say',
      heading: 'Trusted by Businesses, Loved by Clients',
    },
    blog: {
      eyebrow: 'From our blog',
      heading: 'Latest Insights & Updates',
      viewAll: 'View All Blogs',
    },
    closing: {
      heading: 'Ready to Grow Your Business?',
      body: "Let's build a strategy that drives real results for your brand.",
      button: 'Get Free Strategy Call',
    },
    footer: {
      blurb:
        'A leading digital marketing agency in Delhi NCR, helping businesses grow with data-driven strategies and creative solutions.',
      quickLinks: 'Quick Links',
      ourServices: 'Our Services',
      industriesTitle: 'Industries',
      contact: 'Contact Us',
      copyright: '© 2024 FT Social Crew. All Rights Reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
    },
    ui: {
      learnMore: 'Learn More',
      viewCaseStudy: 'View Case Study',
      readMore: 'Read More',
      ratedFive: 'Rated 5 out of 5',
      prev: 'Previous testimonial',
      next: 'Next testimonial',
    },
  },

  // ─────────────────────────────────────────────────────────────
  // UNITED STATES — SRS §2.2: the buyer is comparing us against hiring a
  // VP of Marketing, and is saturated with generic agency language.
  // Tone: sharp, benchmark-led, cost-of-alternative framing.
  // ─────────────────────────────────────────────────────────────
  'en-us': {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      industries: 'Industries',
      cases: 'Case Studies',
      blog: 'Blog',
      contact: 'Contact Us',
    },
    headerCta: 'Book a Growth Audit',
    hero: {
      eyebrow: 'Growth Consulting Firm · United States',
      headline: 'Senior Growth Leadership.',
      headlineAccent: 'Without the Hire.',
      body: 'A named strategist, operator and analyst from week one — benchmarked against 140 comparable growth programmes, on thirty days’ notice with no severance exposure.',
      primaryCta: 'Book a Growth Audit',
      secondaryCta: 'Compare to a Full-Time Hire',
      image: marketImages['en-us'].hero,
      imageAlt: 'A fractional growth team working through pipeline data with a client',
      assurances: [
        { title: 'Benchmarked', description: 'Against 140 comparable growth programmes' },
        { title: 'Named Team', description: 'Strategist, operator and analyst from week one' },
        { title: 'Documented Decisions', description: 'Yours to keep if you take it in-house' },
        { title: 'Thirty-Day Exit', description: 'No lock-in, no severance exposure' },
      ],
      metrics: [
        { label: 'VP Marketing Cost', value: '$220K', note: 'Median, fully loaded' },
        { label: 'Time to Hire One', value: '4 mo', note: 'Industry average' },
        { label: 'Our First Deliverable', value: '2 wk', note: 'From kickoff' },
        { label: 'Notice Period', value: '30 d', note: 'No severance' },
      ],
    },
    strip: {
      label: 'Sectors we run growth programmes in',
      items: [
        'B2B SAAS',
        'E-COMMERCE',
        'PROFESSIONAL SERVICES',
        'IT SERVICES',
        'FINANCE',
        'HEALTHCARE',
        'MANUFACTURING',
        'EDUCATION',
        'REAL ESTATE',
      ],
    },
    services: {
      eyebrow: 'What we do',
      heading: 'One Accountable Team, Every Growth Function',
      subhead:
        'Strategy, execution and analytics under a single accountability — not three vendors optimising their own slice.',
    },
    stats: [
      { icon: 'shield', value: '10', label: 'Core service lines' },
      { icon: 'users', value: '14', label: 'Industry verticals' },
      { icon: 'heart', value: '6', label: 'Markets, one standard' },
      { icon: 'building', value: '2 wk', label: 'To first deliverable' },
      { icon: 'lock', value: '30 d', label: 'Notice, no severance' },
    ],
    cases: {
      eyebrow: 'Case Studies',
      heading: 'Numbers With the Working Attached.',
      viewAll: 'View All Case Studies',
    },
    process: {
      eyebrow: 'Our Process',
      heading: 'A Documented Method, Not a Sales Cycle',
      steps: [
        { icon: 'shield', title: 'Diagnose', description: 'Find where growth is actually constrained, not where it is easiest to sell.' },
        { icon: 'users', title: 'Benchmark', description: 'Compare your numbers against 140 comparable programmes.' },
        { icon: 'target', title: 'Execute', description: 'Run delivery in defined cycles with leading indicators reported throughout.' },
        { icon: 'chart', title: 'Measure', description: 'Report blended CAC and payback, never channel-flattering ROAS.' },
        { icon: 'scale', title: 'Compound', description: 'Reinvest what works, retire what does not, document both.' },
      ],
    },
    testimonials: {
      eyebrow: 'What our clients say',
      heading: 'In Their Words, Not Ours',
    },
    blog: {
      eyebrow: 'From our blog',
      heading: 'Latest Insights & Updates',
      viewAll: 'View All Blogs',
    },
    closing: {
      heading: 'Ready to See Where Growth Is Constrained?',
      body: 'A scoped audit, a written diagnosis and a roadmap you own outright.',
      button: 'Book a Growth Audit',
    },
    footer: {
      blurb:
        'A growth consulting firm giving US companies senior strategy, execution and analytics as one fractional team — benchmarked, documented and accountable.',
      quickLinks: 'Quick Links',
      ourServices: 'Our Services',
      industriesTitle: 'Industries',
      contact: 'Contact Us',
      copyright: '© 2026 Ft. Social Crew. All Rights Reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
    },
    ui: {
      learnMore: 'Learn More',
      viewCaseStudy: 'View Case Study',
      readMore: 'Read More',
      ratedFive: 'Rated 5 out of 5',
      prev: 'Previous testimonial',
      next: 'Next testimonial',
    },
  },

  // ─────────────────────────────────────────────────────────────
  // CANADA — SRS §2.2: buyers frame vendor relationships as long-term
  // transformation partnerships and respond poorly to sales-forward
  // language. Tone: consultative, phased, bilingual-aware.
  // ─────────────────────────────────────────────────────────────
  'en-ca': {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      industries: 'Industries',
      cases: 'Case Studies',
      blog: 'Blog',
      contact: 'Contact Us',
    },
    headerCta: 'Book a Consultation',
    hero: {
      eyebrow: 'Digital Transformation Partner · Canada',
      headline: 'Transformation in Phases.',
      headlineAccent: 'Each One Complete.',
      body: 'We work with Canadian mid-market organisations as a long-term transformation partner — phased delivery, bilingual EN/FR capability, and a documented handover so your team owns the capability afterwards.',
      primaryCta: 'Book a Consultation',
      secondaryCta: 'Read the Transformation Guide',
      image: marketImages['en-ca'].hero,
      imageAlt: 'A transformation programme review session with a Canadian client team',
      assurances: [
        { title: 'Readiness First', description: 'Assessed before any spend is recommended' },
        { title: 'Phased Delivery', description: 'Each phase standalone and complete' },
        { title: 'Bilingual EN/FR', description: 'Where Quebec matters to your market' },
        { title: 'Owned Handover', description: 'Runbooks and training so your team runs it' },
      ],
      metrics: [
        { label: 'Canadian Metros', value: '4', note: 'Served directly' },
        { label: 'Language Capability', value: 'EN/FR', note: 'Where Quebec matters' },
        { label: 'Programme Horizon', value: '18–36', note: 'Months, typical' },
        { label: 'Engagement Terms', value: 'CA$', note: 'Transparent CAD' },
      ],
    },
    strip: {
      label: 'Sectors we run transformation programmes in',
      items: [
        'MANUFACTURING',
        'PROFESSIONAL SERVICES',
        'E-COMMERCE',
        'FINANCE',
        'HEALTHCARE',
        'EDUCATION',
        'CONSTRUCTION',
        'IT SERVICES',
        'AUTOMOTIVE',
      ],
    },
    services: {
      eyebrow: 'What we do',
      heading: 'Capabilities Built to Be Handed Over',
      subhead:
        'Every engagement is scoped so that your team can operate the capability independently when the programme ends.',
    },
    stats: [
      { icon: 'shield', value: '10', label: 'Core service lines' },
      { icon: 'users', value: '14', label: 'Industry verticals' },
      { icon: 'heart', value: '4', label: 'Canadian metros served' },
      { icon: 'building', value: 'EN/FR', label: 'Bilingual capability' },
      { icon: 'lock', value: '18–36', label: 'Month programme horizon' },
    ],
    cases: {
      eyebrow: 'Case Studies',
      heading: 'Programmes, Phase by Phase.',
      viewAll: 'View All Case Studies',
    },
    process: {
      eyebrow: 'Our Process',
      heading: 'A Structured Path From Readiness to Ownership',
      steps: [
        { icon: 'shield', title: 'Assess', description: 'Establish readiness across data, channels, process and team.' },
        { icon: 'users', title: 'Plan', description: 'Agree a phased roadmap where every phase stands on its own.' },
        { icon: 'target', title: 'Deliver', description: 'Implement one phase at a time with defined acceptance.' },
        { icon: 'chart', title: 'Validate', description: 'Measure each phase against the outcome agreed before it started.' },
        { icon: 'scale', title: 'Hand Over', description: 'Runbooks, training and documentation so your team owns it.' },
      ],
    },
    testimonials: {
      eyebrow: 'What our clients say',
      heading: 'Partnerships, Not Engagements',
    },
    blog: {
      eyebrow: 'From our blog',
      heading: 'Latest Insights & Updates',
      viewAll: 'View All Blogs',
    },
    closing: {
      heading: 'Ready to Assess Where You Stand?',
      body: 'A structured readiness review across data, channels, process and team.',
      button: 'Book a Consultation',
    },
    footer: {
      blurb:
        'A digital transformation partner for Canadian mid-market organisations — phased delivery, bilingual capability and a documented handover in every programme.',
      quickLinks: 'Quick Links',
      ourServices: 'Our Services',
      industriesTitle: 'Industries',
      contact: 'Contact Us',
      copyright: '© 2026 Ft. Social Crew. All Rights Reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
    },
    ui: {
      learnMore: 'Learn More',
      viewCaseStudy: 'View Case Study',
      readMore: 'Read More',
      ratedFive: 'Rated 5 out of 5',
      prev: 'Previous testimonial',
      next: 'Next testimonial',
    },
  },

  // ─────────────────────────────────────────────────────────────
  // AUSTRALIA — SRS §2.2: highly ROI- and performance-literate from a
  // mature paid-media culture. Tone: plain, numerate, anti-vanity-metric.
  // ─────────────────────────────────────────────────────────────
  'en-au': {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      industries: 'Industries',
      cases: 'Case Studies',
      blog: 'Blog',
      contact: 'Contact Us',
    },
    headerCta: 'Get Your ROI Projection',
    hero: {
      eyebrow: 'Performance Marketing Partner · Australia',
      headline: 'Blended CAC.',
      headlineAccent: 'Not Channel ROAS.',
      body: 'We manage Australian growth programmes against contribution margin and payback period — with the full model held in your own spreadsheet, so every figure we report can be checked.',
      primaryCta: 'Get Your ROI Projection',
      secondaryCta: 'Open the ROI Calculator',
      image: marketImages['en-au'].hero,
      imageAlt: 'A performance marketing team reviewing contribution margin modelling',
      assurances: [
        { title: 'Blended CAC', description: 'Reported honestly, not channel-flattering ROAS' },
        { title: 'Open Model', description: 'You hold the spreadsheet, you check the maths' },
        { title: 'Flagged Early', description: 'Underperformance raised the month it happens' },
        { title: 'AUD Pricing', description: 'No conversion or FX surprises' },
      ],
      metrics: [
        { label: 'Reported Metric', value: 'Blended', note: 'CAC, not channel ROAS' },
        { label: 'The Model', value: 'Open', note: 'You hold the spreadsheet' },
        { label: 'Capital Cities', value: '4', note: 'Served directly' },
        { label: 'Pricing', value: 'A$', note: 'No FX surprises' },
      ],
    },
    strip: {
      label: 'Sectors we run performance programmes in',
      items: [
        'E-COMMERCE',
        'HOSPITALITY',
        'PROFESSIONAL SERVICES',
        'CONSTRUCTION',
        'HEALTHCARE',
        'EDUCATION',
        'REAL ESTATE',
        'AUTOMOTIVE',
        'RETAIL',
      ],
    },
    services: {
      eyebrow: 'What we do',
      heading: 'Every Channel, Measured the Same Way',
      subhead:
        'Ten service lines run against one set of numbers — contribution margin, blended CAC and payback period.',
    },
    stats: [
      { icon: 'shield', value: '10', label: 'Core service lines' },
      { icon: 'users', value: '14', label: 'Industry verticals' },
      { icon: 'heart', value: '4', label: 'Capital cities served' },
      { icon: 'building', value: 'Open', label: 'Model, held by you' },
      { icon: 'lock', value: 'A$', label: 'AUD pricing, no FX surprises' },
    ],
    cases: {
      eyebrow: 'Case Studies',
      heading: 'Figures You Can Audit Yourself.',
      viewAll: 'View All Case Studies',
    },
    process: {
      eyebrow: 'Our Process',
      heading: 'A Method Built Around Contribution Margin',
      steps: [
        { icon: 'shield', title: 'Baseline', description: 'Establish real blended CAC before recommending any spend.' },
        { icon: 'users', title: 'Model', description: 'Build the contribution margin model in your own spreadsheet.' },
        { icon: 'target', title: 'Execute', description: 'Run channels against the model, not against vanity metrics.' },
        { icon: 'chart', title: 'Review', description: 'Flag underperformance the month it happens, not at quarter end.' },
        { icon: 'scale', title: 'Scale', description: 'Push budget only where payback period actually holds.' },
      ],
    },
    testimonials: {
      eyebrow: 'What our clients say',
      heading: 'Trusted by Australian Operators',
    },
    blog: {
      eyebrow: 'From our blog',
      heading: 'Latest Insights & Updates',
      viewAll: 'View All Blogs',
    },
    closing: {
      heading: 'Want the ROI Projection Before You Commit?',
      body: 'Model blended CAC, contribution margin and payback across your channel mix first.',
      button: 'Get Your ROI Projection',
    },
    footer: {
      blurb:
        'A performance marketing partner for Australian businesses — managed against contribution margin and payback, with the model held in your own spreadsheet.',
      quickLinks: 'Quick Links',
      ourServices: 'Our Services',
      industriesTitle: 'Industries',
      contact: 'Contact Us',
      copyright: '© 2026 Ft. Social Crew. All Rights Reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
    },
    ui: {
      learnMore: 'Learn More',
      viewCaseStudy: 'View Case Study',
      readMore: 'Read More',
      ratedFive: 'Rated 5 out of 5',
      prev: 'Previous testimonial',
      next: 'Next testimonial',
    },
  },

  // ─────────────────────────────────────────────────────────────
  // DEUTSCHLAND — SRS §2.2 / §7.4: German B2B buying culture prioritises
  // process rigour and engineering credibility over marketing flourish.
  // Written in German throughout, not translated from the English record.
  // ─────────────────────────────────────────────────────────────
  'de': {
    nav: {
      home: 'Startseite',
      about: 'Über uns',
      services: 'Leistungen',
      industries: 'Branchen',
      cases: 'Referenzen',
      blog: 'Blog',
      contact: 'Kontakt',
    },
    headerCta: 'Prozessanalyse anfordern',
    hero: {
      eyebrow: 'Business Process Automation · Deutschland',
      headline: 'Prozesse, die dokumentiert',
      headlineAccent: 'und reproduzierbar sind.',
      body: 'Wir analysieren, automatisieren und dokumentieren Marketing- und Vertriebsprozesse im Mittelstand — nach fester Vorgehensweise, mit vollständiger Übergabe und DSGVO-konformer Verarbeitung innerhalb der EU.',
      primaryCta: 'Prozessanalyse anfordern',
      secondaryCta: 'Whitepaper herunterladen',
      image: marketImages['de'].hero,
      imageAlt: 'Prozessaufnahme und Architekturabstimmung mit einem Kundenteam',
      assurances: [
        { title: 'Dokumentierte Aufnahme', description: 'Ist-Prozess inklusive aller Schnittstellen' },
        { title: 'Referenzarchitektur', description: 'Abgenommen vor der Implementierung' },
        { title: 'DSGVO-konform', description: 'Verarbeitung ausschließlich in der EU' },
        { title: 'Vollständige Übergabe', description: 'Betriebshandbuch und Schulung inklusive' },
      ],
      metrics: [
        { label: 'Standorte', value: '4', note: 'In Deutschland' },
        { label: 'Datenverarbeitung', value: 'DSGVO', note: 'Ausschließlich in der EU' },
        { label: 'Prozessübergabe', value: '100 %', note: 'Dokumentiert' },
        { label: 'Preismodell', value: '€', note: 'Transparente Festpreisphasen' },
      ],
    },
    strip: {
      label: 'Branchen, in denen wir Projekte umsetzen',
      items: [
        'MASCHINENBAU',
        'IT-DIENSTLEISTUNG',
        'E-COMMERCE',
        'FINANZWESEN',
        'GESUNDHEITSWESEN',
        'BILDUNG',
        'BAUWESEN',
        'AUTOMOTIVE',
        'PROFESSIONAL SERVICES',
      ],
    },
    services: {
      eyebrow: 'Leistungen',
      heading: 'Zehn Leistungsbereiche, eine Vorgehensweise',
      subhead:
        'Jeder Bereich folgt demselben Ablauf: Ist-Aufnahme, Zielarchitektur, phasenweise Implementierung, dokumentierte Übergabe.',
    },
    stats: [
      { icon: 'shield', value: '10', label: 'Leistungsbereiche' },
      { icon: 'users', value: '14', label: 'Branchen' },
      { icon: 'heart', value: '4', label: 'Standorte in Deutschland' },
      { icon: 'building', value: 'DSGVO', label: 'Konforme Verarbeitung in der EU' },
      { icon: 'lock', value: '100 %', label: 'Dokumentierte Prozessübergabe' },
    ],
    cases: {
      eyebrow: 'Referenzen',
      heading: 'Nachvollziehbare Ergebnisse.',
      viewAll: 'Alle Referenzen ansehen',
    },
    process: {
      eyebrow: 'Vorgehensweise',
      heading: 'Erst der Prozess. Dann die Architektur. Dann die Werkzeuge.',
      steps: [
        { icon: 'shield', title: 'Ist-Aufnahme', description: 'Vollständige Erfassung inklusive Schnittstellen und Fehlerquellen.' },
        { icon: 'users', title: 'Zielarchitektur', description: 'Datenflüsse, Fehlerbehandlung und Überwachung vorab definiert.' },
        { icon: 'target', title: 'Implementierung', description: 'Umsetzung in abgegrenzten Phasen mit dokumentierter Abnahme.' },
        { icon: 'chart', title: 'Überwachung', description: 'Monitoring und Fehlerbehandlung im laufenden Betrieb.' },
        { icon: 'scale', title: 'Übergabe', description: 'Betriebshandbuch und Schulung für den eigenständigen Betrieb.' },
      ],
    },
    testimonials: {
      eyebrow: 'Kundenstimmen',
      heading: 'Rückmeldungen aus laufenden Projekten',
    },
    blog: {
      eyebrow: 'Aus unserem Blog',
      heading: 'Aktuelle Beiträge und Analysen',
      viewAll: 'Alle Beiträge ansehen',
    },
    closing: {
      heading: 'Bereit für die Prozessaufnahme?',
      body: 'Strukturierte Analyse des Ist-Zustands mit priorisierten Automatisierungspotenzialen.',
      button: 'Prozessanalyse anfordern',
    },
    footer: {
      blurb:
        'Unternehmen für Prozessautomatisierung und Digital Engineering im Mittelstand — dokumentierte Vorgehensweise, vollständige Übergabe, DSGVO-konforme Verarbeitung in der EU.',
      quickLinks: 'Schnellzugriff',
      ourServices: 'Leistungen',
      industriesTitle: 'Branchen',
      contact: 'Kontakt',
      copyright: '© 2026 Ft. Social Crew. Alle Rechte vorbehalten.',
      privacy: 'Datenschutz',
      terms: 'AGB',
    },
    ui: {
      learnMore: 'Mehr erfahren',
      viewCaseStudy: 'Referenz ansehen',
      readMore: 'Weiterlesen',
      ratedFive: 'Mit 5 von 5 bewertet',
      prev: 'Vorherige Kundenstimme',
      next: 'Nächste Kundenstimme',
    },
  },

  // ─────────────────────────────────────────────────────────────
  // UAE — SRS §2.2: Dubai and Abu Dhabi enterprise and government-adjacent
  // buyers associate premium positioning and technology fluency with
  // credibility. Tone: senior, discreet, advisory-led.
  // ─────────────────────────────────────────────────────────────
  'en-ae': {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      industries: 'Industries',
      cases: 'Case Studies',
      blog: 'Blog',
      contact: 'Contact Us',
    },
    headerCta: 'Request a Consultation',
    hero: {
      eyebrow: 'Growth & Technology Consulting · United Arab Emirates',
      headline: 'Senior Advisory.',
      headlineAccent: 'Real Delivery.',
      body: 'We advise enterprise and government-adjacent organisations across Dubai and Abu Dhabi — senior consultants engaged throughout, combining strategic advisory with the capability to implement inside your existing systems landscape.',
      primaryCta: 'Request a Consultation',
      secondaryCta: 'View Enterprise Engagements',
      image: marketImages['en-ae'].hero,
      imageAlt: 'A senior advisory session with an enterprise client team in Dubai',
      assurances: [
        { title: 'Senior Throughout', description: 'Consultants engaged for the whole programme' },
        { title: 'Advisory + Delivery', description: 'Grounded in real implementation capability' },
        { title: 'Discretion as Standard', description: 'Confidentiality across every engagement' },
        { title: 'AED Terms', description: 'Local engagement terms with defined milestones' },
      ],
      metrics: [
        { label: 'Emirates Served', value: 'Dubai', note: '& Abu Dhabi' },
        { label: 'Client Profile', value: 'Enterprise', note: 'And government-adjacent' },
        { label: 'Engagement Model', value: 'Advisory', note: '+ delivery capability' },
        { label: 'Terms', value: 'AED', note: 'Local engagement terms' },
      ],
    },
    strip: {
      label: 'Sectors we advise',
      items: [
        'REAL ESTATE',
        'HOSPITALITY',
        'PROFESSIONAL SERVICES',
        'FINANCE',
        'HEALTHCARE',
        'EDUCATION',
        'CONSTRUCTION',
        'IT SERVICES',
        'RETAIL',
      ],
    },
    services: {
      eyebrow: 'What we do',
      heading: 'Advisory That Comes With Delivery Capability',
      subhead:
        'Ten service lines delivered by senior consultants who stay engaged from strategy through to implementation.',
    },
    stats: [
      { icon: 'shield', value: '10', label: 'Core service lines' },
      { icon: 'users', value: '14', label: 'Industry verticals' },
      { icon: 'heart', value: '2', label: 'Emirates served' },
      { icon: 'building', value: 'Senior', label: 'Consultants throughout' },
      { icon: 'lock', value: 'AED', label: 'Local engagement terms' },
    ],
    cases: {
      eyebrow: 'Case Studies',
      heading: 'Engagements and Their Outcomes.',
      viewAll: 'View All Case Studies',
    },
    process: {
      eyebrow: 'Our Process',
      heading: 'From Advisory Position to Implemented Capability',
      steps: [
        { icon: 'shield', title: 'Brief', description: 'Establish the commercial objective and the constraints around it.' },
        { icon: 'users', title: 'Advise', description: 'Senior consultants set the position before any build begins.' },
        { icon: 'target', title: 'Implement', description: 'Deliver inside your existing systems landscape, not alongside it.' },
        { icon: 'chart', title: 'Govern', description: 'Report against defined milestones with executive visibility.' },
        { icon: 'scale', title: 'Extend', description: 'Expand scope only where the previous phase has proven out.' },
      ],
    },
    testimonials: {
      eyebrow: 'What our clients say',
      heading: 'Trusted Across the Emirates',
    },
    blog: {
      eyebrow: 'From our blog',
      heading: 'Latest Insights & Updates',
      viewAll: 'View All Blogs',
    },
    closing: {
      heading: 'Ready to Discuss an Engagement?',
      body: 'A confidential conversation about your priorities, with senior consultants in the room.',
      button: 'Request a Consultation',
    },
    footer: {
      blurb:
        'Business growth and technology consulting for enterprise and government-adjacent organisations across the UAE — senior advisory paired with real delivery capability.',
      quickLinks: 'Quick Links',
      ourServices: 'Our Services',
      industriesTitle: 'Industries',
      contact: 'Contact Us',
      copyright: '© 2026 Ft. Social Crew. All Rights Reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
    },
    ui: {
      learnMore: 'Learn More',
      viewCaseStudy: 'View Case Study',
      readMore: 'Read More',
      ratedFive: 'Rated 5 out of 5',
      prev: 'Previous testimonial',
      next: 'Next testimonial',
    },
  },
}

/**
 * India's page body, transcribed from the approved comp.
 *
 * The other five markets render the repository's own per-country data from
 * `@/lib/data`, which is deliberately anonymised — case-study clients read
 * "Confidential — {sector}" and every testimonial carries `isPlaceholder`.
 * India is the one market where the client supplied named brands and specific
 * figures, so it renders those instead.
 *
 * NOTE(client) — these client names render as styled wordmarks, not licensed
 * logo artwork, and the figures and attributions still need sign-off before
 * they are presented as verified claims.
 */
export const indiaCurated = {
  services: [
    { icon: 'megaphone', title: 'Social Media Marketing', description: 'Build brand awareness and engage your audience on social platforms.', slug: 'social-media-management' },
    { icon: 'search', title: 'Search Engine Optimization', description: 'Improve rankings, get discovered and drive organic traffic.', slug: 'seo-services' },
    { icon: 'target', title: 'Google Ads & PPC', description: 'Run targeted ad campaigns that bring high-quality leads and ROI.', slug: 'paid-advertising' },
    { icon: 'pen', title: 'Content Marketing', description: 'Compelling content that connects, converts and builds authority.', slug: 'content-marketing' },
    { icon: 'chart', title: 'Performance Marketing', description: 'Data-driven campaigns focused on measurable results and ROI.', slug: 'growth-consulting' },
    { icon: 'pie', title: 'Analytics & Reporting', description: 'Track performance with insightful reports and smart analytics.', slug: 'analytics-reporting' },
  ],
  cases: [
    {
      client: 'Dr. Morepen',
      industry: 'Healthcare',
      results: [
        { value: '215%', label: 'Increase in Leads' },
        { value: '4.2x', label: 'ROAS Achieved' },
        { value: '180%', label: 'Revenue Growth' },
      ],
    },
    {
      client: 'SKYJUMPP',
      industry: 'Real Estate',
      results: [
        { value: '163%', label: 'Increase in Leads' },
        { value: '3.8x', label: 'ROAS Achieved' },
        { value: '140%', label: 'Sales Growth' },
      ],
    },
    {
      client: 'RATTAN INDIA',
      industry: 'E-commerce',
      results: [
        { value: '220%', label: 'Increase in Traffic' },
        { value: '5.1x', label: 'ROAS Achieved' },
        { value: '185%', label: 'Revenue Growth' },
      ],
    },
  ],
  testimonials: [
    { quote: 'FT Social Crew has been a game-changer for our business. Their strategies and execution helped us scale our leads and build a strong online presence.', name: 'Dr. Morepen', role: 'Marketing Head', client: 'Dr. Morepen' },
    { quote: 'The team is professional, responsive and truly invested in our growth. Highly recommended for performance marketing!', name: 'Skyjumpp', role: 'Business Head', client: 'SKYJUMPP' },
    { quote: 'Excellent results with Google Ads and SEO. Our revenue has grown consistently since we started working with them.', name: 'RattanIndia', role: 'Digital Head', client: 'RATTAN INDIA' },
    { quote: 'They rebuilt our entire search presence in under two quarters. The reporting is honest, and the numbers hold up when we audit them ourselves.', name: 'Max Healthcare', role: 'Growth Lead', client: 'MAX Healthcare' },
  ],
} as const

/**
 * India's address, line-broken as the comp sets it.
 *
 * Phone and email are NOT here — they live in `src/config/countries.ts` like
 * every other market's, because LocalBusiness and Service schema read that
 * record and structured data has to match what the page displays. This holds
 * the presentation only; the same address is in the country record.
 */
export const indiaAddressLines = [
  '3rd Floor, Plot No. 18,',
  'Sector 5, B Block,',
  'Uttam Nagar, Delhi - 110059',
] as const
