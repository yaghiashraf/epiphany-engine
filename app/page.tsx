'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Brain, RefreshCw } from 'lucide-react';
import { LLMEngine, EpiphanySession } from '@/app/engine';
import Lattice from '@/components/Lattice';

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<EpiphanySession | null>(null);

  const handleReveal = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const engine = new LLMEngine();
    try {
      const result = await engine.generateLattice(query);
      setSession(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSession(null);
    setQuery('');
  };

  return (
    <main className="flex flex-col h-screen max-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex-none text-center py-6 mb-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg"
        >
          Epiphany Engine
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-cyan-200/60 mt-2 text-sm md:text-base"
        >
          Unlock Your Mind. Engineer Your Breakthrough.
        </motion.p>
      </header>

      {/* Main Content Area - Flex Grow to fill space */}
      <div className="flex-1 flex flex-col relative min-h-0"> 
        <AnimatePresence mode="wait">
          {!session ? (
            /* INPUT VIEW */
            <motion.section
              key="input"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <label className="block text-lg text-cyan-100 mb-4 font-light">
                  What is weighing on your mind?
                </label>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., 'I feel stuck in my career', 'Why do I fear failure?'"
                  className="w-full h-40 bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none mb-6 text-lg"
                />
                
                <div className="flex justify-end">
                  <button
                    onClick={handleReveal}
                    disabled={loading || !query}
                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-bold text-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(191,0,255,0.5)]"
                  >
                    {loading ? (
                      <RefreshCw className="w-6 h-6 animate-spin" />
                    ) : (
                      <Sparkles className="w-6 h-6" />
                    )}
                    {loading ? 'Consulting Lattice...' : 'Reveal Truth'}
                  </button>
                </div>
              </div>
            </motion.section>
          ) : (
            /* EPIPHANY VIEW */
            <motion.section
              key="epiphany"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col md:flex-row gap-6 h-full min-h-0"
            >
              {/* Left: Visualization (Flexible Container) */}
              <div className="flex-[3] relative min-h-[300px] flex flex-col">
                 <Lattice nodes={session.nodes} />
              </div>

              {/* Right: Narrative (Scrollable Panel) */}
              <div className="flex-[2] flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl min-h-0">
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                  <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                    <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                      <Brain className="w-6 h-6" />
                      The Revelation
                    </h2>
                    <button onClick={reset} className="text-xs text-white/50 hover:text-white uppercase tracking-widest hover:underline">
                      New Query
                    </button>
                  </div>
                  
                  <div className="prose prose-invert prose-cyan max-w-none">
                     {/* Safe render of text with simplistic formatting */}
                     {session.narrative.split('\n\n').map((block, i) => {
                         if (block.startsWith('## ')) return <h3 key={i} className="text-xl text-purple-300 font-bold mt-4">{block.replace('## ', '')}</h3>;
                         if (block.startsWith('### ')) return <h4 key={i} className="text-lg text-cyan-200 font-semibold mt-4">{block.replace('### ', '')}</h4>;
                         return <p key={i} className="text-gray-300 leading-relaxed mb-4">{block.replace(/\*\*/g, '')}</p>;
                     })}
                  </div>
                </div>

                {/* Action Bar */}
                <div className="p-4 bg-black/20 border-t border-white/10 flex gap-3">
                  <button className="flex-1 py-3 border border-cyan-500/50 text-cyan-400 rounded-xl hover:bg-cyan-500/10 transition-colors font-semibold flex items-center justify-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    Drill Deeper
                  </button>
                  <button className="flex-1 py-3 border border-purple-500/50 text-purple-400 rounded-xl hover:bg-purple-500/10 transition-colors font-semibold">
                    Challenge This
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <footer className="flex-none text-center py-4 text-xs text-white/20">
        Epiphany Engine &copy; 2026. Local Processing Only.
      </footer>
    </main>
  );
}