/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poiret': ['"Poiret One"', 'sans-serif'],
      },
      colors: {
        'gold': {
          '500': '#D4AF37',
        },
        'deep-black': '#0A0A0A',
        'emerald-green': '#009B77',
        'shimmering-silver': '#C0C0C0',
      },
    },
  },
  plugins: [],
}
