/**
 * POST /api/neon/ai
 * Sends a prompt through the Neon AI Gateway.
 * Body: { prompt: string }
 * Returns: { text: string }
 */
import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { getNeonAI } from "@/lib/neon-services";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: "prompt is required" }, { status: 400 });

    const neon = getNeonAI();
    const { text } = await generateText({
      model: neon("openai/gpt-4o-mini"),
      prompt,
    });

    return NextResponse.json({ text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
