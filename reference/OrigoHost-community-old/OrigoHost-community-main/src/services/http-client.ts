/**
 * Thin fetch wrapper for service-layer calls.
 * Services in src/services/* should use this instead of raw fetch
 * so retries, auth headers, and error normalization live in one place.
 */

export interface RequestOptions extends RequestInit {
  baseUrl?: string;
  json?: unknown;
}

export class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: unknown,
  ) {
    super(`HTTP ${status} ${statusText}`);
  }
}

export async function http<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { baseUrl = "", json, headers, ...rest } = opts;
  const init: RequestInit = {
    ...rest,
    headers: {
      Accept: "application/json",
      ...(json !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: json !== undefined ? JSON.stringify(json) : rest.body,
  };

  const res = await fetch(`${baseUrl}${path}`, init);
  const contentType = res.headers.get("content-type") ?? "";
  const parsed = contentType.includes("application/json") ? await res.json() : await res.text();

  if (!res.ok) throw new HttpError(res.status, res.statusText, parsed);
  return parsed as T;
}
