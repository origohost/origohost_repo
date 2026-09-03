// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    server: {
      port: 5180,
    },
    plugins: [
      ViteImageOptimizer({
        png: { quality: 82 },
        jpeg: { quality: 82 },
        jpg: { quality: 82 },
        webp: { quality: 78 },
        avif: { quality: 65, speed: 5 },
      }),
      viteCompression({ algorithm: "brotliCompress", ext: ".br" }),
      viteCompression({ algorithm: "gzip", ext: ".gz" }),
    ],
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("react") || id.includes("react-dom")) return "vendor-react";
              if (id.includes("@tanstack")) return "vendor-tanstack";
              if (id.includes("recharts")) return "vendor-recharts";
              if (id.includes("framer-motion")) return "vendor-framer-motion";
              if (id.includes("@supabase")) return "vendor-supabase";
              if (id.includes("@radix-ui") || id.includes("@floating-ui")) return "vendor-ui";
              if (id.includes("lucide-react")) return "vendor-icons";
              return "vendor";
            }
          },
        },
      },
    },
    esbuild: {
      drop: ["console", "debugger"],
    },
  },
});
