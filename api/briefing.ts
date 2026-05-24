import { generateText, Output } from "ai";
import { z } from "zod";
import { generateRuleBasedBriefing, type BriefingItem } from "../src/lib/briefing.js";
import type { Venture } from "../src/data/ventures.js";

export const config = {
  runtime: "edge",
};

const requestSchema = z.object({
  ventures: z.array(z.any()),
});

const briefingSchema = z.object({
  briefings: z.array(
    z.object({
      type: z.enum(["alert", "insight", "pattern"]),
      title: z.string(),
      body: z.string(),
      venture: z.string().nullable(),
      severity: z.enum(["red", "amber", "green", "cyan", "neutral"]),
    })
  ),
});

function hasAICredentials() {
  return Boolean(
    process.env.VERCEL_OIDC_TOKEN ||
      process.env.AI_GATEWAY_API_KEY ||
      process.env.OPENAI_API_KEY
  );
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const body = requestSchema.safeParse(await request.json());
  if (!body.success) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const ventures = body.data.ventures as Venture[];
  const fallback = generateRuleBasedBriefing(ventures);

  if (!hasAICredentials()) {
    return Response.json(fallback);
  }

  try {
    const { output } = await generateText({
      model: "openai/gpt-5.4",
      output: Output.object({ schema: briefingSchema }),
      system:
        "You are the operating partner for 9VL OS. Produce concise founder portfolio briefings. Be specific, decision-oriented, and avoid financial advice claims.",
      prompt: `Analyze this venture portfolio and return exactly 5 briefing cards as JSON. Prefer concrete risk, leverage, survival-clock, and attention-allocation observations.\n\n${JSON.stringify(ventures, null, 2)}`,
    });

    return Response.json({
      briefings: output.briefings.map((brief): BriefingItem => ({
        ...brief,
        venture: brief.venture ?? null,
      })),
      generatedAt: new Date().toISOString(),
      generatedBy: "ai",
    });
  } catch (error) {
    console.error("AI briefing failed, using rules fallback", error);
    return Response.json(fallback);
  }
}
