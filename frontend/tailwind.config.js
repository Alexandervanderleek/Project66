/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'permanent-marker': ['"Permanent Marker"', 'sans-serif'],
        'lilly-one':['"Lilita One"','sans-serif']
      },
      height: {
        'screen': '100vh',
        'full': '100%'
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
}

