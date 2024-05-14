/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#27b82c",
        "hover": "#11661a",
      },
      gridTemplateColumns: {
        'layout': '272px 1fr',
      },
      gridTemplateRows: {
        'layout': '75px 1fr',
      }
    },
  },
  plugins: [],
};
