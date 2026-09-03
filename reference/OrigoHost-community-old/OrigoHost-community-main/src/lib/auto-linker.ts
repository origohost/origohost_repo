export interface KeywordMatch {
  keyword: string;
  path: string;
  index: number;
  length: number;
}

// Case-insensitive dictionary. The keys MUST be lowercase here.
export const KEYWORD_DICTIONARY: Record<string, string> = {
  vps: "/cloud/vps",
  "virtual private server": "/cloud/vps",
  "dedicated server": "/cloud/dedicated",
  "bare-metal": "/cloud/dedicated",
  "bare metal": "/cloud/dedicated",
  kubernetes: "/cloud/kubernetes",
  k8s: "/cloud/kubernetes",
  "cloud hosting": "/cloud",
  "cloud infrastructure": "/cloud",
  hackathon: "/community/events?type=hackathon",
  hackathons: "/community/events?type=hackathon",
  "open-source": "/open-source",
  "open source": "/open-source",
  origohost: "/",
  "origo host": "/",
  "origohost community": "/",
  "official origohost website": "/",
  "origohost tech community": "/",
  "origohost developer community": "/",
  "origohost.in": "/",
  "developer community": "/",
};

/**
 * Finds all occurrences of dictionary keywords in the text.
 * Respects word boundaries to avoid matching partial words (e.g. 'vps' in 'vpshosting').
 * Only matches the *first* occurrence of each specific keyword to avoid link spam.
 */
export function findKeywords(text: string): KeywordMatch[] {
  const matches: KeywordMatch[] = [];
  const seenPaths = new Set<string>();

  // Sort keywords by length descending so "virtual private server" is matched before "server" or "private"
  const keywords = Object.keys(KEYWORD_DICTIONARY).sort((a, b) => b.length - a.length);

  for (const keyword of keywords) {
    const path = KEYWORD_DICTIONARY[keyword];

    // Skip if we already linked to this path in this text chunk
    if (seenPaths.has(path)) continue;

    // Use regex with word boundaries. \b handles standard word boundaries.
    // We escape the keyword to handle hyphens safely.
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b(${escapedKeyword})\\b`, "i");

    const match = regex.exec(text);
    if (match) {
      matches.push({
        keyword: match[0], // the actual cased text that matched
        path,
        index: match.index,
        length: match[0].length,
      });
      seenPaths.add(path); // mark this target path as linked
    }
  }

  // Sort matches by index ascending so we can process them sequentially
  return matches.sort((a, b) => a.index - b.index);
}
