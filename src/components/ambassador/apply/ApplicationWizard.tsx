import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { m as motion, AnimatePresence } from "framer-motion";
import {
  ambassadorApplicationSchema,
  type AmbassadorApplicationData,
  defaultValues,
} from "./schema";
import { Check, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import { submitApplicationFn } from "./actions";

// Steps will be imported here
import { Step1Personal } from "./steps/Step1Personal";
import { Step2Contact } from "./steps/Step2Contact";
import { Step3Education } from "./steps/Step3Education";
import { Step4SkillsSocial } from "./steps/Step4SkillsSocial";
import { Step5Experience } from "./steps/Step5Experience";
import { Step6Questions } from "./steps/Step6Questions";
import { Step7Review } from "./steps/Step7Review";

const STEPS = [
  "Personal Info",
  "Contact Details",
  "Education",
  "Skills & Social",
  "Experience",
  "Questionnaire",
  "Review & Submit",
];

export function ApplicationWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm<AmbassadorApplicationData>({
    resolver: zodResolver(ambassadorApplicationSchema as any),
    defaultValues: { ...defaultValues },
    mode: "onTouched",
  });

  const nextStep = async () => {
    // Determine which fields to validate based on current step
    let fieldsToValidate: any[] = [];
    switch (currentStep) {
      case 0:
        fieldsToValidate = ["full_name", "dob", "gender", "nationality"];
        break;
      case 1:
        fieldsToValidate = ["email", "phone", "address", "city", "state", "pincode"];
        break;
      case 2:
        fieldsToValidate = [
          "education.university",
          "education.degree",
          "education.major",
          "education.yearOfStudy",
          "education.expectedGraduation",
        ];
        break;
      case 3:
        fieldsToValidate = [
          "skills",
          "social.linkedin",
          "social.github",
          "social.twitter",
          "social.portfolio",
        ];
        break;
      case 4:
        fieldsToValidate = [
          "experience.previousAmbassador",
          "experience.techCommunities",
          "experience.hackathons",
        ];
        break;
      case 5:
        fieldsToValidate = ["questions.whyOrigoHOSTs", "questions.strategy"];
        break;
    }

    const isValid = await methods.trigger(fieldsToValidate);

    if (isValid) {
      // Auto-save logic could go here
      setCurrentStep((p) => Math.min(p + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("Please fix the errors before continuing.");
    }
  };

  const prevStep = () => {
    setCurrentStep((p) => Math.max(p - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [idempotencyKey] = useState(() =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(),
  );

  const onSubmit = async (data: AmbassadorApplicationData) => {
    setIsSubmitting(true);
    try {
      // Call the server function which handles email and db securely
      const res = await submitApplicationFn({ data: { ...data, idempotencyKey } });

      if (res?.message === "Duplicate application ignored safely.") {
        toast.success("Application submitted successfully! We'll be in touch soon.");
      } else if (res?.warning) {
        toast.success(res.warning);
      } else {
        toast.success("Application submitted successfully! We'll be in touch soon.");
      }

      // Optionally redirect to a success page or reset form
      // reset();
      // navigate({ to: "/become-ambassador" });
    } catch (err: any) {
      toast.error(err.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[700px] bg-transparent">
      {/* Sidebar Progress Tracker */}
      <div className="w-full md:w-80 bg-white md:border-r border-b md:border-b-0 border-gray-200 p-4 md:p-8 flex-shrink-0 md:min-h-full">
        <div className="sticky top-4 md:top-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 md:mb-8 hidden md:block">
            Application
          </h2>
          <div className="flex flex-row md:flex-col gap-2 md:gap-6 overflow-x-auto no-scrollbar pb-2 md:pb-0 items-center md:items-start">
            {STEPS.map((step, idx) => {
              const isActive = currentStep === idx;
              const isPast = currentStep > idx;
              return (
                <div key={idx} className="flex items-center gap-2 md:gap-4 shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : isPast ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"}`}
                  >
                    {isPast ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span
                    className={`font-medium text-sm md:text-base ${isActive ? "text-gray-900" : isPast ? "text-gray-600" : "text-gray-400"} ${isActive ? "block" : "hidden md:block"}`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 p-4 md:p-12 lg:p-20 w-full max-w-full">
        <div className="max-w-3xl mx-auto w-full">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm border border-gray-100 w-full overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentStep === 0 && <Step1Personal />}
                  {currentStep === 1 && <Step2Contact />}
                  {currentStep === 2 && <Step3Education />}
                  {currentStep === 3 && <Step4SkillsSocial />}
                  {currentStep === 4 && <Step5Experience />}
                  {currentStep === 5 && <Step6Questions />}
                  {currentStep === 6 && (
                    <>
                      <Step7Review />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="fixed sm:static bottom-0 left-0 right-0 z-50 bg-white sm:bg-transparent p-4 sm:p-0 mt-0 sm:mt-12 sm:pt-8 border-t border-gray-200 sm:border-gray-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 w-full shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] sm:shadow-none pb-8 sm:pb-0">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0 || isSubmitting}
                  className="w-full sm:w-auto h-[52px] px-6 text-gray-600 font-medium bg-gray-50 sm:bg-transparent hover:bg-gray-100 sm:hover:bg-gray-50 rounded-xl disabled:opacity-50 transition-colors flex items-center justify-center border border-gray-200 sm:border-transparent"
                >
                  Back
                </button>

                {currentStep < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full sm:w-auto h-[52px] flex items-center justify-center gap-2 px-8 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto h-[52px] flex items-center justify-center gap-2 px-8 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                )}
              </div>

              {/* Spacer for mobile to prevent content from being hidden behind sticky nav */}
              <div className="h-32 sm:hidden" />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
