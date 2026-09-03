import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    const actualError = error as any;
    const errorHtml = renderErrorPage().replace(
      "</body>",
      `<div style="max-width:800px;margin:2rem auto;padding:1rem;background:#fdd;color:#900;border:1px solid #f99;font-family:monospace;white-space:pre-wrap;text-align:left;"><b>FATAL VERCEL SSR ERROR:</b>\n\n${actualError?.stack || actualError?.message || String(actualError)}</div></body>`,
    );
    return new Response(errorHtml, {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [errorMiddleware],
}));
