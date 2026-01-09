'use client';

import { motion } from 'framer-motion';

export default function EventAnimation({ id, color }: { id: string; color: string }) {
  
  const containerStyle = "w-full h-full flex items-center justify-center overflow-hidden bg-black/10";

  switch (id) {
    case 'fire':
      return (
        <div className={containerStyle}>
          <motion.div
            animate={{ 
                scale: [1, 1.2, 1], 
                rotate: [0, 5, -5, 0],
                filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="relative"
          >
            {/* Fire Base */}
            <svg width="120" height="120" viewBox="0 0 24 24" fill={color} stroke="none">
               <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a5.5 5.5 0 11-11 0c0-3.042 2.2-5.874 3.27-6.4-.482.934-.657 2.05-.27 2.9z"/>
            </svg>
            {/* Sparks */}
            <motion.div 
                className="absolute top-0 left-4 w-1 h-1 bg-yellow-400 rounded-full"
                animate={{ y: -20, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1 }}
            />
            <motion.div 
                className="absolute top-2 right-4 w-1.5 h-1.5 bg-orange-300 rounded-full"
                animate={{ y: -30, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.5 }}
            />
          </motion.div>
        </div>
      );

    case 'wheel':
      return (
        <div className={containerStyle}>
          <div className="relative w-full h-full flex items-center justify-center">
             {/* Road */}
             <div className="absolute bottom-10 w-full h-1 bg-white/20" />
             
             {/* Rolling Wheel */}
             <motion.div
                animate={{ x: [-100, 100], rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="mb-6"
             >
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
                   <circle cx="12" cy="12" r="10" />
                   <path d="M12 2v20" />
                   <path d="M2 12h20" />
                   <path d="M4.93 4.93l14.14 14.14" />
                   <path d="M19.07 4.93L4.93 19.07" />
                </svg>
             </motion.div>
          </div>
        </div>
      );

    case 'writing':
        return (
          <div className={containerStyle}>
             <div className="relative w-32 h-40 bg-[#e0c9a6] rounded shadow-lg p-4 flex flex-col gap-2">
                 <motion.div 
                    className="h-1 bg-black/40 rounded w-0"
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                 />
                 <motion.div 
                    className="h-1 bg-black/40 rounded w-0"
                    animate={{ width: "80%" }}
                    transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
                 />
                 <motion.div 
                    className="h-1 bg-black/40 rounded w-0"
                    animate={{ width: "90%" }}
                    transition={{ duration: 1, delay: 1.0, repeat: Infinity, repeatDelay: 2 }}
                 />
                 
                 {/* Floating Feather */}
                 <motion.div
                    className="absolute -right-4 top-10 text-4xl"
                    animate={{ x: [0, 5, 0], y: [0, 10, 20], rotate: [0, 10, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                 >
                    🪶
                 </motion.div>
             </div>
          </div>
        );

    case 'printing':
        return (
          <div className={containerStyle}>
              <div className="flex flex-col items-center">
                  <motion.div
                    className="w-32 h-4 bg-gray-600 mb-1"
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                  <div className="w-24 h-24 bg-white border-2 border-gray-300 flex items-center justify-center relative overflow-hidden">
                      <motion.span
                         className="text-4xl font-serif text-black"
                         initial={{ opacity: 0, y: -20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.8, repeat: Infinity }}
                      >
                         A
                      </motion.span>
                  </div>
                  {/* Conveyor belt effect */}
                  <motion.div 
                    className="w-40 h-2 bg-gray-500 mt-2"
                  />
              </div>
          </div>
        );

    case 'steam':
        return (
            <div className={containerStyle}>
                <div className="relative">
                    {/* Piston */}
                    <div className="w-16 h-32 border-2 border-gray-500 rounded-lg relative overflow-hidden bg-gray-900">
                        <motion.div 
                            className="w-full bg-gray-400 absolute bottom-0"
                            animate={{ height: ["20%", "80%", "20%"] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    {/* Steam */}
                    <motion.div
                        className="absolute -top-4 right-0 w-4 h-4 bg-white rounded-full opacity-50 blur-sm"
                        animate={{ y: -40, x: 10, scale: 2, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute -top-4 left-0 w-3 h-3 bg-white rounded-full opacity-50 blur-sm"
                        animate={{ y: -30, x: -5, scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
                    />
                </div>
            </div>
        );

    case 'lightbulb':
        return (
            <div className={containerStyle}>
                <motion.div
                    animate={{ opacity: [0.2, 1, 0.8, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, times: [0, 0.1, 0.2, 0.3, 1] }}
                >
                    <svg width="100" height="100" viewBox="0 0 24 24" fill={color} stroke="none">
                        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
                    </svg>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-40 mix-blend-screen" />
                </motion.div>
            </div>
        );

    case 'flight':
        return (
            <div className={containerStyle}>
                 <motion.div
                    animate={{ x: [-150, 150], y: [20, -20, 20], rotate: [5, -5, 5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 >
                    <svg width="80" height="40" viewBox="0 0 24 24" fill="white" stroke="none">
                         <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                    </svg>
                    <div className="w-10 h-1 bg-white/50 blur-sm absolute top-1/2 -left-4" />
                 </motion.div>
                 {/* Clouds */}
                 <motion.div className="absolute top-10 left-10 w-16 h-8 bg-white/10 rounded-full blur-md" animate={{ x: -200 }} transition={{duration: 10, repeat: Infinity}} />
            </div>
        );
        
    case 'moon':
        return (
            <div className={containerStyle}>
                <div className="relative w-32 h-32 rounded-full bg-gray-200 overflow-hidden shadow-inner">
                    {/* Craters */}
                    <div className="absolute top-4 left-6 w-4 h-4 bg-gray-300 rounded-full opacity-50" />
                    <div className="absolute bottom-8 right-8 w-6 h-6 bg-gray-300 rounded-full opacity-50" />
                    
                    {/* Rocket Landing */}
                    <motion.div
                        className="absolute w-4 h-8 bg-white"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 40, opacity: 1 }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                    >
                         <div className="absolute -bottom-2 w-full h-2 bg-orange-500 rounded-full blur-sm" />
                    </motion.div>
                </div>
            </div>
        );

    case 'internet':
        return (
            <div className={containerStyle}>
                <div className="grid grid-cols-3 gap-8">
                    {[0, 1, 2, 3, 4, 5].map(i => (
                        <motion.div
                            key={i}
                            className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f0ff]"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                        />
                    ))}
                    {/* Connecting Lines SVG overlay would be complex, simpler to suggest connections via pulsing */}
                </div>
                {/* Data packets */}
                <motion.div className="absolute w-full h-0.5 bg-cyan-500 top-1/2" animate={{ opacity: [0,1,0] }} transition={{duration:0.5, repeat:Infinity}} />
            </div>
        );

    case 'crypto':
        return (
            <div className={containerStyle}>
                <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div className="w-24 h-24 rounded-full bg-yellow-500 border-4 border-yellow-300 flex items-center justify-center text-5xl font-bold text-yellow-900 shadow-[0_0_30px_#f7931a]">
                        ₿
                    </div>
                </motion.div>
            </div>
        );

    case 'ai':
        return (
            <div className={containerStyle}>
                <div className="relative flex items-center justify-center">
                    {/* Brain Network */}
                    <motion.div 
                        className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" 
                        animate={{ scale: [1, 1.2, 1] }} 
                        transition={{ duration: 2, repeat: Infinity }} 
                    />
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="0.5">
                        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                        <motion.circle cx="12" cy="12" r="3" fill="white" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity }} />
                        <motion.path d="M12 6v6l4 2" stroke="white" strokeWidth="1" animate={{ pathLength: [0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                    </svg>
                    
                    {/* Floating Nodes */}
                    <motion.div className="absolute -top-4 -right-4 w-2 h-2 bg-white rounded-full" animate={{ y: [0, 10, 0] }} transition={{duration: 2, repeat: Infinity}} />
                    <motion.div className="absolute -bottom-4 -left-4 w-2 h-2 bg-white rounded-full" animate={{ y: [0, -10, 0] }} transition={{duration: 2, delay: 0.5, repeat: Infinity}} />
                </div>
            </div>
        );

    default:
      return <div className="text-white/20">Visualization Pending</div>;
  }
}
