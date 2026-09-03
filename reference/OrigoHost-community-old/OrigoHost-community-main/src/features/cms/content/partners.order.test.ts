import { describe, expect, it } from "vitest";
import { partnersContent, PartnersContentOrderedSchema } from "./partners";

/**
 * Guardrails for the DB-authoritative ordering rules on /partners.
 *
 * The admin UI is now the source of truth for order — the schema no longer
 * pins to a hard-coded reference list. Instead it enforces the two invariants
 * that keep the grid coherent regardless of who reorders it:
 *
 *   - every `name` is non-empty (after trim)
 *   - names are unique within each list (case-insensitive)
 *
 * These tests prove the Zod refinement catches both classes of drift with
 * precise per-index paths so the admin UI can highlight the failing row.
 */
describe("partners content — validation rules", () => {
  it("accepts the unmodified shipped defaults", () => {
    expect(PartnersContentOrderedSchema.safeParse(partnersContent).success).toBe(true);
  });

  it("rejects an empty name in `logos` with a precise path", () => {
    const bad = {
      ...partnersContent,
      logos: partnersContent.logos.map((l, i) => (i === 2 ? { ...l, name: "   " } : l)),
    };
    const result = PartnersContentOrderedSchema.safeParse(bad);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === "logos" && i.path[1] === 2);
      expect(issue?.message).toContain("must not be empty");
    }
  });

  it("rejects a duplicate name in `logos` (case-insensitive)", () => {
    const bad = {
      ...partnersContent,
      logos: [
        ...partnersContent.logos,
        // Different case, same name → still a duplicate.
        { name: partnersContent.logos[0]!.name.toUpperCase() },
      ],
    };
    const result = PartnersContentOrderedSchema.safeParse(bad);
    expect(result.success).toBe(false);
    if (!result.success) {
      const dup = result.error.issues.find((i) => i.message.includes("duplicate"));
      expect(dup?.path[0]).toBe("logos");
      expect(dup?.message).toContain("also at index 0");
    }
  });

  it("rejects a duplicate name in `institutes` independently of `logos`", () => {
    const institutes = partnersContent.institutes ?? [];
    const bad = {
      ...partnersContent,
      institutes: [...institutes, { name: institutes[3]!.name }],
    };
    const result = PartnersContentOrderedSchema.safeParse(bad);
    expect(result.success).toBe(false);
    if (!result.success) {
      const dup = result.error.issues.find(
        (i) => i.path[0] === "institutes" && i.message.includes("duplicate"),
      );
      expect(dup).toBeDefined();
    }
  });

  it("accepts a freely reordered list (order is not pinned)", () => {
    // Reversing used to fail under the old CLIENTELE_ORDER regime; now it
    // must pass because ordering is DB-authoritative.
    const reordered = {
      ...partnersContent,
      logos: [...partnersContent.logos].reverse(),
    };
    expect(PartnersContentOrderedSchema.safeParse(reordered).success).toBe(true);
  });

  it("accepts adding and removing entries (length is not pinned)", () => {
    const shorter = {
      ...partnersContent,
      logos: partnersContent.logos.slice(0, 10),
    };
    expect(PartnersContentOrderedSchema.safeParse(shorter).success).toBe(true);

    const longer = {
      ...partnersContent,
      logos: [...partnersContent.logos, { name: "NewPartnerCo", domain: "newpartner.com" }],
    };
    expect(PartnersContentOrderedSchema.safeParse(longer).success).toBe(true);
  });
});
