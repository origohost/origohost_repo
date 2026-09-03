import { createServerFn } from "@tanstack/react-start";
import { escapeHtml } from "@/lib/escape-html";
import { z } from "zod";

const hostEventEmailSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  eventType: z.string().min(1, "Event type is required"),
  expectedParticipants: z.string().optional(),
  expectedDate: z.string().optional(),
});

export type HostEventEmailData = z.infer<typeof hostEventEmailSchema>;

export const submitHostEventEmailFn = createServerFn({ method: "POST" })
  .validator((d: HostEventEmailData) => hostEventEmailSchema.parse(d))
  .handler(async ({ data }) => {
    // 1. Send email via Resend
    const { Resend } = await import("resend");
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("[Host Form] RESEND_API_KEY is missing. Email will not be sent.");
      return { success: true, warning: "Notification failed." };
    }

    const resend = new Resend(apiKey);

    try {
      const { data: emailData, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "origohostscommunity@gmail.com",
        subject: `New Host Event Application: ${escapeHtml(data.organizationName)}`,
        html: `
          <h2>New Host Event Application</h2>
          <p><strong>Organization:</strong> ${escapeHtml(data.organizationName)}</p>
          <p><strong>Contact Name:</strong> ${escapeHtml(data.fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
          <p><strong>Event Type:</strong> ${escapeHtml(data.eventType)}</p>
          <p><strong>Expected Attendees:</strong> ${escapeHtml(data.expectedParticipants || "N/A")}</p>
          <p><strong>Target Date:</strong> ${data.expectedDate ? escapeHtml(new Date(data.expectedDate).toDateString()) : "Flexible"}</p>
        `,
      });

      if (error) {
        console.error("[Host Form] Resend API Error:", error.message);
        return { success: true, warning: "Notification failed." };
      }

      return { success: true, emailId: emailData?.id };
    } catch (e: any) {
      console.error("[Host Form] Unexpected Email Error:", e.message);
      return { success: true, warning: "Notification failed." };
    }
  });
