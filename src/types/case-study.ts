export interface CaseStudyResult {
  metric: string;
  outcome: string;
}

export interface CaseStudyFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  client: string;
  industry: string;
  date: string;
  tags: string[];
  results: CaseStudyResult[];
  /** Ordered lines describing the architecture flow */
  architecture: string[];
}

/** Frontmatter + rendered HTML body — used on the detail page */
export interface CaseStudy extends CaseStudyFrontmatter {
  contentHtml: string;
}

/** Frontmatter only — used on the listing page */
export type CaseStudyMeta = CaseStudyFrontmatter;

/** Table-of-contents entry extracted from headings */
export interface TocEntry {
  id: string;
  label: string;
  level: 2 | 3;
}
