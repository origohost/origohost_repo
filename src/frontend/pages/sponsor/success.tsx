import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft, Mail, Calendar } from "lucide-react";
import { m as motion } from "framer-motion";

export default function SponsorSuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-2xl w-full bg-white rounded-3xl p-8 md:p-16 shadow-2xl shadow-blue-900/5 text-center border border-slate-100"
      >
        <div className="h-24 w-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="h-12 w-12" />
        </div>

        <h1 className="text-4xl font-black text-[var(--brand-ink)] mb-4">Application Submitted!</h1>
        <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto leading-relaxed">
          Thank you for expressing interest in sponsoring OrigoHOST. We have received your proposal
          and our partnerships team will review it shortly.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left max-w-lg mx-auto">
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
            <Mail className="h-6 w-6 text-blue-600 mb-2" />
            <h3 className="font-bold text-[var(--brand-ink)]">Check Your Inbox</h3>
            <p className="text-sm text-slate-600">
              We've sent a confirmation email with your application details.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100">
            <Calendar className="h-6 w-6 text-orange-600 mb-2" />
            <h3 className="font-bold text-[var(--brand-ink)]">Next Steps</h3>
            <p className="text-sm text-slate-600">
              Expect a response within 48-72 hours to schedule a meeting.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700">
            <Link to="/">Back to Home</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 px-8 rounded-xl">
            <Link to="/sponsor">
              <ArrowLeft className="mr-2 h-4 w-4" /> Sponsor Page
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
