/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#4f2d8a",
          dark: "#1a0a2e",
          gold: "#f5a623",
          light: "#f0eeff",
        },
      },
    },
  },
  plugins: [],
};
