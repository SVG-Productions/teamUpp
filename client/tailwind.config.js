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
        buttonPrimary: "var(--color-bg-button-primary)",
      },
      colors: {
        blueGray: "#3c55af",
      },
      textColor: {
        accent: "var(--color-text-accent)",
        primary: "var(--color-text-primary)",
        headingColor: "var(--color-text-heading)",
        iconPrimary: "var(--color-icon-button-primary)",
        iconSecondary: "var(--color-icon-button-secondary)",
      },
      borderColor: {
        borderprimary: "var(--color-border-primary)",
      },
    },
  },
  plugins: [],
};
