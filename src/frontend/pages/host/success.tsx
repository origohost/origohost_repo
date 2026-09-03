import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, LayoutDashboard } from "lucide-react";
import { m as motion } from "framer-motion";

export default function HostSuccessPage() {
  return (
    <main className="bg-zinc-50 min-h-screen flex items-center justify-center relative z-0">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[var(--brand-blue)]/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center shadow-xl shadow-green-500/20">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl font-black text-[var(--brand-ink)] mb-4 tracking-tight">
            Proposal Submitted!
          </h1>
          <p className="text-lg text-[var(--brand-ink)]/60 mb-10 leading-relaxed">
            Thank you for choosing OrigoHOST. Our Partnerships Team will review your requirements
            and reach out within 48 hours to schedule a Discovery Call.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[var(--brand-ink)] hover:bg-[var(--brand-ink)]/90 text-white rounded-xl h-14 px-8"
            >
              <Link to="/dashboard/proposals">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Track Proposal
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[var(--brand-ink)]/20 text-[var(--brand-ink)] rounded-xl h-14 px-8"
            >
              <Link to="/host">
                Return Home <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
