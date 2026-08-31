import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Brand Colors ────────────────────────────────────────────────
      colors: {
        brand: {
          deep:     'var(--color-brand-deep)',
          electric: 'var(--color-brand-electric)',
          light:    'var(--color-brand-light)',
          pale:     'var(--color-brand-pale)',
          navy:     'var(--color-brand-navy)',
          cyan:     'var(--color-brand-cyan)',
          // New keys matching Sunset Coral system
          primary:  'var(--brand-primary)',
          orange:   'var(--brand-orange)',
          peach:    'var(--brand-peach)',
          burnt:    'var(--brand-burnt)',
          'navy-light': 'var(--brand-navy-light)',
          'navy-soft':  'var(--brand-navy-soft)',
          'warm-white': 'var(--brand-warm-white)',
          cream:    'var(--brand-cream)',
          // Legacy aliases
          'electric-400': 'var(--color-brand-light)',
          'electric-600': 'var(--color-brand-electric)',
          'electric-700': 'var(--color-brand-deep)',
          'deep-700':     'var(--color-brand-deep)',
          'deep-800':     'var(--color-brand-deep)',
          'deep-900':     'var(--color-brand-deep)',
        },
        // Primary Action / Brand
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover:   'var(--color-primary-hover)',
          focus:   'var(--color-focus)',
        },
        // Borders
        border: {
          DEFAULT: 'var(--color-border)',
          subtle:  'var(--color-border-subtle)',
          strong:  'var(--color-border-strong)',
        },
        // Semantic surface tokens
        surface: {
          DEFAULT:  'var(--color-surface)',
          elevated: 'var(--color-surface-elevated)',
          secondary:'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
          dark:     'var(--color-bg-dark)',
        },
        // Semantic text tokens
        ink: {
          DEFAULT:   'var(--color-text-primary)',
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted:     'var(--color-text-muted)',
          inverse:   'var(--color-text-inverse)',
          accent:    'var(--color-brand-electric)',
        },
        // Accent tokens
        accent: {
          cyan:   'var(--color-accent-cyan)',
          green:  'var(--color-accent-green)',
          purple: 'var(--color-accent-purple)',
          pink:   'var(--color-accent-pink)',
          orange: 'var(--color-accent-orange)',
        },
        // UI feedback
        success: { DEFAULT: 'var(--color-accent-green)',  light: 'var(--color-brand-pale)' },
        warning: { DEFAULT: 'var(--color-accent-orange)', light: 'var(--color-brand-pale)' },
        error:   { DEFAULT: 'var(--color-accent-pink)',   light: 'var(--color-brand-pale)' },
        info:    { DEFAULT: 'var(--color-brand-electric)', light: 'var(--color-brand-pale)' },
      },

      // ─── Typography ──────────────────────────────────────────────────
      fontFamily: {
        sans:    ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['4.5rem',   { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '800' }],
        'display-xl':  ['3.75rem',  { lineHeight: '1.08', letterSpacing: '-0.03em',  fontWeight: '800' }],
        'display-lg':  ['3rem',     { lineHeight: '1.10', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-md':  ['2.25rem',  { lineHeight: '1.16', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-sm':  ['1.875rem', { lineHeight: '1.20', letterSpacing: '-0.02em',  fontWeight: '700' }],
        'heading-xl':  ['1.5rem',   { lineHeight: '1.24', letterSpacing: '-0.018em', fontWeight: '700' }],
        'heading-lg':  ['1.25rem',  { lineHeight: '1.28', letterSpacing: '-0.01em',  fontWeight: '700' }],
        'heading-md':  ['1.125rem', { lineHeight: '1.32', letterSpacing: '-0.008em', fontWeight: '600' }],
        'heading-sm':  ['1rem',     { lineHeight: '1.36', letterSpacing: '-0.005em', fontWeight: '600' }],
        'body-xl':     ['1.125rem', { lineHeight: '1.65', fontWeight: '400' }],
        'body-lg':     ['1rem',     { lineHeight: '1.60', fontWeight: '400' }],
        'body-md':     ['0.9375rem',{ lineHeight: '1.58', fontWeight: '400' }],
        'body-sm':     ['0.875rem', { lineHeight: '1.52', fontWeight: '400' }],
        'body-xs':     ['0.8125rem',{ lineHeight: '1.50', fontWeight: '400' }],
        'label-lg':    ['0.875rem', { lineHeight: '1.40', letterSpacing: '0.02em',  fontWeight: '600' }],
        'label-md':    ['0.8125rem',{ lineHeight: '1.40', letterSpacing: '0.02em',  fontWeight: '500' }],
        'label-sm':    ['0.75rem',  { lineHeight: '1.40', letterSpacing: '0.03em',  fontWeight: '500' }],
        'caption':     ['0.75rem',  { lineHeight: '1.45', letterSpacing: '0.01em',  fontWeight: '400' }],
        'kicker':      ['0.75rem',  { lineHeight: '1.40', letterSpacing: '0.12em',  fontWeight: '700' }],
      },

      // ─── Spacing ──────────────────────────────────────────────────────
      spacing: {
        '4.5': '1.125rem',
        '13':  '3.25rem',
        '15':  '3.75rem',
        '17':  '4.25rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
        '38':  '9.5rem',
        '42':  '10.5rem',
        '46':  '11.5rem',
        '50':  '12.5rem',
        '54':  '13.5rem',
        '58':  '14.5rem',
        '62':  '15.5rem',
        '66':  '16.5rem',
        '70':  '17.5rem',
      },

      // ─── Border Radius ────────────────────────────────────────────────
      borderRadius: {
        'btn': 'var(--radius-btn)',
        'card':'var(--radius-card)',
        'xs':  '0.25rem',
        'sm':  '0.375rem',
        'md':  '0.5rem',
        'lg':  '0.75rem',
        'xl':  '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ─── Shadows ──────────────────────────────────────────────────────
      boxShadow: {
        'xs':        'var(--shadow-xs)',
        'sm':        'var(--shadow-sm)',
        'md':        'var(--shadow-md)',
        'lg':        'var(--shadow-lg)',
        'xl':        'var(--shadow-xl)',
        '2xl':       'var(--shadow-2xl)',
        'inner':     'var(--shadow-inner)',
        'card':      'var(--shadow-card)',
        'card-hover':'var(--shadow-card-hover)',
        'glow':      '0 0 0 3px rgba(37, 99, 235, 0.25)',
        'glow-blue': 'var(--shadow-glow-blue)',
        'glow-cyan': 'var(--shadow-glow-cyan)',
        'glass':     'var(--glass-shadow)',
      },

      // ─── Background Images ─────────────────────────────────────────────
      backgroundImage: {
        'gradient-primary':      'var(--gradient-primary)',
        'gradient-electric':     'var(--gradient-electric)',
        'gradient-hero':         'var(--gradient-hero)',
        'gradient-dark-section': 'var(--gradient-dark-section)',
        'gradient-cta':          'var(--gradient-cta)',
        'gradient-mesh':         'var(--gradient-mesh)',
        'gradient-card':         'var(--gradient-card)',
        'gradient-text':         'var(--gradient-text)',
        'hero-gradient':         'var(--gradient-hero)',
        'electric-gradient':     'var(--gradient-electric)',
        'card-gradient':         'var(--gradient-card)',
        'grid-pattern':
          "url(\"data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04' fill-rule='evenodd'%3E%3Cpath d='M0 0h32v1H0zm0 31h32v1H0zM0 0h1v32H0zm31 0h1v32h-1z'/%3E%3C/g%3E%3C/svg%3E\")",
      },

      // ─── Backdrop Blur ─────────────────────────────────────────────────
      backdropBlur: {
        'xs':  '2px',
        'sm':  '4px',
        'md':  '8px',
        'lg':  '12px',
        'xl':  '16px',
        '2xl': '24px',
        '3xl': '40px',
      },

      // ─── Keyframes ────────────────────────────────────────────────────
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        'shimmer-text': {
          '0%':   { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-8px) rotate(1deg)' },
          '66%':      { transform: 'translateY(-4px) rotate(-1deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.08)' },
        },
        'spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to':   { transform: 'rotate(360deg)' },
        },
        'spin-slow-reverse': {
          'from': { transform: 'rotate(0deg)' },
          'to':   { transform: 'rotate(-360deg)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)',   opacity: '1' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        'marquee': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-shift': {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'border-flow': {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },

      // ─── Animations ───────────────────────────────────────────────────
      animation: {
        'shimmer':           'shimmer 2.2s linear infinite',
        'shimmer-text':      'shimmer-text 3.5s linear infinite',
        'fade-up':           'fade-up 0.5s ease-out both',
        'fade-in':           'fade-in 0.4s ease-out both',
        'float':             'float 4s ease-in-out infinite',
        'float-slow':        'float-slow 7s ease-in-out infinite',
        'glow-pulse':        'glow-pulse 3s ease-in-out infinite',
        'spin-slow':         'spin-slow 20s linear infinite',
        'spin-slow-reverse': 'spin-slow-reverse 28s linear infinite',
        'pulse-ring':        'pulse-ring 1.8s ease-out infinite',
        'marquee':           'marquee 25s linear infinite',
        'gradient-shift':    'gradient-shift 6s ease infinite',
        'border-flow':       'border-flow 4s ease infinite',
      },

      // ─── Screen Sizes ──────────────────────────────────────────────────
      screens: {
        'xs':  '375px',
        'sm':  '640px',
        'md':  '768px',
        'lg':  '1024px',
        'xl':  '1280px',
        '2xl': '1440px',
        '3xl': '1920px',
      },

      // ─── Z-Index ───────────────────────────────────────────────────────
      zIndex: {
        '60':  '60',
        '70':  '70',
        '80':  '80',
        '90':  '90',
        '100': '100',
      },

      // ─── Transitions ───────────────────────────────────────────────────
      transitionTimingFunction: {
        'out-expo':    'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },

      // ─── Transition Duration ───────────────────────────────────────────
      transitionDuration: {
        '0':   '0ms',
        '150': '150ms',
        '220': '220ms',
        '380': '380ms',
        '500': '500ms',
      },
    },
  },
  plugins: [typography],
};

export default config;
