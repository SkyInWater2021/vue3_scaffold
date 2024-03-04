/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        global: {
          blue: "var(--global-blue)",
        },
      },
    },
  },
  plugins: [
    ["prettier-plugin-tailwindcss"],

    // 解决el-button和tailwindcss样式冲突的问题
    function ({ addBase }) {
      addBase({
        ".el-button": {
          "background-color": "var(--el-button-bg-color,val(--el-color-white))",
        },
      })
    },
  ],
}
