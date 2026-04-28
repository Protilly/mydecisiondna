import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        champagne: "#F7EFE4",
        graphite: "#1F2937",
        "soft-gold": "#C7A66B",
      },
      boxShadow: {
        "executive-card": "0 24px 70px -42px rgba(17, 24, 39, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
