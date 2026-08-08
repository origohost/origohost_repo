import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ApplicationInput = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(120),
  phone: z.string().trim().max(32).optional().default(""),
  organization_name: z.string().trim().max(160).optional().default(""),
  designation: z.string().trim().max(160).optional().default(""),
  education: z.string().trim().max(240).optional().default(""),
  location: z.string().trim().max(120).optional().default(""),
  bio: z.string().trim().max(2000).optional().default(""),
  skills: z.array(z.string().trim().min(1).max(48)).max(30).default([]),
  interests: z.array(z.string().trim().min(1).max(48)).max(30).default([]),
  community_interests: z.array(z.string().trim().min(1).max(60)).max(20).default([]),
  referral_source: z.string().trim().max(120).optional().default(""),
  public_directory: z.boolean().default(false),
  consent: z.literal(true, { message: "You must accept the community terms" }),
});

export type ApplicationInputValues = z.infer<typeof ApplicationInput>;

/** The signed-in user's application + membership state. */
export const getMyMembership = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [appRes, profileRes] = await Promise.all([
      supabase.from("membership_applications").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("profiles").select("membership_status, full_name, email").eq("id", userId).maybeSingle(),
    ]);
    return {
      application: appRes.data ?? null,
      membershipStatus: (profileRes.data?.membership_status as string) ?? "none",
      profile: profileRes.data ?? null,
    };
  });

/** Creates or updates the caller's single membership application. */
export const submitMembershipApplication = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => ApplicationInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId, claims } = context;
    const email = (claims as { email?: string }).email ?? "";

    const { data: existing } = await supabase
      .from("membership_applications")
      .select("id, status")
      .eq("user_id", userId)
      .maybeSingle();

    if (existing && existing.status !== "pending") {
      return { ok: true as const, status: existing.status as string, alreadyDecided: true as const };
    }

    const payload = {
      user_id: userId,
      full_name: data.full_name,
      email,
      phone: data.phone || null,
      organization_name: data.organization_name || null,
      designation: data.designation || null,
      education: data.education || null,
      location: data.location || null,
      bio: data.bio || null,
      skills: data.skills,
      interests: data.interests,
      community_interests: data.community_interests,
      referral_source: data.referral_source || null,
      public_directory: data.public_directory,
      consent: data.consent,
      status: "pending" as const,
    };

    const { error } = existing
      ? await supabase.from("membership_applications").update(payload).eq("id", existing.id)
      : await supabase.from("membership_applications").insert(payload);
    if (error) throw new Error(error.message);

    // Keep the person record in sync — one source of truth for identity.
    await supabase
      .from("profiles")
      .update({
        full_name: data.full_name,
        phone: data.phone || null,
        organization_name: data.organization_name || null,
        designation: data.designation || null,
        education: data.education || null,
        location: data.location || null,
        bio: data.bio || null,
        skills: data.skills,
        technology_interests: data.interests,
        professional_interests: data.community_interests,
        visibility: data.public_directory ? "public" : "community_only",
        membership_status: "pending",
        onboarded_at: new Date().toISOString(),
      })
      .eq("id", userId);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("notification_events").insert({
      kind: "membership_application_received",
      recipient_user_id: userId,
      recipient_email: email || null,
      payload: { full_name: data.full_name },
    });

    return { ok: true as const, status: "pending" as const, alreadyDecided: false as const };
  });
