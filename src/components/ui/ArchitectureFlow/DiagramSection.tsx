"use client";

import dynamic from "next/dynamic";
import type { ArchitectureConfig } from "@/types/architecture";

/**
 * Client-component shell that lazy-loads ArchitectureFlow (browser-only)
 * with ssr: false. Import this into any Server Component page instead of
 * importing ArchitectureFlow directly, which would cause a "ssr: false is
 * not allowed in Server Components" Turbopack error.
 */
const ArchitectureFlow = dynamic(
  () => import("./index").then((m) => m.ArchitectureFlow),
  {
    ssr: false,
    loading: () => (
      <div className="h-[620px] animate-pulse rounded-xl border border-[var(--border)] bg-[var(--surface)]" />
    ),
  }
);

interface Props {
  config: ArchitectureConfig;
  title?: string;
  height?: number;
}

export function DiagramSection({ config, title, height = 620 }: Props) {
  return <ArchitectureFlow config={config} title={title} height={height} />;
}
