/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        amulya: ["amulya"],
        synonym: ["synonym"],
      },
      colors: {
        primary: "#5968ee",
        pr: {
          100: "#9ba4f5",
          200: "#8b95f3",
          300: "#7a86f1",
          400: "#6a77f0",
          500: "#5968ee",
          600: "#505ed6",
          700: "#4753be",
          800: "#3e49a7",
          900: "#353e8f",
          950: "#2d3477",
        },
        background: "#eeeaff",
        dark: "#343443",
      },
    },
  },
  plugins: [],
};

