import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCaseStudy, getCaseStudyPaths, extractToc, injectHeadingIds } from "@/lib/mdx";
import { CaseStudySidebar } from "@/components/layout/CaseStudySidebar";
import { ArchitectureDiagram } from "@/components/sections/ArchitectureDiagram";
import { MermaidDiagram } from "@/components/ui/MermaidDiagram";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { caseDiagrams } from "@/config/diagrams";
import { siteConfig } from "@/config/site";

// ── Static Generation ─────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getCaseStudyPaths().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);
  if (!caseStudy) return { title: "Not Found" };

  return {
    title: caseStudy.title,
    description: caseStudy.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/case-studies/${slug}`,
    },
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.excerpt,
      url: `${siteConfig.url}/case-studies/${slug}`,
      type: "article",
      publishedTime: caseStudy.date,
      tags: caseStudy.tags,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
      ],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) notFound();

  // Inject heading IDs for TOC anchor links, then extract TOC
  const contentWithIds = injectHeadingIds(caseStudy.contentHtml);
  const toc = extractToc(contentWithIds);

  return (
    <>
      {/* ── Page header ── */}
      <div className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-[var(--muted)]">
            <a href="/case-studies" className="hover:text-[var(--accent)] transition-colors">
              Case Studies
            </a>
            <span>/</span>
            <span className="text-[var(--foreground)]">{caseStudy.title}</span>
          </nav>

          {/* Meta row */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge variant="accent">{caseStudy.industry}</Badge>
            <span className="text-xs text-[var(--muted)]">
              {caseStudy.date ? formatDate(caseStudy.date) : ""}
            </span>
            <span className="text-xs text-[var(--muted)]">·</span>
            <span className="text-xs text-[var(--muted)]">{caseStudy.client}</span>
          </div>

          {/* Title */}
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
            {caseStudy.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
            {caseStudy.excerpt}
          </p>

          {/* Tag row */}
          <div className="mt-5 flex flex-wrap gap-2">
            {caseStudy.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* ── Results bar ── */}
      {caseStudy.results.length > 0 && (
        <div className="border-b border-[var(--border)] bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 divide-y divide-[var(--border)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {caseStudy.results.map((result) => (
                <div key={result.metric} className="px-6 py-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                    {result.metric}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--accent)]">
                    {result.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Main content + sidebar ── */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">

          {/* ── Article body ── */}
          <article>
            {/* Architecture diagram — Mermaid if available, else simple steps */}
            {caseDiagrams[slug] ? (
              <div className="mb-12">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                  Architecture Overview
                </p>
                <MermaidDiagram chart={caseDiagrams[slug]} />
              </div>
            ) : caseStudy.architecture.length > 0 ? (
              <div className="mb-12">
                <ArchitectureDiagram steps={caseStudy.architecture} />
              </div>
            ) : null}

            {/* Markdown content */}
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />
          </article>

          {/* ── Sticky sidebar ── */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <CaseStudySidebar
              toc={toc}
              meta={{
                date: caseStudy.date,
                client: caseStudy.client,
                industry: caseStudy.industry,
                tags: caseStudy.tags,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
