'use client';

import { useEffect, useRef, useState } from 'react';
import { LatticeNode } from '@/app/engine';

interface LatticeProps {
  nodes: LatticeNode[];
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulse: number;
}

interface EnergyPulse {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    progress: number; // 0 to 1
    speed: number;
    color: string;
}

export default function Lattice({ nodes }: LatticeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Colors
  const colors: Record<string, string> = {
    core: '#ffffff',
    challenge: '#ff0055',
    resolution: '#00f0ff',
    fractal: '#bf00ff',
    insight: '#ffaa00',
    line: 'rgba(0, 240, 255, 0.15)'
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Layout Logic (Simple Force-ish layout)
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    // We keep track of "visual nodes" to animate positions
    const visualNodes = nodes.map((n, i) => {
        let tx = centerX;
        let ty = centerY;

        if (n.type === 'core') {
            ty = 100;
        } else if (n.type === 'challenge') {
            tx = centerX - 150;
            ty = 250;
        } else if (n.type === 'resolution') {
            tx = centerX + 150;
            ty = 250;
        } else {
            // Random scatter for new dynamic nodes
            const angle = (i * 137.5) * (Math.PI / 180); // Golden angle
            const radius = 180 + (i * 20);
            tx = centerX + Math.cos(angle) * radius;
            ty = 150 + Math.sin(angle) * radius;
        }

        return {
            ...n,
            x: tx, // Start at target for now (or center for 'big bang')
            y: ty,
            targetX: tx,
            targetY: ty,
            radius: 0, // Pop in
            targetRadius: n.type === 'core' ? 30 : n.type === 'fractal' ? 15 : 20,
            phase: Math.random() * Math.PI * 2
        };
    });

    // Background Particles
    const particles: Particle[] = Array.from({ length: 60 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5,
        pulse: Math.random() * Math.PI
    }));

    const energyPulses: EnergyPulse[] = [];

    // Helper to spawn pulse
    const spawnPulse = (start: {x:number, y:number}, end: {x:number, y:number}) => {
        energyPulses.push({
            fromX: start.x,
            fromY: start.y,
            toX: end.x,
            toY: end.y,
            progress: 0,
            speed: 0.02 + Math.random() * 0.02,
            color: colors.resolution
        });
    };

    let frame = 0;
    let animationFrameId: number;

    const render = () => {
        frame++;
        const time = Date.now() * 0.001;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // --- 1. Draw Background Stars ---
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            // Wrap
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Twinkle
            const alpha = p.opacity + Math.sin(time * 2 + p.pulse) * 0.2;
            
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, alpha)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // --- 2. Draw Connections ---
        ctx.strokeStyle = colors.line;
        ctx.lineWidth = 1;
        
        visualNodes.forEach(node => {
            if (node.parentId) {
                const parent = visualNodes.find(n => n.id === node.parentId);
                if (parent) {
                    ctx.beginPath();
                    ctx.moveTo(parent.x, parent.y);
                    ctx.lineTo(node.x, node.y);
                    ctx.stroke();

                    // Randomly spawn energy pulse
                    if (frame % 100 === 0 && Math.random() > 0.5) {
                        spawnPulse(parent, node);
                    }
                }
            }
        });

        // --- 3. Draw Energy Pulses ---
        for (let i = energyPulses.length - 1; i >= 0; i--) {
            const p = energyPulses[i];
            p.progress += p.speed;
            
            const curX = p.fromX + (p.toX - p.fromX) * p.progress;
            const curY = p.fromY + (p.toY - p.fromY) * p.progress;

            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(curX, curY, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            if (p.progress >= 1) energyPulses.splice(i, 1);
        }

        // --- 4. Draw Nodes ---
        visualNodes.forEach(node => {
            // Animate properties
            node.radius += (node.targetRadius - node.radius) * 0.1;
            const floatY = Math.sin(time + node.phase) * 4;
            
            // Draw Glow
            ctx.shadowBlur = 20;
            ctx.shadowColor = colors[node.type];
            ctx.fillStyle = colors[node.type];
            
            ctx.beginPath();
            ctx.arc(node.x, node.y + floatY, node.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // White Center
            ctx.fillStyle = 'rgba(255,255,255,0.9)';
            ctx.beginPath();
            ctx.arc(node.x, node.y + floatY, node.radius * 0.3, 0, Math.PI * 2);
            ctx.fill();

            // Label
            if (node.radius > 10) {
                ctx.fillStyle = 'rgba(255,255,255,0.8)';
                ctx.font = '11px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(node.label, node.x, node.y + floatY + node.radius + 15);
            }
        });

        animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions, nodes]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px] overflow-hidden bg-black/20 rounded-2xl border border-white/10 shadow-inner">
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
}