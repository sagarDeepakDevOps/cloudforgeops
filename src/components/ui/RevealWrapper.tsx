"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealWrapperProps {
  children: React.ReactNode;
  /** Stagger delay in seconds */
  delay?: number;
  /** Vertical offset to reveal from (default 22px) */
  yOffset?: number;
  className?: string;
  /** Override the motion tag (default: div) */
  as?: "div" | "section" | "li" | "article";
}

/**
 * RevealWrapper — consistent scroll-triggered reveal animation.
 *
 * Every component that needs a scroll-based entrance should use this wrapper
 * rather than inlining motion props. Maintains a single source of truth for:
 *   - Duration: 0.5s
 *   - Easing: easeOut
 *   - Offset: 22px upward slide + fade
 *   - Viewport threshold: triggers 60px before the element enters the viewport
 *   - `once: true` — plays once, no looping
 */
export function RevealWrapper({
  children,
  delay = 0,
  yOffset = 22,
  className,
  as = "div",
}: RevealWrapperProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
