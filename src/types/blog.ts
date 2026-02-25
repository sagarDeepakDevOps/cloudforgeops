/**
 * Blog content types.
 * All fields are populated from markdown frontmatter via src/lib/blog.ts.
 */

export interface BlogMeta {
  /** Post title — used in <h1> and <title> */
  title: string;
  /** URL slug, derived from the markdown filename */
  slug: string;
  /** ISO-8601 publication date */
  date: string;
  /** 1–2 sentence summary shown on cards and in <meta description> */
  excerpt: string;
  /** Category tags for filtering */
  tags: string[];
  /** Estimated reading time in minutes (computed from word count if not set) */
  readTime: number;
  /** Optional override for <meta description> — falls back to excerpt */
  metaDescription?: string;
  /** Cover image path relative to /public (optional) */
  coverImage?: string;
}

export interface BlogPost extends BlogMeta {
  /** Full post rendered as HTML */
  contentHtml: string;
}
