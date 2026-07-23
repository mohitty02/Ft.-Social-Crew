# WEBSITE_EXECUTION_PLAN.md
## Ft. Social Crew — Global Website · Pre-Development Execution Plan

**Companion to:** `UNDERSTANDING.md`
**Derived from:** `Ft_Social_Crew_Global_Website_SRS_and_Growth_Blueprint.pdf` (48 pp, read in full) + `WhatsApp Image 2026-07-19 at 12.32.19 PM.jpeg`
**Status:** 🔒 **AWAITING APPROVAL — no code will be written until this plan is signed off.**

Legend: **[SRS §x]** = traceable to the PDF · **[INFERRED]** = not in the PDF, proposed by us, changeable on request.

---

## 1. Complete Sitemap

### 1.1 Country registry [SRS §2.1]

| Country | Code | Locale | Currency | Positioning H1 driver | Primary contact channel |
|---|---|---|---|---|---|
| India | `in` | `en-IN` | INR | Business Growth Agency / Digital Growth Partner | **WhatsApp** [§15.1] |
| USA | `en-us` | `en-US` | USD | Growth Consulting Firm / Revenue Growth Partner / Fractional Growth Team | Calendly + form |
| Canada | `en-ca` | `en-CA` | CAD | Digital Transformation Partner / Business Growth Consultant | **Consultation booking** [§23.3] |
| Australia | `en-au` | `en-AU` | AUD | Performance Marketing Partner / Business Growth Consultants | Form + ROI calculator [§23.4] |
| Germany | `de` | `de-DE` | EUR | Business Process Automation / Digital Engineering Company | Formal enquiry + whitepaper [§23.5] |
| UAE | `en-ae` | `en-AE` | AED | Business Growth & Technology Consulting / Premium Business Consulting | **Consultation-first** + WhatsApp [§23.6] |

Codes are **lowercase, hyphenated locale format** per [SRS §21.3].

### 1.2 Global routes (outside country folders)

```
/                          Global root — country selector + soft geo-suggestion banner   [§3.1, §7.3]
/sitemap.xml               Sitemap index → per-country, per-content-type segments        [§7.5, §8.3]
/robots.txt                Global, disallow rules for /lp/ landing paths                 [§7.5]
/404, /500                 Error templates
```

> **Critical [SRS §7.3]:** the root offers a **soft suggestion banner only — never a forced redirect**, so every country's content stays crawlable and directly accessible. `x-default` hreflang points here [§7.1].

### 1.3 Per-country sitemap — applied to all 6 countries

```
/{country}/                                     Country Homepage        hand-crafted   [§3.4]
├── services/                                   Services hub (pillar)
│   └── ../{service-slug}/                      Service detail  → /{country}/{service-slug}/   [§3.2]
├── industries/                                 Industries hub
│   ├── {industry}/                             Industry page           programmatic   [§3.4]
│   └── {industry}/{service}/                   Industry × Service      programmatic   [§3.2]
├── locations/                                  Locations hub
│   ├── {city}/                                 City page               programmatic   [§3.4]
│   └── {city}/{service}/                       City × Service          programmatic   [§3.2]
├── case-studies/  →  {slug}/                   Case study              authored       [§3.2]
├── blog/          →  {slug}/                   Blog post               authored       [§3.2]
│   └── category/{cat}/   ·   /page/{n}/        Cluster + pagination    [§7.6, §11.2]
├── resources/     →  {slug}/                   Guides, templates, calculators, checklists  [§3.1, §11.1]
├── pricing/                                    Two modes — see §1.5
├── testimonials/                               Proof hub                              [§3.1]
├── about/                                      Localised copy                         [§3.1]
├── careers/                                    Localised copy                         [§3.1]
├── support/                                    Localised copy                         [§3.1]
├── contact/                                    Localised phone/office details         [§3.1]
├── compare/{competitor}/                       Comparison template     programmatic   [§3.2]
├── privacy/  ·  terms/                         Legal, localised (GDPR surfaced on /de/) [§3.1, §23.5]
└── lp/{campaign}/                              Campaign landing — NOINDEX by default  [§3.1, §3.4]
```

### 1.4 Taxonomies

**Services — 10 core** [INFERRED slugs; derived from the inspiration image's five service pills + services named across SRS §9.1, §23, §24. SRS §11.1 targets 50 services/country as core + sub-variants — these 10 are the core tier.]

| # | Service | Slug | Sourced from |
|---|---|---|---|
| 1 | Search Engine Optimisation | `seo-services` | §3.2 example URL, §9.1, §10.3 |
| 2 | Paid Advertising (Google · Meta · LinkedIn) | `paid-advertising` | Image "ADVERTISING"; §23 Ads rows |
| 3 | Social Media Management | `social-media-management` | Image pill |
| 4 | Content Marketing | `content-marketing` | §9.1, §24.5, §24.14 |
| 5 | Web Design & Development | `web-design-development` | Image "GRAPHIC & WEB DESIGN"; §2.1 India |
| 6 | Branding & Creative | `branding-creative` | Image "BRANDING" (×2) |
| 7 | Conversion Rate Optimisation | `conversion-rate-optimisation` | §24.5, §24.13 |
| 8 | Marketing & Process Automation | `process-automation` | **§2.1 Germany positioning driver** |
| 9 | Growth Consulting & Fractional Teams | `growth-consulting` | **§2.1 USA positioning driver**, §1.5 |
| 10 | Analytics & Reporting | `analytics-reporting` | §14 |

Slugs use AU/CA spelling variants per market where the SRS demands it (`conversion-rate-optimization` on `/en-us/`) [§7.4].

**Industries — 14, taken verbatim from [SRS §24.1–24.14]** (no inference — the PDF enumerates exactly these):
Healthcare · Real Estate · Law Firms · Dentists · SaaS · IT Companies · Manufacturing · Construction · Education · Hospitality · Finance · Automotive · E-commerce · Professional Services

Each has a documented Buyer Persona, Pain Points, Services Required, SEO Strategy, Content Ideas, Landing Pages, Lead Magnets, Ads Keywords, LinkedIn/Meta strategy, and Case Study Ideas — **§24 is a complete content brief for 14 pages × 6 countries.**

**Cities**

| Country | Cities | Source |
|---|---|---|
| Canada | Toronto, Vancouver, Montreal, Calgary | ✅ **[SRS §23.3]** |
| Australia | Sydney, Melbourne, Brisbane, Perth | ✅ **[SRS §23.4]** |
| Germany | Berlin, Munich, Frankfurt, Hamburg | ✅ **[SRS §23.5]** |
| UAE | Dubai, Abu Dhabi | ✅ **[SRS §23.6]** |
| India | Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Pune, Ahmedabad, Kolkata, Jaipur, Chandigarh | **[INFERRED]** — §23.1 says only "top 10–15 metro/tier-2" |
| USA | New York, San Francisco, Austin, Chicago, Los Angeles, Boston, Seattle, Miami | **[INFERRED]** — §23.2 specifies industry/use-case pages, not cities |

### 1.5 The Pricing template has two modes — a direct SRS read

| Mode | Markets | Rationale |
|---|---|---|
| **Productized** — transparent fixed-price package grid, local currency | **India (INR), UAE (AED, partial)** | §1.5 "Productized Packages — primarily India/UAE"; §23.1 "INR-denominated transparent pricing" |
| **Consultative** — engagement models, retainer/fractional framing, booking CTA, no public price grid | **USA, Canada, Australia, Germany, UAE** | §1.5 "Fractional… sold primarily in US/Canada/Australia"; §23.6 **"consultation-first CTAs over self-serve pricing"**; §23.3 "consultation-booking CTAs over hard-sell forms" |

UAE is deliberately hybrid: premium consultative lead, AED pricing "where appropriate" [§23.6].

---

## 2. Page Priority & Build Scope

Prioritised by the SRS conversion funnel — **Landing → Service Page → Pricing/Contact → Form Submit** [§14.2] — and by §7.7's instruction to favour **money pages** over low-value combinatorial pages.

### 2.1 Priority tiers

| Tier | Pages | Why | Build treatment |
|---|---|---|---|
| **P0 — Money** | 6 Country Homepages · 60 Service pages (10 × 6) · 6 Pricing · 6 Contact | §3.4 "hand-crafted per country"; §14.2 funnel core | **Hand-crafted content, full uniqueness discipline** [§7.4] |
| **P1 — Authority & Proof** | 6 About · 6 Case-study hubs + details · 6 Testimonials · Industries hubs + 84 industry pages (14 × 6) | E-E-A-T; §11.2 proof layer; §24 | Structured, richly authored |
| **P2 — Reach** | Locations hubs + city pages · Blog hubs + posts · Resources | §23 local SEO; §12 cadence | Template + real content, quality-gated [§11.3] |
| **P3 — Long-tail** | Industry × Service · City × Service · Compare | §3.4 programmatic | Template proven with representative sample |
| **P4 — Paid** | `/lp/{campaign}/` | §3.1 noindex by default | 1 exemplar per positioning |
| **P5 — Utility** | Careers · Support · Privacy · Terms · 404 | §3.1 | Localised, lean |

### 2.2 Honest scope statement — what we render vs. what the architecture supports

At §11.1 minimums the full system is **~7,000 pages across 6 countries**. Rendering all of them requires content that does not yet exist (see `UNDERSTANDING.md` Appendix B). Our build is tiered and we state the numbers plainly:

| Tier | Rendered in this build | Architecture supports |
|---|---|---|
| Country homepages | **6 / 6** — every one hand-crafted, unique hero/proof/CTA/tone | ∞ countries via registry |
| Service pages | **60 / 60** (10 × 6) | 50/country = 300 |
| Industry pages | **84 / 84** (14 × 6) | 14 × n countries |
| City pages | **36 / 36** (all SRS-named + inferred lists) | unlimited |
| Industry × Service | **~120 representative** (curated highest-value pairs) | 14 × 10 × 6 = 840 |
| City × Service | **~90 representative** | 36 × 10 = 360 |
| Blog | **~36** (6/country, real authored posts) | 300/country = 1,800 |
| Case studies | **~24** (4/country) | 50/country |
| Resources | **~18** | 100/country |
| Compare | **~12** (2/country) | competitor × country |
| Utility/legal/hubs | **~120** | — |
| **Approx. total rendered** | **~600 pages** | **~7,000+** |

**Adding the remaining ~6,400 pages requires only content records — zero code changes** [SRS §1.7]. This is the scalability requirement, demonstrated rather than asserted.

⚠️ **Decision needed:** confirm this scope, or tell us to expand/reduce a tier.

---

## 3. Component Inventory

Enterprise component library, `packages/ui` equivalent per [SRS §21.1]. **~95 components.** Shared across marketing pages and a future admin panel [§22.3].

### 3.1 Primitives (18)
`Button` (primary/secondary/ghost/link × sm/md/lg) · `Pill` **(solid | outline — the brand signature)** · `Badge` · `Card` · `Input` · `Textarea` · `Select` · `Checkbox` · `Radio` · `Label` · `FieldError` · `Link` (locale-aware) · `Icon` (Lucide wrapper) · `Divider` · `GoldRule` · `Avatar` · `Tooltip` · `VisuallyHidden`

### 3.2 Layout (12)
`Container` · `Section` (surface variant: white | blush | burgundy-invert) · `Grid` · `Stack` · `SplitLayout` · `Sticky` · `Header` · `Footer` · `Nav` (mega-menu) · `MobileNav` · `Breadcrumbs` (mirrors URL hierarchy [§7.6]) · `SkipLink`

### 3.3 Navigation & international (7)
`CountrySwitcher` · `GeoSuggestionBanner` **(soft, dismissible, never redirects [§7.3])** · `LocalePrice` (currency from country record [§6.1]) · `LocalePhone` · `LocaleDate` · `MegaMenuPanel` · `TableOfContents` (sticky, blog/resources)

### 3.4 Hero & narrative (9)
`HeroCountry` (6 variants — hand-crafted per country) · `HeroPage` · `HeroService` · `HeroIndustry` · `HeroCity` · `EyebrowLabel` · `DisplayHeading` · `LeadParagraph` · `ScrollCue`

### 3.5 AEO / GEO components (7) — **the highest-leverage set in the build**
| Component | Purpose | SRS anchor |
|---|---|---|
| **`AnswerBlock`** | Direct, quotable answer statement placed **immediately under the H1** on every money page | **§9.2 GEO — "quotable answer statements near the top"** |
| `DefinitionCard` | "What is X?" entity definition, `DefinedTerm` schema | §9.2 entity consistency |
| `FAQAccordion` | Explicit Q/A pairs + FAQPage schema | **§9.2 AEO**, §7.6 |
| `ComparisonTable` | Structured, extractable comparison | §10.1 comparison intent |
| `KeyTakeaways` | Bulleted summary block | §9.2 LLM-friendly formatting |
| `EntityLinkCluster` | Contextual related-entity links | §9.1 Semantic/Entity SEO |
| `StatStrip` | Machine-readable metrics with units | §23.2 real metrics |

### 3.6 Proof & E-E-A-T (14)
`CaseStudyCard` · `CaseStudyDetail` · `MetricBlock` · `ResultsBar` · `TestimonialCard` · `TestimonialQuote` · `VideoTestimonial` [§23.2] · `ClientLogoWall` · `TrustBadgeRow` · `CertificationGrid` · `AuthorBio` (Person schema) · `TeamGrid` · `MethodologySteps` · `MediaMentions`

### 3.7 Conversion / CRO (13)
`CTASection` · `StickyCTA` (mobile-first) · `InlineCTA` · `LeadForm` **(`variant="short"` service pages | `variant="qualifying"` pricing/contact — §15.1)** · `CalendlyEmbed` (lazy slot) · `WhatsAppCTA` **(India/UAE only — §15.1)** · `PhoneCTA` (call-tracking ready) · `LiveChatSlot` (lazy) · `LeadMagnetCard` · `ROICalculator` **(Australia — §23.4)** · `NewsletterSignup` · `ExitIntentPrompt` · `PricingTable` (productized | consultative modes)

### 3.8 Content & listing (13)
`ServiceCard` · `ServiceGrid` · `IndustryCard` · `CityCard` · `BlogCard` · `BlogGrid` · `Pagination` **(next/prev + canonical-per-page — §7.6)** · `CategoryFilter` · `ResourceCard` · `RelatedContent` (§13 scoring) · `ProseRenderer` · `Callout` · `ProcessTimeline`

### 3.9 SEO infrastructure (non-visual, 8)
`JsonLd` · `SchemaOrganization` · `SchemaLocalBusiness` (per country) · `SchemaService` · `SchemaFAQPage` · `SchemaBreadcrumbList` · `SchemaArticle` + `SchemaPerson` · `SchemaReview`/`AggregateRating`
All **generated from structured fields, never hand-coded per page** [§7.6, §13].

### 3.10 Motion (6)
`Reveal` · `StaggerGroup` · `CountUp` · `MarqueeLogos` · `ParallaxMedia` · `MagneticButton`

---

## 4. Design System

### 4.1 Direction
> **Editorial luxury with engineering credibility.** Confident typographic scale, disciplined colour, generous whitespace, and *evidence as ornament*. Authored, not assembled.

### 4.2 The five inherited rules from the inspiration image
1. **Oversized ALL-CAPS display type**, tight tracking, tight leading.
2. **The pill is the signature shape** — fully rounded, in two states.
3. **Solid and outline pills alternate** — rhythm is a rule, not a choice.
4. **Gold appears only as a hairline** — never a fill. (Also solves its contrast failure, §7.4.)
5. **A small quiet underlined link counterweights the huge headline** — deliberate scale contrast.

### 4.3 Light-theme inversion
The image is burgundy-dominant; the brief mandates light. The composition inverts: **off-white is the field · burgundy is ink and primary action · blush is the tinted surface · gold stays a hairline.** Burgundy-inverted sections return as *punctuation* — roughly 1 in 5 sections — preserving the source's drama without a dark site.

### 4.4 Surface rhythm
`white → blush-tint → white → burgundy-invert → white` — the direct descendant of the image's alternating pill stack, scaled up to page level.

### 4.5 Country theming boundary [SRS §22.3 — non-negotiable]
> *"Country-specific theming limited to imagery/proof content — core visual language stays consistent for brand recognition across markets."*

**Varies per country:** hero copy, imagery, proof points, stats, testimonials, client logos, CTA wording, currency, tone, section ordering, lead magnet.
**Never varies:** palette, type system, spacing scale, component design, iconography.

---

## 5. Colour Tokens

All values **sampled programmatically** from the inspiration image (Pillow, 1536×1024, hue/saturation isolation + dominant-cluster analysis). Contrast ratios computed to WCAG 2.1.

### 5.1 Extracted source colours

| Role | Hex | Evidence |
|---|---|---|
| **Deep Burgundy** (primary) | **`#470826`** | Dominant background; darkest cluster `#460824` @ 87,073 px |
| **Champagne Gold** (accent) | **`#F4C88C`** | Hue-isolated from outlined pill borders |
| **Soft White / Blush** (surface) | **`#F4DEE8`** | Filled pill fill @ 18,123 px |
| **Wine** (secondary) | `#6E1236` | **[INFERRED]** — no discrete wine region exists in the image; interpolated |

### 5.2 Full token scale

```
--burgundy-50   #FBF4F7      --wine-50    #FBF3F6
--burgundy-100  #F4DEE8  ←   --wine-100   #F6E3EB
--burgundy-200  #E9C2D2      --wine-300   #C77A9C
--burgundy-300  #D194AF      --wine-500   #8E2049
--burgundy-400  #A84A72      --wine-600   #6E1236  ← Wine / SECONDARY
--burgundy-500  #7A1E45      --wine-700   #5A0E2C
--burgundy-600  #5C0F31
--burgundy-700  #470826  ← Deep Burgundy / PRIMARY
--burgundy-800  #3A0620
--burgundy-900  #2E0518
--burgundy-950  #1D030F

--gold-100  #FDF3E4       --neutral-0    #FFFFFF
--gold-200  #FBE7C9       --neutral-25   #FDFBFC   ← page background (off-white)
--gold-300  #F4C88C  ← Champagne Gold / ACCENT (hairline & decorative ONLY)
--gold-500  #D9A45F                      --neutral-100  #F3F1F2
--gold-700  #8A5A16  ← "gold ink" — the ONLY gold usable for text
                                         --neutral-900  #171114
```

### 5.3 Semantic tokens

| Token | Light value | Use |
|---|---|---|
| `--bg-page` | `#FDFBFC` | Default page field |
| `--bg-surface` | `#FFFFFF` | Cards |
| `--bg-tint` | `#F4DEE8` | Blush section |
| `--bg-invert` | `#470826` | Burgundy punctuation section |
| `--text-primary` | `#1D030F` | Body |
| `--text-brand` | `#470826` | Headings, brand ink |
| `--text-muted` | `#5A4A50` | Secondary |
| `--text-on-invert` | `#F4DEE8` | Text on burgundy — matches the image's soft-white |
| `--border-subtle` | `rgba(71,8,38,0.10)` | Card/section rules |
| `--border-accent` | `#F4C88C` | **The signature gold hairline** |
| `--focus-ring` | `#470826` + 2px offset | Never colour-only |

### 5.4 Contrast audit (computed, WCAG 2.1)

| Pair | Ratio | Verdict |
|---|---|---|
| Burgundy `#470826` on white | **15.8 : 1** | ✅ AAA |
| Wine `#6E1236` on white | **11.7 : 1** | ✅ AAA |
| Burgundy on blush `#F4DEE8` | **7.1 : 1** | ✅ AAA (normal text) |
| Blush `#F4DEE8` on burgundy | **7.1 : 1** | ✅ AAA — the image's own pairing |
| Gold `#F4C88C` on burgundy | **10.1 : 1** | ✅ AAA |
| **Gold `#F4C88C` on white** | **1.6 : 1** | ❌ **FAILS — decorative/hairline only. Enforced by lint rule.** |
| Gold-ink `#8A5A16` on white | **5.9 : 1** | ✅ AA — the only gold permitted for text |

### 5.5 Dark mode [SRS §22.2]
The SRS requires dark mode "via design-token theming, not a separate template set." The brief requires a light site. **Resolution:** every colour is consumed as a semantic token, so a `[data-theme="dark"]` block is the only future work. **Light ships as the sole active theme; the architecture satisfies §22.2 without shipping a dark site.**

---

## 6. Typography Scale

### 6.1 Families — 3 max, all variable, `next/font`, `display: swap`, latin subset, self-hosted

| Role | Family | Rationale |
|---|---|---|
| **Display** | **Fraunces** (variable, optical sizing) | Editorial-luxury serif. Delivers the "premium/luxury/editorial" register and the **engineering-credibility gravitas Germany requires** [§2.2]. Differentiates from every grotesk agency template. |
| **Body / UI** | **Inter** (variable) | Peerless legibility at small sizes, full Latin-Ext for German diacritics, excellent numerals for stat blocks. |
| **Lockup / Eyebrow** | **Inter Tight**, uppercase, +0.08em tracking | Carries the inspiration image's ALL-CAPS pill/lockup voice into eyebrows, badges, and pills. |

Subset to `latin` + `latin-ext` (German). Variable axes only — **≤ 3 font files total**, `preload` on the display face only.
**[INFERRED]** — the SRS specifies no typefaces. Swappable on request.

### 6.2 Fluid scale (clamp — no breakpoint jumps, protects CLS)

| Token | Size | Line-height | Tracking | Use |
|---|---|---|---|---|
| `display-1` | `clamp(2.75rem, 1.5rem + 5.2vw, 5.5rem)` | 0.94 | −0.03em | Country hero H1 |
| `display-2` | `clamp(2.25rem, 1.4rem + 3.6vw, 4rem)` | 0.98 | −0.025em | Page H1 |
| `h1` | `clamp(2rem, 1.3rem + 2.8vw, 3.25rem)` | 1.05 | −0.02em | Article H1 |
| `h2` | `clamp(1.625rem, 1.2rem + 1.8vw, 2.5rem)` | 1.15 | −0.015em | Section |
| `h3` | `clamp(1.25rem, 1.05rem + 0.9vw, 1.75rem)` | 1.25 | −0.01em | Sub-section |
| `h4` | `1.125rem → 1.25rem` | 1.35 | 0 | Card title |
| `lead` | `clamp(1.125rem, 1rem + 0.6vw, 1.375rem)` | 1.55 | 0 | Intro / **AnswerBlock** |
| `body` | `1rem` (`1.0625rem` desktop) | 1.65 | 0 | Prose |
| `small` | `0.875rem` | 1.5 | 0 | Meta |
| `eyebrow` | `0.75rem` | 1.2 | **+0.08em, uppercase** | Labels, pills |
| `stat` | `clamp(2.5rem, 2rem + 3vw, 4.5rem)` | 1 | −0.02em | Metrics — tabular numerals |

### 6.3 Heading hierarchy rules [SEO — mandatory]
- **Exactly one `<h1>` per page**, containing the country positioning term [§2].
- No level skipping. Visual size is decoupled from semantic level via tokens.
- Section headings map to keyword clusters [§10.3]; FAQ questions are `<h3>` inside `FAQAccordion`.
- Measure capped at **68ch** for prose.
- German copy tested at **+30% string length** — no fixed-width text containers.

---

## 7. Spacing System

**Base unit 4px · 8pt rhythm. Every gap is a token — arbitrary values are lint errors.**

```
space-0   0      space-5   20px    space-16  64px
space-1   4px    space-6   24px    space-20  80px
space-2   8px    space-8   32px    space-24  96px
space-3   12px   space-10  40px    space-32  128px
space-4   16px   space-12  48px    space-40  160px
```

**Section padding (vertical):** mobile `space-16` (64) · tablet `space-24` (96) · desktop `space-32`–`space-40` (128–160)
**Grid:** 12 columns · content max `1280px` · shell max `1440px` · gutters `20 / 32 / 48` (mobile / tablet / desktop)
**Radii:** `sm 6` · `md 10` · `lg 16` · `xl 24` · **`pill 9999` ← the signature shape**
**Elevation:** borders over shadows. `shadow-sm` for hover lift only. No heavy drop shadows — they read as template.

**Breakpoints [SRS §22.1 — verbatim]**

| Name | Range | Design priority |
|---|---|---|
| Mobile | `< 768px` | **Primary — majority of organic traffic across all 6 countries** |
| Tablet | `768–1024px` | Secondary — **verified layout, not redesigned separately** |
| Desktop | `> 1024px` | Full layout |

---

## 8. Iconography

- **Library:** Lucide (per brief) — **imported per-icon only**, never barrel-imported, so tree-shaking is real.
- **Grid:** 24×24 · stroke `1.5px` (`1.25px` at ≥32px for optical consistency).
- **Colour:** `currentColor` inherited from `--text-brand`; **champagne gold reserved for decorative icon strokes on burgundy surfaces only** (fails contrast on white, §5.4).
- **Semantics:** decorative icons get `aria-hidden="true"`; meaningful icons get an accessible name. **Icons never carry meaning alone** — always paired with a text label.
- **Service icons:** one consistent Lucide glyph per service, defined once in the service registry so it is identical everywhere.
- **Country flags:** ❌ **not used as UI**. Flags misrepresent language vs. territory and add weight. The `CountrySwitcher` uses country name + locale code + currency — clearer and SRS-consistent (`en-us`, `de` are locale codes, not nationalities).
- **Custom set (~10):** brand marks where Lucide has no equivalent (methodology steps, growth motifs), delivered as inline SVG sprites.

---

## 9. SEO Implementation Checklist

### Foundation
- [ ] Single domain, subfolder model — `/in/`, `/en-us/`, `/en-ca/`, `/en-au/`, `/de/`, `/en-ae/` **[§ cover, §1.1]**
- [ ] URL patterns exactly per **[§3.2]** table · kebab-case · lowercase locale codes **[§21.3]**
- [ ] Trailing-slash consistency; no uppercase, no params in canonical URLs

### International SEO **[§7]**
- [ ] `hreflang_group_id` model linking country equivalents **[§7.1]**
- [ ] Hreflang in `<head>` **AND** mirrored in XML sitemap — both, for redundancy **[§7.1]**
- [ ] **Self-referencing hreflang mandatory on every page** **[§7.1]**
- [ ] `x-default` → global root **[§7.1]**
- [ ] **Every page self-canonicalises to its own country URL — never to a "master" variant** **[§7.2]**
- [ ] UTM/param variants canonicalise to clean URL **[§7.2]**
- [ ] **Canonical-per-page on paginated series — not collapsed to page 1** **[§7.2]**
- [ ] Folder-level geo-targeting; per-country GSC property **[§7.3]**
- [ ] **Soft geo-suggestion banner — never a forced redirect** **[§7.3]**

### Duplicate content **[§7.4]**
- [ ] H1 + first 300 words **substantively unique per country**
- [ ] Local spelling per market (colour/color, optimise/optimize)
- [ ] Local currency, local proof points, local CTAs
- [ ] Unique meta title + description per country variant
- [ ] Build-time similarity check flagging **>80% overlap** between country variants

### Structured data **[§7.6]** — all generated from structured fields, never hand-coded **[§13]**
- [ ] Organization · **LocalBusiness per country** · Service · FAQPage · BreadcrumbList · Review/AggregateRating
- [ ] Article + Person on blog posts · WebSite + SearchAction on root
- [ ] BreadcrumbList **mirrors the visible breadcrumb trail** **[§7.6]**
- [ ] Breadcrumbs always reflect URL hierarchy: **Country > Section > Page** **[§7.6]**

### Metadata & social **[§13]**
- [ ] Title/description templated from content title + country + service; auto-truncation fallback
- [ ] OG image auto-generated branded template with page title; per-country default fallback
- [ ] Twitter Card mirrors OG data
- [ ] **ALT text required on every image — missing ALT is a build error** (mirrors §13's publish-block)

### Sitemaps, robots, feeds **[§7.5, §8]**
- [ ] XML sitemap index → segments **chunked per country + content type** (<50k URLs / 50MB) **[§8.3]**
- [ ] Image sitemap · video sitemap slot · per-country RSS · HTML sitemap page
- [ ] `robots.txt` with `/lp/` disallow **[§7.5]**
- [ ] Regeneration on build (static equivalent of §8's publish-event pipeline)

### Indexing & crawl budget **[§7.7]**
- [ ] Landing pages `noindex` by default **[§3.1, §3.4]**
- [ ] **Programmatic pages failing the §11.3 quality gate are `noindex` until enriched**
- [ ] Internal-link priority favours money pages over combinatorial pages
- [ ] Pagination next/prev + crawlable fallback for any infinite scroll **[§7.6]**

### Topical architecture **[§10, §11]**
- [ ] Pillar → Cluster → Supporting-blog → Proof-layer linking **[§11.2]**
- [ ] Content silos per service and per industry
- [ ] Contextual internal linking by category/industry/city **[§13]**
- [ ] Comparison pages for competitive intent **[§10.1, §23.2]**

---

## 10. AEO Implementation Checklist

> **[§9.2]:** *"structure FAQ and how-to content with explicit Q/A pairs and FAQPage schema to increase eligibility for AI Overviews and assistant answers."*

- [ ] **`AnswerBlock` directly under the H1 on every money page** — a single self-contained, quotable sentence answering the page's core question
- [ ] `FAQAccordion` on every service, industry, city, and pricing page — **explicit Q/A pairs + FAQPage schema**
- [ ] **100 FAQs per country**, distributed across service/industry/pricing pages **[§11.1]**
- [ ] Questions phrased as real user queries from the §10.1 **Question** and **Problem-Based** intent buckets ("how much does SEO cost", "leads not converting")
- [ ] `DefinitionCard` for every core entity ("What is a fractional growth team?") with `DefinedTerm` schema
- [ ] `KeyTakeaways` bulleted summary on long-form pages
- [ ] `ComparisonTable` — semantic `<table>` with `<caption>`, `<th scope>`; never a div grid
- [ ] Answer-first content order: **claim → evidence → detail** (never build-up → reveal)
- [ ] Self-contained paragraphs — each readable without surrounding context (LLM chunking)
- [ ] Semantic HTML throughout: `article` `section` `nav` `aside` `figure/figcaption` `dl/dt/dd` `time` `address`
- [ ] Numbered `<ol>` for processes, `<ul>` for feature sets — never styled divs
- [ ] Stats in machine-readable form with explicit units and timeframes

---

## 11. GEO Implementation Checklist

> **[§9.2]:** *"write direct, quotable answer statements near the top of key pages so AI answer engines can extract and attribute them cleanly."*
> Targets: Google AI Overview, ChatGPT, Gemini, Claude, Perplexity, Copilot.

- [ ] **Quotable answer statement in the first 200 words of every money page** — the single most cited GEO instruction in the SRS
- [ ] **Entity-first architecture:** Ft. Social Crew as the central entity; services, industries, cities, and countries as linked entities [§9.1 Entity SEO]
- [ ] **Consistent entity facts across the entire site** — founding info, service definitions, locations — *"so AI systems build a stable, correct picture of the brand"* [§9.2]
- [ ] Consistent **NAP** (name/address/phone) everywhere; **Knowledge Panel readiness** [§9.1]
- [ ] `sameAs` links to all third-party profiles in Organization schema [§9.2 entity consistency]
- [ ] Topical authority depth: pillar + cluster + supporting content per subject [§9.1]
- [ ] **Semantic SEO** — cover related entities and questions, not just exact keywords [§9.1]
- [ ] Attribution-friendly formatting: clear author, publish date, `dateModified`, sources
- [ ] Contextual relationship blocks: service ↔ industry ↔ city ↔ case study, bidirectionally linked
- [ ] Original, citable data — benchmark figures and methodology [§23.2 data-study link bait]
- [ ] Clean, crawlable static HTML — **content present without JS execution** (a structural GEO advantage of static export)
- [ ] Proper information hierarchy so extraction boundaries are unambiguous

---

## 12. E-E-A-T Implementation Checklist

### Experience
- [ ] Case studies with **real, verifiable metrics** [§23.2] — 50/country target [§11.1]
- [ ] **Client video testimonials** [§23.2 — explicitly named for USA]
- [ ] Project timelines and before/after outcome data
- [ ] Industry-specific experience surfaced on all 14 industry pages [§24]

### Expertise
- [ ] `AuthorBio` with **Person schema** on every blog post and resource
- [ ] Author credentials, role, and expertise area
- [ ] `MethodologySteps` — **process documentation as proof of rigour** [§23.5, Germany]
- [ ] Technical depth appropriate to the vertical [§24 per-industry briefs]

### Authoritativeness
- [ ] `CertificationGrid` — Google Partner, Meta Partner, platform certifications **[INFERRED — awaiting your list]**
- [ ] Awards and recognitions **[INFERRED — awaiting your list]**
- [ ] `MediaMentions` — press and publication features [§23 backlink/PR rows]
- [ ] `ClientLogoWall` — with **enterprise logos emphasised on `/en-ae/`** [§23.6]
- [ ] Partnership and association memberships [§23.3, §23.5]

### Trust
- [ ] Full company information: legal entity, registration, **addresses per country** [§3.1 contact]
- [ ] Localised phone/office details per country [§3.1]
- [ ] **Transparent pricing where the market expects it** — INR (India), AUD (Australia), CAD (Canada), EUR (Germany), AED (UAE) [§23.1, §23.3, §23.4, §23.5, §23.6]
- [ ] **GDPR-compliant data handling clearly stated on `/de/`** [§23.5]
- [ ] Privacy policy and terms, localised per country [§3.1]
- [ ] `TrustBadgeRow` — security, compliance, partner marks
- [ ] Clear, honest CTAs with no dark patterns
- [ ] **Placeholder content is visibly marked as placeholder. We will not fabricate client names, logos, or statistics.**

---

## 13. CRO Implementation Checklist

**Primary funnel [§14.2] — must be the path of least resistance in the IA:**
`Landing → Service Page → Pricing/Contact → Form Submit → CRM-qualified`

### CTA hierarchy
- [ ] **One primary CTA per viewport**; secondary always visually subordinate
- [ ] Hero CTA · mid-page inline CTA · section-end CTA · footer CTA
- [ ] **`StickyCTA` on mobile** — mobile is the primary breakpoint [§22.1]
- [ ] Country-appropriate CTA wording [§2.2]: India *"Talk to a growth partner"* · USA *"Book a growth audit"* · Canada *"Book a consultation"* [§23.3] · Australia *"Get your ROI projection"* [§23.4] · Germany *"Prozessanalyse anfordern"* [§23.5] · UAE *"Request a consultation"* [§23.6]

### Forms [§15.1] — two lengths, per the SRS
- [ ] **Short form** (name / email / service interest) on **service pages**
- [ ] **Longer qualifying form** on **pricing and contact pages**
- [ ] Inline validation, clear error states, accessible labels, logical tab order
- [ ] Single submit injection point (no processing — per brief)

### Channel CTAs [§15.1]
- [ ] `WhatsAppCTA` — **India and UAE only**, where it is the dominant business channel
- [ ] `CalendlyEmbed` — contact and pricing pages, high-intent visitors
- [ ] `PhoneCTA` — call-tracking-ready per country
- [ ] `LiveChatSlot` — lazy, routed by country/timezone

### Social proof & risk reduction
- [ ] Client logos above the fold or immediately below
- [ ] Testimonials adjacent to every conversion point [§11.2 proof layer]
- [ ] Case studies **linked contextually into cluster and pillar pages — "to support conversion, not just ranking"** [§11.2]
- [ ] `StatStrip` with real numbers [§23.2]
- [ ] Transparent process, timelines, and "what happens next" after form submit

### Lead magnets [§23]
- [ ] USA — gated benchmark reports · Australia — **ROI calculator** · Germany — whitepapers · India — city landing pages + WhatsApp · UAE — premium consultation offer · Canada — transformation pillar content
- [ ] Per-industry magnets from the §24 tables (14 verticals)

### Micro-interactions
- [ ] Button hover/press states · card lift · focus rings · scroll-triggered reveals · animated stat counters · form field focus transitions

---

## 14. Performance Optimization Checklist

**Targets:** Lighthouse ≥ 95 across Performance / Accessibility / Best Practices / SEO (aiming 100) · **LCP < 2.0s · INP < 200ms · CLS < 0.1** · sub-100ms TTFB globally [§16].

### Per-template performance budgets [§7.7, §16]
| Budget | Limit |
|---|---|
| JS (first-load, gzipped) | **≤ 110 KB** |
| CSS | ≤ 30 KB |
| Fonts | ≤ 3 files, ≤ 90 KB total |
| LCP image | ≤ 120 KB (AVIF) |
| Total page weight | ≤ 700 KB |
| DOM nodes | ≤ 1,500 |

CI fails the build if a template exceeds budget — this is how §7.7's *"performance budgets enforced per template"* becomes real.

### Images [§16]
- [ ] `next/image` throughout · **AVIF → WebP → JPEG** fallback chain
- [ ] Responsive `sizes` on every image · explicit width/height (**CLS = 0**)
- [ ] **`priority` on the LCP hero image only**; everything below the fold lazy
- [ ] Blur placeholders · **ALT required on every image (build-enforced)**

### Fonts
- [ ] `next/font` self-hosted — **zero external font requests**
- [ ] Variable fonts only · `latin` + `latin-ext` subset · `display: swap`
- [ ] `preload` display face only · `size-adjust` metric override to eliminate swap-shift CLS

### JavaScript
- [ ] **Server Components by default; `"use client"` only where interaction requires it**
- [ ] Route-level code splitting; `dynamic()` for heavy/below-fold components
- [ ] **Framer Motion imported via `LazyMotion` + `domAnimation`** (~5 KB vs ~34 KB full bundle)
- [ ] **GSAP loaded dynamically, only on routes that use it** — reserved for the 2–3 signature scroll moments, never as a default
- [ ] Lucide icons imported individually
- [ ] **Zero third-party scripts in the static build** — analytics, chat, and Calendly are lazy/deferred slots

### Delivery [§16]
- [ ] Static export → CDN edge with PoPs covering **all 6 launch regions**
- [ ] Brotli/Gzip · immutable cache headers on hashed assets · HTTP/2+
- [ ] **Regional parity verified: India, UAE, Australia measured against US/Canada** [§1.12]

### CSS
- [ ] Tailwind JIT, purged · critical CSS inlined · no runtime CSS-in-JS
- [ ] `content-visibility: auto` on long below-fold sections

---

## 15. Accessibility Checklist

**Target: WCAG 2.1 Level AA [§22.2]** — with AAA colour contrast achieved on primary pairs (§5.4).

### Perceivable
- [ ] All text ≥ 4.5:1 (≥ 3:1 large). **Champagne gold barred from text usage — lint-enforced** (§5.4)
- [ ] **Information never conveyed by colour alone** — icons/labels/patterns accompany colour states
- [ ] Meaningful ALT on every image; decorative images `alt=""`
- [ ] Text resizes to 200% without loss of content or function
- [ ] Reflow at 320px with no horizontal scroll
- [ ] Video testimonials: captions + transcripts

### Operable
- [ ] Full keyboard operability — nav, mega-menu, accordions, forms, country switcher, carousels
- [ ] **Visible focus indicator on every interactive element** (2px ring + offset, non-colour-only)
- [ ] Logical focus order; focus trapping in modals/mobile nav with restore on close
- [ ] `SkipLink` to main content
- [ ] Touch targets ≥ 44×44px [mobile is Primary, §22.1]
- [ ] **`prefers-reduced-motion` honoured — all non-essential motion disabled**
- [ ] No motion-triggered-only content

### Understandable
- [ ] `<html lang>` set per country — `en-IN`, `en-US`, `en-CA`, `en-AU`, `de-DE`, `en-AE`
- [ ] Consistent navigation and component behaviour across all countries [§22.3]
- [ ] Form labels always visible (never placeholder-as-label); errors described in text; `aria-describedby` on help/error
- [ ] Clear, descriptive link text — no bare "click here"

### Robust
- [ ] Valid semantic HTML; landmarks (`header` `nav` `main` `aside` `footer`) on every page
- [ ] **ARIA only where native semantics are insufficient** [§22.2 "ARIA labeling on interactive components"]
- [ ] `aria-current` on active nav; `aria-expanded` on disclosures; live regions for dynamic updates
- [ ] Tested with NVDA + VoiceOver; automated axe-core in CI + manual keyboard pass per template

---

## 16. Mobile-First Strategy

> **[SRS §22.1]:** Mobile `< 768px` — **"Primary — majority of organic traffic across all 6 countries."**

This is a stated fact about the business, not a preference. Consequences:

- [ ] **Every component is designed and built at 375px first**, then enhanced upward. Desktop is the enhancement.
- [ ] Fluid `clamp()` typography — no layout jumps between breakpoints
- [ ] Single-column default; grid complexity is progressive
- [ ] **`StickyCTA` on mobile** — the primary conversion mechanism for the majority of traffic
- [ ] Thumb-zone placement: primary actions in the lower third
- [ ] Mobile nav: full-screen sheet, focus-trapped, country switcher prominent
- [ ] **`WhatsAppCTA` mobile-prominent on `/in/` and `/en-ae/`** [§15.1]
- [ ] Tap targets ≥ 44px; ≥ 8px between adjacent targets
- [ ] Tables scroll horizontally inside their own container — **the page body never scrolls sideways**
- [ ] **Mobile CWV is the pass/fail gate** [§25.1: *"Core Web Vitals passing on mobile for all launch templates"*]
- [ ] Mobile image budget stricter than desktop; hero art-directed per breakpoint
- [ ] **Tablet 768–1024px is verified, not redesigned** [§22.1 verbatim]
- [ ] Tested on real mid-tier Android — India's dominant device class

---

## 17. Desktop UX Strategy

Desktop `> 1024px` — *"Full layout"* [§22.1]. Where the brand's editorial ambition is fully expressed.

- [ ] 12-column grid, 1280px content in a 1440px shell; asymmetric editorial layouts (7/5, 8/4) to avoid template symmetry
- [ ] **Mega-menu** exposing Services × Industries × Locations — makes the §1.10 "programmatic coverage" advantage *visible*
- [ ] Sticky in-page `TableOfContents` on long-form service, industry, and blog pages
- [ ] Generous whitespace at scale — the luxury signal; display type at full `display-1` size
- [ ] Hover states as craft: card lift, border-darken, magnetic buttons, image reveals — **all disabled under `prefers-reduced-motion`**
- [ ] Two- and three-column proof layouts (case studies, testimonials, logo walls)
- [ ] Sticky sidebar CTA on service and case-study pages
- [ ] Scroll-triggered section reveals as narrative pacing, never as decoration
- [ ] Breadcrumbs always visible at desktop [§7.6]
- [ ] Wide viewport (>1600px) capped at shell max — never full-bleed text
- [ ] Country switcher as a considered panel showing all 6 markets — **making global footprint immediately legible** (a §1.10 competitive advantage rendered as UI)

---

## 18. Animation Strategy

**Principle: elegant, never excessive. Motion clarifies hierarchy and rewards attention — it never performs.**

### Tokens
```
duration-fast    150ms   micro-interactions (hover, focus, press)
duration-base    280ms   reveals, transitions
duration-slow    520ms   hero, section entrances
ease-out         cubic-bezier(0.16, 1, 0.3, 1)     entrances
ease-in-out      cubic-bezier(0.65, 0, 0.35, 1)    movement
```

### Framer Motion — the default (`LazyMotion` + `domAnimation`, ~5 KB)
- `Reveal` — 16px rise + fade, `viewport={{ once: true, margin: "-80px" }}`
- `StaggerGroup` — 60ms children stagger for card grids and lists
- Text reveal — word or line-level on hero display type only
- Image reveal — clip-path wipe on featured media
- Card hover — 2px lift + border-darken
- `CountUp` — stat counters, triggered once on enter
- Page transitions — subtle opacity/position, never blocking

### GSAP — reserved, dynamically imported, **maximum 2–3 signature moments site-wide**
1. Homepage hero — layered parallax on the burgundy-invert section (ScrollTrigger)
2. `MethodologySteps` — pinned horizontal scroll on desktop only (vertical stack on mobile)
3. `MarqueeLogos` — seamless infinite client-logo marquee

GSAP is **never** loaded on service, blog, or programmatic templates — it must not tax the money pages' performance budget.

### Hard rules
- [ ] **`prefers-reduced-motion: reduce` disables all non-essential motion** — verified per component
- [ ] **Motion never causes layout shift.** Transform and opacity only. CLS budget is 0.
- [ ] Never animate an element the user is waiting to read
- [ ] Never delay LCP — the hero's largest element renders immediately; motion applies to *supporting* elements
- [ ] No autoplay video with sound; no parallax on mobile (jank + battery)
- [ ] All scroll animations `once: true` — no replay-on-scroll-back
- [ ] Every animated element is keyboard-reachable in its final state

---

## 19. Future CMS Compatibility

The SRS specifies a full CMS (§6), database (§4), admin panel (§5), and content API (§21.2) that the brief places out of scope. The frontend is architected so **attaching them is configuration, not refactoring.**

### 19.1 Types mirror the SRS schema exactly [§4.3]
TypeScript interfaces reproduce the SRS table definitions field-for-field — `Country` (`code`, `locale`, `currency`, `timezone`, `status`, `search_console_property`), `Service` (`country_id`, `category_id`, `slug`, `title`, `summary`, `body`, `status`, `seo_meta_id`), plus `Industry`, `City`, `Blog`, `Author`, `CaseStudy`, `Testimonial`, `FAQ`, `Pricing`, `Review`, `Media`, `SeoMeta`, `Lead`.
`SeoMeta` is **polymorphic** (`entityType` + `entityId`) exactly as §4.3 specifies — so any content type attaches one SEO record with no per-entity join table.

### 19.2 One swappable data-access module
Every page imports from a single module of typed async functions:
```
getCountries()  ·  getServices(country)  ·  getServiceBySlug(country, slug)
getIndustries(country)  ·  getCities(country)  ·  getBlogPosts(country, opts)
getCaseStudies(country)  ·  getTestimonials(country)  ·  getFaqs(scope)  ·  getPricing(country)
```
Today these read typed local content. Tomorrow they `fetch()` `/api/{country}/services` per **[§21.2]**. **Pages and components change zero lines.** Functions are already `async` specifically so the swap is non-breaking.

### 19.3 Content-shape readiness
- [ ] **Every content entity carries `countryId`** — the SRS's primary partition key [§4, §6.1]
- [ ] `status` enum matches §4.3: `draft / review / seo_approved / published`
- [ ] `hreflangGroupId` present on every content record [§7.1]
- [ ] Body content stored as **structured blocks**, not raw HTML — maps to a block editor
- [ ] **Templates shared, only data differs** [§6.1] — a layout fix ships to all countries at once
- [ ] Locale-aware fields (currency, date, phone) render **from the country record**, never hard-coded [§6.1]
- [ ] "Shared vs. per-country override" flag supported on global blocks [§6.1]
- [ ] **Quality-gate fields are required props** on programmatic templates [§11.3] — the type system enforces the SEO policy
- [ ] Schema generated as a **pure function of structured fields** [§7.6, §13]
- [ ] Slug uniqueness per country; slug-change → 301 record [§6.4]
- [ ] `revalidate`/ISR path documented for when the CMS lands

### 19.4 Recommended CMS when Phase 4 begins [INFERRED]
Any headless CMS satisfying §1.7 and §21.2 works. Best fits: **Payload** (self-hosted, Postgres, native RBAC matching §5.2, strong localisation), **Sanity** (excellent structured content + versioning per §6.3), or **Strapi**. The frontend is deliberately CMS-agnostic — the decision can be deferred without cost.

---

## 20. Folder Architecture

Aligned to [SRS §21.1] (`/apps/web`, `/packages/ui`, `/packages/schema`, `/docs`) but flattened to a single Next.js app for this static build, with the package boundaries preserved as top-level folders so a future monorepo split is a move, not a rewrite.

```
ft-social-crew/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    Root shell, fonts, Organization schema
│   │   ├── page.tsx                      Global root — country selector + geo banner  [§3.1, §7.3]
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts                    Segmented per country + content type         [§7.5, §8.3]
│   │   ├── robots.ts                                                                  [§7.5]
│   │   └── [country]/                    ← generateStaticParams from country registry [§1.7]
│   │       ├── layout.tsx                Country shell: lang, hreflang, LocalBusiness schema
│   │       ├── page.tsx                  Country homepage — hand-crafted per country  [§3.4]
│   │       ├── services/page.tsx         Services hub (pillar)
│   │       ├── [serviceSlug]/page.tsx    Service detail → /{country}/{service-slug}/  [§3.2]
│   │       ├── industries/
│   │       │   ├── page.tsx
│   │       │   └── [industry]/
│   │       │       ├── page.tsx
│   │       │       └── [service]/page.tsx                                             [§3.2]
│   │       ├── locations/
│   │       │   ├── page.tsx
│   │       │   └── [city]/
│   │       │       ├── page.tsx
│   │       │       └── [service]/page.tsx                                             [§3.2]
│   │       ├── case-studies/[slug]/      ├── blog/[slug]/ + category/ + page/[n]/
│   │       ├── resources/[slug]/         ├── compare/[competitor]/                    [§3.2]
│   │       ├── pricing/  testimonials/  about/  careers/  support/  contact/
│   │       ├── privacy/  terms/
│   │       └── lp/[campaign]/page.tsx    NOINDEX                                      [§3.1]
│   │
│   ├── components/
│   │   ├── ui/            Primitives — Button, Pill, Card, Input…            (§3.1)
│   │   ├── layout/        Container, Section, Header, Footer, Nav…           (§3.2)
│   │   ├── international/ CountrySwitcher, GeoSuggestionBanner, LocalePrice… (§3.3)
│   │   ├── hero/          HeroCountry (6 variants), HeroService…             (§3.4)
│   │   ├── aeo/           AnswerBlock, FAQAccordion, DefinitionCard…         (§3.5) ★
│   │   ├── proof/         CaseStudyCard, TestimonialCard, AuthorBio…         (§3.6)
│   │   ├── conversion/    LeadForm, StickyCTA, WhatsAppCTA, ROICalculator…   (§3.7)
│   │   ├── content/       ServiceCard, BlogGrid, Pagination, ProseRenderer…  (§3.8)
│   │   ├── seo/           JsonLd + all schema generators                     (§3.9)
│   │   └── motion/        Reveal, StaggerGroup, CountUp…                     (§3.10)
│   │
│   ├── content/                          ← THE ONLY THING THAT GROWS PER COUNTRY [§1.7]
│   │   ├── countries/     in.ts · en-us.ts · en-ca.ts · en-au.ts · de.ts · en-ae.ts
│   │   ├── services/      per-country service records
│   │   ├── industries/    14 verticals × country, from §24 briefs
│   │   ├── locations/     city records per country
│   │   ├── blog/  case-studies/  testimonials/  faqs/  pricing/  resources/
│   │   └── shared/        global blocks with per-country override support     [§6.1]
│   │
│   ├── lib/
│   │   ├── data/          ← THE SWAPPABLE CMS BOUNDARY (§19.2)
│   │   ├── seo/           metadata, hreflang, canonical, schema builders      [§7, §13]
│   │   ├── i18n/          locale, currency, date, phone formatting            [§6.1]
│   │   ├── analytics/     typed no-op event layer, §14.2 event names
│   │   ├── routing/       URL builders enforcing the §3.2 patterns
│   │   └── utils/
│   │
│   ├── types/             Mirrors the §4.3 database schema exactly            [§19.1]
│   ├── config/            site, countries, services, industries, navigation, budgets
│   └── styles/            tokens.css (§5, §6, §7), globals.css
│
├── public/                images/ · fonts/ · og/ · icons/
├── docs/                  UNDERSTANDING.md · WEBSITE_EXECUTION_PLAN.md · CONTENT_GUIDE.md   [§21.1]
├── tailwind.config.ts     Tokens only — no arbitrary values permitted
├── next.config.ts         output: 'export'
└── .eslintrc / .prettierrc / lighthouserc / .github/workflows    [§21.3, §21.4]
```

**The architectural proof point:** adding country #7 touches `src/config/countries.ts` and `src/content/` — **and nothing in `src/app/` or `src/components/`.** That is [SRS §1.7] — *"scaling to 20, 50, or 100+ countries changes only data volume, never the codebase"* — implemented rather than promised.

**Conventions [§21.3]:** kebab-case files & URLs · camelCase variables · PascalCase components · lowercase hyphenated country codes · lint + format pre-commit · trunk-based Git with short-lived branches and required PR review [§21.4].

---

## Approval Gate

**No code will be written until you approve.** Four decisions are open:

| # | Decision | Our recommendation |
|---|---|---|
| 1 | **Build scope** (§2.2) — ~600 rendered pages, full architecture for ~7,000 | Approve as-is; expand any tier on request |
| 2 | **Service URL pattern** (§1.3) — SRS §3.1 and §3.2 differ | Hub `/{country}/services/`, detail `/{country}/{service-slug}/` per the §3.2 table |
| 3 | **Typography** (§6.1) — Fraunces + Inter + Inter Tight | Approve, or name your preferred families |
| 4 | **Missing inputs** — `UNDERSTANDING.md` Appendix B (company facts, real clients, logo, domain, pricing, certifications, city lists for IN/US) | Send what exists; everything else ships as **clearly-marked placeholder — we will not fabricate client names, logos, or metrics** |

Reply **"approved"** (with any changes) and development begins with the design-token layer, then the country registry and routing skeleton, then P0 money pages.
