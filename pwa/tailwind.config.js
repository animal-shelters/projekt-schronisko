/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
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
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
