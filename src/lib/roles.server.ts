import type { SupabaseClient } from "@supabase/supabase-js";

export const ADMIN_ROLES = [
  "super_admin",
  "platform_admin",
  "content_admin",
  "crm_admin",
  "events_admin",
  "community_admin",
  "chapter_admin",
  "partnership_admin",
  "certificate_admin",
] as const;

export type AppRole = string;

/** Reads the caller's roles through their own RLS-scoped client. */
export async function getRoles(supabase: SupabaseClient<any>, userId: string): Promise<string[]> {
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  return (data ?? []).map((r: { role: string }) => r.role);
}

/** Throws unless the caller holds at least one of `allowed` (super_admin always passes). */
export async function assertRole(
  supabase: SupabaseClient<any>,
  userId: string,
  allowed: readonly string[],
): Promise<string[]> {
  const roles = await getRoles(supabase, userId);
  const ok = roles.includes("super_admin") || roles.includes("platform_admin") || roles.some((r) => allowed.includes(r));
  if (!ok) throw new Error("Forbidden");
  return roles;
}

export async function assertAnyAdmin(supabase: SupabaseClient<any>, userId: string) {
  return assertRole(supabase, userId, ADMIN_ROLES);
}

/** Writes an audit entry. Never throws — auditing must not break the operation. */
export async function audit(
  supabase: SupabaseClient<any>,
  action: string,
  entityType: string,
  entityId?: string | null,
  metadata: Record<string, unknown> = {},
) {
  try {
    await supabase.rpc("log_audit", {
      _action: action,
      _entity_type: entityType,
      _entity_id: entityId ?? null,
      _metadata: metadata,
    });
  } catch {
    /* ignore */
  }
}
