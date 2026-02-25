import { env } from "@/lib/env";

/**
 * Single source of truth for all brand, contact, and feature config.
 * Values come from environment variables (see src/lib/env.ts) with
 * typed fallbacks so the build never crashes.
 *
 * Static content (bullets, navigation labels, phase descriptions, etc.)
 * lives here because it is copy, not configuration.
 */
export const siteConfig = {
  name:        env.SITE_NAME,
  tagline:     env.SITE_TAGLINE,
  description: env.SITE_DESCRIPTION,
  url:         env.SITE_URL,
  ogImage:     env.SITE_OG_IMAGE,

  nav: [
    { label: "Services",     href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About",        href: "/about" },
    { label: "Contact",      href: "/contact" },
  ],

  social: {
    github:   env.SOCIAL_GITHUB,
    linkedin: env.SOCIAL_LINKEDIN,
  },

  contact: {
    email: env.CONTACT_EMAIL,
  },

  owner: {
    /** Full name — used in About, footer, and trust blocks */
    name:             env.OWNER_NAME,
    /** Professional title — never inflated */
    title:            env.OWNER_TITLE,
    /** Experience figure shown under name */
    experience:       env.OWNER_EXPERIENCE,
    experienceLabel:  env.OWNER_EXPERIENCE_LABEL,
    /** One-line bio for hero / meta */
    bio:              env.OWNER_BIO,
    /** Personal LinkedIn profile */
    linkedin:         env.OWNER_LINKEDIN,
  },

  freeReview: {
    /** Route for the dedicated landing page */
    href:        env.FREE_REVIEW_HREF,
    /** Calendly scheduling link */
    calendlyUrl: env.CALENDLY_URL,
    /** Page headline */
    headline: "Get a Free 30-Minute Cloud Infrastructure Review",
    /** Sub-headline / value proposition */
    subtext:
      "If you\u2019re scaling your product or experiencing performance, deployment, or cost issues \u2014 I\u2019ll review your setup and provide actionable recommendations.",
    /** What the client gets — displayed as bullet list */
    bullets: [
      "Architecture risk assessment",
      "Scaling & performance suggestions",
      "CI/CD optimization advice",
      "Cloud cost improvement opportunities",
    ],
    /** Closing persuasion line */
    closingNote: "No obligation. Just practical insights.",
    /** Social-proof / trust note shown near the embed */
    trustNote:
      "Trusted by engineers at fintech, SaaS, and health-tech companies.",
    /** Short label used in CTAs and nav */
    ctaLabel: "Free Cloud Review",
    /** Duration string, reused in labels */
    duration: env.FREE_REVIEW_DURATION,
  },
};

export type SiteConfig = typeof siteConfig;
