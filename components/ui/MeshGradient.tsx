/**
 * Sophisticated animated "deep space" mesh background:
 * two slow-drifting blurred gradient blobs + a masked grid.
 * Pure CSS transforms — hardware accelerated, zero layout shift.
 */
export function MeshGradient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute -top-1/3 right-[-10%] h-[70vh] w-[70vh] rounded-full bg-glow/20 blur-[120px] animate-mesh-a" />
      <div className="absolute bottom-[-25%] left-[-8%] h-[60vh] w-[60vh] rounded-full bg-[#7C5BFF]/15 blur-[130px] animate-mesh-b" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(91,124,255,0.12),transparent_70%)]" />
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(200,212,240,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(200,212,240,0.5)_1px,transparent_1px)] [background-size:62px_62px] [mask-image:radial-gradient(70%_60%_at_50%_28%,#000,transparent)]" />
    </div>
  );
}
