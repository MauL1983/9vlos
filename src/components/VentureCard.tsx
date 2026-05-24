import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, TriangleAlert as AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { HealthRing } from "./HealthRing";
import type { Venture } from "@/data/ventures";

interface VentureCardProps {
  venture: Venture;
  index: number;
  onClick: () => void;
}

function MomentumIcon({ momentum }: { momentum: Venture["momentum"] }) {
  if (momentum === "accelerating")
    return <TrendingUp className="size-3" style={{ color: "var(--health-green)" }} />;
  if (momentum === "slowing")
    return <TrendingDown className="size-3" style={{ color: "var(--health-red)" }} />;
  return <Minus className="size-3 text-muted-foreground" />;
}

function getMomentumLabel(momentum: Venture["momentum"]): { label: string; className: string } {
  if (momentum === "accelerating") return { label: "Accelerating", className: "text-health-green" };
  if (momentum === "slowing") return { label: "Slowing", className: "text-health-red" };
  return { label: "Steady", className: "text-muted-foreground" };
}

function getSurvivalBarColor(monthsLeft: number, total: number): string {
  const ratio = monthsLeft / total;
  if (ratio > 0.6) return "var(--health-green)";
  if (ratio > 0.35) return "var(--health-amber)";
  return "var(--health-red)";
}

function getTrackBadgeStyle(track: Venture["track"]) {
  if (track === "Core") return "bg-cyan-glow/10 text-cyan-glow border-cyan-glow/20";
  if (track === "Growth") return "bg-health-amber/10 text-health-amber border-health-amber/20";
  return "bg-muted text-muted-foreground border-border";
}

export function VentureCard({ venture, index, onClick }: VentureCardProps) {
  const momentum = getMomentumLabel(venture.momentum);
  const survivalPct = (venture.survivalMonthsLeft / venture.survivalTotalMonths) * 100;
  const survivalBarColor = getSurvivalBarColor(venture.survivalMonthsLeft, venture.survivalTotalMonths);
  const isAtRisk = venture.healthScore < 40 || venture.survivalMonthsLeft <= 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col rounded-xl border cursor-pointer",
        "bg-card transition-all duration-200 group",
        "hover:border-cyan-glow/30 hover:shadow-[0_4px_24px_oklch(0.72_0.17_194_/_0.08)]",
        isAtRisk
          ? "border-health-red/40 shadow-[0_0_0_1px_oklch(0.65_0.22_25_/_0.1)]"
          : "border-border"
      )}
    >
      {/* At-risk pulse indicator */}
      {isAtRisk && (
        <div className="absolute top-3 right-3 flex items-center gap-1">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className="size-3.5" style={{ color: "var(--health-red)" }} />
          </motion.div>
        </div>
      )}

      <div className="p-4 pb-3 flex flex-col gap-3 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1 min-w-0">
            <span className="font-display font-semibold text-sm text-card-foreground truncate leading-tight">
              {venture.name}
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 h-4 font-medium border-cyan-glow/25 text-cyan-glow bg-cyan-glow/5"
              >
                L{venture.level}
              </Badge>
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full border font-medium",
                  getTrackBadgeStyle(venture.track)
                )}
              >
                {venture.track}
              </span>
            </div>
          </div>
          <div className="shrink-0">
            <HealthRing score={venture.healthScore} size={56} strokeWidth={4} />
          </div>
        </div>

        {/* Momentum */}
        <div className="flex items-center gap-1.5">
          <MomentumIcon momentum={venture.momentum} />
          <span className={cn("text-[11px] font-medium", momentum.className)}>
            {momentum.label}
          </span>
        </div>

        {/* Next milestone */}
        <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-1">
          {venture.nextMilestone}
        </p>
      </div>

      {/* Survival clock */}
      <div className="px-4 pb-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground font-medium">Survival</span>
          <span
            className={cn(
              "text-[10px] font-semibold",
              isAtRisk ? "text-health-red" : "text-muted-foreground"
            )}
          >
            {venture.survivalLabel}
          </span>
        </div>
        <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: survivalBarColor }}
            initial={{ width: 0 }}
            animate={{ width: `${survivalPct}%` }}
            transition={{ delay: index * 0.06 + 0.4, duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
