import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Automation layer.
 *
 * Domain code calls `emit(...)` when something meaningful happens. That single
 * call records an `automation_runs` row per enabled workflow subscribed to the
 * trigger, then executes the workflow's declared actions. Adding a new
 * behaviour means inserting an `automation_workflows` row — not editing
 * domain code — which keeps the system extensible.
 *
 * Delivery of member-facing messages is queued into `notification_events`,
 * which stays the single outbound queue.
 */

export const TRIGGERS = {
  eventRegistered: "event.registered",
  eventUpcoming: "event.upcoming",
  eventCompleted: "event.completed",
  attendanceConfirmed: "event.attendance_confirmed",
  certificateIssued: "certificate.issued",
  certificateRevoked: "certificate.revoked",
  membershipApplied: "membership.applied",
  membershipApproved: "membership.approved",
  membershipRejected: "membership.rejected",
  partnershipLeadCreated: "partnership.lead_created",
  enquiryReceived: "enquiry.received",
  hostingRequestReceived: "hosting_request.received",
  chapterApproved: "chapter.approved",
} as const;

export type Trigger = (typeof TRIGGERS)[keyof typeof TRIGGERS];

export type EmitContext = {
  /** Member the workflow concerns, when there is one. */
  userId?: string | null;
  email?: string | null;
  subjectType?: string | null;
  subjectId?: string | null;
  payload?: Record<string, unknown>;
};

type AdminClient = SupabaseClient<any>;

type WorkflowAction =
  | { type: "notify_member"; template: string }
  | { type: "notify_admins"; template: string }
  | { type: "create_interaction"; kind?: string }
  | { type: "mark_certificate_eligible" }
  | { type: string; [key: string]: unknown };

/**
 * Records and runs every enabled workflow bound to `trigger`.
 * Uses the service-role client because workflow bookkeeping is platform
 * infrastructure, not a user-scoped action. Never throws: automation must not
 * roll back the business operation that triggered it.
 */
export async function emit(trigger: Trigger, context: EmitContext = {}): Promise<void> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const admin = supabaseAdmin as AdminClient;

    const { data: workflows } = await admin
      .from("automation_workflows")
      .select("key, actions")
      .eq("trigger_event", trigger)
      .eq("is_enabled", true);

    if (!workflows?.length) return;

    for (const workflow of workflows) {
      await runWorkflow(admin, trigger, workflow.key as string, workflow.actions as WorkflowAction[], context);
    }
  } catch (error) {
    console.error(`[automation] emit(${trigger}) failed`, error);
  }
}

async function runWorkflow(
  admin: AdminClient,
  trigger: Trigger,
  workflowKey: string,
  actions: WorkflowAction[],
  context: EmitContext,
): Promise<void> {
  const startedAt = new Date().toISOString();
  const { data: run } = await admin
    .from("automation_runs")
    .insert({
      workflow_key: workflowKey,
      trigger_event: trigger,
      status: "running",
      subject_type: context.subjectType ?? null,
      subject_id: context.subjectId ?? null,
      payload: (context.payload ?? {}) as never,
      attempts: 1,
      started_at: startedAt,
    })
    .select("id")
    .maybeSingle();

  const performed: string[] = [];
  try {
    for (const action of actions ?? []) {
      await performAction(admin, action, trigger, context);
      performed.push(action.type);
    }
    if (run?.id) {
      await admin
        .from("automation_runs")
        .update({
          status: "succeeded",
          result: { actions: performed } as never,
          finished_at: new Date().toISOString(),
        })
        .eq("id", run.id);
    }
  } catch (error) {
    console.error(`[automation] workflow ${workflowKey} failed`, error);
    if (run?.id) {
      await admin
        .from("automation_runs")
        .update({
          status: "failed",
          result: { actions: performed } as never,
          error: error instanceof Error ? error.message : String(error),
          finished_at: new Date().toISOString(),
        })
        .eq("id", run.id);
    }
  }
}

async function performAction(
  admin: AdminClient,
  action: WorkflowAction,
  trigger: Trigger,
  context: EmitContext,
): Promise<void> {
  switch (action.type) {
    case "notify_member": {
      if (!context.userId && !context.email) return;
      await admin.from("notification_events").insert({
        kind: String(action.template ?? trigger),
        recipient_user_id: context.userId ?? null,
        recipient_email: context.email ?? null,
        payload: (context.payload ?? {}) as never,
      });
      return;
    }

    case "notify_admins": {
      await admin.from("notification_events").insert({
        kind: String(action.template ?? trigger),
        recipient_user_id: null,
        recipient_email: null,
        payload: { ...(context.payload ?? {}), audience: "admins" } as never,
      });
      return;
    }

    case "create_interaction": {
      if (!context.subjectType || !context.subjectId) return;
      await admin.from("interactions").insert({
        entity_type: context.subjectType as never,
        entity_id: context.subjectId,
        kind: (action.kind ?? "task") as never,
        subject: `Follow up: ${trigger}`,
        body: null,
        metadata: (context.payload ?? {}) as never,
      });
      return;
    }

    case "mark_certificate_eligible": {
      // Eligibility is derived from confirmed attendance rather than stored as
      // a duplicate flag, so this action only records that the gate was passed.
      return;
    }

    default:
      console.warn(`[automation] unknown action type "${action.type}" for ${trigger}`);
  }
}
