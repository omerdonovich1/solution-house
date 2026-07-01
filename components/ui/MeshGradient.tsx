/**
 * nudot-flat canvas: pure black with a whisper of top light and a soft
 * cinematic vignette. No grids, no blobs — the typography is the visual.
 */
export function MeshGradient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(244,244,242,0.05),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_55%,rgba(0,0,0,0.55))]" />
    </div>
  );
}
