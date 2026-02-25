"use client";

import { motion, type Variants } from "framer-motion";
import { Zap, Layers, MessageSquare, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: Layers,
    title: "End-to-End Ownership",
    description:
      "We don't hand off half-built systems. From architecture decisions to production runbooks, we own the full scope until you’re confident.",
  },
  {
    icon: Zap,
    title: "Speed Without Compromise",
    description:
      "Rapid delivery cycles using battle-tested patterns. We bootstrap production-grade infrastructure in days, not months.",
  },
  {
    icon: ShieldCheck,
    title: "Security by Default",
    description:
      "Security isn’t a checkbox. Every system we build includes secrets management, least-privilege IAM, and automated compliance gates.",
  },
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    description:
      "No black boxes. You get weekly status updates, living runbooks, and clear escalation paths. You always know what’s happening.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function WhyUs() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <SectionHeading
              eyebrow="Why Work With Me"
              heading="What makes this different"
              description="Most infrastructure consultants deliver code and leave. I deliver systems that your team can own, operate, and scale with confidence."
              align="left"
            />
          </motion.div>

          {/* Right — reason list */}
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <motion.li
                  key={reason.title}
                  variants={itemVariants}
                  className="flex gap-4"
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)]">
                    <Icon size={18} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-[var(--foreground)]">
                      {reason.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--muted)]">
                      {reason.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
