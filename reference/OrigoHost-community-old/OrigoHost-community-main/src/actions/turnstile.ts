import { supabase } from "@/integrations/supabase/client";

/**
 * Validates a Cloudflare Turnstile token on the server side.
 * @param token The turnstile response token from the frontend
 * @param ip The user's IP address (optional, for additional validation)
 * @returns boolean indicating if the token is valid
 */
export async function verifyTurnstileToken(token: string, ip?: string): Promise<boolean> {
  if (!token) return false;

  // For local development, if secret is not set, we bypass (or expect dummy key)
  const secretKey = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA"; // Dummy secret key for testing

  try {
    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (ip) {
      formData.append("remoteip", ip);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.success) {
      console.warn("[Turnstile Validation Failed]", data);

      // Log failed CAPTCHA to audit logs for monitoring
      await supabase.from("security_audit_logs").insert({
        action: "CAPTCHA_FAILED",
        metadata: { ip, errorCodes: data["error-codes"] },
      });
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Turnstile Request Error]", error);
    return false;
  }
}
