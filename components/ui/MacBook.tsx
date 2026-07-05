import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Key counts per row: function row, numbers, qwerty, home, shift.
const KEY_ROWS = [
  { keys: 13, h: 9 }, // function row — shorter keys
  { keys: 14, h: 13 },
  { keys: 14, h: 13 },
  { keys: 13, h: 13 },
  { keys: 12, h: 13 },
] as const;

const KEYCAP =
  "rounded-[3px] bg-gradient-to-b from-[#26262b] to-[#1a1a1f] shadow-[inset_0_1px_0_rgba(255,255,255,0.09),inset_0_-1px_1px_rgba(0,0,0,0.5),0_1px_1px_rgba(0,0,0,0.6)]";

/** Perforated speaker grille — a dot matrix beside the keyboard. */
function Speaker() {
  return (
    <div
      className="h-full w-[6.5%] rounded-[4px] opacity-70"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,0.85) 34%, transparent 40%)",
        backgroundSize: "4px 4px",
      }}
    />
  );
}

/**
 * A realistic CSS MacBook Pro. Space-gray aluminum lid with a glass panel,
 * camera notch, hinge, and a keyboard deck tilted toward the viewer
 * (perspective rotateX) with speaker grilles, sculpted keycaps and a glass
 * trackpad. Whatever is passed as children renders "on screen".
 */
export function MacBook({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative w-[min(84vw,900px)]", className)}>
      {/* ── lid ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-[88%] rounded-t-[18px] rounded-b-[4px] bg-gradient-to-b from-[#3a3a3f] via-[#2b2b30] to-[#1d1d21] p-[3px] shadow-[0_70px_130px_-45px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.22),inset_1px_0_0_rgba(255,255,255,0.07),inset_-1px_0_0_rgba(255,255,255,0.07)]">
        {/* glass panel — near-borderless like a real MBP */}
        <div className="relative overflow-hidden rounded-t-[15px] rounded-b-[2px] bg-black p-[7px] pb-[9px]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-ink">
            {children}
            {/* screen vignette + glass glare */}
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.55)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02)_30%,transparent_46%)]" />
          </div>

          {/* camera notch, overlapping the screen like the real thing */}
          <div className="absolute left-1/2 top-[7px] z-10 flex h-[10px] w-[12.5%] -translate-x-1/2 items-center justify-center rounded-b-[5px] bg-black">
            <span className="relative h-[4px] w-[4px] rounded-full bg-[#12161d] shadow-[inset_0_0_1px_rgba(90,130,180,0.8)]">
              <span className="absolute left-[0.5px] top-[0.5px] h-[1.5px] w-[1.5px] rounded-full bg-[#2a4a6a]" />
            </span>
          </div>
        </div>
      </div>

      {/* ── hinge ───────────────────────────────────────────────────── */}
      <div className="relative z-20 mx-auto -mt-px h-[8px] w-[88%] rounded-b-[6px] bg-gradient-to-b from-[#08080a] via-[#1a1a1e] to-[#2e2e34] shadow-[inset_0_-1px_0_rgba(255,255,255,0.1)]" />

      {/* ── deck — a real plane, tilted toward the viewer ───────────── */}
      <div className="relative z-10 -mt-px" style={{ perspective: "1000px" }}>
        <div
          className="relative mx-auto w-[96%] rounded-b-[26px] rounded-t-[4px] shadow-[0_60px_90px_-40px_rgba(0,0,0,0.9)]"
          style={{
            height: 210,
            transform: "rotateX(68deg)",
            transformOrigin: "center top",
            background:
              // brushed aluminum: base gradient + faint vertical graining
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 3px), linear-gradient(180deg, #232327 0%, #2c2c32 45%, #3a3a41 100%)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderTop: "none",
          }}
        >
          {/* keyboard well flanked by speaker grilles */}
          <div className="absolute left-1/2 top-[12px] flex h-[118px] w-[94%] -translate-x-1/2 items-stretch justify-center gap-[1.5%]">
            <Speaker />
            <div className="w-[83%] rounded-[10px] bg-[#0d0d10] p-[6px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.85),inset_0_-1px_0_rgba(255,255,255,0.04)]">
              <div className="flex h-full flex-col justify-between gap-[3px]">
                {KEY_ROWS.map((row, r) => (
                  <div key={r} className="flex flex-1 gap-[3.5px]" style={{ maxHeight: row.h + 4 }}>
                    {Array.from({ length: row.keys }).map((_, i) => (
                      <span key={i} className={cn("flex-1", KEYCAP)} />
                    ))}
                  </div>
                ))}
                {/* bottom row — modifiers, spacebar, arrows */}
                <div className="flex flex-1 gap-[3.5px]">
                  <span className={cn("flex-[1.1]", KEYCAP)} />
                  <span className={cn("flex-1", KEYCAP)} />
                  <span className={cn("flex-[1.25]", KEYCAP)} />
                  <span className={cn("flex-[5.4]", KEYCAP)} />
                  <span className={cn("flex-[1.25]", KEYCAP)} />
                  {/* arrow cluster */}
                  <span className="flex flex-[2] flex-col gap-[2px]">
                    <span className="flex flex-1 justify-center px-[28%]">
                      <span className={cn("w-full", KEYCAP)} />
                    </span>
                    <span className="flex flex-1 gap-[2px]">
                      <span className={cn("flex-1", KEYCAP)} />
                      <span className={cn("flex-1", KEYCAP)} />
                      <span className={cn("flex-1", KEYCAP)} />
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <Speaker />
          </div>

          {/* glass trackpad */}
          <div className="absolute bottom-[12px] left-1/2 h-[62px] w-[36%] -translate-x-1/2 rounded-[10px] bg-gradient-to-b from-[#202024] to-[#2b2b31] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),inset_0_-1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(0,0,0,0.35)]" />

          {/* front lip: thumb-scoop notch + edge highlight */}
          <div className="absolute -bottom-px left-1/2 h-[7px] w-[13%] -translate-x-1/2 rounded-t-[100px] bg-gradient-to-b from-[#0c0c0e] to-[#1c1c21] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
          <div className="absolute inset-x-8 bottom-0 h-px rounded-full bg-white/[0.14]" />
        </div>
      </div>

      {/* floor shadow + faint reflection */}
      <div
        aria-hidden
        className="absolute -bottom-8 left-1/2 h-12 w-[118%] -translate-x-1/2 rounded-[100%] bg-black/75 blur-2xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-[52px] left-1/2 h-10 w-[80%] -translate-x-1/2 rounded-[100%] bg-white/[0.02] blur-xl"
      />
    </div>
  );
}
