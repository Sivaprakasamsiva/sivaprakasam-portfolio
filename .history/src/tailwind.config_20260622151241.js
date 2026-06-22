/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#0A74DA',
        emerald: '#10B981',
      },
    },
  },
  plugins: [],
};