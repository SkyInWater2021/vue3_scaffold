/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pewter: "var(--global-pewter)",
        textGray: "var(--global-gray)",
      },
      backgroundColor: {
        headerBg: "#5aa0f4",
      },
    },
  },

  plugins: [["prettier-plugin-tailwindcss"]],
}
