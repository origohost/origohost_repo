import { supabase } from "@/integrations/supabase/client";

export interface AuditLogEntry {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  performed_by: string;
  created_at: string;
}

export class AdminWorkspaceService {
  /**
   * Log administrative action to `audit_logs`
   */
  static async logAdminAction(
    action: string,
    entityType: string,
    entityId: string,
    performedBy: string
  ): Promise<boolean> {
    try {
      const { error } = await supabase.from("audit_logs").insert({
        action,
        entity_type: entityType,
        entity_id: entityId,
        performed_by: performedBy,
      });

      if (error) {
        console.warn("AdminWorkspaceService: Error writing audit log:", error.message);
        return false;
      }
      return true;
    } catch (err: any) {
      console.error("AdminWorkspaceService: Exception writing audit log:", err);
      return false;
    }
  }

  /**
   * Fetch recent administrative audit logs
   */
  static async getAuditLogs(limit = 20): Promise<AuditLogEntry[]> {
    const { data, error } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.warn("AdminWorkspaceService: Error fetching audit logs:", error.message);
      return [];
    }
    return data || [];
  }
}
