/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        tertiary: "var(--color-bg-tertiary)",
        highlight: "var(--color-bg-highlight)",
      },
      colors: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        tertiary: "var(--color-bg-tertiary)",
        highlight: "var(--color-bg-highlight)",
        bluegray: "#4773AA",
        bluegraylight: "#8BA6CA",
        highlightblue: "#BFE0FF",
      },
      textColor: {
        accent: "var(--color-text-accent)",
        primary: "var(--color-text-primary)",
        headingColor: "var(--color-text-heading)",
        highlight: "var(--color-bg-highlight)",
      },
      borderColor: {
        borderprimary: "var(--color-border-primary)",
      },
    },
  },
  plugins: [],
};
