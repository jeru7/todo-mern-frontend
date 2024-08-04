/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#222831',
        secondary: '#393E46',
        placeholder: '#8E8E8E',
        accent: '#B55400',
        success: '#0F9971',
        error: '#D24D57',
      },
    },
  },
  plugins: [],
}
