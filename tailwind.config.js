/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#8ecae6",
          100: "219ebc",
          200: "023047",
        },
        secondary: {
          50: "#ffb703",
          100: "#fb8500",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
