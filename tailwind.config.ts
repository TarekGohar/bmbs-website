import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        "1500": "1500ms", // Custom duration for transitions
      },
      animationDuration: {
        "1500": "1500ms", // Custom duration for animations
      },
      animation: {
        "infinite-scroll": "infinite-scroll 35s linear infinite", // Adjust duration for smoothness
        spinClockwise: "spinClockwise 3s linear infinite",
        spinCounterClockwise: "spinCounterClockwise 6s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50%))" }, // Scroll half the width for seamless effect
        },
        spinClockwise: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        spinCounterClockwise: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
      container: {
        center: true,
        screens: {
          sm: "100%",
          md: "100%",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
          "3xl": "1920px",
        },
      },

      fontFamily: {
        made: ["Made", "sans-serif"],
        okine: ["Okine", "sans-serif"],
        creato: ["Creato", "sans-serif"],
      },
      fontSize: {
        xs: ".75rem",
        "7xl": "5rem",
        "8xl": "6rem",
        "9xl": "7rem",
        "10xl": "8rem",
      },
    },
  },
  plugins: [],
};
export default config;
