import { useState } from "react";
import { cn } from "@/lib/utils";
import type { PartnerLogoEntry } from "@/features/cms/types";

/**
 * Renders a partner's logo via Logo.dev when a domain + publishable token are
 * available; otherwise falls back to a tile of initials. Also swaps to
 * initials automatically if the remote image fails to load (404, network
 * error, ad-blocker) — so a missing logo never leaves an empty box.
 *
 * Logo.dev token resolution order:
 *   1. `VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY`
 *   2. `VITE_LOGO_DEV_TOKEN` for local/dev use.
 *
 * Publishable Logo.dev tokens are safe to expose in browser bundles.
 */
const LOGO_DEV_TOKEN = (import.meta.env.VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY ??
  import.meta.env.VITE_LOGO_DEV_TOKEN) as string | undefined;

/** Emitted (in dev only) once per session so the log isn't spammed by a grid
 * of dozens of tiles. Helps engineers spot missing tokens without noise. */
let missingTokenWarned = false;
function warnMissingToken() {
  if (missingTokenWarned || !import.meta.env.DEV) return;
  missingTokenWarned = true;
  console.warn(
    "[PartnerLogo] VITE_LOGO_DEV_TOKEN is missing. Partner logos will fall back to initials.",
  );
}
/** Reset the once-per-session warning latch. Test-only helper. */
export function __resetPartnerLogoWarningsForTests() {
  missingTokenWarned = false;
}

/** Extract at most 3 uppercase letters from the partner name, e.g. "Amazon
 * Alexa" → "AA", "SEBI" → "SE". Skips single-letter connectors ("&", "of"). */
export function initialsFor(name: string): string {
  const words = name
    .replace(/[.,()&]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
  if (words.length === 0) return name.slice(0, 2).toUpperCase();
  return words
    .slice(0, 3)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function logoDevUrl(domain: string, size: number): string {
  const params = new URLSearchParams({
    token: LOGO_DEV_TOKEN ?? "",
    size: String(size),
    format: "png",
    retina: "true",
  });
  return `https://img.logo.dev/${domain}?${params.toString()}`;
}

interface PartnerLogoProps {
  entry: PartnerLogoEntry;
  /** Rendered logo box size in CSS px (used for srcSet + intrinsic dims). */
  size?: number;
  /** Optional class overrides for the outer wrapper. */
  className?: string;
  /** Text-size class for the initials fallback. Defaults to `text-sm`. */
  fallbackTextClassName?: string;
}

export function PartnerLogo({
  entry,
  size = 96,
  className,
  fallbackTextClassName = "text-sm",
}: PartnerLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const hasToken = Boolean(LOGO_DEV_TOKEN);
  const canUseImage = Boolean(entry.domain) && hasToken && !imgFailed;

  if (!hasToken) warnMissingToken();

  // A11y-friendly fallback label: makes clear to screen readers that this is
  // a text stand-in for a logo that couldn't be rendered.
  const fallbackAriaLabel = !entry.domain
    ? `${entry.name} (logo unavailable)`
    : !hasToken
      ? `${entry.name} (logo image disabled)`
      : `${entry.name} (logo failed to load)`;

  return (
    <div className={cn("flex h-full w-full items-center justify-center px-2", className)}>
      {canUseImage ? (
        <img
          src={logoDevUrl(entry.domain!, size)}
          srcSet={`${logoDevUrl(entry.domain!, size)} 1x, ${logoDevUrl(entry.domain!, size * 2)} 2x`}
          alt={`${entry.name} logo`}
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
          data-testid="partner-logo-image"
          className="max-h-full w-auto max-w-full object-contain"
        />
      ) : (
        <span
          role="img"
          aria-label={fallbackAriaLabel}
          title={entry.name}
          data-testid="partner-logo-fallback"
          className={cn(
            "font-black uppercase tracking-wider text-[var(--brand-ink)]/70",
            fallbackTextClassName,
          )}
        >
          {initialsFor(entry.name)}
        </span>
      )}
    </div>
  );
}
