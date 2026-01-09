import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

const HF_TOKEN = process.env.HF_TOKEN;
const MODEL = "meta-llama/Llama-3.2-3B-Instruct"; // Lightweight, fast, reliable

export async function POST(req: Request) {
  try {
    if (!HF_TOKEN) {
        console.error("HF_TOKEN is missing on server.");
        return NextResponse.json({ error: "Missing HF_TOKEN" }, { status: 401 });
    }

    const { query, age, sex, action, previousNarrative } = await req.json();
    const ageNum = parseInt(age);

    // Age Bracket Logic
    let bracket = "18-25";
    if (ageNum >= 26 && ageNum <= 35) bracket = "26-35";
    if (ageNum >= 36 && ageNum <= 45) bracket = "36-45";
    if (ageNum >= 46 && ageNum <= 55) bracket = "46-55";
    if (ageNum >= 56 && ageNum <= 65) bracket = "56-65";
    if (ageNum >= 66) bracket = "66+";

    let structureInstruction = "";
    
    if (action) {
        structureInstruction = `
    TASK: Return 2 parts separated by "|||".
    Part 1: The Title and short text for the new node.
    Part 2: The new narrative section.
    
    Format:
    Title: [Short Title]
    Insight: [The core insight text for the node]
    |||
    ## [New Section Title]
    [Content...]`;
    } else {
        structureInstruction = `
    TASK: Return 4 parts separated by "|||".
    Part 1: Root Node (The core philosophical shift).
    Part 2: Challenge Node (The internal fear).
    Part 3: Resolution Node (The timeline where they let go).
    Part 4: The Full Narrative.
    
    Format:
    Title: [Root Title]
    Insight: [Root Insight]
    |||
    Title: [Challenge Title]
    Insight: [Challenge Insight]
    |||
    Title: [Resolution Title]
    Insight: [Resolution Insight]
    |||
    ## [Main Title]
    [Full narrative content...]`;
    }

    const systemPrompt = `You are the Epiphany Engine.
    User Profile: Age ${age} (${bracket}), Sex: ${sex}.
    
    IMPORTANT: Do NOT output JSON. Use the "|||" separator exactly as requested.
    ${structureInstruction}
    Keep it profound but concise.`;

    let userPrompt = "";

    if (action === "deepen") {
        userPrompt = `The user wants to "Drill Deeper" into this previous insight: "${previousNarrative}". 
        Reveal the SUBCONSCIOUS ROOT (childhood/past) of this pattern.
        Output following the TASK Part 1 and Part 2 format.`;
    } else if (action === "challenge") {
        userPrompt = `The user wants to "Challenge" this previous insight: "${previousNarrative}".
        Provide a COUNTER-INTUITIVE perspective that flips the problem on its head.
        Output following the TASK Part 1 and Part 2 format.`;
    } else {
        userPrompt = `Analyze this dilemma: "${query}".
        Theme: ${bracket} life stage challenges.
        Output following the TASK Part 1, 2, 3 and 4 format.`;
    }

    const hf = new HfInference(HF_TOKEN);

    // Switch to chatCompletion which maps to the "conversational" task type
    const result = await hf.chatCompletion({
        model: MODEL,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
        max_tokens: 2048,
        temperature: 0.7
    });

    let text = result.choices[0].message.content || "";
    
    // Robust Text Parsing Strategy
    const parts = text.split("|||").map(p => p.trim());
    
    if (action) {
        // Expecting 2 parts: Node, Narrative
        if (parts.length < 2) throw new Error("AI response incomplete (missing separator |||)");
        
        const nodeText = parts[0];
        const narrativeText = parts[1];
        
        const titleMatch = nodeText.match(/Title:\s*(.+)/);
        const insightMatch = nodeText.match(/Insight:\s*([\s\S]+)/);
        
        return NextResponse.json({
            nodes: [
                { 
                    id: `node_${Date.now()}`, 
                    parentId: "root", 
                    label: titleMatch ? titleMatch[1].trim() : "New Insight", 
                    type: action === 'deepen' ? 'fractal' : 'insight', 
                    text: insightMatch ? insightMatch[1].trim() : nodeText 
                }
            ],
            narrative: narrativeText
        });
        
    } else {
        // Expecting 4 parts: Root, Challenge, Resolution, Narrative
        if (parts.length < 4) {
            // Fallback parsing if AI messed up separators
            console.warn("AI messed up separators, falling back to simple structure");
            return NextResponse.json({
                nodes: [
                    { id: "root", label: "Core Shift", type: "core", text: text.substring(0, 100) + "..." }
                ],
                narrative: text
            });
        }
        
        const parseNode = (raw: string, id: string, type: string, parentId?: string) => {
             const titleMatch = raw.match(/Title:\s*(.+)/);
             const insightMatch = raw.match(/Insight:\s*([\s\S]+)/);
             return {
                 id,
                 parentId,
                 label: titleMatch ? titleMatch[1].trim() : "Insight",
                 type,
                 text: insightMatch ? insightMatch[1].trim() : raw
             };
        };

        return NextResponse.json({
            nodes: [
                parseNode(parts[0], "root", "core"),
                parseNode(parts[1], "n1", "challenge", "root"),
                parseNode(parts[2], "n2", "resolution", "root")
            ],
            narrative: parts[3]
        });
    }

  } catch (error: any) {
    console.error("API Route Error:", error);
    // Determine status based on error message or type if possible
    return NextResponse.json({ error: error.message || "Unknown Error" }, { status: 500 });
  }
}