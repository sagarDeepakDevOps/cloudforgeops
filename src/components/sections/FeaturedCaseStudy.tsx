"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CaseStudyMeta } from "@/types";

interface FeaturedCaseStudyProps {
  caseStudy: CaseStudyMeta;
}

export function FeaturedCaseStudy({ caseStudy }: FeaturedCaseStudyProps) {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Case Study"
            heading="Real work. Measurable outcomes."
            description="A look at how we deliver production infrastructure that actually ships."
            align="left"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-14 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Left accent panel */}
            <div className="flex flex-col justify-center border-b border-[var(--border)] bg-[var(--accent)]/5 p-8 lg:col-span-2 lg:border-b-0 lg:border-r">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {caseStudy.industry}
              </p>
              <h3 className="mb-4 text-xl font-bold leading-snug text-[var(--foreground)] sm:text-2xl">
                {caseStudy.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-[var(--muted)]">
                {caseStudy.excerpt}
              </p>
              <div className="flex flex-wrap gap-2">
                {caseStudy.tags.slice(0, 6).map((tag) => (
                  <Badge key={tag} variant="accent">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Right — results + CTA */}
            <div className="flex flex-col justify-between p-8 lg:col-span-3">
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                  Outcomes
                </p>
                <ul className="space-y-4">
                  {caseStudy.results.map((result) => (
                    <li
                      key={result.metric}
                      className="flex items-center gap-4 border-b border-[var(--border)] pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--accent)]/10">
                        <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">
                          {result.outcome}
                        </p>
                        <p className="text-xs text-[var(--muted)]">{result.metric}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Button href={`/case-studies/${caseStudy.slug}`}>
                  Read Full Case Study
                  <ArrowRight size={15} />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 text-center">
          <Button href="/case-studies" variant="ghost">
            View all case studies →
          </Button>
        </div>
      </div>
    </section>
  );
}
