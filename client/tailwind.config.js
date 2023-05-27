/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        highlight: "var(--color-bg-highlight)",
      },
      colors: {
        bluegray: "#4773AA",
        bluegraylight: "#8BA6CA",
        highlightblue: "#BFE0FF",
      },
      textColor: {
        accent: "var(--color-text-accent)",
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        highlight: "var(--color-bg-highlight)",
      },
    },
  },
  plugins: [],
};
