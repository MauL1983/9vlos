import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  LEVEL_LABELS,
  ventures as initialVentures,
  type Momentum,
  type Venture,
  type VentureTrack,
} from "@/data/ventures";

const STORAGE_KEY = "9vl-portfolio-ventures";

export interface NewVentureInput {
  name: string;
  track: VentureTrack;
  nextMilestone: string;
  description: string;
}

interface PortfolioStore {
  ventures: Venture[];
  addVenture: (input: NewVentureInput) => Venture;
  updateVenture: (id: string, updates: Partial<Venture>) => void;
  removeVenture: (id: string) => void;
  resetPortfolio: () => void;
}

const PortfolioContext = createContext<PortfolioStore | null>(null);

function isValidVentureList(value: unknown): value is Venture[] {
  return Array.isArray(value) && value.every((item) => {
    return (
      item &&
      typeof item === "object" &&
      "id" in item &&
      "name" in item &&
      "healthScore" in item
    );
  });
}

function loadVentures() {
  if (typeof window === "undefined") {
    return initialVentures;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return initialVentures;
  }

  try {
    const parsed: unknown = JSON.parse(stored);
    return isValidVentureList(parsed) ? parsed : initialVentures;
  } catch {
    return initialVentures;
  }
}

function makeId(name: string) {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${slug || "venture"}-${Date.now().toString(36)}`;
}

function survivalLabel(monthsLeft: number) {
  if (monthsLeft >= 18) return "Healthy";
  if (monthsLeft <= 5) return `${monthsLeft} mo left - at risk`;
  return `${monthsLeft} mo left`;
}

function createVenture(input: NewVentureInput): Venture {
  const survivalMonthsLeft = input.track === "Core" ? 18 : 12;
  const level = input.track === "Core" ? 6 : input.track === "Growth" ? 2 : 1;

  return {
    id: makeId(input.name),
    name: input.name.trim(),
    level,
    levelLabel: LEVEL_LABELS[level],
    healthScore: input.track === "Core" ? 70 : 52,
    momentum: "steady",
    survivalLabel: survivalLabel(survivalMonthsLeft),
    survivalMonthsLeft,
    survivalTotalMonths: 18,
    track: input.track,
    nextMilestone: input.nextMilestone.trim(),
    description: input.description.trim(),
    kpis: [
      { label: "Signal", value: "New", delta: "0", up: true },
      { label: "Revenue", value: "$0", delta: "0", up: false },
      { label: "Users", value: "0", delta: "0", up: false },
    ],
    priorities: [
      "Define the first proof milestone",
      "Interview 5 target customers",
      "Set kill or continue criteria",
    ],
    biggestRisk: "New slot needs a clear proof signal before it earns more founder attention.",
    nextDecision: "What is the smallest test that proves this venture deserves a portfolio slot?",
    attentionPercent: 3,
    leveragePercent: 5,
    needsIntervention: input.track !== "Core",
  };
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [ventures, setVentures] = useState<Venture[]>(loadVentures);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ventures));
  }, [ventures]);

  const value = useMemo<PortfolioStore>(() => {
    return {
      ventures,
      addVenture(input) {
        const venture = createVenture(input);
        setVentures((current) => [venture, ...current]);
        return venture;
      },
      updateVenture(id, updates) {
        setVentures((current) =>
          current.map((venture) => {
            if (venture.id !== id) {
              return venture;
            }

            const next = { ...venture, ...updates };
            return {
              ...next,
              levelLabel: LEVEL_LABELS[next.level] ?? next.levelLabel,
              survivalLabel: updates.survivalMonthsLeft
                ? survivalLabel(updates.survivalMonthsLeft)
                : next.survivalLabel,
              needsIntervention:
                next.healthScore < 45 ||
                next.survivalMonthsLeft <= 7 ||
                next.momentum === "slowing",
            };
          })
        );
      },
      removeVenture(id) {
        setVentures((current) => current.filter((venture) => venture.id !== id));
      },
      resetPortfolio() {
        setVentures(initialVentures);
      },
    };
  }, [ventures]);

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used inside PortfolioProvider");
  }
  return context;
}

export type { Momentum, Venture, VentureTrack };
