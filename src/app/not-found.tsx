import Link from 'next/link'
import { countryList } from '@/config/countries'
import { Pill } from '@/components/ui/Pill'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <main id="main" className="min-h-screen bg-paper">
      <div className="container-shell py-24 lg:py-32">
        <div className="max-w-2xl">
          <Pill variant="outline" size="md">
            404
          </Pill>
          <h1 className="mt-7 font-display text-display-2 text-[color:var(--text-brand)]">
            That page does not exist
          </h1>
          <p className="mt-6 max-w-prose text-lead text-ink-600">
            The address may have changed, or the page may belong to a region you
            are not currently viewing. Pick a region below, or head back to the
            global entry point.
          </p>

          <div className="mt-9">
            <Button href="/" variant="primary" size="lg" withArrow>
              Global home
            </Button>
          </div>

          <nav aria-label="Regions" className="mt-14">
            <h2 className="mb-4 font-tight text-eyebrow uppercase text-accent">
              Or choose a region
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
              {countryList.map((c) => (
                <li key={c.code}>
                  <Link
                    href={`/${c.code}/`}
                    className="text-body text-[color:var(--text-brand)] underline decoration-gold-300 decoration-2 underline-offset-4"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  )
}
