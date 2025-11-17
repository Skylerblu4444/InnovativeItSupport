import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function suggestTroubleshooting(issueText: string) {
  const prompt = `You are a helpful IT support assistant. Given this problem description, provide a short prioritized troubleshooting checklist:\n\nProblem: ${issueText}\n\nChecklist:`;
  const result = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: "You are an IT support assistant." }, { role: "user", content: prompt }],
    max_tokens: 300
  });
  return result.choices?.[0]?.message?.content ?? "No suggestion.";
}
