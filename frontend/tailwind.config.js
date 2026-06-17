/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0f0f0f',
        'secondary': '#212121',
        'tertiary': '#272727',
        'accent': '#dc2626',
        'accent-hover': '#b91c1c',
        'text-primary': '#ffffff',
        'text-secondary': '#aaaaaa',
      },
      spacing: {
        'safe': 'env(safe-area-inset-bottom)',
      }
    },
  },
  plugins: [],
}
