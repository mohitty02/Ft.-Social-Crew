/**
 * Structured data emitter.
 *
 * SRS §7.6: schema is "generated from structured fields, never hand-coded per
 * page". Nothing calls this with a hand-written object — every argument comes
 * from a generator in lib/seo/schema.ts, which is what keeps LocalBusiness
 * valid per country without manual QA on every page (SRS §1.12).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is generated server-side from typed data, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
