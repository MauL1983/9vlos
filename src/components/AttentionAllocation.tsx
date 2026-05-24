import { motion } from "framer-motion";
import { Brain, TrendingUp, OctagonAlert as AlertOctagon } from "lucide-react";
import { usePortfolio } from "@/state/portfolio-store";

export function AttentionAllocation() {
  const { ventures } = usePortfolio();
  const sorted = [...ventures].sort((a, b) => b.attentionPercent - a.attentionPercent);
  const interventionNeeded = ventures.filter((v) => v.needsIntervention);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div
            className="flex size-7 items-center justify-center rounded-lg"
            style={{ background: "oklch(0.72 0.17 194 / 0.1)" }}
          >
            <Brain className="size-3.5 text-cyan-glow" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Attention Allocation
            </p>
            <h3 className="font-display font-semibold text-sm text-foreground">
              Where time goes vs. leverage
            </h3>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        {sorted.map((v, i) => {
          const gap = v.leveragePercent - v.attentionPercent;
          const isUnder = gap > 3;
          const isOver = gap < -3;

          return (
            <div key={v.id} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-medium text-foreground truncate">
                    {v.name}
                  </span>
                  {v.needsIntervention && (
                    <AlertOctagon className="size-3 shrink-0 text-health-red" />
                  )}
                </div>
                <div className="flex items-center gap-3 text-[11px] shrink-0">
                  <span className="text-muted-foreground">{v.attentionPercent}% time</span>
                  {isUnder && (
                    <span className="flex items-center gap-0.5 text-health-amber font-medium">
                      <TrendingUp className="size-3" />
                      +{gap}% needed
                    </span>
                  )}
                  {isOver && (
                    <span className="text-muted-foreground">
                      -{Math.abs(gap)}% excess
                    </span>
                  )}
                </div>
              </div>

              <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                {/* Leverage bar (background) */}
                <div
                  className="absolute inset-y-0 left-0 rounded-full opacity-25"
                  style={{
                    width: `${v.leveragePercent * 3}%`,
                    background: isUnder
                      ? "var(--health-amber)"
                      : "var(--health-green)",
                  }}
                />
                {/* Attention bar */}
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: v.needsIntervention
                      ? "var(--health-red)"
                      : isUnder
                      ? "var(--health-amber)"
                      : "var(--health-green)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${v.attentionPercent * 3}%` }}
                  transition={{ delay: 0.8 + i * 0.05, duration: 0.7, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}

        {interventionNeeded.length > 0 && (
          <div
            className="mt-2 flex items-start gap-2 rounded-lg px-3 py-2.5"
            style={{
              background: "oklch(0.65 0.22 25 / 0.06)",
              borderLeft: "2px solid var(--health-red)",
            }}
          >
            <AlertOctagon className="size-3.5 mt-0.5 shrink-0 text-health-red" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="text-health-red font-medium">
                {interventionNeeded.map((v) => v.name).join(", ")}
              </span>{" "}
              need immediate founder intervention — current attention is insufficient.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
