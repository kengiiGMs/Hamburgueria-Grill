/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['Lato', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        "home": "url('/assets/banner.png')"
      }
    },
  },
  plugins: [],
}

