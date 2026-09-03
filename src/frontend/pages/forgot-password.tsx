import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/layout/auth-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { buildSeo } from "@/lib/seo";
import { useAuth } from "@/hooks/use-auth";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

export const validatePasswordResetSecurityFn = createServerFn({ method: "POST" })
  .validator((data: { token: string }) => data)
  .handler(async (ctx) => {
    const { authRateLimiter } = await import("@/lib/rate-limit");

    const request = getRequest();
    const headers = request?.headers;
    const ip = headers?.get("x-forwarded-for")?.split(",")[0]?.trim() || headers?.get("x-real-ip") || "127.0.0.1";

    // 1. Strict Rate Limiting for Resets    // Rate Limiting (3 attempts / 15 mins)
    const rateLimit = await authRateLimiter.limit(ip);
    if (!rateLimit.success) {
      throw new Error("Too many requests. Please try again later.");
    }

    return { success: true };
  });

export default function ForgotPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    try {
      // Rate Limiting
      await validatePasswordResetSecurityFn({ data: { token: "" } });

      await resetPassword(email.trim());
      setSent(true);
      toast.success("Check your inbox for a reset link.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send reset email");
    } finally {
      setSending(false);
    }
  }

  return (
    <AuthShell
      title={sent ? "Check your inbox" : "Forgot your password?"}
      subtitle={
        sent
          ? "We've emailed you a link to reset your password."
          : "Enter your email and we'll send you a reset link."
      }
      footer={
        <Link to="/login" className="font-semibold text-[var(--brand-orange)]">
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <Button
          onClick={() => navigate({ to: "/login" })}
          className="w-full rounded-full bg-[var(--brand-ink)] py-6 text-white hover:bg-[var(--brand-ink)]/90"
        >
          Return to sign in
        </Button>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>



          <Button
            type="submit"
            disabled={sending}
            className="w-full rounded-full bg-[var(--brand-ink)] py-6 text-white hover:bg-[var(--brand-ink)]/90 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send reset link"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
