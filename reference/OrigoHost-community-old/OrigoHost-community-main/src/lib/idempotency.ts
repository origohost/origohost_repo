import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "http://mock";
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || "mock";

// Create a singleton service role client for server-side administrative tasks
export const getSupabaseAdmin = () => {
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    throw new Error("Missing Supabase environment variables for server administration.");
  }
  return createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

/**
 * Checks and sets an idempotency key.
 * @returns true if successful (new key), false if key already exists (duplicate)
 */
export async function checkIdempotency(
  key: string | undefined,
  formType: string,
): Promise<boolean> {
  if (!key) {
    console.warn("[Idempotency] Missing key for formType:", formType);
    throw new Error("Missing idempotency key. Request rejected.");
  }

  const admin = getSupabaseAdmin();

  // Try to insert the idempotency key.
  // It has a UNIQUE constraint, so duplicates will throw a 23505 (unique_violation) error.
  const { error } = await admin.from("submission_idempotency").insert({
    idempotency_key: key,
    form_type: formType,
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
  });

  if (error) {
    // 23505 is the PostgreSQL error code for unique_violation
    if (error.code === "23505") {
      return false; // Duplicate
    }
    // If it's a different error (e.g., table doesn't exist yet because migration wasn't pushed),
    // we log and fail open (allow submission) to prevent blocking prod before migration is run.
    console.warn("[Idempotency] Failed to store key, allowing request:", error.message);
    return true;
  }

  return true; // Successfully stored, not a duplicate
}

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const reserveIdempotencyKeyFn = createServerFn({ method: "POST" })
  .validator(z.object({ key: z.string(), formType: z.string() }))
  .handler(async ({ data }) => {
    const isNew = await checkIdempotency(data.key, data.formType);
    return { success: true, isNew };
  });
