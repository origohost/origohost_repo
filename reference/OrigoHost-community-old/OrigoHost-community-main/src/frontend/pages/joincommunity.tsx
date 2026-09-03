import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { m as motion, useReducedMotion } from "framer-motion";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import {
  ArrowRight,
  Building2,
  Check,
  Code2,
  Eye,
  EyeOff,
  Github,
  GraduationCap,
  Linkedin,
  Rocket,
  ServerCog,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/brand-logo";
import { buildSeo } from "@/lib/seo";
import authHero from "@/assets/auth-hero.webp";
import { transitions, VIEWPORT_ONCE } from "@/lib/motion-config";
import { cn } from "@/lib/utils";
import { Magnetic, Tilt, SpotlightCard } from "@/components/motion/primitives";

/* ─── Data ──────────────────────────────────────────────────────── */

interface RoleOption {
  id: string;
  label: string;
  hint: string;
  icon: typeof Code2;
}

const ROLES: RoleOption[] = [
  { id: "student", label: "Student", hint: "Undergraduate / Postgraduate", icon: GraduationCap },
  { id: "developer", label: "Developer", hint: "Full-stack / Frontend / Backend", icon: Code2 },
  { id: "devops", label: "DevOps / SRE", hint: "Infra, platforms & reliability", icon: ServerCog },
  { id: "founder", label: "Founder", hint: "Building a product or startup", icon: Rocket },
  { id: "designer", label: "Designer", hint: "Product & brand design", icon: Wand2 },
  { id: "educator", label: "Educator", hint: "Mentoring the next generation", icon: Users },
  { id: "organizer", label: "Organizer", hint: "Communities, meetups & events", icon: Sparkles },
  { id: "company", label: "Company", hint: "Hiring or partnering with us", icon: Building2 },
];

const PERKS = [
  "Free access to community events & meetups",
  "Priority slots for workshops & hackathons",
  "Mentorship from senior engineers & founders",
  "Job board access and referrals",
];

export const validateRegisterSecurityFn = createServerFn({ method: "POST" })
  .validator((data: { token: string }) => data)
  .handler(async (ctx) => {
    const { authRateLimiter } = await import("@/lib/rate-limit");

    const request = getRequest();
    const headers = request?.headers;
    const ip =
      headers?.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headers?.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = await authRateLimiter.limit(ip);
    if (!rateLimit.success) {
      throw new Error("Too many attempts. Locked for 15 minutes.");
    }

    return { success: true };
  });

export default function RegisterPage() {
  const reduced = useReducedMotion();
  const [role, setRole] = useState<string>("developer");
  const { user, signUpWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // Core fields
    const firstName = String(fd.get("firstName") ?? "").trim();
    const lastName = String(fd.get("lastName") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    const confirmPassword = String(fd.get("confirmPassword") ?? "");
    const phone = String(fd.get("phone") ?? "").trim();

    // Metadata fields
    const displayName = [firstName, lastName].filter(Boolean).join(" ") || undefined;
    // Map UI role to valid Database role ('student', 'organization', 'recruiter', 'admin')
    let dbRole = "student";
    if (role === "company" || role === "organization") {
      dbRole = "organization";
    }

    const metadata: any = {
      display_name: displayName,
      first_name: firstName,
      last_name: lastName,
      phone: phone || undefined,
      linkedin: String(fd.get("linkedin") ?? "").trim() || undefined,
      github: String(fd.get("github") ?? "").trim() || undefined,
      role: dbRole,
      persona: role, // the specific UI role selected
    };

    // Role-specific fields
    if (role === "student") {
      metadata.college = String(fd.get("college") ?? "").trim();
      metadata.branch = String(fd.get("branch") ?? "").trim();
      metadata.stream = String(fd.get("stream") ?? "").trim();
    } else if (role === "company") {
      metadata.company = String(fd.get("company") ?? "").trim();
      metadata.team_size = String(fd.get("team") ?? "").trim();
      metadata.website = String(fd.get("website") ?? "").trim();
    } else {
      metadata.organization = String(fd.get("org") ?? "").trim();
      metadata.job_title = String(fd.get("role") ?? "").trim();
    }

    if (!email || password.length < 8) {
      toast.error("Enter a valid email and a password of 8+ characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setSubmitting(true);
    try {
      await validateRegisterSecurityFn({ data: { token: "" } });
      await signUpWithEmail(email, password, metadata);
      setSubmittedEmail(email);
      toast.success("Account created — check your inbox for the verification code.");
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Sign-up error:", err);
      let dump = "";
      try {
        dump = JSON.stringify(err, Object.getOwnPropertyNames(err));
      } catch (e) {
        dump = String(err);
      }
      toast.error(`Error: ${err?.message || err?.msg || "No message"}. Raw: ${dump}`);
    } finally {
      setSubmitting(false);
    }
  }

  async function onGoogle() {
    try {
      await signInWithGoogle();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
    }
  }

  return (
    <div className="relative min-h-[calc(100dvh-4rem)] w-full overflow-hidden bg-[var(--brand-cream)]">
      {/* Aurora backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="grid min-h-[calc(100dvh-4rem)] w-full grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <HeroPanel reduced={!!reduced} />
        <FormPanel
          role={role}
          setRole={setRole}
          reduced={!!reduced}
          onSubmit={onSubmit}
          onGoogle={onGoogle}
          submitting={submitting}
          isSuccess={isSuccess}
          submittedEmail={submittedEmail}
        />
      </div>
    </div>
  );
}

/* ─── Left: brand + photo ──────────────────────────────────────── */

function HeroPanel({ reduced }: { reduced: boolean }) {
  return (
    <section
      aria-label="Join OrigoHOST"
      className="relative hidden overflow-hidden bg-[var(--brand-ink)] p-8 text-white lg:flex lg:min-h-full lg:flex-col lg:justify-between lg:p-12 xl:p-14"
    >
      {/* Photo */}
      <img
        loading="lazy"
        decoding="async"
        src={authHero}
        alt=""
        aria-hidden
        width={1280}
        height={1600}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[var(--brand-ink)]/40 via-[var(--brand-ink)]/65 to-[var(--brand-ink)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 h-[420px] w-[420px] rounded-full bg-[var(--brand-orange)]/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-10 h-[360px] w-[360px] rounded-full bg-[var(--brand-green)]/35 blur-3xl"
      />

      {/* Brand */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: -8 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={transitions.base}
        className="relative z-10"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-xl font-black tracking-tight">
          <BrandLogo size={28} />
          <span>Origo</span>
          <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-green)] bg-clip-text text-transparent">
            Host
          </span>
        </Link>
      </motion.div>

      {/* Headline + perks */}
      <div className="relative z-10 mt-auto max-w-md space-y-8">
        <motion.h2
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={transitions.slow}
          className="font-display text-5xl font-black leading-[0.95] tracking-tight md:text-6xl"
        >
          Join the <span className="text-gradient-brand">Future.</span>
        </motion.h2>
        <motion.p
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ ...transitions.slow, delay: 0.08 }}
          className="text-lg leading-relaxed text-white/80"
        >
          Build your career in hosting, infra, and cloud — alongside 12,000+ developers, founders,
          and operators.
        </motion.p>
        <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[var(--brand-orange)] via-amber-400 to-[var(--brand-green)]" />
        <ul className="space-y-3 text-sm text-white/85">
          {PERKS.map((perk, i) => (
            <motion.li
              key={perk}
              initial={reduced ? undefined : { opacity: 0, x: -12 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ ...transitions.base, delay: 0.05 * i }}
              className="flex items-start gap-3"
            >
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--brand-orange)]/25 text-[var(--brand-orange)]">
                <Check className="h-3 w-3" aria-hidden />
              </span>
              <span>{perk}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Right: form ──────────────────────────────────────────────── */

function FormPanel({
  role,
  setRole,
  reduced,
  onSubmit,
  onGoogle,
  submitting,
  isSuccess,
  submittedEmail,
}: {
  role: string;
  setRole: (v: string) => void;
  reduced: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onGoogle: () => void;
  submitting: boolean;
  isSuccess: boolean;
  submittedEmail: string;
}) {
  const navigate = useNavigate();
  const { verifyOtp } = useAuth();
  const [otpCode, setOtpCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setVerifying(true);
    try {
      await verifyOtp(submittedEmail, otpCode);
      toast.success("Account verified successfully!");
      navigate({ to: "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setVerifying(false);
    }
  }

  return (
    <section className="relative flex items-start justify-center overflow-y-auto bg-white text-[var(--brand-ink)] px-5 py-10 sm:px-8 lg:min-h-full lg:py-14">
      {/* Mobile brand (hero panel is hidden below lg) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--brand-cream)] to-transparent lg:hidden" />
      <div className="relative z-10 w-full max-w-2xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-lg font-black tracking-tight text-[var(--brand-ink)] lg:hidden"
        >
          <BrandLogo size={24} />
          <span>Origo</span>
          <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-green)] bg-clip-text text-transparent">
            Host
          </span>
        </Link>

        {isSuccess ? (
          <div className="mt-8 rounded-xl border border-green-500/20 bg-green-500/10 p-8 text-center backdrop-blur-md">
            <Check className="mx-auto mb-4 h-12 w-12 text-green-400" />
            <h2 className="mb-2 text-2xl font-bold text-[var(--brand-ink)]">Verify your email</h2>
            <p className="text-[var(--brand-ink)]/70 mb-6">
              We've sent a verification code to <strong>{submittedEmail}</strong>. Please enter it
              below to activate your account.
            </p>

            <form onSubmit={handleVerify} className="space-y-4 max-w-sm mx-auto">
              <Input
                placeholder="Enter 8-digit code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={8}
                required
                className="text-center tracking-widest text-lg h-12 text-black bg-white font-bold border-2 border-[var(--brand-ink)]/20"
              />
              <Button type="submit" disabled={verifying || otpCode.length < 8} className="w-full">
                {verifying ? "Verifying..." : "Verify Account"}
              </Button>
            </form>

            <Button className="mt-6" variant="ghost" onClick={() => window.location.reload()}>
              Wrong email? Start over
            </Button>
          </div>
        ) : (
          <>
            <SectionHeading reduced={reduced} />
            <form
              onSubmit={onSubmit}
              className="mt-8 space-y-6"
              aria-label="Create your OrigoHOST account"
            >
              <TwoCol>
                <Field id="firstName" label="First name" required>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="Ritik"
                    className="text-slate-900"
                  />
                </Field>
                <Field id="lastName" label="Last name" required>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Kumar"
                    className="text-slate-900"
                  />
                </Field>
              </TwoCol>

              <Field id="middleName" label="Middle name" optional>
                <Input
                  id="middleName"
                  name="middleName"
                  placeholder="Optional"
                  className="text-slate-900"
                />
              </Field>

              <TwoCol>
                <Field id="email" label="Email" required>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    enterKeyHint="next"
                    className="text-slate-900"
                  />
                </Field>
                <Field id="phone" label="Phone" required>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    inputMode="tel"
                    placeholder="10-digit mobile number"
                    autoComplete="tel"
                    className="text-slate-900"
                  />
                </Field>
              </TwoCol>

              <TwoCol>
                <Field id="password" label="Password" required hint="Min 8 chars">
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="text-slate-900 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </Field>

                <Field id="confirmPassword" label="Confirm Password" required>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="text-slate-900 pr-10"
                    />
                  </div>
                </Field>
              </TwoCol>

              <TwoCol>
                <Field
                  id="linkedin"
                  label="LinkedIn"
                  optional
                  iconLabel={<Linkedin className="h-3.5 w-3.5 text-[#0a66c2]" aria-hidden />}
                >
                  <Input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/…"
                    className="text-slate-900"
                  />
                </Field>
                <Field
                  id="github"
                  label="GitHub"
                  optional
                  iconLabel={<Github className="h-3.5 w-3.5" aria-hidden />}
                >
                  <Input
                    id="github"
                    name="github"
                    type="url"
                    placeholder="https://github.com/…"
                    className="text-slate-900"
                  />
                </Field>
              </TwoCol>

              <RoleGrid value={role} onChange={setRole} reduced={reduced} />

              <RoleDetails role={role} />

              <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center w-full">
                <Magnetic className="w-full sm:w-1/2">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="group w-full rounded-2xl bg-[var(--brand-ink)] py-6 text-base font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 hover:bg-[var(--brand-ink)]/90 disabled:opacity-60"
                  >
                    {submitting ? "Creating account…" : "Create Account"}
                    <ArrowRight
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Button>
                </Magnetic>

                <Magnetic className="w-full sm:w-1/2">
                  <button
                    type="button"
                    onClick={onGoogle}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--brand-ink)]/15 bg-white py-4 text-sm font-semibold text-[var(--brand-ink)] shadow-sm hover:bg-[var(--brand-ink)]/5"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden>
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
                  </button>
                </Magnetic>
              </div>

              <p className="text-center text-[11px] text-[var(--brand-ink)]/55">
                By creating an account you agree to our{" "}
                <Link to="/terms" className="underline hover:text-[var(--brand-orange)]">
                  Terms
                </Link>{" "}
                &{" "}
                <Link to="/privacy" className="underline hover:text-[var(--brand-orange)]">
                  Privacy
                </Link>
                .
              </p>
            </form>
            <p className="mt-8 text-center text-sm text-[var(--brand-ink)]/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[var(--brand-orange)] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}

/* ─── Bits ─────────────────────────────────────────────────────── */

function SectionHeading({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={transitions.base}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-orange)]/30 bg-[var(--brand-orange)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--brand-orange)]">
        <Sparkles className="h-3 w-3" aria-hidden /> Join the community
      </span>
      <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-[var(--brand-ink)] sm:text-4xl">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-[var(--brand-ink)]/60">
        Tell us who you are — we'll tailor events, jobs, and mentorship to fit.
      </p>
    </motion.div>
  );
}

function TwoCol({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

interface FieldProps {
  id: string;
  label: string;
  children: ReactNode;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  iconLabel?: ReactNode;
}

function Field({ id, label, children, required, optional, hint, iconLabel }: FieldProps) {
  return (
    <div className="field-validate space-y-1.5">
      <Label
        htmlFor={id}
        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--brand-ink)]"
      >
        {iconLabel}
        {label}
        {required && <span className="text-[var(--brand-orange)]">*</span>}
        {optional && (
          <span className="text-[10px] font-normal normal-case text-[var(--brand-ink)]/40">
            (optional)
          </span>
        )}
      </Label>
      {children}
      {hint && <p className="text-[11px] text-[var(--brand-ink)]/50">{hint}</p>}
    </div>
  );
}

/* ─── Role picker ──────────────────────────────────────────────── */

function RoleGrid({
  value,
  onChange,
  reduced,
}: {
  value: string;
  onChange: (v: string) => void;
  reduced: boolean;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--brand-ink)]">
        I am a…
      </legend>
      <div
        role="radiogroup"
        aria-label="Select your role"
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-2.5 pb-4 -mx-5 px-5 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:overflow-visible"
      >
        {ROLES.map((r, i) => {
          const active = r.id === value;
          const Icon = r.icon;
          return (
            <Tilt key={r.id} max={3} className="snap-center shrink-0 w-[55vw] sm:w-auto">
              <motion.button
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange(r.id)}
                initial={reduced ? undefined : { opacity: 0, y: 8 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ ...transitions.fast, delay: 0.03 * i }}
                whileHover={reduced ? undefined : { y: -2 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                className={cn(
                  "group h-full relative flex flex-col items-start gap-2 rounded-2xl border p-3 text-left transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)] focus-visible:ring-offset-2",
                  active
                    ? "border-[var(--brand-orange)] bg-[var(--brand-orange)]/8 shadow-[var(--shadow-brand)]"
                    : "border-[var(--brand-ink)]/10 bg-white hover:border-[var(--brand-orange)]/40 hover:bg-[var(--brand-orange)]/5",
                )}
              >
                <span
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-xl transition-colors",
                    active
                      ? "bg-[var(--brand-orange)] text-white"
                      : "bg-[var(--brand-ink)]/5 text-[var(--brand-ink)]/70 group-hover:bg-[var(--brand-orange)]/15 group-hover:text-[var(--brand-orange)]",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="text-sm font-semibold text-[var(--brand-ink)]">{r.label}</span>
                <span className="text-[11px] leading-tight text-[var(--brand-ink)]/55">
                  {r.hint}
                </span>
                {active && (
                  <span
                    aria-hidden
                    className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-[var(--brand-orange)] text-white"
                  >
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </motion.button>
            </Tilt>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ─── Conditional details per role ─────────────────────────────── */

function RoleDetails({ role }: { role: string }) {
  if (role === "student") {
    return (
      <DetailsCard title="Tell us about your studies">
        <Field id="college" label="College / University" required>
          <Input id="college" name="college" required placeholder="College or University" />
        </Field>
        <TwoCol>
          <Field id="branch" label="Branch" required>
            <Input id="branch" name="branch" required placeholder="e.g. CSE" />
          </Field>
          <Field id="stream" label="Stream / Year" required>
            <Input id="stream" name="stream" required placeholder="e.g. B.Tech, 3rd year" />
          </Field>
        </TwoCol>
      </DetailsCard>
    );
  }
  if (role === "company") {
    return (
      <DetailsCard title="Company details">
        <Field id="company" label="Company name" required>
          <Input id="company" name="company" required placeholder="Acme Inc." />
        </Field>
        <TwoCol>
          <Field id="team" label="Team size" optional>
            <Input id="team" name="team" placeholder="e.g. 50" />
          </Field>
          <Field id="website" label="Website" optional>
            <Input id="website" name="website" type="url" placeholder="https://…" />
          </Field>
        </TwoCol>
      </DetailsCard>
    );
  }
  return (
    <DetailsCard title="Your work">
      <Field id="org" label="Company / Organisation" optional>
        <Input id="org" name="org" placeholder="Where do you build?" />
      </Field>
      <Field id="role" label="Role / Title" optional>
        <Input id="role" name="role" placeholder="e.g. Senior Platform Engineer" />
      </Field>
    </DetailsCard>
  );
}

function DetailsCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitions.fast}
      className="space-y-4 rounded-2xl border border-[var(--brand-ink)]/10 bg-[var(--brand-cream)]/60 p-4 sm:p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-ink)]/70">
        {title}
      </p>
      {children}
    </motion.div>
  );
}
