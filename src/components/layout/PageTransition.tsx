"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const variants = {
  hidden: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Wraps page content in a Framer Motion AnimatePresence block.
 * Place this inside the root layout, below Header and above Footer.
 * Each route change triggers a smooth fade + slide-up animation.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{
          duration: 0.25,
          ease: "easeOut" as const,
        }}
        className="flex-1"
        aria-label="Main content"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
