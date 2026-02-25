import Link from "next/link";
import { Cloud, Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Cloud size={20} className="text-[var(--accent)]" />
              <span className="text-[var(--foreground)]">{siteConfig.name}</span>
            </Link>
            <p className="max-w-xs text-sm text-[var(--muted)] leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Navigation
            </h3>
            <ul className="space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Contact
            </h3>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              {siteConfig.contact.email}
            </a>

            {/* Social icons */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                <Github size={18} />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                <Linkedin size={18} />
              </a>

            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-12 border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--muted)]">
          &copy; {currentYear} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
