import type { Config } from "tailwindcss";

/**
 * Deep-dark, Vercel/Linear-grade design system.
 * Near-black base, platinum text, cool "deep space" glow accents.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#070A12", // deep space base
        "bg-2": "#0A0F1C",
        card: "#0D1830", // navy card
        text: "#C8D4F0", // platinum
        bright: "#EEF2FF", // bright platinum (laser accent)
        steel: "#8899BB", // secondary
        glow: "#5B7CFF", // cool glow accent
      },
      fontFamily: {
        sans: ["var(--font-rubik)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
      maxWidth: {
        shell: "1320px",
      },
      borderRadius: {
        pill: "100px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        meshA: {
          "0%,100%": { transform: "translate3d(-6%,-4%,0) scale(1.1)" },
          "50%": { transform: "translate3d(6%,6%,0) scale(1.25)" },
        },
        meshB: {
          "0%,100%": { transform: "translate3d(8%,2%,0) scale(1.2)" },
          "50%": { transform: "translate3d(-8%,-6%,0) scale(1.05)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "mesh-a": "meshA 18s ease-in-out infinite",
        "mesh-b": "meshB 22s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
