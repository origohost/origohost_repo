import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Event registration lifecycle for the signed-in member. */

export const getMyRegistration = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ slug: z.string().trim().min(1).max(160) }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: event } = await supabase
      .from("events")
      .select("id, title, capacity, registration_status, status")
      .eq("slug", data.slug)
      .maybeSingle();
    if (!event) return { event: null, registration: null };
    const { data: reg } = await supabase
      .from("event_registrations")
      .select("id, status, registered_at, attended")
      .eq("event_id", event.id)
      .eq("user_id", userId)
      .maybeSingle();
    return { event, registration: reg ?? null };
  });

export const registerForEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ slug: z.string().trim().min(1).max(160), notes: z.string().trim().max(500).optional() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: event } = await supabase
      .from("events")
      .select("id, title, capacity, registration_status, status, starts_at")
      .eq("slug", data.slug)
      .maybeSingle();
    if (!event) throw new Error("This event is no longer available.");
    if (event.status !== "published" && event.status !== "live") {
      throw new Error("Registration is not open for this event.");
    }
    if (!["open", "waitlist"].includes(event.registration_status as string)) {
      throw new Error("Registration is closed for this event.");
    }

    const { data: existing } = await supabase
      .from("event_registrations")
      .select("id, status")
      .eq("event_id", event.id)
      .eq("user_id", userId)
      .maybeSingle();
    if (existing && existing.status !== "cancelled") {
      return { ok: true as const, status: existing.status as string, duplicate: true as const };
    }

    let status: "registered" | "confirmed" = "registered";
    if (event.capacity) {
      const { count } = await supabase
        .from("event_registrations")
        .select("*", { count: "exact", head: true })
        .eq("event_id", event.id)
        .in("status", ["registered", "confirmed", "attended"]);
      if ((count ?? 0) >= event.capacity) {
        if (event.registration_status !== "waitlist") throw new Error("This event is full.");
      }
    }

    const payload = {
      event_id: event.id,
      user_id: userId,
      status,
      notes: data.notes ?? null,
      registered_at: new Date().toISOString(),
    };

    const { error } = existing
      ? await supabase.from("event_registrations").update(payload).eq("id", existing.id)
      : await supabase.from("event_registrations").insert(payload);
    if (error) throw new Error(error.message);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("notification_events").insert({
      kind: "event_registration_confirmed",
      recipient_user_id: userId,
      payload: { event_id: event.id, event_title: event.title },
    });

    return { ok: true as const, status, duplicate: false as const };
  });

export const cancelRegistration = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ registrationId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("event_registrations")
      .update({ status: "cancelled" })
      .eq("id", data.registrationId)
      .eq("user_id", userId);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
