"use client";

import { motion } from "framer-motion";
import {
  type LucideIcon,
  ArrowRight,
  AlertCircle,
  Wrench,
  TrendingUp,
  Server,
  Code2,
  Box,
  GitBranch,
  BarChart2,
  Cloud,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/**
 * Icon registry — safe to resolve by string key from Server Components.
 * Never pass LucideIcon functions directly across the server/client boundary.
 */
const iconMap: Record<string, LucideIcon> = {
  Server,
  Code2,
  Box,
  GitBranch,
  BarChart2,
  Cloud,
};

export interface ServiceCardProps {
  /** Visual order index */
  index: number;
  /** Key into iconMap — resolved inside this client component */
  iconName: string;
  title: string;
  tags: string[];
  problem: string;
  capability: string;
  outcome: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function ServiceCard({
  index,
  iconName,
  title,
  tags,
  problem,
  capability,
  outcome,
  ctaLabel = "Discuss This Service",
  ctaHref = "/contact",
}: ServiceCardProps) {
  const Icon = iconMap[iconName] ?? Server;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
    >
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="grid grid-cols-1 lg:grid-cols-5">

          {/* ── Left identity panel ── */}
          <div className="flex flex-col justify-between border-b border-[var(--border)] p-8 lg:col-span-2 lg:border-b-0 lg:border-r">
            <div>
              {/* Index + icon row */}
              <div className="mb-5 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                  <Icon size={22} className="text-[var(--accent)]" />
                </div>
                <span className="select-none font-mono text-4xl font-bold leading-none text-[var(--border)]">
                  {String(index).padStart(2, "0")}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold leading-snug text-[var(--foreground)] sm:text-2xl">
                {title}
              </h2>

              {/* Technology tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="accent">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* CTA — anchored to bottom of left panel */}
            <div className="mt-8">
              <Button href={ctaHref} size="md">
                {ctaLabel}
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>

          {/* ── Right content panel ── */}
          <div className="grid grid-cols-1 divide-y divide-[var(--border)] sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:col-span-3">

            {/* Problem */}
            <div className="p-7">
              <div className="mb-3 flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0 text-[var(--muted)]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                  Problem
                </p>
              </div>
              <p className="text-sm leading-relaxed text-[var(--foreground)]">
                {problem}
              </p>
            </div>

            {/* Capability */}
            <div className="p-7">
              <div className="mb-3 flex items-center gap-2">
                <Wrench size={14} className="shrink-0 text-[var(--accent)]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                  Capability
                </p>
              </div>
              <p className="text-sm leading-relaxed text-[var(--foreground)]">
                {capability}
              </p>
            </div>

            {/* Outcome */}
            <div className="p-7">
              <div className="mb-3 flex items-center gap-2">
                <TrendingUp size={14} className="shrink-0 text-emerald-500" />
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">
                  Outcome
                </p>
              </div>
              <p className="text-sm leading-relaxed text-[var(--foreground)]">
                {outcome}
              </p>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
