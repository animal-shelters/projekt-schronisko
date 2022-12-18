/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: {
          DEFAULT: "#DB70B5",
          hover: "#AF5A91",
          dark: {
            DEFAULT: "#1F2937",
            hover: "#4C545F",
          },
        },
        secondary: {
          dark: {
            DEFAULT: "#364f73",
            hover: "#405573",
          },
        },
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
