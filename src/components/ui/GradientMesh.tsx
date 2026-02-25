import { cn } from "@/lib/utils";

interface GradientMeshProps {
  className?: string;
}

/**
 * GradientMesh — CSS-animated ambient background.
 *
 * Three soft radial-gradient blobs drift extremely slowly (22–34s cycles).
 * Animations use `transform` only — fully GPU-composited, zero JS, zero repaint.
 * Opacity is controlled by --mesh-opacity CSS variable (0.07 light, 0.14 dark).
 * `prefers-reduced-motion` pauses all blob animations via CSS.
 *
 * Usage: place as the first child of a `position: relative / overflow-hidden`
 * container. The component itself is `position: absolute; inset: 0`.
 */
export function GradientMesh({ className }: GradientMeshProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="mesh-blob mesh-blob-1" />
      <div className="mesh-blob mesh-blob-2" />
      <div className="mesh-blob mesh-blob-3" />
    </div>
  );
}
