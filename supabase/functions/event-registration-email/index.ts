import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// Import Resend via esm.sh
import { Resend } from "npm:resend";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(RESEND_API_KEY);

Deno.serve(async (req) => {
  // CORS Headers
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Parse the payload (Expects a Supabase Webhook payload for INSERT on event_registrations_v2)
    const payload = await req.json();
    const record = payload.record;

    if (!record || !record.user_id || !record.event_id) {
      throw new Error("Invalid payload");
    }

    // Fetch User Details
    const { data: user, error: userError } = await supabaseClient.auth.admin.getUserById(
      record.user_id,
    );
    if (userError || !user) throw new Error("Failed to get user");

    // Fetch Event Details
    const { data: event, error: eventError } = await supabaseClient
      .from("events_v2")
      .select("title, date, start_time, venue_name, mode")
      .eq("id", record.event_id)
      .single();
    if (eventError || !event) throw new Error("Failed to get event details");

    const emailHtml = `
      <div style="font-family: sans-serif; max-w-2xl; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2563eb;">You're in! 🎉</h1>
        <p>Hi ${user.user.email?.split("@")[0] || "there"},</p>
        <p>Your registration for <strong>${event.title}</strong> has been successfully confirmed.</p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Event Details:</h3>
          <ul style="list-style: none; padding: 0;">
            <li>📅 <strong>Date:</strong> ${event.date}</li>
            <li>⏰ <strong>Time:</strong> ${event.start_time}</li>
            <li>📍 <strong>Location:</strong> ${event.mode === "online" ? "Online Event" : event.venue_name || "TBA"}</li>
          </ul>
        </div>
        <p>We can't wait to see you there!</p>
        <p>Best,<br/>OrigoHOST Team</p>
      </div>
    `;

    // Send the email via Resend
    const data = await resend.emails.send({
      from: "OrigoHOST Events <noreply@origohost.in>", // Must match verified domain
      to: [user.user.email!],
      subject: `Registration Confirmed: ${event.title}`,
      html: emailHtml,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Error sending registration email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
