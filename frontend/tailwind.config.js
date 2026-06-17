/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f0f0f',
        secondary: '#212121',
        tertiary: '#2f2f2f',
        accent: '#dc2626',
        'accent-hover': '#b91c1c',
        'text-primary': '#ffffff',
        'text-secondary': '#aaaaaa',
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          'from': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
          'to': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
}
