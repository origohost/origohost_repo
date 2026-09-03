import DOMPurify from "isomorphic-dompurify";

/**
 * Enterprise XSS Mitigation
 * Uses isomorphic-dompurify to sanitize malicious active content, JS payloads, and XSS vectors
 * from user-supplied HTML strings. It safely executes on both client and edge/server.
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "p",
      "a",
      "ul",
      "ol",
      "nl",
      "li",
      "b",
      "i",
      "strong",
      "em",
      "strike",
      "code",
      "hr",
      "br",
      "div",
      "table",
      "thead",
      "caption",
      "tbody",
      "tr",
      "th",
      "td",
      "pre",
      "span",
    ],
    ALLOWED_ATTR: ["href", "name", "target", "class", "style"],
    ALLOW_DATA_ATTR: false, // Prevent React event hijack via data attributes
  });
}
