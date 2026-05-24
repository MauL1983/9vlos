import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Lightbulb,
  RefreshCw,
  Sparkles,
  TrendingUp,
  TriangleAlert as AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateRuleBasedBriefing, type BriefingItem, type BriefingResponse } from "@/lib/briefing";
import { usePortfolio } from "@/state/portfolio-store";

const severityStyles: Record<
  BriefingItem["severity"],
  { color: string; bgColor: string; borderColor: string }
> = {
  red: {
    color: "text-health-red",
    bgColor: "oklch(0.65 0.22 25 / 0.06)",
    borderColor: "oklch(0.65 0.22 25 / 0.25)",
  },
  amber: {
    color: "text-health-amber",
    bgColor: "oklch(0.78 0.17 80 / 0.04)",
    borderColor: "oklch(0.78 0.17 80 / 0.2)",
  },
  green: {
    color: "text-health-green",
    bgColor: "oklch(0.7 0.2 145 / 0.04)",
    borderColor: "oklch(0.7 0.2 145 / 0.2)",
  },
  cyan: {
    color: "text-cyan-glow",
    bgColor: "oklch(0.72 0.17 194 / 0.04)",
    borderColor: "oklch(0.72 0.17 194 / 0.2)",
  },
  neutral: {
    color: "text-muted-foreground",
    bgColor: "transparent",
    borderColor: "var(--border)",
  },
};

function BriefingIcon({ type, severity }: { type: BriefingItem["type"]; severity: BriefingItem["severity"] }) {
  if (type === "alert") return <AlertTriangle className={cn("size-3.5", severityStyles[severity].color)} />;
  if (type === "insight") return <TrendingUp className={cn("size-3.5", severityStyles[severity].color)} />;
  if (severity === "cyan") return <Lightbulb className={cn("size-3.5", severityStyles[severity].color)} />;
  return <Bot className={cn("size-3.5", severityStyles[severity].color)} />;
}

function formatGeneratedAt(date: string) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export function AIBriefing() {
  const { ventures } = usePortfolio();
  const initialBriefing = useMemo(() => generateRuleBasedBriefing(ventures), [ventures]);
  const [briefing, setBriefing] = useState<BriefingResponse>(initialBriefing);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateBriefing() {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ventures }),
      });

      if (!response.ok) {
        throw new Error("Briefing service unavailable");
      }

      const nextBriefing = (await response.json()) as BriefingResponse;
      setBriefing(nextBriefing);
    } catch (caughtError) {
      setBriefing(generateRuleBasedBriefing(ventures));
      setError(caughtError instanceof Error ? caughtError.message : "Briefing service unavailable");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="p-6 max-w-[800px] mx-auto flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="size-5 text-cyan-glow" />
            <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">
              AI Briefing
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Portfolio-wide pattern recognition · Updated {formatGeneratedAt(briefing.generatedAt)}
          </p>
        </div>
        <Button onClick={generateBriefing} disabled={isGenerating} className="gap-2">
          <RefreshCw className={cn("size-4", isGenerating && "animate-spin")} />
          {isGenerating ? "Generating" : "Generate Briefing"}
        </Button>
      </motion.div>

      <div
        className="rounded-xl border px-4 py-3 text-sm"
        style={{
          background:
            briefing.generatedBy === "ai"
              ? "oklch(0.72 0.17 194 / 0.05)"
              : "oklch(0.78 0.17 80 / 0.04)",
          borderColor:
            briefing.generatedBy === "ai"
              ? "oklch(0.72 0.17 194 / 0.2)"
              : "oklch(0.78 0.17 80 / 0.2)",
        }}
      >
        <span className={briefing.generatedBy === "ai" ? "text-cyan-glow" : "text-health-amber"}>
          {briefing.generatedBy === "ai" ? "AI model active" : "Rules fallback active"}
        </span>
        <span className="text-muted-foreground">
          {" "}
          {briefing.generatedBy === "ai"
            ? "using Vercel AI Gateway."
            : "until AI Gateway credentials are enabled."}
        </span>
        {error && <span className="text-health-red"> {error}.</span>}
      </div>

      <div className="flex flex-col gap-3">
        {briefing.briefings.map((brief, i) => {
          const style = severityStyles[brief.severity];
          return (
            <motion.div
              key={`${brief.title}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="rounded-xl border p-5 flex flex-col gap-3"
              style={{
                background: style.bgColor,
                borderColor: style.borderColor,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex size-7 shrink-0 items-center justify-center rounded-lg mt-0.5"
                  style={{ background: style.borderColor }}
                >
                  <BriefingIcon type={brief.type} severity={brief.severity} />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-semibold text-sm text-foreground leading-snug">
                      {brief.title}
                    </h3>
                    {brief.venture && (
                      <span
                        className={cn(
                          "text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0",
                          style.color,
                          "border-current/25 bg-current/5"
                        )}
                        style={{ background: style.bgColor }}
                      >
                        {brief.venture}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{brief.body}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-[11px] text-muted-foreground text-center pb-2">
        Briefings are operating signals for prioritization, not financial advice.
      </p>
    </div>
  );
}
