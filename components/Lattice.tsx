'use client';

import { useEffect, useRef, useState } from 'react';
import { LatticeNode } from '@/app/engine';

interface LatticeProps {
  nodes: LatticeNode[];
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
    line: 'rgba(0, 240, 255, 0.2)'
  };

  // Resize Observer logic
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

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set actual canvas size to match display size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Prepare Node Objects for Animation
    const startX = dimensions.width / 2;
    const startY = 100;
    const levelHeight = 150;
    const spacing = 180;

    const rootNodeData = nodes.find(n => n.id === "root") || nodes[0];
    const childrenData = nodes.filter(n => n.parentId === rootNodeData.id);

    const animNodes = nodes.map((n) => {
        let x = startX;
        let y = startY;

        if (n.id !== rootNodeData.id) {
            if (n.parentId === rootNodeData.id) {
                const index = childrenData.findIndex(c => c.id === n.id);
                const totalWidth = (childrenData.length - 1) * spacing;
                const startLeft = startX - (totalWidth / 2);
                x = startLeft + (index * spacing);
                y = startY + levelHeight;
            } else {
                 // Simple placement for deeper levels (fractals)
                 y = startY + (levelHeight * 1.5);
                 x = startX + (Math.random() * 100 - 50); 
            }
        }

        return {
            ...n,
            x,
            y,
            baseX: x,
            baseY: y,
            radius: 0,
            targetRadius: n.type === 'core' ? 25 : 18,
            phase: Math.random() * Math.PI * 2
        };
    });

    // Connections
    const connections = animNodes
        .filter(n => n.parentId)
        .map(n => ({
            from: n.parentId!,
            to: n.id,
            progress: 0
        }));
    
    // Background Particles
    const particles = Array.from({ length: 50 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3
    }));

    let animationFrameId: number;

    const render = () => {
        const time = Date.now() * 0.001;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Particles
        ctx.fillStyle = colors.line;
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            ctx.globalAlpha = p.opacity + Math.sin(time + p.x) * 0.1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;

        // Draw Connections
        connections.forEach(conn => {
            const start = animNodes.find(n => n.id === conn.from);
            const end = animNodes.find(n => n.id === conn.to);
            if (start && end) {
                if (conn.progress < 1) conn.progress += 0.02;
                ctx.beginPath();
                ctx.moveTo(start.x, start.y);
                const curX = start.x + (end.x - start.x) * conn.progress;
                const curY = start.y + (end.y - start.y) * conn.progress;
                ctx.lineTo(curX, curY);
                ctx.strokeStyle = colors.line;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });

        // Draw Nodes
        animNodes.forEach(node => {
            // Float
            node.y = node.baseY + Math.sin(time + node.phase) * 5;
            // Grow
            node.radius += (node.targetRadius - node.radius) * 0.1;

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = colors[node.type] || '#fff';
            ctx.shadowBlur = 15;
            ctx.shadowColor = colors[node.type] || '#fff';
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Ring
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.stroke();

            // Label
            if (node.radius > 5) {
                ctx.fillStyle = '#fff';
                ctx.font = '12px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(node.label, node.x, node.y + node.radius + 20);
            }
        });

        animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions, nodes]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px] overflow-hidden bg-black/20 rounded-2xl border border-white/10 shadow-inner">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
}
