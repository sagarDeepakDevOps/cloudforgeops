import type { Metadata } from "next";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const pageTitle = `DevOps & Cloud Engineering Services | ${siteConfig.name}`;
const pageDesc =
  "End-to-end DevOps and cloud engineering services — infrastructure design, Kubernetes, CI/CD pipelines, IaC, observability, and cloud migration.";

export const metadata: Metadata = {
  title: "Services",
  description: pageDesc,
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDesc,
    url: `${siteConfig.url}/services`,
    type: "website",
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Services`,
      },
    ],
  },
};

const services = [
  {
    iconName: "Server",
    title: "Cloud Infrastructure Engineering",
    tags: ["AWS", "GCP", "Azure", "VPC", "IAM", "EKS", "Networking"],
    problem:
      "Growing teams hit walls when their cloud environment is stitched together manually — no consistency, rising costs, and fragile configurations that only one person understands.",
    capability:
      "We architect and build production-grade cloud environments from scratch — VPCs, subnets, IAM policies, compute, storage, and networking — designed around your workload, not a template.",
    outcome:
      "A secure, documented, cost-optimized infrastructure your entire team can operate — with no single point of failure and clear runbooks from day one.",
  },
  {
    iconName: "Code2",
    title: "Infrastructure as Code",
    tags: ["Terraform", "Ansible", "Modules", "State Management", "Drift Detection"],
    problem:
      "Clicking through cloud consoles creates invisible infrastructure. Config drift, missed changes, and zero audit trail make scaling and debugging a nightmare.",
    capability:
      "We convert your infrastructure into version-controlled Terraform modules with remote state, locking, and CI-enforced plan reviews. Ansible handles configuration management and server provisioning at scale.",
    outcome:
      "Reproducible environments that spin up identically every time. Every change reviewed, tracked, and reversible. Onboarding new environments takes hours, not weeks.",
  },
  {
    iconName: "Box",
    title: "Kubernetes & GitOps",
    tags: ["EKS", "AKS", "GKE", "ArgoCD", "Helm", "Kustomize", "Service Mesh"],
    problem:
      "Running Kubernetes without structure leads to inconsistent deployments, manual kubectl hotfixes, and clusters that no one dares touch in production.",
    capability:
      "We deploy and operate Kubernetes clusters on EKS, AKS, and GKE with GitOps workflows via ArgoCD — all app configuration lives in Git, every change is auditable, and rollbacks are a single commit.",
    outcome:
      "Zero-drift clusters where every deployment is automated, auditable, and reversible. Your team merges a PR — the cluster does the rest.",
  },
  {
    iconName: "GitBranch",
    title: "CI/CD Automation",
    tags: ["Jenkins", "GitHub Actions", "ArgoCD", "Docker", "Blue/Green", "Rollback"],
    problem:
      "Manual deployments are slow, risky, and inconsistent. Teams spending hours on releases instead of features is a structural problem, not a people problem.",
    capability:
      "We design and implement automated delivery pipelines — build, test, security scan, containerize, and deploy — using GitHub Actions or Jenkins, with ArgoCD managing the Kubernetes side. Blue/green and canary strategies included.",
    outcome:
      "Deployment frequency increases. Lead time drops to minutes. Rollbacks are automated and tested. Releases go from fear-inducing events to non-events.",
  },
  {
    iconName: "BarChart2",
    title: "Monitoring & Observability",
    tags: ["Prometheus", "Grafana", "ELK Stack", "Loki", "Tempo", "Alertmanager"],
    problem:
      "Flying blind in production is the root cause of most P0 incidents. By the time you know something is wrong, customers already do.",
    capability:
      "We implement full-stack observability: metrics via Prometheus and Grafana, logs via ELK or Loki, and distributed tracing with Tempo. Alert routing through Alertmanager with escalation policies tied to your on-call process.",
    outcome:
      "Real-time visibility into every layer of the stack. Alerts that fire on symptoms, not just crashes. Mean time to detection drops from hours to seconds.",
  },
  {
    iconName: "Cloud",
    title: "Cloud Migration & Modernization",
    tags: ["Lift & Shift", "Re-architecture", "Containerization", "Cost Optimization"],
    problem:
      "Legacy on-premise systems block developer velocity, create compliance risk, and scale poorly. But migrations done wrong can take years and break everything.",
    capability:
      "We run structured migration engagements — assessment, phased execution, validation — covering lift-and-shift, re-platforming to containers, and full re-architecture where warranted. We minimize blast radius at every phase.",
    outcome:
      "Applications running in cloud-native environments with reduced operational overhead, lower TCO, and the ability to scale on demand — without a multi-year big-bang rewrite.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Deliver"
            heading="Engineering Services"
            description="We cover the full DevOps and cloud lifecycle — from initial architecture through to day-two operations. Every engagement starts with your business problem, not a service catalogue."
            align="center"
          />

          {/* Quick-nav pills */}
          <nav className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {services.map((service, i) => (
              <a
                key={service.title}
                href={`#service-${i + 1}`}
                className="rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-1.5 text-xs font-medium text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {service.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          {services.map((service, i) => (
            <div key={service.title} id={`service-${i + 1}`} className="scroll-mt-24">
              <ServiceCard
                index={i + 1}
                iconName={service.iconName}
                title={service.title}
                tags={service.tags}
                problem={service.problem}
                capability={service.capability}
                outcome={service.outcome}
                ctaLabel="Discuss This Service"
                ctaHref="/contact"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            Not sure where to start?
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Let&apos;s scope it together
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)]">
            Every engagement begins with a free 30-minute discovery call. We
            audit your current stack, identify the highest-leverage changes, and
            give you a clear path forward — no obligation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Book a Discovery Call
            </Button>
            <Button href="/case-studies" variant="outline" size="lg">
              See Our Work
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
