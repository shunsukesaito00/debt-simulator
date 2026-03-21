/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-ui-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: [
          "var(--font-heading-serif)",
          "ui-serif",
          "Hiragino Mincho ProN",
          "Yu Mincho",
          "serif",
        ],
      },
      borderRadius: {
        ds: "var(--ds-radius-md)",
        "ds-sm": "var(--ds-radius-sm)",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
        soft2: "0 16px 50px rgba(0,0,0,0.10)",
        ds: "var(--ds-shadow-sm)",
        "ds-md": "var(--ds-shadow-md)",
      },
    },
  },
  plugins: [],
};