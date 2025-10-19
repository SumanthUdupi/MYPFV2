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
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '7rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
