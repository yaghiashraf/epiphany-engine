'use client';

import { motion } from 'framer-motion';

export default function EventAnimation({ id, color }: { id: string; color: string }) {
  
  const containerStyle = "w-full h-full flex items-center justify-center overflow-hidden relative";

  // Common particle generator
  const Particles = ({ count, color }: { count: number, color: string }) => (
    <>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ 
              backgroundColor: color, 
              width: Math.random() * 4 + 2, 
              height: Math.random() * 4 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
          }}
          animate={{ 
              y: [0, -100], 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
          }}
          transition={{ 
              duration: Math.random() * 2 + 1, 
              repeat: Infinity, 
              delay: Math.random() * 2 
          }}
        />
      ))}
    </>
  );

  switch (id) {
    case 'fire':
      return (
        <div className={containerStyle}>
          {/* Night Sky */}
          <div className="absolute inset-0 bg-[#0a0500]" />
          <Particles count={15} color="#ffaa00" />
          
          <motion.div
            animate={{ scale: [1, 1.1, 0.95, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="relative z-10 mt-10"
          >
            {/* Logs */}
            <div className="absolute top-20 left-[-40px] w-24 h-6 bg-[#5D4037] rotate-12 rounded-full" />
            <div className="absolute top-20 right-[-40px] w-24 h-6 bg-[#4E342E] -rotate-12 rounded-full" />

            {/* Fire Base */}
            <svg width="140" height="140" viewBox="0 0 24 24" className="drop-shadow-[0_0_30px_#ff5500]">
               <motion.path 
                 fill={color} 
                 d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a5.5 5.5 0 11-11 0c0-3.042 2.2-5.874 3.27-6.4-.482.934-.657 2.05-.27 2.9z"
                 animate={{ d: [
                    "M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a5.5 5.5 0 11-11 0c0-3.042 2.2-5.874 3.27-6.4-.482.934-.657 2.05-.27 2.9z",
                    "M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a5.5 5.5 0 11-11 0c0-3.042 2.2-5.874 3.27-6.4-.482.934-.657 2.05-.27 2.9z" // SVG morphing is tricky without specific paths, using scale/skew instead
                 ]}}
               />
            </svg>
            
            {/* Inner Flame */}
            <motion.div 
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-16 bg-yellow-300 rounded-[50%_50%_40%_40%] mix-blend-screen blur-sm"
                animate={{ height: [60, 80, 50, 70], width: [40, 35, 45, 40] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
            />
          </motion.div>
        </div>
      );

    case 'wheel':
      return (
        <div className={containerStyle}>
          <div className="absolute inset-0 bg-[#3e2723]/30 flex flex-col justify-end overflow-hidden">
             {/* Scrolling Background (Mountains) */}
             <motion.div 
                className="absolute bottom-20 w-[200%] flex gap-10 opacity-30"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             >
                {[...Array(10)].map((_,i) => (
                    <div key={i} className="w-40 h-32 bg-[#5d4037] rounded-t-full" />
                ))}
             </motion.div>

             {/* Road */}
             <div className="w-full h-1/3 bg-[#2e1c15] relative overflow-hidden">
                 <motion.div 
                    className="absolute top-2 w-[200%] h-2 flex gap-20"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 >
                    {[...Array(20)].map((_,i) => <div key={i} className="w-10 h-2 bg-[#d7ccc8]/20 rounded-full" />)}
                 </motion.div>
             </div>
             
             {/* Wheel Cart */}
             <motion.div
                className="absolute bottom-[25%] left-1/2 -translate-x-1/2"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 0.3, repeat: Infinity }}
             >
                {/* Cart Body */}
                <div className="w-32 h-16 bg-[#8d6e63] rounded-t-lg relative border-b-4 border-[#5d4037]">
                    <div className="absolute -top-4 right-2 w-20 h-4 bg-[#a1887f] rounded" /> {/* Hay */}
                </div>
                
                {/* The Wheel */}
                <motion.div
                    className="absolute -bottom-6 left-8 w-16 h-16 rounded-full border-4 border-[#3e2723] bg-[#a1887f] flex items-center justify-center shadow-lg"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                    <div className="w-full h-1 bg-[#3e2723]" />
                    <div className="absolute w-1 h-full bg-[#3e2723]" />
                    <div className="absolute w-3 h-3 bg-[#3e2723] rounded-full" />
                </motion.div>
             </motion.div>
          </div>
        </div>
      );

    case 'writing':
        return (
          <div className={containerStyle + " bg-[#f5f5dc]/10"}>
             <div className="relative w-48 h-60 bg-[#e0c9a6] rounded-sm shadow-2xl origin-bottom skew-x-1 p-6 flex flex-col gap-3 overflow-hidden">
                 {/* Paper Texture */}
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] mix-blend-multiply" />
                 
                 {/* Text Lines */}
                 {[...Array(6)].map((_, i) => (
                     <motion.div 
                        key={i}
                        className="h-2 bg-[#5d4037] rounded-full opacity-70"
                        initial={{ width: 0 }}
                        animate={{ width: ["0%", "100%", "100%"] }}
                        transition={{ 
                            duration: 1, 
                            delay: i * 0.5, 
                            repeat: Infinity, 
                            repeatDelay: 4 
                        }}
                     />
                 ))}
                 
                 {/* Floating Feather Pen */}
                 <motion.div
                    className="absolute z-10 text-6xl drop-shadow-xl"
                    animate={{ 
                        x: [-10, 80], 
                        y: [0, 10, 20, 30, 40, 50],
                        rotate: [-10, 10, -10] 
                    }}
                    transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                    style={{ right: '50%', top: '10%' }}
                 >
                    🪶
                 </motion.div>
             </div>
          </div>
        );

    case 'printing':
        return (
          <div className={containerStyle + " bg-gray-900"}>
              <div className="flex flex-col items-center relative">
                  {/* Press Mechanism */}
                  <motion.div
                    className="w-40 h-24 bg-gray-700 rounded-t-lg border-b-8 border-gray-900 z-20 flex flex-col items-center justify-end pb-2 shadow-xl"
                    animate={{ y: [0, 30, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  >
                      <div className="text-gray-400 text-xs font-mono mb-1">GUTENBERG 1.0</div>
                      <div className="w-32 h-4 bg-gray-800 rounded" />
                  </motion.div>

                  {/* Paper Belt */}
                  <div className="w-64 h-20 bg-gray-800 mt-[-10px] relative overflow-hidden flex items-center">
                      <motion.div 
                        className="flex gap-4 absolute left-0"
                        animate={{ x: [-50, -150] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                          {[...Array(10)].map((_, i) => (
                              <div key={i} className="w-20 h-14 bg-white rounded shadow-sm flex items-center justify-center">
                                  <span className="font-serif text-2xl font-bold text-black">A</span>
                              </div>
                          ))}
                      </motion.div>
                  </div>
              </div>
          </div>
        );

    case 'steam':
        return (
            <div className={containerStyle + " bg-slate-900"}>
                <div className="relative flex gap-2">
                    {/* Steam Engine */}
                    <div className="w-32 h-32 bg-slate-700 rounded-lg relative overflow-hidden border-4 border-slate-600 shadow-2xl">
                        {/* Piston */}
                        <motion.div 
                            className="absolute bottom-0 left-4 right-4 bg-slate-400 border-t-4 border-slate-300"
                            animate={{ height: ["10%", "80%", "10%"] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Heat Glow */}
                        <div className="absolute bottom-0 w-full h-4 bg-red-500 blur-md opacity-50 animate-pulse" />
                    </div>
                    
                    {/* Flywheel */}
                    <div className="relative">
                        <motion.div 
                            className="w-24 h-24 rounded-full border-8 border-slate-500 bg-slate-800"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="absolute w-full h-2 bg-slate-500 top-1/2 -translate-y-1/2" />
                            <div className="absolute h-full w-2 bg-slate-500 left-1/2 -translate-x-1/2" />
                        </motion.div>
                        {/* Connecting Rod */}
                        <motion.div 
                            className="absolute top-1/2 left-[-20px] w-24 h-2 bg-slate-300 origin-right"
                            animate={{ rotate: [15, -15, 15] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Steam Particles */}
                    <Particles count={20} color="#ffffff" />
                </div>
            </div>
        );

    case 'blackdeath':
        return (
            <div className={containerStyle + " bg-[#1a0505]"}>
                <div className="relative">
                    {/* Biohazard Mist */}
                    <Particles count={20} color="#4a0404" />
                    
                    {/* Doctor Mask */}
                    <motion.div
                        className="relative z-10"
                        animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <svg width="100" height="120" viewBox="0 0 100 120" fill="none" stroke="white" strokeWidth="2">
                            {/* Beak */}
                            <path d="M50 40 L90 70 L60 80 L50 90 L40 80 L10 70 Z" fill="#111" />
                            {/* Goggles */}
                            <circle cx="35" cy="50" r="10" fill="#000" stroke="#555" />
                            <circle cx="65" cy="50" r="10" fill="#000" stroke="#555" />
                            {/* Hat */}
                            <path d="M20 30 L80 30 L70 10 L30 10 Z" fill="#111" />
                            <rect x="10" y="30" width="80" height="5" fill="#111" />
                        </svg>
                    </motion.div>
                </div>
            </div>
        );

    case 'ww2':
        return (
            <div className={containerStyle + " bg-[#1c2e2e]"}>
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Radar Sweep */}
                    <div className="absolute w-64 h-64 border border-green-500/30 rounded-full flex items-center justify-center bg-[#0a1a1a]">
                        <motion.div 
                            className="w-1/2 h-1/2 bg-gradient-to-r from-transparent to-green-500/50 absolute top-0 left-0 origin-bottom-right"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            style={{ borderBottomRightRadius: '100%' }}
                        />
                        {/* Blips */}
                        <motion.div 
                            className="absolute w-2 h-2 bg-red-500 rounded-full top-10 left-20" 
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.div 
                            className="absolute w-2 h-2 bg-red-500 rounded-full bottom-16 right-12" 
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
                        />
                    </div>
                    {/* Tank Icon Outline */}
                    <svg width="80" height="60" viewBox="0 0 100 60" fill="none" stroke="#4a5a5a" strokeWidth="2" className="z-10">
                        <path d="M10 40 L90 40 L80 20 L20 20 Z" fill="#2F4F4F" />
                        <path d="M50 20 L50 10 L100 10" strokeWidth="4" />
                        <circle cx="20" cy="50" r="8" fill="#111" />
                        <circle cx="40" cy="50" r="8" fill="#111" />
                        <circle cx="60" cy="50" r="8" fill="#111" />
                        <circle cx="80" cy="50" r="8" fill="#111" />
                    </svg>
                </div>
            </div>
        );

    case 'crash2008':
        return (
            <div className={containerStyle + " bg-[#1a0000]"}>
                <div className="relative w-full h-full flex flex-col items-center justify-end pb-10">
                    {/* Chart Line */}
                    <svg width="200" height="100" viewBox="0 0 200 100" className="z-10">
                        <motion.path 
                            d="M0 80 L40 60 L80 70 L120 20 L160 90 L200 100" 
                            fill="none" 
                            stroke="red" 
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        />
                    </svg>
                    {/* Falling Money */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-green-500 text-lg opacity-50"
                                initial={{ y: -20, x: Math.random() * 200 }}
                                animate={{ y: 200, rotate: 180 }}
                                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, ease: "linear" }}
                            >
                                $
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        );

    case 'covid':
        return (
            <div className={containerStyle + " bg-[#001a10]"}>
                <div className="relative">
                    {/* Virus */}
                    <motion.div
                        className="w-24 h-24 bg-green-900 rounded-full relative flex items-center justify-center shadow-[0_0_30px_#00ffaa]"
                        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                        {/* Spikes */}
                        {[...Array(8)].map((_, i) => (
                            <div 
                                key={i} 
                                className="absolute w-4 h-8 bg-green-600 rounded-full -z-10"
                                style={{ transform: `rotate(${i * 45}deg) translateY(-20px)` }} 
                            />
                        ))}
                        <div className="w-20 h-20 bg-green-800 rounded-full opacity-80" />
                    </motion.div>
                    
                    {/* Shield/Mask Protection Layer */}
                    <motion.div 
                        className="absolute inset-[-20px] border-4 border-blue-400 rounded-full opacity-0"
                        animate={{ opacity: [0, 0.5, 0], scale: [1.2, 1.4, 1.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </div>
        );

    case 'lightbulb':
        return (
            <div className={containerStyle + " bg-black"}>
                <motion.div
                    className="relative z-10"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Bulb Glass */}
                    <svg width="120" height="160" viewBox="0 0 100 140" fill="none">
                        <path d="M30 100 L30 130 L70 130 L70 100 Q 95 80 95 50 A 45 45 0 1 0 5 50 Q 5 80 30 100" 
                              fill="rgba(255, 255, 255, 0.1)" stroke="#444" strokeWidth="2" />
                        {/* Filament */}
                        <motion.path 
                            d="M35 100 L35 70 L45 50 L55 70 L65 50 L65 100" 
                            fill="none" 
                            stroke={color} 
                            strokeWidth="3"
                            animate={{ stroke: ["#555", "#fff", "#ffaa00", "#fff"] }}
                            transition={{ duration: 0.1, repeat: Infinity, repeatDelay: Math.random() * 2 }}
                        />
                    </svg>
                    
                    {/* Light Bloom */}
                    <motion.div 
                        className="absolute top-0 left-0 right-0 bottom-10 bg-yellow-200 rounded-full blur-[60px]"
                        animate={{ opacity: [0, 0.6, 0.1, 0.8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.3, 0.4, 1] }}
                    />
                </motion.div>
            </div>
        );

    case 'flight':
        return (
            <div className={containerStyle + " bg-sky-300/20 overflow-hidden"}>
                 {/* Moving Clouds */}
                 <div className="absolute inset-0">
                     {[...Array(5)].map((_,i) => (
                         <motion.div
                            key={i}
                            className="absolute w-20 h-8 bg-white/20 rounded-full blur-md"
                            style={{ top: `${Math.random()*80}%` }}
                            initial={{ x: "100%" }}
                            animate={{ x: "-100%" }}
                            transition={{ duration: 5 + Math.random()*5, repeat: Infinity, delay: i, ease: "linear" }}
                         />
                     ))}
                 </div>

                 {/* Plane */}
                 <motion.div
                    className="relative z-10"
                    animate={{ 
                        y: [0, -20, 0], 
                        rotate: [0, 2, -2, 0],
                        x: [-10, 10, -10]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 >
                    <svg width="160" height="80" viewBox="0 0 100 50" fill="white" className="drop-shadow-lg">
                         <path d="M80 25 L40 5 L10 5 L10 15 L30 25 L10 35 L10 45 L40 45 Z" /> {/* Body */}
                         <path d="M40 25 L20 5 L60 5 Z" fill="#eee" /> {/* Wing Top */}
                    </svg>
                    <div className="absolute top-1/2 left-0 w-10 h-10 bg-white/50 blur-lg rounded-full animate-pulse" /> {/* Propeller blur */}
                 </motion.div>
            </div>
        );
        
    case 'moon':
        return (
            <div className={containerStyle + " bg-[#0b0b1a]"}>
                {/* Stars */}
                <Particles count={30} color="#fff" />
                
                {/* Moon Surface */}
                <div className="absolute bottom-[-50px] w-[120%] h-32 bg-gray-200 rounded-[50%] flex items-center justify-center shadow-[0_0_50px_#fff]">
                    <div className="w-8 h-4 bg-gray-300 rounded-full absolute top-4 left-[30%]" />
                    <div className="w-12 h-6 bg-gray-300 rounded-full absolute top-8 right-[40%]" />
                </div>

                {/* Lander */}
                <motion.div
                    className="absolute bottom-20"
                    initial={{ y: -200, rotate: 5 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 5, repeat: Infinity, repeatDelay: 2 }}
                >
                    <div className="w-16 h-12 bg-white rounded-t-lg relative border-b-4 border-gray-300 shadow-xl">
                        <div className="absolute -bottom-6 left-[-4px] w-1 h-6 bg-gray-400 rotate-12" /> {/* Leg */}
                        <div className="absolute -bottom-6 right-[-4px] w-1 h-6 bg-gray-400 -rotate-12" /> {/* Leg */}
                        
                        {/* Thruster Flame */}
                        <motion.div 
                            className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-4 h-10 bg-orange-500 rounded-full blur-sm"
                            animate={{ height: [40, 20, 0], opacity: [1, 1, 0] }}
                            transition={{ duration: 5, repeat: Infinity, repeatDelay: 2 }}
                        />
                    </div>
                </motion.div>
            </div>
        );

    case 'internet':
        return (
            <div className={containerStyle + " bg-[#000510]"}>
                {/* Matrix Grid */}
                <div className="absolute inset-0 opacity-20" 
                     style={{ backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
                />
                
                {/* Global Network */}
                <div className="relative w-64 h-64">
                    <motion.div 
                        className="absolute inset-0 rounded-full border border-cyan-500/30"
                        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                        className="absolute inset-4 rounded-full border border-cyan-500/50 border-dashed"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Data Packets */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f0ff]"
                            animate={{ 
                                x: Math.cos(i) * 100,
                                y: Math.sin(i) * 100,
                                opacity: [0, 1, 0]
                            }}
                            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                        />
                    ))}
                    
                    {/* Center Globe */}
                    <div className="absolute inset-0 m-auto w-20 h-20 bg-cyan-900/50 rounded-full backdrop-blur-md flex items-center justify-center border border-cyan-400">
                        <GlobeIcon size={40} className="text-cyan-400 animate-pulse" />
                    </div>
                </div>
            </div>
        );

    case 'crypto':
        return (
            <div className={containerStyle + " bg-slate-900"}>
                <div className="relative perspective-1000">
                    <motion.div
                        className="w-32 h-32 rounded-full bg-yellow-500 border-4 border-yellow-300 flex items-center justify-center shadow-[0_0_50px_#f7931a]"
                        animate={{ rotateY: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <span className="text-6xl font-bold text-yellow-900 transform translate-z-10">₿</span>
                        {/* Coin Edge */}
                        <div className="absolute inset-0 rounded-full border-4 border-yellow-700 opacity-50" style={{ transform: "translateZ(-5px)" }} />
                    </motion.div>
                    
                    {/* Blockchain Links */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-full flex">
                        {[...Array(3)].map((_,i) => (
                            <motion.div 
                                key={i}
                                className="w-10 h-4 bg-gray-600 border border-gray-400 rounded ml-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: [0, 1, 0], x: 0 }}
                                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );

    case 'ai':
        return (
            <div className={containerStyle + " bg-black"}>
                <div className="relative">
                    {/* Synaptic Web */}
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-[200px] h-[1px] bg-purple-500/30 origin-left"
                            style={{ rotate: i * 24 }}
                        >
                            <motion.div 
                                className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#bf00ff]"
                                animate={{ x: [0, 200], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, delay: Math.random(), repeat: Infinity }}
                            />
                        </motion.div>
                    ))}
                    
                    {/* Central Brain */}
                    <motion.div 
                        className="w-24 h-24 bg-purple-900/50 rounded-full backdrop-blur-xl border border-purple-400 flex items-center justify-center relative z-10"
                        animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 20px #bf00ff", "0 0 60px #bf00ff", "0 0 20px #bf00ff"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <BrainIcon size={48} className="text-white" />
                    </motion.div>
                </div>
            </div>
        );

    default:
      return <div className="text-white/20">Visualization Pending</div>;
  }
}

// Simple internal icon components to avoid circular dep issues or external lib overhead just for viz
const GlobeIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);

const BrainIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
);