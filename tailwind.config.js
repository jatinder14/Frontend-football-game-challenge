/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: "#FEA013",
          secondary: "#BA4A0C",
          tertiary: "#9747FF",
          accent: "#CBCBCB",
          lightWhite:"#F8F8F8"
        },
      },
    },
    plugins: [],
  }
  