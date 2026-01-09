'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  data: { label: string; value: number; unit: string }[];
  color: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-white/20 p-3 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-gray-300 text-sm mb-1">{label}</p>
        <p className="text-white font-bold text-lg">
          {payload[0].value.toLocaleString()} 
          <span className="text-xs text-gray-500 ml-1">{payload[0].payload.unit}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function StatsViz({ data, color }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis type="number" hide />
        <YAxis 
            dataKey="label" 
            type="category" 
            width={120} 
            tick={{ fill: '#aaa', fontSize: 12 }} 
            axisLine={false}
            tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={color} fillOpacity={0.8} />
            ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
