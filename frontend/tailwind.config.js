/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: [ 'Lato','Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['Courier New', 'Courier', 'monospace'],
        custom: ['"Your Custom Font"', 'Sans-serif'],
        lato:[]
      },
    },
  },
  variants: {},
  plugins: [],
}