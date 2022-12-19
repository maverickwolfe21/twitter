/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        twitter: "#00ADED",
        extralightgray: "#Ececec",
        lightgray: "lightgray",
        darkgray: "darkgray",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
