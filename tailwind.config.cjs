const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#0A0A0A', // Dominion Black
        'primary': '#1C1C1C',    // Charcoal Slate
        'accent': '#D4AF37',     // Liquid Gold
        'text': '#EAEAEA',       // Alabaster
        'secondary-accent': '#BDBDBD', // Chrome
      },
      fontFamily: {
        'deco': ['"Cinzel Decorative"', ...defaultTheme.fontFamily.serif],
        'heading': ['"Poppins"', ...defaultTheme.fontFamily.sans],
        'body': ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
