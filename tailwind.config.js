/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#FFCE1A",
        "secondary": "#0D0842",
        "background": "#FEF3E2",
        "webBG": "#FFFFFF",
        "mobileBG": "#F3F3F3",
        "favorite": "#FF5841",
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

