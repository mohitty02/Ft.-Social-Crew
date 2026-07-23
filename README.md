# Ft. Social Crew — Global Multi-Country Website

Static Next.js frontend for a six-market growth agency platform.
Built to `Ft_Social_Crew_Global_Website_SRS_and_Growth_Blueprint.pdf` (48 pp, read in full).

- **[UNDERSTANDING.md](UNDERSTANDING.md)** — business, positioning, SEO and architecture comprehension
- **[WEBSITE_EXECUTION_PLAN.md](WEBSITE_EXECUTION_PLAN.md)** — sitemap, design system, and the 20-point plan

---

## Commands

```bash
npm run dev        # http://localhost:3000
npm run build      # static export → ./out
npm run typecheck  # tsc --noEmit
```

Deploy `./out` to any static host or CDN. No server runtime required.

---

## Build status

**817 static pages** across six markets, all verified:

| Check | Result |
|---|---|
| hreflang targets all resolve | ✅ PASS |
| internal links all resolve | ✅ PASS |
| exactly one `<h1>` per page | ✅ PASS |
| canonical on every page | ✅ PASS (404 excepted, correctly) |
| JSON-LD on every page | ✅ PASS |
| `alt` on every `<img>` | ✅ PASS |
| AnswerBlock on every interior page | ✅ PASS |
| Country homepage uniqueness (SRS §7.4, >80% = fail) | ✅ **15.9% max overlap** |
| English service page overlap (§1.11 cannibalisation) | ✅ 70.3% max |
| German is native German, not translated | ✅ PASS |
| Landing pages noindex (§3.1) | ✅ 12/12 |

Page distribution: `/in/` 159 · `/en-us/` 149 · `/en-ca/` 129 · `/en-au/` 129 · `/de/` 129 · `/en-ae/` 119

---

## Architecture

```
src/
├── app/[country]/…      routes — generateStaticParams reads the country registry
├── components/          ui · layout · international · hero · aeo · proof
│                        conversion · content · seo · motion
├── config/              countries · services · industries · cities · navigation · media
├── content/             per-country authored copy (the only thing that grows)
├── lib/
│   ├── data/            ← THE CMS BOUNDARY (see below)
│   ├── seo/             metadata · hreflang · canonical · schema builders
│   ├── i18n/            currency · date · phone · spelling
│   └── analytics/       typed no-op layer emitting SRS §14.2 event names
├── types/               mirrors the SRS §4.3 database schema field-for-field
└── styles/              semantic tokens
```

### Adding country #7

Append one object to `src/config/countries.ts` plus its content records.
**Nothing in `src/app/` or `src/components/` changes.** That is SRS §1.7 implemented
rather than promised.

### The CMS boundary

Every page imports content from `src/lib/data/index.ts` and nowhere else. The
functions are already `async`, so swapping local data for `fetch('/api/{country}/…')`
per SRS §21.2 touches that one module — no page or component changes.

### Single sources of truth

| Concern | File | Why it matters |
|---|---|---|
| Which countries exist | `config/countries.ts` | routing, hreflang, currency, schema |
| Which services get city pages | `config/services.ts` → `PROGRAMMATIC_CITY_SERVICES` | route generator, linking components **and** sitemap all read it — they cannot drift and produce 404s |
| All image URLs | `config/media.ts` | swap stock for brand photography in one file |
| Schema generation | `lib/seo/schema.ts` | pure functions of structured fields, never hand-coded (SRS §7.6, §13) |

---

## Design system

Colour extracted programmatically from the brand plate:

| Token | Hex | Role |
|---|---|---|
| Deep Burgundy | `#470826` | primary — brand ink & action · **15.8:1** on white |
| Wine | `#6E1236` | secondary · 11.7:1 |
| Champagne Gold | `#F4C88C` | **hairline & decorative only — 1.6:1 on white, fails AA for text** |
| Gold ink | `#8A5A16` | the only gold permitted for text · 5.9:1 |
| Blush | `#F4DEE8` | tinted surface |
| Ink / White | `#0A0A0B` / `#FFFFFF` | reading ink & surface |

Light theme only. Every colour is consumed as a semantic token, so the dark mode
SRS §22.2 asks for is a `[data-theme="dark"]` block rather than a rebuild.

**Type:** Fraunces (display) · Inter (body) · Inter Tight (lockups) — variable,
self-hosted via `next/font`, latin + latin-ext, zero external font requests.

**The pill** is the signature component, in two states — solid fill and gold
hairline outline — alternating, exactly as the brand plate does.

---

## Before launch

Nine inputs are needed (full list in `UNDERSTANDING.md` Appendix B):

1. **Company facts** — founding year, founder names, registered addresses, phone numbers.
   Required for Organization / LocalBusiness / Person schema and for E-E-A-T.
2. Real client names, logos, testimonials, case-study metrics
3. Logo files, wordmark, favicon, OG image template
4. Production domain (canonical, hreflang, sitemap all derive from it)
5. Pricing figures per market
6. Certifications, awards, partner badges, media mentions
7. Legal review of `/privacy/` and `/terms/`
8. City lists for India and USA (SRS names only CA/AU/DE/AE cities)
9. Competitor names for `/compare/{competitor}/`

**Placeholder content is labelled as placeholder on the page.** Testimonials,
case-study metrics and team profiles carry a visible notice. No invented client
name or fabricated statistic is presented as verified — an E-E-A-T site that
misrepresents its own proof has no recoverable position.

### Phase 2 hooks (documented, not built — static frontend per brief)

| Feature | Where |
|---|---|
| Form → CRM webhook (SRS §14.3) | `components/conversion/LeadForm.tsx` — single marked injection point |
| GA4 wiring (SRS §14.1) | `lib/analytics/events.ts` — one adapter |
| Calendly / live chat embeds | deferred slots on contact & pricing |
| Search Console Indexing API ping (SRS §8.3) | requires a server |
| Sitemap on publish event (SRS §8) | currently on build — same output, different trigger |
