import type { ReactNode } from "react";
import { m as motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

interface PageShellProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  breadcrumb?: { label: string; to?: string }[];
  children: ReactNode;
}

/**
 * Shared premium page hero + content wrapper for all public routes.
 * Extends the existing OrigoHOST brand system (ink / orange / green / cream).
 */
export function PageShell({ eyebrow, title, description, breadcrumb, children }: PageShellProps) {
  return (
    <div className="bg-[var(--brand-cream)] text-[var(--brand-ink)] pb-20 md:pb-0">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-32 sm:pt-40 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            {breadcrumb && breadcrumb.length > 0 && (
              <nav
                aria-label="Breadcrumb"
                className="mb-6 flex items-center justify-center gap-1.5 text-xs text-[var(--brand-ink)]/60"
              >
                <Link to="/" className="hover:text-[var(--brand-ink)]">
                  Home
                </Link>
                {breadcrumb.map((c, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <ChevronRight className="h-3 w-3" />
                    {c.to ? (
                      <Link to={c.to} className="hover:text-[var(--brand-ink)]">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-[var(--brand-ink)]">{c.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}
            {eyebrow && (
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--brand-ink)]/10 bg-white/70 px-4 py-1.5 text-xs font-medium text-[var(--brand-ink)] backdrop-blur">
                {eyebrow}
              </div>
            )}
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--brand-ink)]/70">
                {description}
              </p>
            )}
          </motion.div>
        </div>
      </section>
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
      </section>
    </div>
  );
}
