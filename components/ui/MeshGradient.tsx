/**
 * Gallery-light atmosphere: a soft ivory key light from above, a fine
 * architectural grid fading out radially, and one whisper of volt drifting
 * at the edge. Soft masses are pre-faded radial gradients (not filter blur),
 * so the whole layer composites for free. Pure CSS transforms — hardware
 * accelerated, zero layout shift.
 */
export function MeshGradient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* key light */}
      <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_-8%,rgba(242,241,236,0.09),transparent_70%)]" />
      {/* drifting ambient masses — monochrome ivory + a whisper of volt */}
      <div className="absolute -top-1/3 right-[-12%] h-[80vh] w-[80vh] animate-mesh-a bg-[radial-gradient(closest-side,rgba(242,241,236,0.05),transparent)]" />
      <div className="absolute bottom-[-30%] left-[-12%] h-[65vh] w-[65vh] animate-mesh-b bg-[radial-gradient(closest-side,rgba(217,255,63,0.06),transparent)]" />
      {/* architectural grid */}
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(242,241,236,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(242,241,236,0.6)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(72%_58%_at_50%_24%,#000,transparent)]" />
    </div>
  );
}
