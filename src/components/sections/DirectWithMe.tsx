"use client";

import { motion } from "framer-motion";
import { CheckCircle, UserCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

const { owner } = siteConfig;

const points = [
  "No middle layers",
  "No junior delegation",
  "Direct technical execution",
];

export function DirectWithMe() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20"
        >
          {/* Left — identity */}
          <div>
            {/* Avatar / name block */}
            <div className="mb-8 flex items-center gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-[var(--accent-fg)]"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent) 0%, #a855f7 100%)",
                  boxShadow: "0 0 20px var(--glow-accent)",
                }}
                aria-hidden="true"
              >
                {owner.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-lg font-bold leading-snug text-[var(--foreground)]">
                  {owner.name}
                </p>
                <p className="text-sm text-[var(--accent)]">{owner.title}</p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  {owner.experience} {owner.experienceLabel}
                </p>
              </div>
            </div>

            <div className="mb-2 flex items-center gap-2">
              <UserCheck size={16} className="shrink-0 text-[var(--accent)]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                Work Directly With Me
              </span>
            </div>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-3xl">
              I&apos;m not an agency.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              When you book a call, you work directly with me — the engineer who
              designs and implements your infrastructure. Every line of Terraform,
              every pipeline, every architecture decision comes from me personally.
            </p>
          </div>

          {/* Right — bullet proof points */}
          <div
            className="rounded-2xl border border-[var(--border)] bg-[var(--background)] px-8 py-8"
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
                opacity: 0.45,
              }}
            />

            <p className="mb-6 text-sm font-semibold text-[var(--foreground)]">
              What this means for you:
            </p>

            <ul className="space-y-4">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-base font-medium text-[var(--foreground)]"
                >
                  <CheckCircle
                    size={18}
                    className="shrink-0 text-[var(--accent)]"
                  />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-[var(--border)] pt-6">
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                You get the same engineer on every call, every PR review, and
                every incident — from initial architecture through to final
                handover.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
