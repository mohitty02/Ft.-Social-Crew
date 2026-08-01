'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageCircle, ArrowRight } from 'lucide-react'
import type { CountryCode } from '@/types'
import { countries } from '@/config/countries'
import { whatsappHref } from '@/lib/i18n/format'
import { analytics } from '@/lib/analytics/events'

/**
 * Mobile sticky CTA.
 *
 * SRS §22.1 states mobile is "Primary — majority of organic traffic across all
 * 6 countries", so the primary conversion mechanism has to live where that
 * majority actually is.
 *
 * WhatsApp appears only for India and the UAE, per SRS §15.1: click-to-chat
 * "on India/UAE pages where it is the dominant business-communication channel".
 */
export function StickyCta({ country }: { country: CountryCode }) {
  const [visible, setVisible] = useState(false)
  const c = countries[country]

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 720)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 p-3 backdrop-blur-md md:hidden">
      <div className="flex gap-2.5">
        <Link
          href={`/${country}/contact/`}
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-pill bg-burgundy-700 px-5 font-tight text-small font-medium text-burgundy-100"
        >
          {c.primaryCta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        {c.whatsapp && (
          <a
            href={whatsappHref(c.phone, `Hi, I'd like to talk about growth for my business.`)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.whatsappClick(country)}
            className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-pill border border-accent-line bg-paper-pure px-4"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="h-5 w-5 text-[color:var(--text-brand)]" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  )
}
