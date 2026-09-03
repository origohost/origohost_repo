import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { escapeHtml } from "@/lib/escape-html";
import { z } from "zod";

// Zod schema for server-side validation
const sponsorApplicationSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  website: z.string().url("Must be a valid URL"),
  company_type: z.string().optional(),
  industry: z.string().optional(),
  company_size: z.string().optional(),
  gst_number: z.string().optional(),
  linkedin_company: z.string().optional(),
  headquarters: z.string().optional(),
  country: z.string().optional(),

  contact_name: z.string().min(1, "Contact name is required"),
  contact_designation: z.string().min(1, "Designation is required"),
  contact_email: z.string().email("Must be a valid email address"),
  contact_phone: z.string().min(1, "Phone number is required"),
  contact_linkedin: z.string().optional(),
  preferred_communication: z.string().optional(),

  interested_in: z.array(z.string()).optional(),
  budget_range: z.string().optional(),
  timeline: z.string().optional(),
  goals: z.array(z.string()).optional(),
  resources_provided: z.array(z.string()).optional(),

  detailed_message: z.string().optional(),
  special_requirements: z.string().optional(),
  expected_roi: z.string().optional(),
  previous_experience: z.string().optional(),

  logo_url: z.string().optional(),
  brand_kit_url: z.string().optional(),
  proposal_pdf_url: z.string().optional(),
  marketing_assets_url: z.string().optional(),
});

export type SponsorApplicationData = z.infer<typeof sponsorApplicationSchema>;

export const submitSponsorApplicationFn = createServerFn({ method: "POST" })
  .validator((d: SponsorApplicationData & { idempotencyKey?: string }) => d)
  .handler(async ({ data }) => {
    const { checkIdempotency, getSupabaseAdmin } = await import("@/lib/idempotency");

    // 1. Check idempotency
    const isNew = await checkIdempotency(data.idempotencyKey, "sponsor");
    if (!isNew) {
      return { success: true, message: "Duplicate application ignored safely." };
    }

    let dbSuccess = false;

    // 2. Insert into Supabase
    const admin = getSupabaseAdmin();
    try {
      const { error } = await admin.from("sponsor_applications").insert({
        company_name: data.company_name,
        website: data.website,
        company_type: data.company_type,
        industry: data.industry,
        company_size: data.company_size,
        gst_number: data.gst_number,
        linkedin_company: data.linkedin_company,
        headquarters: data.headquarters,
        country: data.country,
        contact_name: data.contact_name,
        contact_designation: data.contact_designation,
        contact_email: data.contact_email,
        contact_phone: data.contact_phone,
        contact_linkedin: data.contact_linkedin,
        preferred_communication: data.preferred_communication,
        interested_in: data.interested_in,
        budget_range: data.budget_range,
        timeline: data.timeline,
        goals: data.goals,
        resources_provided: data.resources_provided,
        detailed_message: data.detailed_message,
        special_requirements: data.special_requirements,
        expected_roi: data.expected_roi,
        previous_experience: data.previous_experience,
        logo_url: data.logo_url,
        brand_kit_url: data.brand_kit_url,
        proposal_pdf_url: data.proposal_pdf_url,
        marketing_assets_url: data.marketing_assets_url,
        status: "pending",
      });

      if (error) {
        console.error("[Sponsor Form] DB Insert Error:", error.message);
      } else {
        dbSuccess = true;
      }
    } catch (e: any) {
      console.error("[Sponsor Form] Unexpected DB Error:", e.message);
    }

    // 3. Send email via Resend
    const { Resend } = await import("resend");
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("[Sponsor Form] RESEND_API_KEY is missing. Email will not be sent.");
      if (dbSuccess)
        return { success: true, warning: "Saved to database, but notification failed." };
      throw new Error("Unable to process application at this time.");
    }

    const resend = new Resend(apiKey);

    try {
      const { data: emailData, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "origohostscommunity@gmail.com",
        subject: `New Sponsor Application: ${escapeHtml(data.company_name)}`,
        html: `
          <h2>New Sponsor Application</h2>
          <p><strong>Company Name:</strong> ${escapeHtml(data.company_name)}</p>
          <p><strong>Contact Name:</strong> ${escapeHtml(data.contact_name)}</p>
          <p><strong>Contact Email:</strong> ${escapeHtml(data.contact_email)}</p>
          <p><strong>Contact Phone:</strong> ${escapeHtml(data.contact_phone)}</p>
          <p><strong>Budget Range:</strong> ${escapeHtml(data.budget_range || "N/A")}</p>
          <p><strong>Detailed Message:</strong> ${escapeHtml(data.detailed_message || "N/A")}</p>
        `,
      });

      if (error) {
        console.error("[Sponsor Form] Resend API Error:", error.message);
        if (dbSuccess)
          return { success: true, warning: "Saved to database, but notification failed." };
        throw new Error("Unable to process application at this time.");
      }

      return { success: true, emailId: emailData?.id };
    } catch (e: any) {
      console.error("[Sponsor Form] Unexpected Email Error:", e.message);
      if (dbSuccess)
        return { success: true, warning: "Saved to database, but notification failed." };
      throw new Error("Unable to process application at this time.");
    }
  });
