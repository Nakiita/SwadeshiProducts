/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'footer-pattern': "url('/src/assets/Footer.svg')",
      },
    },
  },
  plugins: [],
}

