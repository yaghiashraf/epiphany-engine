import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';
import { jsonrepair } from 'jsonrepair';

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
    IMPORTANT: For this action, return ONLY the NEW node(s) and the NEW narrative section.
    Structure:
    {
      "nodes": [
        { "id": "new_node_id", "parentId": "root", "label": "Title", "type": "${action === 'deepen' ? 'fractal' : 'insight'}", "text": "Insight..." }
      ],
      "narrative": "## New Section Title\n\nContent..."
    }`;
    } else {
        structureInstruction = `
    Structure:
    {
      "nodes": [
        { "id": "root", "label": "Title", "type": "core", "text": "Insight..." },
        { "id": "n1", "parentId": "root", "label": "Title", "type": "challenge", "text": "Insight..." },
        { "id": "n2", "parentId": "root", "label": "Title", "type": "resolution", "text": "Insight..." }
      ],
      "narrative": "## Title\n\nContent..."
    }`;
    }

    const systemPrompt = `You are the Epiphany Engine.
    User Profile: Age ${age} (${bracket}), Sex: ${sex}.
    
    IMPORTANT: Return ONLY valid JSON. 
    ${structureInstruction}
    Keep texts concise. No markdown in JSON values.`;

    let userPrompt = "";

    if (action === "deepen") {
        userPrompt = `The user wants to "Drill Deeper" into this previous insight: "${previousNarrative}". 
        Reveal the SUBCONSCIOUS ROOT (childhood/past) of this pattern.
        Output JSON with 1 new node (type: 'fractal') connected to 'root' and a narrative extension starting with "## The Root".`;
    } else if (action === "challenge") {
        userPrompt = `The user wants to "Challenge" this previous insight: "${previousNarrative}".
        Provide a COUNTER-INTUITIVE perspective that flips the problem on its head.
        Output JSON with 1 new node (type: 'insight') connected to 'root' and a narrative extension starting with "## The Flip".`;
    } else {
        userPrompt = `Analyze this dilemma: "${query}".
        Theme: ${bracket} life stage challenges.
        1. Root Node: The core philosophical shift needed.
        2. Challenge Node: The internal fear blocking them (be specific to ${sex}, age ${age}).
        3. Resolution Node: The timeline where they let go.
        Narrative should be 3 paragraphs, formatted with Markdown headers.`;
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
    
    // Aggressive cleanup: Remove markdown code blocks and trailing text
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    // Find the first '{' and the last '}' to isolate JSON
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1) {
        text = text.substring(firstBrace, lastBrace + 1);
        try {
            // Use jsonrepair instead of JSON.parse directly
            const repaired = jsonrepair(text);
            const json = JSON.parse(repaired);
            return NextResponse.json(json);
        } catch (e: any) {
             console.error("JSON Repair Failed:", text);
             return NextResponse.json({ error: `JSON Error: ${e.message}` }, { status: 500 });
        }
    } else {
        return NextResponse.json({
            nodes: [
                { id: "root", label: "Analysis Failed", type: "core", text: "The engine could not parse the infinite." }
            ],
            narrative: "## Connection Interrupted\n\nThe lattice is recalibrating. Please try again."
        });
    }

  } catch (error: any) {
    console.error("API Route Error:", error);
    // Determine status based on error message or type if possible
    return NextResponse.json({ error: error.message || "Unknown Error" }, { status: 500 });
  }
}
