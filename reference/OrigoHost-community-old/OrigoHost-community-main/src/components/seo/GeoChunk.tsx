import React from "react";
import { cn } from "@/lib/utils";

interface GeoChunkProps {
  question: string;
  tldr: string;
  semanticTriple?: string; // e.g., "OrigoHOST provides Kubernetes"
  citation?: string; // e.g., "OrigoHOST Knowledge Base"
  className?: string;
  headingLevel?: "h2" | "h3" | "h4";
}

export function GeoChunk({
  question,
  tldr,
  semanticTriple,
  citation,
  className,
  headingLevel = "h2",
}: GeoChunkProps) {
  const Heading = headingLevel;
  // Generate a clean ID for anchor linking (vital for LLM chunking)
  const id = question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return (
    <div
      className={cn(
        "geo-chunk my-8 p-6 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800",
        className,
      )}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <Heading
        id={id}
        itemProp="name"
        className="text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-white"
      >
        {question}
      </Heading>

      <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
        <div
          itemProp="text"
          className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium"
        >
          {semanticTriple && <strong className="block mb-2 text-primary">{semanticTriple}</strong>}
          <p>{tldr}</p>
        </div>
      </div>

      {citation && (
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 font-mono">
          [Source: <span itemProp="citation">{citation}</span>]
        </div>
      )}
    </div>
  );
}
