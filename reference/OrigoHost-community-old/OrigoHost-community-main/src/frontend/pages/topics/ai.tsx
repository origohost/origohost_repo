import { BrainCircuit, Bot, Network, Cpu } from "lucide-react";

export default function TopicAIPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <BrainCircuit className="w-16 h-16 text-rose-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-black mb-6">Artificial Intelligence Hub</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            The definitive resource for learning, building, and deploying Generative AI, Large
            Language Models (LLMs), and machine learning infrastructure.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12 p-8 bg-rose-50 border border-rose-100 rounded-2xl">
            <h2 id="what-is-ai" className="text-2xl font-bold text-rose-900 mb-3">
              What is Artificial Intelligence?
            </h2>
            <p className="text-lg text-rose-800 font-medium">
              Artificial Intelligence (AI) refers to the simulation of human intelligence in
              machines that are programmed to think, learn, and problem-solve. In modern cloud
              architecture, AI primarily involves training and querying deep neural networks and
              Large Language Models (LLMs) to automate complex tasks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <Bot className="w-8 h-8 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">LLMs & Prompt Engineering</h3>
              <p className="text-slate-600">
                Master the art of crafting precise prompts for models like GPT-4, Claude, and Llama
                3.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <Network className="w-8 h-8 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">RAG Architectures</h3>
              <p className="text-slate-600">
                Build Retrieval-Augmented Generation systems using vector databases and dense
                embeddings.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <Cpu className="w-8 h-8 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">GPU Infrastructure</h3>
              <p className="text-slate-600">
                Learn how to deploy and scale AI workloads efficiently on bare-metal GPU clusters.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
