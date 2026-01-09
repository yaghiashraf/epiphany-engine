'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { TIMELINE_DATA } from './data/timeline';
import TimelineCard from './components/viz/TimelineCard';
import { ArrowDown } from 'lucide-react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  
  // Smooth progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Dynamic Background: Interpolate colors based on scroll position
  // 0% -> ancient (orange/dark), 50% -> industrial (grey), 100% -> digital (purple/cyan)
  const bgColors = [
      "#0f0500", // Fire (Top)
      "#0f0f05", // Classical
      "#0a0a0a", // Industrial
      "#000510", // Digital
      "#0a000a"  // Future (Bottom)
  ];
  
  const backgroundColor = useTransform(
      scrollYProgress,
      [0, 0.25, 0.5, 0.75, 1],
      bgColors
  );

  return (
    <motion.main 
        className="relative min-h-screen w-full overflow-x-hidden"
        style={{ backgroundColor }}
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50 mix-blend-difference"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center relative z-10 px-4">
        <motion.div
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
        >
            <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent tracking-tighter mb-4">
                CHRONO<br/>LENS
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide max-w-lg mx-auto">
                A visual journey from the first spark to the digital singularity.
            </p>
        </motion.div>
        
        <motion.div 
            className="absolute bottom-10"
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
        >
            <ArrowDown className="text-white w-8 h-8" />
        </motion.div>
      </section>

      {/* Timeline Stream */}
      <div className="relative pb-40">
        {/* Central Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block" />

        {TIMELINE_DATA.map((event, index) => (
            <TimelineCard key={event.id} event={event} index={index} />
        ))}
      </div>
      
      {/* Footer */}
      <footer className="py-20 text-center text-white/20 text-sm">
        <p>Engineered for Humanity &bull; 2026</p>
      </footer>
    </motion.main>
  );
}
