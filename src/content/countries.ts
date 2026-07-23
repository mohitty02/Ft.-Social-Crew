import type { CountryCode } from '@/types'

/**
 * Country homepage content.
 *
 * SRS §3.4 classifies the Country Homepage as "No — hand-crafted per country",
 * and §7.4 requires that the H1 and first 300 words be substantively unique per
 * market, with local proof points, spelling, currency and CTAs.
 *
 * So this is six independently authored records — NOT one template with an
 * interpolated country name. Read any two side by side: the argument itself
 * differs, because the buyer differs (SRS §2.2).
 */

export interface CountryHomeContent {
  /** SRS §2 — positioning must lead in the H1. */
  eyebrow: string
  h1: string
  h1Accent: string
  /** SRS §9.2 GEO — the direct, quotable answer statement near the top. */
  answer: string
  subhead: string
  heroStats: { value: string; label: string }[]
  /** The market-specific argument. SRS §2.2 gives us the reasoning. */
  positioningSection: {
    eyebrow: string
    heading: string
    body: string[]
    points: { title: string; description: string }[]
  }
  proofHeading: string
  proofSubhead: string
  servicesHeading: string
  servicesSubhead: string
  /** SRS §23 — trust signals differ per market. */
  trustHeading: string
  trustPoints: string[]
  ctaHeading: string
  ctaBody: string
  faqs: { question: string; answer: string }[]
}

export const countryHome: Record<CountryCode, CountryHomeContent> = {
  // ─────────────────────────────────────────────────────────────
  // INDIA — SRS §2.2: widen relevance beyond service-category language,
  // signal a strategic engagement to support retainers over project pricing.
  // Tone: ambitious, accessible, service-broad. WhatsApp-first (§15.1).
  // ─────────────────────────────────────────────────────────────
  'in': {
    eyebrow: 'Business Growth Agency · India',
    h1: 'One partner for every part of',
    h1Accent: 'how your business grows',
    answer:
      'Ft. Social Crew is a business growth agency in India that combines SEO, paid media, web, brand and automation under a single retained team — so growth is planned as one system rather than bought as five disconnected services.',
    subhead:
      'Most Indian businesses buy marketing in pieces: an SEO vendor here, a web company there, a freelancer for ads. The pieces never add up. We run all of it as one growth plan, with one team accountable for the number that actually matters to you.',
    heroStats: [
      { value: '10', label: 'Metro & tier-2 cities served' },
      { value: '14', label: 'Industry verticals' },
      { value: '6', label: 'Countries, one standard' },
      { value: '₹', label: 'Transparent INR pricing' },
    ],
    positioningSection: {
      eyebrow: 'Why a growth partner, not a vendor',
      heading: 'A service vendor sells you deliverables. A growth partner owns an outcome.',
      body: [
        'Searching for an "SEO company" or a "website company" gets you exactly that — a specialist who optimises their own slice and hands you a report. Nobody is looking at whether the slices add up to more customers.',
        'We start one level up. What is the business trying to reach, which channels can realistically get it there, and what has to be true across web, search, paid and process for the plan to hold? Then we build and run all of it.',
      ],
      points: [
        {
          title: 'One team, one plan',
          description:
            'SEO, ads, web, content and automation planned together in a single quarterly roadmap — not five vendors optimising in isolation.',
        },
        {
          title: 'City-level targeting',
          description:
            'Metro and tier-2 search behaviour differs sharply. We build city-specific pages and campaigns rather than one national blur.',
        },
        {
          title: 'Transparent INR pricing',
          description:
            'Fixed-price packages published openly, so you can plan a budget without a three-call discovery process first.',
        },
        {
          title: 'WhatsApp-first response',
          description:
            'Business here runs on WhatsApp. So do we — direct access to the people doing the work, not a ticket queue.',
        },
      ],
    },
    proofHeading: 'Results we can show you the working for',
    proofSubhead:
      'Every number below traces to a specific engagement, a specific timeframe and a specific method. Ask us to walk you through any of them.',
    servicesHeading: 'Everything a growing business needs, under one roof',
    servicesSubhead:
      'Ten core services. Take the whole system or the part you are missing — but they are designed to work together.',
    trustHeading: 'Why Indian businesses stay',
    trustPoints: [
      'Transparent INR pricing published on the site — no discovery-call gatekeeping',
      'WhatsApp-first communication with the team actually doing the work',
      'City-specific strategy for metro and tier-2 markets, not one national plan',
      'Monthly reporting tied to pipeline, not to impressions and rankings alone',
    ],
    ctaHeading: 'Tell us what growth is supposed to look like this year',
    ctaBody:
      'A 30-minute conversation, no pitch deck. We will tell you honestly whether we are the right partner for it — and if we are not, who is.',
    faqs: [
      {
        question: 'What does a business growth agency do that a digital marketing agency does not?',
        answer:
          'A digital marketing agency executes channels — SEO, ads, social. A business growth agency starts with the commercial goal, decides which channels can realistically reach it, and then owns the whole system including web, brand, content and process automation. The difference is accountability: for the pipeline, not for the deliverable.',
      },
      {
        question: 'How much does digital marketing cost in India?',
        answer:
          'Our productized packages start from a fixed monthly retainer and scale with scope and the number of cities targeted. Pricing is published transparently on our pricing page in INR, because you should be able to plan a budget before speaking to sales.',
      },
      {
        question: 'Do you work with businesses outside the major metros?',
        answer:
          'Yes. Tier-2 cities often have materially lower competition on the same commercial search terms, which makes them some of the most efficient markets we work in. We build city-specific pages and campaigns for each one rather than applying a single national strategy.',
      },
      {
        question: 'How quickly will we see results?',
        answer:
          'Paid channels produce measurable data within weeks. Organic search compounds over quarters — typically meaningful movement by month three and material pipeline contribution by month six. We report on leading indicators throughout so you are never waiting blind.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // USA — SRS §2.2: buyers are saturated with generic agency messaging and
  // are comparing against hiring a VP of Marketing. Tone: sharp, benchmark-led.
  // ─────────────────────────────────────────────────────────────
  'en-us': {
    eyebrow: 'Growth Consulting Firm · United States',
    h1: 'Senior growth leadership',
    h1Accent: 'without the full-time hire',
    answer:
      'Ft. Social Crew is a growth consulting firm that embeds a fractional growth team into US companies — senior strategy, execution and reporting for a fraction of the cost of a VP of Marketing, with no hiring risk and no twelve-month ramp.',
    subhead:
      'A VP of Marketing costs $220K fully loaded, takes four months to hire and another two to ramp. You get one person\'s judgement. A fractional growth team gives you a strategist, a channel operator and an analyst from week one — and you can end it in thirty days.',
    heroStats: [
      { value: '$220K', label: 'Median loaded cost of a VP Marketing' },
      { value: '4 mo', label: 'Average time to hire one' },
      { value: '2 wk', label: 'Our time to first deliverable' },
      { value: '30 d', label: 'Notice period, no severance' },
    ],
    positioningSection: {
      eyebrow: 'The comparison you are actually making',
      heading: 'You are not choosing between agencies. You are choosing between a hire and a team.',
      body: [
        'Most companies at $2M–$50M do not have a marketing leadership problem they can solve by hiring. They have a range problem: they need strategic judgement, channel execution and analytics rigour simultaneously, and no single hire covers all three well.',
        'The fractional model exists because that is a staffing shape, not a talent shortage. You get the three capabilities as a unit, priced against outcomes rather than headcount, and you keep the option to change your mind.',
      ],
      points: [
        {
          title: 'Fractional, not freelance',
          description:
            'A named strategist, operator and analyst working as one team on a defined scope — with the same continuity as an internal hire.',
        },
        {
          title: 'Benchmarked, not guessed',
          description:
            'CAC, payback and pipeline velocity measured against a 140-company dataset, so you know whether your numbers are actually good.',
        },
        {
          title: 'Documented process',
          description:
            'Every decision, test and result recorded in a shared workspace you keep — including if you take the function in-house later.',
        },
        {
          title: 'Thirty-day exit',
          description:
            'No annual contracts, no severance exposure, no non-performing hire you have to manage out.',
        },
      ],
    },
    proofHeading: 'Outcomes, with the methodology attached',
    proofSubhead:
      'Every figure below comes with the timeframe, the baseline and the attribution model. Numbers without methodology are marketing, not evidence.',
    servicesHeading: 'What the fractional team actually covers',
    servicesSubhead:
      'Ten capability areas. Most engagements activate three to five — the ones your current stack is weakest in.',
    trustHeading: 'How we prove it before you commit',
    trustPoints: [
      'Case studies with real metrics, baselines and attribution models disclosed',
      'Client video testimonials from named operators, not anonymous quotes',
      'Transparent process documentation — you see the method before you buy it',
      'Benchmark report available free, no gate, so you can sanity-check us',
    ],
    ctaHeading: 'Start with a growth audit, not a sales call',
    ctaBody:
      'Ninety minutes, your data, our benchmarks. You leave with a written diagnosis of where your growth is actually constrained — whether or not you work with us.',
    faqs: [
      {
        question: 'What is a fractional growth team?',
        answer:
          'A fractional growth team is a senior strategist, channel operator and analyst engaged part-time as a unit, sharing accountability for a company\'s growth targets. It provides the range of an in-house marketing department at a fraction of the cost, without the hiring timeline or severance exposure of full-time roles.',
      },
      {
        question: 'How does this compare to hiring a VP of Marketing?',
        answer:
          'A VP of Marketing costs roughly $220,000 fully loaded, takes about four months to hire and two more to ramp, and gives you one person\'s skill profile. A fractional growth team starts producing within two weeks, covers strategy, execution and analytics simultaneously, and can be ended on thirty days\' notice. The trade-off is that a VP is yours full-time; we are not.',
      },
      {
        question: 'What does growth consulting cost?',
        answer:
          'Engagements are scoped to the capabilities activated and the pace required, and priced as a monthly retainer. We do not publish a rate card because the honest answer depends on scope — but we will give you a firm number in the first conversation, not the third.',
      },
      {
        question: 'What happens if it is not working?',
        answer:
          'Thirty days\' notice, no severance, no penalty. Everything we have built — documentation, dashboards, playbooks — stays with you. We would rather end an engagement cleanly than defend one that is not producing.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CANADA — SRS §2.2: transformation partnerships over transactions,
  // consultative and less sales-forward than the US. §23.3: consultation
  // booking over hard-sell forms.
  // ─────────────────────────────────────────────────────────────
  'en-ca': {
    eyebrow: 'Digital Transformation Partner · Canada',
    h1: 'Transformation that holds',
    h1Accent: 'after the consultants leave',
    answer:
      'Ft. Social Crew is a digital transformation partner working with Canadian mid-market organisations on multi-year programmes across data, channels, process and capability — designed so the organisation can operate the result without us.',
    subhead:
      'Most transformation work fails quietly. The strategy deck is sound, the pilot goes well, and eighteen months later the organisation has drifted back to how it worked before. We plan for the handover from the first week, because a change that depends on us was never a transformation.',
    heroStats: [
      { value: '4', label: 'Canadian metros served' },
      { value: 'EN/FR', label: 'Bilingual programme capability' },
      { value: '18–36', label: 'Month typical programme horizon' },
      { value: 'CA$', label: 'Transparent CAD engagement terms' },
    ],
    positioningSection: {
      eyebrow: 'How we approach a programme',
      heading: 'Transformation is a capability transfer, not a deliverable.',
      body: [
        'The pattern we see across Canadian mid-market organisations is not a lack of strategy. It is that strategy arrives as a recommendation rather than as an operating change, and the teams expected to run it were never part of building it.',
        'So we work the other way around. Assessment first, jointly with your team. Roadmap agreed rather than presented. Delivery in phases that each produce a working capability your people own. Slower to start, considerably more durable.',
      ],
      points: [
        {
          title: 'Assessment before proposal',
          description:
            'A structured readiness review across data, channels, process and team — before anyone recommends spending anything.',
        },
        {
          title: 'Phased, reversible delivery',
          description:
            'Each phase produces a standalone working capability. If priorities shift, you stop at a complete phase rather than mid-build.',
        },
        {
          title: 'Bilingual where it matters',
          description:
            'EN/FR content and campaign capability for Quebec-facing programmes, built natively rather than translated after the fact.',
        },
        {
          title: 'Documented handover',
          description:
            'Runbooks, dashboards and training so your team operates the result. Continued engagement should be a choice, not a dependency.',
        },
      ],
    },
    proofHeading: 'Programmes and what they changed',
    proofSubhead:
      'Transformation outcomes are slower and less dramatic than campaign metrics. They are also the ones that persist.',
    servicesHeading: 'Capability areas within a transformation programme',
    servicesSubhead:
      'A programme typically spans four to six of these, sequenced by dependency rather than by preference.',
    trustHeading: 'What Canadian organisations tell us matters',
    trustPoints: [
      'CAD-denominated engagement terms with clear phase-level pricing',
      'Canadian client references available before you commit to a programme',
      'Bilingual EN/FR capability for Quebec-facing organisations',
      'Consultation-led process — no pressure to scope before the assessment is done',
    ],
    ctaHeading: 'Begin with a readiness assessment',
    ctaBody:
      'A structured review of where your organisation actually is across data, channels, process and capability. The output is a phased roadmap you own — with no obligation to have us deliver it.',
    faqs: [
      {
        question: 'What does a digital transformation partner do?',
        answer:
          'A digital transformation partner works with an organisation over multiple phases to change how it operates digitally — across data infrastructure, customer channels, internal process and team capability. Unlike a project vendor, the engagement is measured on whether the organisation can sustain the change independently afterwards.',
      },
      {
        question: 'How long does a transformation programme take?',
        answer:
          'Most run eighteen to thirty-six months, delivered in phases of roughly one quarter each. Each phase produces a standalone working capability, so value arrives continuously rather than at the end — and you can pause between phases without leaving anything half-built.',
      },
      {
        question: 'Do you work in French for Quebec-based organisations?',
        answer:
          'Yes. We build bilingual EN/FR programmes natively rather than translating English work after the fact, which matters both for compliance and for how the content actually performs in Quebec search.',
      },
      {
        question: 'How is this priced?',
        answer:
          'Per phase, in CAD, agreed before that phase begins. You are never committing to the full programme cost upfront — and the assessment that precedes phase one is scoped and priced separately so you can stop there if the findings suggest you should.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // AUSTRALIA — SRS §2.2: ROI- and performance-literate from a mature paid
  // media culture. Accountability to metrics over brand promises. §23.4: ROI
  // calculator as the lead magnet.
  // ─────────────────────────────────────────────────────────────
  'en-au': {
    eyebrow: 'Performance Marketing Partner · Australia',
    h1: 'Marketing measured on',
    h1Accent: 'contribution, not clicks',
    answer:
      'Ft. Social Crew is a performance marketing partner for Australian businesses, managing paid and organic channels against contribution margin and payback period — with the full model shared openly, so you can verify every number yourself.',
    subhead:
      'You have worked with agencies before. You know the reporting pattern: impressions up, engagement up, ROAS calculated on last-click and quietly flattering. We report blended CAC, contribution margin and payback — including the months those numbers go the wrong way.',
    heroStats: [
      { value: 'Blended', label: 'CAC, not channel-level ROAS' },
      { value: 'Open', label: 'Model — you hold the spreadsheet' },
      { value: '4', label: 'Capital cities served' },
      { value: 'A$', label: 'AUD pricing, no FX surprises' },
    ],
    positioningSection: {
      eyebrow: 'How we report',
      heading: 'If the metric cannot survive being checked, it is not a metric.',
      body: [
        'Last-click ROAS is the most flattering number in marketing and the least useful. It attributes revenue that would have arrived anyway and hides the channels doing the actual work upstream.',
        'We build a contribution model with you at the start — real margins, real fulfilment costs, real payback expectations. Then every report reads against that model. When a channel is not clearing its cost of capital we say so, because you will find out anyway and it is cheaper to know early.',
      ],
      points: [
        {
          title: 'Contribution margin, not revenue',
          description:
            'Revenue is easy to buy. We optimise against what is actually left after COGS, fulfilment and media — the number your P&L cares about.',
        },
        {
          title: 'You hold the model',
          description:
            'The ROI model lives in your spreadsheet, not our reporting tool. Check our arithmetic any day of the week.',
        },
        {
          title: 'Blended, not channel-flattering',
          description:
            'Blended CAC across all channels, so no single platform gets to claim credit for demand it did not create.',
        },
        {
          title: 'Bad news early',
          description:
            'Underperforming channels get flagged the month it happens, not in the quarterly review after the budget is spent.',
        },
      ],
    },
    proofHeading: 'Numbers you can check',
    proofSubhead:
      'Each figure states the timeframe, the baseline and the attribution method. Any performance claim without those three is not verifiable.',
    servicesHeading: 'Channels and capabilities we run',
    servicesSubhead:
      'Most engagements are three or four of these. We would rather run fewer channels properly than spread a budget thin.',
    trustHeading: 'What accountability looks like in practice',
    trustPoints: [
      'AUD pricing with no currency conversion surprises at invoice',
      'Verifiable ROI metrics — timeframe, baseline and attribution model always disclosed',
      'Australian client references in your industry, available on request',
      'Monthly contribution reporting, including the months it goes backwards',
    ],
    ctaHeading: 'Model the return before you commit the spend',
    ctaBody:
      'Use our ROI calculator with your own margins and volumes. If the numbers do not work, you will know in ten minutes without speaking to anyone.',
    faqs: [
      {
        question: 'What is a performance marketing partner?',
        answer:
          'A performance marketing partner manages acquisition channels against commercial outcomes — cost per acquisition, contribution margin and payback period — rather than against activity metrics like impressions or engagement. The defining characteristic is that the reporting model is agreed upfront and is verifiable by the client.',
      },
      {
        question: 'Why do you report blended CAC instead of channel ROAS?',
        answer:
          'Channel-level ROAS double-counts. Paid search claims conversions that organic and paid social created demand for, so the individual channel numbers add up to more revenue than the business actually made. Blended CAC — total acquisition spend divided by total new customers — is the only figure that cannot be inflated by attribution choices.',
      },
      {
        question: 'How much should we be spending?',
        answer:
          'It depends entirely on your contribution margin and acceptable payback period, which is why we build the model before proposing a budget. Our ROI calculator will get you to a defensible starting range using your own numbers in about ten minutes.',
      },
      {
        question: 'What if a channel stops working?',
        answer:
          'We flag it the month it happens and recommend either a fix or a reallocation. Channels decay — that is normal. Discovering it two quarters late is what costs money.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // GERMANY — SRS §2.2: process rigour, engineering credibility, precision
  // over marketing flourish. Borrows authority from software engineering and
  // industrial automation. §23.5: GDPR clearly stated, native German.
  // ─────────────────────────────────────────────────────────────
  'de': {
    eyebrow: 'Business Process Automation · Deutschland',
    h1: 'Prozesse, die dokumentiert',
    h1Accent: 'und reproduzierbar sind',
    answer:
      'Ft. Social Crew ist ein Unternehmen für Prozessautomatisierung und Digital Engineering, das Marketing- und Vertriebsprozesse im Mittelstand analysiert, automatisiert und dokumentiert — nach einer festen Vorgehensweise mit nachvollziehbaren Ergebnissen.',
    subhead:
      'Automatisierung scheitert selten an der Technologie. Sie scheitert an undokumentierten Prozessen, die niemand vollständig kennt, und an Schnittstellen, die still ausfallen. Wir beginnen deshalb mit der Prozessaufnahme — nicht mit der Werkzeugauswahl.',
    heroStats: [
      { value: '4', label: 'Standorte in Deutschland' },
      { value: 'DSGVO', label: 'Konforme Verarbeitung in der EU' },
      { value: '100 %', label: 'Dokumentierte Prozessübergabe' },
      { value: '€', label: 'Transparente Festpreisphasen' },
    ],
    positioningSection: {
      eyebrow: 'Unsere Vorgehensweise',
      heading: 'Erst die Prozessaufnahme. Dann die Architektur. Dann die Werkzeuge.',
      body: [
        'Die meisten Automatisierungsprojekte beginnen mit einer Softwareentscheidung. Das ist die falsche Reihenfolge: Ein Werkzeug kann einen Prozess nur so gut abbilden, wie dieser vorher verstanden und beschrieben wurde.',
        'Wir nehmen zunächst den Ist-Prozess auf, dokumentieren Schnittstellen, Verantwortlichkeiten und Ausfallpfade, und definieren erst danach die Zielarchitektur. Die Werkzeugauswahl ist das letzte Element — und in der Regel das unkritischste.',
      ],
      points: [
        {
          title: 'Dokumentierte Prozessaufnahme',
          description:
            'Vollständige Erfassung des Ist-Zustands inklusive Schnittstellen, Verantwortlichkeiten und bekannter Fehlerquellen.',
        },
        {
          title: 'Referenzarchitektur',
          description:
            'Zielarchitektur mit definierten Datenflüssen, Fehlerbehandlung und Überwachung — vor der Implementierung abgenommen.',
        },
        {
          title: 'DSGVO-konform ab Entwurf',
          description:
            'Datenverarbeitung ausschließlich in der EU, Auftragsverarbeitungsvertrag und Löschkonzept als Bestandteil der Lieferung.',
        },
        {
          title: 'Nachvollziehbare Übergabe',
          description:
            'Betriebshandbuch, Monitoring und Schulung. Ihr Team betreibt das Ergebnis eigenständig.',
        },
      ],
    },
    proofHeading: 'Projekte und messbare Ergebnisse',
    proofSubhead:
      'Jede Kennzahl nennt Zeitraum, Ausgangswert und Messmethode. Ohne diese drei Angaben ist eine Kennzahl nicht überprüfbar.',
    servicesHeading: 'Leistungsbereiche',
    servicesSubhead:
      'Ein Projekt umfasst typischerweise drei bis fünf dieser Bereiche, sequenziert nach technischer Abhängigkeit.',
    trustHeading: 'Was für den Mittelstand entscheidend ist',
    trustPoints: [
      'DSGVO-konforme Datenverarbeitung ausschließlich innerhalb der EU',
      'Auftragsverarbeitungsvertrag und Löschkonzept als Standardbestandteil',
      'Festpreisphasen in EUR mit definiertem Leistungsumfang',
      'Vollständige Dokumentation und Betriebshandbuch bei Projektabschluss',
    ],
    ctaHeading: 'Beginnen Sie mit einer Prozessanalyse',
    ctaBody:
      'Eine strukturierte Aufnahme Ihrer bestehenden Marketing- und Vertriebsprozesse. Ergebnis ist ein dokumentierter Ist-Zustand mit priorisierten Automatisierungspotenzialen — unabhängig von einer weiteren Zusammenarbeit.',
    faqs: [
      {
        question: 'Was ist Prozessautomatisierung im Marketing?',
        answer:
          'Prozessautomatisierung im Marketing bezeichnet die systematische Überführung manueller, wiederkehrender Abläufe in dokumentierte, überwachte und reproduzierbare technische Prozesse — etwa Lead-Erfassung, Datenanreicherung, CRM-Übergabe und Reporting. Voraussetzung ist eine vollständige Aufnahme des Ist-Prozesses vor der Werkzeugauswahl.',
      },
      {
        question: 'Wie lange dauert ein Automatisierungsprojekt?',
        answer:
          'Die Prozessanalyse dauert je nach Umfang zwei bis vier Wochen. Die anschließende Implementierung erfolgt in Phasen von jeweils sechs bis zehn Wochen, wobei jede Phase einen eigenständig betreibbaren Prozess liefert.',
      },
      {
        question: 'Wie wird die DSGVO-Konformität sichergestellt?',
        answer:
          'Sämtliche Daten werden ausschließlich innerhalb der EU verarbeitet. Auftragsverarbeitungsvertrag, Verzeichnis der Verarbeitungstätigkeiten und Löschkonzept sind fester Bestandteil der Lieferung, nicht optionale Zusatzleistungen.',
      },
      {
        question: 'Arbeiten Sie auf Deutsch?',
        answer:
          'Ja. Sämtliche Kommunikation, Dokumentation und Inhalte werden nativ auf Deutsch erstellt — nicht aus dem Englischen übersetzt. Das gilt auch für die Keyword-Recherche und die Inhaltserstellung.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // UAE — SRS §2.2: premium positioning and technology fluency signal
  // credibility. Strategic seniority + technical capability. §23.6:
  // consultation-first over self-serve pricing, premium visual treatment.
  // ─────────────────────────────────────────────────────────────
  'en-ae': {
    eyebrow: 'Business Growth & Technology Consulting · UAE',
    h1: 'Strategic counsel with',
    h1Accent: 'the capability to build it',
    answer:
      'Ft. Social Crew is a business growth and technology consulting firm serving enterprise and government-adjacent organisations in Dubai and Abu Dhabi — combining strategic advisory with the engineering capability to implement what is recommended.',
    subhead:
      'The gap in most consulting engagements is between the recommendation and the working system. Strategy firms advise and withdraw; implementation partners build without commercial context. We do both, which is why our recommendations tend to be more conservative and considerably more likely to ship.',
    heroStats: [
      { value: 'Dubai', label: '& Abu Dhabi engagements' },
      { value: 'Enterprise', label: 'And government-adjacent' },
      { value: 'Advisory', label: '+ delivery capability' },
      { value: 'AED', label: 'Local engagement terms' },
    ],
    positioningSection: {
      eyebrow: 'Advisory and delivery, held together',
      heading: 'A recommendation you cannot implement is an expensive opinion.',
      body: [
        'Enterprise transformation in this market rarely stalls at the strategy stage. It stalls at the point where a recommendation meets an existing systems landscape, a procurement process and a team with its own commitments.',
        'Because we deliver as well as advise, our recommendations are shaped by that reality from the outset. We know what integration will cost, how long approval will take, and which parts of the plan will survive contact with the organisation.',
      ],
      points: [
        {
          title: 'Senior engagement throughout',
          description:
            'The people in the first meeting are the people on the programme. No handover to a delivery team you have not met.',
        },
        {
          title: 'Advisory with delivery capability',
          description:
            'Strategy grounded in what we can actually build, integrate and operate within your existing systems landscape.',
        },
        {
          title: 'Discretion as standard',
          description:
            'Confidential engagements handled accordingly. Client names are referenced only with explicit written permission.',
        },
        {
          title: 'Regional fluency',
          description:
            'Dubai and Abu Dhabi market knowledge, English and Arabic content consideration, and familiarity with free-zone and government-adjacent procurement.',
        },
      ],
    },
    proofHeading: 'Selected engagements',
    proofSubhead:
      'Several of our most substantial programmes are confidential. What follows is what we are permitted to describe.',
    servicesHeading: 'Advisory and delivery capabilities',
    servicesSubhead:
      'Engagements are scoped individually. Most combine a strategic mandate with two or three delivery capabilities.',
    trustHeading: 'How enterprise clients evaluate us',
    trustPoints: [
      'Enterprise and government-adjacent client references, provided under NDA where required',
      'AED engagement terms with clearly defined scope and milestones',
      'Senior consultants engaged throughout — no handover to unfamiliar delivery teams',
      'English and Arabic content capability for public-facing programmes',
    ],
    ctaHeading: 'Request a confidential consultation',
    ctaBody:
      'An initial discussion with a senior consultant to understand the mandate, the constraints and whether we are the appropriate firm for it. No proposal is prepared until that is clear.',
    faqs: [
      {
        question: 'What does business growth and technology consulting involve?',
        answer:
          'It combines commercial strategy — market positioning, channel economics, growth planning — with the technical capability to implement the resulting systems. The distinction from pure strategy consulting is that recommendations are constrained by what can actually be built, integrated and operated within the client\'s existing environment.',
      },
      {
        question: 'Do you work with government-adjacent organisations?',
        answer:
          'Yes. We have experience with free-zone entities and government-adjacent organisations in both Dubai and Abu Dhabi, including familiarity with the relevant procurement processes and approval timelines.',
      },
      {
        question: 'Why is pricing not published?',
        answer:
          'Enterprise engagements vary too widely in scope for a published rate card to be informative rather than misleading. We establish scope in an initial consultation and provide firm AED pricing before any commitment is required.',
      },
      {
        question: 'Can you provide client references?',
        answer:
          'Yes, subject to permission. A number of our engagements are confidential, but we can generally arrange a reference conversation with a client in a comparable sector once an engagement is under serious consideration.',
      },
    ],
  },
}
