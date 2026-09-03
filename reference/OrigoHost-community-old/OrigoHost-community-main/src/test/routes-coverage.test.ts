import { describe, it, expect } from "vitest";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { PUBLIC_ROUTES, VISUAL_ROUTES } from "../../e2e/routes";

/**
 * Guardrail: every file-based route in src/routes/ must be listed in
 * e2e/routes.ts so the animation, a11y, and reduced-motion regression
 * suites automatically cover it. This test fails when a new page is
 * added without being wired into CI coverage.
 */

const ROUTES_DIR = join(process.cwd(), "src/routes");

// Files that are not user-navigable pages.
const EXCLUDE = new Set(["__root.tsx", "README.md", "routeTree.gen.ts"]);

function fileToRoute(file: string): string | null {
  if (EXCLUDE.has(file)) return null;
  if (file.endsWith(".test.ts") || file.endsWith(".test.tsx")) return null;
  if (!file.endsWith(".tsx")) return null;
  // Skip layout/pathless routes, api routes, dynamic-only files, and admin
  // routes (admin pages aren't part of the public a11y/animation suite).
  if (file.startsWith("_") || file.startsWith("api") || file.startsWith("admin")) return null;
  const base = file.replace(/\.tsx$/, "");
  if (base === "index") return "/";
  // dots → slashes, but skip dynamic segments (contain $)
  if (base.includes("$")) return null;
  return "/" + base.replaceAll(".", "/").replace(/\/index$/, "");
}

describe("e2e/routes.ts covers every public route", () => {
  it("has an entry for every route file in src/routes/", () => {
    const files = readdirSync(ROUTES_DIR);
    const discovered = files
      .map(fileToRoute)
      .filter((r): r is string => r !== null)
      .sort();

    const listed = ([...PUBLIC_ROUTES] as string[]).sort();
    const missing = discovered.filter((r) => !listed.includes(r));
    const stale = listed.filter((r) => !discovered.includes(r));

    expect(
      missing,
      `Add these routes to e2e/routes.ts PUBLIC_ROUTES:\n  ${missing.join("\n  ")}`,
    ).toEqual([]);
    expect(
      stale,
      `Remove these dead routes from e2e/routes.ts PUBLIC_ROUTES:\n  ${stale.join("\n  ")}`,
    ).toEqual([]);
  });

  it("VISUAL_ROUTES is a non-empty subset of PUBLIC_ROUTES with unique names", () => {
    const listed = new Set<string>(PUBLIC_ROUTES as readonly string[]);
    expect(VISUAL_ROUTES.length).toBeGreaterThanOrEqual(5);

    const notPublic = VISUAL_ROUTES.filter((r) => !listed.has(r.path));
    expect(
      notPublic,
      `VISUAL_ROUTES entries must exist in PUBLIC_ROUTES:\n  ${notPublic
        .map((r) => r.path)
        .join("\n  ")}`,
    ).toEqual([]);

    const names = VISUAL_ROUTES.map((r) => r.name);
    const dupeNames = names.filter((n, i) => names.indexOf(n) !== i);
    expect(dupeNames, `Duplicate VISUAL_ROUTES names: ${dupeNames.join(", ")}`).toEqual([]);

    const paths = VISUAL_ROUTES.map((r) => r.path);
    const dupePaths = paths.filter((p, i) => paths.indexOf(p) !== i);
    expect(dupePaths, `Duplicate VISUAL_ROUTES paths: ${dupePaths.join(", ")}`).toEqual([]);
  });
});
