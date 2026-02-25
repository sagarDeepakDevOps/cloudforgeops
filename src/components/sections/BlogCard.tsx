import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { BlogMeta } from "@/types/blog";

interface BlogCardProps {
  post: BlogMeta;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:border-[var(--accent)]/60 hover:shadow-md"
    >
      {/* Accent strip */}
      <div className="h-1 w-full bg-[var(--accent)]/20 transition-colors duration-300 group-hover:bg-[var(--accent)]" />

      <div className="flex flex-1 flex-col p-7">
        {/* Date + read time */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {post.date && (
            <span className="text-xs text-[var(--muted)]">{formatDate(post.date)}</span>
          )}
          <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
            <Clock size={11} />
            {post.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h2 className="mb-3 text-lg font-bold leading-snug tracking-tight text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--accent)]">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="mb-5 flex-1 text-sm leading-relaxed text-[var(--muted)] line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center gap-1 text-xs font-semibold text-[var(--accent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Read article
          <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
