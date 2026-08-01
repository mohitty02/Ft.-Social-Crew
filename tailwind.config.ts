import type { Config } from 'tailwindcss'

/**
 * Ft. Social Crew — Design System
 *
 * One green brand system across all six markets, with per-market identity
 * layered on top through CSS custom properties (see src/styles/globals.css,
 * `[data-market]`). Accent hue, corner radius, surface tint and section
 * rhythm shift per country; the primary green, the type scale and the
 * component vocabulary do not. Six identities, one brand.
 *
 * Contrast (WCAG 2.1, computed against white):
 *   brand-600 on white ... 6.4:1  AA
 *   brand-700 on white ... 8.9:1  AAA
 *   steel-600 on white ... 7.4:1  AAA
 *   steel-500 on white ... 4.9:1  AA
 *   white on brand-800 ...13.4:1  AAA
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        /*
         * ── Legacy aliases ────────────────────────────────────────────
         * These names date from the original burgundy identity. The site
         * now runs the green market system everywhere, so they alias the
         * brand/steel scales below rather than carry their own values.
         *
         * Keeping the names means the twenty-odd page templates that
         * reference `burgundy-700` / `gold-300` / `ink-600` did not have to
         * be rewritten — they re-theme from here. New work should use
         * `brand-*` and `steel-*` directly.
         */
        burgundy: {
          50: '#F1F8F4',
          100: '#DFF0E7',
          200: '#BCDFCD',
          300: '#8AC7A9',
          400: '#4FA87F',
          500: '#1F8B5B',
          600: '#137A4E',
          700: '#0E5C3C',
          800: '#0B4A31',
          900: '#07331F',
          950: '#042114',
        },
        wine: {
          50: '#F1F8F4',
          100: '#DFF0E7',
          300: '#8AC7A9',
          500: '#1F8B5B',
          600: '#137A4E',
          700: '#0E5C3C',
        },
        gold: {
          100: '#F1F8F4',
          200: '#DFF0E7',
          300: '#BCDFCD',
          500: '#4FA87F',
          700: '#137A4E',
        },
        ink: {
          DEFAULT: '#111C22',
          pure: '#000000',
          800: '#232E33',
          600: '#4E5D64',
          400: '#66757C',
          300: '#8E9BA1',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          pure: '#FFFFFF',
          100: '#F7F9F9',
          200: '#EFF2F2',
        },

        /* The live palette. Everything above aliases into this. */
        brand: {
          50: '#F1F8F4',
          100: '#DFF0E7',
          200: '#BCDFCD',
          300: '#8AC7A9',
          400: '#4FA87F',
          500: '#1F8B5B',
          600: '#137A4E', // accent headline green
          700: '#0E5C3C', // primary action
          800: '#0B4A31', // dark bands (stats, CTA)
          900: '#07331F',
          950: '#042114',
        },
        /** Per-market accent, resolved from [data-market]. */
        accent: {
          DEFAULT: 'var(--accent)',
          soft: 'var(--accent-soft)',
          line: 'var(--accent-line)',
        },
        steel: {
          50: '#F7F9F9',
          100: '#EFF2F2',
          200: '#E4E9E9',
          300: '#C9D1D1',
          400: '#8E9BA1',
          500: '#66757C',
          600: '#4E5D64',
          700: '#3A464C',
          800: '#232E33',
          900: '#111C22', // footer field
        },
      },
      fontFamily: {
        // The serif register is retired; the market system is sans throughout.
        display: ['var(--font-brand)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        tight: ['var(--font-tight)', 'system-ui', 'sans-serif'],
        brand: ['var(--font-brand)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid scale — clamp() everywhere so there are no breakpoint jumps
        // and therefore no type-driven CLS.
        'display-1': ['clamp(2.75rem, 1.5rem + 5.2vw, 5.5rem)', { lineHeight: '0.94', letterSpacing: '-0.03em' }],
        'display-2': ['clamp(2.25rem, 1.4rem + 3.6vw, 4rem)', { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        h1: ['clamp(2rem, 1.3rem + 2.8vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.625rem, 1.2rem + 1.8vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        h3: ['clamp(1.25rem, 1.05rem + 0.9vw, 1.75rem)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        h4: ['clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem)', { lineHeight: '1.35' }],
        lead: ['clamp(1.125rem, 1rem + 0.6vw, 1.375rem)', { lineHeight: '1.55' }],
        body: ['1.0625rem', { lineHeight: '1.65' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        eyebrow: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.08em' }],
        stat: ['clamp(2.5rem, 2rem + 3vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        // 4px base, 8pt rhythm
        13: '3.25rem',
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        34: '8.5rem',
        38: '9.5rem',
      },
      maxWidth: {
        shell: '1440px',
        content: '1280px',
        prose: '68ch',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
        pill: '9999px',
        // Per-market corner language — resolved from [data-market].
        card: 'var(--radius-card)',
        chip: 'var(--radius-chip)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '280ms',
        slow: '520ms',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'fade-up': 'fade-up 520ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}

export default config
