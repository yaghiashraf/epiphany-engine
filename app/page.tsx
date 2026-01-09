'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Brain, RefreshCw, Zap, ShieldAlert } from 'lucide-react';
import { LLMEngine } from '@/app/engine';
import { EpiphanySession } from '@/app/types';
import Lattice from '@/components/Lattice';

export default function Home() {
  const [query, setQuery] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('female');
  
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [session, setSession] = useState<EpiphanySession | null>(null);
  
  // Ref to auto-scroll narrative
  const narrativeEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (narrativeEndRef.current) {
        narrativeEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [session?.narrative]);

  const handleReveal = async () => {
    if (!query.trim() || !age) return;
    setLoading(true);
    const engine = new LLMEngine();
    try {
      const result = await engine.generateLattice(query, age, sex);
      setSession(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (type: 'deepen' | 'challenge') => {
    if (!session) return;
    setActionLoading(true);
    const engine = new LLMEngine();
    try {
        const updatedSession = await engine.evolveLattice(session, type);
        setSession(updatedSession);
    } catch (e) {
        console.error(e);
    } finally {
        setActionLoading(false);
    }
  };

  const reset = () => {
    setSession(null);
    setQuery('');
  };

  return (
    <main className="flex flex-col h-screen max-h-screen p-2 md:p-6 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <header className="flex-none text-center py-4 mb-2 z-20">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg"
        >
          Epiphany Engine
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-cyan-200/60 mt-1 text-xs md:text-sm uppercase tracking-widest"
        >
          Neural Mirroring System v2.0
        </motion.p>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative min-h-0 z-10"> 
        <AnimatePresence mode="wait">
          {!session ? (
            /* INPUT VIEW */
            <motion.section
              key="input"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col items-center justify-center p-4"
            >
              <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col gap-6">
                  {/* Demographics Row */}
                  <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-xs text-cyan-200 uppercase tracking-wider mb-2">Age (18+)</label>
                        <input 
                            type="number" 
                            min="18"
                            max="120"
                            value={age}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === '' || (parseInt(val) >= 0 && val.length <= 3)) {
                                    setAge(val);
                                }
                            }}
                            placeholder="e.g. 28"
                            className={`w-full bg-black/40 border rounded-xl p-3 text-white focus:outline-none focus:ring-1 transition-all ${
                                age && parseInt(age) < 18 
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-400'
                            }`}
                        />
                        {age && parseInt(age) < 18 && (
                            <span className="text-red-400 text-xs mt-1 block">Must be 18 or older to consult the lattice.</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs text-cyan-200 uppercase tracking-wider mb-2">Sex</label>
                        <select 
                            value={sex}
                            onChange={(e) => setSex(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all appearance-none"
                        >
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg text-cyan-100 mb-4 font-light">
                        What is the dilemma?
                    </label>
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., 'I feel stuck in my career even though I'm successful', 'Why do I keep dating the same type of person?'"
                        className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none text-lg"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleReveal}
                      disabled={loading || !query || !age || parseInt(age) < 18}
                      className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-bold text-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(191,0,255,0.5)]"
                    >
                      {loading ? (
                        <RefreshCw className="w-6 h-6 animate-spin" />
                      ) : (
                        <Sparkles className="w-6 h-6" />
                      )}
                      {loading ? 'Synthesizing...' : 'Reveal Truth'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          ) : (
            /* EPIPHANY VIEW */
            <motion.section
              key="epiphany"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col md:flex-row gap-4 h-full min-h-0 pb-4"
            >
              {/* Left: Visualization */}
              <div className="flex-[3] relative min-h-[300px] flex flex-col order-2 md:order-1">
                 <Lattice nodes={session.nodes} />
                 
                 {/* Floating Context Stats */}
                 <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs text-white/60">
                        Subject: {session.sex} / {session.age}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs text-cyan-400/80">
                        Nodes: {session.nodes.length}
                    </span>
                 </div>
              </div>

              {/* Right: Narrative */}
              <div className="flex-[2] flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl min-h-0 order-1 md:order-2">
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1 relative">
                  <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4 sticky top-0 bg-[#0a0a1a]/90 backdrop-blur-md z-10 -mx-6 px-6 -mt-6 pt-6">
                    <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      The Revelation
                    </h2>
                    <button onClick={reset} className="text-xs text-white/50 hover:text-white uppercase tracking-widest hover:underline">
                      New Query
                    </button>
                  </div>
                  
                  <div className="prose prose-invert prose-sm md:prose-base max-w-none pb-4">
                     {session.narrative.split('\n\n').map((block, i) => {
                         if (block.startsWith('## ')) return <h3 key={i} className="text-lg text-purple-300 font-bold mt-6 mb-2 border-l-2 border-purple-500 pl-3">{block.replace('## ', '')}</h3>;
                         if (block.startsWith('### ')) return <h4 key={i} className="text-md text-cyan-200 font-semibold mt-4 mb-2">{block.replace('### ', '')}</h4>;
                         return <p key={i} className="text-gray-300 leading-relaxed mb-3">{block.replace(/\*\*/g, '')}</p>;
                     })}
                     <div ref={narrativeEndRef} />
                  </div>
                </div>

                {/* Action Bar */}
                <div className="p-4 bg-black/20 border-t border-white/10 flex gap-3">
                  <button 
                    onClick={() => handleAction('deepen')}
                    disabled={actionLoading}
                    className="flex-1 py-3 border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 rounded-xl hover:bg-cyan-500/20 hover:border-cyan-500 transition-all font-semibold flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {actionLoading ? <RefreshCw className="w-4 h-4 animate-spin"/> : <ArrowRight className="w-4 h-4" />}
                    Drill Deeper
                  </button>
                  <button 
                    onClick={() => handleAction('challenge')}
                    disabled={actionLoading}
                    className="flex-1 py-3 border border-purple-500/30 bg-purple-500/5 text-purple-400 rounded-xl hover:bg-purple-500/20 hover:border-purple-500 transition-all font-semibold flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {actionLoading ? <RefreshCw className="w-4 h-4 animate-spin"/> : <ShieldAlert className="w-4 h-4" />}
                    Challenge This
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
