import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type { BlogPost, BlogMeta } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// ─── Internal helpers ─────────────────────────────────────────────────────────

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
}

function fileToSlug(filename: string): string {
  return filename.replace(/\.md$/, "");
}

/** Rough reading-time estimate: ~200 wpm */
function estimateReadTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns all blog slugs — used by generateStaticParams.
 */
export function getBlogPaths(): string[] {
  return getMarkdownFiles().map(fileToSlug);
}

/**
 * Parses a single blog post by slug. Returns null if not found.
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(content);

  const contentHtml = processed.toString();

  return {
    title: data.title ?? slug,
    slug: data.slug ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    readTime: typeof data.readTime === "number" ? data.readTime : estimateReadTime(content),
    metaDescription: data.metaDescription,
    coverImage: data.coverImage,
    contentHtml,
  };
}

/**
 * Returns frontmatter for every blog post, newest first.
 * Used on the listing page.
 */
export function getAllBlogPosts(): BlogMeta[] {
  return getMarkdownFiles()
    .map((filename) => {
      const fullPath = path.join(BLOG_DIR, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const slug = fileToSlug(filename);

      return {
        title: data.title ?? slug,
        slug: data.slug ?? slug,
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        readTime:
          typeof data.readTime === "number" ? data.readTime : estimateReadTime(content),
        metaDescription: data.metaDescription,
        coverImage: data.coverImage,
      } satisfies BlogMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Returns all unique tags across every post, sorted alphabetically.
 */
export function getAllBlogTags(): string[] {
  const tags = new Set<string>();
  getAllBlogPosts().forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return [...tags].sort();
}
