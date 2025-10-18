const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#1a1a2e',
        'primary': '#16213e',
        'accent': '#e9d5a1',
        'text': '#f0f0f0',
        'secondary-accent': '#0f3460',
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
