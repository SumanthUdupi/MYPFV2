module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0d0a08',
        'secondary': '#f5f1e8',
        'accent': '#d4af37',
        'accent-light': '#e8d5a8',
        'dark': '#000000',
        'gold': '#d4af37',
        'gold-light': '#e8d5a8',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
