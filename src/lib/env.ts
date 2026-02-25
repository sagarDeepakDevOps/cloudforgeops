/**
 * Centralized env variable reader.
 *
 * All keys are prefixed with NEXT_PUBLIC_ so they are available
 * on both the server (RSC, metadata, API routes) and the client
 * (Client Components, hooks).
 *
 * Every value has a typed string fallback so the build never
 * crashes when a variable is missing (e.g. in CI or local dev
 * without a .env.local file).
 *
 * To override any value: add it to .env.local (never commit that
 * file). See .env.example for the full key list.
 */

function read(key: string, fallback: string): string {
  // process.env is statically replaced by the Next.js bundler for
  // NEXT_PUBLIC_ prefixed keys — do NOT destructure or alias the
  // object; always use the full literal key string.
  const value = process.env[key];
  return value !== undefined && value.trim() !== "" ? value.trim() : fallback;
}

export const env = {
  // ── Brand identity ────────────────────────────────────────────────────────
  SITE_NAME: read(
    "NEXT_PUBLIC_SITE_NAME",
    "CloudForgeOps",
  ),
  SITE_TAGLINE: read(
    "NEXT_PUBLIC_SITE_TAGLINE",
    "Freelance DevOps & Cloud Engineering",
  ),
  SITE_DESCRIPTION: read(
    "NEXT_PUBLIC_SITE_DESCRIPTION",
    "I design, build, and operate cloud-native infrastructure. From Kubernetes to CI/CD pipelines, I help startups ship faster and stay reliable.",
  ),
  SITE_URL: read(
    "NEXT_PUBLIC_SITE_URL",
    "https://cloudforgeops.com",
  ),
  SITE_OG_IMAGE: read(
    "NEXT_PUBLIC_SITE_OG_IMAGE",
    "/images/og-default.png",
  ),

  // ── Contact ───────────────────────────────────────────────────────────────
  CONTACT_EMAIL: read(
    "NEXT_PUBLIC_CONTACT_EMAIL",
    "sagardeepak2002@gmail.com",
  ),

  // ── Social links ─────────────────────────────────────────────────────────
  SOCIAL_GITHUB: read(
    "NEXT_PUBLIC_SOCIAL_GITHUB",
    "https://github.com/cloudforgeops",
  ),
  SOCIAL_LINKEDIN: read(
    "NEXT_PUBLIC_SOCIAL_LINKEDIN",
    "https://linkedin.com/company/cloudforgeops",
  ),

  // ── Owner / personal identity ─────────────────────────────────────────────
  OWNER_NAME: read(
    "NEXT_PUBLIC_OWNER_NAME",
    "Deepak Sagar",
  ),
  OWNER_TITLE: read(
    "NEXT_PUBLIC_OWNER_TITLE",
    "Freelance DevOps & Cloud Engineer",
  ),
  OWNER_EXPERIENCE: read(
    "NEXT_PUBLIC_OWNER_EXPERIENCE",
    "3+",
  ),
  OWNER_EXPERIENCE_LABEL: read(
    "NEXT_PUBLIC_OWNER_EXPERIENCE_LABEL",
    "Hands-On Cloud & Automation Experience",
  ),
  OWNER_BIO: read(
    "NEXT_PUBLIC_OWNER_BIO",
    "I work directly with founders and engineering teams to design, automate, and stabilize cloud environments across AWS and Azure.",
  ),
  OWNER_LINKEDIN: read(
    "NEXT_PUBLIC_OWNER_LINKEDIN",
    "https://linkedin.com/in/sagardeepak2002",
  ),

  // ── Free Review / Calendly ────────────────────────────────────────────────
  FREE_REVIEW_HREF: read(
    "NEXT_PUBLIC_FREE_REVIEW_HREF",
    "/free-review",
  ),
  FREE_REVIEW_DURATION: read(
    "NEXT_PUBLIC_FREE_REVIEW_DURATION",
    "30 min",
  ),
  CALENDLY_URL: read(
    "NEXT_PUBLIC_CALENDLY_URL",
    "https://calendly.com/sagardeepak2002/30min",
  ),
} as const;

export type Env = typeof env;
