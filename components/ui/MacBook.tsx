import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A premiercs-style CSS MacBook: bezeled screen with camera + glare,
 * metallic deck with trackpad notch, and a grounded shadow. Whatever is
 * passed as children renders "on screen".
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
      <div className="relative z-10 mx-auto w-[88%] rounded-[16px] border border-white/[0.12] bg-[#101012] p-[9px] pb-[11px] shadow-[0_70px_130px_-45px_rgba(0,0,0,0.95)]">
        {/* camera */}
        <div className="absolute left-1/2 top-[3.5px] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-white/25" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[9px] bg-ink">
          {children}
          {/* glass glare */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,0.06),transparent_38%)]" />
        </div>
      </div>
      {/* deck */}
      <div className="relative z-10 mx-auto -mt-px h-[15px] w-full rounded-t-[4px] rounded-b-[12px] bg-gradient-to-b from-[#33333A] via-[#1D1D22] to-[#121216]">
        {/* trackpad notch */}
        <div className="absolute left-1/2 top-0 h-[7px] w-[13%] -translate-x-1/2 rounded-b-[7px] bg-[#0B0B0E]" />
        {/* deck edge highlight */}
        <div className="absolute inset-x-3 top-0 h-px bg-white/20" />
      </div>
      {/* under-body lip */}
      <div className="relative z-10 mx-auto h-[4px] w-[92%] rounded-b-[10px] bg-[#0A0A0C]" />
      {/* floor shadow */}
      <div
        aria-hidden
        className="absolute -bottom-9 left-1/2 h-10 w-[115%] -translate-x-1/2 rounded-[100%] bg-black/70 blur-2xl"
      />
    </div>
  );
}
