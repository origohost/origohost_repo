import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PUBLIC_ROUTES } from "./routes";

/**
 * Strict axe-core gate for every route, plus artifact writer:
 *   - test-results/axe-reports/<route>.json  → full raw axe result
 *   - test-results/axe-reports/<route>.html  → readable per-route report
 *   - test-results/axe-reports/summary.json  → aggregated counts
 *   - test-results/axe-reports/summary.md    → human-readable summary
 *
 * The GitHub Action uploads test-results/axe-reports as an artifact.
 */

const OUT_DIR = join(process.cwd(), "test-results", "axe-reports");
mkdirSync(OUT_DIR, { recursive: true });

type Impact = "minor" | "moderate" | "serious" | "critical";
type Summary = Record<string, { serious: number; critical: number; ids: string[] }>;

function slug(route: string) {
  return route === "/" ? "root" : route.slice(1).replaceAll("/", "_");
}

function renderHtml(
  route: string,
  violations: Array<{
    id: string;
    impact?: Impact;
    help: string;
    helpUrl: string;
    nodes: unknown[];
  }>,
) {
  const rows = violations
    .map(
      (v) =>
        `<tr><td>${v.impact ?? ""}</td><td>${v.id}</td><td>${v.help}</td><td>${v.nodes.length}</td><td><a href="${v.helpUrl}">docs</a></td></tr>`,
    )
    .join("");
  return `<!doctype html><meta charset="utf-8"><title>axe ${route}</title>
<style>body{font:14px system-ui;padding:24px;max-width:960px;margin:auto}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ddd;padding:6px 10px;text-align:left}th{background:#f5f5f5}</style>
<h1>axe report — ${route}</h1><p>${violations.length} violation(s)</p>
<table><thead><tr><th>impact</th><th>rule</th><th>description</th><th>nodes</th><th>docs</th></tr></thead><tbody>${rows}</tbody></table>`;
}

const summary: Summary = {};

for (const route of PUBLIC_ROUTES) {
  test(`axe strict gate: ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const s = slug(route);
    writeFileSync(join(OUT_DIR, `${s}.json`), JSON.stringify(results, null, 2));
    writeFileSync(
      join(OUT_DIR, `${s}.html`),
      renderHtml(
        route,
        results.violations.map((v) => ({
          id: v.id,
          impact: v.impact as Impact | undefined,
          help: v.help,
          helpUrl: v.helpUrl,
          nodes: v.nodes,
        })),
      ),
    );

    const serious = results.violations.filter((v) => v.impact === "serious");
    const critical = results.violations.filter((v) => v.impact === "critical");
    summary[route] = {
      serious: serious.length,
      critical: critical.length,
      ids: [...critical, ...serious].map((v) => v.id),
    };

    writeFileSync(join(OUT_DIR, "summary.json"), JSON.stringify(summary, null, 2));
    const md = [
      "# axe per-route summary",
      "",
      "| route | critical | serious | rules |",
      "|-------|----------|---------|-------|",
      ...Object.entries(summary).map(
        ([r, v]) => `| \`${r}\` | ${v.critical} | ${v.serious} | ${v.ids.join(", ") || "—"} |`,
      ),
    ].join("\n");
    writeFileSync(join(OUT_DIR, "summary.md"), md);

    const gating = [...critical, ...serious];
    if (gating.length) {
      throw new Error(
        `axe found ${gating.length} serious/critical violation(s) on ${route}:\n` +
          gating
            .map((v) => `  [${v.impact}] ${v.id} — ${v.help} (${v.nodes.length} nodes)`)
            .join("\n"),
      );
    }
    expect(gating).toEqual([]);
  });
}
