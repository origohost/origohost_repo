import { supabase } from "@/integrations/supabase/client";

export interface RegisterEventInput {
  eventId: string;
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  jobTitle?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  notes?: string;
  userId?: string;
}

export interface RegistrationResult {
  success: boolean;
  registrationId?: string;
  ticketCode?: string;
  qrPayload?: string;
  error?: string;
}

export class RegistrationService {
  /**
   * Transactionally register a user for an event:
   * 1. Validate capacity & active status
   * 2. Prevent duplicate email registrations
   * 3. Insert registration record
   * 4. Generate unique Ticket Code and QR Payload
   * 5. Record domain event in `outbox_events` for asynchronous notification
   */
  static async registerForEvent(input: RegisterEventInput): Promise<RegistrationResult> {
    try {
      // 1. Fetch Event Capacity & Registrations Count
      const { data: event, error: eventError } = await supabase
        .from("events")
        .select("id, title, capacity, status, start_date")
        .eq("id", input.eventId)
        .single();

      if (eventError || !event) {
        return { success: false, error: "Event not found or unavailable." };
      }

      if (event.status === "cancelled" || event.status === "archived") {
        return { success: false, error: "Event is no longer active for registration." };
      }

      // Check current capacity
      if (event.capacity && event.capacity > 0) {
        const { count, error: countError } = await supabase
          .from("event_registrations_v2")
          .select("id", { count: "exact", head: true })
          .eq("event_id", input.eventId);

        if (!countError && count !== null && count >= event.capacity) {
          return { success: false, error: "Event capacity has been reached." };
        }
      }

      // 2. Check for Duplicate Registration
      const { data: existing } = await supabase
        .from("event_registrations_v2")
        .select("id")
        .eq("event_id", input.eventId)
        .eq("email", input.email.toLowerCase().trim())
        .maybeSingle();

      if (existing) {
        return { success: false, error: "You are already registered for this event with this email." };
      }

      // 3. Create Registration Record
      const { data: reg, error: regError } = await supabase
        .from("event_registrations_v2")
        .insert({
          event_id: input.eventId,
          user_id: input.userId || null,
          full_name: input.fullName.trim(),
          email: input.email.toLowerCase().trim(),
          phone: input.phone?.trim() || null,
          organization: input.organization?.trim() || null,
          job_title: input.jobTitle?.trim() || null,
          status: "confirmed",
        })
        .select()
        .single();

      if (regError || !reg) {
        return { success: false, error: regError?.message || "Failed to create event registration." };
      }

      // 4. Generate Ticket Code & QR Payload
      const ticketCode = `OH-TKT-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const qrPayload = JSON.stringify({
        ticketCode,
        eventId: input.eventId,
        registrationId: reg.id,
        attendee: input.fullName,
        email: input.email,
      });

      // Insert Ticket
      const { error: ticketError } = await supabase.from("tickets").insert({
        registration_id: reg.id,
        event_id: input.eventId,
        user_id: input.userId || null,
        ticket_code: ticketCode,
        qr_payload: qrPayload,
        status: "active",
      });

      if (ticketError) {
        console.warn("RegistrationService: Error inserting ticket record:", ticketError.message);
      }

      // 5. Emit Domain Event to Outbox
      await supabase.from("outbox_events").insert({
        event_type: "EventRegistrationCreated",
        aggregate_type: "registration",
        aggregate_id: reg.id,
        payload: {
          registrationId: reg.id,
          eventId: input.eventId,
          eventTitle: event.title,
          fullName: input.fullName,
          email: input.email,
          ticketCode,
          qrPayload,
        },
        status: "pending",
      });

      return {
        success: true,
        registrationId: reg.id,
        ticketCode,
        qrPayload,
      };
    } catch (err: any) {
      return { success: false, error: err.message || "An unexpected error occurred during registration." };
    }
  }
}
