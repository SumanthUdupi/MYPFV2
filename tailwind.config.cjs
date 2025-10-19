const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#000000',
        'primary': '#1A1A1A',
        'secondary': '#0D2A24',
        'accent': '#C4A662',
        'text': '#E0E0E0',
        'secondary-accent': '#A48642',
      },
      fontFamily: {
        'display': ['"Cinzel Decorative"', ...defaultTheme.fontFamily.serif],
        'sans': ['"Montserrat"', ...defaultTheme.fontFamily.sans],
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