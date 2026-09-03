import { createServerFn } from "@tanstack/react-start";
import { ambassadorApplicationSchema, type AmbassadorApplicationData } from "./schema";
import { escapeHtml } from "@/lib/escape-html";

export const submitApplicationFn = createServerFn({ method: "POST" })
  .validator(
    (d: AmbassadorApplicationData & { idempotencyKey?: string }) => d,
  )
  .handler(async ({ data }) => {
    const { getSupabaseAdmin, checkIdempotency } = await import("@/lib/idempotency");
    const { ambassadorRateLimiter } = await import("@/lib/rate-limit");

    // 0. Rate Limiting
    const ip = "127.0.0.1"; // Default for demo, should be read from req headers in prod
    const rateLimit = await ambassadorRateLimiter.limit(ip);
    if (!rateLimit.success) {
      throw new Error("Too many submissions. Please try again later.");
    }

    // 1. Check idempotency
    const isNew = await checkIdempotency(data.idempotencyKey, "ambassador");
    if (!isNew) {
      return { success: true, message: "Duplicate application ignored safely." };
    }

    // 2. Insert into Supabase
    let dbSuccess = false;
    const admin = getSupabaseAdmin();
    try {
      const { error } = await admin.from("ambassador_applications").insert({
        user_id: null,
        status: "submitted",
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        gender: data.gender,
        nationality: data.nationality,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        education: data.education,
        skills: data.skills,
        experience: data.experience,
        questions: data.questions,
        submitted_at: new Date().toISOString(),
      });

      if (error) {
        console.error("[Ambassador Form] DB Insert Error:", error.message);
      } else {
        dbSuccess = true;
      }
    } catch (e: any) {
      console.error("[Ambassador Form] Unexpected DB Error:", e.message);
    }

    // 3. Send email via Resend
    const { Resend } = await import("resend");
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("[Ambassador Form] RESEND_API_KEY is missing. Email will not be sent.");
      if (dbSuccess)
        return { success: true, warning: "Saved to database, but notification failed." };
      throw new Error("Unable to process application at this time.");
    }

    const resend = new Resend(apiKey);

    try {
      const { data: emailData, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "origohostscommunity@gmail.com",
        subject: `New Ambassador Application: ${escapeHtml(data.full_name)}`,
        html: `
          <h2>New Campus Ambassador Application</h2>
          <h3>Personal Details</h3>
          <p><strong>Name:</strong> ${escapeHtml(data.full_name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
          <p><strong>City:</strong> ${escapeHtml(data.city)}, ${escapeHtml(data.state)}</p>
          
          <h3>Education</h3>
          <p><strong>College:</strong> ${escapeHtml(data.education.university)}</p>
          <p><strong>Major:</strong> ${escapeHtml(data.education.major)}</p>
          <p><strong>Degree:</strong> ${escapeHtml(data.education.degree)}</p>
          <p><strong>Graduation Year:</strong> ${escapeHtml(data.education.expectedGraduation)}</p>
          
          <h3>Socials</h3>
          <p><strong>LinkedIn:</strong> ${escapeHtml(data.social.linkedin || "N/A")}</p>
          <p><strong>GitHub:</strong> ${escapeHtml(data.social.github || "N/A")}</p>
          
          <h3>Motivation</h3>
          <p><strong>Why OrigoHOSTs:</strong> ${escapeHtml(data.questions.whyOrigoHOSTs)}</p>
          <p><strong>Growth Strategy:</strong> ${escapeHtml(data.questions.strategy)}</p>
        `,
      });

      if (error) {
        console.error("[Ambassador Form] Resend API Error:", error.message);
        if (dbSuccess)
          return { success: true, warning: "Saved to database, but notification failed." };
        throw new Error("Unable to process application at this time.");
      }

      return { success: true, emailId: emailData?.id };
    } catch (e: any) {
      console.error("[Ambassador Form] Unexpected Email Error:", e.message);
      if (dbSuccess)
        return { success: true, warning: "Saved to database, but notification failed." };
      throw new Error("Unable to process application at this time.");
    }
  });
