const withConfig = require("animated-tailwindcss")
module.exports = withConfig({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bump: {
          "0%": { scale: "4" },
          "100%": { scale: "1" },
        },
      },
      animation: {
        "bump": "bump 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"),  require('@tailwindcss/aspect-ratio'), require("daisyui")],
});
