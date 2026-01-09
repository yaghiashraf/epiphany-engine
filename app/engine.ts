import type { LatticeNode, EpiphanySession } from './types';

export class LLMEngine {
  async generateLattice(query: string, ageStr: string, sex: string): Promise<EpiphanySession> {
    const res = await fetch('/api/reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, age: ageStr, sex })
    });
    
    const data = await res.json();
    
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
      let insight = "AI Model is warming up... please try again in 30 seconds.";
      let detail = "The advanced AI model on Hugging Face is currently loading. This happens on the first request after a period of inactivity.";
      
      return {
          id: crypto.randomUUID(),
          query,
          age: ageStr,
          sex,
          nodes: [
              { id: "root", label: "System Warming Up", type: "core", text: "The Neural Lattice is calibrating." },
              { id: "n1", parentId: "root", label: "Status", type: "challenge", text: "Model Loading or Token Issue" }
          ],
          narrative: `## Connection Status\n\n${detail}\n\n### Troubleshooting\n\n1. If you just added the key, please **wait 1 minute** and refresh.\n2. If this persists, verify your **HF_TOKEN** in Netlify settings.\n3. Try clicking "Reveal Truth" again shortly.`,
          iteration: 0
      };
  }
}
