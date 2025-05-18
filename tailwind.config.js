/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      colors: {
        primary: {
          DEFAULT: '#A855F7',
          hover: '#9333EA',
        }
      }
    },
  },
  plugins: [],
};