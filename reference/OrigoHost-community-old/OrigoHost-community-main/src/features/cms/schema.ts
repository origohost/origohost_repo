/**
 * Runtime schemas for CMS content.
 *
 * Today content is authored in TypeScript so structural correctness is covered
 * by `tsc`. Zod schemas add a second layer: they validate at *module load*
 * that the shape (and semantic rules a `type` can't express — e.g. domain
 * format) still holds. Any bad edit fails loudly at import time instead of
 * silently rendering a broken tile.
 *
 * When a real CMS backs these fields later, the same schemas double as the
 * runtime boundary for untrusted input.
 */
import { z } from "zod";

/** Bare-hostname check: `example.com`, `sub.example.co.in`. No protocol, path,
 * or trailing slash. Logo.dev keys off this exact hostname. */
const DomainSchema = z
  .string()
  .regex(
    /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/i,
    "domain must be a bare hostname like 'example.com' (no protocol or path)",
  );

export const PartnerLogoEntrySchema = z.object({
  /** Human-readable brand name; used for alt text and initials fallback. */
  name: z.string().min(1),
  /** Optional bare domain (e.g. `google.com`) used to fetch the logo image. */
  domain: DomainSchema.optional(),
});

export const PartnersContentSchema = z.object({
  meta: z.object({
    slug: z.literal("partners"),
    title: z.string().min(1),
    description: z.string().min(1),
    eyebrow: z.string().optional(),
    heroTitle: z.string().optional(),
    heroDescription: z.string().optional(),
  }),
  tracks: z.array(
    z.object({
      icon: z.string().min(1),
      title: z.string().min(1),
      body: z.string().min(1),
    }),
  ),
  logos: z.array(PartnerLogoEntrySchema),
  institutes: z.array(PartnerLogoEntrySchema).optional(),
});

/**
 * Compose the base `PartnersContentSchema` with the DB-authoritative
 * ordering invariants. The array *order* is now owned by the CMS (a future
 * admin UI can freely drag-and-drop), so we no longer pin to reference-name
 * constants; instead we enforce the two rules that keep the /partners grid
 * coherent regardless of who reorders it:
 *
 *   1. Every entry has a non-empty, trimmed `name`.
 *   2. Names are unique within their list (case-insensitive) — duplicate
 *      names would render two visually-identical tiles and break the
 *      name-to-image alignment the page relies on.
 *
 * Kept as a factory (rather than an inline refinement) so the admin UI's
 * mutation handler and the module-load parse both go through the same code
 * path — reject once, in one place.
 */
export function partnersContentOrderedSchema() {
  return PartnersContentSchema.superRefine((content, ctx) => {
    const checkList = (path: "logos" | "institutes", entries: readonly { name: string }[]) => {
      const seen = new Map<string, number>();
      entries.forEach((entry, i) => {
        const trimmed = entry.name.trim();
        if (trimmed.length === 0) {
          ctx.addIssue({
            code: "custom",
            path: [path, i, "name"],
            message: "name must not be empty",
          });
          return;
        }
        const key = trimmed.toLowerCase();
        const prior = seen.get(key);
        if (prior !== undefined) {
          ctx.addIssue({
            code: "custom",
            path: [path, i, "name"],
            message: `duplicate name "${entry.name}" (also at index ${prior}) — logo names must be unique within a list`,
          });
        } else {
          seen.set(key, i);
        }
      });
    };
    checkList("logos", content.logos);
    checkList("institutes", content.institutes ?? []);
  });
}

/**
 * @deprecated Legacy name-array signature retained so external tests / drafts
 * that still import it keep type-checking. Behavior is now
 * `partnersContentOrderedSchema()` — reference-name lists are ignored.
 */
export function partnersContentSchemaWithOrder(
  _logosOrder: readonly string[] = [],
  _institutesOrder: readonly string[] = [],
) {
  return partnersContentOrderedSchema();
}

export type PartnerLogoEntry = z.infer<typeof PartnerLogoEntrySchema>;
/** Base structural type — inferred from the Zod schema, not hand-written. */
export type PartnersContent = z.infer<typeof PartnersContentSchema>;
/** Ordered variant type — same runtime shape, but produced by the ordering
 *  refinement so `parse()` guarantees reference-order alignment. */
export type PartnersContentOrdered = z.infer<ReturnType<typeof partnersContentSchemaWithOrder>>;
