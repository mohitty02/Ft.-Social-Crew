import type { Config } from 'tailwindcss'

/**
 * Ft. Social Crew — Design System
 *
 * Colour extracted programmatically from the brand plate
 * (WhatsApp Image 2026-07-19 at 12.32.19 PM.jpeg):
 *   Deep Burgundy  #470826  — dominant field, 87,073px cluster
 *   Champagne Gold #F4C88C  — hue-isolated from the outlined pill borders
 *   Soft White     #F4DEE8  — filled pill fill, 18,123px cluster
 *
 * Black + white are first-class here: black is the reading ink, white the
 * surface. Burgundy is brand ink and primary action. Gold is a hairline.
 *
 * Contrast (WCAG 2.1, computed):
 *   burgundy on white .... 15.8:1  AAA
 *   ink on white ......... 19.9:1  AAA
 *   wine on white ........ 11.7:1  AAA
 *   burgundy on blush .....7.1:1  AAA
 *   gold on burgundy ..... 10.1:1  AAA
 *   gold on white ......... 1.6:1  FAILS — hairline/decorative only
 *   gold-ink on white ..... 5.9:1  AA   — the only gold allowed for text
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#FBF4F7',
          100: '#F4DEE8',
          200: '#E9C2D2',
          300: '#D194AF',
          400: '#A84A72',
          500: '#7A1E45',
          600: '#5C0F31',
          700: '#470826', // PRIMARY — extracted
          800: '#3A0620',
          900: '#2E0518',
          950: '#1D030F',
        },
        wine: {
          50: '#FBF3F6',
          100: '#F6E3EB',
          300: '#C77A9C',
          500: '#8E2049',
          600: '#6E1236', // SECONDARY
          700: '#5A0E2C',
        },
        gold: {
          100: '#FDF3E4',
          200: '#FBE7C9',
          300: '#F4C88C', // ACCENT — extracted. Hairline & decorative ONLY.
          500: '#D9A45F',
          700: '#8A5A16', // "gold ink" — the only gold permitted for text
        },
        ink: {
          DEFAULT: '#0A0A0B', // near-black reading ink
          pure: '#000000',
          800: '#1C1C1E',
          600: '#3F3F45',
          400: '#6B6B73',
          300: '#9A9AA2',
        },
        paper: {
          DEFAULT: '#FDFBFC', // off-white page field
          pure: '#FFFFFF',
          100: '#F6F4F5',
          200: '#EDEAEC',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        tight: ['var(--font-tight)', 'system-ui', 'sans-serif'],
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
