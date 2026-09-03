import { defineConfig } from "@tanstack/react-start/config";

export default defineConfig({
  server: {
    preset: "vercel",
  },
  nitro: {
    routeRules: {
      "/events/**": { swr: 300, isr: true },
      "/blog/**": { swr: 300, isr: true },
      "/sponsors/**": { swr: 300, isr: true },
      "/_nuxt/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
      "/assets/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
    },
  },
});
