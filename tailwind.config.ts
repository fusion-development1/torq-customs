import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Accent — re-theme the whole store by editing these.
        brand: {
          300: "#ff8f9b",
          400: "#ff4d5e",
          500: "#e5162f",
          600: "#c40f27",
          700: "#9c0b1f"
        },
        // Matte neutral surfaces
        night: "#09090b",
        panel: "#111114",
        panel2: "#18181c",
        line: "rgba(255,255,255,0.08)"
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "sans-serif"]
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "pop-in": {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" }
        },
        "pulse-dot": {
          "0%,100%": { opacity: "0.45" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.4s ease-out both",
        "pop-in": "pop-in 0.35s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
