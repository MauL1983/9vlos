import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { VentureCard } from "@/components/VentureCard";
import { FounderFocus } from "@/components/FounderFocus";
import { AttentionAllocation } from "@/components/AttentionAllocation";
import { SurvivalSystem } from "@/components/SurvivalSystem";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { type VentureTrack, usePortfolio } from "@/state/portfolio-store";

interface ControlCenterProps {
  onVentureSelect: (id: string) => void;
}

export function ControlCenter({ onVentureSelect }: ControlCenterProps) {
  const { ventures, addVenture } = usePortfolio();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    track: "Incubation" as VentureTrack,
    nextMilestone: "",
    description: "",
  });

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const venture = addVenture(form);
    setForm({ name: "", track: "Incubation", nextMilestone: "", description: "" });
    setDialogOpen(false);
    onVentureSelect(venture.id);
  }

  return (
    <div className="flex flex-col gap-8 p-6 max-w-[1400px] mx-auto">
      {/* Page title */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="flex flex-col gap-1">
          <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">
            Control Center
          </h1>
          <p className="text-sm text-muted-foreground">
            Your portfolio at a glance — surface what matters, collapse the rest.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="gap-2 sm:self-center">
          <Plus className="size-4" />
          New Venture
        </Button>
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Open a portfolio slot</DialogTitle>
            <DialogDescription>
              Create a venture with its first milestone. It will persist in this browser.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="venture-name">Name</Label>
              <Input
                id="venture-name"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="CarbonLedger"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Track</Label>
              <Select
                value={form.track}
                onValueChange={(track: VentureTrack) => setForm((current) => ({ ...current, track }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Core">Core</SelectItem>
                  <SelectItem value="Growth">Growth</SelectItem>
                  <SelectItem value="Incubation">Incubation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="venture-milestone">Next milestone</Label>
              <Input
                id="venture-milestone"
                value={form.nextMilestone}
                onChange={(event) =>
                  setForm((current) => ({ ...current, nextMilestone: event.target.value }))
                }
                placeholder="Get 5 paid design partners"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="venture-description">Description</Label>
              <Textarea
                id="venture-description"
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({ ...current, description: event.target.value }))
                }
                placeholder="What this venture does and who it serves"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">Create and inspect</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
