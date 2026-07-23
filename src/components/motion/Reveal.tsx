'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Motion primitives.
 *
 * Framer Motion is imported via LazyMotion + domAnimation (~5KB) rather than
 * the full bundle (~34KB) — the per-template JS budget is 110KB and motion
 * should not consume a third of it.
 *
 * Every animation is transform/opacity only, so nothing here can contribute to
 * CLS. `once: true` throughout — no replay on scroll-back.
 *
 * prefers-reduced-motion is handled globally in globals.css, which zeroes all
 * durations; these components need no per-instance guard.
 */

const rise = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}) {
  const Component = m[as]
  return (
    <LazyMotion features={domAnimation} strict>
      <Component
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.52, delay, ease: [0.16, 1, 0.3, 1] }}
        variants={rise}
      >
        {children}
      </Component>
    </LazyMotion>
  )
}

/** 60ms stagger across children — used for card grids and proof lists. */
export function StaggerGroup({
  children,
  className,
  stagger = 0.06,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: stagger } },
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  const Component = m[as]
  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </Component>
  )
}
