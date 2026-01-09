export interface LatticeNode {
  id: string;
  parentId?: string;
  label: string;
  type: 'core' | 'challenge' | 'resolution' | 'fractal' | 'insight';
  text: string;
}

export interface EpiphanySession {
  id: string;
  query: string;
  age: string;
  sex: string;
  nodes: LatticeNode[];
  narrative: string;
  iteration: number;
}
