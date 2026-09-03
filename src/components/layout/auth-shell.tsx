import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/brand/brand-logo";

interface AuthShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

/**
 * Shared shell for auth-style pages (login, register, forgot, reset, otp).
 * UI-only — no backend logic. Wire handlers when auth is implemented.
 */
export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[var(--brand-cream)] px-6 py-24">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-black tracking-tight text-[var(--brand-ink)]"
          >
            <BrandLogo size={26} />
            <span>Origo</span>
            <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-green)] bg-clip-text text-transparent">
              HOST
            </span>
          </Link>
        </div>
        <div className="rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-8 shadow-[var(--shadow-soft)]">
          <div className="text-center">
            <h1 className="text-2xl font-black tracking-tight text-[var(--brand-ink)]">{title}</h1>
            {subtitle && <p className="mt-2 text-sm text-[var(--brand-ink)]/60">{subtitle}</p>}
          </div>
          <div className="mt-8">{children}</div>
        </div>
        {footer && (
          <div className="mt-6 text-center text-sm text-[var(--brand-ink)]/70">{footer}</div>
        )}
      </div>
    </div>
  );
}
