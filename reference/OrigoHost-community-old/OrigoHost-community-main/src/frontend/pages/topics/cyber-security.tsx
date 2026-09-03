import { ShieldAlert, LockKeyhole, EyeOff, Bug } from "lucide-react";

export default function TopicCyberSecurityPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <ShieldAlert className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-black mb-6">Cyber Security Hub</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Your centralized knowledge base for Zero Trust Architecture, penetration testing,
            cryptography, and enterprise defense strategies.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12 p-8 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <h2 id="what-is-cyber-security" className="text-2xl font-bold text-emerald-900 mb-3">
              What is Cyber Security?
            </h2>
            <p className="text-lg text-emerald-800 font-medium">
              Cyber Security is the practice of defending servers, mobile devices, electronic
              systems, networks, and data from malicious attacks. In enterprise cloud environments,
              it involves implementing strict IAM controls, end-to-end encryption, and continuous
              vulnerability monitoring.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <LockKeyhole className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Cryptography</h3>
              <p className="text-slate-600">
                Deep dives into AES-256, RSA, Elliptic Curve Cryptography, and post-quantum
                encryption protocols.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <EyeOff className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Zero Trust Architecture</h3>
              <p className="text-slate-600">
                How to implement "never trust, always verify" networking models across distributed
                microservices.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <Bug className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Penetration Testing</h3>
              <p className="text-slate-600">
                Methodologies for ethical hacking, vulnerability scanning, and bug bounty programs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
