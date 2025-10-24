import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        "2xl": "1.5rem",
      },
      boxShadow: {
        glow: "0 25px 50px -12px rgba(79, 139, 247, 0.35)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
