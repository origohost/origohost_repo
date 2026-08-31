import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side authorization. Every admin mutation routes through here so
 * permission checks live in one auditable place instead of being re-derived
 * per server function.
 *
 * Two layers, both enforced server-side:
 *   1. `assertPermission` — data-driven check against `role_permissions`
 *      via the `has_permission` SECURITY DEFINER function.
 *   2. Postgres RLS — the caller's own client is used for every query, so
 *      even a missed check cannot read or write rows the policies forbid.
 */

export const PERMISSIONS = {
  cmsRead: "cms.read",
  cmsWrite: "cms.write",
  cmsPublish: "cms.publish",
  mediaWrite: "media.write",
  crmRead: "crm.read",
  crmWrite: "crm.write",
  eventsRead: "events.read",
  eventsWrite: "events.write",
  eventsPublish: "events.publish",
  eventsAttendance: "events.attendance",
  communityRead: "community.read",
  communityWrite: "community.write",
  membersReview: "members.review",
  chaptersRead: "chapters.read",
  chaptersWrite: "chapters.write",
  partnershipsRead: "partnerships.read",
  partnershipsWrite: "partnerships.write",
  certificatesRead: "certificates.read",
  certificatesIssue: "certificates.issue",
  certificatesRevoke: "certificates.revoke",
  portalRead: "portal.read",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

/** Thrown when the caller is authenticated but lacks the required permission. */
export class ForbiddenError extends Error {
  readonly code = "FORBIDDEN";
  constructor(permission?: string) {
    super(
      permission
        ? `You do not have permission to perform this action (${permission}).`
        : "You do not have permission to perform this action.",
    );
    this.name = "ForbiddenError";
  }
}

type Client = SupabaseClient<any>;

/** Reads the caller's roles through their own RLS-scoped client. */
export async function getRoles(supabase: Client, userId: string): Promise<string[]> {
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  return (data ?? []).map((row: { role: string }) => row.role);
}

/** True when the caller holds `permission` (or a wildcard) through any role. */
export async function hasPermission(
  supabase: Client,
  userId: string,
  permission: Permission,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("has_permission", {
    _user_id: userId,
    _permission: permission,
  });
  if (error) return false;
  return data === true;
}

/** Throws `ForbiddenError` unless the caller holds `permission`. */
export async function assertPermission(
  supabase: Client,
  userId: string,
  permission: Permission,
): Promise<void> {
  if (!(await hasPermission(supabase, userId, permission))) {
    throw new ForbiddenError(permission);
  }
}

/** Throws unless the caller holds at least one of `permissions`. */
export async function assertAnyPermission(
  supabase: Client,
  userId: string,
  permissions: readonly Permission[],
): Promise<void> {
  for (const permission of permissions) {
    if (await hasPermission(supabase, userId, permission)) return;
  }
  throw new ForbiddenError(permissions.join(" | "));
}

/** True when the caller can reach any part of the admin portal. */
export async function isAnyAdmin(supabase: Client, userId: string): Promise<boolean> {
  const roles = await getRoles(supabase, userId);
  return roles.some(
    (role) => role === "super_admin" || role === "editor" || role === "reviewer" || role.endsWith("_admin"),
  );
}

/**
 * Writes an audit row for an administrative mutation.
 * Never throws — auditing must not break the operation it records, but a
 * failure is surfaced in the server log so it can be investigated.
 */
export async function audit(
  supabase: Client,
  action: string,
  entityType: string,
  entityId?: string | null,
  metadata: Record<string, unknown> = {},
): Promise<void> {
  try {
    const { error } = await supabase.rpc("log_audit", {
      _action: action,
      _entity_type: entityType,
      _entity_id: entityId ?? null,
      _metadata: metadata as never,
    });
    if (error) console.error("[audit] failed to record", action, entityType, error.message);
  } catch (error) {
    console.error("[audit] threw while recording", action, entityType, error);
  }
}

/** Normalises a title into a URL slug. */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}
