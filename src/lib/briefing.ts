import type { Venture } from "../data/ventures.js";

export type BriefingType = "alert" | "insight" | "pattern";

export interface BriefingItem {
  type: BriefingType;
  title: string;
  body: string;
  venture: string | null;
  severity: "red" | "amber" | "green" | "cyan" | "neutral";
}

export interface BriefingResponse {
  briefings: BriefingItem[];
  generatedAt: string;
  generatedBy: "ai" | "rules";
}

function formatList(items: Venture[]) {
  return items.map((venture) => venture.name).join(", ");
}

function plural(count: number, singular: string, pluralLabel = `${singular}s`) {
  return count === 1 ? singular : pluralLabel;
}

function subjectVerb(count: number, singular: string, pluralLabel: string) {
  return count === 1 ? singular : pluralLabel;
}

export function generateRuleBasedBriefing(ventures: Venture[]): BriefingResponse {
  const atRisk = ventures
    .filter((venture) => venture.healthScore < 45 || venture.survivalMonthsLeft <= 6)
    .sort((a, b) => a.healthScore - b.healthScore);
  const highestLeverage = [...ventures].sort((a, b) => b.leveragePercent - a.leveragePercent)[0];
  const underAllocated = ventures
    .filter((venture) => venture.leveragePercent - venture.attentionPercent > 3)
    .sort((a, b) => b.leveragePercent - b.attentionPercent - (a.leveragePercent - a.attentionPercent));
  const incubation = ventures.filter((venture) => venture.track === "Incubation");
  const slowing = ventures.filter((venture) => venture.momentum === "slowing");
  const briefings: BriefingItem[] = [];

  if (atRisk[0]) {
    briefings.push({
      type: "alert",
      severity: "red",
      venture: atRisk[0].name,
      title: `${atRisk[0].name} needs a founder decision this week`,
      body: `${atRisk[0].nextMilestone} is the active survival milestone. Health is ${atRisk[0].healthScore} with ${atRisk[0].survivalMonthsLeft} months left, so the next meeting should end with a clear pivot, repair, or archive decision.`,
    });
  }

  if (highestLeverage) {
    briefings.push({
      type: "insight",
      severity: "green",
      venture: highestLeverage.name,
      title: `${highestLeverage.name} is the highest-leverage portfolio bet`,
      body: `It carries ${highestLeverage.leveragePercent}% leverage against ${highestLeverage.attentionPercent}% attention. Protect founder time for ${highestLeverage.nextMilestone.toLowerCase()} before adding new work.`,
    });
  }

  if (underAllocated[0]) {
    const gap = underAllocated[0].leveragePercent - underAllocated[0].attentionPercent;
    briefings.push({
      type: "alert",
      severity: "amber",
      venture: underAllocated[0].name,
      title: `${underAllocated[0].name} is under-allocated by ${gap}%`,
      body: `The portfolio model says this venture deserves more attention than it is receiving. Move one low-leverage block toward ${underAllocated[0].nextMilestone.toLowerCase()}.`,
    });
  }

  if (incubation.length > 0) {
    briefings.push({
      type: "pattern",
      severity: "cyan",
      venture: null,
      title: `${incubation.length} ${plural(incubation.length, "venture")} ${subjectVerb(incubation.length, "is", "are")} still on the survival clock`,
      body: `${formatList(incubation)} ${subjectVerb(incubation.length, "needs", "need")} sharper proof milestones. Keep each slot tied to one measurable signal and one kill-or-continue date.`,
    });
  }

  if (slowing.length > 0) {
    briefings.push({
      type: "pattern",
      severity: "neutral",
      venture: null,
      title: `${slowing.length} ${plural(slowing.length, "venture")} ${subjectVerb(slowing.length, "is", "are")} losing momentum`,
      body: `${formatList(slowing)} should be reviewed before the next weekly planning cycle so risk does not hide inside normal status reporting.`,
    });
  }

  return {
    briefings: briefings.slice(0, 5),
    generatedAt: new Date().toISOString(),
    generatedBy: "rules",
  };
}
