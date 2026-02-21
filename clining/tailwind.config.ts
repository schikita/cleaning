import type { Config } from "tailwindcss";

// Note: Tailwind v4 primarily uses CSS-based configuration (@theme in globals.css)
// This file is kept for compatibility but the main config is in app/globals.css
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
