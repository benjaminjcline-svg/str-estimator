import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#fafafa",
          elevated: "#ffffff",
          overlay: "rgba(0,0,0,0.4)",
        },
        label: {
          primary: "#1d1d1f",
          secondary: "#525252",
          tertiary: "#737373",
        },
        accent: {
          DEFAULT: "#0071e3",
          hover: "#0077ed",
          pressed: "#006edb",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "0.875rem" }],
        display: ["2rem", { lineHeight: "1.12", letterSpacing: "-0.025em" }],
        "display-lg": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "display-xl": ["3rem", { lineHeight: "1.08", letterSpacing: "-0.035em" }],
      },
      lineHeight: {
        relaxed: "1.55",
        snug: "1.35",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 4px 12px -2px rgb(0 0 0 / 0.05)",
        "card-hover": "0 4px 6px -2px rgb(0 0 0 / 0.04), 0 12px 24px -4px rgb(0 0 0 / 0.08)",
        elevated: "0 8px 30px -6px rgb(0 0 0 / 0.06), 0 2px 8px -2px rgb(0 0 0 / 0.04)",
        button: "0 1px 2px rgb(0 0 0 / 0.04)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        snappy: "cubic-bezier(0.16, 1, 0.3, 1)",
        friction: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        button: "280ms",
        ui: "280ms",
        card: "823ms",
      },
      animation: {
        "fade-in": "fadeIn 1.37s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-up": "slideUp 1.65s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "loader-spin": "loaderSpin 0.9s linear infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        contentIn: {
          "0%": { opacity: "0", transform: "scale(0.98)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "scale(1)", filter: "blur(0)" },
        },
        loaderSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
