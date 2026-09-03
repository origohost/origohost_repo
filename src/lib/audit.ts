import { supabase } from "@/integrations/supabase/client";

export async function logSecurityEvent(
  action: string,
  userId?: string,
  ipAddress?: string,
  metadata?: Record<string, any>,
) {
  try {
    const { error } = await supabase.from("security_audit_logs").insert({
      action,
      user_id: userId || null,
      ip_address: ipAddress || null,
      metadata: metadata || {},
    });

    if (error) {
      console.error("[Audit Log Failed]", error);
    }
  } catch (err) {
    console.error("[Audit Log Fatal]", err);
  }
}
