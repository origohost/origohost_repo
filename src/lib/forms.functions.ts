import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Public form submissions. Input is validated server-side, then written with
 * the privileged client because these tables are readable only by admins.
 */

const ContactInput = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  organization: z.string().trim().max(160).optional().default(""),
  subject: z.string().trim().max(200).optional().default(""),
  category: z.string().trim().max(80).optional().default("General Inquiry"),
  message: z.string().trim().min(10, "Please add a few more details").max(4000),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional().default(""),
});

export type ContactInputValues = z.infer<typeof ContactInput>;

export const submitContactEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactInput.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("contact_enquiries")
      .insert({
        name: data.name,
        email: data.email.toLowerCase(),
        subject: data.subject || null,
        category: data.category || null,
        message: data.organization ? `${data.message}\n\nOrganisation: ${data.organization}` : data.message,
      })
      .select("id")
      .single();
    if (error) throw new Error("We couldn't record your message. Please try again.");

    await supabaseAdmin.from("notification_events").insert({
      kind: "contact_enquiry_received",
      recipient_email: data.email.toLowerCase(),
      payload: { enquiry_id: row.id, category: data.category },
    });

    return { ok: true as const, id: row.id };
  });

const HostingInput = z.object({
  contact_name: z.string().trim().min(1).max(120),
  contact_email: z.string().trim().email().max(255),
  organization: z.string().trim().max(160).optional().default(""),
  event_title: z.string().trim().min(3).max(200),
  event_type: z.string().trim().max(80).optional().default(""),
  description: z.string().trim().min(10).max(4000),
  expected_audience: z.string().trim().max(120).optional().default(""),
  preferred_date: z.string().trim().max(40).optional().default(""),
  location: z.string().trim().max(160).optional().default(""),
  mode: z.enum(["online", "offline", "hybrid"]).optional(),
  requirements: z.string().trim().max(2000).optional().default(""),
  website: z.string().max(0).optional().default(""),
});

export type HostingInputValues = z.infer<typeof HostingInput>;

export const submitEventHostingRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => HostingInput.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("event_hosting_requests")
      .insert({
        contact_name: data.contact_name,
        contact_email: data.contact_email.toLowerCase(),
        organization: data.organization || null,
        event_title: data.event_title,
        event_type: data.event_type || null,
        description: data.description,
        expected_audience: data.expected_audience || null,
        preferred_date: data.preferred_date ? data.preferred_date : null,
        location: data.location || null,
        mode: data.mode ?? null,
        requirements: data.requirements || null,
      })
      .select("id")
      .single();
    if (error) throw new Error("We couldn't record your request. Please try again.");

    await supabaseAdmin.from("notification_events").insert({
      kind: "event_hosting_request_received",
      recipient_email: data.contact_email.toLowerCase(),
      payload: { request_id: row.id, event_title: data.event_title },
    });

    return { ok: true as const, id: row.id };
  });
