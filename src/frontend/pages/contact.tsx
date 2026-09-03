import { createServerFn } from "@tanstack/react-start";
import { m as motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  Sparkles,
  Star,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { buildSeo } from "@/lib/seo";
import { contentLoader } from "@/features/cms";
import { resolveIcon } from "@/features/cms/icon";
import { supabase } from "@/integrations/supabase/client";

const content = contentLoader.getSync("contact");

const ACCENT_STYLES: Record<
  string,
  { bg: string; icon: string; text: string; hoverArrow: string }
> = {
  orange: {
    bg: "bg-orange-100/70",
    icon: "text-[var(--brand-orange)]",
    text: "text-[var(--brand-orange)]",
    hoverArrow: "text-[var(--brand-orange)]",
  },
  blue: {
    bg: "bg-blue-100/70",
    icon: "text-blue-600",
    text: "text-blue-600",
    hoverArrow: "text-blue-600",
  },
  green: {
    bg: "bg-[var(--brand-mint)]/70",
    icon: "text-[var(--brand-green)]",
    text: "text-[var(--brand-green)]",
    hoverArrow: "text-[var(--brand-green)]",
  },
  purple: {
    bg: "bg-purple-100/70",
    icon: "text-purple-600",
    text: "text-purple-600",
    hoverArrow: "text-purple-600",
  },
};

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address" })
    .max(255, { message: "Email is too long" }),
  subject: z
    .string()
    .trim()
    .min(5, { message: "Subject must be at least 5 characters" })
    .max(200, { message: "Subject must be under 200 characters" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Tell us a bit more (at least 10 characters)" })
    .max(1000, { message: "Message must be under 1000 characters" }),
  idempotencyKey: z.string(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

import { escapeHtml } from "@/lib/escape-html";

export const sendContactEmailFn = createServerFn({ method: "POST" })
  .validator((d: ContactFormValues) => d)
  .handler(async ({ data }) => {
    // Only import Resend on the server side
    const { Resend } = await import("resend");
    const { checkIdempotency } = await import("@/lib/idempotency");
    const { getSupabaseAdmin } = await import("@/lib/idempotency");
    const { contactRateLimiter } = await import("@/lib/rate-limit");

    // 0. Rate Limiting
    // Simple IP inference (for demo purposes if real IP isn't passed)
    const ip = "127.0.0.1"; // In production, extract from headers (x-forwarded-for)
    const rateLimit = await contactRateLimiter.limit(ip);
    if (!rateLimit.success) {
      throw new Error("Too many submissions. Please try again later.");
    }

    // 1. Check idempotency
    const isNew = await checkIdempotency(data.idempotencyKey, "contact");
    if (!isNew) {
      return { success: true, message: "Duplicate submission ignored safely." };
    }

    // 2. Insert into database
    const admin = getSupabaseAdmin();
    const { error: dbError } = await admin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      message: data.message,
      user_agent: "server-action", // Or pass from client
    });

    if (dbError) {
      console.error("[Contact Form] DB Error:", dbError.message);
      throw new Error("Could not save your message. Please try again.");
    }

    // 3. Send email notification
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[Contact Form] RESEND_API_KEY is missing. Email will not be sent.");
      return { success: true, warning: "Saved, but email notification failed." };
    }

    const resend = new Resend(apiKey);
    try {
      const { data: emailData, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "origohostscommunity@gmail.com",
        subject: `New Contact Submission from ${escapeHtml(data.name)}`,
        html: `
          <h3>New Message via OrigoHOST Contact Form</h3>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(data.message)}</p>
        `,
      });

      if (error) {
        console.error("[Contact Form] Resend API Error:", error.message);
        return { success: true, warning: "Saved, but email notification failed." };
      }

      return { success: true, emailId: emailData?.id };
    } catch (e: any) {
      console.error("[Contact Form] Unexpected Email Error:", e.message);
      return { success: true, warning: "Saved, but email notification failed." };
    }
  });

export default function ContactPage() {
  const [step, setStep] = useState(0);
  const [idempotencyKey] = useState(() =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(),
  );

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", subject: "", message: "", idempotencyKey },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await sendContactEmailFn({ data: { ...values, idempotencyKey } });
      if (res.warning) {
        toast.success(res.warning);
      } else {
        toast.success("Message sent — we'll get back within 24 hours.");
      }
      reset();
    } catch (err: any) {
      toast.error(err.message || "Failed to send message. Please try again.");
    }
  });

  return (
    <PageShell
      eyebrow={content.meta.eyebrow ?? "Contact"}
      title={
        <>
          Let's build the{" "}
          <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] bg-clip-text text-transparent">
            future of hosting
          </span>{" "}
          together
        </>
      }
      description={content.meta.heroDescription ?? content.meta.description}
      breadcrumb={[{ label: "Contact" }]}
    >
      {/* Reply pill */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-ink)]/10 bg-white px-4 py-2 text-sm shadow-sm">
          <MessageCircle className="h-4 w-4 text-[var(--brand-ink)]/60" />
          <span className="text-[var(--brand-ink)]/70">
            Typically replies within{" "}
            <span className="font-bold text-[var(--brand-ink)]">24 hours</span>
          </span>
          <Sparkles className="h-4 w-4 text-[var(--brand-green)]" />
        </div>
      </div>

      {/* Support & inquiries */}
      <section className="mt-16 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-ink)] px-4 py-1.5 text-xs font-bold tracking-widest text-[var(--brand-yellow)]">
          <Star className="h-3.5 w-3.5 fill-current" /> SUPPORT & INQUIRIES
        </span>
        <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
          Let's Start a{" "}
          <span className="relative inline-block bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-green-glow)] bg-clip-text text-transparent">
            Conversation
            <span className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-[var(--brand-green)]/30" />
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--brand-ink)]/60">
          Whether you're curious about our initiatives, want to explore partnerships, or need
          guidance on cloud & platform programs — we're here to help you build the future.
        </p>
      </section>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {content.channels.map((c, i) => {
          const Icon = resolveIcon(c.icon);
          const style = ACCENT_STYLES[c.accent];
          return (
            <motion.a
              key={c.title}
              href={c.cta.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-8 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className={`grid h-14 w-14 place-items-center rounded-2xl ${style.bg}`}>
                  <Icon className={`h-6 w-6 ${style.icon}`} />
                </div>
                <div
                  className={`grid h-9 w-9 place-items-center rounded-full border border-[var(--brand-ink)]/10 bg-white ${style.hoverArrow} transition-transform group-hover:translate-x-1`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-black">{c.title}</h3>
              <p className="mt-2 text-sm text-[var(--brand-ink)]/60">{c.body}</p>
              <div
                className={`mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest ${style.text}`}
              >
                {c.cta.label} <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Offices */}
      <section className="mt-24 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-ink)] px-4 py-1.5 text-xs font-bold tracking-widest text-[var(--brand-yellow)]">
          <Globe className="h-3.5 w-3.5" /> OUR PRESENCE
        </span>
        <h2 className="mt-6 text-4xl font-black sm:text-5xl">Visit our Offices</h2>
        <p className="mx-auto mt-3 max-w-xl text-[var(--brand-ink)]/60">
          Come say hello at our hubs in India's tech capitals.
        </p>
      </section>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {content.offices.map((o, i) => (
          <motion.article
            key={o.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-3xl border border-[var(--brand-orange)]/30 bg-white p-8 shadow-[var(--shadow-soft)]"
          >
            <div className="flex items-start justify-between">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-100">
                <MapPin className="h-6 w-6 text-[var(--brand-orange)]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-ink)]/40">
                {o.kind}
              </span>
            </div>
            <h3 className="mt-6 text-3xl font-black">{o.city}</h3>
            <div className="mt-1 text-xs font-bold uppercase tracking-widest text-[var(--brand-orange)]">
              {o.country}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--brand-ink)]/60">{o.address}</p>

            <div className="my-5 h-px bg-[var(--brand-ink)]/5" />

            <a
              href={`mailto:${o.email}`}
              className="flex items-center gap-2 text-sm font-medium text-[var(--brand-ink)]"
            >
              <Mail className="h-4 w-4 text-[var(--brand-orange)]" /> {o.email}
            </a>
            <a
              href={`tel:${o.phone.replace(/\s/g, "")}`}
              className="mt-2 flex items-center gap-2 text-sm font-medium text-[var(--brand-ink)]"
            >
              <Phone className="h-4 w-4 text-[var(--brand-orange)]" /> {o.phone}
            </a>

            <Button
              asChild
              variant="outline"
              className="mt-6 h-12 w-full rounded-2xl border-[var(--brand-ink)]/10 bg-[var(--brand-cream)] font-semibold"
            >
              <a href={o.mapsUrl} target="_blank" rel="noreferrer">
                <Navigation className="mr-2 h-4 w-4" /> Get Directions
              </a>
            </Button>
          </motion.article>
        ))}
      </div>

      {/* Form + socials */}
      <section
        id="contact-form"
        className="mt-24 overflow-hidden rounded-[2rem] border border-[var(--brand-ink)]/5 bg-white p-8 shadow-[var(--shadow-soft)] sm:p-12"
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-ink)] px-4 py-1.5 text-xs font-bold tracking-widest text-[var(--brand-yellow)]">
              <Star className="h-3.5 w-3.5 fill-current" /> LET'S CONNECT
            </span>
            <h2 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
              {content.formTitle}
              <br />
              <span className="bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-green-glow)] bg-clip-text text-transparent">
                {content.formAccentWord}
              </span>
            </h2>
            <p className="mt-5 max-w-md text-[var(--brand-ink)]/60">{content.formDescription}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {content.socials.map((s) => {
                const Icon = resolveIcon(s.icon);
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-[var(--brand-ink)]/10 bg-white p-4 transition-colors hover:border-[var(--brand-ink)]/25"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className="h-5 w-5 shrink-0 text-[var(--brand-ink)]/60" />
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand-ink)]/40">
                          {s.label}
                        </div>
                        <div className="text-sm font-semibold truncate">{s.handle}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--brand-ink)]/30 group-hover:text-[var(--brand-ink)]" />
                  </a>
                );
              })}
            </div>
          </div>

          <form onSubmit={onSubmit} noValidate className="flex flex-col">
            {/* Mobile Progress */}
            <div className="md:hidden flex justify-between items-center mb-8">
              <span className="text-xs font-bold text-[var(--brand-ink)]/50 uppercase tracking-widest">
                Step {step + 1} of 3
              </span>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${s === step ? "w-6 bg-[var(--brand-orange)]" : "w-2 bg-[var(--brand-ink)]/10"}`}
                  />
                ))}
              </div>
            </div>

            <motion.div
              className={`space-y-1.5 ${step !== 0 ? "hidden md:block" : ""}`}
              animate={errors.name ? { x: [0, -6, 6, -5, 5, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Label
                htmlFor="name"
                className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand-ink)]/50"
              >
                Full name
              </Label>
              <Input
                id="name"
                placeholder="Jane Doe"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`h-14 rounded-2xl bg-white transition-all duration-200 focus-visible:-translate-y-0.5 focus-visible:shadow-[var(--shadow-soft)] ${
                  errors.name
                    ? "border-red-400 focus-visible:ring-red-400"
                    : "border-[var(--brand-ink)]/10"
                }`}
                {...register("name")}
              />
              <AnimatePresenceErr id="name-error" message={errors.name?.message} />
            </motion.div>

            <motion.div
              className={`mt-5 space-y-1.5 ${step !== 1 ? "hidden md:block md:mt-5" : "mt-0 md:mt-5"}`}
              animate={errors.email ? { x: [0, -6, 6, -5, 5, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Label
                htmlFor="email"
                className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand-ink)]/50"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="jane@company.com"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`h-14 rounded-2xl bg-white transition-all duration-200 focus-visible:-translate-y-0.5 focus-visible:shadow-[var(--shadow-soft)] ${
                  errors.email
                    ? "border-red-400 focus-visible:ring-red-400"
                    : "border-[var(--brand-ink)]/10"
                }`}
                {...register("email")}
              />
              <AnimatePresenceErr id="email-error" message={errors.email?.message} />
            </motion.div>

            <motion.div
              className={`mt-5 space-y-1.5 ${step !== 1 ? "hidden md:block md:mt-5" : "mt-0 md:mt-5"}`}
              animate={errors.subject ? { x: [0, -6, 6, -5, 5, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Label
                htmlFor="subject"
                className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand-ink)]/50"
              >
                Subject
              </Label>
              <Input
                id="subject"
                type="text"
                placeholder="How can we help you?"
                aria-invalid={errors.subject ? "true" : "false"}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className={`h-14 rounded-2xl bg-white transition-all duration-200 focus-visible:-translate-y-0.5 focus-visible:shadow-[var(--shadow-soft)] ${
                  errors.subject
                    ? "border-red-400 focus-visible:ring-red-400"
                    : "border-[var(--brand-ink)]/10"
                }`}
                {...register("subject")}
              />
              <AnimatePresenceErr id="subject-error" message={errors.subject?.message} />
            </motion.div>

            <motion.div
              className={`mt-5 space-y-1.5 ${step !== 2 ? "hidden md:block md:mt-5" : "mt-0 md:mt-5"}`}
              animate={errors.message ? { x: [0, -6, 6, -5, 5, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Label
                htmlFor="message"
                className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand-ink)]/50"
              >
                Your message
              </Label>
              <Textarea
                id="message"
                rows={6}
                placeholder="Tell us about your project or inquiry…"
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`rounded-2xl bg-white transition-all duration-200 focus-visible:-translate-y-0.5 focus-visible:shadow-[var(--shadow-soft)] ${
                  errors.message
                    ? "border-red-400 focus-visible:ring-red-400"
                    : "border-[var(--brand-ink)]/10"
                }`}
                {...register("message")}
              />
              <AnimatePresenceErr id="message-error" message={errors.message?.message} />
            </motion.div>


            <div className={`mt-6 flex gap-3 ${step !== 2 ? "hidden md:flex" : ""}`}>
              <Button
                type="button"
                variant="outline"
                className="h-14 w-1/3 rounded-2xl md:hidden border-[var(--brand-ink)]/20"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="group h-14 flex-1 rounded-2xl bg-[var(--brand-ink)] text-base font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[var(--brand-ink)]/90 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <motion.span
                    className="inline-flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending…
                  </motion.span>
                ) : (
                  <>
                    Send Message{" "}
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>

            {/* Mobile Next Buttons */}
            <div className="md:hidden mt-8 flex gap-3">
              {step === 0 && (
                <Button
                  type="button"
                  className="h-14 w-full rounded-2xl bg-[var(--brand-ink)] text-white text-base font-semibold"
                  onClick={async () => {
                    const valid = await trigger("name");
                    if (valid) setStep(1);
                  }}
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              {step === 1 && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-14 w-1/3 rounded-2xl border-[var(--brand-ink)]/20"
                    onClick={() => setStep(0)}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="h-14 flex-1 rounded-2xl bg-[var(--brand-ink)] text-white text-base font-semibold"
                    onClick={async () => {
                      const valid = await trigger("email");
                      if (valid) setStep(2);
                    }}
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {isSubmitSuccessful && !Object.keys(errors).length ? (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-[var(--brand-green)]"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18, delay: 0.05 }}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </motion.span>
                  Thanks — your message is on its way.
                </motion.p>
              ) : (
                <motion.p
                  key="note"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-center text-sm font-medium text-[var(--brand-ink)]/50"
                >
                  {content.formNote}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

/**
 * Field-level validation error, animated in/out.
 * Kept below the page component so the JSX above reads cleanly.
 */
function AnimatePresenceErr({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {message ? (
        <motion.p
          key={message}
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs font-medium text-red-500"
        >
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}
