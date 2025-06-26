/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./*.html", "./base/js/**/*.js"],
  theme: {
    extend: {
      colors:{
        customBrown: "#8C3D24",
      },
    },
  },
  plugins: [],
}

