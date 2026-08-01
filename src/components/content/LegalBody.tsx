import type { CountryCode } from '@/types'
import { AlertTriangle } from 'lucide-react'

/**
 * Legal page body.
 *
 * SRS §7.4 permits boilerplate legal content to repeat across country
 * variants — unlike primary content, which must be substantively unique. So
 * this shares structure deliberately while the country record supplies the
 * localised entity, contact and jurisdiction details.
 *
 * The placeholder notice is not optional. Publishing unreviewed legal text as
 * though it were reviewed would be a worse outcome than an ugly banner.
 */
export function LegalBody({
  sections,
  country,
}: {
  sections: { heading: string; body: string }[]
  country: CountryCode
}) {
  const isDe = country === 'de'

  return (
    <div className="max-w-prose">
      <div className="mb-10 flex gap-4 rounded-card border border-accent-line bg-accent-soft p-5">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
        <p className="text-small text-ink-600">
          {isDe
            ? 'Hinweis: Dieser Text ist eine strukturelle Vorlage und ersetzt keine juristische Prüfung. Vor Veröffentlichung ist eine anwaltliche Freigabe erforderlich.'
            : 'Note: this is illustrative structure, not reviewed legal copy. It must be replaced with text approved by qualified counsel before launch.'}
        </p>
      </div>

      <div className="space-y-9">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-h3 text-[color:var(--text-brand)]">{s.heading}</h2>
            <p className="mt-3 text-body text-ink-600">{s.body}</p>
          </section>
        ))}
      </div>

      <p className="mt-12 border-t border-ink/10 pt-6 text-small text-ink-400">
        {isDe ? 'Zuletzt aktualisiert' : 'Last updated'}:{' '}
        {new Date().getFullYear()}
      </p>
    </div>
  )
}
