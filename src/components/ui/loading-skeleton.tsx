import { cn } from "@/lib/utils";

/**
 * Shared loading skeleton primitive used by the header placeholder and the
 * partners marquee. Centralising sizing/colour here prevents header and
 * marquee placeholders from drifting and keeps CLS at zero — each variant
 * has the exact same dimensions as its hydrated counterpart.
 */
export interface LoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Preset shape. Defaults to `block`. */
  variant?: "block" | "pill" | "tile" | "logo-tile" | "header-bar";
}

const VARIANT_CLASSES: Record<NonNullable<LoadingSkeletonProps["variant"]>, string> = {
  block: "h-4 w-full",
  pill: "h-9 w-24 rounded-full",
  tile: "h-24 w-full rounded-2xl",
  // Matches the `<TileWrapper>` used in the marquee (h-24 min-w-[180px]).
  "logo-tile": "h-24 min-w-[180px] rounded-2xl",
  // Matches the sticky glass header dimensions so first paint has no gap.
  "header-bar": "h-14 w-full max-w-6xl rounded-full",
};

export function LoadingSkeleton({ variant = "block", className, ...props }: LoadingSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-foreground/10 dark:bg-foreground/15",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  );
}
