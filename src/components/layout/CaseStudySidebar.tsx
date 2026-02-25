"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Building2, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import type { TocEntry, CaseStudyFrontmatter } from "@/types/case-study";

interface CaseStudySidebarProps {
  toc: TocEntry[];
  meta: Pick<CaseStudyFrontmatter, "date" | "client" | "industry" | "tags">;
}

export function CaseStudySidebar({ toc, meta }: CaseStudySidebarProps) {
  const [activeId, setActiveId] = useState<string>("");

  // Scroll-linked active section via IntersectionObserver
  useEffect(() => {
    if (!toc.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  return (
    <aside className="space-y-6">
      {/* ── Metadata card ── */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
          Project Details
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <Calendar size={14} className="mt-0.5 shrink-0 text-[var(--muted)]" />
            <div>
              <p className="text-xs text-[var(--muted)]">Date</p>
              <p className="text-sm font-medium text-[var(--foreground)]">
                {meta.date ? formatDate(meta.date) : "—"}
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Building2 size={14} className="mt-0.5 shrink-0 text-[var(--muted)]" />
            <div>
              <p className="text-xs text-[var(--muted)]">Client</p>
              <p className="text-sm font-medium text-[var(--foreground)]">
                {meta.client}
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Tag size={14} className="mt-0.5 shrink-0 text-[var(--muted)]" />
            <div>
              <p className="mb-1.5 text-xs text-[var(--muted)]">Technologies</p>
              <div className="flex flex-wrap gap-1.5">
                {meta.tags.map((tag) => (
                  <Badge key={tag} variant="default" className="text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* ── Table of Contents ── */}
      {toc.length > 0 && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            On This Page
          </p>
          <nav>
            <ul className="space-y-1">
              {toc.map(({ id, label, level }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={cn(
                      "block rounded px-2 py-1.5 text-sm transition-colors duration-150",
                      level === 3 && "pl-4",
                      activeId === id
                        ? "bg-[var(--accent)]/10 font-medium text-[var(--accent)]"
                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* ── CTA card ── */}
      <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-5">
        <p className="mb-2 text-sm font-semibold text-[var(--foreground)]">
          Similar project in mind?
        </p>
        <p className="mb-4 text-xs leading-relaxed text-[var(--muted)]">
          We scope, plan, and execute cloud infrastructure and DevOps engagements for growing tech teams.
        </p>
        <Button href="/contact" size="sm" className="w-full justify-center">
          Start a Conversation
          <ArrowRight size={13} />
        </Button>
        <Link
          href="/case-studies"
          className="mt-3 flex items-center justify-center gap-1 text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          ← All case studies
        </Link>
      </div>
    </aside>
  );
}
