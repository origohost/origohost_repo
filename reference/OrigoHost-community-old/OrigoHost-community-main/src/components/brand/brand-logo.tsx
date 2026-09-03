interface BrandLogoProps {
  /** Rendered pixel size (width & height). */
  size?: number;
  className?: string;
  alt?: string;
}

/**
 * OrigoHOST brand mark.
 */
export function BrandLogo({ size = 28, className, alt = "OrigoHOST" }: BrandLogoProps) {
  return (
    <img
      loading="lazy"
      decoding="async"
      src="/logo.png"
      alt={alt}
      width={size}
      height={size}
      className={
        className
          ? `${className} overflow-hidden rounded-full object-cover`
          : "overflow-hidden rounded-full object-cover"
      }
    />
  );
}
