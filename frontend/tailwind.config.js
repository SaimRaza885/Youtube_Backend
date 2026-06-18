import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from './src/tokens/index'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ...colors,
        primary: colors.bg.primary,
        secondary: colors.bg.secondary,
        tertiary: colors.bg.tertiary,
        elevated: colors.bg.elevated,
        surface: colors.bg.secondary,
        border: colors.border.subtle,
        'border-default': colors.border.default,
        accent: colors.accent.DEFAULT,
        'accent-hover': colors.accent.hover,
        'accent-muted': colors.accent.muted,
        'accent-glow': colors.accent.glow,
        'text-primary': colors.text.primary,
        'text-secondary': colors.text.secondary,
        'text-tertiary': colors.text.tertiary,
      },
      spacing,
      fontSize,
      fontWeight,
      borderRadius,
      boxShadow: {
        card: shadows.card,
        'card-hover': shadows['card-hover'],
        dropdown: shadows.dropdown,
        modal: shadows.modal,
        glow: shadows.glow,
      },
      animation: {
        'slide-in': 'slideIn 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        shimmer: 'shimmer 2s infinite linear',
        'fade-in': 'fadeIn 200ms ease-out',
        'sidebar-collapse': 'sidebarCollapse 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        slideIn: {
          from: { transform: 'translateY(100%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        sidebarCollapse: {
          from: { width: '14rem' },
          to: { width: '4rem' },
        },
      },
      transitionTimingFunction: {
        DEFAULT: '200ms ease-out',
        smooth: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
        spring: '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
