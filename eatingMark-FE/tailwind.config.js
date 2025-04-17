/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // <-- 이거 반드시 있어야 해!
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
