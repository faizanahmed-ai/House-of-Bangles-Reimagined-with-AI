import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand Core ──────────────────────────────────────
        maroon: {
          50:  '#fdf2f2',
          100: '#fce4e4',
          200: '#f9c8c8',
          300: '#f39999',
          400: '#e96060',
          500: '#d63b3b',
          600: '#b52020',
          700: '#8b1a1a',   // primary maroon — nav, headings
          800: '#6e1414',
          900: '#4a0e0e',   // deepest — footers, overlays
          950: '#2d0808',
        },
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#d4a843',   // antique gold — accents, borders
          500: '#c49a2f',
          600: '#a67c1e',
          700: '#855f14',
          800: '#63450e',
          900: '#422d08',
          950: '#231600',
        },
        ivory: {
          50:  '#fefdf8',
          100: '#fdf9ed',   // main background
          200: '#faf3d6',
          300: '#f5e9b8',
          400: '#edd994',
          500: '#e3c76e',
          600: '#d4aa3e',
          700: '#b08a2a',
          800: '#8c6c1e',
          900: '#6b5016',
          950: '#3d2d09',
        },
        // ── Neutrals ────────────────────────────────────────
        stone: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
      },

      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },

      fontSize: {
        'display-2xl': ['4.5rem',  { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl':  ['3.75rem', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-lg':  ['3rem',    { lineHeight: '1.1',  letterSpacing: '-0.015em' }],
        'display-md':  ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm':  ['1.875rem',{ lineHeight: '1.2',  letterSpacing: '-0.01em' }],
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },

      boxShadow: {
        'luxury':    '0 4px 24px rgba(139, 26, 26, 0.08), 0 1px 4px rgba(139, 26, 26, 0.04)',
        'luxury-lg': '0 12px 48px rgba(139, 26, 26, 0.12), 0 4px 12px rgba(139, 26, 26, 0.06)',
        'gold':      '0 4px 24px rgba(212, 168, 67, 0.2)',
        'gold-lg':   '0 12px 48px rgba(212, 168, 67, 0.25)',
        'card':      '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        'card-hover':'0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)',
        'inner-gold':'inset 0 1px 0 rgba(212,168,67,0.3)',
      },

      backgroundImage: {
        'grain':          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        'maroon-gradient':'linear-gradient(135deg, #8b1a1a 0%, #6e1414 50%, #4a0e0e 100%)',
        'gold-gradient':  'linear-gradient(135deg, #fcd34d 0%, #d4a843 50%, #a67c1e 100%)',
        'ivory-gradient': 'linear-gradient(180deg, #fdf9ed 0%, #faf3d6 100%)',
        'hero-overlay':   'linear-gradient(to bottom, rgba(74,14,14,0.7) 0%, rgba(74,14,14,0.4) 50%, rgba(74,14,14,0.85) 100%)',
      },

      animation: {
        'fade-up':       'fadeUp 0.6s ease forwards',
        'fade-in':       'fadeIn 0.4s ease forwards',
        'slide-in-right':'slideInRight 0.5s ease forwards',
        'slide-in-left': 'slideInLeft 0.5s ease forwards',
        'shimmer':       'shimmer 2s infinite',
        'pulse-gold':    'pulseGold 2s ease-in-out infinite',
        'float':         'float 6s ease-in-out infinite',
        'marquee':       'marquee 30s linear infinite',
      },

      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 168, 67, 0.4)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(212, 168, 67, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },

      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },

      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}

export default config
