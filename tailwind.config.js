/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#b07c3c",
        "secondary": "#0D0D0D",
        "background": "#FFFFFF",
        "webBG": "#FFFFFF",
        "mobileBG": "#F3F3F3",
        "favorite": "#A64029",
        "Label": "#8C6658",
        "discount": "#6C6C6C",
        "textColorForDarkBG": "#FFFFF8"
      },
      fontFamily: {
        "primary": ["Montserrat", "sans-serif"],
        "secondary": ["Nunito Sans", "sans-serif"]
      },
    },
  },
  plugins: [],
}

