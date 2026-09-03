import { ApplicationWizard } from "@/components/ambassador/apply/ApplicationWizard";

export default function BecomeAmbassadorApplyPage() {
  return (
    <main className="min-h-screen w-full bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center object-cover">
      <div className="min-h-screen w-full bg-[#0A0F1C]/60 backdrop-blur-xl flex flex-col pt-24 pb-12 px-4 sm:px-6">
        <div className="w-full max-w-7xl mx-auto mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
            Become an Ambassador
          </h1>
          <p className="text-lg text-blue-100">
            Apply to represent OrigoHOST at your campus and earn exclusive rewards.
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto flex-1 bg-white/95 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20">
          <ApplicationWizard />
        </div>
      </div>
    </main>
  );
}
