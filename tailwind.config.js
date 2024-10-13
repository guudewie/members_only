/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#2563eb",
          100: "#1d4ed8",
          200: "#1e40af",
        },
        green: {
          50: "#a3e635",
          100: "#84cc16",
          200: "#65a30d",
        },
        yellow: {
          50: "#fde047",
          100: "#facc15",
          200: "#eab308",
        },
      },
      ringColor: {
        DEFAULT: "#eab308",
      },
    },
  },
  variants: {
    extend: {
      ringColor: ["focus"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
