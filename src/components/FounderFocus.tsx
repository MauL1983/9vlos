import { motion } from "framer-motion";
import { Target, Zap, TriangleAlert as AlertTriangle, ChevronRight, CircleCheck as CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { founderFocus } from "@/data/ventures";
import { usePortfolio } from "@/state/portfolio-store";

interface FounderFocusProps {
  onVentureClick: (id: string) => void;
}

export function FounderFocus({ onVentureClick }: FounderFocusProps) {
  const { ventures } = usePortfolio();
  const venture = ventures.find((v) => v.id === founderFocus.ventureId) ?? ventures[0];

  if (!venture) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="flex size-7 items-center justify-center rounded-lg"
              style={{ background: "oklch(0.65 0.22 25 / 0.12)" }}
            >
              <Target className="size-3.5" style={{ color: "var(--health-red)" }} />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Monthly Founder Focus
              </p>
              <h3 className="font-display font-semibold text-sm text-foreground">
                One venture demands your full attention
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-5">
        {/* Venture name */}
        <button
          onClick={() => onVentureClick(venture.id)}
          className={cn(
            "flex items-center justify-between w-full group",
            "rounded-lg border px-4 py-3 text-left transition-all duration-200",
            "border-health-red/30 bg-health-red/5 hover:bg-health-red/8"
          )}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="size-2 rounded-full flex-shrink-0"
              style={{ background: "var(--health-red)" }}
            />
            <div>
              <span className="font-display font-bold text-base text-foreground">
                {venture.name}
              </span>
              <span className="ml-2 text-xs text-muted-foreground">
                L{venture.level} · {venture.survivalLabel}
              </span>
            </div>
          </div>
          <ChevronRight className="size-4 text-muted-foreground group-hover:text-health-red transition-colors" />
        </button>

        {/* KPI */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Zap className="size-3.5 text-health-amber" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Most Impactful KPI
            </span>
          </div>
          <p className="text-sm text-foreground font-medium leading-snug pl-5">
            {founderFocus.mostImpactfulKPI}
          </p>
        </div>

        {/* Priorities — exactly 3 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              3 Priorities — No More
            </span>
            <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-2 py-0.5">
              {founderFocus.priorities.length}/3
            </span>
          </div>
          {founderFocus.priorities.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.08 }}
              className="flex items-start gap-2.5 rounded-lg bg-muted/50 px-3 py-2.5"
            >
              <CheckCircle2 className="size-3.5 text-muted-foreground mt-0.5 shrink-0" />
              <span className="text-sm text-foreground leading-snug">{p}</span>
            </motion.div>
          ))}
        </div>

        {/* Risk */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="size-3.5 text-health-red" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Biggest Risk
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed pl-5">
            {founderFocus.biggestRisk}
          </p>
        </div>

        {/* Decision */}
        <div
          className="rounded-lg border px-4 py-3"
          style={{
            borderColor: "oklch(0.72 0.17 194 / 0.2)",
            background: "oklch(0.72 0.17 194 / 0.04)",
          }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 text-cyan-glow">
            Next Strategic Decision
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            {founderFocus.nextDecision}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
