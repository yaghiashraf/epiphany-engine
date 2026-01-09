import { Zap, Flame, Cpu, Globe, Bitcoin, Pickaxe, Scroll, Search, Anchor, Hammer, Rocket, Lightbulb } from 'lucide-react';

export type Era = 'ancient' | 'classical' | 'medieval' | 'industrial' | 'modern' | 'digital' | 'future';

export interface HistoricalEvent {
  id: string;
  year: number;
  yearDisplay: string;
  title: string;
  description: string;
  era: Era;
  icon: any;
  color: string;
  stats: {
    label: string;
    value: number;
    unit: string;
  }[];
}

export const TIMELINE_DATA: HistoricalEvent[] = [
  {
    id: 'fire',
    year: -400000,
    yearDisplay: '400,000 BCE',
    title: 'Control of Fire',
    description: 'The first spark. Mastery of fire provided warmth, protection, and cooked food, unlocking the caloric intake needed for brain growth.',
    era: 'ancient',
    icon: Flame,
    color: '#ff5500', // Orange Fire
    stats: [
      { label: 'Global Pop', value: 0.5, unit: 'm' },
      { label: 'Brain Size', value: 1200, unit: 'cc' },
    ]
  },
  {
    id: 'wheel',
    year: -3500,
    yearDisplay: '3500 BCE',
    title: 'The Wheel',
    description: 'Motion revolutionized. The invention of the wheel facilitated transport, pottery, and simple machines, setting civilization in motion.',
    era: 'ancient',
    icon: CircleIcon,
    color: '#8B4513', // Wood Brown
    stats: [
      { label: 'Travel Speed', value: 10, unit: 'km/h' },
      { label: 'Trade Range', value: 500, unit: 'km' },
    ]
  },
  {
    id: 'writing',
    year: -3200,
    yearDisplay: '3200 BCE',
    title: 'Invention of Writing',
    description: 'History begins. Sumerian Cuneiform allows knowledge to be stored externally, breaking the limits of human memory.',
    era: 'ancient',
    icon: Scroll,
    color: '#d4af37', // Gold/Clay
    stats: [
      { label: 'Global Pop', value: 30, unit: 'm' },
      { label: 'Literacy', value: 1, unit: '%' },
    ]
  },
  {
    id: 'printing',
    year: 1440,
    yearDisplay: '1440 CE',
    title: 'The Printing Press',
    description: 'Knowledge democratized. Gutenberg\'s machine crashed the cost of books, fueling the Renaissance and the Scientific Revolution.',
    era: 'medieval',
    icon: BookIcon,
    color: '#5D4037', // Ink/Leather
    stats: [
      { label: 'Book Cost', value: -90, unit: '%' },
      { label: 'Books', value: 20, unit: 'm' },
    ]
  },
  {
    id: 'steam',
    year: 1760,
    yearDisplay: '1760 CE',
    title: 'Steam Power',
    description: 'The Industrial Revolution. We learned to convert heat into motion, replacing muscle with machine and forever changing the skyline.',
    era: 'industrial',
    icon: Pickaxe,
    color: '#708090', // Steel Grey
    stats: [
      { label: 'CO2 Levels', value: 280, unit: 'ppm' },
      { label: 'GDP Growth', value: 300, unit: '%' },
    ]
  },
  {
    id: 'lightbulb',
    year: 1879,
    yearDisplay: '1879 CE',
    title: 'Electric Light',
    description: 'Banishing the night. Edison\'s bulb extended the human day, illuminating cities and powering the modern 24-hour economy.',
    era: 'industrial',
    icon: Lightbulb,
    color: '#FFD700', // Electric Yellow
    stats: [
      { label: 'Work Hours', value: 14, unit: 'h' },
      { label: 'Sleep', value: -2, unit: 'h' },
    ]
  },
  {
    id: 'flight',
    year: 1903,
    yearDisplay: '1903 CE',
    title: 'Powered Flight',
    description: 'Defying gravity. The Wright Brothers proved humans could fly, shrinking the globe and making international travel a reality.',
    era: 'modern',
    icon: Rocket,
    color: '#87CEEB', // Sky Blue
    stats: [
      { label: 'Travel Time', value: -95, unit: '%' },
      { label: 'Distance', value: 120, unit: 'ft' },
    ]
  },
  {
    id: 'moon',
    year: 1969,
    yearDisplay: '1969 CE',
    title: 'Moon Landing',
    description: 'The giant leap. Humanity set foot on another world, proving that with enough engineering, we can leave our cradle.',
    era: 'modern',
    icon: Globe,
    color: '#F0F8FF', // Moon White
    stats: [
      { label: 'Viewers', value: 600, unit: 'm' },
      { label: 'Computing', value: 0.04, unit: 'MHz' },
    ]
  },
  {
    id: 'internet',
    year: 1990,
    yearDisplay: '1990 CE',
    title: 'World Wide Web',
    description: 'The digital nervous system. Information became instant and free, connecting billions in a global hive mind.',
    era: 'digital',
    icon: Globe,
    color: '#00f0ff', // Cyber Blue
    stats: [
      { label: 'Users', value: 5, unit: 'b' },
      { label: 'Data', value: 175, unit: 'ZB' },
    ]
  },
  {
    id: 'crypto',
    year: 2009,
    yearDisplay: '2009 CE',
    title: 'Bitcoin',
    description: 'Digital Gold. The first successful implementation of decentralized, trustless money, separating state from currency.',
    era: 'digital',
    icon: Bitcoin,
    color: '#f7931a', // Bitcoin Orange
    stats: [
      { label: 'Price', value: 98000, unit: '$' },
      { label: 'Blocks', value: 850, unit: 'k' },
    ]
  },
  {
    id: 'ai',
    year: 2024,
    yearDisplay: '2024 CE',
    title: 'Artificial Intelligence',
    description: 'The final invention? We created machines that can think, create, and reason, potentially surpassing human intelligence.',
    era: 'future',
    icon: Cpu,
    color: '#bf00ff', // Neon Purple
    stats: [
      { label: 'Parameters', value: 1.8, unit: 'T' },
      { label: 'IQ', value: 120, unit: 'pts' },
    ]
  }
];

// Helper icons needed for the file
function CircleIcon(props: any) {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function BookIcon(props: any) {
    return (
      <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    );
}