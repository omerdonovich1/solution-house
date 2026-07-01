"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** 5×7 letter bitmaps — the nudot-style dot-matrix display. */
const GLYPHS: Record<string, readonly string[]> = {
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
};

interface DotMatrixProps {
  glyphs?: readonly (keyof typeof GLYPHS)[];
  /** Dot diameter in px. */
  size?: number;
  gap?: number;
  interval?: number;
  className?: string;
}

/**
 * A letterform assembled from dots that morphs between glyphs — the "dot"
 * of Solution House made kinetic. The heart dot (center of the grid)
 * stays amber: the only colored pixel in the composition.
 */
export function DotMatrix({
  glyphs = ["S", "H"],
  size = 16,
  gap = 7,
  interval = 2600,
  className,
}: DotMatrixProps) {
  const [idx, setIdx] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || glyphs.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % glyphs.length), interval);
    return () => clearInterval(id);
  }, [glyphs.length, interval, reduced]);

  const bitmap = GLYPHS[glyphs[idx]];

  return (
    <div
      aria-hidden
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(5, ${size}px)`,
        gap,
        direction: "ltr",
      }}
    >
      {bitmap.flatMap((row, r) =>
        row.split("").map((cell, c) => {
          const on = cell === "1";
          const heart = r === 3 && c === 2;
          return (
            <motion.span
              key={`${r}-${c}`}
              animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 22,
                delay: (r * 5 + c) * 0.012,
              }}
              className={cn("rounded-full", heart ? "bg-dot" : "bg-ivory")}
              style={{ width: size, height: size }}
            />
          );
        })
      )}
    </div>
  );
}
