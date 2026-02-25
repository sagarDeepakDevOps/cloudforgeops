/**
 * Centralized env variable reader.
 *
 * IMPORTANT: Next.js statically replaces process.env.NEXT_PUBLIC_* at bundle
 * time using literal key strings. Using process.env[variable] with a dynamic
 * key does NOT work in client bundles — the bundler cannot resolve it and
 * returns undefined, causing all client-side reads to fall back to defaults.
 *
 * Every key must be accessed as a literal: process.env.NEXT_PUBLIC_SITE_NAME
 * Never use bracket notation with a variable for NEXT_PUBLIC_ keys.
 */

function fallback(value: string | undefined, def: string): string {
  return value !== undefined && value.trim() !== "" ? value.trim() : def;
}

export const env = {
  // ── Brand identity ────────────────────────────────────────────────────────
  SITE_NAME:        fallback(process.env.NEXT_PUBLIC_SITE_NAME,        "RelientOps"),
  SITE_TAGLINE:     fallback(process.env.NEXT_PUBLIC_SITE_TAGLINE,     "Freelance DevOps & Cloud Engineering"),
  SITE_DESCRIPTION: fallback(process.env.NEXT_PUBLIC_SITE_DESCRIPTION, "I design, build, and operate cloud-native infrastructure. From Kubernetes to CI/CD pipelines, I help startups ship faster and stay reliable."),
  SITE_URL:         fallback(process.env.NEXT_PUBLIC_SITE_URL,         "https://relientops.io"),
  SITE_OG_IMAGE:    fallback(process.env.NEXT_PUBLIC_SITE_OG_IMAGE,    "/images/og-default.png"),

  // ── Contact ───────────────────────────────────────────────────────────────
  CONTACT_EMAIL:    fallback(process.env.NEXT_PUBLIC_CONTACT_EMAIL,    "sagardeepak2002@gmail.com"),

  // ── Social links ─────────────────────────────────────────────────────────
  SOCIAL_GITHUB:    fallback(process.env.NEXT_PUBLIC_SOCIAL_GITHUB,    "https://github.com/sagarDeepakDevOps"),
  SOCIAL_LINKEDIN:  fallback(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,  "https://linkedin.com/in/sagardeepak2002"),

  // ── Owner / personal identity ─────────────────────────────────────────────
  OWNER_NAME:             fallback(process.env.NEXT_PUBLIC_OWNER_NAME,             "Deepak Sagar"),
  OWNER_TITLE:            fallback(process.env.NEXT_PUBLIC_OWNER_TITLE,            "Freelance DevOps & Cloud Engineer"),
  OWNER_EXPERIENCE:       fallback(process.env.NEXT_PUBLIC_OWNER_EXPERIENCE,       "3+"),
  OWNER_EXPERIENCE_LABEL: fallback(process.env.NEXT_PUBLIC_OWNER_EXPERIENCE_LABEL, "Hands-On Cloud & Automation Experience"),
  OWNER_BIO:              fallback(process.env.NEXT_PUBLIC_OWNER_BIO,              "I work directly with founders and engineering teams to design, automate, and stabilize cloud environments across AWS and Azure."),
  OWNER_LINKEDIN:         fallback(process.env.NEXT_PUBLIC_OWNER_LINKEDIN,         "https://linkedin.com/in/sagardeepak2002"),

  // ── Free Review / Calendly ────────────────────────────────────────────────
  FREE_REVIEW_HREF:     fallback(process.env.NEXT_PUBLIC_FREE_REVIEW_HREF,     "/free-review"),
  FREE_REVIEW_DURATION: fallback(process.env.NEXT_PUBLIC_FREE_REVIEW_DURATION, "30 min"),
  CALENDLY_URL:         fallback(process.env.NEXT_PUBLIC_CALENDLY_URL,         "https://calendly.com/sagardeepak2002/30min"),
} as const;

export type Env = typeof env;
