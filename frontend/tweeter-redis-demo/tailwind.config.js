module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        lora: ["Lora", "serif"],
        dosis: ["Dosis", "serif"],
      },
      textColor: {
        golden: "#FFD700",
        dark: "#313F4D",
        lightGold: "#FFF8E0",
        success: "#4BB543",
      },
      backgroundColor: {
        dark: "#313F4D",
        golden: "#FFD700",
        lightGold: "#FFF8E0",
        success: "#48c78e",
        successDark: "#257953",
      },
      margin: {
        '7/12': "25%"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
