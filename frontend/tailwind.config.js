/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#171717',
        primary: '#39ff14', // neon green
        secondary: '#00f0ff', // neon blue
        danger: '#ff003c', // neon red
        warning: '#ffea00',
      }
    },
  },
  plugins: [],
}
