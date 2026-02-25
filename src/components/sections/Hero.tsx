"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GradientMesh } from "@/components/ui/GradientMesh";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { siteConfig } from "@/config/site";

const { freeReview, owner } = siteConfig;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  };
}

const stats = [
  { value: "50+", label: "Production Deployments" },
  { value: "99.9%", label: "Uptime Delivered" },
  { value: "12+", label: "Clients Served" },
  { value: "<24h", label: "Avg. Incident Response" },
];

const proofPoints = [
  "AWS, GCP & Azure certified",
  "Kubernetes & GitOps workflows",
  "Terraform-first infrastructure",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      {/* Animated gradient mesh — pure CSS, GPU-composited */}
      <GradientMesh />

      {/* Dot grid — sits above mesh blobs */}
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

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">

        {/* Eyebrow pill — glass treatment */}
        <motion.div
          {...fadeUp(0)}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/8 px-4 py-1.5 glass"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
          <span className="text-xs font-semibold tracking-wide text-[var(--accent)]">
            Freelance DevOps &amp; Cloud Engineer
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.08)}
          className="text-4xl font-extrabold leading-[1.12] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3.75rem]"
        >
          Helping Startups Build{" "}
          <span
            className="relative"
            style={{
              background:
                "linear-gradient(135deg, var(--accent) 0%, #a855f7 60%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Reliable, Scalable Infrastructure
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.16)}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[var(--muted)]"
        >
          {owner.bio}
        </motion.p>

        {/* Proof points */}
        <motion.ul
          {...fadeUp(0.24)}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {proofPoints.map((point) => (
            <li
              key={point}
              className="flex items-center gap-1.5 text-sm text-[var(--muted)]"
            >
              <CheckCircle size={14} className="shrink-0 text-[var(--accent)]" />
              {point}
            </li>
          ))}
        </motion.ul>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <MagneticButton>
            <Button href="/case-studies" size="lg">
              View Case Studies
              <ArrowRight size={16} />
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button href="/services" variant="outline" size="lg">
              Explore Services
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Free review text CTA */}
        <motion.div
          {...fadeUp(0.38)}
          className="mt-5 flex items-center justify-center"
        >
          <a
            href={freeReview.href}
            className="group inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors duration-200 hover:text-[var(--accent)]"
          >
            <span className="h-1 w-1 rounded-full bg-[var(--accent)] opacity-60 transition-opacity group-hover:opacity-100" />
            Get a free {freeReview.duration} infrastructure review
            <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        {/* Stats bar — glass treatment */}
        <motion.div
          {...fadeUp(0.4)}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] shadow-[0_0_40px_var(--glow-card)] sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass bg-[var(--surface)]/80 px-6 py-6 text-center"
            >
              <p className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
