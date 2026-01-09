'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { HistoricalEvent } from '@/app/data/timeline';
import EventAnimation from './EventAnimation';
import StatsViz from './StatsViz';

interface Props {
  event: HistoricalEvent;
  index: number;
}

export default function TimelineCard({ event, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div 
      ref={ref}
      style={{ scale: springScale, opacity, y }}
      className="w-full max-w-6xl mx-auto my-32 md:my-48 px-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden relative group">
         
         {/* Animated Background Gradient */}
         <div 
            className="absolute -inset-full opacity-10 blur-3xl transition-opacity duration-700 group-hover:opacity-20 pointer-events-none" 
            style={{ background: `radial-gradient(circle, ${event.color}, transparent 70%)` }}
         />

         {/* Left Column: Animation Canvas */}
         <div className="w-full aspect-square md:aspect-[4/3] bg-black/30 rounded-2xl border border-white/5 overflow-hidden shadow-inner relative">
             <div className="absolute inset-0 flex items-center justify-center">
                <EventAnimation id={event.id} color={event.color} />
             </div>
             
             {/* Overlay Badge */}
             <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs font-mono uppercase tracking-widest text-white/80">
                {event.era}
             </div>
         </div>

         {/* Right Column: Info & Stats */}
         <div className="flex flex-col h-full justify-between">
             <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <event.icon size={24} style={{ color: event.color }} />
                    <span className="font-mono text-lg font-bold" style={{ color: event.color }}>{event.yearDisplay}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                    {event.title}
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                    {event.description}
                </p>
             </div>

             {/* Stats Viz Mini-Block */}
             <div className="h-32 w-full bg-white/5 rounded-xl border border-white/5 p-4">
                 <StatsViz data={event.stats} color={event.color} />
             </div>
         </div>

      </div>
    </motion.div>
  );
}