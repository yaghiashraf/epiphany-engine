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

export class LLMEngine {
  // keyword extraction for "relevance"
  private getContext(query: string, age: number, sex: string) {
    const q = query.toLowerCase();
    let theme = "general";
    if (q.includes("career") || q.includes("work") || q.includes("job")) theme = "career";
    if (q.includes("love") || q.includes("relationship") || q.includes("marriage")) theme = "love";
    if (q.includes("stuck") || q.includes("lost") || q.includes("purpose")) theme = "purpose";

    const lifeStage = age < 25 ? "foundational" : age < 40 ? "developmental" : age < 60 ? "mastery" : "reflection";
    
    return { theme, lifeStage };
  }

  async generateLattice(query: string, ageStr: string, sex: string): Promise<EpiphanySession> {
    await new Promise(resolve => setTimeout(resolve, 1800)); // Simulate "thinking" 

    const age = parseInt(ageStr) || 30;
    const { theme, lifeStage } = this.getContext(query, age, sex);
    const pronoun = sex === 'male' ? 'man' : sex === 'female' ? 'woman' : 'person';

    // Dynamic Content Generation based on inputs
    const coreInsights = {
      career: {
        foundational: "You are confusing 'inexperience' with 'inability'. The anxiety you feel is the dizziness of freedom, not the weight of failure.",
        developmental: `At ${age}, you feel the pressure to have 'arrived'. But you are comparing your behind-the-scenes with everyone else's highlight reel.`,
        mastery: "The boredom you feel isn't a lack of challenge; it's a call to mentorship. You are no longer the warrior; you are the sage.",
        reflection: "Your legacy is not defined by your title, but by the trees you planted under whose shade you do not expect to sit."
      },
      love: {
        foundational: "You are looking for a mirror, not a partner. You want someone to validate your existence because you haven't done it yourself yet.",
        developmental: "You are trying to 'solve' your partner because you are afraid to look at the parts of yourself they trigger.",
        mastery: "Love at this stage isn't about possession; it's about witnessing. You are afraid of the quiet.",
        reflection: "Companionship is the goal, yet you are holding onto old battles that no longer have a battlefield."
      },
      purpose: {
        foundational: "You feel lost because you are looking for a map. There is no map. You are the cartographer.",
        developmental: `The 'stuckness' is a protective mechanism. If you succeeded, you'd have to sacrifice the identity of the 'struggling ${pronoun}' you've cultivated.`,
        mastery: "You have climbed the mountain only to realize it was the wrong mountain. The descent is not failure; it is the beginning of a new journey.",
        reflection: "You are asking 'what's next?' when the universe is asking 'what was true?'."
      }
    };

    // Default fallback if theme not found
    const insight = (coreInsights as any)[theme]?.[lifeStage] || `The dilemma you face is a fractal of your current life stage. As a ${age}-year-old ${pronoun}, you are conditioned to prioritize safety over truth.`;

    const rootNode: LatticeNode = {
      id: "root",
      label: "Core Perception",
      type: "core",
      text: insight
    };

    const nodes: LatticeNode[] = [
      rootNode,
      {
        id: "n1",
        parentId: "root",
        label: "Hidden Barrier",
        type: "challenge",
        text: theme === 'career' ? "The fear of being 'found out' (Imposter Syndrome)." : "The fear of vulnerability."
      },
      {
        id: "n2",
        parentId: "root",
        label: "Potential Reality",
        type: "resolution",
        text: "A timeline where you detach self-worth from outcome."
      }
    ];

    const narrative = `## The Insight for ${age}\n\n${insight}\n\n### The Hidden Barrier\n\nYou perceive **"${query}"** as an external blockade. However, the lattice reveals it is an internal "safety valve". \n\n### The Shift\n\nTo move forward, you must stop asking "How do I fix this?" and start asking "What is this protecting me from?"`;

    return {
      id: crypto.randomUUID(),
      query,
      age: ageStr,
      sex,
      nodes,
      narrative,
      iteration: 0
    };
  }

  // Handle "Drill Deeper" and "Challenge This"
  async evolveLattice(currentSession: EpiphanySession, action: 'deepen' | 'challenge'): Promise<EpiphanySession> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newNodes = [...currentSession.nodes];
    let narrative = currentSession.narrative;
    const parentId = newNodes[newNodes.length - 1].id; // Branch off the last added node
    const newId = `node_${Date.now()}`;

    if (action === 'deepen') {
        newNodes.push({
            id: newId,
            parentId: "root", // Connect back to core for starburst effect, or parentId for tree
            label: "Subconscious Root",
            type: "fractal",
            text: "This pattern likely established itself in early adulthood as a way to avoid criticism."
        });
        narrative += `\n\n## Digging Deeper\n\nWe have drilled down into the subconscious substrate. The tension you feel isn't the problem—it's the *symptom* of a deeper belief: **"If I am not perfect, I am not safe."**\n\nThis belief served you at age ${(parseInt(currentSession.age) - 10)}, but it is suffocating you at ${currentSession.age}.`;
    } else {
        newNodes.push({
            id: newId,
            parentId: "root",
            label: "Counter-Intuition",
            type: "insight",
            text: "What if the opposite of your belief is true?"
        });
        narrative += `\n\n## The Challenge\n\nYou believe you need *more* certainty. The Lattice challenges this: **You actually need more chaos.**\n\nControl is an illusion. Your attempt to control the outcome of "${currentSession.query}" is exactly what is paralyzing the result. Let go of the steering wheel.`;
    }

    return {
        ...currentSession,
        nodes: newNodes,
        narrative,
        iteration: currentSession.iteration + 1
    };
  }
}