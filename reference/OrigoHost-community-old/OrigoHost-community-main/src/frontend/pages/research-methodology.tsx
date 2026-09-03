import { Microscope, Database, BarChart3 } from "lucide-react";

export default function ResearchMethodologyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Microscope className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black mb-6">Research Methodology</h1>
          <p className="text-xl text-slate-300">
            How Origo Labs designs, executes, and publishes enterprise-grade cloud and AI research.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-slate-700">
            <h2 id="methodology-overview">Our Scientific Approach</h2>
            <p className="font-semibold text-slate-900">
              Origo Labs employs strict scientific methodologies to conduct cloud infrastructure
              benchmarking, AI model evaluations, and enterprise security audits. Our goal is to
              provide unbiased, reproducible data to the global developer community.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <Database className="w-10 h-10 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Data Collection</h3>
                <p className="text-sm">
                  We gather empirical data through automated, containerized testing environments.
                  Benchmarks are run continuously over a minimum of 7 days to account for temporal
                  anomalies and network variance.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <BarChart3 className="w-10 h-10 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Statistical Analysis</h3>
                <p className="text-sm">
                  Raw data is parsed using Python/Pandas to identify standard deviations, 99th
                  percentile (P99) latencies, and outliers. We strictly report median values
                  alongside P99 to provide a realistic view of performance.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-16 mb-6">
              Reproducibility Guarantee
            </h3>
            <p>
              Open science is core to our methodology. For every published benchmark or research
              paper, Origo Labs open-sources the exact testing scripts, Dockerfiles, and raw CSV
              data outputs on our GitHub organization. Any developer can reproduce our findings
              independently.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">
              Conflict of Interest Disclosure
            </h3>
            <p>
              If a benchmark directly compares OrigoHOST infrastructure against a competitor (e.g.,
              AWS, DigitalOcean), we explicitly disclose this inherent conflict of interest at the
              top of the report. Furthermore, competitor tests are always run on equivalent
              price-tier hardware without any proprietary optimizations applied to our own stack.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
