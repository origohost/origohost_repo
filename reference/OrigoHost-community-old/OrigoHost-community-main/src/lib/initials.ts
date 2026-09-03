/**
 * Derive display initials from a person's name.
 *
 * Rules:
 * - Strip common honorifics (Mr., Mrs., Ms., Mx., Dr., Prof., Sri, Smt.)
 *   so "Mr. Tarun Kumar" → "TK" instead of "MT".
 * - Split on whitespace, take the first *letter* of each remaining word
 *   (ignoring punctuation like periods or commas), uppercase, and return
 *   at most `max` characters (default 2).
 * - Empty / punctuation-only names return "".
 */
const HONORIFICS = new Set(["mr", "mrs", "ms", "mx", "dr", "prof", "sri", "smt", "shri", "st"]);

export function getInitials(name: string, max = 2): string {
  if (!name) return "";
  const tokens = name
    .split(/\s+/)
    .map((tok) => tok.replace(/[.,]+$/g, "").trim())
    .filter((tok) => tok.length > 0)
    .filter((tok) => !HONORIFICS.has(tok.toLowerCase().replace(/\.+$/g, "")));

  const letters: string[] = [];
  for (const tok of tokens) {
    const match = tok.match(/\p{L}/u);
    if (match) letters.push(match[0]);
    if (letters.length >= max) break;
  }
  return letters.join("").toUpperCase();
}
