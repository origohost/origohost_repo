import React, { useState } from "react";
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

interface SponsorProposalModalProps {
  children: React.ReactNode;
}

const SPONSOR_TYPES = [
  "Financial",
  "Venue Partner",
  "Cloud Credits / Infra",
  "Swag / Merch",
  "Food & Beverages",
  "Other",
];
const BUDGET_RANGES = [
  "< ₹10,000",
  "₹10,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "> ₹1,00,000",
  "Not Applicable",
];

export function SponsorProposalModal({ children }: SponsorProposalModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    sponsorType: "",
    budget: "",
    message: "",
  });

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.organization || !formData.sponsorType) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulating a network request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Sponsorship request sent! We'll get back to you within 24 hours.");
      setOpen(false);
      setFormData({
        fullName: "",
        email: "",
        organization: "",
        sponsorType: "",
        budget: "",
        message: "",
      });
    } catch (error: any) {
      toast.error("Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[500px] bg-slate-900 border-slate-800 text-slate-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Sponsor OrigoHOST</DialogTitle>
          <p className="text-sm text-slate-400">
            Partner with us to build the future of infrastructure in India.
          </p>
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
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:bg-slate-800"
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
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:bg-slate-800"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">
              Organization / Company <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.organization}
              onChange={(e) => updateForm("organization", e.target.value)}
              placeholder="Your organization"
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:bg-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">
                Sponsorship Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.sponsorType}
                onValueChange={(v) => updateForm("sponsorType", v)}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  {SPONSOR_TYPES.map((type) => (
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
              <Label className="text-slate-300">Budget Range</Label>
              <Select value={formData.budget} onValueChange={(v) => updateForm("budget", v)}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  {BUDGET_RANGES.map((range) => (
                    <SelectItem
                      key={range}
                      value={range}
                      className="focus:bg-slate-700 focus:text-white"
                    >
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">
              Message / Goals <span className="text-slate-500 font-normal">(optional)</span>
            </Label>
            <Textarea
              value={formData.message}
              onChange={(e) => updateForm("message", e.target.value)}
              placeholder="How would you like to collaborate?"
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px] focus-visible:bg-slate-800"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-2"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Sponsorship Inquiry &rarr;
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
