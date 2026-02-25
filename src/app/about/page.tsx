"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Container,
  GitBranch,
  FileCode2,
  Settings2,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Layers,
  Search,
  Pencil,
  Hammer,
  Users,
  BookOpen,
  UserCheck,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

const { owner, freeReview, contact } = siteConfig;

// ─── animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

// ─── data ─────────────────────────────────────────────────────────────────────
const stats = [
  { value: "3+", label: "Years hands-on cloud & automation" },
  { value: "50+", label: "Production deployments" },
  { value: "2", label: "Cloud platforms (AWS & Azure)" },
  { value: "12+", label: "Clients worked with directly" },
];

const specializations = [
  {
    icon: Cloud,
    title: "AWS & Azure",
    summary:
      "Production workloads across EC2, EKS, RDS, Lambda, IAM on AWS; AKS, DevOps Pipelines, Azure Firewall on Azure. Both platforms in hybrid setups.",
    tags: ["EKS", "AKS", "IAM", "VPC", "ExpressRoute"],
  },
  {
    icon: Container,
    title: "Kubernetes",
    summary:
      "Multi-cluster deployments, GitOps with ArgoCD and Flux, custom operators, RBAC design, and cluster upgrades without downtime.",
    tags: ["ArgoCD", "Flux", "Helm", "Karpenter", "OPA"],
  },
  {
    icon: GitBranch,
    title: "CI/CD",
    summary:
      "Pipeline architecture for GitHub Actions, GitLab CI, and Jenkins. Build caching, artifact promotion, and environment gating across stages.",
    tags: ["GitHub Actions", "GitLab CI", "Jenkins", "Tekton"],
  },
  {
    icon: FileCode2,
    title: "Terraform",
    summary:
      "Modular IaC at scale — remote state, workspace strategies, Atlantis for PR-driven applies, and provider version governance.",
    tags: ["Modules", "Atlantis", "Terragrunt", "Vault"],
  },
  {
    icon: Settings2,
    title: "Ansible",
    summary:
      "Configuration management for cloud VMs and on-prem fleets. Idempotent playbooks, role-based structure, AWX/Tower for scheduling.",
    tags: ["Playbooks", "Roles", "AWX", "Molecule"],
  },
  {
    icon: BarChart3,
    title: "Monitoring Stack",
    summary:
      "Full observability with Prometheus, Grafana, Loki, and OpenTelemetry. Alert routing through Alertmanager, dashboards aligned to SLOs.",
    tags: ["Prometheus", "Grafana", "Loki", "OpenTelemetry"],
  },
];

const principles = [
  {
    icon: FileCode2,
    title: "Infrastructure as Code first",
    body: "Every resource — network, compute, policy, secret rotation — is defined in version-controlled code. Clicking through consoles is not a deployment strategy.",
  },
  {
    icon: BarChart3,
    title: "Observability built in",
    body: "Metrics, logs, and traces are part of the architecture, not an afterthought. Systems that cannot be observed cannot be reliably operated.",
  },
  {
    icon: CheckCircle2,
    title: "Security by default",
    body: "Least-privilege IAM, network segmentation, secrets management, and automated compliance checks are baseline requirements, not add-ons.",
  },
  {
    icon: BookOpen,
    title: "Documentation that ships",
    body: "Runbooks, architecture decision records, and onboarding guides ship alongside code. Future operators should not need to reverse-engineer the system.",
  },
];

const phases = [
  {
    icon: Search,
    phase: "01",
    title: "Discovery",
    duration: "1 – 2 weeks",
    description:
      "Audit of existing infrastructure, tooling, and deployment workflows. Identification of failure points, bottlenecks, and compliance gaps. No assumptions — everything is verified.",
  },
  {
    icon: Pencil,
    phase: "02",
    title: "Architecture & Design",
    duration: "1 – 3 weeks",
    description:
      "Proposed target-state architecture with alternatives documented. ADRs written for key decisions. Scope, timeline, and risks agreed before any implementation begins.",
  },
  {
    icon: Hammer,
    phase: "03",
    title: "Implementation",
    duration: "Scoped per project",
    description:
      "Iterative delivery in two-week cycles. Infrastructure changes applied through reviewed pull requests. Rollback paths defined and tested alongside forward deployments.",
  },
  {
    icon: Users,
    phase: "04",
    title: "Handover & Enablement",
    duration: "1 – 2 weeks",
    description:
      "Structured knowledge transfer to your team. Runbooks, dashboards, and alerting tuned to your on-call rotation. Engagement ends when your team can own it confidently.",
  },
];

const workingModel = [
  {
    icon: Layers,
    title: "Embedded or advisory",
    body: "Work directly inside your engineering team (embedded) or as a technical advisor reviewing architecture and unblocking decisions. Both models available.",
  },
  {
    icon: GitBranch,
    title: "Async-first",
    body: "Communication through written proposals, documented decisions, and async reviews. Meetings are scheduled for decisions, not status updates.",
  },
  {
    icon: CheckCircle2,
    title: "Fixed scope or retainer",
    body: "Project-based engagements with a defined deliverable list, or a monthly retainer for ongoing infrastructure work and incident support.",
  },
];

const directPoints = [
  "No middle layers — you speak directly with the person doing the work",
  "No junior delegation — every implementation is done by me personally",
  "Consistent context — I carry full project knowledge from day one to handover",
];

// ─── page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pt-32">
        <motion.p
          {...fadeUp(0)}
          className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]"
        >
          About
        </motion.p>

        {/* Name + title block */}
        <motion.div {...fadeUp(0.04)} className="mb-8 flex items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-[var(--accent-fg)]"
            style={{
              background:
                "linear-gradient(135deg, var(--accent) 0%, #a855f7 100%)",
              boxShadow: "0 0 22px var(--glow-accent)",
            }}
            aria-hidden="true"
          >
            {owner.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="text-xl font-bold leading-snug text-[var(--foreground)]">
              {owner.name}
            </p>
            <p className="text-sm text-[var(--accent)]">{owner.title}</p>
            <p className="mt-0.5 text-xs text-[var(--muted)]">
              {owner.experience} {owner.experienceLabel}
            </p>
          </div>
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="max-w-3xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl"
        >
          Building infrastructure that{" "}
          <span className="text-[var(--accent)]">scales reliably</span>. Not
          just on day one.
        </motion.h1>
        <motion.p
          {...fadeUp(0.18)}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]"
        >
          I&apos;m {owner.name} — a {owner.title.toLowerCase()} focused on
          cloud-native infrastructure, CI/CD automation, and Kubernetes
          operations. I work hands-on with founders and engineering teams to
          design, build, and stabilize infrastructure that supports fast
          delivery without accumulating operational debt.
        </motion.p>

        <motion.div {...fadeUp(0.24)} className="mt-8 flex flex-wrap gap-3">
          <Button href={freeReview.href} size="lg">
            <CalendarCheck size={16} />
            Book a Free {freeReview.duration} Review
          </Button>
          <Button href="/case-studies" variant="outline" size="lg">
            See case studies
          </Button>
        </motion.div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────────────── */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-[var(--border)] px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              {...fadeUp(i * 0.07)}
              className="px-6 py-8 text-center"
            >
              <p className="text-3xl font-bold tracking-tight text-[var(--accent)]">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Work Directly With Me ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div {...fadeUp(0)} className="flex items-center gap-2 mb-3">
          <UserCheck size={16} className="text-[var(--accent)]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            Work directly with me
          </span>
        </motion.div>

        <motion.h2
          {...fadeUp(0.06)}
          className="max-w-2xl text-2xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-3xl"
        >
          I&apos;m not an agency. When you book a call, you&apos;re talking to
          the engineer who does the work.
        </motion.h2>

        <motion.p
          {...fadeUp(0.12)}
          className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)]"
        >
          There&apos;s no account manager, no handoff to a junior, and no
          communication overhead. Every architecture decision, every Terraform
          module, every production incident — I&apos;m the person on it.
        </motion.p>

        <motion.ul {...fadeUp(0.18)} className="mt-8 space-y-3">
          {directPoints.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-sm text-[var(--muted)]"
            >
              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0 text-[var(--accent)]"
              />
              {point}
            </li>
          ))}
        </motion.ul>
      </section>

      {/* ── Specializations ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div {...fadeUp(0)}>
          <SectionHeading
            eyebrow="Technical strengths"
            heading="What I work with"
            description="Hands-on experience across the core tools of modern cloud infrastructure — not surface-level familiarity."
            align="left"
          />
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specializations.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={spec.title}
                {...fadeUp(i * 0.07)}
                className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-200 hover:border-[var(--accent)]/50"
              >
                <div className="mb-4 inline-flex rounded-lg bg-[var(--accent)]/10 p-2.5">
                  <Icon
                    className="h-5 w-5 text-[var(--accent)]"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="mb-2 text-base font-semibold text-[var(--foreground)]">
                  {spec.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
                  {spec.summary}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {spec.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-[var(--accent)]/10 px-2 py-0.5 text-xs font-medium text-[var(--accent)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Working principles ─────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div {...fadeUp(0)}>
            <SectionHeading
              eyebrow="My approach"
              heading="How I think about infrastructure"
              description="Four principles that guide every engagement, regardless of stack or scale."
              align="left"
            />
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  {...fadeUp(i * 0.08)}
                  className="flex gap-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6"
                >
                  <div className="mt-0.5 shrink-0">
                    <div className="inline-flex rounded-lg bg-[var(--accent)]/10 p-2.5">
                      <Icon
                        className="h-5 w-5 text-[var(--accent)]"
                        strokeWidth={1.75}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-[var(--foreground)]">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--muted)]">
                      {p.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Working model ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div {...fadeUp(0)}>
          <SectionHeading
            eyebrow="Working model"
            heading="How an engagement works"
            description="All projects follow the same four-phase structure. Scope and duration vary; the process does not."
            align="left"
          />
        </motion.div>

        {/* Engagement phases */}
        <div className="mt-12 space-y-4">
          {phases.map((phase, i) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={phase.phase}
                {...fadeUp(i * 0.07)}
                className="flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:flex-row sm:items-start sm:gap-6"
              >
                <div className="flex shrink-0 items-center gap-4 sm:w-48 sm:flex-col sm:items-start sm:gap-2">
                  <div className="inline-flex rounded-lg bg-[var(--accent)]/10 p-2.5">
                    <Icon
                      className="h-5 w-5 text-[var(--accent)]"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                      Phase {phase.phase}
                    </p>
                    <p className="text-base font-semibold text-[var(--foreground)]">
                      {phase.title}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--muted)]">
                      {phase.duration}
                    </p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                  <p className="text-sm leading-relaxed text-[var(--muted)]">
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Engagement type cards */}
        <motion.div {...fadeUp(0.1)} className="mt-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
            Engagement types
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {workingModel.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  {...fadeUp(i * 0.07)}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
                >
                  <div className="mb-3 inline-flex rounded-lg bg-[var(--accent)]/10 p-2">
                    <Icon
                      className="h-4 w-4 text-[var(--accent)]"
                      strokeWidth={1.75}
                    />
                  </div>
                  <h4 className="mb-1.5 text-sm font-semibold text-[var(--foreground)]">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">
                    {item.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)]">
        <motion.div
          {...fadeUp(0)}
          className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            Get started
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Let&apos;s talk about your infrastructure.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
            If you have a specific problem — a slow release pipeline, an
            unreliable cluster, infrastructure that no one fully understands —
            book a free {freeReview.duration} call and I&apos;ll give you direct, technical
            feedback. No sales pitch.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={freeReview.href} size="lg">
              <CalendarCheck size={16} />
              Book Free {freeReview.duration} Review
            </Button>
            <Button href={`mailto:${contact.email}`} variant="outline" size="lg" external>
              Email me directly <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
