"use client";

import { siteConfig } from "@/config/site";

interface CalendlyEmbedProps {
  /** Override the URL from siteConfig if needed */
  url?: string;
  /** Pixel height of the iframe — default 700 */
  height?: number;
  className?: string;
}

/**
 * Renders the Calendly inline widget as an iframe.
 * All configuration is sourced from siteConfig.freeReview.calendlyUrl
 * so you only need to change the URL in one place.
 */
export function CalendlyEmbed({
  url = siteConfig.freeReview.calendlyUrl,
  height = 700,
  className,
}: CalendlyEmbedProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_4px_32px_var(--glow-card)] ${className ?? ""}`}
    >
      <iframe
        src={url}
        width="100%"
        height={height}
        frameBorder="0"
        title={`Schedule your free ${siteConfig.freeReview.duration} cloud review`}
        loading="lazy"
        style={{ display: "block", minWidth: "280px" }}
      />
    </div>
  );
}
