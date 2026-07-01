"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type CursorState = "idle" | "link" | "view";

/**
 * Custom cursor: a volt dot that snaps to the pointer and a trailing ring
 * that breathes over interactive elements. Elements tagged
 * `data-cursor="view"` morph the ring into a labeled volt pill.
 * Mounted only on fine-pointer devices; native cursor is hidden via a
 * class on <html>.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("idle");
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest?.('[data-cursor="view"]')) setState("view");
      else if (t.closest?.("a, button, input, textarea, select, label")) setState("link");
      else setState("idle");
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* dot — locked to the pointer */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt transition-opacity duration-200",
          state === "view" && "opacity-0"
        )}
      />
      {/* trailing ring / labeled pill */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[199] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            width: state === "view" ? 84 : state === "link" ? 56 : 36,
            height: state === "view" ? 84 : state === "link" ? 56 : 36,
            scale: pressed ? 0.85 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className={cn(
            "grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition-colors duration-300",
            state === "view"
              ? "border-transparent bg-ivory"
              : "border-ivory/30 bg-transparent"
          )}
        >
          <span
            className={cn(
              "select-none text-[12px] font-bold text-ink transition-opacity duration-200",
              state === "view" ? "opacity-100" : "opacity-0"
            )}
          >
            לצפייה
          </span>
        </motion.div>
      </motion.div>
    </>
  );
}
