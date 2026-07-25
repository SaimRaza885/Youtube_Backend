export const colors = {
  bg: {
    primary: 'var(--color-background)',
    secondary: 'var(--color-surface-low)',
    tertiary: 'var(--color-surface)',
    elevated: 'var(--color-surface-elevated)',
  },
  border: {
    subtle: 'var(--color-border-subtle)',
    default: 'var(--color-border-default)',
  },
  accent: {
    DEFAULT: 'var(--color-accent)',
    hover: 'var(--color-accent-hover)',
    muted: 'var(--color-accent-muted)',
    glow: 'var(--color-accent-glow)',
    light: 'var(--color-accent-light)',
    'on-dark': 'var(--color-accent-on-dark)',
    'on-light': 'var(--color-accent-on-light)',
    'hover-text': 'var(--color-accent-hover-text)',
    'muted-bg': 'var(--color-accent-muted-bg)',
    border: 'var(--color-accent-border)',
    'border-subtle': 'var(--color-accent-border-subtle)',
    'glow-light': 'var(--color-accent-glow-light)',
  },
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    tertiary: 'var(--color-text-tertiary)',
  },
  state: {
    success: '#22C55E',
    error: '#ffb4ab',
    warning: '#F59E0B',
  },
  overlay: 'rgba(0, 0, 0, 0.6)',
}

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
}

export const fontSize = {
  xs: ['12px', { lineHeight: '16px' }],
  sm: ['13px', { lineHeight: '18px' }],
  base: ['15px', { lineHeight: '22px' }],
  lg: ['18px', { lineHeight: '26px' }],
  xl: ['22px', { lineHeight: '30px' }],
  '2xl': ['28px', { lineHeight: '36px' }],
}

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
}

export const borderRadius = {
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '18px',
  full: '9999px',
}

export const shadows = {
  card: '0 2px 8px rgba(0, 0, 0, 0.3)',
  'card-hover': '0 8px 30px -8px rgba(139, 92, 246, 0.25)',
  dropdown: '0 8px 24px rgba(0, 0, 0, 0.4)',
  modal: '0 16px 48px rgba(0, 0, 0, 0.5)',
  glow: '0 0 20px -5px rgba(139, 92, 246, 0.15)',
}

export const animation = {
  default: '200ms ease-out',
  smooth: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
}
