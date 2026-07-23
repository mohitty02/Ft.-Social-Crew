# UNDERSTANDING.md
## Ft. Social Crew — Global Multi-Country Website Platform

**Source of truth:** `Ft_Social_Crew_Global_Website_SRS_and_Growth_Blueprint.pdf` — SRS & Business Growth Blueprint, Version 1.0, 48 pages, read in full (Sections 1–25).
**Visual source:** `WhatsApp Image 2026-07-19 at 12.32.19 PM.jpeg` — "Our Services" brand plate.
**Status:** Pre-development comprehension document. No code written.
**Document classification (per SRS p.1):** Confidential — Internal Planning Document.

> Every statement below is traceable to a section of the SRS. Where a claim is *not* in the PDF, it is explicitly marked **[INFERRED]** and flagged for your approval. Where the build brief and the PDF conflict, the conflict is stated openly in §17 rather than silently resolved.

---

## 1. Business Understanding

Ft. Social Crew is a **digital growth agency scaling into a globally recognised, multi-market business growth and digital transformation partner**, operating from a **single unified web platform** (SRS §1.1).

The central architectural bet of the entire document is this: **one domain, no ccTLDs, subfolder model** (`/in/`, `/en-us/`, `/de/` …) — stated on the SRS cover page under *Domain Architecture* and reinforced in §1.1 and §7.

The commercial logic behind that bet (SRS §1.1, §1.10):

- Link equity, domain trust, and brand signals **compound across every country folder** instead of fragmenting across six separate ccTLD sites that each start SEO from zero.
- A new country becomes a **configuration task, not a development task** — add a country record, assign language/currency, clone templates (SRS §1.2).
- Content and SEO work done once is **multiplied across markets** (SRS §1.4).
- One CMS, one codebase, one analytics stack = **a single source of truth** so governance stays simple as the footprint grows (SRS §1.1).

**Launch markets (6):** India, USA, Canada, Australia, Germany, UAE — "extensible to unlimited countries" (SRS cover, §1.2).

**Time-to-launch for country #7 onward:** ~3–4 weeks once the platform is live (SRS §1.9).

### What this means for the website we are building

The website is not a brochure. Per the SRS it is the **lead-generation and authority engine** — the surface where positioning (§2), topical authority (§9–11), international SEO correctness (§7), and conversion capture (§15) all physically live. Every decision in the execution plan traces back to one of those four jobs.

---

## 2. Vision

> "To be the single most trusted, technically excellent, multi-market growth partner brand on the web — a platform where a prospect in **Sydney, Dubai, or Toronto** finds a page that **feels built specifically for them**, while the business behind it operates as **one lean, unified team**."
> — SRS §1.3, verbatim

**Design implication.** This single sentence is the hardest constraint in the document, and it is a *design* constraint, not a technical one. "Feels built specifically for them" means the Sydney visitor must not be able to detect that they are on a template. That rules out: shared hero copy with a swapped country name, generic stock imagery, a single global testimonial set, and USD pricing with a currency label swapped. It is the reason §7 of this document treats country positioning as a first-class content system rather than a localisation string table.

---

## 3. Mission

> "Build and continuously compound organic visibility, trust, and qualified pipeline in every country we operate in, through a platform architecture that turns content and SEO work done once into value multiplied across markets."
> — SRS §1.4, verbatim

**Three verbs to design against:** *compound* (authority accrues — internal linking, topical clusters, single domain), *trust* (E-E-A-T surfaces on every template), *qualified pipeline* (CRO is not decoration; every template has a conversion job).

---

## 4. Target Audience

Per SRS §1.6, four distinct audiences — each needing a different register:

| Audience | Markets | What they need to see | Register |
|---|---|---|---|
| **SMB & mid-market founders / CMOs** seeking measurable growth | **Primary — all countries** | Proof, price transparency, speed to value | Direct, outcome-led |
| **Enterprise marketing leaders** evaluating a fractional or consulting partner | USA, Canada, Australia, Germany | Methodology, governance, seniority, case depth | Consultative, evidence-heavy |
| **Regional business owners** seeking a full-service digital partner | India, UAE | Breadth of service, accessibility, local contact | Relationship-led, service-forward |
| **Industry-specific decision makers** — healthcare admins, real-estate brokers, law-firm partners, SaaS founders, manufacturing/construction ops leads | All | "You have solved *my* exact problem before" | Vertical-fluent, specific |

**Design implication.** The primary audience is SMB/mid-market **in every country** — so the default template register is *credible but not corporate-cold*. The enterprise audience is served by depth *below* the fold and by dedicated pages (case studies, methodology, comparison), not by making the homepage stiff.

The fourth row is why the Industry template is a full first-class page type and not a filter on the Services page — SRS §24 devotes 14 sub-sections (one per vertical) to buyer personas and pain points.

---

## 5. Business Model

Five revenue streams (SRS §1.5 table, §1.8):

| Revenue Model | Description | Primary market emphasis |
|---|---|---|
| **Retainer Consulting** | Monthly growth/marketing retainers, scoped by country and service line | All |
| **Project-Based Engagements** | Fixed-scope website, SEO audit, or campaign launch projects | All |
| **Fractional Growth Team** | Ongoing embedded marketing leadership | **US / Canada / Australia** (SRS §1.5) |
| **Productized Packages** | Fixed-price SEO / Ads / Content packages | **India / UAE** (SRS §1.5) |
| **Partner / Referral Revenue** | Tooling & platform referral partnerships (analytics, ads, CRM) | All |

**Revenue streams** (SRS §1.8): direct service revenue from organic + paid inbound; high-ticket fractional/consulting contracts sourced via **authority content and case studies**; productized package upsells surfaced through **in-content CTAs and pricing pages**; partnership/affiliate revenue from tools mentioned in **resource content**.

### The single most important commercial instruction in the document

The revenue model **differs by country**, and the SRS says so explicitly. Therefore:

- **India & UAE pricing pages** must show **productized, fixed-price packages** with transparent currency (INR / AED — SRS §23.1, §23.6 "Trust Building").
- **USA / Canada / Australia pricing pages** must lead with **retainer + fractional engagement models** and consultation-booking, not a price grid. SRS §23.6 for UAE explicitly says *"consultation-first CTAs over self-serve pricing"*; §23.3 for Canada says *"consultation-booking CTAs over hard-sell forms."*

**This means the Pricing template is not one template with swapped numbers. It has two distinct modes.** This is a direct, high-value read of the PDF that a generic build would miss.

---

## 6. Competitive Advantages

Per SRS §1.10 — four, and each one must be *visible on the website*, not just true internally:

| Advantage (SRS §1.10) | How the website must express it |
|---|---|
| **Single-domain authority model** outperforms competitors running separate ccTLD sites that each start SEO from zero | Visible country switcher showing global footprint; consistent brand shell across all 6 markets; hreflang-correct cross-linking |
| **Country-aware positioning** rather than one generic message translated everywhere | Six genuinely different homepages (§7 below) — the proof is that the hero, proof, and CTA differ, not just the flag |
| **Programmatic content architecture** enabling far higher page coverage (industry × city × service) than boutique agencies can sustain manually | Deep, browsable Industries and Locations sections with real internal-link density — the site *looks* bigger and more thorough than a boutique competitor |
| **Unified analytics/CRM** giving leadership true cross-market visibility | Not user-facing. Expressed indirectly through data-backed case studies with real metrics (SRS §23.2 "Trust Building") |

### Business challenges the site must not make worse (SRS §1.11)
- Maintaining message/quality consistency **while** localising tone per country.
- Resourcing localised content (native-quality German, US-idiomatic English) **without inflating headcount**.
- Avoiding cannibalisation between country pages targeting similar English-speaking audiences (**USA / Canada / Australia**).
- Sales and delivery capacity keeping pace with multi-country lead flow.

### Technical challenges the architecture must pre-solve (SRS §1.12)
- Duplicate-content penalties across near-identical English-language country variants.
- Crawl budget efficiency once page count scales into the thousands.
- Localised schema (LocalBusiness, Service, FAQ) staying valid per country **without manual QA per page** → schema must be **generated from structured fields, never hand-coded** (SRS §7.6, §13).
- Performance parity across regions — India/UAE/Australia comparable to US/Canada (SRS §1.12, §16).

---

## 7. Country Positioning

SRS §2 opens with the line that governs this entire section:

> **"Positioning is not translation."** Each market searches for and trusts a different vocabulary of "who solves this problem for me." — SRS §2

### 7.1 Positioning Matrix (SRS §2.1, verbatim)

| Country | URL | What buyers search / value | Recommended positioning |
|---|---|---|---|
| **India** | `/in/` | Digital Marketing Agency, SEO Company, Website Company, IT Company | **Business Growth Agency / Digital Growth Partner** |
| **USA** | `/en-us/` | Growth Consultant, Revenue Growth Partner, Fractional Marketing Team, Business Consultant | **Growth Consulting Firm / Revenue Growth Partner / Fractional Growth Team** |
| **Canada** | `/en-ca/` | Business Consultant, Digital Transformation Partner | **Digital Transformation Partner / Business Growth Consultant** |
| **Australia** | `/en-au/` | Performance-focused marketing, ROI-driven consultants | **Performance Marketing Partner / Business Growth Consultants** |
| **Germany** | `/de/` | Prozessautomatisierung, Engineering-led delivery, precision | **Business Process Automation Company / Digital Engineering Company** |
| **UAE** | `/en-ae/` | Premium consulting, technology-forward transformation | **Business Growth & Technology Consulting / Premium Business Consulting** |

Positioning must lead in **on-page H1s, meta titles, and ad copy** for each country (SRS §2).

### 7.2 Why each positioning works — and the tone it dictates (SRS §2.2)

**India** — The Indian SMB market searches through service-category language ("SEO company near me", "website company"). Leading with *Business Growth Agency* instead of a narrow service label **widens query relevance** and signals a bigger, more strategic engagement than a single-service vendor — **supporting higher-value retainers instead of one-off project pricing**.
→ *Tone:* ambitious, accessible, service-broad. *Trust signals:* client logos, INR transparent pricing, WhatsApp reviews (§23.1). *Primary contact channel:* **WhatsApp-first** (§15.1, §23.1).

**USA** — US SMB/mid-market buyers are **saturated with generic "agency" messaging** and increasingly search for *alternatives to a full-time hire*. Hence *Fractional Growth Team* / *Revenue Growth Partner*. This speaks to a **budget-conscious, ROI-literate buyer comparing Ft. Social Crew against hiring a VP of Marketing**.
→ *Tone:* sharp, benchmark-driven, anti-agency. *The hero must implicitly answer "vs. hiring a VP Marketing."* *Trust signals:* detailed case studies with **real metrics**, client **video** testimonials, transparent process documentation (§23.2). *Lead magnet:* gated benchmark reports (§23.2).

**Canada** — Canadian B2B buyers frame vendor relationships as **long-term "transformation" partnerships** rather than transactional purchases, and respond well to **consultative, less sales-forward language than the US market**.
→ *Tone:* formal, measured, partnership-framed. *CTA:* **consultation-booking over hard-sell forms** (§23.3). *Trust signals:* CAD pricing clarity, Canadian testimonials. *Note:* bilingual EN/FR authority content where relevant to Quebec (§23.3).

**Australia** — Australian SMBs are **highly ROI- and performance-literate from a mature paid-media culture**. *Performance Marketing Partner* mirrors the vocabulary they already use with existing vendors and **signals accountability to metrics rather than vague brand promises**.
→ *Tone:* plain-spoken, numbers-forward, no fluff. *Lead magnet:* **transparent ROI calculators** (§23.4). *Trust signals:* AUD pricing, **verifiable ROI metrics**, local testimonials. *Spelling:* AU English — "optimise", "colour" (§7.4, §23.4).

**Germany** — German B2B buying culture prioritises **process rigour, engineering credibility, and precision over marketing flourish**. Positioning as *Business Process Automation* / *Digital Engineering* **borrows authority from adjacent higher-trust categories** (software engineering, industrial automation) **rather than the lower-trust "agency" category**.
→ *Tone:* precise, formal, evidence-dense, minimal persuasion language. *Content:* **process documentation as proof of rigour** (§23.5). *Trust signals:* EUR pricing, **GDPR-compliant data handling clearly stated**, certifications/credentials displayed. *Language:* **native German — explicitly not machine-translated** (§10.2, §23.5). *Lead magnet:* whitepapers.

**UAE** — The Dubai/Abu Dhabi enterprise and government-adjacent market **associates premium positioning and technology fluency with credibility**. *Business Growth & Technology Consulting* signals **both strategic seniority and technical capability**, matching the aspirational, status-aware tone of the local B2B market.
→ *Tone:* premium, aspirational, executive. *Design:* **"premium visual treatment"** is called out explicitly for Dubai/Abu Dhabi pages (§23.6 Landing Pages). *CTA:* **consultation-first over self-serve pricing** (§23.6). *Trust signals:* AED pricing where appropriate, premium branding, **enterprise client logos**. *Contact:* WhatsApp is a dominant business channel here too (§15.1).

### 7.3 The cannibalisation problem — a hard design constraint

SRS §1.11 and §7.4 both flag it: **USA / Canada / Australia / UAE are all English-language markets targeting similar audiences.** The SRS response is non-negotiable and must be honoured in the content layer:

> "English-market pages are **never simply copy-pasted**; each requires **locally-relevant proof points, spelling (colour vs color), currency, and CTAs**, plus **unique meta titles/descriptions**." — SRS §7.4
>
> "Boilerplate legal/footer content is allowed to repeat; **primary content (H1 – first 300 words) must be substantively unique per country**." — SRS §7.4
>
> A similarity check flags **>80% textual overlap** between country variants before publish. — SRS §7.4

**This is the single most consequential content rule in the build.** It is why our content model stores every country's hero, proof, and value proposition as separate authored records — never as a template with interpolated country names.

---

## 8. Website Architecture

### 8.1 Global sitemap — top level (SRS §3.1, verbatim list)

- **Homepage (Global Root)** — serves based on geo + language detection **with manual override**
- **Country Hub** — `/{country-code}/`
- **About, Careers, Privacy, Terms, Support** — global templates, localised copy per country
- **Services** — `/{country}/services/` and individual service pages
- **Industries** — `/{country}/industries/` and industry detail pages
- **Locations (Cities)** — `/{country}/locations/` and city detail pages
- **Blog** — `/{country}/blog/` and post pages
- **Resources** — guides, templates, downloadable assets
- **Case Studies** — `/{country}/case-studies/`
- **Pricing** — `/{country}/pricing/`
- **Testimonials** — `/{country}/testimonials/`
- **Contact** — `/{country}/contact/` with localised phone/office details
- **Comparison Pages** — "Ft. Social Crew vs X" programmatic template
- **Campaign Landing Pages** — paid-traffic-specific, **noindex by default**

### 8.2 URL structure rules (SRS §3.2, verbatim table)

| Page type | URL pattern | Example |
|---|---|---|
| Country Home | `/{country}/` | `/en-us/` |
| Service | `/{country}/{service-slug}/` | `/en-us/seo-services/` |
| Industry × Service | `/{country}/industries/{industry}/{service}/` | `/en-us/industries/healthcare/seo/` |
| City × Service | `/{country}/locations/{city}/{service}/` | `/en-au/locations/sydney/google-ads/` |
| Blog Post | `/{country}/blog/{slug}/` | `/en-us/blog/seo-guide/` |
| Case Study | `/{country}/case-studies/{slug}/` | `/de/case-studies/mittelstand-e-commerce/` |
| Comparison | `/{country}/compare/{competitor}/` | `/en-us/compare/agency-x/` |

Naming conventions (SRS §21.3): **kebab-case** for URLs and filenames; **camelCase** for variables; **PascalCase** for components/classes; country codes **always lowercase, hyphenated locale format** (`en-us`, `en-au`, `de`).

> **Note on the Service URL pattern.** The SRS §3.1 bullet says Services live at `/{country}/services/`, while the §3.2 table shows the service *detail* page at `/{country}/{service-slug}/` (i.e. `/en-us/seo-services/`, no `/services/` segment). We follow the §3.2 table exactly for detail pages, and use `/{country}/services/` as the hub — this is the only reading that satisfies both statements. Flagged for your confirmation in §17.

### 8.3 Page template inventory (SRS §3.4, verbatim)

| Template | Purpose | Programmatically generated? |
|---|---|---|
| **Country Homepage** | Market-specific hero, positioning, proof, CTAs | **No — hand-crafted per country** |
| **Service Page** | Deep-dive per service per country | Semi — structured content blocks, manual copy |
| **Industry Page** | Industry pain points + relevant services | Yes — industry × country template |
| **Industry × Service Page** | Long-tail intent page | Yes — industry × service × country |
| **City Page** | Local relevance, local proof, local schema | Yes — city × country template |
| **City × Service Page** | Local + service long-tail intent | Yes — city × service × country |
| **Blog Post** | Authority/topical content | No — authored, CMS-managed |
| **Case Study** | Proof/conversion asset | No — authored |
| **Comparison Page** | Competitive intent capture | Yes — competitor × country |
| **Landing Page** | Paid campaign specific | No — campaign-built, **noindexed** |

**"Country Homepage — No, hand-crafted per country"** is the SRS's own confirmation of the brief's requirement that each country homepage feel unique. It is in the PDF; it is not an embellishment.

### 8.4 Site hierarchy (SRS §3.3, Figure 3.1)

Root domain → country folder → section → templated leaf pages. Breadcrumbs must **always reflect the URL hierarchy: Country > Section > Page** (SRS §7.6).

---

## 9. SEO Strategy

SEO in this SRS is a **platform-level guarantee, not a page-level task**: *"Every rule below is implemented at the platform level, not per-page, so compliance is automatic"* (SRS §7).

### 9.1 The ten SEO disciplines (SRS §9.1, verbatim table)

| Discipline | Focus | Key implementation |
|---|---|---|
| Technical SEO | Crawlability, indexability, speed | Sitemap automation, CWV budgets, structured routing |
| On-Page SEO | Relevance per page | Title/meta templates, header structure, keyword mapping |
| Off-Page SEO | Authority signals | Digital PR, guest content, partnership backlinks per country |
| Entity SEO | Brand/topic recognition | Consistent NAP, Organization schema, **Knowledge Panel readiness** |
| Topical Authority | Depth of coverage per subject | Topic clusters with pillar + supporting pages |
| Semantic SEO | Intent & meaning coverage | Content covers **related entities/questions, not just exact keywords** |
| Programmatic SEO | Scaled long-tail coverage | Industry×City×Service templates **with quality gating** |
| Local SEO | City/region relevance | City pages, Google Business Profiles per office/market |
| International SEO | Multi-country correctness | Hreflang, canonical, geo (§7) |
| **AI SEO / GEO / AEO** | Visibility in AI answers & assistants | **Structured, extractable answer blocks; FAQ schema; clear citations** |

### 9.2 International SEO — the rules (SRS §7)

**Hreflang (§7.1)**
- Every content record belongs to a **`hreflang_group_id`** linking its country/language equivalents.
- Tags generated **server-side in `<head>` AND mirrored in the XML sitemap** — both methods, for redundancy.
- **`x-default`** → global homepage or best-guess country based on IP/Accept-Language.
- **Self-referencing hreflang is mandatory on every page.**

**Canonical (§7.2)**
- **Every page self-canonicalises to its own country URL.** Country variants are **never** canonicalised to one "master" — that would suppress the others from indexing.
- Parameter/UTM variants canonicalise to the clean URL.
- **Paginated series use rel=canonical per page** (not collapsed to page 1), plus clear internal linking.

**Geo & country targeting (§7.3)**
- Separate GSC property (or URL-prefix International Targeting) **per country folder**.
- Country/region targeting set at **folder level, not domain level**.
- **IP geo-detection offers a soft suggestion banner — NEVER a forced redirect**, so every country's content stays crawlable and directly accessible. *(This is a critical UX + SEO instruction and directly shapes our root-route design.)*

**Schema, breadcrumbs, pagination (§7.6)**
- Organization, **LocalBusiness (per country)**, Service, FAQPage, BreadcrumbList, Review/AggregateRating — **generated from structured fields, never hand-coded per page**.
- BreadcrumbList schema **mirrors the visible breadcrumb trail**.
- Pagination: clear next/prev + canonical-per-page; infinite scroll (if used on blog) must have a **crawlable paginated fallback**.

**CWV, indexing, crawl budget (§7.7)**
- Performance budgets enforced **per template** (§16) so CWV stays green in higher-latency regions.
- Priority indexing signals favour **money pages** (services, industry×service) over low-value combinatorial pages.
- **Programmatic pages below a content-quality threshold are noindexed until enriched** — protecting crawl budget and site-wide quality signals.

### 9.3 Sitemaps, robots & feeds (SRS §7.5)

| Asset | Scope | Update trigger |
|---|---|---|
| XML Sitemap | Segmented per country + content type | On publish/unpublish |
| Image Sitemap | Attached to relevant content sitemap | On media attach |
| Video Sitemap | Case studies / resource videos | On video publish |
| News Sitemap | If/when News eligibility applies | On qualifying blog publish |
| RSS Feed | Per-country blog feed | On blog publish |
| robots.txt | Global, with per-path disallow for landing pages | On settings change |

Sitemaps are **chunked by country + content type** to stay under the 50,000 URL / 50 MB limit (SRS §8.3).

### 9.4 Automatic sitemap system (SRS §8)

> "Sitemap freshness cannot depend on a human remembering to run a script." — SRS §8

On every publish event: regenerate affected XML segment → regenerate HTML sitemap → ping Google & Bing → push via **Search Console Indexing API** where eligible → update country RSS → **recalculate internal links and breadcrumb references** → update `<lastmod>` → **purge CDN for the URL and any listing pages that reference it** (SRS §8.3). Nightly full regeneration as a safety net (SRS §13).

### 9.5 Keyword strategy (SRS §10)

Research is run **per country using local search behaviour, local competitors, and local terminology — not a direct translation of the US keyword set** (§10). Ten intent buckets applied per country (§10.1): Commercial, Informational, Transactional, Service, Location, Industry, **Comparison**, **Problem-Based**, **Question**, Buyer-Intent/Long-Tail.

Per-country nuance (§10.2): India — "best… company in [city]"; USA — US idiom, high competition; Canada — **CA-specific volume validation before assuming US parity**; Australia — AU spelling ("digital marketing agency Melbourne"); Germany — **native German compound terms ("SEO Agentur"), not machine-translated**; UAE — English + Arabic dual-language consideration, premium/enterprise-intent terms.

Cluster shape (§10.3, USA "SEO Services" example): **Pillar** → **Cluster** → **Long-tail** → **Industry crossover**. Replicated per country and per service line.

### 9.6 AEO & GEO (SRS §9.2) — verbatim implementation notes

- **GEO:** *"write direct, quotable answer statements near the top of key pages so AI answer engines can extract and attribute them cleanly."*
- **AEO:** *"structure FAQ and how-to content with explicit Q/A pairs and FAQPage schema to increase eligibility for AI Overviews and assistant answers."*
- **Entity consistency:** *"Maintain consistent entity facts (founding info, service definitions, locations) across the site and third-party profiles so AI systems build a stable, correct picture of the brand."*

**Design consequence.** "Quotable answer statement near the top" becomes a **mandatory, designed component** — an Answer Block that sits directly under the H1 on every money page. It is the highest-leverage AEO/GEO instruction in the PDF and it is a *layout* decision, not a copy decision.

---

## 10. Lead Generation Strategy

### 10.1 Capture mechanisms (SRS §15.1)

| Mechanism | SRS detail | Market emphasis |
|---|---|---|
| **Landing Pages** | Campaign-specific, **single-CTA**, per paid channel and country | All (noindex) |
| **Forms** | **Short-form** (name/email/service interest) on **service pages**; **longer qualifying forms** on **pricing/contact** | All |
| **Calendly** | Direct booking embedded on **contact and pricing** pages for high-intent visitors | All; primary for CA/UAE |
| **WhatsApp** | Click-to-chat **on India/UAE pages** where it is the dominant business-communication channel | **India, UAE** |
| **Call Tracking** | Dynamic number insertion per country/channel | All |
| **Live Chat** | Staffed or AI-assisted first response, **routed by country/timezone** | All |

**Two distinct form lengths by page type** is an explicit SRS instruction — short on service pages, long on pricing/contact. Our form component takes a `variant` for exactly this reason.

### 10.2 Routing & scoring (SRS §15.2)
- Leads scored on **form completeness, service/pricing page engagement, and company-size signals**.
- **Country + service combination** determines CRM routing to the correct regional sales owner.
- Email automation nurtures low-score leads **with relevant case studies** until sales-ready.

### 10.3 Conversion events to design for (SRS §14.2)
`form_submit` · `calendly_booking` · `phone_click` · `whatsapp_click` · `live_chat_start`
Standard events: `page_view`, `scroll_depth`, `outbound_click`, `file_download`, `video_play`.

**Funnel tracked per country (§14.2):** Landing → **Service Page** → **Pricing/Contact** → Form Submit → CRM-qualified.
→ *This funnel is the site's primary navigation path and must be the path of least resistance in the IA.*

### 10.4 Lead magnets by market (from SRS §23)
- **USA:** gated benchmark reports (§23.2)
- **Australia:** transparent **ROI calculators** (§23.4)
- **Germany:** whitepapers, process documentation (§23.5)
- **India:** city-specific landing pages, WhatsApp flow (§23.1)
- **UAE:** premium-styled landing pages, consultation-first (§23.6)
- **Canada:** transformation-focused pillar content (§23.3)
- Per-vertical magnets are specified for all 14 industries in §24 (e.g. Healthcare: *patient acquisition checklist, compliance-safe marketing guide*).

---

## 11. Growth Strategy

SRS §23 gives a full growth-lever table per country (First Clients, Authority Building, Inbound Leads, Organic Ranking, Backlinks, Google Ads, LinkedIn Ads, Meta Ads, B2B Lead Gen, Trust Building, Case Studies, Landing Pages). The website-relevant rows, condensed:

| Country | Organic ranking play | Trust signals to surface | Case-study verticals to lead with | Location pages |
|---|---|---|---|---|
| **India** | City × service programmatic pages, local citations, Hindi/English bilingual where relevant | Client logos, **INR transparent pricing**, WhatsApp testimonials | E-commerce, real estate, education | **Top 10–15 metro / tier-2 cities** |
| **USA** | Deep topical clusters, **competitive comparison pages**, enterprise-grade technical SEO | **Real-metric case studies, client video testimonials, transparent process documentation** | SaaS, e-commerce, professional services | Industry- & use-case-specific (paid-tied) |
| **Canada** | **CA-specific keyword validation, distinct meta/content from the US variant** | **CAD pricing clarity**, Canadian testimonials | Manufacturing, professional services, mid-market retail | **Toronto, Vancouver, Montreal, Calgary** |
| **Australia** | **AU spelling/terminology**, state & city targeting | **AUD pricing, verifiable ROI metrics**, local testimonials | E-commerce, hospitality, professional services | **Sydney, Melbourne, Brisbane, Perth** |
| **Germany** | Native German research, formal compound-term optimisation | **EUR pricing, GDPR-compliant data handling clearly stated, certifications/credentials displayed** | Manufacturing, logistics, mid-market industrial | **German-language pages for Berlin, Munich, Frankfurt, Hamburg** |
| **UAE** | Dubai/Abu Dhabi-specific terms, **English + Arabic consideration** | **AED pricing where appropriate, premium branding, enterprise client logos** | Real estate, hospitality, enterprise consulting | **Dubai & Abu Dhabi with premium visual treatment** |

**Global expansion playbook (SRS §1.9)** — four repeatable steps per new country: (1) market & positioning research → (2) country record + localised template setup → (3) minimum-viable content set (core services, **10 priority blogs**, FAQs, pricing) → (4) technical SEO validation (hreflang, GSC property, sitemap segment) **before promotion**.

---

## 12. Content Strategy

### 12.1 Minimum content targets per country (SRS §11.1, verbatim)

| Content type | Minimum volume | Notes |
|---|---|---|
| **Blogs** | **300** | Organised into **8–10 topic clusters** per country |
| **Services** | **50** | Core + sub-service variants |
| **Industry Pages** | **100** | Industry + Industry×Service combinations |
| **Location Pages** | **500** | City + City×Service, **quality-gated before publish** |
| **Resources** | **100** | Guides, templates, calculators, checklists |
| **Case Studies** | **50** | Prioritise industries with highest deal value |
| **FAQs** | **100** | Distributed across service/industry/pricing pages |

These are **12-month launch minimums, not a ceiling** (§11.1). At 6 countries this is a **~7,000-page** content system — which is precisely why §11.3's quality gate and §7.7's crawl-budget rules exist, and why the frontend must be data-driven rather than page-driven.

### 12.2 Topical cluster model (SRS §11.2)
- **Pillar Page** — broad service/industry topic, links out to every cluster page.
- **Cluster Pages** — specific sub-topics linking **back** to the pillar.
- **Supporting Blog Content** — informational posts answering specific questions, linking **into** the relevant cluster page.
- **Proof Layer** — case studies and testimonials linked **contextually** into cluster and pillar pages **to support conversion, not just ranking**.

### 12.3 Quality gate for programmatic pages (SRS §11.3) — four mandatory elements

A Location or Industry×Service page may only be indexed if it has:
1. A **unique local/industry proof point**
2. A **unique intro paragraph**
3. **At least one relevant testimonial or case study reference**
4. **Correct localised schema**

> Pages that don't clear the bar **stay noindexed until enriched** — *"this protects the domain from thin-content risk while still allowing the URL structure to exist for future completion."*

**This is a component contract.** Our programmatic templates will require these four fields as non-optional props, so a page that lacks them cannot be built as indexable. The type system enforces the SEO policy.

### 12.4 Content calendar (SRS §12)

| Frequency | Output |
|---|---|
| Daily | Social/repurposed snippets from published content (**not new site pages**) |
| Weekly | **2–3 blog posts per active country**, 1 internal-link audit pass |
| Monthly | 1 new case study, **5–10 new location/industry pages per country**, keyword performance review |
| Quarterly | Cluster expansion into a new topic area, backlink campaign push, **comparison page refresh** |

Annual milestones (§12.2): **Q1** launch content live for all 6 countries, core service + pillar pages complete · **Q2** location rollout, top 10 cities per country · **Q3** industry vertical expansion (Healthcare, Real Estate, SaaS clusters) · **Q4** full 500-location target per country.

**Q1 is our build scope target: all 6 countries live with core service + pillar pages complete.**

### 12.5 Automation of content hygiene (SRS §13)

Every element below runs **from structured content fields** rather than a human checklist:

| Automated element | Source of truth | Fallback |
|---|---|---|
| Schema markup | Structured fields (service type, FAQ pairs, reviews) | Base Organization/WebPage schema |
| Metadata | Templated from content title + country + service | Auto-truncated page title |
| **Image ALT text** | Media Library alt field, **required on upload** | **Blocked — publish warning shown** |
| OG Image | **Auto-generated branded template with page title** | Default country OG image |
| Twitter Card | Mirrors OG data | Default card |
| Canonical | Self-referencing by URL | N/A — always present |
| Hreflang | `hreflang_group_id` relationships | Self-tag only if ungrouped |
| Sitemap | Publish event pipeline | Nightly full regeneration |
| Internal Linking | Related content by category/industry/city + AI suggestion | Manual linking prompt |
| Related Blogs | Shared category/tag overlap scoring | Most recent 3 posts in country |

**Note:** *ALT text missing = publish blocked.* We mirror this in the frontend as a required, non-optional `alt` prop on every image component.

---

## 13. Design Direction

### 13.1 What the SRS itself mandates (§22)

The SRS is deliberately lean on visual design — it specifies **system behaviour**, leaving aesthetics to the design team:

- **Responsive breakpoints (§22.1):** Mobile **< 768px — "Primary — majority of organic traffic across all 6 countries"**; Tablet **768–1024px — "Secondary — verified layout, not redesigned separately"**; Desktop **> 1024px — full layout**.
- **Accessibility (§22.2):** **WCAG 2.1 AA** target — colour contrast, keyboard navigation, ARIA labelling on interactive components.
- **Dark mode (§22.2):** *"supported via design-token theming, not a separate template set."*
- **Design system (§22.3):** shared component library (buttons, cards, forms, nav); **"Country-specific theming limited to imagery/proof content — core visual language stays consistent for brand recognition across markets."**

**§22.3 is decisive and resolves a tension in the brief.** Each country homepage must feel unique — but that uniqueness comes from **imagery, proof, messaging, and content**, *not* from a different colour palette or type system per country. One visual language; six voices. This is both what the PDF says and what is right for brand recognition.

**Mobile is Primary, stated in the SRS.** Not "mobile-friendly" — mobile-first, because mobile is the majority of organic traffic in all six markets.

### 13.2 What the inspiration image mandates

Colours sampled programmatically from `WhatsApp Image 2026-07-19 at 12.32.19 PM.jpeg` (1536×1024):

| Role | Sampled hex | Evidence |
|---|---|---|
| **Deep Burgundy** (primary) | **`#470826`** | Dominant background; darkest core cluster `#460824` (87,073 px) |
| **Champagne Gold** (accent) | **`#F4C88C`** | Isolated by hue/saturation filter on the outlined pill borders |
| **Soft White / Blush** (surface) | **`#F4DEE8`** | Filled pill fill; 18,123 px cluster |
| **Wine** (secondary) | derived `#6E1236` | **[INFERRED]** — mid-tone between burgundy and rose; no discrete wine region exists in the image |

**Visual language read from the image, beyond colour:**
1. **Oversized, tightly-tracked, ALL-CAPS display type** set very large with minimal leading — confident, editorial, unafraid of scale.
2. **The pill/lozenge is the brand's signature shape** — fully-rounded, and critically it appears in **two states**: *solid blush fill* and *gold hairline outline on burgundy*. This alternation is the core rhythm device of the composition.
3. **Alternating fill/outline creates rhythm** across the stack — no two adjacent pills share a treatment.
4. **Gold is used exclusively as a 1–2px hairline**, never as a fill. It is a *line* colour in this brand.
5. **Generous negative space**; a small, quiet, underlined secondary link ("WORK WITH US") counterweights the massive headline — a deliberate scale contrast.
6. Subtle paper/noise grain over the flat burgundy — the surface is not sterile.

**Our translation to light theme** (per the brief: light theme, burgundy as accent — and consistent with SRS §22.2 which requires tokenised theming anyway): the composition **inverts**. Off-white becomes the field; burgundy becomes ink and primary action; blush becomes the tinted surface; **gold remains a hairline only** — which conveniently also solves its accessibility problem (see §15.4).

### 13.3 Design direction statement

> **Editorial luxury with engineering credibility.**
> The register of a serious consulting firm, not a marketing agency. Confident scale in typography, disciplined restraint in colour, generous whitespace, and evidence — numbers, names, logos, methodology — treated as the primary decorative element. The page should feel *authored*, not assembled.

This directly serves the SRS's hardest positioning requirement: Germany needs **engineering credibility** (§2.2), the UAE needs **premium** (§2.2, §23.6), and the USA needs **anti-agency ROI literacy** (§2.2). Editorial-luxury-plus-evidence is the one register that satisfies all three without fragmenting the brand — exactly as §22.3 requires.

---

## 14. Brand Personality

| Attribute | Expression | SRS anchor |
|---|---|---|
| **Precise** | Real numbers, no rounded-up vanity metrics, documented methodology | §23.5 Germany "process documentation as proof of rigour"; §23.2 USA "real metrics" |
| **Consultative** | Advises before it sells; consultation CTAs over hard-sell forms | §2.2 Canada; §23.3, §23.6 |
| **Global, not generic** | Six markets, six voices, one standard of quality | §1.3, §2, §22.3 |
| **Accountable** | Metrics-forward, ROI-literate, transparent pricing where the market expects it | §2.2 Australia; §23.4 |
| **Premium** | Restraint, craft, scale, whitespace — never loud | §2.2 UAE; §23.6 |
| **Technically excellent** | The site's own performance and correctness is the proof of the claim | §1.3 "technically excellent" |

**Voice principles**
1. **Lead with the outcome, then the method.** (Supports GEO quotable-answer blocks, §9.2.)
2. **Specific beats superlative.** "Reduced CPL 41% in 90 days" over "world-class results".
3. **Never claim what a case study cannot support.** E-E-A-T is a trust contract.
4. **Register shifts by market; standard of evidence never does.**

**Tone-of-voice matrix by market** (derived from SRS §2.2, §23):

| Market | Sentence rhythm | Vocabulary | Avoid |
|---|---|---|---|
| India | Warm, ambitious | growth, partner, scale | Cold formality |
| USA | Short, punchy, benchmark-led | revenue, fractional, pipeline, CAC | "Agency" as self-description |
| Canada | Measured, longer clauses | transformation, partnership, roadmap | Hard-sell urgency |
| Australia | Plain, direct, numeric | ROI, performance, spend, return | Vague brand promises |
| Germany | Formal, structured, precise | Prozess, Automatisierung, Engineering | Marketing flourish, hyperbole |
| UAE | Elevated, executive | consulting, transformation, enterprise | Discount language |

---

## 15. UI Guidelines

### 15.1 Layout principles
- **Mobile-first**, per SRS §22.1 (mobile is *Primary*).
- **12-column grid**, 1280px content max-width inside a 1440px shell.
- **8pt spacing rhythm** on a 4pt base unit — every gap is a token, never an arbitrary value.
- **Section rhythm alternates** surface treatments (off-white → blush tint → burgundy inversion) so scroll has cadence — the direct descendant of the image's alternating pill rhythm.
- **One primary CTA per viewport.** Secondary actions are always visually subordinate (ghost/underline, echoing "WORK WITH US" in the image).

### 15.2 The pill as the signature component
Taken directly from the inspiration image, in two states — **solid** and **hairline-outline** — used for eyebrows, tags, category chips, service badges, and small CTAs. Alternation is a rule, not a choice. This single component does more brand work than any other element and is the strongest defence against the site looking template-generated.

### 15.3 Component conventions
- **Cards:** 1px border in burgundy at low opacity; radius from the token scale; lift + border-darken on hover; never a heavy drop shadow.
- **Buttons:** primary = solid burgundy on light; secondary = burgundy hairline outline; tertiary = underlined text link. Gold reserved for hairlines, dividers, icon strokes, and focus decoration.
- **Data & proof:** stat blocks use display-scale numerals with a small-caps label — evidence is styled as the hero element it is.
- **Imagery:** editorial, human, desaturated toward the burgundy family; **country-specific imagery is the sanctioned uniqueness lever** (SRS §22.3).

### 15.4 Accessibility guardrails (SRS §22.2 — WCAG 2.1 AA)
- **Champagne Gold `#F4C88C` on white is ≈1.6:1 — it FAILS AA for text and must never be used for body copy, links, or any essential text.** It is a decorative/hairline colour only. A darkened companion token is provided for cases where a gold-family *ink* is genuinely needed.
- Burgundy `#470826` on white ≈ 14:1 — passes AAA comfortably.
- Every interactive element gets a visible, non-colour-dependent focus ring.
- Full keyboard navigation and ARIA labelling on all interactive components.
- Motion respects `prefers-reduced-motion`.

### 15.5 Localisation-ready UI
- German compound nouns run **~30% longer** than English — no fixed-width buttons or nav items; test all components with German strings (SRS §10.2, §23.5).
- Currency, date, and phone formats render **from the country record**, never hard-coded (SRS §6.1: *"Locale-aware fields render automatically based on the country record"*).
- Arabic is a stated future consideration for UAE (SRS §10.2, §23.6) → logical CSS properties (`margin-inline`, `padding-block`) throughout so RTL is a configuration change, not a rewrite.
- AU/UK spelling for `/en-au/`, CA spelling for `/en-ca/` (SRS §7.4).

---

## 16. Technical Requirements

### 16.1 From the brief — what we are building now

Static frontend only: **Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP where appropriate · Lucide Icons · next/image · next/font · static-export ready.** No backend, no API, no database, no CMS, no authentication, no form processing, no admin panel.

### 16.2 From the SRS — what the frontend must remain compatible with

The SRS specifies a full platform (Sections 4, 5, 6, 13, 17, 21) that we are **not building**, but that our architecture must not obstruct:

- **§4 Database** — Country is the **primary partition key** on nearly every entity. Composite index `(country_id, slug)` for O(1) URL resolution. `SEOMeta` is **polymorphic** (`entity_type` + `entity_id`) so any content type attaches one SEO record.
  → *Our TypeScript content types mirror this schema exactly, so a future CMS maps 1:1 with no refactor.*
- **§5 Admin panel & RBAC** — six roles, four-stage publishing workflow. Out of scope; noted.
- **§6 CMS** — every content model carries `country_id`; **templates are shared, only data differs**, so a layout fix ships to all countries at once.
  → *This is exactly how we structure the frontend: one template, six data sets.*
- **§21.2 API** — RESTful/GraphQL content API scoped by country (`/api/{country}/services`), versioned (`/v1/...`), **"enabling future headless consumers."**
  → *Our data-access layer is a single module of typed async functions returning static data today; swapping to `fetch()` against this API later touches only that module.*
- **§17 Security** — HTTPS + HSTS, WAF, 2FA, backups, spam protection. Deployment/platform concern; the static frontend inherits HTTPS/HSTS from the host.
- **§21.3–21.4** — kebab-case URLs/files, camelCase variables, PascalCase components; lowercase hyphenated country codes; lint/format enforced pre-commit; trunk-based Git with short-lived branches and required PR review.
  → *Adopted verbatim as our coding standard.*

### 16.3 Performance requirements (SRS §16)

| Layer | Technique | Target impact |
|---|---|---|
| Edge/CDN | PoPs covering all 6 launch regions | **Sub-100ms TTFB globally** |
| Caching | Full-page cache for anonymous traffic | Reduced origin load |
| **Images** | **WebP/AVIF, responsive sizes, lazy-load below the fold** | Lower LCP, reduced bandwidth |
| Database | Indexed queries, read replicas | Consistent admin performance |
| **Assets** | **JS/CSS minification, code-splitting per template** | **Lower CLS/INP, smaller bundles** |
| Compression | Brotli/Gzip at the edge | Faster text transfer |

Plus **performance budgets enforced per template** (§7.7, §16) so CWV stays green in higher-latency regions — India, UAE, Australia must match US/Canada (§1.12).

**Static export is a genuine advantage here:** pre-rendered HTML on a CDN is the shortest path to the sub-100ms TTFB and green-CWV-everywhere targets the SRS demands.

### 16.4 Analytics readiness (SRS §14)
GA4 with **country as a custom dimension** (unified *and* per-country reporting) · GSC per-country folder properties · Microsoft Clarity segmented by country · Looker Studio dashboards.
→ *We ship a typed, no-op analytics abstraction emitting the §14.2 event names, so wiring GA4 later is a single adapter — with zero third-party scripts in the static build, protecting our Lighthouse targets.*

### 16.5 Static-export implications (honest constraints)

| SRS feature | Static-export reality |
|---|---|
| Geo-detection soft banner (§7.3) | ✅ Client-side, after hydration. **Fully compliant — §7.3 forbids forced redirects anyway.** |
| Hreflang **server-side in `<head>`** (§7.1) | ✅ Emitted at build time into static HTML — satisfies the requirement. |
| Hreflang mirrored in XML sitemap (§7.1) | ✅ Generated at build. |
| Sitemap **on publish event** (§8) | ⚠️ Becomes **on build**. Same output; different trigger. Fully restored when a CMS is attached. |
| Search Console Indexing API ping (§8.3) | ❌ Requires a server. Out of scope; documented as a Phase-2 hook. |
| Form → CRM webhook (§14.3, §15.1) | ❌ Out of scope per brief. **Forms are built as complete, accessible, validated UI with the submit handler left as a single injection point.** |
| Call tracking / dynamic number insertion (§15.1) | ⚠️ Numbers render from the country record; dynamic swapping is a later script hook. |
| Live chat, Calendly (§15.1) | ⚠️ Designed and placed as lazy-loaded embed slots — deferred so they never cost us LCP. |

---

## 17. Scalability Strategy

### 17.1 The SRS requirement (§1.7, verbatim)

> "The platform must be designed so that scaling to **20, 50, or 100+ countries changes only data volume — never the codebase**."

Achieved through three mechanisms the SRS names explicitly:
1. **A Country entity as a first-class object** driving routing, currency, language, legal footer content, and schema markup.
2. **Template-driven page generation** (service × country, industry × service, city × service) instead of hand-built pages per market.
3. **A headless-capable CMS layer** so future channels (app, partner microsites) consume the same content API.

### 17.2 How the frontend honours it

- **Country is a data record, not a route folder.** Routes are `app/[country]/...` with `generateStaticParams()` reading the country registry. **Adding country #7 = adding one object to the registry and its content records. Zero new route files.** This is the literal implementation of §1.7.
- **Templates are shared; only data differs** (SRS §6.1) — one Service template renders all 50 services × 6 countries.
- **The content layer is a swappable module.** Today it reads typed local data; tomorrow it calls `/api/{country}/services` (§21.2). Every page imports from this module and nothing else.
- **Schema generation is a pure function of structured fields** (SRS §7.6, §13) — never hand-authored per page, so LocalBusiness stays valid per country without manual QA (§1.12).
- **The quality gate is typed** (§11.3) — a programmatic page cannot be marked indexable without its four required proof fields.

### 17.3 Scale maths
At the §11.1 minimums, one country is ~1,150 pages; six countries ~7,000; 20 countries ~23,000. The routing layer must be indifferent to this — which it is, because page count is a function of the data array length, not of the codebase.

For the initial static build we will render a **deliberately scoped, representative** subset (hand-crafted tier fully complete; programmatic tier proven with a real, non-trivial sample) and document precisely what is rendered vs. what the architecture supports. The scope table is in `WEBSITE_EXECUTION_PLAN.md` §2.

---

## 18. Future Roadmap

### 18.1 Development phases (SRS §18.1) — 32 weeks to Growth phase

| Phase | Key deliverables | Our status |
|---|---|---|
| 1. Research | Market/competitor analysis, positioning validation, keyword baseline | ✅ Delivered in the SRS |
| 2. **UI/UX Design** | **Wireframes, design system, template designs for all page types** | ◀ **This document + execution plan** |
| 3. Development | Core platform build, database, routing, admin foundation | ◀ **Frontend portion = our build** |
| 4. CMS | Multi-country content models, workflow engine, media library | Out of scope (architecture kept compatible) |
| 5. SEO | Hreflang/canonical, schema automation, sitemap pipeline | ◀ **Frontend portion = our build** |
| 6. Testing | QA across countries/devices, CWV validation, security testing | Frontend QA in scope |
| 7. Launch | Staged rollout, GSC setup per country, monitoring | Partial |
| 8. **Growth** | Content scale-up, backlinks, ongoing optimisation | Post-launch, indefinite |

### 18.2 Future features (SRS §20)
AI Content Assistant · AI SEO Suggestions · AI Keyword Suggestions · AI Internal Linking · AI Meta Generator · AI Schema Generator · **AI Chatbot (on-site, pricing/service questions, routed to lead capture)** · CRM Expansion (bi-directional deal-stage sync) · Marketing Automation (behaviour-triggered nurture) · API Integrations (proposal, scheduling, billing).

→ *Frontend consequence:* we reserve a **persistent bottom-right slot** for the future AI chatbot and live chat so adding it later does not disturb layout or sticky-CTA positioning.

### 18.3 Maintenance cadence (SRS §19)
**Weekly** — broken-link check, form/lead pipeline health, uptime/CWV review, publish-queue audit.
**Monthly** — sitemap/index coverage audit per country, backlink review, dependency updates.
**Quarterly** — full technical SEO audit, security patching, **content-quality gate review on programmatic pages**.
**Yearly** — architecture review, DR test, **positioning/keyword strategy refresh (§2 & §10)**.

### 18.4 Pre-launch checklist (SRS §25.1) — our frontend-applicable subset
- [ ] All 6 country records configured (locale, currency, GSC property, legal footer content)
- [ ] Core service pages published for every launch country with **unique, localised content**
- [ ] **Hreflang groups validated across every equivalent page set**
- [ ] XML/HTML sitemaps generating correctly per country and content type
- [ ] Schema validated (Organization, LocalBusiness, Service, FAQPage, BreadcrumbList)
- [ ] GA4/GSC/Clarity tracking verified per country *(abstraction ready; wiring is Phase 2)*
- [ ] Lead capture forms tested end-to-end into CRM *(UI complete; handler is Phase 2)*
- [ ] **Core Web Vitals passing on mobile for all launch templates**
- [ ] Security review *(host-level)*
- [ ] Redirect map for any legacy URLs being replaced

### 18.5 Risks the build must actively mitigate (SRS §25.2)

| Risk | SRS mitigation | Our frontend implementation |
|---|---|---|
| Duplicate/thin content across English variants | Similarity checks; mandatory unique proof points per country | Country content authored as **six independent records**; no interpolated templates for H1/intro |
| Programmatic pages diluting quality signals | Quality gate, noindex-until-enriched | **Typed required props** on programmatic templates |
| Slow content velocity vs. volume targets | Templated briefs, phased quarterly targets | Content model matches brief structure so authoring drops straight in |
| Hreflang/canonical misconfiguration suppressing pages | Automated validation in publish pipeline | **Generated from one registry** — impossible to desync by hand |
| Country-specific compliance (legal/healthcare ad restrictions) | Localised legal review in approval workflow | Per-country legal/footer content as a country-record field; GDPR statement surfaced for `/de/` |
| Crawl budget strain at thousands of pages | Prioritised internal linking, staged location rollout | Internal-link component scores by proximity; money pages linked from country hub |
| Sales/delivery capacity lagging lead volume | Phased launch sequencing, lead scoring | Out of scope (operational) |

---

## Appendix A — Conflicts Between the Build Brief and the SRS

Flagged openly rather than silently resolved. **The PDF wins on strategy, architecture, content, and SEO. The build brief wins on build scope**, since it defines what we are being asked to ship. Where they diverge:

| # | SRS says | Brief says | Resolution | Needs your call? |
|---|---|---|---|---|
| 1 | Full backend: database (§4), admin panel (§5), CMS (§6), API (§21.2) | Static frontend only — no backend/API/DB/CMS/auth/admin | **Build the frontend; mirror the §4 schema in TypeScript types and isolate all data access in one swappable module** so the SRS platform attaches later without refactor | No — brief is explicit |
| 2 | §22.2 — "**Dark mode supported** via design-token theming" | "Do NOT build a dark website. Primary background white/off-white" | **Ship light theme as the only active theme**, but build the full token layer §22.2 requires so dark mode is a later flip, not a rebuild. Satisfies both. | No |
| 3 | §15.1 — Forms, Calendly, WhatsApp, live chat, call tracking | "No forms processing" | **Build complete, accessible, validated form UI** with a single documented submit injection point. Third-party embeds become lazy-loaded slots. | No |
| 4 | §8 — Sitemap regenerates **on publish event** | Static export | Becomes **on build**. Identical output, different trigger. | No |
| 5 | §3.1 lists Services at `/{country}/services/`; §3.2 table shows service detail at `/{country}/{service-slug}/` | Follow SRS exactly | Hub at `/{country}/services/`, detail at `/{country}/{service-slug}/` per the §3.2 table — the only reading satisfying both | ⚠️ **Please confirm** |
| 6 | Brief lists pages incl. **About, Careers, Support, Testimonials, Resources**; SRS §3.1 lists these as "global templates, **localised copy per country**" | Both agree | Built as `/{country}/about/` etc. — localised, not global-only | No |
| 7 | §11.1 — ~7,000 pages across 6 countries | Production-ready static build | **Tiered scope** (plan §2): Tier 1 hand-crafted complete; Tier 2 representative; Tier 3 architecture-proven. Documented precisely. | ⚠️ **Volume needs your sign-off** |

## Appendix B — Items Not Specified in the PDF (require your input)

The SRS is comprehensive on strategy but silent on these. We propose defaults in the execution plan; all are marked **[INFERRED]** and are easily changed:

1. **Company facts** — founding year, founder name(s)/bio, registered addresses per country, phone numbers, email, legal entity names. **Required for Organization / LocalBusiness / Person schema (§7.6) and for E-E-A-T.** This is the largest single gap.
2. **Definitive service list & slugs.** §11.1 says 50 services/country but never names them. We derive 10 core services from the inspiration image (Digital Marketing, Advertising, Branding, Graphic & Web Design, Social Media Management) plus services named throughout the SRS (SEO, Google Ads, CRO, process automation, content, analytics, reputation management, local SEO, email/retention).
3. **Real client names, logos, testimonials, case-study metrics.** §23 mandates real metrics and video testimonials but supplies none. Placeholders will be **clearly marked as such** — we will not fabricate client names or invent statistics presented as real.
4. **City lists for India and USA.** SRS names cities for **Canada** (Toronto, Vancouver, Montreal, Calgary), **Australia** (Sydney, Melbourne, Brisbane, Perth), **Germany** (Berlin, Munich, Frankfurt, Hamburg), and **UAE** (Dubai, Abu Dhabi) — but only says "top 10–15 metro/tier-2" for India and "industry/use-case" for USA. **[INFERRED]** lists proposed in the plan.
5. **Competitor names for `/compare/{competitor}/`.** SRS uses the placeholder "agency-x".
6. **Brand assets** — logo files, wordmark, favicon, photography library, OG image template (§13 requires an auto-generated branded OG template).
7. **Domain name** — required for canonical URLs, hreflang, sitemap, and Organization schema.
8. **Pricing figures** per country and currency.
9. **Certifications, awards, partner badges, media mentions** — the brief requires these for E-E-A-T; the SRS does not enumerate them.

---

*Prepared by the Creative Direction, Brand Strategy, Product Design, UX Research, IA, SEO Architecture, Technical SEO, International SEO, AEO, GEO, CRO, E-E-A-T, Accessibility, Core Web Vitals, Performance, and Next.js Architecture team.*
*No code has been written. Proceed to `WEBSITE_EXECUTION_PLAN.md`.*
