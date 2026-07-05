"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Scroll-stacking deck: each card pins near the top of the viewport and
 * the next one slides over it. Covered cards ease back in scale and sink
 * behind a soft ink veil, so the pile reads with real depth. Pure CSS
 * sticky for the pinning (buttery on every device); one scroll progress
 * drives the shrink/dim of covered cards.
 */
export function CardStack({
  items,
  topOffset = 88,
  peek = 12,
  gap = "space-y-6 sm:space-y-8",
}: {
  items: ReactNode[];
  /** px from the viewport top where cards pin. */
  topOffset?: number;
  /** each successive card pins this many px lower — the deck edge. */
  peek?: number;
  gap?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.42", "end end"],
  });

  return (
    <div ref={ref} className={`relative ${gap}`}>
      {items.map((child, i) => (
        <StackItem
          key={i}
          i={i}
          n={items.length}
          progress={scrollYProgress}
          top={topOffset + i * peek}
        >
          {child}
        </StackItem>
      ))}
    </div>
  );
}

function StackItem({
  i,
  n,
  progress,
  top,
  children,
}: {
  i: number;
  n: number;
  progress: MotionValue<number>;
  top: number;
  children: ReactNode;
}) {
  // card i gets covered while progress runs its slice of the container
  const start = (i + 1) / n;
  const end = Math.min(1, (i + 2) / n);
  const last = i === n - 1;
  const scale = useTransform(progress, [start, end], last ? [1, 1] : [1, 0.945]);
  const veil = useTransform(progress, [start, end], last ? [0, 0] : [0, 0.5]);

  return (
    <div className="sticky" style={{ top }}>
      <motion.div style={{ scale }} className="origin-top will-change-transform">
        {children}
        {/* depth veil — dims as the next card slides over */}
        <motion.div
          aria-hidden
          style={{ opacity: veil }}
          className="pointer-events-none absolute inset-0 rounded-3xl bg-ink"
        />
      </motion.div>
    </div>
  );
}
