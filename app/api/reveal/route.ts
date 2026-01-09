import { NextResponse } from 'next/server';

const HF_TOKEN = process.env.HF_TOKEN;
const MODEL = "mistralai/Mistral-7B-Instruct-v0.3"; // High quality, fast

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

    const systemPrompt = `You are the Epiphany Engine, a philosophical AI that constructs "Revelation Lattices" to help users break through life constraints. 
    You speak with profound, slightly mystical, but highly psychological authority.
    User Profile: Age ${age} (${bracket} bracket), Sex: ${sex}.
    
    Output JSON ONLY. Structure:
    {
      "nodes": [
        { "id": "root", "label": "Short Title", "type": "core", "text": "Insight..." },
        { "id": "n1", "parentId": "root", "label": "Short Title", "type": "challenge", "text": "Insight..." },
        { "id": "n2", "parentId": "root", "label": "Short Title", "type": "resolution", "text": "Insight..." }
      ],
      "narrative": "Markdown formatted deep dive..."
    }`;

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

    // Function to call HF with retry logic for 503 (Model Loading)
    const callHF = async (retries = 3): Promise<Response> => {
        const response = await fetch(`https://router.huggingface.co/hf-inference/models/${MODEL}`, {
            headers: {
                Authorization: `Bearer ${HF_TOKEN}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                inputs: `<s>[INST] ${systemPrompt} 

 ${userPrompt} [/INST]`,
                parameters: {
                    max_new_tokens: 1024,
                    temperature: 0.7,
                    return_full_text: false,
                }
            }),
        });

        if (response.status === 503 && retries > 0) {
            const data = await response.json();
            const waitTime = data.estimated_time || 20;
            console.log(`Model loading... waiting ${waitTime}s`);
            await new Promise(r => setTimeout(r, waitTime * 1000));
            return callHF(retries - 1);
        }

        return response;
    };

    const response = await callHF();

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`HF API Error: ${response.status} ${errText}`);
    }

    const result = await response.json();
    let text = result[0]?.generated_text || "";
    
    // Cleanup JSON parsing from LLM output (it often adds extra text)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        const json = JSON.parse(jsonMatch[0]);
        return NextResponse.json(json);
    } else {
        // Fallback if LLM fails JSON format (Safety Net)
        return NextResponse.json({
            nodes: [
                { id: "root", label: "Analysis Failed", type: "core", text: "The engine could not parse the infinite." }
            ],
            narrative: "## Connection Interrupted\n\nThe lattice is recalibrating. Please try again."
        });
    }

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: error.message || "Unknown Error" }, { status: 500 });
  }
}
