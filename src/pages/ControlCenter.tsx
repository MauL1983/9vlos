import { motion } from "framer-motion";
import { VentureCard } from "@/components/VentureCard";
import { FounderFocus } from "@/components/FounderFocus";
import { AttentionAllocation } from "@/components/AttentionAllocation";
import { SurvivalSystem } from "@/components/SurvivalSystem";
import { ventures } from "@/data/ventures";

interface ControlCenterProps {
  onVentureSelect: (id: string) => void;
}

export function ControlCenter({ onVentureSelect }: ControlCenterProps) {
  return (
    <div className="flex flex-col gap-8 p-6 max-w-[1400px] mx-auto">
      {/* Page title */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-1"
      >
        <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">
          Control Center
        </h1>
        <p className="text-sm text-muted-foreground">
          Your portfolio at a glance — surface what matters, collapse the rest.
        </p>
      </motion.div>

      {/* Venture Grid — 3×3 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Active Ventures
          </h2>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {ventures.length}/9 slots filled
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ventures.map((v, i) => (
            <VentureCard
              key={v.id}
              venture={v}
              index={i}
              onClick={() => onVentureSelect(v.id)}
            />
          ))}
        </div>
      </section>

      {/* Bottom panels */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <FounderFocus onVentureClick={onVentureSelect} />
        </div>
        <div className="lg:col-span-1">
          <AttentionAllocation />
        </div>
        <div className="lg:col-span-1">
          <SurvivalSystem />
        </div>
      </section>
    </div>
  );
}
