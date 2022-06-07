module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
