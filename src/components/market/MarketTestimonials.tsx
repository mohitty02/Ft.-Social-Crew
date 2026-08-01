'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export interface MarketTestimonial {
  quote: string
  name: string
  role: string
  client: string
}

/**
 * Testimonial carousel.
 *
 * Scroll-snap rather than a transform track, so it stays a real scrollable
 * region: keyboard, trackpad and touch all work without any JS, and the
 * buttons and dots are progressive enhancement on top of that.
 */
export function MarketTestimonials({
  items,
  labels,
}: {
  items: MarketTestimonial[]
  labels: { ratedFive: string; prev: string; next: string }
}) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  const syncActive = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const card = track.firstElementChild as HTMLElement | null
    if (!card) return
    const step = card.offsetWidth + 20 // card + gap-5
    setActive(Math.round(track.scrollLeft / step))
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', syncActive, { passive: true })
    return () => track.removeEventListener('scroll', syncActive)
  }, [syncActive])

  const scrollTo = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.firstElementChild as HTMLElement | null
    if (!card) return
    const clamped = Math.max(0, Math.min(index, items.length - 1))
    track.scrollTo({ left: clamped * (card.offsetWidth + 20), behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] md:-mx-8 md:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t, i) => (
          <li
            key={`${t.client}-${i}`}
            className="flex w-[calc(100%-1rem)] shrink-0 snap-start sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
          >
            <figure className="flex w-full flex-col rounded-card border border-steel-200 bg-white p-7">
              <div className="flex gap-0.5" aria-label={labels.ratedFive}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className="h-[15px] w-[15px] fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-5 flex-1 text-[0.8125rem] leading-relaxed text-steel-600">
                {t.quote}
              </blockquote>

              <figcaption className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[0.875rem] font-semibold text-steel-900">
                    – {t.name}
                  </p>
                  <p className="mt-1 text-[0.75rem] text-steel-500">{t.role}</p>
                </div>
                <span className="max-w-[45%] shrink-0 text-right text-[0.75rem] font-bold uppercase leading-tight tracking-tight text-steel-400">
                  {t.client}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {/* Controls */}
      <button
        type="button"
        onClick={() => scrollTo(active - 1)}
        disabled={active === 0}
        aria-label={labels.prev}
        className="absolute -left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg transition-opacity duration-200 hover:bg-brand-800 disabled:opacity-60 lg:flex"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => scrollTo(active + 1)}
        disabled={active >= items.length - 1}
        aria-label={labels.next}
        className="absolute -right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-steel-200 bg-white text-steel-700 shadow-lg transition-opacity duration-200 hover:text-accent disabled:opacity-60 lg:flex"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="mt-8 flex items-center justify-center gap-2">
        {items.map((t, i) => (
          <button
            key={`dot-${t.client}-${i}`}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`${i + 1}`}
            aria-current={i === active ? 'true' : undefined}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              i === active ? 'w-6 bg-accent' : 'w-2 bg-steel-300'
            )}
          />
        ))}
      </div>
    </div>
  )
}
