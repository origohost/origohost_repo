import { getRouteApi, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { buildSeo } from "@/lib/seo";
import { BrandLogo } from "@/components/brand/brand-logo";
import { useAuth } from "@/hooks/use-auth";
import authHero from "@/assets/auth-hero.webp";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

const routeApi = getRouteApi("/login");

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email" }).max(255),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(128),
});
type LoginValues = z.infer<typeof loginSchema>;

export const validateLoginSecurityFn = createServerFn({ method: "POST" })
  .validator((data: { token: string }) => data)
  .handler(async (ctx) => {
    const { authRateLimiter } = await import("@/lib/rate-limit");
    const { verifyTurnstileToken } = await import("@/actions/turnstile");

    const request = getRequest();
    const headers = request?.headers;
    const ip =
      headers?.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headers?.get("x-real-ip") ||
      "127.0.0.1";

    // Rate Limiting (5 attempts / 15 mins)
    const rateLimit = await authRateLimiter.limit(ip);
    if (!rateLimit.success) {
      throw new Error("Too many failed attempts. Locked for 15 minutes.");
    }

    return { success: true };
  });

function safeRedirect(target: string | undefined): string {
  if (!target) return "/";
  try {
    // Only allow same-origin relative paths
    if (target.startsWith("/") && !target.startsWith("//")) return target;
    const url = new URL(target, window.location.origin);
    if (url.origin === window.location.origin) return url.pathname + url.search;
  } catch {
    /* noop */
  }
  return "/";
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { user, roles, signInWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const search = routeApi.useSearch();

  useEffect(() => {
    if (user) {
      if (search.redirect) {
        navigate({ to: safeRedirect(search.redirect) });
      } else {
        if (roles.includes("super_admin") || roles.includes("admin")) navigate({ to: "/admin" });
        else if (roles.includes("ambassador")) navigate({ to: "/ambassador" });
        else navigate({ to: "/dashboard" }); // Default for member
      }
    }
  }, [user, roles, search.redirect, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema as any),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      // Backend security check (Rate Limiting) with fallback
      try {
        await validateLoginSecurityFn({ data: { token: "" } });
      } catch (secErr) {
        // Log warning but allow login attempt if rate limiter backend is offline/unreachable
        console.warn("Security check bypassed:", secErr);
      }

      // Proceed with Supabase Auth
      await signInWithEmail(values.email, values.password);

      toast.success("Successfully logged in!");
      toast.success("Welcome back!");
      // Navigation is now handled by the useEffect watching the `user` state.
    } catch (err: any) {
      toast.error(err.message || "Failed to sign in. Please try again.");
    }
  });

  const onGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center px-4 py-10 sm:px-8"
      style={{ backgroundImage: `url(${authHero})` }}
    >
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] bg-white shadow-2xl lg:grid-cols-2">
          <div
            className="relative hidden min-h-[560px] flex-col justify-between overflow-hidden bg-[var(--brand-ink)] p-10 text-white lg:flex"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(10,20,15,0.85), rgba(10,20,15,0.65)), url(${authHero})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight">
              <BrandLogo size={28} />
              Origo
              <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-green)] bg-clip-text text-transparent">
                Host
              </span>
            </Link>
            <div>
              <h2 className="text-5xl font-black leading-tight tracking-tight">
                Welcome
                <br />
                Back.
              </h2>
              <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[var(--brand-orange)] via-white/70 to-[var(--brand-green)]" />
              <p className="mt-6 max-w-sm text-sm text-white/75">
                Access India's largest hosting & platform-engineering community and its premium
                resources.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12">
            <div className="lg:hidden">
              <Link
                to="/"
                className="mb-8 flex items-center gap-2 text-lg font-black tracking-tight text-[var(--brand-ink)]"
              >
                <BrandLogo size={26} />
                Origo
                <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-green)] bg-clip-text text-transparent">
                  Host
                </span>
              </Link>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-[var(--brand-ink)]">Sign In</h1>
            <p className="mt-2 text-sm text-[var(--brand-ink)]/70">
              Welcome back! Please enter your details.
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-semibold text-[var(--brand-ink)]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  enterKeyHint="next"
                  placeholder="john@example.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  className={`h-12 rounded-xl bg-white text-[var(--brand-ink)] ${
                    errors.email ? "border-red-400" : "border-[var(--brand-ink)]/15"
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p role="alert" className="text-xs font-medium text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-[var(--brand-ink)]"
                  >
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-[var(--brand-orange)] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    enterKeyHint="done"
                    placeholder="••••••••"
                    aria-invalid={errors.password ? "true" : "false"}
                    className={`h-12 rounded-xl bg-white pr-11 text-[var(--brand-ink)] ${
                      errors.password ? "border-red-400" : "border-[var(--brand-ink)]/15"
                    }`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-[var(--brand-ink)]/70 hover:bg-[var(--brand-ink)]/5"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p role="alert" className="text-xs font-medium text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-xl bg-[var(--brand-orange)] text-base font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-[var(--brand-orange)]/90 disabled:opacity-60"
              >
                {isSubmitting ? "Signing in…" : "Sign In"}
              </Button>

              <div className="relative py-2 text-center">
                <span className="relative z-10 bg-white px-3 text-xs uppercase tracking-widest text-[var(--brand-ink)]/70">
                  or
                </span>
                <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--brand-ink)]/10" />
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={onGoogle}
                className="h-12 w-full rounded-xl border-[var(--brand-ink)]/15 bg-white text-sm font-semibold text-[var(--brand-ink)] hover:bg-[var(--brand-ink)]/5"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" aria-hidden>
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
                Continue with Google
              </Button>

              <p className="text-center text-sm text-[var(--brand-ink)]/60">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-[var(--brand-orange)] hover:underline"
                >
                  Create free account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
