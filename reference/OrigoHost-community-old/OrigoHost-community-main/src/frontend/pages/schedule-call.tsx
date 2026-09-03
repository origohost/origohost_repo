import { useState } from "react";
import { toast } from "sonner";
import { submitScheduleCall } from "@/features/calls/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Building2, Calendar, Mail, User, PhoneCall } from "lucide-react";

export function ScheduleCallPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    topic: "",
    preferredDate: "",
    notes: "",
  });

  const updateForm = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.topic) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitScheduleCall({
        full_name: formData.fullName,
        email: formData.email,
        organization: formData.organization,
        topic: formData.topic,
        preferred_date: formData.preferredDate,
        notes: formData.notes,
      });

      toast.success("Call request submitted successfully! We'll be in touch soon.");
      setFormData({
        fullName: "",
        email: "",
        organization: "",
        topic: "",
        preferredDate: "",
        notes: "",
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 px-8 py-10 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-black">Schedule a Call</h1>
                <p className="text-slate-400 mt-1">Let's discuss how we can work together.</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      value={formData.fullName}
                      onChange={(e) => updateForm("fullName", e.target.value)}
                      className="pl-10"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                      className="pl-10"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Organization / Company</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    value={formData.organization}
                    onChange={(e) => updateForm("organization", e.target.value)}
                    className="pl-10"
                    placeholder="Your Company Ltd."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Topic / Reason for Call *</Label>
                <Input
                  value={formData.topic}
                  onChange={(e) => updateForm("topic", e.target.value)}
                  placeholder="e.g. Sponsorship, Partnership, Support"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Preferred Date & Time</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="datetime-local"
                    value={formData.preferredDate}
                    onChange={(e) => updateForm("preferredDate", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional Notes (Optional)</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => updateForm("notes", e.target.value)}
                  placeholder="Anything else we should know?"
                  className="min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? "Submitting..." : "Schedule Call"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
