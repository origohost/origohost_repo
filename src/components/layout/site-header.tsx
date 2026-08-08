import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { primaryNav } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-4">
      <div className="container-page">
        <nav
          aria-label="Primary"
          className={cn(
            "flex items-center gap-3 rounded-[1.25rem] border px-3 py-2.5 transition-all duration-300 md:px-4",
            scrolled
              ? "border-hairline bg-card/85 shadow-nav backdrop-blur-xl"
              : "border-transparent bg-card/55 backdrop-blur-md",
          )}
        >
          <Logo />

          <ul className="ml-2 hidden items-center gap-0.5 lg:flex">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    isActive(item.to)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                  aria-current={isActive(item.to) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto hidden items-center gap-2 md:flex">
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Link to="/partnerships">Partner With Us</Link>
            </Button>
            <Button asChild size="sm" className="rounded-full px-4">
              <Link to="/community">Join Community</Link>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="ml-auto grid size-11 place-items-center rounded-xl border border-hairline bg-card text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {open ? (
          <div
            id="mobile-nav"
            className="reveal mt-2 overflow-hidden rounded-[1.25rem] border border-hairline bg-card p-3 shadow-nav lg:hidden"
          >
            <ul className="grid gap-1">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "flex min-h-11 items-center rounded-xl px-3 text-[0.9375rem] font-medium transition-colors",
                      isActive(item.to)
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-secondary",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid gap-2 border-t border-hairline pt-3">
              <Button asChild className="min-h-11 rounded-xl">
                <Link to="/community">Join Community</Link>
              </Button>
              <Button asChild variant="outline" className="min-h-11 rounded-xl">
                <Link to="/partnerships">Partner With Us</Link>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
