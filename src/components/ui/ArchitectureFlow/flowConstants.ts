import type { LayerStyle } from "@/types/architecture";

/** Per-layer colour tokens (dark-theme palette) */
export const layerColors: Record<
  LayerStyle,
  { border: string; bg: string; label: string }
> = {
  edge:       { border: "#818cf8", bg: "rgba(129,140,248,0.07)", label: "#818cf8" },
  network:    { border: "#38bdf8", bg: "rgba(56,189,248,0.07)",  label: "#38bdf8" },
  compute:    { border: "#22d3ee", bg: "rgba(34,211,238,0.07)",  label: "#22d3ee" },
  data:       { border: "#f472b6", bg: "rgba(244,114,182,0.07)", label: "#f472b6" },
  security:   { border: "#fbbf24", bg: "rgba(251,191,36,0.08)",  label: "#fbbf24" },
  cicd:       { border: "#34d399", bg: "rgba(52,211,153,0.07)",  label: "#34d399" },
  monitoring: { border: "#a78bfa", bg: "rgba(167,139,250,0.07)", label: "#a78bfa" },
  iac:        { border: "#fb923c", bg: "rgba(251,146,60,0.07)",  label: "#fb923c" },
  artifacts:  { border: "#94a3b8", bg: "rgba(148,163,184,0.07)", label: "#94a3b8" },
  deploy:     { border: "#2dd4bf", bg: "rgba(45,212,191,0.07)",  label: "#2dd4bf" },
};

/** Accent for normal (non-dashed) edges */
export const EDGE_COLOR = "#6366f1";
/** Muted colour for dashed / indirect edges */
export const EDGE_DASHED_COLOR = "#64748b";
/** Stroke width in px */
export const EDGE_STROKE = 1.6;
