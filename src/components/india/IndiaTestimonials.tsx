'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { indiaTestimonials } from '@/config/india'
import { cn } from '@/lib/utils/cn'

/**
 * Testimonial carousel.
 *
 * Scroll-snap rather than a transform track, so it stays a real scrollable
 * region: keyboard, trackpad and touch all work without any JS, and the
 * buttons and dots are progressive enhancement on top of that.
 */
export function IndiaTestimonials() {
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
    const clamped = Math.max(0, Math.min(index, indiaTestimonials.length - 1))
    track.scrollTo({ left: clamped * (card.offsetWidth + 20), behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] md:-mx-8 md:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {indiaTestimonials.map((t) => (
          <li
            key={t.client}
            className="flex w-[calc(100%-1rem)] shrink-0 snap-start sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
          >
            <figure className="flex w-full flex-col rounded-2xl border border-steel-200 bg-white p-7">
              <div className="flex gap-0.5" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
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
                <span className="shrink-0 text-[0.8125rem] font-bold uppercase tracking-tight text-steel-400">
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
        aria-label="Previous testimonial"
        className="absolute -left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg transition-opacity duration-200 hover:bg-brand-800 disabled:opacity-60 lg:flex"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => scrollTo(active + 1)}
        disabled={active >= indiaTestimonials.length - 1}
        aria-label="Next testimonial"
        className="absolute -right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-steel-200 bg-white text-steel-700 shadow-lg transition-opacity duration-200 hover:text-brand-700 disabled:opacity-60 lg:flex"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="mt-8 flex items-center justify-center gap-2">
        {indiaTestimonials.map((t, i) => (
          <button
            key={t.client}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={i === active ? 'true' : undefined}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              i === active ? 'w-6 bg-brand-600' : 'w-2 bg-steel-300'
            )}
          />
        ))}
      </div>
    </div>
  )
}
