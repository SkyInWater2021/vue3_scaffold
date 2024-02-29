/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        global: {
          blue: "var(--global-blue)",
          "blue-light": "var(--global-blue-light)",
          "blue-lighter": "var(--global-blue-lighter)",
          "blue-lightest": "var(--global-blue-lightest)",
          "blue-dark": "var(--global-blue-dark)",
          "blue-darker": "var(--global-blue-darker)",
        },
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ".el-button": {
          "background-color": "var(--el-button-bg-color,val(--el-color-white))",
        },
      })
    },
    ["prettier-plugin-tailwindcss"],
  ],
}
