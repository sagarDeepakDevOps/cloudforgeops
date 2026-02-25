import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft, Calendar } from "lucide-react";
import { getBlogPost, getBlogPaths } from "@/lib/blog";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site";

// ── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getBlogPaths().map((slug) => ({ slug }));
}

// ── Page ────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  return (
    <>
      {/* ── Page header ── */}
      <div className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-[var(--muted)]">
            <Link href="/blog" className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors">
              <ArrowLeft size={11} />
              Blog
            </Link>
            <span>/</span>
            <span className="text-[var(--foreground)] line-clamp-1">{post.title}</span>
          </nav>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="accent">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
              <span className="font-semibold text-[var(--foreground)]">{siteConfig.owner.name}</span>
              <span>·</span>
              <span>{siteConfig.owner.title}</span>
            </span>
            {post.date && (
              <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                <Calendar size={11} />
                {formatDate(post.date)}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
              <Clock size={11} />
              {post.readTime} min read
            </span>
          </div>
        </div>
      </div>

      {/* ── Article body ── */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <article
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* ── Footer / back link ── */}
        <div className="mt-16 border-t border-[var(--border)] pt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            <ArrowLeft size={14} />
            Back to all posts
          </Link>
        </div>
      </div>
    </>
  );
}
