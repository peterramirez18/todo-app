/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Plus Jakarta Sans', 'sans-serif']
      },
      colors: {

        // ### Primare Color
        'bright-blue': 'hsl(220, 98%, 61%)',
        'blue': 'hsl(192, 100%, 67%)',
        'purple': 'hsl(280, 87%, 65%)',
        // ### Light Theme
        'very-light-gray': 'hsl(0, 0%, 98%)',
        'very-light-grayish-blue': 'hsl(236, 33%, 92%)',
        'light-grayish-blue': 'hsl(233, 11%, 84%)',
        'dark-grayish-blue': 'hsl(236, 9%, 61%)',
        'very-dark-grayish-blue': 'hsl(235, 19%, 35%)',

        // ### Dark Theme
        'dark-very-dark-blue': 'hsl(235, 21%, 11%)',
        'dark-very-dark-desaturated-Blue': 'hsl(235, 24%, 19%)',
        'dark-light-grayish-blue': 'hsl(234, 39%, 85%)',
        'dark-light-grayish-blue-hover': 'hsl(236, 33%, 92%)',
        'dark-dark-grayish-blue': 'hsl(234, 11%, 52%)',
        'dark-very-dark-grayish-blue': 'hsl(233, 14%, 35%)',
        'dark-very-dark-grayish-blue-2': 'hsl(237, 14%, 26%)'
      }
    },
  },
  plugins: [],
}
