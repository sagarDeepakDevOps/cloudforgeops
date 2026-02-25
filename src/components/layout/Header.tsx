"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Cloud, CalendarCheck } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const { freeReview } = siteConfig;

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add backdrop-blur + border on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-[var(--foreground)] transition-opacity hover:opacity-80"
        >
          <Cloud size={22} className="text-[var(--accent)]" />
          <span className="text-lg tracking-tight">{siteConfig.name}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors duration-200",
                // Animated underline via ::after pseudo-element
                "after:absolute after:bottom-[5px] after:left-3 after:right-3 after:h-[1.5px]",
                "after:origin-left after:scale-x-0 after:rounded-full after:bg-[var(--accent)]",
                "after:transition-transform after:duration-300 after:ease-out",
                "hover:after:scale-x-100",
                pathname === item.href
                  ? "text-[var(--accent)] after:scale-x-100"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Free Review — desktop only */}
          <MagneticButton>
            <Link
              href={freeReview.href}
              className={cn(
                "hidden items-center gap-1.5 rounded-lg border border-[var(--accent)]/40 px-3 py-2 text-sm font-medium",
                "text-[var(--accent)] transition-all duration-200",
                "hover:border-[var(--accent)] hover:bg-[var(--accent)]/8 md:inline-flex"
              )}
            >
              <CalendarCheck size={13} />
              Free {freeReview.duration} Review
            </Link>
          </MagneticButton>

          {/* CTA — desktop only */}
          <MagneticButton>
            <Link
              href="/contact"
              className={cn(
                "hidden rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-fg)]",
                "shadow-[0_0_14px_var(--glow-accent)] transition-all duration-300",
                "hover:bg-[var(--accent-hover)] hover:shadow-[0_0_22px_var(--glow-accent-strong)] md:inline-flex"
              )}
            >
              Get in Touch
            </Link>
          </MagneticButton>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)]",
              "bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] md:hidden"
            )}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="border-b border-[var(--border)] bg-[var(--background)] px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-[var(--surface)] text-[var(--accent)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-center text-sm font-semibold text-[var(--accent-fg)] hover:bg-[var(--accent-hover)]"
            >
              Get in Touch
            </Link>
            <Link
              href={freeReview.href}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-[var(--accent)]/40 px-4 py-2.5 text-center text-sm font-medium text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/8"
            >
              <CalendarCheck size={14} />
              Free {freeReview.duration} Review
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
