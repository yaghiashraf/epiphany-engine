export interface LatticeNode {
  id: string;
  parentId?: string;
  label: string;
  type: 'core' | 'challenge' | 'resolution' | 'fractal';
  text: string;
}

export interface EpiphanySession {
  id: string;
  query: string;
  nodes: LatticeNode[];
  narrative: string;
}

export class LLMEngine {
  async generateLattice(query: string): Promise<EpiphanySession> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const keywords = query.split(' ');
    const subject = keywords.length > 0 ? keywords[Math.floor(Math.random() * keywords.length)] : "this";

    return {
      id: crypto.randomUUID(),
      query: query,
      nodes: [
        {
          id: "root",
          label: "Core Perception",
          type: "core",
          text: `Your inquiry into "${query}" stems not from a lack of ability, but from a misalignment of values. You perceive this as a barrier, but it is actually a filter.`
        },
        {
          id: "n1",
          parentId: "root",
          label: "Hidden Fear",
          type: "challenge",
          text: `Beneath the surface, there is a fear that success in this area might alienate you from your current identity. Are you afraid of who you will become?`
        },
        {
          id: "n2",
          parentId: "root",
          label: "Potential Future",
          type: "resolution",
          text: `Imagine a reality where "${subject}" is no longer a goal, but a byproduct of expressing your true self. The tension dissolves when you stop chasing.`
        },
        {
            id: "n3",
            parentId: "n1",
            label: "Origin Story",
            type: "fractal",
            text: `This fear likely originated from a moment where you were praised for being "safe" rather than "bold".`
          }
      ],
      narrative: `## The Core Shift

Your struggle with **"${query}"** isn't a wall—it's a mirror. You've been treating this as an external problem to solve, but the lattice reveals it's an internal state to harmonize.

### The Hidden Anchor

Notice the connection to *Hidden Fear* (Node 2). You aren't stuck because you can't move; you're stuck because a part of you is holding onto the shore, afraid that the ocean of success will wash away your current self-definition.

### The Breakthrough

What if you didn't need to "solve" this? What if you simply observed the resistance as proof of your growth? The path forward isn't about pushing harder; it's about letting go of the anchor.`
    };
  }
}
