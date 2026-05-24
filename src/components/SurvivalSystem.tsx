import { motion } from "framer-motion";
import { Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ventures } from "@/data/ventures";

function getSurvivalProb(v: (typeof ventures)[0]): number {
  const timeRatio = v.survivalMonthsLeft / v.survivalTotalMonths;
  const healthFactor = v.healthScore / 100;
  const momentumFactor =
    v.momentum === "accelerating" ? 1.15 : v.momentum === "slowing" ? 0.75 : 1.0;
  return Math.round(Math.min(98, timeRatio * healthFactor * momentumFactor * 120));
}

function getProbColor(prob: number): string {
  if (prob >= 65) return "var(--health-green)";
  if (prob >= 40) return "var(--health-amber)";
  return "var(--health-red)";
}

export function SurvivalSystem() {
  const incubation = ventures.filter((v) => v.track !== "Core");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75, duration: 0.5 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div
            className="flex size-7 items-center justify-center rounded-lg"
            style={{ background: "oklch(0.78 0.17 80 / 0.1)" }}
          >
            <Clock className="size-3.5 text-health-amber" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Survival System
            </p>
            <h3 className="font-display font-semibold text-sm text-foreground">
              18-month clock per venture
            </h3>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {incubation.map((v, i) => {
          const prob = getSurvivalProb(v);
          const probColor = getProbColor(prob);
          const survivalPct = (v.survivalMonthsLeft / v.survivalTotalMonths) * 100;

          return (
            <div key={v.id} className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="size-1.5 rounded-full shrink-0" style={{ background: probColor }} />
                  <span className="text-xs font-medium text-foreground truncate">{v.name}</span>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {v.survivalMonthsLeft} mo left
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {v.momentum === "accelerating" ? (
                    <TrendingUp className="size-3 text-health-green" />
                  ) : v.momentum === "slowing" ? (
                    <TrendingDown className="size-3 text-health-red" />
                  ) : (
                    <Minus className="size-3 text-muted-foreground" />
                  )}
                  <span
                    className="text-xs font-display font-bold tabular-nums"
                    style={{ color: probColor }}
                  >
                    {prob}%
                  </span>
                  <span className="text-[10px] text-muted-foreground">survive</span>
                </div>
              </div>

              {/* Timeline bar */}
              <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: probColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${survivalPct}%` }}
                  transition={{ delay: 0.9 + i * 0.06, duration: 0.7, ease: "easeOut" }}
                />
              </div>

              {/* Milestone */}
              <p className="text-[11px] text-muted-foreground leading-snug">
                Next: {v.nextMilestone}
              </p>
            </div>
          );
        })}

        <div
          className="mt-1 rounded-lg px-3 py-2.5 text-xs text-muted-foreground leading-relaxed"
          style={{ background: "oklch(0.78 0.17 80 / 0.05)", borderLeft: "2px solid var(--health-amber)" }}
        >
          Ventures missing growth targets at 18 months are archived and replaced from the Ideation Vault.
        </div>
      </div>
    </motion.div>
  );
}
