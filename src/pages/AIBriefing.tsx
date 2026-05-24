import { motion } from "framer-motion";
import { Sparkles, TriangleAlert as AlertTriangle, TrendingUp, Lightbulb, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const briefings = [
  {
    type: "alert",
    icon: AlertTriangle,
    color: "text-health-red",
    bgColor: "oklch(0.65 0.22 25 / 0.06)",
    borderColor: "oklch(0.65 0.22 25 / 0.25)",
    title: "Critical: Vitality needs founder decision this week",
    body: "D30 retention at 24% — 16 points below survival threshold. Two paths: pivot to B2B corporate wellness (requires 3-week sprint) or return slot to vault and deploy CarbonLedger. Waiting another month eliminates the pivot option.",
    venture: "Vitality",
  },
  {
    type: "alert",
    icon: AlertTriangle,
    color: "text-health-amber",
    bgColor: "oklch(0.78 0.17 80 / 0.04)",
    borderColor: "oklch(0.78 0.17 80 / 0.2)",
    title: "LaCentral GMV declining — 7 months to prove model",
    body: "Delivery reliability at 76% is triggering carrier churn risk. Root cause points to dispatch algorithm, not headcount. Recommend: 2-week engineering sprint before any hiring decisions.",
    venture: "LaCentral",
  },
  {
    type: "insight",
    icon: TrendingUp,
    color: "text-health-green",
    bgColor: "oklch(0.7 0.2 145 / 0.04)",
    borderColor: "oklch(0.7 0.2 145 / 0.2)",
    title: "Kiperfy's enterprise pipeline is the highest-leverage bet",
    body: "2 stalled deals worth $340K ARR combined. Founders direct-to-champion follow-up (not email) has 3× close rate vs. standard cadence. Block 4 hours this week for direct calls.",
    venture: "Kiperfy",
  },
  {
    type: "insight",
    icon: Lightbulb,
    color: "text-cyan-glow",
    bgColor: "oklch(0.72 0.17 194 / 0.04)",
    borderColor: "oklch(0.72 0.17 194 / 0.2)",
    title: "AhorroEnergy's SMB shortcut may be the right move",
    body: "Enterprise procurement averaging 7.2 months — runway math doesn't work. 12 identified SMB targets could close in 6–8 weeks each at $8–15K contracts. Recommend dual-track pilot: enterprise continues, SMB starts immediately.",
    venture: "AhorroEnergy",
  },
  {
    type: "pattern",
    icon: Bot,
    color: "text-muted-foreground",
    bgColor: "transparent",
    borderColor: "var(--border)",
    title: "Portfolio pattern: Incubation stage needs 2× current attention",
    body: "You're allocating 33% of founder time to 6 Incubation ventures. Historical data from similar portfolios suggests 50% is the minimum for adequate intervention rate. Core ventures (Kiperfy, BlackPenguin, i9Framework) are stable enough for 20% combined.",
    venture: null,
  },
];

export function AIBriefing() {
  return (
    <div className="p-6 max-w-[800px] mx-auto flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="size-5 text-cyan-glow" />
          <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">
            AI Briefing
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Portfolio-wide pattern recognition · Updated daily
        </p>
      </motion.div>

      <div className="flex flex-col gap-3">
        {briefings.map((brief, i) => {
          const Icon = brief.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="rounded-xl border p-5 flex flex-col gap-3"
              style={{
                background: brief.bgColor,
                borderColor: brief.borderColor,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex size-7 shrink-0 items-center justify-center rounded-lg mt-0.5"
                  style={{ background: `${brief.borderColor}` }}
                >
                  <Icon className={cn("size-3.5", brief.color)} />
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
                          brief.color,
                          "border-current/25 bg-current/5"
                        )}
                        style={{ background: brief.bgColor }}
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
        AI analysis based on mock portfolio data · Not real financial advice
      </p>
    </div>
  );
}
