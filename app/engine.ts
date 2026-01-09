import { LatticeNode, EpiphanySession } from './engine';

export class LLMEngine {
  async generateLattice(query: string, ageStr: string, sex: string): Promise<EpiphanySession> {
    const res = await fetch('/api/reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, age: ageStr, sex })
    });
    
    const data = await res.json();
    
    // Fallback for demo if API fails/no token
    if (data.error || !data.nodes) {
        console.warn("Using Local Fallback due to API error:", data.error);
        return this.localFallback(query, ageStr, sex);
    }

    return {
        id: crypto.randomUUID(),
        query,
        age: ageStr,
        sex,
        nodes: data.nodes,
        narrative: data.narrative,
        iteration: 0
    };
  }

  async evolveLattice(currentSession: EpiphanySession, action: 'deepen' | 'challenge'): Promise<EpiphanySession> {
    const res = await fetch('/api/reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: currentSession.query, 
            age: currentSession.age, 
            sex: currentSession.sex, 
            action,
            previousNarrative: currentSession.narrative
        })
    });

    const data = await res.json();
    
    // Merge new nodes/narrative
    const newNodes = [...currentSession.nodes, ...data.nodes];
    const newNarrative = currentSession.narrative + "\n\n" + data.narrative;

    return {
        ...currentSession,
        nodes: newNodes,
        narrative: newNarrative,
        iteration: currentSession.iteration + 1
    };
  }

  private localFallback(query: string, ageStr: string, sex: string): EpiphanySession {
      const age = parseInt(ageStr) || 30;
      let insight = "The universe is silent (Add HF_TOKEN to Netlify).";
      
      if (age < 25) insight = "You are building a foundation on moving ground.";
      else if (age < 40) insight = "You are mistaking the map for the territory.";
      else insight = "You are carrying luggage for a trip you already finished.";

      return {
          id: crypto.randomUUID(),
          query,
          age: ageStr,
          sex,
          nodes: [
              { id: "root", label: "Local Insight", type: "core", text: insight },
              { id: "n1", parentId: "root", label: "Setup Needed", type: "challenge", text: "Please configure HF_TOKEN in your Netlify Environment Variables." }
          ],
          narrative: `## Local Mode Active\n\n${insight}\n\n### Setup Required\n\nTo unleash the full power of the AI, please add your Hugging Face Token to Netlify Environment Variables as 
HF_TOKEN.`, 
          iteration: 0
      };
  }
}

export type { LatticeNode, EpiphanySession };