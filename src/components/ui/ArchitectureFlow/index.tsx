"use client";

import "@xyflow/react/dist/style.css";

import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  type Node,
  type Edge,
} from "@xyflow/react";

import { ServiceNode } from "./ServiceNode";
import { LayerNode } from "./LayerNode";
import { MobileFallback } from "./MobileFallback";
import { EDGE_COLOR, EDGE_DASHED_COLOR, EDGE_STROKE } from "./flowConstants";
import type { ArchitectureConfig } from "@/types/architecture";

// ── Custom node type registry ─────────────────────────────────────────────────

const nodeTypes = {
  service: ServiceNode,
  layer:   LayerNode,
} as const;

// ── ArchitectureConfig → React Flow data converters ──────────────────────────

function buildNodes(config: ArchitectureConfig): Node[] {
  // Layer / group nodes — rendered as background containers
  const layerNodes: Node[] = config.groups.map((g) => ({
    id:       g.id,
    type:     "layer",
    position: { x: g.x, y: g.y },
    data:     { label: g.label, layerStyle: g.layerStyle },
    // Explicit dimensions so React Flow knows the bounding box for child containment
    width:  g.width,
    height: g.height,
    style:  { width: g.width, height: g.height },
    draggable:  false,
    selectable: false,
    focusable:  false,
    zIndex:     0,
  }));

  // Service / leaf nodes — interactive, optionally parented to a layer
  const serviceNodes: Node[] = config.nodes.map((n) => ({
    id:       n.id,
    type:     "service",
    position: { x: n.x, y: n.y },
    data:     { label: n.label, description: n.description, icon: n.icon },
    width:    200,
    // parentId + extent keeps the node inside its layer when panning
    ...(n.groupId ? { parentId: n.groupId, extent: "parent" as const } : {}),
    draggable:  false,
    selectable: true,
    zIndex:     2,
  }));

  return [...layerNodes, ...serviceNodes];
}

function buildEdges(config: ArchitectureConfig): Edge[] {
  return config.edges.map((e) => ({
    id:       e.id,
    source:   e.source,
    target:   e.target,
    label:    e.label ?? undefined,
    type:     "smoothstep",
    animated: e.animated ?? false,
    style: {
      stroke:          e.dashed ? EDGE_DASHED_COLOR : EDGE_COLOR,
      strokeWidth:     EDGE_STROKE,
      strokeDasharray: e.dashed ? "5 4" : undefined,
    },
    markerEnd: {
      type:   MarkerType.ArrowClosed,
      width:  12,
      height: 12,
      color:  e.dashed ? EDGE_DASHED_COLOR : EDGE_COLOR,
    },
    labelStyle: {
      fill:       "#94a3b8",
      fontSize:   9,
      fontWeight: 500,
    },
    labelBgStyle: {
      fill:        "#0f172a",
      fillOpacity: 0.82,
      rx:          3,
    },
    zIndex: 1,
  }));
}

// ── Component ─────────────────────────────────────────────────────────────────

interface ArchitectureFlowProps {
  config: ArchitectureConfig;
  title?: string;
  /** Total component height in px — header (41px) + canvas remainder */
  height?: number;
}

export function ArchitectureFlow({
  config,
  title = "Architecture Overview",
  height = 620,
}: ArchitectureFlowProps) {
  // Memoize so conversions don't re-run on every parent render
  const nodes = useMemo(() => buildNodes(config), [config]);
  const edges = useMemo(() => buildEdges(config), [config]);

  const canvasH = Math.max(320, height - 41);

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)]">
      {/* ── Header ── */}
      <div
        className="flex h-[41px] shrink-0 items-center justify-between border-b border-[var(--border)] px-4"
        style={{ background: "var(--surface)" }}
      >
        <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--accent)]">
          {title}
        </span>
        <span className="hidden text-[10px] text-[var(--muted)] md:block">
          click to highlight&ensp;·&ensp;scroll to zoom&ensp;·&ensp;drag to pan
        </span>
      </div>

      {/* ── Desktop — React Flow canvas ── */}
      <div
        className="hidden md:block"
        style={{ height: canvasH, background: "var(--background)" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.12, maxZoom: 0.95 }}
          minZoom={0.1}
          maxZoom={3}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
          defaultEdgeOptions={{ type: "smoothstep" }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="rgba(148,163,184,0.15)"
          />
          <Controls
            position="bottom-right"
            showInteractive={false}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              overflow: "hidden",
              marginRight: 12,
              marginBottom: 12,
            }}
          />
        </ReactFlow>
      </div>

      {/* ── Mobile — structural list fallback ── */}
      <div className="block md:hidden" style={{ background: "var(--background)" }}>
        <MobileFallback config={config} />
      </div>
    </div>
  );
}
