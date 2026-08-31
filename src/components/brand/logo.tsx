import { Link } from "@tanstack/react-router";

// Served from public/ so the logos resolve on any host (Lovable, Vercel, self-hosted).
const horizontalAsset = { url: "/brand/origohost-logo-horizontal.png" };
const monogramAsset = { url: "/brand/origohost-monogram.png" };
import { brand } from "@/content/site";
import { cn } from "@/lib/utils";


/**
 * OFFICIAL BRAND ASSETS — DO NOT MODIFY.
 *
 * The two files referenced here are the authoritative OrigoHOST logo assets
 * supplied by the project owner. They are rendered unmodified: no recolouring,
 * no CSS filters, no gradients, no drop shadows, no rotation, no stretching.
 *
 * The uploaded PNGs contain generous transparent padding around the artwork.
 * The wrappers below scale the *whole* image and reveal only the artwork box,
 * so the logo keeps its exact original geometry, colours and aspect ratio
 * while sitting on a predictable optical bounding box for layout.
 */
const ART = {
  horizontal: {
    src: horizontalAsset.url,
    /** artwork aspect ratio (width / height) inside the source file */
    ratio: 1294 / 331,
    width: "118.702%",
    left: "-8.346%",
    top: "-93.353%",
  },
  symbol: {
    src: monogramAsset.url,
    ratio: 631 / 648,
    width: "162.282%",
    left: "-31.062%",
    top: "-24.074%",
  },
} as const;

export type LogoVariant = keyof typeof ART;

/** Renders the official artwork, untouched, inside its optical bounding box. */
export function LogoMark({
  variant = "horizontal",
  height = 32,
  className,
}: {
  variant?: LogoVariant;
  /** Rendered height in px of the artwork. Width follows the original ratio. */
  height?: number;
  className?: string;
}) {
  const art = ART[variant];

  return (
    <span
      className={cn("relative block overflow-hidden", className)}
      style={{ height, width: height * art.ratio }}
    >
      <img
        src={art.src}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute h-auto max-w-none select-none"
        style={{ width: art.width, left: art.left, top: art.top }}
      />
    </span>
  );
}

/**
 * Brand lockup linking home.
 *
 * `onDark` never recolours the logo — the official navy/blue artwork is kept
 * as-is and the *design* adapts by placing it on a light clear-space plaque.
 */
export function Logo({
  className,
  variant = "horizontal",
  height = 30,
  onDark = false,
}: {
  className?: string;
  variant?: LogoVariant;
  height?: number;
  onDark?: boolean;
}) {
  return (
    <Link
      to="/"
      aria-label={`${brand.name} — home`}
      className={cn(
        "inline-flex shrink-0 items-center rounded-xl transition-opacity duration-300 hover:opacity-90",
        onDark ? "bg-background px-4 py-3" : "",
        className,
      )}
    >
      <LogoMark variant={variant} height={height} />
    </Link>
  );
}

/**
 * Responsive header lockup: official monogram on small screens, official
 * horizontal lockup from `sm` upwards. Both are the original assets.
 */
export function LogoResponsive({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      to="/"
      aria-label={`${brand.name} — home`}
      className={cn(
        "inline-flex shrink-0 items-center rounded-xl transition-opacity duration-300 hover:opacity-90",
        onDark ? "bg-background px-4 py-3" : "",
      )}
    >
      <span className="sm:hidden">
        <LogoMark variant="symbol" height={32} />
      </span>
      <span className="hidden sm:block">
        <LogoMark variant="horizontal" height={36} />
      </span>
    </Link>
  );
}
