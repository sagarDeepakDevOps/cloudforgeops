"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GradientMesh } from "@/components/ui/GradientMesh";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function CtaBanner() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl px-8 py-16 text-center sm:px-16"
          style={{
            background:
              "linear-gradient(var(--surface), var(--surface)) padding-box, " +
              "linear-gradient(135deg, rgba(129,140,248,0.3), transparent 40%, rgba(129,140,248,0.2)) border-box",
            border: "1px solid transparent",
          }}
        >
          {/* Mesh blobs — contained to this card */}
          <GradientMesh />

          {/* Top accent hairline */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)",
              opacity: 0.5,
            }}
          />

          {/* Inner glass layer */}
          <div className="glass pointer-events-none absolute inset-[1px] rounded-[calc(1rem-1px)]" />

          {/* Content */}
          <div className="relative z-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
              Let&apos;s Build Together
            </p>

            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Ready to modernize your infrastructure?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)]">
              Whether you&apos;re starting from scratch or untangling years of
              technical debt — I scope, plan, and implement. Let&apos;s talk
              about your stack.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticButton>
                <Button href="/contact" size="lg">
                  Start a Conversation
                  <ArrowRight size={16} />
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button href="/case-studies" variant="outline" size="lg">
                  Review Our Work
                </Button>
              </MagneticButton>
            </div>

            <p className="mt-6 text-xs text-[var(--muted)]">
              No commitment required. Free 30-min discovery call.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
