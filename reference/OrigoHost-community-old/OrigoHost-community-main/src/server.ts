import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  const actualError: any =
    consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`);
  console.error(actualError);

  const errorHtml = renderErrorPage().replace(
    "</body>",
    `<div style="max-width:800px;margin:2rem auto;padding:1rem;background:#fdd;color:#900;border:1px solid #f99;font-family:monospace;white-space:pre-wrap;text-align:left;"><b>FATAL VERCEL SSR ERROR:</b>\n\n${actualError?.stack || actualError?.message || String(actualError)}</div></body>`,
  );

  return new Response(errorHtml, {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

import { globalWriteRateLimiter, globalApiRateLimiter } from "./lib/rate-limit";

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    let response: Response;

    try {
      const url = new URL(request.url);
      const ip =
        request.headers.get("x-forwarded-for") ||
        request.headers.get("cf-connecting-ip") ||
        "unknown";

      if (url.pathname.startsWith("/_server/")) {
        // Global API limiter (100 req/min)
        const globalLimit = await globalApiRateLimiter.limit(ip);
        if (!globalLimit.success) {
          return new Response(
            JSON.stringify({ error: { code: "RATE_LIMITED", message: "Too many requests" } }),
            {
              status: 429,
              headers: {
                "Content-Type": "application/json",
                "Retry-After": Math.ceil((globalLimit.reset - Date.now()) / 1000).toString(),
              },
            },
          );
        }

        // Public Write limit (5 req/hr) for specific mutations
        const serverFnId = url.searchParams.get("serverFnId");
        if (
          serverFnId &&
          (serverFnId.includes("submitApplicationFn") ||
            serverFnId.includes("sendContactEmailFn") ||
            serverFnId.includes("submitSponsorApplicationFn") ||
            serverFnId.includes("submitHostEventEmailFn"))
        ) {
          const writeLimit = await globalWriteRateLimiter.limit(ip);
          if (!writeLimit.success) {
            return new Response(
              JSON.stringify({
                error: {
                  code: "RATE_LIMITED",
                  message: "Too many submissions. Please try again later.",
                },
              }),
              {
                status: 429,
                headers: {
                  "Content-Type": "application/json",
                  "Retry-After": Math.ceil((writeLimit.reset - Date.now()) / 1000).toString(),
                },
              },
            );
          }
        }
      }

      response = await getServerEntry().then((entry) => entry.fetch(request, env, ctx));
      response = await normalizeCatastrophicSsrResponse(response);

      // Append Security Headers
      response = new Response(response.body, response);
      response.headers.set(
        "Content-Security-Policy",
        "default-src 'self' https://*.supabase.co; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.supabase.co https://avatars.githubusercontent.com https://lh3.googleusercontent.com; font-src 'self' data:; connect-src 'self' https://*.supabase.co; frame-ancestors 'none';",
      );
      response.headers.set("X-Frame-Options", "DENY");
      response.headers.set("X-Content-Type-Options", "nosniff");
      response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
      response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    } catch (error: any) {
      console.error(error);
      const errorHtml = renderErrorPage().replace(
        "Something went wrong on our end. You can try refreshing or head back home.",
        `Something went wrong: <pre style="text-align:left; background:#eee; padding:1rem; overflow:auto; font-size:12px; margin-top:1rem;">${error?.stack || error?.message || String(error)}</pre>`,
      );
      response = new Response(errorHtml, {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    // Clone response to add security headers since the original might be immutable
    const newHeaders = new Headers(response.headers);

    // Enterprise Security Headers
    newHeaders.set("X-Content-Type-Options", "nosniff");
    newHeaders.set("X-Frame-Options", "DENY");
    newHeaders.set("X-XSS-Protection", "1; mode=block");
    newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
    newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    newHeaders.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), browsing-topics=()",
    );
    newHeaders.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:;",
    );

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
