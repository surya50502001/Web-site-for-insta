/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          neon: "#D4FF00", // Acid Lime
          orange: "#FF4E00", // International Safety Orange
          cobalt: "#2563EB", // Royal Streetwear Blue
          pink: "#FF007A",
          charcoal: "#121214",
        },
        surface: {
          void: "#070708",
          black: "#0D0D10",
          card: "#141418",
          panel: "#1A1A22",
          border: "#2A2A36",
          bone: "#F4F4F0",
          paper: "#FAFAF7",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "tactile": "4px 4px 0px 0px rgba(0, 0, 0, 1)",
        "tactile-neon": "4px 4px 0px 0px #D4FF00",
        "tactile-orange": "4px 4px 0px 0px #FF4E00",
        "tactile-sm": "2px 2px 0px 0px rgba(0, 0, 0, 1)",
        "glow-neon": "0 0 30px rgba(212, 255, 0, 0.25)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "marquee": "marquee 22s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        }
      }
    },
  },
  plugins: [],
};
