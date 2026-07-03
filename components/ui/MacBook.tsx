import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Key counts per row; the last row is rendered separately with a spacebar.
const KEY_ROWS = [14, 14, 13, 13] as const;

/**
 * A premiercs-style CSS MacBook: bezeled screen with camera + glare, and a
 * keyboard deck tilted toward the viewer (perspective rotateX) so the
 * machine unmistakably reads as an open laptop — keys, spacebar, trackpad.
 * Whatever is passed as children renders "on screen".
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
      {/* lid / screen */}
      <div className="relative z-10 mx-auto w-[88%] rounded-t-[16px] rounded-b-[6px] border border-white/[0.12] bg-[#101012] p-[9px] pb-[11px] shadow-[0_70px_130px_-45px_rgba(0,0,0,0.95)]">
        {/* camera */}
        <div className="absolute left-1/2 top-[3.5px] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-white/25" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[9px] bg-ink">
          {children}
          {/* glass glare */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,0.06),transparent_38%)]" />
        </div>
      </div>

      {/* hinge */}
      <div className="relative z-20 mx-auto -mt-px h-[7px] w-[88%] rounded-b-[5px] bg-gradient-to-b from-[#050507] to-[#141418]" />

      {/* keyboard deck — a real plane, tilted toward the viewer */}
      <div className="relative z-10 -mt-px" style={{ perspective: "1000px" }}>
        <div
          className="relative mx-auto w-[96%] rounded-b-[26px] rounded-t-[4px] border border-t-0 border-white/[0.07] bg-gradient-to-b from-[#1B1B1F] via-[#26262C] to-[#313138] shadow-[0_60px_90px_-40px_rgba(0,0,0,0.9)]"
          style={{
            height: 210,
            transform: "rotateX(68deg)",
            transformOrigin: "center top",
          }}
        >
          {/* keyboard well */}
          <div className="absolute left-1/2 top-[12px] w-[80%] -translate-x-1/2 rounded-[12px] bg-[#101013] p-[7px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
            <div className="flex flex-col gap-[4px]">
              {KEY_ROWS.map((n, r) => (
                <div key={r} className="flex gap-[4px]">
                  {Array.from({ length: n }).map((_, i) => (
                    <span
                      key={i}
                      className="h-[14px] flex-1 rounded-[3px] bg-[#1E1E24] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                    />
                  ))}
                </div>
              ))}
              {/* bottom row with spacebar */}
              <div className="flex gap-[4px]">
                {[1, 1, 1].map((f, i) => (
                  <span key={`s${i}`} className="h-[14px] flex-1 rounded-[3px] bg-[#1E1E24] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
                ))}
                <span className="h-[14px] flex-[5.2] rounded-[3px] bg-[#1E1E24] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
                {[1, 1, 1].map((f, i) => (
                  <span key={`e${i}`} className="h-[14px] flex-1 rounded-[3px] bg-[#1E1E24] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
                ))}
              </div>
            </div>
          </div>

          {/* trackpad */}
          <div className="absolute bottom-[14px] left-1/2 h-[60px] w-[34%] -translate-x-1/2 rounded-[10px] border border-white/[0.07] bg-gradient-to-b from-[#212127] to-[#2A2A31] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />

          {/* front-edge highlight */}
          <div className="absolute inset-x-8 bottom-0 h-px rounded-full bg-white/[0.12]" />
        </div>
      </div>

      {/* floor shadow */}
      <div
        aria-hidden
        className="absolute -bottom-8 left-1/2 h-12 w-[118%] -translate-x-1/2 rounded-[100%] bg-black/75 blur-2xl"
      />
    </div>
  );
}
