const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#121212',
        'primary': '#1E1E1E',
        'accent': '#C5A35C',
        'text': '#EAEAEA',
        'secondary': '#8A8A8A',
        'secondary-accent': '#8A8A8A',
      },
      fontFamily: {
        'display': ['"Cinzel Decorative"', ...defaultTheme.fontFamily.serif],
        'body': ['"Poppins"', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
