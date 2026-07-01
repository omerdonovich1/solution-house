import type { Config } from "tailwindcss";

/**
 * "Ink & Ivory" design system — hyper-premium monochrome.
 * Warm near-black ink, gallery-white ivory type, hairline borders,
 * and a single volt accent reserved for signals only.
 *
 * Legacy token names (bg, card, text, bright, steel, glow) are kept as
 * aliases into the new palette so older components stay coherent.
 */
const palette = {
  ink: "#0A0A0B", // page base — warm near-black
  surface: "#121214", // raised panel
  elevated: "#1A1A1D", // hover / second-level panel
  ivory: "#F2F1EC", // primary type — warm gallery white
  body: "#C9C8C2", // long-form text
  mist: "#8A8A85", // secondary / meta
  volt: "#D9FF3F", // the single accent — signals only
} as const;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...palette,
        // legacy aliases
        bg: palette.ink,
        "bg-2": palette.surface,
        card: palette.surface,
        text: palette.body,
        bright: palette.ivory,
        steel: palette.mist,
        glow: palette.volt,
      },
      fontFamily: {
        sans: ["var(--font-rubik)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        shell: "1380px",
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
          "0%,100%": { transform: "translate3d(-4%,-3%,0) scale(1.05)" },
          "50%": { transform: "translate3d(4%,4%,0) scale(1.18)" },
        },
        meshB: {
          "0%,100%": { transform: "translate3d(6%,2%,0) scale(1.12)" },
          "50%": { transform: "translate3d(-6%,-4%,0) scale(1)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        "mesh-a": "meshA 22s ease-in-out infinite",
        "mesh-b": "meshB 26s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
