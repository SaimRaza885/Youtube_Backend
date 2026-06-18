export const colors = {
  bg: {
    primary: '#0f0f0f',
    secondary: '#14141F',
    tertiary: '#1C1C2E',
    elevated: '#24243A',
  },
  border: {
    subtle: '#2A2A42',
    default: '#3A3A54',
  },
  accent: {
    DEFAULT: '#8B5CF6',
    hover: '#7C3AED',
    muted: 'rgba(139, 92, 246, 0.12)',
    glow: 'rgba(139, 92, 246, 0.25)',
  },
  text: {
    primary: '#F0F0F8',
    secondary: '#A1A1B5',
    tertiary: '#6B6B80',
  },
  state: {
    success: '#22C55E',
    error: '#EF4444',
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
