import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
  /** Accent-dot color class; defaults to volt. */
  dotClassName?: string;
  /** Render only the outline of the house (for watermarks). */
  outline?: boolean;
}

/**
 * The Solution House mark: a gabled-house silhouette with an "S" path
 * carved out of it — a hook curling around the accent dot, flowing into
 * a stem that exits through the floor. Recreated as vector so it can be
 * recolored per context (ivory on ink, ink on volt, outline watermark).
 */
export function LogoMark({ className, dotClassName, outline = false }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className={cn("block", className)}
    >
      {outline ? (
        <polygon
          points="50,6 88,34 88,94 12,94 12,34"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinejoin="round"
        />
      ) : (
        <>
          <defs>
            <mask id="sh-s-cut">
              <rect width="100" height="100" fill="#fff" />
              {/* the S: hook curling over the dot, stem dropping through the floor */}
              <path
                d="M63 41
                   a 14 14 0 1 0 -22 11.5
                   C 46 56 51 60 51 70
                   L 51 94"
                fill="none"
                stroke="#000"
                strokeWidth={10}
                strokeLinecap="round"
              />
              <path d="M46 89 L56 89 L56 100 L46 100 Z" fill="#000" />
            </mask>
          </defs>
          <polygon
            points="50,6 88,34 88,94 12,94 12,34"
            fill="currentColor"
            mask="url(#sh-s-cut)"
          />
          <circle cx="49" cy="41" r="6.5" className={cn("fill-volt", dotClassName)} />
        </>
      )}
    </svg>
  );
}
