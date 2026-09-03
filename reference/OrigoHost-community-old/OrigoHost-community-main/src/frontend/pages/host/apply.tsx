import { useState, useRef } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  Loader2,
  Bot,
  Sparkles,
  Building2,
  Calendar,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { m as motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { submitHostEventEmailFn } from "@/features/host/actions";
import { useAuth } from "@/hooks/use-auth";

const STEPS = [
  { id: 1, title: "Organization", icon: Building2 },
  { id: 2, title: "Event Details", icon: Calendar },
  { id: 3, title: "Requirements", icon: Sparkles },
  { id: 4, title: "Uploads", icon: UploadCloud },
  { id: 5, title: "Review", icon: CheckCircle2 },
];

const ORG_TYPES = [
  "Startup",
  "Enterprise",
  "College",
  "University",
  "School",
  "Government",
  "Community",
  "NGO",
  "Training Institute",
  "Individual",
];
const EVENT_TYPES = [
  "Workshop",
  "Hackathon",
  "Meetup",
  "Conference",
  "Bootcamp",
  "Summit",
  "AI",
  "Cloud",
  "Cyber Security",
  "Webinar",
  "Other",
];
const FORMATS = ["Offline", "Online", "Hybrid"];

export default function HostApplyPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Org
    orgName: "",
    orgType: "",
    website: "",
    email: user?.email || "",
    phone: "",
    country: "",
    state: "",
    city: "",
    linkedin: "",
    companySize: "",
    expectedParticipants: "",
    // Step 2: Event
    eventName: "",
    eventType: "",
    format: "",
    expectedDate: "",
    duration: "",
    venue: "",
    timezone: "",
    registrationDeadline: "",
    seats: "",
    description: "",
    // Step 3: Requirements
    requirements: [] as string[],
    budget: "",
    timeline: "",
    goals: "",
    // Step 4: Uploads
    file: null as File | null,
    // Step 5: Terms
    agreeTerms: false,
  });

  const updateForm = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRequirementToggle = (req: string) => {
    setFormData((prev) => {
      const exists = prev.requirements.includes(req);
      if (exists) {
        return { ...prev, requirements: prev.requirements.filter((r) => r !== req) };
      }
      return { ...prev, requirements: [...prev.requirements, req] };
    });
  };

  const handleNext = () => {
    // Basic validation
    if (step === 1 && (!formData.orgName || !formData.orgType || !formData.email)) {
      toast.error("Please fill in required organization details (Name, Type, Email)");
      return;
    }
    if (
      step === 2 &&
      (!formData.eventName || !formData.eventType || !formData.format || !formData.expectedDate)
    ) {
      toast.error("Please fill in required event details");
      return;
    }
    if (step === 5 && !formData.agreeTerms) {
      toast.error("You must agree to the terms to submit");
      return;
    }

    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const [idempotencyKey] = useState(() =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(),
  );

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to submit a proposal.");
      navigate({ to: "/login", search: { redirect: "/host/apply" } });
      return;
    }
    if (!formData.agreeTerms) return;

    setIsSubmitting(true);
    try {
      const { reserveIdempotencyKeyFn } = await import("@/lib/idempotency");
      const reserveResult = await reserveIdempotencyKeyFn({
        data: { key: idempotencyKey, formType: "host_event" },
      });

      if (!reserveResult.isNew) {
        toast.success("Proposal submitted successfully!");
        navigate({ to: "/host/success" });
        return;
      }

      // 1. Create Organization
      const { data: org, error: orgError } = await supabase
        .from("organizations")
        .insert({
          name: formData.orgName,
          type: formData.orgType,
          website: formData.website,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          state: formData.state,
          city: formData.city,
          linkedin_url: formData.linkedin,
          company_size: formData.companySize,
          expected_participants: formData.expectedParticipants,
        })
        .select()
        .single();

      if (orgError) throw orgError;

      // 2. Create Host Request
      // Note: request_number is auto-generated by the DB trigger
      const { data: request, error: reqError } = await supabase
        .from("host_requests")
        .insert({
          user_id: user.id,
          organization_id: org.id,
          event_name: formData.eventName,
          event_type: formData.eventType,
          format: formData.format,
          expected_date: formData.expectedDate
            ? new Date(formData.expectedDate).toISOString()
            : null,
          duration: formData.duration,
          venue: formData.venue,
          timezone: formData.timezone,
          registration_deadline: formData.registrationDeadline
            ? new Date(formData.registrationDeadline).toISOString()
            : null,
          seats: formData.seats ? parseInt(formData.seats) : null,
          description: formData.description,
          budget: formData.budget,
          timeline: formData.timeline,
          goals: formData.goals,
          status: "Pending",
          browser: navigator.userAgent,
        })
        .select()
        .single();

      if (reqError) throw reqError;

      // 3. Create Event Requirements
      const reqMap: Record<string, boolean> = {};
      formData.requirements.forEach((req) => {
        const key = "need_" + req.toLowerCase().replace(/ /g, "_");
        reqMap[key] = true;
      });

      const { error: reqsError } = await supabase.from("event_requirements").insert({
        request_id: request.id,
        ...reqMap,
      });

      if (reqsError) throw reqsError;

      // 4. Upload File (if exists)
      if (formData.file) {
        const fileExt = formData.file.name.split(".").pop();
        const fileName = `${request.id}-${Math.random()}.${fileExt}`;
        const filePath = `proposals/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("host-assets")
          .upload(filePath, formData.file);

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from("host-assets")
            .getPublicUrl(filePath);

          await supabase.from("host_request_files").insert({
            request_id: request.id,
            file_type: "Proposal Document",
            file_url: publicUrlData.publicUrl,
            file_size_bytes: formData.file.size,
          });
        }
      }

      // Send email notification
      try {
        await submitHostEventEmailFn({
          data: {
            organizationName: formData.orgName,
            fullName: user.email || "",
            email: formData.email,
            phone: formData.phone,
            eventType: formData.eventType,
            expectedParticipants: formData.expectedParticipants,
            expectedDate: formData.expectedDate,
          },
        });
      } catch (emailError) {
        console.error("Failed to send notification email:", emailError);
      }

      // Success
      toast.success("Proposal submitted successfully!");
      navigate({ to: "/host/success" });
    } catch (error: any) {
      toast.error(error.message || "Failed to submit proposal");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-zinc-50 min-h-screen">
      <div className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
            {/* Sidebar / Progress */}
            <div className="hidden lg:block sticky top-32 space-y-6">
              <div>
                <Link
                  to="/host"
                  className="text-sm text-[var(--brand-ink)]/50 hover:text-[var(--brand-ink)] flex items-center mb-8 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hosting
                </Link>
                <h2 className="text-2xl font-black text-[var(--brand-ink)] mb-6">
                  Host Application
                </h2>
              </div>

              <div className="space-y-4">
                {STEPS.map((s, i) => {
                  const isActive = step === s.id;
                  const isPast = step > s.id;
                  return (
                    <div
                      key={s.id}
                      className={`flex items-center gap-3 transition-colors ${isActive ? "text-[var(--brand-blue)]" : isPast ? "text-[var(--brand-ink)]" : "text-[var(--brand-ink)]/30"}`}
                    >
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-colors ${
                          isActive
                            ? "border-[var(--brand-blue)] bg-[var(--brand-blue)]/10"
                            : isPast
                              ? "border-[var(--brand-ink)] bg-[var(--brand-ink)] text-white"
                              : "border-[var(--brand-ink)]/20"
                        }`}
                      >
                        {isPast ? <CheckCircle2 className="h-4 w-4" /> : s.id}
                      </div>
                      <span className="font-semibold">{s.title}</span>
                    </div>
                  );
                })}
              </div>

              {/* AI Assistant Banner */}
              <div className="mt-12 rounded-xl bg-gradient-to-br from-[var(--brand-blue)]/10 to-[var(--brand-orange)]/10 p-5 border border-[var(--brand-blue)]/20">
                <div className="flex items-center gap-2 text-[var(--brand-blue)] mb-2 font-bold">
                  <Bot className="h-5 w-5" /> AI Assistant
                </div>
                <p className="text-sm text-[var(--brand-ink)]/70 mb-3">
                  Need help planning your event format, budget, or marketing strategy? Our team will
                  review your goals and suggest the ideal setup.
                </p>
                <div className="text-xs font-semibold text-[var(--brand-orange)] flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Fill as much as you know!
                </div>
              </div>
            </div>

            {/* Mobile Progress Bar */}
            <div className="lg:hidden mb-8">
              <div className="flex justify-between text-sm font-bold text-[var(--brand-ink)]/50 mb-2">
                <span>Step {step} of 5</span>
                <span>{Math.round((step / 5) * 100)}%</span>
              </div>
              <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--brand-blue)] transition-all duration-300"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Form Area */}
            <div className="rounded-3xl bg-white border border-[var(--brand-ink)]/5 p-6 md:p-10 shadow-xl shadow-[var(--brand-ink)]/5 min-h-[600px] flex flex-col">
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="mb-8">
                          <h3 className="text-3xl font-black text-[var(--brand-ink)] mb-2">
                            Organization Details
                          </h3>
                          <p className="text-[var(--brand-ink)]/60">
                            Tell us about the entity hosting this event.
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label>Organization Name *</Label>
                            <Input
                              value={formData.orgName}
                              onChange={(e) => updateForm("orgName", e.target.value)}
                              placeholder="e.g. Acme Corp"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Organization Type *</Label>
                            <Select
                              value={formData.orgType}
                              onValueChange={(v) => updateForm("orgType", v)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type..." />
                              </SelectTrigger>
                              <SelectContent>
                                {ORG_TYPES.map((t) => (
                                  <SelectItem key={t} value={t}>
                                    {t}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Official Email *</Label>
                            <Input
                              type="email"
                              value={formData.email}
                              onChange={(e) => updateForm("email", e.target.value)}
                              placeholder="hello@company.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Website</Label>
                            <Input
                              value={formData.website}
                              onChange={(e) => updateForm("website", e.target.value)}
                              placeholder="https://..."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>City</Label>
                            <Input
                              value={formData.city}
                              onChange={(e) => updateForm("city", e.target.value)}
                              placeholder="e.g. Bangalore"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Expected Participants</Label>
                            <Input
                              value={formData.expectedParticipants}
                              onChange={(e) => updateForm("expectedParticipants", e.target.value)}
                              placeholder="e.g. 500+"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="mb-8">
                          <h3 className="text-3xl font-black text-[var(--brand-ink)] mb-2">
                            Event Information
                          </h3>
                          <p className="text-[var(--brand-ink)]/60">
                            What kind of event are you planning?
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2 md:col-span-2">
                            <Label>Event Name *</Label>
                            <Input
                              value={formData.eventName}
                              onChange={(e) => updateForm("eventName", e.target.value)}
                              placeholder="e.g. Cloud Native Summit 2026"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Event Type *</Label>
                            <Select
                              value={formData.eventType}
                              onValueChange={(v) => updateForm("eventType", v)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type..." />
                              </SelectTrigger>
                              <SelectContent>
                                {EVENT_TYPES.map((t) => (
                                  <SelectItem key={t} value={t}>
                                    {t}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Format *</Label>
                            <Select
                              value={formData.format}
                              onValueChange={(v) => updateForm("format", v)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select format..." />
                              </SelectTrigger>
                              <SelectContent>
                                {FORMATS.map((t) => (
                                  <SelectItem key={t} value={t}>
                                    {t}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Expected Date *</Label>
                            <Input
                              type="date"
                              value={formData.expectedDate}
                              onChange={(e) => updateForm("expectedDate", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Duration</Label>
                            <Input
                              value={formData.duration}
                              onChange={(e) => updateForm("duration", e.target.value)}
                              placeholder="e.g. 2 Days"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label>Description</Label>
                            <Textarea
                              value={formData.description}
                              onChange={(e) => updateForm("description", e.target.value)}
                              placeholder="Briefly describe the theme and goals of the event..."
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="mb-8">
                          <h3 className="text-3xl font-black text-[var(--brand-ink)] mb-2">
                            Requirements
                          </h3>
                          <p className="text-[var(--brand-ink)]/60">
                            Select the resources and support you need from OrigoHOST.
                          </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                          {[
                            "Speakers",
                            "Mentors",
                            "Judges",
                            "Certificates",
                            "QR Attendance",
                            "Swags",
                            "Volunteers",
                            "Photography",
                            "Live Streaming",
                            "Sponsors",
                            "Promotion",
                            "Hiring Booth",
                            "Registration Platform",
                            "Community Marketing",
                          ].map((req) => (
                            <label
                              key={req}
                              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${formData.requirements.includes(req) ? "border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]" : "border-zinc-200 hover:bg-zinc-50"}`}
                            >
                              <Checkbox
                                checked={formData.requirements.includes(req)}
                                onCheckedChange={() => handleRequirementToggle(req)}
                              />
                              <span className="text-sm font-medium">{req}</span>
                            </label>
                          ))}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                          <div className="space-y-2">
                            <Label>Estimated Budget (Optional)</Label>
                            <Input
                              value={formData.budget}
                              onChange={(e) => updateForm("budget", e.target.value)}
                              placeholder="e.g. $5,000"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Primary Goals</Label>
                            <Input
                              value={formData.goals}
                              onChange={(e) => updateForm("goals", e.target.value)}
                              placeholder="e.g. Hiring, Brand Awareness"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="space-y-6">
                        <div className="mb-8">
                          <h3 className="text-3xl font-black text-[var(--brand-ink)] mb-2">
                            Upload Assets
                          </h3>
                          <p className="text-[var(--brand-ink)]/60">
                            Attach your proposal deck, PDF, or brand assets (Max 25MB).
                          </p>
                        </div>

                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-[var(--brand-ink)]/20 rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-zinc-50 hover:border-[var(--brand-blue)]/50 transition-colors"
                        >
                          <div className="h-16 w-16 rounded-full bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] flex items-center justify-center mb-4">
                            <UploadCloud className="h-8 w-8" />
                          </div>
                          <h4 className="text-lg font-bold text-[var(--brand-ink)] mb-1">
                            Click to upload or drag and drop
                          </h4>
                          <p className="text-sm text-[var(--brand-ink)]/50 mb-6">
                            PDF, DOCX, ZIP, or Images up to 25MB
                          </p>

                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => updateForm("file", e.target.files?.[0])}
                            className="hidden"
                          />

                          <Button type="button" variant="outline">
                            Select File
                          </Button>
                        </div>

                        {formData.file && (
                          <div className="p-4 rounded-xl bg-zinc-100 flex items-center gap-4">
                            <FileText className="h-6 w-6 text-[var(--brand-blue)]" />
                            <div className="flex-1 truncate">
                              <p className="text-sm font-bold truncate">{formData.file.name}</p>
                              <p className="text-xs text-[var(--brand-ink)]/50">
                                {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => updateForm("file", null)}
                            >
                              Remove
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {step === 5 && (
                      <div className="space-y-6">
                        <div className="mb-8">
                          <h3 className="text-3xl font-black text-[var(--brand-ink)] mb-2">
                            Review & Submit
                          </h3>
                          <p className="text-[var(--brand-ink)]/60">
                            Double check your information before submitting.
                          </p>
                        </div>

                        <div className="rounded-xl border bg-zinc-50 p-6 space-y-6">
                          <div>
                            <h4 className="text-sm font-bold text-[var(--brand-ink)]/50 uppercase tracking-wider mb-2">
                              Organization
                            </h4>
                            <p className="text-[var(--brand-ink)] font-medium">
                              {formData.orgName} ({formData.orgType})
                            </p>
                            <p className="text-[var(--brand-ink)]/70 text-sm">{formData.email}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[var(--brand-ink)]/50 uppercase tracking-wider mb-2">
                              Event
                            </h4>
                            <p className="text-[var(--brand-ink)] font-medium">
                              {formData.eventName}
                            </p>
                            <p className="text-[var(--brand-ink)]/70 text-sm">
                              {formData.eventType} • {formData.format} • {formData.expectedDate}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[var(--brand-ink)]/50 uppercase tracking-wider mb-2">
                              Requirements
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {formData.requirements.length > 0 ? (
                                formData.requirements.map((r) => (
                                  <span
                                    key={r}
                                    className="inline-flex items-center rounded-full bg-[var(--brand-ink)]/5 px-2.5 py-0.5 text-xs font-semibold text-[var(--brand-ink)]"
                                  >
                                    {r}
                                  </span>
                                ))
                              ) : (
                                <span className="text-sm text-[var(--brand-ink)]/50">
                                  None selected
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <Checkbox
                              checked={formData.agreeTerms}
                              onCheckedChange={(v) => updateForm("agreeTerms", v)}
                              className="mt-1"
                            />
                            <span className="text-sm text-[var(--brand-ink)]/70 leading-relaxed">
                              I agree to the OrigoHOST Community Guidelines and Terms of Service. I
                              understand that submitting this proposal does not guarantee
                              partnership.
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer Controls */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--brand-ink)]/10">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  disabled={step === 1 || isSubmitting}
                  className={step === 1 ? "opacity-0 pointer-events-none" : ""}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>

                {step < 5 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-[var(--brand-ink)] hover:bg-[var(--brand-ink)]/90 text-white px-8"
                  >
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.agreeTerms || isSubmitting}
                    className="bg-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/90 text-white px-10 shadow-lg"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                    )}
                    Submit Proposal
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
