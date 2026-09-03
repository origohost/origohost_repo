import { Beaker, BrainCircuit, Cpu } from "lucide-react";

export default function AboutResearchPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Beaker className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black mb-6">Origo Labs Research</h1>
          <p className="text-xl text-slate-300">
            Advancing the state of cloud infrastructure, distributed systems, and generative
            artificial intelligence.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-slate-700">
            <div className="mb-12 p-6 bg-cyan-50 border border-cyan-100 rounded-xl">
              <h2 id="tl-dr" className="text-xl font-bold text-cyan-900 mb-2">
                TL;DR: Origo Labs
              </h2>
              <p className="text-cyan-800 font-medium">
                Origo Labs is the R&D division of OrigoHOST. We focus on publishing open-source
                benchmarks for cloud performance, contributing to Kubernetes scalability, and
                fine-tuning open-weight Large Language Models (LLMs) for developer productivity.
              </p>
            </div>

            <h2 id="research-areas">Core Research Areas</h2>

            <h3 id="distributed-systems" className="flex items-center gap-2">
              <Server className="w-6 h-6 text-cyan-600" /> Distributed Systems & Cloud
            </h3>
            <p>
              Our infrastructure research focuses on reducing tail latency in highly distributed
              architectures. We regularly publish NVMe storage benchmarks, container orchestration
              analyses, and high-availability network topologies.
            </p>

            <h3 id="artificial-intelligence" className="flex items-center gap-2 mt-8">
              <BrainCircuit className="w-6 h-6 text-cyan-600" /> Artificial Intelligence & LLMs
            </h3>
            <p>
              The Origo AI team actively researches Generative Engine Optimization (GEO), AI agent
              orchestration, and the fine-tuning of open-source models (like Llama and Mistral) to
              operate efficiently within edge computing environments.
            </p>

            <h3 id="security" className="flex items-center gap-2 mt-8">
              <Cpu className="w-6 h-6 text-cyan-600" /> Enterprise Security
            </h3>
            <p>
              Security is an ever-evolving arms race. Origo Labs investigates zero-trust networks,
              automated threat mitigation, and cryptographic best practices, ensuring our enterprise
              clients remain protected against emerging vectors.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Server } from "lucide-react";
