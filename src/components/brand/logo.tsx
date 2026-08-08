import { Link } from "@tanstack/react-router";

import { brand } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Brand lockup. The official OrigoHOST logo file should be dropped into
 * `src/assets/` and rendered here as an <img> — it must never be recoloured,
 * distorted or redrawn. Until the official file is supplied, this typographic
 * lockup stands in.
 */
export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "inverse";
}) {
  return (
    <Link
      to="/"
      aria-label={`${brand.name} — home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-[0.7rem] font-display text-sm font-extrabold tracking-tight transition-transform duration-300 group-hover:-translate-y-0.5",
          variant === "inverse"
            ? "bg-navy-foreground text-navy"
            : "bg-navy-deep text-navy-foreground shadow-soft",
        )}
      >
        O
      </span>
      <span
        className={cn(
          "font-display text-[1.0625rem] font-extrabold tracking-tight",
          variant === "inverse" ? "text-navy-foreground" : "text-navy",
        )}
      >
        Origo
        <span className={variant === "inverse" ? "text-cyan" : "text-primary"}>HOST</span>
      </span>
    </Link>
  );
}
