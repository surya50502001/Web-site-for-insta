import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        editorial: ["var(--font-editorial)", "Georgia", "serif"],
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        paper: {
          50: "#FCFAF6",
          100: "#F7F4EC",
          200: "#EFECE2",
          300: "#E2DDD0",
          400: "#C9C2AF",
          500: "#9C947F",
          900: "#1A1916",
        },
        studio: {
          dark: "#0F1012",
          card: "#18191D",
          border: "#282B33",
          accent: "#FF5E3A",
          terracotta: "#E26D5C",
          sage: "#587B6D",
          ochre: "#D4A373",
        },
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-6px) rotate(1deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        wiggle: "wiggle 2.5s ease-in-out infinite",
        pulseSlow: "pulseSlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
