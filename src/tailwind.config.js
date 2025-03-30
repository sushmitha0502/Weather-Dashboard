/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enables dark mode with a CSS class
  theme: {
    extend: {
      // You can customize colors, fonts, etc. here
      colors: {
        sky: {
          850: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
};
