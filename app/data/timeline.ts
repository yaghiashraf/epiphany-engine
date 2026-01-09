import { Zap, Flame, Cpu, Globe, Bitcoin, Pickaxe, Scroll, Search } from 'lucide-react';

export type Era = 'ancient' | 'classical' | 'industrial' | 'digital' | 'future';

export interface HistoricalEvent {
  id: string;
  year: number;
  yearDisplay: string;
  title: string;
  description: string;
  era: Era;
  icon: any;
  stats: {
    label: string;
    value: number;
    unit: string;
  }[];
  color: string;
}

export const TIMELINE_DATA: HistoricalEvent[] = [
  {
    id: 'fire',
    year: -400000,
    yearDisplay: '400,000 BCE',
    title: 'Control of Fire',
    description: 'The turning point of evolution. Mastery of fire allowed for cooking food (increasing brain size), warmth, and protection from predators.',
    era: 'ancient',
    icon: Flame,
    color: '#ff5500',
    stats: [
      { label: 'Global Population', value: 0.5, unit: 'Million' },
      { label: 'Avg Lifespan', value: 25, unit: 'Years' },
    ]
  },
  {
    id: 'writing',
    year: -3200,
    yearDisplay: '3200 BCE',
    title: 'Invention of Writing',
    description: 'Sumerian Cuneiform emerges. History begins to be recorded, allowing knowledge to span generations without oral corruption.',
    era: 'classical',
    icon: Scroll,
    color: '#d4af37',
    stats: [
      { label: 'Global Population', value: 30, unit: 'Million' },
      { label: 'Literacy Rate', value: 0.1, unit: '%' },
    ]
  },
  {
    id: 'printing',
    year: 1440,
    yearDisplay: '1440 CE',
    title: 'The Printing Press',
    description: 'Gutenberg democratizes knowledge. The cost of books plummets, fueling the Renaissance, Reformation, and the Scientific Revolution.',
    era: 'classical',
    icon: Search, // representing discovery
    color: '#8b4513',
    stats: [
      { label: 'Global Population', value: 450, unit: 'Million' },
      { label: 'Books in Europe', value: 20, unit: 'Million' },
    ]
  },
  {
    id: 'steam',
    year: 1760,
    yearDisplay: '1760 CE',
    title: 'Industrial Revolution',
    description: 'The steam engine transforms labor. Humanity shifts from agrarian to industrial, exploding productivity and pollution.',
    era: 'industrial',
    icon: Pickaxe,
    color: '#708090',
    stats: [
      { label: 'Global Population', value: 770, unit: 'Million' },
      { label: 'CO2 PPM', value: 280, unit: 'ppm' },
    ]
  },
  {
    id: 'internet',
    year: 1990,
    yearDisplay: '1990 CE',
    title: 'World Wide Web',
    description: 'Tim Berners-Lee invents the Web. Information becomes instant and global, creating a collective digital consciousness.',
    era: 'digital',
    icon: Globe,
    color: '#00f0ff',
    stats: [
      { label: 'Global Population', value: 5.3, unit: 'Billion' },
      { label: 'Internet Users', value: 0.05, unit: '%' },
    ]
  },
  {
    id: 'crypto',
    year: 2009,
    yearDisplay: '2009 CE',
    title: 'Bitcoin Genesis',
    description: 'Satoshi Nakamoto mines the Genesis Block. The concept of decentralized, trustless value transfer challenges the global banking order.',
    era: 'digital',
    icon: Bitcoin,
    color: '#f7931a',
    stats: [
      { label: 'Global Population', value: 6.8, unit: 'Billion' },
      { label: 'BTC Price', value: 0.0001, unit: '$' },
    ]
  },
  {
    id: 'ai',
    year: 2024,
    yearDisplay: '2024 CE',
    title: 'The Age of AI',
    description: 'Generative AI passes the Turing Test in daily utility. Humanity faces the prospect of creating a super-intelligence exceeding its own.',
    era: 'future',
    icon: Cpu,
    color: '#bf00ff',
    stats: [
      { label: 'Global Population', value: 8.1, unit: 'Billion' },
      { label: 'Compute Power', value: 100, unit: 'ExaFLOPS' },
    ]
  }
];
