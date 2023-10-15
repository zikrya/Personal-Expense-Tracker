/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Didact Gothic', 'sans']
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #D3F6DB, #DAE0FB)'
      }
    },
  },
  plugins: [],
}

