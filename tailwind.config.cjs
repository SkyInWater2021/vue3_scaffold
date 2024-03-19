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
        headerBg: "var(--global-blue)",
      },
    },
  },

  plugins: [["prettier-plugin-tailwindcss"]],
  corePlugins: {
    preflight: false,
  },
}
