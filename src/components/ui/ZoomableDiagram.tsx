"use client";

import { useRef, useState, useCallback, useEffect, type ReactNode } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, X } from "lucide-react";

interface ZoomableDiagramProps {
  children: ReactNode;
  /** Short heading shown in the header bar */
  title?: string;
  /** Fixed canvas height (non-fullscreen). Defaults to 520px */
  height?: number;
  className?: string;
}

const MIN_SCALE = 0.25;
const MAX_SCALE = 5;
const ZOOM_STEP = 0.2;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * Wraps any diagram/SVG content with pan (drag), zoom (wheel / buttons),
 * fullscreen, and keyboard shortcuts.
 *
 * - Double-click canvas → reset view
 * - Scroll inside → zoom
 * - Drag → pan
 * - Escape → exit fullscreen
 */
export function ZoomableDiagram({
  children,
  title,
  height = 520,
  className = "",
}: ZoomableDiagramProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [fullscreen, setFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // ── Zoom helpers ──────────────────────────────────────────────────────────
  const zoomBy = useCallback(
    (delta: number) => setScale((s) => clamp(s + delta, MIN_SCALE, MAX_SCALE)),
    []
  );
  const resetView = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  // ── Mouse wheel zoom ──────────────────────────────────────────────────────
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      zoomBy(delta);
    },
    [zoomBy]
  );

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // ── Mouse drag pan ────────────────────────────────────────────────────────
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      setIsDragging(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    },
    [offset]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // ── Touch pan (single-finger) ─────────────────────────────────────────────
  const touchStartRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      touchStartRef.current = { x: t.clientX, y: t.clientY, ox: offset.x, oy: offset.y };
    },
    [offset]
  );

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1 || !touchStartRef.current) return;
    e.preventDefault();
    const t = e.touches[0];
    const start = touchStartRef.current;
    setOffset({ x: start.ox + t.clientX - start.x, y: start.oy + t.clientY - start.y });
  }, []);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && fullscreen) {
        setFullscreen(false);
        resetView();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [fullscreen, resetView]);

  // ── Toggle fullscreen ─────────────────────────────────────────────────────
  const toggleFullscreen = useCallback(() => {
    setFullscreen((v) => !v);
    resetView();
  }, [resetView]);

  if (!mounted) {
    // SSR-safe placeholder
    return (
      <div
        className={`overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] ${className}`}
        style={{ height }}
      />
    );
  }

  // ── Shared control buttons ────────────────────────────────────────────────
  const ctrlBtn = (
    onClick: () => void,
    label: string,
    icon: ReactNode
  ) => (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] shadow-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95"
    >
      {icon}
    </button>
  );

  const controls = (
    <div className="absolute right-3 top-3 z-10 flex items-center gap-1">
      {ctrlBtn(() => zoomBy(ZOOM_STEP), "Zoom in", <ZoomIn size={13} />)}
      {ctrlBtn(() => zoomBy(-ZOOM_STEP), "Zoom out", <ZoomOut size={13} />)}
      {ctrlBtn(resetView, "Reset view", <RotateCcw size={13} />)}
      {ctrlBtn(
        toggleFullscreen,
        fullscreen ? "Exit fullscreen (Esc)" : "Fullscreen",
        fullscreen ? <X size={13} /> : <Maximize2 size={13} />
      )}
    </div>
  );

  const canvasHeight = fullscreen ? "calc(100dvh - 41px)" : `${height}px`;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] ${
        fullscreen ? "fixed inset-0 z-50 rounded-none" : ""
      } ${className}`}
    >
      {/* ── Header bar ── */}
      <div className="flex h-[41px] items-center justify-between border-b border-[var(--border)] px-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
          {title ?? "Architecture Overview"}
        </span>
        <span className="hidden text-[11px] text-[var(--muted)] sm:block">
          scroll · drag · double-click to reset
        </span>
      </div>

      {/* ── Canvas ── */}
      <div
        ref={canvasRef}
        className="relative overflow-hidden"
        style={{
          height: canvasHeight,
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "none",
        }}
        onMouseDown={handleMouseDown}
        onDoubleClick={resetView}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* Transformed content */}
        <div
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.12s ease-out",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </div>

        {/* Control buttons */}
        {controls}

        {/* Scale badge */}
        <div className="absolute bottom-3 left-3 rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-0.5 text-[11px] font-mono tabular-nums text-[var(--muted)]">
          {Math.round(scale * 100)}%
        </div>
      </div>
    </div>
  );
}
