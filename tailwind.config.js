/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        xl: '1200px',
        sm: '480px',
        mini: '360px',
      },
      colors: {
        darkblue: '#003d99',
        blue: '#0066FF',
        lightblue: '#F5F9FF',
        white: '#FEFEFE',
        black: '#1c1c1c',
        grey: '#969696',
        lightgrey: '#e6e6e6',
      },
      borderRadius: {
        8: '8px',
        12: '12px',
        16: '16px',
      },
    },
  },
  plugins: [],
}
