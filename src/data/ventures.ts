export type Momentum = "accelerating" | "steady" | "slowing";
export type VentureTrack = "Core" | "Growth" | "Incubation";

export interface Venture {
  id: string;
  name: string;
  level: number;
  levelLabel: string;
  healthScore: number;
  momentum: Momentum;
  survivalLabel: string;
  survivalMonthsLeft: number;
  survivalTotalMonths: number;
  track: VentureTrack;
  nextMilestone: string;
  description: string;
  kpis: { label: string; value: string; delta: string; up: boolean }[];
  priorities: string[];
  biggestRisk: string;
  nextDecision: string;
  attentionPercent: number;
  leveragePercent: number;
  needsIntervention: boolean;
}

export const LEVEL_LABELS: Record<number, string> = {
  0: "Ideation",
  1: "Exploration",
  2: "Prototype",
  3: "Validation",
  4: "Engagement",
  5: "Product-Market Fit",
  6: "Revenue",
  7: "Scaling",
  8: "Expansion",
  9: "Revenue Goal",
};

export const ventures: Venture[] = [
  {
    id: "kiperfy",
    name: "Kiperfy",
    level: 6,
    levelLabel: LEVEL_LABELS[6],
    healthScore: 82,
    momentum: "accelerating",
    survivalLabel: "Graduated track",
    survivalMonthsLeft: 18,
    survivalTotalMonths: 18,
    track: "Core",
    nextMilestone: "Close Series A by Q3",
    description: "AI-powered property management platform for residential landlords.",
    kpis: [
      { label: "MRR", value: "$48K", delta: "+18%", up: true },
      { label: "Customers", value: "312", delta: "+24", up: true },
      { label: "Churn", value: "1.2%", delta: "-0.3%", up: true },
    ],
    priorities: [
      "Close 3 enterprise pilots by end of month",
      "Launch mobile app for tenant self-service",
      "Finalize Series A deck with CFO",
    ],
    biggestRisk: "Two competing enterprise proposals stalled in procurement — deal velocity dropping.",
    nextDecision: "Hire dedicated enterprise sales rep or expand founder-led sales through Q4?",
    attentionPercent: 22,
    leveragePercent: 32,
    needsIntervention: false,
  },
  {
    id: "blackpenguin",
    name: "BlackPenguin",
    level: 6,
    levelLabel: LEVEL_LABELS[6],
    healthScore: 74,
    momentum: "steady",
    survivalLabel: "Healthy",
    survivalMonthsLeft: 18,
    survivalTotalMonths: 18,
    track: "Core",
    nextMilestone: "Reach $60K MRR",
    description: "B2B cybersecurity compliance automation for SMBs.",
    kpis: [
      { label: "MRR", value: "$41K", delta: "+9%", up: true },
      { label: "ARR", value: "$492K", delta: "+11%", up: true },
      { label: "NPS", value: "67", delta: "+4", up: true },
    ],
    priorities: [
      "Deploy SOC2 module to 20 beta customers",
      "Reduce onboarding time from 14 to 7 days",
      "Sign first channel partner agreement",
    ],
    biggestRisk: "Compliance regulations shifting — product roadmap may need costly pivot.",
    nextDecision: "Expand to EU compliance market now or wait for US market saturation?",
    attentionPercent: 18,
    leveragePercent: 20,
    needsIntervention: false,
  },
  {
    id: "i9framework",
    name: "i9Framework",
    level: 6,
    levelLabel: LEVEL_LABELS[6],
    healthScore: 79,
    momentum: "steady",
    survivalLabel: "Healthy",
    survivalMonthsLeft: 18,
    survivalTotalMonths: 18,
    track: "Core",
    nextMilestone: "Launch v3.0 framework release",
    description: "Open-core developer framework for building scalable microservices.",
    kpis: [
      { label: "MRR", value: "$35K", delta: "+14%", up: true },
      { label: "GitHub Stars", value: "8.4K", delta: "+620", up: true },
      { label: "Paid Seats", value: "280", delta: "+31", up: true },
    ],
    priorities: [
      "Ship plugin marketplace MVP",
      "Publish 3 enterprise case studies",
      "Hire senior developer advocate",
    ],
    biggestRisk: "Major cloud vendor announced competing native tooling — community sentiment shifting.",
    nextDecision: "Open-source the premium tier to accelerate adoption vs. protect revenue moat?",
    attentionPercent: 15,
    leveragePercent: 18,
    needsIntervention: false,
  },
  {
    id: "leadrx10",
    name: "LeadRx10",
    level: 2,
    levelLabel: LEVEL_LABELS[2],
    healthScore: 61,
    momentum: "accelerating",
    survivalLabel: "11 mo left",
    survivalMonthsLeft: 11,
    survivalTotalMonths: 18,
    track: "Growth",
    nextMilestone: "10 paying pilot customers",
    description: "AI lead qualification and routing engine for B2B sales teams.",
    kpis: [
      { label: "Pilot Users", value: "7", delta: "+3", up: true },
      { label: "Activation", value: "71%", delta: "+12%", up: true },
      { label: "Avg. Deal", value: "$2.4K", delta: "+$400", up: true },
    ],
    priorities: [
      "Convert 3 pilots to paid contracts",
      "Build CRM integration (HubSpot + Salesforce)",
      "Validate ICP with 5 more discovery calls",
    ],
    biggestRisk: "Sales cycle longer than expected — pilots not converting fast enough before runway ends.",
    nextDecision: "Narrow ICP to fintech vertical only, or maintain broad B2B positioning?",
    attentionPercent: 12,
    leveragePercent: 8,
    needsIntervention: false,
  },
  {
    id: "vitality",
    name: "Vitality",
    level: 3,
    levelLabel: LEVEL_LABELS[3],
    healthScore: 38,
    momentum: "slowing",
    survivalLabel: "5 mo left — at risk",
    survivalMonthsLeft: 5,
    survivalTotalMonths: 18,
    track: "Incubation",
    nextMilestone: "Prove retention > 40% at 30 days",
    description: "Personalized longevity coaching app combining biomarkers and behavioral science.",
    kpis: [
      { label: "DAU", value: "340", delta: "-18%", up: false },
      { label: "D30 Retention", value: "24%", delta: "-6%", up: false },
      { label: "Revenue", value: "$0", delta: "—", up: false },
    ],
    priorities: [
      "Emergency product sprint: fix core engagement loop",
      "Interview 20 churned users this week",
      "Decide pivot or kill by end of month",
    ],
    biggestRisk: "Core retention metric falling — product-engagement hypothesis may be fundamentally wrong.",
    nextDecision: "Pivot to B2B corporate wellness or shut down and return slot to Ideation Vault?",
    attentionPercent: 8,
    leveragePercent: 4,
    needsIntervention: true,
  },
  {
    id: "miurale",
    name: "Miurale",
    level: 3,
    levelLabel: LEVEL_LABELS[3],
    healthScore: 52,
    momentum: "steady",
    survivalLabel: "9 mo left",
    survivalMonthsLeft: 9,
    survivalTotalMonths: 18,
    track: "Incubation",
    nextMilestone: "Launch paid tier, 50 subscribers",
    description: "Creative collaboration platform for indie game studios and digital artists.",
    kpis: [
      { label: "Free Users", value: "1.2K", delta: "+8%", up: true },
      { label: "Paid Conv.", value: "3.1%", delta: "+0.4%", up: true },
      { label: "ARPU", value: "$18", delta: "+$2", up: true },
    ],
    priorities: [
      "Launch Pro tier with advanced version control",
      "Partner with 2 indie game jams for distribution",
      "Get to 50 paying users before month end",
    ],
    biggestRisk: "Free tier usage growing but paid conversion stubbornly low — value prop unclear at paywall.",
    nextDecision: "Add team features to boost paid conversion, or double down on solo creator tools?",
    attentionPercent: 7,
    leveragePercent: 6,
    needsIntervention: false,
  },
  {
    id: "lacentral",
    name: "LaCentral",
    level: 3,
    levelLabel: LEVEL_LABELS[3],
    healthScore: 47,
    momentum: "slowing",
    survivalLabel: "7 mo left",
    survivalMonthsLeft: 7,
    survivalTotalMonths: 18,
    track: "Incubation",
    nextMilestone: "Establish supply chain in 2 cities",
    description: "Last-mile logistics marketplace for Latin American independent retailers.",
    kpis: [
      { label: "GMV", value: "$28K", delta: "-4%", up: false },
      { label: "Carriers", value: "34", delta: "+2", up: true },
      { label: "On-time %", value: "76%", delta: "-3%", up: false },
    ],
    priorities: [
      "Fix on-time delivery — root cause analysis this week",
      "Expand to Guadalajara market",
      "Secure $150K bridge financing",
    ],
    biggestRisk: "GMV declining and delivery reliability dropping — could trigger carrier churn cascade.",
    nextDecision: "Double headcount in operations now, or automate dispatch algorithm first?",
    attentionPercent: 9,
    leveragePercent: 5,
    needsIntervention: true,
  },
  {
    id: "ahorroenergy",
    name: "AhorroEnergy",
    level: 3,
    levelLabel: LEVEL_LABELS[3],
    healthScore: 55,
    momentum: "accelerating",
    survivalLabel: "10 mo left",
    survivalMonthsLeft: 10,
    survivalTotalMonths: 18,
    track: "Incubation",
    nextMilestone: "Close first enterprise energy contract",
    description: "Energy optimization SaaS for industrial SMBs in Mexico and Colombia.",
    kpis: [
      { label: "Pilots", value: "6", delta: "+2", up: true },
      { label: "Avg Savings", value: "23%", delta: "+4%", up: true },
      { label: "Pipeline", value: "$180K", delta: "+40K", up: true },
    ],
    priorities: [
      "Convert 2 pilots to paid annual contracts",
      "Get ISO 50001 certification for enterprise credibility",
      "Hire local sales rep in Monterrey",
    ],
    biggestRisk: "Enterprise procurement cycles 6+ months — could exhaust runway before first revenue.",
    nextDecision: "Target SMB market for faster revenue, or stay enterprise for larger contract values?",
    attentionPercent: 5,
    leveragePercent: 4,
    needsIntervention: false,
  },
  {
    id: "edupod",
    name: "EduPod",
    level: 3,
    levelLabel: LEVEL_LABELS[3],
    healthScore: 44,
    momentum: "steady",
    survivalLabel: "8 mo left",
    survivalMonthsLeft: 8,
    survivalTotalMonths: 18,
    track: "Incubation",
    nextMilestone: "100 active students, 3 partner schools",
    description: "Micro-credentialing platform for vocational skills in emerging markets.",
    kpis: [
      { label: "Students", value: "67", delta: "+11", up: true },
      { label: "Completion", value: "58%", delta: "+5%", up: true },
      { label: "Partner Schools", value: "1", delta: "+0", up: false },
    ],
    priorities: [
      "Sign 2 more school partnerships",
      "Launch employer verification feature",
      "Prove employer hiring from platform (1 case study)",
    ],
    biggestRisk: "Single school partnership creates single point of failure — over-reliant on one relationship.",
    nextDecision: "Focus on employer side to prove hiring demand, or grow student supply first?",
    attentionPercent: 4,
    leveragePercent: 3,
    needsIntervention: false,
  },
];

export const founderFocus = {
  ventureId: "vitality",
  ventureName: "Vitality",
  mostImpactfulKPI: "D30 Retention (currently 24% — needs 40% to survive)",
  priorities: [
    "Emergency product sprint: fix core engagement loop",
    "Interview 20 churned users this week",
    "Decide pivot or kill by end of month",
  ],
  biggestRisk: "Core retention metric falling — product-engagement hypothesis may be fundamentally wrong.",
  nextDecision: "Pivot to B2B corporate wellness or shut down and return slot to Ideation Vault?",
};

export const ideationVaultItems = [
  { id: "v1", name: "CarbonLedger", description: "Real-time carbon accounting for supply chains", score: 87 },
  { id: "v2", name: "NomadStack", description: "Banking and compliance for remote-first teams", score: 81 },
  { id: "v3", name: "MedRoute", description: "AI triage assistant for telemedicine platforms", score: 74 },
  { id: "v4", name: "FarmLink", description: "Direct-to-consumer marketplace for regenerative farms", score: 68 },
  { id: "v5", name: "Tokenova", description: "No-code loyalty program builder using blockchain", score: 62 },
];
