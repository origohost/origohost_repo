import React from "react";
import { cn } from "@/lib/utils";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  description: string;
  uploadDate: string; // ISO 8601 e.g., "2024-10-01T08:00:00+08:00"
  duration: string; // ISO 8601 e.g., "PT1M54S"
  thumbnailUrl: string;
  className?: string;
}

export function YouTubeEmbed({
  videoId,
  title,
  description,
  uploadDate,
  duration,
  thumbnailUrl,
  className,
}: YouTubeEmbedProps) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;

  return (
    <div
      className={cn(
        "my-8 overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-slate-50 dark:bg-slate-900 dark:border-slate-800",
        className,
      )}
      itemScope
      itemProp="video"
      itemType="https://schema.org/VideoObject"
    >
      <div className="aspect-video w-full">
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>

      {/* Hidden Microdata for Google Video Search */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="uploadDate" content={uploadDate} />
      <meta itemProp="duration" content={duration} />
      <meta itemProp="thumbnailUrl" content={thumbnailUrl} />
      <meta itemProp="embedUrl" content={embedUrl} />

      {/* Optional visible caption/title underneath for UI/UX */}
      <div className="p-4 bg-white dark:bg-slate-950 text-sm text-slate-500 border-t border-slate-100 dark:border-slate-900">
        <span className="font-semibold text-slate-700 dark:text-slate-300">Video:</span> {title}
      </div>
    </div>
  );
}
