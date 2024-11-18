/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    themes: ["light", "dark", "cupcake"],
    fontFamily: {
      helvetica: ["Helvetica", "Inter", "sans-serif"],
    },
    extend: {
      colors: {
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
