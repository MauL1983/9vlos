import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { VentureCard } from "@/components/VentureCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePortfolio, type VentureTrack } from "@/state/portfolio-store";

interface VenturesProps {
  onVentureSelect: (id: string) => void;
}

const tracks = ["Core", "Growth", "Incubation"] as const;
type TrackFilter = VentureTrack | "All";

export function Ventures({ onVentureSelect }: VenturesProps) {
  const { ventures } = usePortfolio();
  const [query, setQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState<TrackFilter>("All");
  const filteredVentures = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return ventures.filter((venture) => {
      const matchesTrack = trackFilter === "All" || venture.track === trackFilter;
      const matchesQuery =
        !normalizedQuery ||
        venture.name.toLowerCase().includes(normalizedQuery) ||
        venture.nextMilestone.toLowerCase().includes(normalizedQuery);

      return matchesTrack && matchesQuery;
    });
  }, [query, trackFilter, ventures]);

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

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search ventures or milestones"
          className="sm:max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {(["All", ...tracks] as TrackFilter[]).map((track) => (
            <Button
              key={track}
              type="button"
              variant={trackFilter === track ? "default" : "outline"}
              size="sm"
              onClick={() => setTrackFilter(track)}
            >
              {track}
            </Button>
          ))}
        </div>
      </div>

      {tracks.map((track) => {
        const trackVentures = filteredVentures.filter((v) => v.track === track);
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

      {filteredVentures.length === 0 && (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <h2 className="font-display font-semibold text-sm text-foreground">No ventures found</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Clear the search or switch tracks to see the full portfolio.
          </p>
        </div>
      )}
    </div>
  );
}
