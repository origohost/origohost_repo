import React, { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { findKeywords, KeywordMatch } from "@/lib/auto-linker";

interface AutoLinkerProps {
  children: string; // The raw text content to process
  className?: string; // Optional class applied to the generated links
}

/**
 * Parses raw text and automatically replaces specific keywords with internal <Link> components.
 * This is crucial for SEO Topical Authority and internal PageRank distribution.
 */
export function AutoLinker({
  children,
  className = "text-blue-600 hover:underline decoration-blue-300 underline-offset-4",
}: AutoLinkerProps) {
  const nodes = useMemo(() => {
    if (typeof children !== "string") return children;

    const matches = findKeywords(children);
    if (matches.length === 0) return children;

    const elements: React.ReactNode[] = [];
    let currentIndex = 0;

    matches.forEach((match, idx) => {
      // 1. Add the plain text before the keyword
      if (match.index > currentIndex) {
        elements.push(<span key={`text-${idx}`}>{children.slice(currentIndex, match.index)}</span>);
      }

      // 2. Add the Linked keyword
      elements.push(
        <Link
          key={`link-${idx}`}
          to={match.path as any}
          className={className}
          title={`Internal link to ${match.path}`}
        >
          {match.keyword}
        </Link>,
      );

      currentIndex = match.index + match.length;
    });

    // 3. Add any remaining text after the last match
    if (currentIndex < children.length) {
      elements.push(<span key="text-end">{children.slice(currentIndex)}</span>);
    }

    return elements;
  }, [children, className]);

  return <>{nodes}</>;
}
