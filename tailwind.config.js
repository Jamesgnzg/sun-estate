/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#e33a07",
          50: "#bd3006",
        },
        favorite: {
          DEFAULT: "#f53431",
        },
      },
    },
  },
  plugins: [],
};
