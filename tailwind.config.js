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
        menu: "#FFF1C6",
        "menu-title": "#4A3A0C",
        "contact-bg": "#93532A",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        playfair: ['"Playfair Display"', "serif"],
      },
    },
  },
  plugins: [],
};
