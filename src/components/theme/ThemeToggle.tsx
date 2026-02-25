"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  // Prevent hydration mismatch: only render after mount
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-9" />; // placeholder to prevent layout shift
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group relative flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)]",
        "bg-[var(--surface)] text-[var(--foreground)]",
        "transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
        className
      )}
    >
      {isDark ? (
        <Sun size={16} className="transition-transform duration-200 group-hover:rotate-12" />
      ) : (
        <Moon size={16} className="transition-transform duration-200 group-hover:-rotate-12" />
      )}
    </button>
  );
}
