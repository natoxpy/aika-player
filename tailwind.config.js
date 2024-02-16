const colors = require("tailwindcss/colors");
const defaultConfig = require("tailwindcss/defaultConfig");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,vue,tsx}"],
  theme: {
    extend: {},
    borderRadius: {
      primary: 3,
      ...defaultConfig.theme.borderRadius,
    },
    colors: {
      bprimary: "#09090B",
      bextra: "rgba(255,255,255,0.04)",
      fprimary: "#FFFFFF",
      fsecondary: "#3A3A43",
      baccent: "#27272A",
      ...colors,
    },
  },
  plugins: [],
};
