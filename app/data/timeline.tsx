import { Zap, Flame, Cpu, Globe, Bitcoin, Pickaxe, Scroll, Search, Anchor, Hammer, Rocket, Lightbulb, Skull, Shield, TrendingDown, Syringe } from 'lucide-react';

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
    color: '#ff5500', 
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
    color: '#8B4513',
    stats: [
      { label: 'Travel Speed', value: 10, unit: 'km/h' },
      { label: 'Trade Range', value: 500, unit: 'km' },
    ]
  },
  {
    id: 'writing',
    year: -3200,
    yearDisplay: '3200 BCE',
    title: 'Information Dissemination',
    description: 'The externalization of memory. Writing allowed knowledge to travel across time and space, independent of the messenger.',
    era: 'ancient',
    icon: Scroll,
    color: '#d4af37',
    stats: [
      { label: 'Global Pop', value: 30, unit: 'm' },
      { label: 'Literacy', value: 1, unit: '%' },
    ]
  },
  {
    id: 'blackdeath',
    year: 1347,
    yearDisplay: '1347 CE',
    title: 'The Black Death',
    description: 'The great reset. A devastating pandemic that wiped out a third of Europe, paradoxically leading to higher wages for survivors and the end of feudalism.',
    era: 'medieval',
    icon: Skull,
    color: '#4a0404',
    stats: [
      { label: 'Europe Pop', value: -33, unit: '%' },
      { label: 'Wage Growth', value: 100, unit: '%' },
    ]
  },
  {
    id: 'printing',
    year: 1440,
    yearDisplay: '1440 CE',
    title: 'Mass Communication',
    description: 'The Printing Press democratized knowledge. Information could now be replicated cheaply, fueling the Renaissance and Scientific Revolution.',
    era: 'medieval',
    icon: BookIcon,
    color: '#5D4037',
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
    color: '#708090',
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
    color: '#FFD700',
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
    color: '#87CEEB',
    stats: [
      { label: 'Travel Time', value: -95, unit: '%' },
      { label: 'Distance', value: 120, unit: 'ft' },
    ]
  },
  {
    id: 'ww2',
    year: 1939,
    yearDisplay: '1939 CE',
    title: 'Global Conflict',
    description: 'The industrialization of war. World War II reshaped geopolitics and spurred atomic energy and computing, at a terrible human cost.',
    era: 'modern',
    icon: Shield,
    color: '#2F4F4F',
    stats: [
      { label: 'Casualties', value: 75, unit: 'm' },
      { label: 'US Debt', value: 120, unit: '%GDP' },
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
    color: '#F0F8FF',
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
    color: '#00f0ff',
    stats: [
      { label: 'Users', value: 5, unit: 'b' },
      { label: 'Data', value: 175, unit: 'ZB' },
    ]
  },
  {
    id: 'crash2008',
    year: 2008,
    yearDisplay: '2008 CE',
    title: 'The Great Recession',
    description: 'System failure. The collapse of the housing bubble triggered a global banking crisis, shattering trust in financial institutions.',
    era: 'digital',
    icon: TrendingDown,
    color: '#ff0000',
    stats: [
      { label: 'Lost Wealth', value: 2, unit: '$ Trillion' },
      { label: 'Unemployment', value: 10, unit: '%' },
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
    color: '#f7931a',
    stats: [
      { label: 'Price', value: 98000, unit: '$' },
      { label: 'Blocks', value: 850, unit: 'k' },
    ]
  },
  {
    id: 'covid',
    year: 2020,
    yearDisplay: '2020 CE',
    title: 'COVID-19 Pandemic',
    description: 'The silent enemy. A global lockdown that accelerated the shift to remote work, mRNA vaccines, and digital life.',
    era: 'future',
    icon: Syringe,
    color: '#00ffaa',
    stats: [
      { label: 'Lockdown', value: 3.9, unit: 'Billion' },
      { label: 'Vaccines', value: 13, unit: 'Billion' },
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
    color: '#bf00ff',
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