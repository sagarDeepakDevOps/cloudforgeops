"use client";

import { useEffect, useState } from "react";

/**
 * ScrollProgress — thin fixed bar at the very top of the viewport.
 *
 * Tracks `window.scrollY / (scrollHeight - innerHeight)` to show how far
 * through the page the user has scrolled. Updates on the scroll event
 * (passive listener — no frame budget impact).
 *
 * The bar itself uses a CSS transition of `none` to avoid lag between
 * the scroll position and the visual indicator. The glow is static CSS.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
    };

    // Run once on mount in case page is already scrolled
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className="fixed left-0 top-0 z-[200] h-[2px] origin-left"
      style={{
        width: `${progress}%`,
        background:
          "linear-gradient(90deg, var(--accent) 0%, #a855f7 60%, #06b6d4 100%)",
        boxShadow: "0 0 10px var(--glow-accent-strong)",
        // No CSS transition — updates must be immediate to track scroll faithfully
        transition: "none",
      }}
    />
  );
}
