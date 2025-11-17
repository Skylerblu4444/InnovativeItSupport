// src/app/api/ai/summarize-ticket/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

export async function POST(request: Request) {
  const { text } = await request.json();
  if (!text) return NextResponse.json({ error: 'text required' }, { status: 400 });

  try {
    const resp = await client.chat.completions.create({
      model: 'gpt-5.1-mini',
      messages: [
        { role: 'system', content: 'You are an expert IT analyst. Summarize and provide 3 next-action items.' },
        { role: 'user', content: text }
      ],
      max_tokens: 400
    });
    const summary = resp.choices?.[0]?.message?.content ?? '';
    return NextResponse.json({ summary });
  } catch (err: any) {
    console.error('OpenAI error', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
