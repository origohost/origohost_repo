import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface HostProposalModalProps {
  children: React.ReactNode;
}

const EVENT_TYPES = [
  "Workshop",
  "Hackathon",
  "Meetup",
  "Conference",
  "Bootcamp",
  "Seminar",
  "Webinar",
  "Other",
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

export function HostProposalModal({ children }: HostProposalModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    organizationType: "",
    eventType: "",
    expectedDate: "",
    message: "",
  });

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.organization ||
      !formData.organizationType ||
      !formData.eventType
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real scenario, you'd insert this into your `host_requests` table
      // or a simpler lead capture table. For now, we'll simulate a quick capture.
      // E.g., just storing in organizations or a simple contact table.
      // We'll use the existing `communications` or just log it to a webhook.

      // Simulating a network request for the demo
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Proposal request sent! We'll get back to you within 24 hours.");
      setOpen(false);
      setFormData({
        fullName: "",
        email: "",
        organization: "",
        organizationType: "",
        eventType: "",
        expectedDate: "",
        message: "",
      });
    } catch (error: any) {
      toast.error("Failed to send proposal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[500px] bg-slate-900 border-slate-800 text-slate-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Get a Written Proposal</DialogTitle>
          <p className="text-sm text-slate-400">We'll respond within 24 hours.</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-slate-300">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.fullName}
              onChange={(e) => updateForm("fullName", e.target.value)}
              placeholder="Your full name"
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">
              Work Email <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => updateForm("email", e.target.value)}
              placeholder="you@company.com"
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">
              Organization <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.organization}
              onChange={(e) => updateForm("organization", e.target.value)}
              placeholder="Your organization"
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">
              Organization Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.organizationType}
              onValueChange={(v) => updateForm("organizationType", v)}
            >
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                {ORG_TYPES.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="focus:bg-slate-700 focus:text-white"
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">
                Event Type <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.eventType} onValueChange={(v) => updateForm("eventType", v)}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  {EVENT_TYPES.map((type) => (
                    <SelectItem
                      key={type}
                      value={type}
                      className="focus:bg-slate-700 focus:text-white"
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Expected Date</Label>
              <Input
                type="date"
                value={formData.expectedDate}
                onChange={(e) => updateForm("expectedDate", e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">
              Message <span className="text-slate-500 font-normal">(optional)</span>
            </Label>
            <Textarea
              value={formData.message}
              onChange={(e) => updateForm("message", e.target.value)}
              placeholder="Tell us about your event idea..."
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px]"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white mt-2"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Proposal &rarr;
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
