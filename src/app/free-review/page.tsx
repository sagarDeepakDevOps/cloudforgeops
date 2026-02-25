"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CalendarCheck, CheckCircle, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { GradientMesh } from "@/components/ui/GradientMesh";
import { siteConfig } from "@/config/site";

const { freeReview, contact } = siteConfig;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  };
}

export default function FreeReviewPage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero header ────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <GradientMesh />

        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Fade edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, transparent 18%, transparent 82%, var(--background) 100%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div {...fadeUp(0)} className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              <ArrowLeft size={14} />
              Back to home
            </Link>
          </motion.div>

          {/* Eyebrow pill */}
          <motion.div
            {...fadeUp(0.05)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/8 px-4 py-1.5 glass"
          >
            <CalendarCheck size={13} className="text-[var(--accent)]" />
            <span className="text-xs font-semibold tracking-wide text-[var(--accent)]">
              Free · {freeReview.duration} · No commitment
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl"
          >
            {freeReview.headline}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            {...fadeUp(0.18)}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]"
          >
            {freeReview.subtext}
          </motion.p>
        </div>
      </section>

      {/* ── Two-column layout ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16 lg:items-start">

          {/* Left — what you get + trust */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* What You'll Get */}
            <div
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-8 py-8"
              style={{
                background:
                  "linear-gradient(var(--surface), var(--surface)) padding-box, " +
                  "linear-gradient(135deg, rgba(129,140,248,0.25), transparent 50%) border-box",
                border: "1px solid transparent",
              }}
            >
              {/* Top accent hairline */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)",
                  opacity: 0.5,
                }}
              />

              <div className="glass pointer-events-none absolute inset-[1px] rounded-[calc(1rem-1px)]" />

              <div className="relative z-10">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  What You&apos;ll Get
                </h2>

                <ul className="mt-5 space-y-3.5">
                  {freeReview.bullets.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-snug text-[var(--muted)]"
                    >
                      <CheckCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-[var(--accent)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 rounded-lg bg-[var(--accent)]/8 px-4 py-3 text-sm font-medium text-[var(--accent)]">
                  {freeReview.closingNote}
                </p>
              </div>
            </div>

            {/* Trust block */}
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    Genuinely free — no sales pitch
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                    This is a real {freeReview.duration} technical conversation. You leave with
                    actionable insights regardless of whether we work together.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
                <Mail size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    Prefer email?
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-1 block text-xs text-[var(--accent)] underline-offset-2 hover:underline"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              <p className="text-xs text-[var(--muted)]">{freeReview.trustNote}</p>
            </div>
          </motion.div>

          {/* Right — Calendly embed */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
          >
            <p className="mb-4 text-sm font-semibold text-[var(--foreground)]">
              Pick a time that works for you
            </p>
            <CalendlyEmbed height={680} />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
