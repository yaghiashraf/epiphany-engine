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
            return this.localFallback(query, ageStr, sex, data.error);
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
    
      private localFallback(query: string, ageStr: string, sex: string, errorMsg?: string): EpiphanySession {
          const age = parseInt(ageStr) || 30;
          
          const isAuthError = errorMsg?.includes("401") || errorMsg?.includes("Unauthorized");
          const isLoadingError = errorMsg?.includes("503") || errorMsg?.includes("loading");
          
          let title = "Connection Status";
          let statusText = "System Check";
          let detail = `Error Details: ${errorMsg || "Unknown connection issue"}`;
    
          if (isAuthError) {
              title = "Authentication Failed";
              statusText = "Invalid Token";
              detail = "**Your HF_TOKEN is invalid.** Please check that you copied the entire token (starting with 'hf_') and that it has 'Inference' permissions.";
          } else if (isLoadingError) {
              title = "Model Warming Up";
              statusText = "Loading AI";
              detail = "The AI model is currently waking up from sleep mode. **Please wait 30 seconds and try again.** This is normal for the free tier.";
          }
    
          return {
              id: crypto.randomUUID(),
              query,
              age: ageStr,
              sex,
              nodes: [
                  { id: "root", label: title, type: "core", text: detail },
                  { id: "n1", parentId: "root", label: "Status", type: "challenge", text: statusText }
              ],
              narrative: `## ${title}\n\n${detail}\n\n### Raw Error\n\`${errorMsg}\``,
              iteration: 0
          };
      }}
