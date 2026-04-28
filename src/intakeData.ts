export type FieldType =
  | "shortText"
  | "longText"
  | "number"
  | "singleSelect"
  | "multiSelect"
  | "rankedList"
  | "slider"
  | "checklistBuilder";

export type BaseQuestion = {
  id: string;
  label: string;
  helperText?: string;
  type: FieldType;
};

export type TextQuestion = BaseQuestion & {
  type: "shortText" | "longText";
  placeholder?: string;
};

export type NumberQuestion = BaseQuestion & {
  type: "number";
  min?: number;
  max?: number;
  placeholder?: string;
};

export type SelectQuestion = BaseQuestion & {
  type: "singleSelect" | "multiSelect" | "rankedList";
  options: string[];
};

export type SliderQuestion = BaseQuestion & {
  type: "slider";
  min: number;
  max: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
};

export type ChecklistBuilderQuestion = BaseQuestion & {
  type: "checklistBuilder";
  placeholder?: string;
  suggestions?: string[];
};

export type IntakeQuestion =
  | TextQuestion
  | NumberQuestion
  | SelectQuestion
  | SliderQuestion
  | ChecklistBuilderQuestion;

export type IntakeSection = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  questions: IntakeQuestion[];
};

export type IntakeValue = string | number | string[];
export type IntakeResponses = Record<string, IntakeValue>;

export const intakeSections: IntakeSection[] = [
  {
    id: "leader-context",
    title: "Leader Context",
    eyebrow: "Section 1",
    description:
      "Capture the role context and operating altitude this Decision DNA should support.",
    questions: [
      {
        id: "leaderName",
        type: "shortText",
        label: "Leader name",
        placeholder: "Alex Morgan",
      },
      {
        id: "roleScope",
        type: "longText",
        label: "Current role and scope",
        helperText: "Include business unit, team size, and decision remit.",
        placeholder: "Chief Revenue Officer, leading sales, success, and partnerships...",
      },
      {
        id: "teamSize",
        type: "number",
        label: "Approximate team size",
        min: 0,
        placeholder: "42",
      },
      {
        id: "operatingMode",
        type: "singleSelect",
        label: "Primary operating mode",
        options: ["Scaling", "Turnaround", "Transformation", "Stabilization", "Exploration"],
      },
    ],
  },
  {
    id: "strategic-priorities",
    title: "Strategic Priorities",
    eyebrow: "Section 2",
    description:
      "Name what deserves disproportionate executive attention across near-term and annual horizons.",
    questions: [
      {
        id: "priorities90",
        type: "rankedList",
        label: "Top 3 priorities for the next 90 days",
        helperText: "Drag order is not required here; choose in priority order.",
        options: [
          "Revenue acceleration",
          "Operational discipline",
          "Customer retention",
          "Product velocity",
          "Talent density",
          "Market positioning",
        ],
      },
      {
        id: "priorities12",
        type: "rankedList",
        label: "Top 3 priorities for the next 12 months",
        options: [
          "International expansion",
          "Enterprise readiness",
          "Margin improvement",
          "Leadership bench",
          "Platform modernization",
          "Brand trust",
        ],
      },
      {
        id: "nonNegotiables",
        type: "checklistBuilder",
        label: "Non-negotiable outcomes this quarter",
        helperText: "Add the outcomes that cannot slip without explicit discussion.",
        placeholder: "Add an outcome",
        suggestions: ["Hit forecast range", "Launch priority initiative", "Reduce escalations"],
      },
    ],
  },
  {
    id: "current-goals",
    title: "Current Goals",
    eyebrow: "Section 3",
    description: "Clarify the measurable goals the profile should help the team support.",
    questions: [
      {
        id: "goalNarrative",
        type: "longText",
        label: "Most important current goal",
        placeholder: "Describe the goal and why it matters now.",
      },
      {
        id: "goalConfidence",
        type: "slider",
        label: "Confidence in goal clarity",
        helperText: "How clearly can the team describe the desired outcome?",
        min: 1,
        max: 10,
        minLabel: "Unclear",
        maxLabel: "Very clear",
      },
      {
        id: "successSignals",
        type: "multiSelect",
        label: "Signals of progress",
        options: ["Leading metrics", "Customer feedback", "Team behavior", "Financial results", "Execution cadence"],
      },
    ],
  },
  {
    id: "current-challenges",
    title: "Current Challenges",
    eyebrow: "Section 4",
    description: "Surface the constraints and frictions that should be visible in decisions.",
    questions: [
      {
        id: "teamChallenge",
        type: "longText",
        label: "Biggest team challenge",
        placeholder: "Where is the team most stuck or stretched?",
      },
      {
        id: "leadershipChallenge",
        type: "longText",
        label: "Biggest leadership challenge",
        placeholder: "What is hardest for the leader to navigate right now?",
      },
      {
        id: "challengeIntensity",
        type: "slider",
        label: "Current challenge intensity",
        min: 1,
        max: 10,
        minLabel: "Manageable",
        maxLabel: "Critical",
      },
    ],
  },
  {
    id: "risk-awareness",
    title: "Risk Awareness",
    eyebrow: "Section 5",
    description: "Define the risks and escalation boundaries the team should monitor early.",
    questions: [
      {
        id: "earlyRisks",
        type: "checklistBuilder",
        label: "Top risks to raise early",
        placeholder: "Add a risk",
        suggestions: ["Customer trust erosion", "Decision latency", "Hiring misses"],
      },
      {
        id: "escalationDecisions",
        type: "multiSelect",
        label: "Which decisions require escalation?",
        options: [
          "Budget tradeoffs",
          "Hiring exceptions",
          "Customer commitments",
          "Scope changes",
          "Strategic partnerships",
          "Brand or legal risk",
        ],
      },
      {
        id: "riskTolerance",
        type: "singleSelect",
        label: "Risk posture",
        options: ["Conservative", "Measured", "Bold with guardrails", "Experimental"],
      },
    ],
  },
  {
    id: "decision-style",
    title: "Decision Style",
    eyebrow: "Section 6",
    description: "Document how decisions should be framed, debated, and closed.",
    questions: [
      {
        id: "decisionPace",
        type: "singleSelect",
        label: "Preferred decision pace",
        options: ["Fast reversible bets", "Deliberate consensus", "Evidence-first review", "Leader decides after input"],
      },
      {
        id: "decisionCriteria",
        type: "rankedList",
        label: "Most important decision criteria",
        options: ["Customer impact", "Strategic fit", "Financial return", "Speed", "Talent implications", "Risk reduction"],
      },
      {
        id: "decisionNotes",
        type: "longText",
        label: "Decision style notes",
        placeholder: "What should others know before bringing a decision forward?",
      },
    ],
  },
  {
    id: "communication-preferences",
    title: "Communication Preferences",
    eyebrow: "Section 7",
    description: "Make briefings, dissent, and updates easier to tailor.",
    questions: [
      {
        id: "briefingFormat",
        type: "singleSelect",
        label: "Preferred briefing format",
        options: ["One-page memo", "Dashboard plus bullets", "Live discussion", "Decision brief", "Async video"],
      },
      {
        id: "dissentStyle",
        type: "singleSelect",
        label: "Preferred dissent style",
        options: [
          "Direct challenge",
          "Written counterpoint",
          "Data-led concern",
          "Private escalation first",
          "Structured red-team",
        ],
      },
      {
        id: "updateCadence",
        type: "singleSelect",
        label: "Update cadence",
        options: ["Daily signal", "Weekly summary", "Milestone-based", "Exceptions only"],
      },
    ],
  },
  {
    id: "delegation-autonomy",
    title: "Delegation and Autonomy",
    eyebrow: "Section 8",
    description: "Separate ownership areas from decisions that need closer alignment.",
    questions: [
      {
        id: "teamOwns",
        type: "checklistBuilder",
        label: "What the team should fully own",
        placeholder: "Add an ownership area",
        suggestions: ["Execution sequencing", "Customer follow-up", "Meeting design"],
      },
      {
        id: "autonomyLevel",
        type: "slider",
        label: "Desired team autonomy",
        min: 1,
        max: 10,
        minLabel: "Close review",
        maxLabel: "Full ownership",
      },
      {
        id: "delegationWatchouts",
        type: "longText",
        label: "Delegation watchouts",
        placeholder: "Where should the team avoid over-indexing or under-communicating?",
      },
    ],
  },
  {
    id: "team-composition",
    title: "Team Composition",
    eyebrow: "Section 9",
    description: "Describe the team context that shapes communication and decision needs.",
    questions: [
      {
        id: "teamShape",
        type: "singleSelect",
        label: "Current team shape",
        options: ["Newly formed", "Scaling quickly", "Stable and experienced", "Cross-functional matrix", "In transition"],
      },
      {
        id: "teamStrengths",
        type: "multiSelect",
        label: "Team strengths",
        options: ["Execution", "Customer empathy", "Analytical rigor", "Creativity", "Resilience", "Stakeholder management"],
      },
      {
        id: "teamGaps",
        type: "longText",
        label: "Important team gaps",
        placeholder: "What capability, clarity, or capacity gaps matter most?",
      },
    ],
  },
  {
    id: "motivation-work-conditions",
    title: "Motivation and Work Conditions",
    eyebrow: "Section 10",
    description: "Identify the conditions that help the leader and team do their best work.",
    questions: [
      {
        id: "bestConditions",
        type: "longText",
        label: "Conditions that help the leader do their best work",
        placeholder: "Consider meeting design, information flow, energy, and focus time.",
      },
      {
        id: "motivationDrivers",
        type: "multiSelect",
        label: "Motivation drivers",
        options: ["Clear impact", "Ambitious goals", "Trust and autonomy", "Recognition", "Learning", "Healthy debate"],
      },
      {
        id: "energyLevel",
        type: "slider",
        label: "Current energy sustainability",
        min: 1,
        max: 10,
        minLabel: "Depleted",
        maxLabel: "Sustainable",
      },
    ],
  },
  {
    id: "growth-edge",
    title: "Growth Edge",
    eyebrow: "Section 11",
    description: "Name the leadership behavior or practice this profile should reinforce.",
    questions: [
      {
        id: "behaviorToStrengthen",
        type: "shortText",
        label: "One leadership behavior to strengthen",
        placeholder: "Example: make tradeoffs explicit earlier",
      },
      {
        id: "growthSupport",
        type: "multiSelect",
        label: "Helpful support",
        options: ["Feedback loops", "Decision templates", "Coaching prompts", "Peer input", "Pre-mortems", "Post-decision reviews"],
      },
      {
        id: "growthNotes",
        type: "longText",
        label: "Growth edge notes",
        placeholder: "What makes this behavior important now?",
      },
    ],
  },
  {
    id: "consent-privacy",
    title: "Consent and Privacy",
    eyebrow: "Section 12",
    description: "Choose what context is safe to share when generating team-facing materials.",
    questions: [
      {
        id: "safeCategories",
        type: "multiSelect",
        label: "What categories are safe to share?",
        helperText: "These choices guide what can appear in Leader Review or a team-facing draft.",
        options: [
          "Priorities",
          "Goals",
          "Decision preferences",
          "Communication preferences",
          "Delegation boundaries",
          "Team context",
          "Growth edge",
        ],
      },
      {
        id: "privateContext",
        type: "longText",
        label: "Context to keep private",
        placeholder: "Add any sensitive details that should remain internal.",
      },
      {
        id: "consent",
        type: "singleSelect",
        label: "Consent to use these responses for local draft generation",
        options: ["Yes, use locally for draft generation", "Not yet, keep as draft only"],
      },
    ],
  },
];

export const REVIEW_STEP_ID = "review";
