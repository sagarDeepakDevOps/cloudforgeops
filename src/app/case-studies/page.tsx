import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllCaseStudies } from "@/lib/mdx";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const pageTitle = `Case Studies | ${siteConfig.name}`;
const pageDesc =
  "Real infrastructure and DevOps projects — cloud migrations, Kubernetes deployments, CI/CD automation, and observability stacks built for production.";

export const metadata: Metadata = {
  title: "Case Studies",
  description: pageDesc,
  alternates: {
    canonical: `${siteConfig.url}/case-studies`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDesc,
    url: `${siteConfig.url}/case-studies`,
    type: "website",
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Case Studies`,
      },
    ],
  },
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <>
      {/* ── Page header ── */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Work"
            heading="Case Studies"
            description="Production infrastructure and DevOps engagements. Real problems, real solutions, real outcomes — with the technical depth to back it up."
            align="center"
          />
        </div>
      </section>

      {/* ── Card grid ── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {caseStudies.length === 0 ? (
            <p className="text-center text-[var(--muted)]">No case studies found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {caseStudies.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:border-[var(--accent)]/60 hover:shadow-md"
                >
                  {/* Card header accent strip */}
                  <div className="h-1 w-full bg-[var(--accent)]/20 group-hover:bg-[var(--accent)] transition-colors duration-300" />

                  <div className="flex flex-1 flex-col p-7">
                    {/* Industry + date */}
                    <div className="mb-4 flex items-center gap-2">
                      <Badge variant="accent">{cs.industry}</Badge>
                      {cs.date && (
                        <span className="text-xs text-[var(--muted)]">
                          {formatDate(cs.date)}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="mb-3 text-lg font-bold leading-snug text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-150">
                      {cs.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                      {cs.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {cs.tags.slice(0, 5).map((tag) => (
                        <Badge key={tag} variant="default" className="text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                      {cs.tags.length > 5 && (
                        <Badge variant="default" className="text-[10px]">
                          +{cs.tags.length - 5}
                        </Badge>
                      )}
                    </div>

                    {/* Read link */}
                    <div className="mt-auto flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
                      Read Case Study
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-150 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
