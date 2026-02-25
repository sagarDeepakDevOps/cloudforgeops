"use client";

import { motion, type Variants } from "framer-motion";
import {
  Server,
  GitBranch,
  Box,
  Code2,
  BarChart2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { RevealWrapper } from "@/components/ui/RevealWrapper";

const services: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Server,
    title: "Cloud Infrastructure",
    description:
      "Architecting and managing multi-cloud environments on AWS, GCP, and Azure. VPCs, IAM, compute, and storage — designed for scale.",
  },
  {
    icon: Box,
    title: "Kubernetes & Containers",
    description:
      "End-to-end Kubernetes operations: EKS, GKE, self-managed clusters, Helm, service mesh, and workload autoscaling.",
  },
  {
    icon: GitBranch,
    title: "CI/CD Pipelines",
    description:
      "Automated delivery with GitHub Actions, Jenkins, and ArgoCD. Build once, deploy anywhere with rollback and blue/green support.",
  },
  {
    icon: Code2,
    title: "Infrastructure as Code",
    description:
      "Terraform and Ansible for reproducible, version-controlled infrastructure. Modules, state management, and drift detection baked in.",
  },
  {
    icon: BarChart2,
    title: "Monitoring & Observability",
    description:
      "Prometheus, Grafana, and alerting pipelines that give your team full visibility into system health before issues impact users.",
  },
  {
    icon: ShieldCheck,
    title: "Security Engineering",
    description:
      "Hardened networking, secrets management, compliance guardrails, and security scanning integrated directly into your pipelines.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Services() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealWrapper>
          <SectionHeading
            eyebrow="What I Do"
            heading="Engineering Services"
            description="From initial architecture to ongoing operations, I cover the full DevOps lifecycle. No partial handoffs — I own the outcome."
          />
        </RevealWrapper>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group relative rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]/40 hover:shadow-[0_8px_36px_var(--glow-card)]"
              >
                {/* Top accent line — slides in on hover */}
                <div
                  className="absolute inset-x-0 top-0 h-px rounded-t-xl bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                {/* Icon */}
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10 transition-all duration-300 group-hover:bg-[var(--accent)]/18 group-hover:shadow-[0_0_14px_var(--glow-accent)]"
                >
                  <Icon
                    size={20}
                    className="text-[var(--accent)] transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <h3 className="mb-2 font-semibold tracking-tight text-[var(--foreground)]">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <RevealWrapper delay={0.15} className="mt-10 text-center">
          <Button href="/services" variant="outline">
            See Full Service Breakdown
          </Button>
        </RevealWrapper>
      </div>
    </section>
  );
}
