"use client";

import { useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  /**
   * Max pixel shift in each axis. Keep this small (4–8px) to stay
   * professional — this is a subtle depth cue, not a gimmick.
   * Default: 6
   */
  strength?: number;
  className?: string;
}

/**
 * MagneticButton — wraps any element and applies a subtle magnetic
 * attraction effect on mouse hover.
 *
 * On `mousemove`: shifts the inner element toward the cursor by `strength`
 * pixels, scaled linearly by how far the cursor is from the element center.
 * On `mouseleave`: springs back to origin via CSS cubic-bezier transition.
 *
 * Uses direct DOM mutation (`ref.current.style.transform`) instead of React
 * state to avoid unnecessary re-renders on every mouse movement.
 *
 * Performance: zero JS on idle, runs only while mouse is inside the bounding box.
 */
export function MagneticButton({
  children,
  strength = 6,
  className,
}: MagneticButtonProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Normalised offset from center: -0.5 → 0.5
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `translate(${nx * strength * 2}px, ${ny * strength * 2}px)`;
  }

  function handleMouseLeave() {
    if (!innerRef.current) return;
    innerRef.current.style.transform = "translate(0px, 0px)";
  }

  return (
    <div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Slightly larger hit area helps the magnet feel responsive
      style={{ padding: "4px", margin: "-4px", display: "inline-flex" }}
    >
      <div
        ref={innerRef}
        style={{
          // Spring back: custom cubic-bezier for a slight overshoot feel
          transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          display: "inline-flex",
        }}
      >
        {children}
      </div>
    </div>
  );
}
