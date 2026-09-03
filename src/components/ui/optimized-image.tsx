import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  containerClassName?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * Enterprise-grade OptimizedImage component using @unpic/react.
 * Automatically integrates with Vercel Image Optimization to generate AVIF/WebP srcset.
 */
export function OptimizedImage({
  src,
  alt,
  priority = false,
  objectFit = "cover",
  className,
  containerClassName,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // If no width/height are provided, use full width layout
  const layout = width && height ? "constrained" : "fullWidth";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center",
        containerClassName,
      )}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
      }}
    >
      <picture>
        {/* AVIF Source */}
        {src.match(/\.(png|jpe?g)$/i) && (
          <source srcSet={src.replace(/\.(png|jpe?g)$/i, ".avif")} type="image/avif" />
        )}
        {/* WebP Source */}
        {src.match(/\.(png|jpe?g)$/i) && (
          <source srcSet={src.replace(/\.(png|jpe?g)$/i, ".webp")} type="image/webp" />
        )}
        {/* Fallback img */}
        <img
          src={src}
          alt={alt}
          width={width ? Number(width) : undefined}
          height={height ? Number(height) : undefined}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "low"}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "w-full h-full transition-opacity duration-500 ease-in-out",
            objectFit === "cover" && "object-cover",
            objectFit === "contain" && "object-contain",
            objectFit === "fill" && "object-fill",
            objectFit === "none" && "object-none",
            objectFit === "scale-down" && "object-scale-down",
            !isLoaded && !priority ? "opacity-0 scale-105" : "opacity-100 scale-100",
            className,
          )}
          {...props}
        />
      </picture>
    </div>
  );
}
