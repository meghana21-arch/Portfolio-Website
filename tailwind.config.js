/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "Georgia", "serif"],
      },
      colors: {
        bg: "rgb(var(--color-bg-rgb) / <alpha-value>)",
        surface: "rgb(var(--color-surface-rgb) / <alpha-value>)",
        border: "rgb(var(--color-border-rgb) / <alpha-value>)",
        border2: "rgb(var(--color-border2-rgb) / <alpha-value>)",
        faint: "rgb(var(--color-faint-rgb) / <alpha-value>)",
        faint2: "rgb(var(--color-faint2-rgb) / <alpha-value>)",
        muted: "rgb(var(--color-muted-rgb) / <alpha-value>)",
        muted2: "rgb(var(--color-muted2-rgb) / <alpha-value>)",
        ink: "rgb(var(--color-ink-rgb) / <alpha-value>)",
        ink2: "rgb(var(--color-ink2-rgb) / <alpha-value>)",
        accent: "rgb(var(--color-accent-rgb) / <alpha-value>)",
        accent2: "rgb(var(--color-accent2-rgb) / <alpha-value>)",
        accent3: "rgb(var(--color-accent3-rgb) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
