'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

interface Props {
  data: { label: string; value: number; unit: string }[];
  color: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-black/90 border border-white/20 p-3 rounded-lg shadow-xl backdrop-blur-md z-50">
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">{data.label}</p>
        <p className="text-white font-mono font-bold text-lg">
          {data.value.toLocaleString()} 
          <span className="text-sm text-gray-500 ml-1">{data.unit}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function StatsViz({ data, color }: Props) {
  return (
    <div className="w-full h-full flex flex-col">
        <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2 font-mono border-b border-white/10 pb-1">
            Era Statistics
        </h4>
        <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <XAxis type="number" hide />
                <YAxis 
                    dataKey="label" 
                    type="category" 
                    width={100} 
                    tick={{ fill: '#aaa', fontSize: 11, fontFamily: 'monospace' }} 
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} animationDuration={1500}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={color} fillOpacity={0.8} />
                    ))}
                </Bar>
            </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
}