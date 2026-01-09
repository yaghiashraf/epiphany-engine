'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { HistoricalEvent } from '@/app/data/timeline';
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

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.05, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div 
      ref={ref}
      style={{ scale: springScale, opacity, y, rotateX, perspective: 1000 }}
      className="w-full max-w-5xl mx-auto my-32 md:my-60 px-4 flex flex-col md:flex-row gap-8 md:gap-16 items-center"
    >
      {/* Visual Content (Left/Top) */}
      <div className="flex-1 w-full relative group">
        <div 
            className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl transition-all duration-700 group-hover:opacity-40" 
            style={{ background: event.color }}
        />
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl overflow-hidden shadow-2xl">
           {/* Header */}
           <div className="flex items-center gap-4 mb-6">
                <div 
                    className="p-4 rounded-2xl text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${event.color}, #000)` }}
                >
                    <event.icon size={32} />
                </div>
                <div>
                    <h3 className="text-sm font-mono tracking-widest uppercase opacity-50" style={{ color: event.color }}>
                        {event.yearDisplay}
                    </h3>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">
                        {event.title}
                    </h2>
                </div>
           </div>

           <p className="text-lg text-gray-300 leading-relaxed mb-8">
             {event.description}
           </p>

           {/* Visualization */}
           <div className="h-64 w-full bg-black/20 rounded-xl border border-white/5 overflow-hidden p-4">
                <StatsViz data={event.stats} color={event.color} />
           </div>
        </div>
      </div>

      {/* Decorative Year Marker (Right/Bottom) */}
      <div className="md:w-32 hidden md:flex flex-col items-center justify-center opacity-30">
         <div className="w-1 h-32 bg-gradient-to-b from-transparent via-white to-transparent" />
         <span className="my-4 font-mono text-xl text-white" style={{ textShadow: `0 0 20px ${event.color}` }}>
            {Math.abs(event.year)}
         </span>
         <div className="w-1 h-32 bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>
    </motion.div>
  );
}
