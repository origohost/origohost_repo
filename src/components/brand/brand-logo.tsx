interface BrandLogoProps {
  /** Rendered pixel size (width & height). */
  size?: number;
  className?: string;
  alt?: string;
}

/**
 * Official OrigoHOST brand mark.
 */
export function BrandLogo({ size = 28, className, alt = "OrigoHOST" }: BrandLogoProps) {
  return (
    <img
      loading="lazy"
      decoding="async"
      src="/logo-monogram.png"
      alt={alt}
      width={size}
      height={size}
      className={
        className
          ? `${className} object-contain transition-transform`
          : "object-contain transition-transform"
      }
    />
  );
}
