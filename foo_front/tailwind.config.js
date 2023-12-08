/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screen: {
      "sm": { min: "100px", max: "780px" },
      "md": { min: "781px" },
    },
    extend: {},
  },
  plugins: [],
}

