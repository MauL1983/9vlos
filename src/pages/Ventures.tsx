import { motion } from "framer-motion";
import { VentureCard } from "@/components/VentureCard";
import { ventures } from "@/data/ventures";
import { Badge } from "@/components/ui/badge";

interface VenturesProps {
  onVentureSelect: (id: string) => void;
}

const tracks = ["Core", "Growth", "Incubation"] as const;

export function Ventures({ onVentureSelect }: VenturesProps) {
  return (
    <div className="p-6 max-w-[1400px] mx-auto flex flex-col gap-8">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">Ventures</h1>
        <p className="text-sm text-muted-foreground mt-1">
          9 active slots · Levels 0–9 · 18-month survival clock
        </p>
      </motion.div>

      {tracks.map((track) => {
        const trackVentures = ventures.filter((v) => v.track === track);
        if (!trackVentures.length) return null;
        return (
          <section key={track}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                {track} Track
              </h2>
              <Badge variant="outline" className="text-[10px]">
                {trackVentures.length}
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {trackVentures.map((v, i) => (
                <VentureCard
                  key={v.id}
                  venture={v}
                  index={i}
                  onClick={() => onVentureSelect(v.id)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
