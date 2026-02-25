"use client";

import { useState } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

// ── Data shape ────────────────────────────────────────────────────────────────

interface ServiceData extends Record<string, unknown> {
  label: string;
  description: string;
  icon?: string;
}

// ── Handle style — invisible dots, just anchor points for edges ───────────────
const handleStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  width: 1,
  height: 1,
  minWidth: 0,
  minHeight: 0,
};

// ── Component ─────────────────────────────────────────────────────────────────

export function ServiceNode({ data, selected }: NodeProps) {
  const { label, description, icon } = data as ServiceData;
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* ── Connection handles (invisible anchors) ── */}
      <Handle type="target" position={Position.Top}    style={handleStyle} />
      <Handle type="target" position={Position.Left}   style={handleStyle} />
      <Handle type="source" position={Position.Bottom} style={handleStyle} />
      <Handle type="source" position={Position.Right}  style={handleStyle} />

      {/* ── Node body ── */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 200,
          minHeight: 68,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          borderRadius: 10,
          background: selected
            ? "rgba(99,102,241,0.18)"
            : hovered
            ? "rgba(99,102,241,0.10)"
            : "var(--surface)",
          border: selected
            ? "1.5px solid #818cf8"
            : hovered
            ? "1.5px solid rgba(129,140,248,0.55)"
            : "1.5px solid var(--border)",
          boxShadow: selected
            ? "0 0 0 2px rgba(129,140,248,0.30)"
            : hovered
            ? "0 2px 12px rgba(99,102,241,0.18)"
            : "none",
          cursor: "default",
          transition: "border 0.15s, background 0.15s, box-shadow 0.15s",
          position: "relative",
        }}
      >
        {/* Icon */}
        {icon && (
          <span
            aria-hidden="true"
            style={{ fontSize: 20, lineHeight: 1, flexShrink: 0, userSelect: "none" }}
          >
            {icon}
          </span>
        )}

        {/* Text */}
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--foreground)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.3,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 10,
              color: "var(--muted)",
              marginTop: 2,
              lineHeight: 1.35,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </div>
        </div>

        {/* ── Hover tooltip (floats above the node) ── */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              bottom: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 11,
              color: "#e2e8f0",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
              zIndex: 10_000,
              pointerEvents: "none",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 3, color: "#818cf8" }}>
              {icon && <span style={{ marginRight: 6 }}>{icon}</span>}
              {label}
            </div>
            <div style={{ color: "#94a3b8", maxWidth: 240, whiteSpace: "normal" }}>
              {description}
            </div>
            {/* Arrow */}
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid #334155",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
