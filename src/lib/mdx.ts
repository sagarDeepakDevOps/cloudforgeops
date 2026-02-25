import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type { CaseStudy, CaseStudyMeta, TocEntry } from "@/types/case-study";

const CONTENT_DIR = path.join(process.cwd(), "content", "case-studies");

// ─── Path helpers ────────────────────────────────────────────────────────────

/** Returns all .md filenames in the case-studies directory */
function getMarkdownFiles(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"));
}

/** Converts a filename to a slug (strips .md extension) */
function fileToSlug(filename: string): string {
  return filename.replace(/\.md$/, "");
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Returns all valid slugs — used by generateStaticParams.
 */
export function getCaseStudyPaths(): string[] {
  return getMarkdownFiles().map(fileToSlug);
}

/**
 * Parses a single case study by slug.
 * Returns frontmatter + rendered HTML content.
 */
export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const fullPath = path.join(CONTENT_DIR, `${slug}.md`);

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
    excerpt: data.excerpt ?? "",
    client: data.client ?? "Confidential",
    industry: data.industry ?? "",
    date: data.date ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    results: Array.isArray(data.results) ? data.results : [],
    architecture: Array.isArray(data.architecture) ? data.architecture : [],
    contentHtml,
  };
}

/**
 * Returns frontmatter for all case studies, sorted newest first.
 * Used by the listing page.
 */
export function getAllCaseStudies(): CaseStudyMeta[] {
  return getMarkdownFiles()
    .map((filename) => {
      const fullPath = path.join(CONTENT_DIR, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const slug = fileToSlug(filename);

      return {
        title: data.title ?? slug,
        slug: data.slug ?? slug,
        excerpt: data.excerpt ?? "",
        client: data.client ?? "Confidential",
        industry: data.industry ?? "",
        date: data.date ?? "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        results: Array.isArray(data.results) ? data.results : [],
        architecture: Array.isArray(data.architecture) ? data.architecture : [],
      } satisfies CaseStudyMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Extracts H2 and H3 headings from rendered HTML for the sticky sidebar TOC.
 */
export function extractToc(contentHtml: string): TocEntry[] {
  const headingRegex = /<h([23])[^>]*>([^<]+)<\/h[23]>/gi;
  const entries: TocEntry[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(contentHtml)) !== null) {
    const level = parseInt(match[1], 10) as 2 | 3;
    const label = match[2].trim();
    const id = label
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    entries.push({ id, label, level });
  }

  return entries;
}

/**
 * Injects id attributes into H2/H3 tags in rendered HTML
 * so sidebar TOC anchor links resolve correctly.
 */
export function injectHeadingIds(html: string): string {
  return html.replace(
    /<h([23])>([^<]+)<\/h[23]>/gi,
    (_, level, text: string) => {
      const id = text
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      return `<h${level} id="${id}">${text.trim()}</h${level}>`;
    }
  );
}
