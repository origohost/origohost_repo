import { Download, Image as ImageIcon, FileType, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PressPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-6">Press & Media Kit</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Everything you need to write about OrigoHOST. Download our official brand assets, logos,
            and high-resolution photography.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">About OrigoHOST</h2>
            <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">
              OrigoHOST is an India-based technology community and enterprise cloud infrastructure
              provider. Founded by Ritik Kumar, OrigoHOST bridges the gap between grassroots
              developer communities and scalable, high-performance platform engineering.
            </p>
          </div>

          {/* Brand Assets */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Brand Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Primary Logo */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                <div className="bg-slate-900 h-40 rounded-xl mb-6 flex items-center justify-center p-8">
                  <img
                    src="/origohost_monogram_transparent.png"
                    alt="OrigoHOST Primary Logo"
                    className="h-full object-contain filter invert"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Primary Monogram (Light)</h3>
                <p className="text-sm text-slate-500 mb-6">For use on dark backgrounds.</p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href="/origohost_monogram_transparent.png" download>
                      <Download className="w-4 h-4 mr-2" /> PNG
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/origohost_monogram_transparent.png" download>
                      <FileType className="w-4 h-4 mr-2" /> SVG
                    </a>
                  </Button>
                </div>
              </div>

              {/* Dark Logo */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                <div className="bg-slate-50 h-40 rounded-xl mb-6 flex items-center justify-center p-8 border border-slate-100">
                  <img
                    src="/logo.png"
                    alt="OrigoHOST Primary Logo"
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Primary Logo (Dark)</h3>
                <p className="text-sm text-slate-500 mb-6">For use on light backgrounds.</p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href="/logo.png" download>
                      <Download className="w-4 h-4 mr-2" /> PNG
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/logo.png" download>
                      <FileType className="w-4 h-4 mr-2" /> SVG
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Brand Colors</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <div className="h-24 bg-[#0a2540]"></div>
                <div className="p-4 bg-white">
                  <div className="font-bold text-sm">Brand Ink</div>
                  <div className="text-xs text-slate-500 uppercase mt-1">#0a2540</div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <div className="h-24 bg-[#f97316]"></div>
                <div className="p-4 bg-white">
                  <div className="font-bold text-sm">Origo Orange</div>
                  <div className="text-xs text-slate-500 uppercase mt-1">#f97316</div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <div className="h-24 bg-[#10b981]"></div>
                <div className="p-4 bg-white">
                  <div className="font-bold text-sm">Origo Green</div>
                  <div className="text-xs text-slate-500 uppercase mt-1">#10b981</div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <div className="h-24 bg-[#f8fafc]"></div>
                <div className="p-4 bg-white">
                  <div className="font-bold text-sm text-slate-900">Brand Cream</div>
                  <div className="text-xs text-slate-500 uppercase mt-1">#f8fafc</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-slate-900 text-white p-12 rounded-3xl text-center">
            <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Press & Media Inquiries</h2>
            <p className="text-slate-300 mb-6 max-w-lg mx-auto">
              If you are a member of the press and need additional information, commentary, or
              bespoke photography, please reach out to our media team.
            </p>
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              Contact PR Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
