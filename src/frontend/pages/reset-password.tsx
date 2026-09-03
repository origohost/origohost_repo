import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/layout/auth-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { buildSeo } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

/**
 * /reset-password
 *
 * Landing page from the "Forgot password" email. Supabase redirects the
 * user here with a recovery session already applied to the client.
 * We show a "set new password" form and call updateUser({ password }).
 */

export default function ResetPasswordPage() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // The recovery link puts a session in place before this route mounts.
    // Confirm we actually have a user; otherwise nudge back to /forgot-password.
    void supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        toast.error("Reset link expired — request a new one.");
        navigate({ to: "/forgot-password" });
        return;
      }
      setReady(true);
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords don't match");
      return;
    }
    setSaving(true);
    try {
      await updatePassword(password);
      toast.success("Password updated — you're signed in.");
      navigate({ to: "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update password");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AuthShell
      title="Set a new password"
      subtitle="Pick something you'll remember."
      footer={
        <Link to="/login" className="font-semibold text-[var(--brand-orange)]">
          Back to sign in
        </Link>
      }
    >
      {!ready ? (
        <p className="text-sm text-[var(--brand-ink)]/70">Checking your reset link…</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              type="password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input
              id="confirm"
              type="password"
              minLength={8}
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-[var(--brand-ink)] py-6 text-white hover:bg-[var(--brand-ink)]/90 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Update password"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
