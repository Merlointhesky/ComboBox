/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-blue': '#a8d8ea',
        'pastel-purple': '#aa96da',
        'pastel-pink': '#fcbad3',
        'pastel-yellow': '#ffffd2',
        'pastel-green': '#c7f9cc',
      }
    },
  },
  plugins: [],
}
