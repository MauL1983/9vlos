import { motion } from "framer-motion";
import { Lightbulb, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ideationVaultItems } from "@/data/ventures";
import { cn } from "@/lib/utils";

export function IdeationVault() {
  return (
    <div className="p-6 max-w-[800px] mx-auto flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">
          Ideation Vault
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Ready to deploy when an active slot opens — scored by potential and founder fit.
        </p>
      </motion.div>

      {/* Alert */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-start gap-3 rounded-xl border border-health-amber/25 bg-health-amber/5 px-4 py-3"
      >
        <Sparkles className="size-4 shrink-0 mt-0.5 text-health-amber" />
        <p className="text-sm text-foreground leading-relaxed">
          <span className="font-semibold">Vitality</span> and{" "}
          <span className="font-semibold">LaCentral</span> are on short clocks.{" "}
          <span className="text-muted-foreground">
            If either misses next milestone, top vault ideas replace their slot.
          </span>
        </p>
      </motion.div>

      {/* Ideas list */}
      <div className="flex flex-col gap-3">
        {ideationVaultItems.map((idea, i) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.07 }}
            className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 hover:border-cyan-glow/25 transition-all cursor-pointer group"
          >
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "oklch(0.72 0.17 194 / 0.08)" }}
            >
              <Lightbulb className="size-4 text-cyan-glow" />
            </div>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="font-display font-semibold text-sm text-foreground">{idea.name}</span>
              <span className="text-xs text-muted-foreground">{idea.description}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex flex-col items-end gap-0.5">
                <span className="font-display font-bold text-sm text-cyan-glow">{idea.score}</span>
                <span className="text-[10px] text-muted-foreground">score</span>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px]",
                  i === 0 && "border-health-green/25 text-health-green bg-health-green/5"
                )}
              >
                {i === 0 ? "Next up" : `#${i + 1}`}
              </Badge>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-cyan-glow transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-xs text-muted-foreground text-center pt-2">
        Score based on founder fit, market timing, and capital efficiency
      </div>
    </div>
  );
}
