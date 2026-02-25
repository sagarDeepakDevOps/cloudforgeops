"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { siteConfig } from "@/config/site";

const { freeReview } = siteConfig;

/**
 * High-conversion banner placed above the footer on the homepage.
 * All content is driven by siteConfig.freeReview so nothing is hard-coded.
 */
export function FreeReviewCta() {
  return (
    <section aria-labelledby="free-review-heading" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-[var(--accent)]/20 bg-[var(--surface)] px-8 py-14 sm:px-14"
          style={{
            background:
              "linear-gradient(var(--surface), var(--surface)) padding-box, " +
              "linear-gradient(135deg, rgba(129,140,248,0.35), transparent 45%, rgba(168,85,247,0.25)) border-box",
            border: "1px solid transparent",
          }}
        >
          {/* Top accent hairline */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)",
              opacity: 0.6,
            }}
          />

          {/* Subtle radial glow behind content */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, var(--glow-accent) 0%, transparent 70%)",
              opacity: 0.35,
            }}
          />

          <div className="relative z-10 flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Left — copy */}
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/8 px-3 py-1 glass">
                <CalendarCheck size={13} className="text-[var(--accent)]" />
                <span className="text-xs font-semibold tracking-wide text-[var(--accent)]">
                  Free · {freeReview.duration} · No commitment
                </span>
              </div>

              <h2
                id="free-review-heading"
                className="text-2xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-3xl"
              >
                {freeReview.headline}
              </h2>

              <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
                {freeReview.subtext}
              </p>

              {/* Bullets */}
              <ul className="mt-6 space-y-2.5">
                {freeReview.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--muted)]">
                    <CheckCircle
                      size={15}
                      className="mt-0.5 shrink-0 text-[var(--accent)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-xs font-medium text-[var(--muted)]">
                {freeReview.closingNote}
              </p>
            </div>

            {/* Right — CTA */}
            <div className="flex shrink-0 flex-col items-start gap-3 sm:items-center lg:items-start">
              <MagneticButton>
                <Button href={freeReview.href} size="lg">
                  Book Your Free Review
                  <ArrowRight size={16} />
                </Button>
              </MagneticButton>

              <p className="max-w-[220px] text-center text-xs leading-snug text-[var(--muted)] lg:text-left">
                {freeReview.trustNote}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
