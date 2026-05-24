import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HealthRing } from "@/components/HealthRing";
import { ventures, LEVEL_LABELS } from "@/data/ventures";
import { cn } from "@/lib/utils";

interface VentureDetailProps {
  ventureId: string;
  onBack: () => void;
}

export function VentureDetail({ ventureId, onBack }: VentureDetailProps) {
  const venture = ventures.find((v) => v.id === ventureId);
  if (!venture) return null;

  const isAtRisk = venture.healthScore < 40 || venture.survivalMonthsLeft <= 5;
  const survivalPct = (venture.survivalMonthsLeft / venture.survivalTotalMonths) * 100;

  return (
    <div className="p-6 max-w-[900px] mx-auto flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3"
      >
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5 -ml-2">
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </motion.div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className={cn(
          "rounded-xl border p-6 flex items-start gap-6",
          isAtRisk ? "border-health-red/30 bg-health-red/3" : "border-border bg-card"
        )}
      >
        <HealthRing score={venture.healthScore} size={88} strokeWidth={6} />
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-display font-bold text-2xl text-foreground">{venture.name}</h1>
            <Badge variant="outline" className="text-xs border-cyan-glow/25 text-cyan-glow bg-cyan-glow/5">
              L{venture.level} · {LEVEL_LABELS[venture.level]}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {venture.track}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{venture.description}</p>
          <div className="flex items-center gap-2 mt-1">
            {venture.momentum === "accelerating" ? (
              <TrendingUp className="size-4 text-health-green" />
            ) : venture.momentum === "slowing" ? (
              <TrendingDown className="size-4 text-health-red" />
            ) : (
              <Minus className="size-4 text-muted-foreground" />
            )}
            <span
              className={cn(
                "text-sm font-medium",
                venture.momentum === "accelerating"
                  ? "text-health-green"
                  : venture.momentum === "slowing"
                  ? "text-health-red"
                  : "text-muted-foreground"
              )}
            >
              {venture.momentum === "accelerating"
                ? "Accelerating"
                : venture.momentum === "slowing"
                ? "Slowing"
                : "Steady"}
            </span>
            <span className="text-muted-foreground">·</span>
            <span
              className={cn(
                "text-sm font-medium",
                isAtRisk ? "text-health-red" : "text-muted-foreground"
              )}
            >
              {venture.survivalLabel}
            </span>
          </div>
          {/* Survival bar */}
          <div className="mt-1 flex flex-col gap-1">
            <div className="h-2 w-full max-w-xs rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    survivalPct > 60
                      ? "var(--health-green)"
                      : survivalPct > 35
                      ? "var(--health-amber)"
                      : "var(--health-red)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${survivalPct}%` }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </div>
            <span className="text-[11px] text-muted-foreground">
              {venture.survivalMonthsLeft} of {venture.survivalTotalMonths} months remaining
            </span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4"
        >
          <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Key Metrics
          </h3>
          <div className="flex flex-col gap-3">
            {venture.kpis.map((kpi) => (
              <div key={kpi.label} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{kpi.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm text-foreground">{kpi.value}</span>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      kpi.up ? "text-health-green" : "text-health-red"
                    )}
                  >
                    {kpi.delta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Priorities */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4"
        >
          <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            3 Priorities
          </h3>
          <div className="flex flex-col gap-2">
            {venture.priorities.map((p, i) => (
              <div key={i} className="flex items-start gap-2.5 rounded-lg bg-muted/40 px-3 py-2">
                <span className="text-[10px] font-display font-bold text-muted-foreground mt-0.5 w-3 shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground leading-snug">{p}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Risk + Decision */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="md:col-span-2 rounded-xl border border-border bg-card p-5 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                Biggest Risk
              </h3>
              <p className="text-sm text-foreground leading-relaxed">{venture.biggestRisk}</p>
            </div>
            <div
              className="flex flex-col gap-2 rounded-lg px-4 py-3"
              style={{ background: "oklch(0.72 0.17 194 / 0.05)", borderLeft: "2px solid var(--cyan-glow)" }}
            >
              <h3 className="font-display font-semibold text-sm text-cyan-glow uppercase tracking-wider">
                Next Decision
              </h3>
              <p className="text-sm text-foreground leading-relaxed">{venture.nextDecision}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
