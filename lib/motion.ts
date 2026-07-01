import type { Variants } from "framer-motion";

/** Single premium easing curve shared across the app. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Spring tuned to feel tight & fast. */
export const SPRING = { type: "spring", stiffness: 400, damping: 25 } as const;

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

/** Soft focus-pull for lead paragraphs. */
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: EASE },
  },
};

/** Headline lines wiping up out of an overflow mask. */
export const maskRise: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1.1, ease: EASE } },
};

export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;
