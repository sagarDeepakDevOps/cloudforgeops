"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

/**
 * Client-only Mermaid diagram renderer.
 * Dynamically imports mermaid at runtime (browser only) to avoid SSR conflicts.
 */
export function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            // Match site accent (#818cf8 indigo)
            primaryColor: "#1e1b4b",
            primaryTextColor: "#e2e8f0",
            primaryBorderColor: "#818cf8",
            lineColor: "#818cf8",
            secondaryColor: "#1e293b",
            tertiaryColor: "#0f172a",
            background: "#0f172a",
            mainBkg: "#1e293b",
            nodeBorder: "#818cf8",
            clusterBkg: "#1e293b",
            clusterBorder: "#334155",
            titleColor: "#818cf8",
            edgeLabelBackground: "#1e293b",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontSize: "13px",
          },
          flowchart: {
            curve: "basis",
            padding: 20,
          },
          securityLevel: "loose",
        });

        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, chart.trim());

        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          // Make SVG responsive
          const svgEl = ref.current.querySelector("svg");
          if (svgEl) {
            svgEl.removeAttribute("width");
            svgEl.removeAttribute("height");
            svgEl.style.width = "100%";
            svgEl.style.height = "auto";
          }
          setReady(true);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Mermaid render error:", err);
          setError("Diagram failed to render.");
        }
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6 ${className ?? ""}`}
    >
      {/* Loading skeleton */}
      {!ready && (
        <div className="flex h-48 items-center justify-center">
          <span className="animate-pulse text-xs text-[var(--muted)]">
            Rendering diagram…
          </span>
        </div>
      )}
      <div
        ref={ref}
        className={`transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0 absolute"}`}
      />
    </div>
  );
}
