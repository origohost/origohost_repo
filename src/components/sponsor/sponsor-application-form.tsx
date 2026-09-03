"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2, ArrowRight, ArrowLeft, UploadCloud, CheckCircle2 } from "lucide-react";
import { sponsorApi, SponsorApplicationData } from "@/features/sponsors/sponsor.api";
import { submitSponsorApplicationFn } from "@/features/sponsors/actions";
import { useNavigate } from "@tanstack/react-router";

// Form Schema
const sponsorFormSchema = z.object({
  company_name: z.string().min(2, "Company Name is required"),
  website: z.string().url("Must be a valid URL"),
  company_type: z.string().optional(),
  industry: z.string().optional(),
  company_size: z.string().optional(),
  gst_number: z.string().optional(),
  linkedin_company: z.string().optional(),
  headquarters: z.string().optional(),
  country: z.string().optional(),

  contact_name: z.string().min(2, "Full Name is required"),
  contact_designation: z.string().min(2, "Designation is required"),
  contact_email: z.string().email("Must be a valid work email"),
  contact_phone: z.string().min(10, "Phone number is required"),
  contact_linkedin: z.string().optional(),
  preferred_communication: z.enum(["Email", "Phone", "WhatsApp"]).default("Email"),

  interested_in: z.array(z.string()).min(1, "Select at least one partnership interest"),
  budget_range: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  goals: z.array(z.string()).optional(),
  resources_provided: z.array(z.string()).optional(),

  detailed_message: z.string().optional(),
  special_requirements: z.string().optional(),
  expected_roi: z.string().optional(),
  previous_experience: z.string().optional(),

  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to be contacted" }),
  }),
});

type SponsorFormValues = z.infer<typeof sponsorFormSchema>;

const INTERESTS = [
  "Hackathon",
  "Workshop",
  "Meetup",
  "Bootcamp",
  "Webinar",
  "Community Partnership",
  "Hiring Partnership",
  "Education Partnership",
  "Campus Program",
  "Open Source Initiative",
  "Conference",
  "Custom",
];
const BUDGETS = ["₹25K–50K", "₹50K–1L", "₹1L–5L", "₹5L–10L", "₹10L+", "Custom"];
const TIMELINES = ["Immediately", "Within 1 Month", "Within 3 Months", "Flexible"];
const GOALS = [
  "Brand Awareness",
  "Hiring",
  "Internships",
  "Product Promotion",
  "Community Building",
  "Lead Generation",
  "Developer Outreach",
  "Open Source",
  "Education",
  "CSR",
  "Other",
];
const RESOURCES = [
  "Cash Sponsorship",
  "Prize Money",
  "Cloud Credits",
  "API Credits",
  "Software Licenses",
  "Swags",
  "Coupons",
  "Gift Cards",
  "Speakers",
  "Mentors",
  "Judges",
  "Recruiters",
  "Technical Support",
  "Venue",
  "Food",
  "Other",
];

export function SponsorApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    logo: null,
    brandKit: null,
    proposal: null,
    marketing: null,
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<SponsorFormValues>({
    resolver: zodResolver(sponsorFormSchema) as any,
    defaultValues: {
      interested_in: [],
      goals: [],
      resources_provided: [],
      preferred_communication: "Email",
      consent: undefined,
    },
    mode: "onChange",
  });

  const handleNext = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["company_name", "website"]);
    } else if (step === 2) {
      isValid = await trigger([
        "contact_name",
        "contact_designation",
        "contact_email",
        "contact_phone",
      ]);
    } else if (step === 3) {
      isValid = await trigger(["interested_in", "budget_range", "timeline"]);
    }

    if (isValid) {
      setStep((prev) => prev + 1);
      window.scrollTo({
        top: (document.getElementById("sponsor-form")?.offsetTop || 100) - 100,
        behavior: "smooth",
      });
    } else {
      toast.error("Please fill in all required fields correctly.");
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({
      top: (document.getElementById("sponsor-form")?.offsetTop || 100) - 100,
      behavior: "smooth",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 20 * 1024 * 1024) {
        toast.error("File size exceeds 20MB limit.");
        return;
      }
      setFiles((prev) => ({ ...prev, [key]: file }));
    }
  };

  const onSubmit = async (data: SponsorFormValues) => {
    setIsSubmitting(true);
    try {
      let logo_url, brand_kit_url, proposal_pdf_url, marketing_assets_url;

      // Upload files if present
      if (files.logo) logo_url = await sponsorApi.uploadAsset(files.logo, "logos");
      if (files.brandKit)
        brand_kit_url = await sponsorApi.uploadAsset(files.brandKit, "brand_kits");
      if (files.proposal)
        proposal_pdf_url = await sponsorApi.uploadAsset(files.proposal, "proposals");
      if (files.marketing)
        marketing_assets_url = await sponsorApi.uploadAsset(files.marketing, "marketing");

      const idempotencyKey =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString();

      const payload = {
        ...data,
        logo_url,
        brand_kit_url,
        proposal_pdf_url,
        marketing_assets_url,
        idempotencyKey,
      };

      const result = await submitSponsorApplicationFn({ data: payload });
      if (result?.message === "Duplicate application ignored safely.") {
        toast.success("Application submitted successfully.");
        navigate({ to: "/sponsor/success" });
      } else if (result?.warning) {
        toast.success("Application submitted, but email notification failed.");
        navigate({ to: "/sponsor/success" });
      } else {
        toast.success("Application submitted successfully.");
        navigate({ to: "/sponsor/success" });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchInterests = watch("interested_in") || [];
  const watchGoals = watch("goals") || [];
  const watchResources = watch("resources_provided") || [];

  return (
    <div
      id="sponsor-form"
      className="bg-white rounded-3xl p-6 sm:p-12 shadow-2xl shadow-[var(--brand-blue)]/5 border border-[var(--brand-ink)]/10 relative overflow-hidden"
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
        <div
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="mb-10 text-center">
        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">
          Step {step} of 4
        </p>
        <h2 className="text-3xl font-black text-[var(--brand-ink)]">
          {step === 1 && "Company Information"}
          {step === 2 && "Primary Contact"}
          {step === 3 && "Partnership Interest"}
          {step === 4 && "Proposal & Assets"}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8 max-w-4xl mx-auto">
        {/* STEP 1: COMPANY INFO */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("company_name")}
                  className="h-12 bg-slate-50 border-slate-200"
                  placeholder="Acme Corp"
                />
                {errors.company_name && (
                  <p className="text-xs text-red-500">{errors.company_name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>
                  Website <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("website")}
                  type="url"
                  className="h-12 bg-slate-50 border-slate-200"
                  placeholder="https://example.com"
                />
                {errors.website && <p className="text-xs text-red-500">{errors.website.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Company Type</Label>
                <Input
                  {...register("company_type")}
                  className="h-12 bg-slate-50 border-slate-200"
                  placeholder="e.g. Startup, Enterprise"
                />
              </div>
              <div className="space-y-2">
                <Label>Industry</Label>
                <Input
                  {...register("industry")}
                  className="h-12 bg-slate-50 border-slate-200"
                  placeholder="e.g. Cloud Computing"
                />
              </div>
              <div className="space-y-2">
                <Label>Company Size</Label>
                <Input
                  {...register("company_size")}
                  className="h-12 bg-slate-50 border-slate-200"
                  placeholder="e.g. 100-500"
                />
              </div>
              <div className="space-y-2">
                <Label>GST Number (Optional)</Label>
                <Input
                  {...register("gst_number")}
                  className="h-12 bg-slate-50 border-slate-200"
                  placeholder="For invoicing"
                />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn Company Page</Label>
                <Input
                  {...register("linkedin_company")}
                  type="url"
                  className="h-12 bg-slate-50 border-slate-200"
                  placeholder="https://linkedin.com/company/..."
                />
              </div>
              <div className="space-y-2">
                <Label>Headquarters</Label>
                <Input
                  {...register("headquarters")}
                  className="h-12 bg-slate-50 border-slate-200"
                  placeholder="e.g. Bangalore, KA"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CONTACT INFO */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("contact_name")}
                  className="h-12 bg-slate-50 border-slate-200"
                  placeholder="John Doe"
                />
                {errors.contact_name && (
                  <p className="text-xs text-red-500">{errors.contact_name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>
                  Designation <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("contact_designation")}
                  className="h-12 bg-slate-50 border-slate-200"
                  placeholder="e.g. DevRel Manager"
                />
                {errors.contact_designation && (
                  <p className="text-xs text-red-500">{errors.contact_designation.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>
                  Business Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("contact_email")}
                  type="email"
                  className="h-12 bg-slate-50 border-slate-200"
                  placeholder="john@company.com"
                />
                {errors.contact_email && (
                  <p className="text-xs text-red-500">{errors.contact_email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("contact_phone")}
                  className="h-12 bg-slate-50 border-slate-200"
                  placeholder="+91 98765 43210"
                />
                {errors.contact_phone && (
                  <p className="text-xs text-red-500">{errors.contact_phone.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>LinkedIn Profile</Label>
                <Input
                  {...register("contact_linkedin")}
                  type="url"
                  className="h-12 bg-slate-50 border-slate-200"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className="space-y-2">
                <Label>Preferred Communication</Label>
                <RadioGroup
                  defaultValue="Email"
                  onValueChange={(v) => setValue("preferred_communication", v as any)}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Email" id="comm-email" />
                    <Label htmlFor="comm-email" className="cursor-pointer">
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Phone" id="comm-phone" />
                    <Label htmlFor="comm-phone" className="cursor-pointer">
                      Phone
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="WhatsApp" id="comm-wa" />
                    <Label htmlFor="comm-wa" className="cursor-pointer">
                      WhatsApp
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: INTERESTS */}
        {step === 3 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <Label className="text-lg">
                Interested In <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {INTERESTS.map((item) => (
                  <label
                    key={item}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${watchInterests.includes(item) ? "bg-blue-50 border-blue-500 ring-1 ring-blue-500" : "bg-slate-50 border-slate-200 hover:bg-slate-100"}`}
                  >
                    <Checkbox
                      checked={watchInterests.includes(item)}
                      onCheckedChange={(checked) => {
                        const newArray = checked
                          ? [...watchInterests, item]
                          : watchInterests.filter((i) => i !== item);
                        setValue("interested_in", newArray, { shouldValidate: true });
                      }}
                    />
                    <span className="text-sm font-medium">{item}</span>
                  </label>
                ))}
              </div>
              {errors.interested_in && (
                <p className="text-xs text-red-500">{errors.interested_in.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label className="text-lg">
                  Budget Range <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  onValueChange={(v) => setValue("budget_range", v)}
                  className="grid grid-cols-2 gap-3"
                >
                  {BUDGETS.map((item) => (
                    <div
                      key={item}
                      className={`flex items-center space-x-3 p-4 rounded-xl border ${watch("budget_range") === item ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500" : "bg-slate-50 border-slate-200"}`}
                    >
                      <RadioGroupItem value={item} id={`budget-${item}`} />
                      <Label
                        htmlFor={`budget-${item}`}
                        className="cursor-pointer text-sm font-medium"
                      >
                        {item}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {errors.budget_range && (
                  <p className="text-xs text-red-500">{errors.budget_range.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <Label className="text-lg">
                  Timeline <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  onValueChange={(v) => setValue("timeline", v)}
                  className="grid grid-cols-2 gap-3"
                >
                  {TIMELINES.map((item) => (
                    <div
                      key={item}
                      className={`flex items-center space-x-3 p-4 rounded-xl border ${watch("timeline") === item ? "bg-orange-50 border-orange-500 ring-1 ring-orange-500" : "bg-slate-50 border-slate-200"}`}
                    >
                      <RadioGroupItem value={item} id={`timeline-${item}`} />
                      <Label
                        htmlFor={`timeline-${item}`}
                        className="cursor-pointer text-sm font-medium"
                      >
                        {item}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {errors.timeline && (
                  <p className="text-xs text-red-500">{errors.timeline.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-lg">Goals</Label>
              <div className="flex flex-wrap gap-2">
                {GOALS.map((item) => (
                  <label
                    key={item}
                    className={`px-4 py-2 rounded-full border cursor-pointer text-sm transition-colors ${watchGoals.includes(item) ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={watchGoals.includes(item)}
                      onChange={(e) => {
                        const newArray = e.target.checked
                          ? [...watchGoals, item]
                          : watchGoals.filter((i) => i !== item);
                        setValue("goals", newArray);
                      }}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-lg">Resources You Can Provide</Label>
              <div className="flex flex-wrap gap-2">
                {RESOURCES.map((item) => (
                  <label
                    key={item}
                    className={`px-4 py-2 rounded-full border cursor-pointer text-sm transition-colors ${watchResources.includes(item) ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={watchResources.includes(item)}
                      onChange={(e) => {
                        const newArray = e.target.checked
                          ? [...watchResources, item]
                          : watchResources.filter((i) => i !== item);
                        setValue("resources_provided", newArray);
                      }}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: PROPOSAL & UPLOADS */}
        {step === 4 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <Label className="text-lg">Detailed Proposal</Label>
              <Textarea
                {...register("detailed_message")}
                placeholder="Tell us more about how you want to partner with OrigoHOST..."
                className="min-h-[150px] bg-slate-50 border-slate-200 resize-none text-base"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Special Requirements</Label>
                <Textarea
                  {...register("special_requirements")}
                  className="bg-slate-50 border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label>Expected ROI</Label>
                <Textarea {...register("expected_roi")} className="bg-slate-50 border-slate-200" />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-lg flex items-center justify-between">
                Upload Assets{" "}
                <span className="text-xs text-slate-500 font-normal">Max 20MB per file</span>
              </Label>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { id: "logo", label: "Company Logo (PNG/SVG)" },
                  { id: "brandKit", label: "Brand Kit (PDF/ZIP)" },
                  { id: "proposal", label: "Proposal PDF" },
                  { id: "marketing", label: "Marketing Assets (ZIP)" },
                ].map((upload) => (
                  <label
                    key={upload.id}
                    className="flex items-center gap-4 p-4 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div
                      className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center ${files[upload.id] ? "bg-emerald-100 text-emerald-600" : "bg-blue-50 text-blue-600"}`}
                    >
                      {files[upload.id] ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <UploadCloud className="h-5 w-5" />
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-[var(--brand-ink)]">{upload.label}</p>
                      <p className="text-xs text-slate-500 truncate">
                        {files[upload.id]?.name || "Click to upload"}
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, upload.id)}
                      accept={upload.id === "logo" ? "image/*" : undefined}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t">
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  className="mt-1"
                  onCheckedChange={(c) =>
                    setValue("consent", c ? true : (undefined as any), { shouldValidate: true })
                  }
                />
                <span className="text-sm text-slate-600">
                  I agree to be contacted by OrigoHOST regarding this sponsorship inquiry. I
                  understand that submitting this form does not guarantee a partnership.
                </span>
              </label>
              {errors.consent && (
                <p className="text-xs text-red-500 mt-2">{errors.consent.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
              className="rounded-xl h-12 px-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="rounded-xl h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl h-12 px-10 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <CheckCircle2 className="mr-2 h-5 w-5" />
              )}
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
