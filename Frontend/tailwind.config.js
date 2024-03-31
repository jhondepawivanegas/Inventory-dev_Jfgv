/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        greenSena: '#38A800',
        blueSena: '#00324D',
      }
    },
  },
  plugins: [],
}
