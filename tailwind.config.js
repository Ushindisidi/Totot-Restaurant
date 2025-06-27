/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./*.html", "./base/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        customBrown: "#8C3D24",
        "ethiopian-red": "#8c3a24",
        "ethiopian-dark": "#26100A",
      },
    },
  },
  plugins: [],
};
