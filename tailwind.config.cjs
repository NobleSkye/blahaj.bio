/**** @type {import('tailwindcss').Config} ****/
module.exports = {
  content: [
    './src/**/*.{astro,html,ts,tsx,js,jsx}',
    './pages/**/*.{astro,html,ts,tsx,js,jsx}',
    './components/**/*.{astro,html,ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
};
