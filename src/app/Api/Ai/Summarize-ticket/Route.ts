import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { text } = await req.json();

  const completion = await client.chat.completions.create({
    model: "gpt-5.1-mini",
    messages: [
      { role: "system", content: "Summarize IT helpdesk tickets clearly." },
      { role: "user", content: text }
    ]
  });

  return NextResponse.json({
    summary: completion.choices[0].message.content
  });
}
