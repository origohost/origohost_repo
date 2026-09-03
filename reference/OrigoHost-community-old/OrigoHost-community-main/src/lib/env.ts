import { z } from "zod";

/**
 * Client-side env schema. Only VITE_* vars are exposed to the browser.
 * Add new public variables here so consumers get typed, validated access.
 */
const clientSchema = z.object({
  VITE_APP_NAME: z.string().default("OrigoHOST Community"),
  VITE_APP_URL: z.string().url().default("http://localhost:8080"),
  VITE_SITE_URL: z.string().url().default("https://www.origohost.in"),
});

export const clientEnv = clientSchema.parse({
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  VITE_APP_URL: import.meta.env.VITE_APP_URL,
  VITE_SITE_URL: import.meta.env.VITE_SITE_URL,
});

export type ClientEnv = z.infer<typeof clientSchema>;
