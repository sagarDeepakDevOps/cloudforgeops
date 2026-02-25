"use client";

import { type NodeProps } from "@xyflow/react";
import { layerColors } from "./flowConstants";
import type { LayerStyle } from "@/types/architecture";

// ── Data shape ────────────────────────────────────────────────────────────────

interface LayerData extends Record<string, unknown> {
  label: string;
  layerStyle: LayerStyle;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Full-bleed container node — sized by the `style.width / style.height` set
 * on the React Flow node object. Children (service nodes) sit inside via
 * React Flow's `parentId` mechanism.
 *
 * pointer-events: none on the background so clicks reach the child nodes.
 */
export function LayerNode({ data }: NodeProps) {
  const { label, layerStyle } = data as LayerData;
  const colors = layerColors[layerStyle] ?? layerColors.edge;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 12,
        border: `1px dashed ${colors.border}`,
        background: colors.bg,
        position: "relative",
        pointerEvents: "none",
        boxSizing: "border-box",
      }}
    >
      {/* Layer label — top-left */}
      <span
        style={{
          position: "absolute",
          top: 8,
          left: 14,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          color: colors.label,
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          maxWidth: "calc(100% - 28px)",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </span>
    </div>
  );
}
