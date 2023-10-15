/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: '#D3F6DB',
        green: '#5b8266',
        darkgreen: '#182825',
        darkblue: '#1F2937',
        lightblue: '#D6EBFF'
      },
    },
  },
  plugins: [],
}

