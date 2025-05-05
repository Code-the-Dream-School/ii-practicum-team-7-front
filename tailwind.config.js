/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        h1: '56px',
        h2: '48px',
        h3: '40px',
        h4: '32px',
        h5: '24px',
      },
      lineHeight: {
        heading: '120%',
        body: '150%',
      },
      letterSpacing: {
        heading: '-0.01em',
      },
      colors: {
        'monte-carlo': {
          light: '#F1FAF7',
          DEFAULT: '#A2DCCA',
          dark: '#7BCEB4',
        },
        'ny-pink': {
          light: '#F5E4E6',
          DEFAULT: '#CE7B85',
          dark: '#3D2427',
        },
      },
      fontFamily: {
        heading: ['Teachers', 'sans-serif'],
        body: ['Cabin', 'sans-serif'],
      },
    },
  },
  plugins: [],
}