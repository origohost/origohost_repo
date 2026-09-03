import { PageShell } from "@/components/layout/page-shell";
import { Server, ShieldAlert, Leaf, CheckCircle2 } from "lucide-react";

export default function TransparencyReportPage() {
  return (
    <PageShell title="Transparency Report">
      <div className="bg-slate-900 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-6">Transparency Report</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          We believe trust is earned through verifiable data, not just marketing promises. Here is
          how we operate.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Server className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Uptime & Reliability (2025-2026)</h2>
          </div>
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-black text-gray-900">99.99%</div>
                <div className="text-sm text-gray-500 font-medium">Global Network Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-black text-gray-900">&lt;15m</div>
                <div className="text-sm text-gray-500 font-medium">Avg. Incident Resolution</div>
              </div>
              <div>
                <div className="text-3xl font-black text-gray-900">0</div>
                <div className="text-sm text-gray-500 font-medium">Data Loss Incidents</div>
              </div>
              <div>
                <div className="text-3xl font-black text-green-600 flex justify-center items-center gap-1">
                  <CheckCircle2 className="w-6 h-6" /> 100%
                </div>
                <div className="text-sm text-gray-500 font-medium">SLA Compliance</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">Law Enforcement Requests</h2>
          </div>
          <p className="text-gray-600 mb-6">
            We require a valid subpoena, court order, or search warrant before producing non-public
            user information.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 font-bold text-gray-900">Period</th>
                  <th className="py-4 font-bold text-gray-900">Requests Received</th>
                  <th className="py-4 font-bold text-gray-900">Accounts Affected</th>
                  <th className="py-4 font-bold text-gray-900">Requests Complied With</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100">
                  <td className="py-4">H1 2026</td>
                  <td className="py-4">0</td>
                  <td className="py-4">0</td>
                  <td className="py-4">0%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4">H2 2025</td>
                  <td className="py-4">0</td>
                  <td className="py-4">0</td>
                  <td className="py-4">0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Leaf className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Sustainability</h2>
          </div>
          <div className="bg-green-50 rounded-3xl p-8 border border-green-100">
            <p className="text-green-900 text-lg leading-relaxed">
              OrigoHOST is committed to powering the future of the internet responsibly. 100% of our
              core data centers operate on renewable energy credits, and we strictly optimize server
              utilization to minimize e-waste. Our goal is net-zero carbon footprint by 2028.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
