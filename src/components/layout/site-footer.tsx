import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/logo";
import { brand, footerColumns, journey, legalLinks, socialLinks } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep">
      <div className="container-page py-14 md:py-18">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2.6fr]">
          <div className="max-w-sm">
            <Logo variant="horizontal" height={32} onDark />
            <p className="mt-5 font-display text-lg font-bold tracking-tight text-navy-foreground">
              {brand.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-navy-foreground/70">
              A professional technology community where students, developers, professionals, researchers and
              founders learn, build, collaborate and grow.
            </p>
            <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-cyan">
              {journey.join(" · ")}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="font-display text-xs font-bold uppercase tracking-[0.14em] text-navy-foreground/55">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-navy-foreground/80 transition-colors hover:text-cyan"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-navy-foreground/12 pt-7 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-xs text-navy-foreground/60 transition-colors hover:text-navy-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap items-center gap-2">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-9 items-center rounded-full border border-navy-foreground/18 px-3.5 text-xs font-medium text-navy-foreground/80 transition-colors hover:border-cyan hover:text-cyan"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-7 text-xs text-navy-foreground/50">
          © {brand.founded} {brand.name}. Founded in {brand.country}.
        </p>
      </div>
    </footer>
  );
}
