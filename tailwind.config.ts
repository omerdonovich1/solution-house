import type { Config } from "tailwindcss";

/**
 * "DOT" design system — nudot-grade typographic monochrome.
 * Pure black canvas, white display type, neutral grays — and a single
 * amber "dot" (from the brand mark) as the only color on the site.
 *
 * Legacy token names (bg, card, text, bright, steel, glow, volt) are kept
 * as aliases into the new palette so older components stay coherent.
 */
const palette = {
  ink: "#050505", // page base — pure-ish black
  surface: "#0D0D0D", // raised panel
  elevated: "#161616", // hover / second-level panel
  ivory: "#F4F4F2", // primary type — near-white
  body: "#C7C7C5", // long-form text
  mist: "#8B8B89", // secondary / meta
  dot: "#D9A13B", // THE dot — the primary accent
  // scene accents — reserved for the live line-art illustrations
  aqua: "#6FD9CE",
  iris: "#8F85FF",
  rose: "#FF7A88",
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
        volt: palette.dot,
        bg: palette.ink,
        "bg-2": palette.surface,
        card: palette.surface,
        text: palette.body,
        bright: palette.ivory,
        steel: palette.mist,
        glow: palette.dot,
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
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.15" },
        },
        drift: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-28px)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        blink: "blink 1.6s steps(1) infinite",
        drift: "drift 16s ease-in-out infinite",
        "drift-slow": "drift 22s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
