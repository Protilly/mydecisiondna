export const progressItems = [
  {
    label: "Profile uploaded",
    complete: true,
    description: "Insights Discovery profile received",
  },
  {
    label: "Intake completed",
    complete: true,
    description: "Leader context captured",
  },
  {
    label: "Review approved",
    complete: false,
    description: "Awaiting leader approval",
  },
  {
    label: "Team dashboard published",
    complete: false,
    description: "Not visible to team yet",
  },
];

export const progressSteps = progressItems;

export const homeActions = [
  {
    title: "Upload a profile",
    description: "Add an Insights Discovery profile to begin extracting leader patterns.",
    href: "/profile-upload",
    eyebrow: "Step 01",
  },
  {
    title: "Start intake",
    description: "Capture live context, current team dynamics, and operating priorities.",
    href: "/intake-questionnaire",
    eyebrow: "Step 02",
  },
  {
    title: "Review insights",
    description: "Approve what becomes team-facing before anything is published.",
    href: "/leader-review",
    eyebrow: "Step 03",
  },
];

export const placeholderSummaries: Record<string, string> = {
  "/profile-upload":
    "A guided upload experience will help leaders provide an Insights Discovery profile and confirm source details.",
  "/intake-questionnaire":
    "The intake flow will capture live context such as team goals, collaboration tensions, and decision rhythms.",
  "/leader-review":
    "Leaders will review extracted insights, edit sensitive language, and approve what can be shared.",
  "/team-dashboard":
    "The team-facing dashboard will translate approved insights into clear working agreements and leadership context.",
  "/team-operating-system":
    "The operating system will centralize team norms, meeting cadences, decision principles, and communication preferences.",
  "/ai-insights":
    "AI-generated observations will surface patterns, prompts, and recommendations from approved leader context.",
  "/settings":
    "Settings will hold workspace preferences, theme controls, and future account configuration.",
};

export type TeamDashboardCard = {
  id: string;
  category: string;
  headline: string;
  summary: string;
  doThis: string;
  avoidThis: string;
  escalateWhen: string;
  examplePhrasing: string;
  approved: boolean;
};

export const approvedTeamDashboard = {
  leader: {
    name: "Maya Chen",
    role: "VP Product, Platform Experience",
    approvalNote: "All content on this dashboard has been approved by Maya Chen for team use.",
    approvedAt: "Apr 28, 2026",
    priorities: [
      "Protect customer trust while accelerating platform decisions.",
      "Turn ambiguous product signals into clear ownership and next steps.",
      "Raise decision quality through evidence, reversibility, and crisp trade-offs.",
    ],
  },
  cards: [
    {
      id: "leadership-intent",
      category: "My leadership intent",
      headline: "Create clarity without centralizing every decision.",
      summary:
        "Maya wants the team to move quickly when the decision is reversible and the customer risk is understood.",
      doThis: "State the decision, owner, customer impact, and what would change your mind.",
      avoidThis: "Waiting for approval on low-risk choices that the team can own.",
      escalateWhen: "The call could affect customer trust, legal exposure, or platform durability.",
      examplePhrasing:
        "We recommend option B because it preserves customer trust and is reversible within one sprint.",
      approved: true,
    },
    {
      id: "optimizing-for",
      category: "What I'm optimizing for",
      headline: "Customer evidence, strategic focus, and durable pace.",
      summary:
        "Progress is strongest when updates connect work to customer learning and meaningful movement.",
      doThis: "Lead with the customer signal, the strategic implication, and the next decision needed.",
      avoidThis: "Reporting activity volume without showing what changed or what was learned.",
      escalateWhen: "Momentum is masking unclear customer value or an unresolved strategic trade-off.",
      examplePhrasing:
        "The latest customer evidence suggests we should narrow scope and protect the onboarding path.",
      approved: true,
    },
    {
      id: "briefing",
      category: "Best way to brief me",
      headline: "Bring the recommendation and the trade-offs.",
      summary:
        "Maya can make faster, better calls when options, reversibility, and implications are visible.",
      doThis: "Open with your recommendation, then show two alternatives and the trade-offs.",
      avoidThis: "Starting with a long background narrative before naming the decision.",
      escalateWhen: "You need a decision that changes scope, sequencing, budget, or cross-team commitments.",
      examplePhrasing:
        "My recommendation is to pause X, ship Y, and revisit X after we validate the adoption signal.",
      approved: true,
    },
    {
      id: "decisions",
      category: "How I make decisions",
      headline: "Evidence first, then judgment at the point of commitment.",
      summary:
        "Maya values clear options and will move decisively once the consequences are understood.",
      doThis: "Separate known facts, assumptions, risk, and the decision deadline.",
      avoidThis: "Treating every unknown as a blocker when a reversible step is available.",
      escalateWhen: "Waiting will close a meaningful opportunity or increase customer risk.",
      examplePhrasing:
        "Here is what we know, what we assume, and the reversible step we can take today.",
      approved: true,
    },
    {
      id: "escalation",
      category: "When to escalate",
      headline: "Escalate early when risk is irreversible or trust-bearing.",
      summary:
        "The team should move independently on reversible decisions and escalate clear boundary risks.",
      doThis: "Escalate with impact, options considered, recommendation, and consequence of waiting.",
      avoidThis: "Escalating vague anxiety without a decision frame or proposed path.",
      escalateWhen: "Customer trust, legal exposure, executive commitments, or architecture durability are at stake.",
      examplePhrasing:
        "This could affect customer trust; here are the two paths and the trade-off I need you to weigh.",
      approved: true,
    },
    {
      id: "challenge",
      category: "How I prefer challenge and dissent",
      headline: "Challenge early, directly, and with evidence.",
      summary:
        "Maya wants dissent to improve the decision before the team is locked into execution.",
      doThis: "Name the concern plainly, explain the evidence, and offer a constructive alternative.",
      avoidThis: "Holding back until after alignment or framing dissent as a personal objection.",
      escalateWhen: "The team is converging on a path that evidence suggests is meaningfully risky.",
      examplePhrasing:
        "I see the intent, and I think the adoption data points to a different sequencing choice.",
      approved: true,
    },
    {
      id: "owners",
      category: "What I count on from owners",
      headline: "Own the outcome, the narrative, and the follow-through.",
      summary:
        "Maya expects owners to make progress visible and keep decisions findable for future teammates.",
      doThis: "Document decisions, clarify next owners, and surface risks while they are still actionable.",
      avoidThis: "Letting ownership blur across functions or relying on meeting memory.",
      escalateWhen: "Accountability is split, blocked, or no longer matched to the decision's risk.",
      examplePhrasing:
        "I own this outcome; the decision is logged, and the next risk check is Friday.",
      approved: true,
    },
    {
      id: "energizes",
      category: "What energizes me",
      headline: "Momentum grounded in customer learning.",
      summary:
        "Maya brings high energy when teams turn ambiguity into a focused story and visible progress.",
      doThis: "Share customer evidence, shipped learning, and the clearer next move.",
      avoidThis: "Celebrating busyness without showing customer or strategic movement.",
      escalateWhen: "The work has momentum but the team cannot explain what it is learning.",
      examplePhrasing:
        "We learned this from customers, shipped this adjustment, and now the next question is clear.",
      approved: true,
    },
    {
      id: "derailers",
      category: "What can derail me",
      headline: "Missing context at speed creates avoidable friction.",
      summary:
        "When pace rises, Maya benefits from concise context and visible decision logic.",
      doThis: "Provide the operating context, constraints, and why this matters now.",
      avoidThis: "Assuming the logic is obvious or burying key context across threads.",
      escalateWhen: "Speed is causing teammates to guess, duplicate work, or misread intent.",
      examplePhrasing:
        "The missing context is this constraint; here is how it changes the decision.",
      approved: true,
    },
    {
      id: "balance-style",
      category: "How the team can balance my style",
      headline: "Pair pace and optimism with explicit decision hygiene.",
      summary:
        "The team can strengthen Maya's style by making risks, owners, and assumptions easy to see.",
      doThis: "Use decision logs, pre-reads, and clear risk language to keep fast work aligned.",
      avoidThis: "Letting positive momentum skip dissent, documentation, or ownership clarity.",
      escalateWhen: "The team is moving fast but alignment depends on unstated assumptions.",
      examplePhrasing:
        "To balance speed, I documented the assumptions and highlighted the risk we should revisit.",
      approved: true,
    },
  ] satisfies TeamDashboardCard[],
};

export type DecisionLane = {
  lane: string;
  teamCanDecide: string;
  leaderSignOff: string;
  checkBeforeActing: string;
};

export type EscalationThreshold = {
  trigger: string;
  threshold: string;
  briefingRequirement: string;
};

export type OperatingNorm = {
  id: string;
  section: string;
  intent: string;
  teamRule: string;
  examples: string[];
  leaderSignal: string;
};

export type BriefingField = {
  label: string;
  include: string;
  avoid: string;
};

export const approvedTeamOperatingSystem = {
  leader: approvedTeamDashboard.leader,
  summary:
    "Execution rules for Maya's team: move independently where risk is reversible, make trade-offs visible, and escalate trust-bearing decisions early.",
  reviewCadence: "Review norms every Friday after customer signal review.",
  decisionLanes: [
    {
      lane: "Independent team decision",
      teamCanDecide:
        "Reversible product experiments, sprint-level sequencing, customer discovery plans, and implementation details inside an agreed goal.",
      leaderSignOff:
        "Not required when the owner is clear, customer risk is low, and the decision can be reversed within one sprint.",
      checkBeforeActing:
        "Confirm owner, decision log entry, customer impact, rollback path, and who needs to be informed.",
    },
    {
      lane: "Leader sign-off required",
      teamCanDecide:
        "Prepare the recommendation, options, and trade-off framing before asking Maya to decide.",
      leaderSignOff:
        "Required for changes to strategic scope, executive commitments, budget, launch posture, customer trust, or cross-team resourcing.",
      checkBeforeActing:
        "Bring evidence, two credible options, downside risk, consequence of waiting, and the decision deadline.",
    },
    {
      lane: "Pause and risk-check",
      teamCanDecide:
        "Run a fast pre-mortem and propose a safer next step before continuing execution.",
      leaderSignOff:
        "Required if the risk could be irreversible, public, legally sensitive, or damaging to platform durability.",
      checkBeforeActing:
        "Check assumptions, affected teams, customer messaging, data exposure, operational readiness, and fallback owner.",
    },
  ] satisfies DecisionLane[],
  escalationThresholds: [
    {
      trigger: "Customer trust or data exposure",
      threshold: "Escalate before action if a customer could lose confidence, access, data clarity, or continuity.",
      briefingRequirement:
        "State the customer impact, exposure window, mitigation options, and recommended path.",
    },
    {
      trigger: "Direction change after alignment",
      threshold:
        "Escalate when new evidence changes scope, sequencing, launch quality, or external commitments.",
      briefingRequirement:
        "Show what changed, why the previous plan no longer fits, and who must be re-aligned.",
    },
    {
      trigger: "Ownership split or blocked",
      threshold:
        "Escalate when accountability is unclear for more than one working session or a blocker crosses functions.",
      briefingRequirement:
        "Name the owner gap, impact of delay, decisions needed, and proposed ownership model.",
    },
    {
      trigger: "Fast decision with weak follow-through",
      threshold:
        "Escalate when the team has made a call but next actions, decision record, or risk checks are missing.",
      briefingRequirement:
        "Provide the decision, expected outcome, next owners, checkpoint date, and unresolved risk.",
    },
  ] satisfies EscalationThreshold[],
  briefingFields: [
    {
      label: "Recommendation",
      include: "The specific decision you want and why now.",
      avoid: "A broad topic without a decision request.",
    },
    {
      label: "Evidence",
      include: "Customer signal, data, constraints, and known assumptions.",
      avoid: "Activity updates that do not change the decision.",
    },
    {
      label: "Options",
      include: "Two credible alternatives with trade-offs and reversibility.",
      avoid: "Only presenting the preferred path.",
    },
    {
      label: "Risk and follow-through",
      include: "What could break, rollback path, owner, and next checkpoint.",
      avoid: "Leaving implementation details to meeting memory.",
    },
  ] satisfies BriefingField[],
  norms: [
    {
      id: "decision-rules",
      section: "Decision rules",
      intent: "Protect speed without centralizing every call.",
      teamRule:
        "Owners decide independently when the decision is reversible, inside current priorities, and backed by visible customer or operational evidence.",
      examples: [
        "Run a low-risk onboarding experiment without sign-off.",
        "Choose implementation detail trade-offs inside an agreed architecture direction.",
        "Ask Maya to decide when scope, launch posture, or customer trust changes.",
      ],
      leaderSignal: "Maya expects a decision log entry before the team treats the call as final.",
    },
    {
      id: "escalation-thresholds",
      section: "Escalation thresholds",
      intent: "Escalate boundary risks early, not every uncertainty.",
      teamRule:
        "Escalate when the decision could become irreversible, affect customer trust, change cross-team commitments, or require Maya to defend the trade-off externally.",
      examples: [
        "Escalate legal, data, budget, launch, or executive-commitment risk.",
        "Do not escalate low-risk sequencing questions the owner can reverse.",
        "Escalate with options and a recommendation, not just concern.",
      ],
      leaderSignal: "Maya responds fastest when the consequence of waiting is explicit.",
    },
    {
      id: "team-agreements",
      section: "Team agreements",
      intent: "Make self-directed behavior visible and repeatable.",
      teamRule:
        "Every workstream keeps a named owner, current decision, next checkpoint, and risk status findable in the shared operating log.",
      examples: [
        "Use one source of truth for decisions and next actions.",
        "Update impacted partners before they have to ask.",
        "Close loops in writing when meetings create new commitments.",
      ],
      leaderSignal: "Maya values calm, explicit handoffs over heroic memory.",
    },
    {
      id: "ownership-expectations",
      section: "Ownership expectations",
      intent: "Keep accountability matched to outcomes.",
      teamRule:
        "The owner carries the outcome, narrative, dependencies, and follow-through until the decision is closed or deliberately reassigned.",
      examples: [
        "Name a single accountable owner even when execution is cross-functional.",
        "Surface risks while they are still actionable.",
        "Reassign ownership explicitly when direction changes.",
      ],
      leaderSignal: "Maya should not have to infer who is driving the next move.",
    },
    {
      id: "meeting-norms",
      section: "Meeting norms",
      intent: "Use meetings to decide, unblock, or learn.",
      teamRule:
        "Meetings need a decision question, desired output, pre-read when context is complex, and a written close-out with owners.",
      examples: [
        "Cancel status-only meetings that can be handled async.",
        "Open with the decision or blocker, then context.",
        "End with owner, action, date, and decision-log update.",
      ],
      leaderSignal: "Maya will push for a recommendation before discussing background.",
    },
    {
      id: "challenge-dissent",
      section: "Challenge and dissent norms",
      intent: "Improve decisions before alignment hardens.",
      teamRule:
        "Challenge early, name the evidence, separate intent from impact, and offer a better path or test.",
      examples: [
        "Say: 'I see the intent; the adoption data points to a different sequence.'",
        "Challenge the leader in the room where the decision can still improve.",
        "After the decision, commit unless new evidence changes the risk picture.",
      ],
      leaderSignal: "Maya sees direct, evidence-based dissent as decision hygiene.",
    },
    {
      id: "risk-checks",
      section: "Risk checks",
      intent: "Prevent speed from hiding weak assumptions.",
      teamRule:
        "Before acting, check customer impact, reversibility, affected teams, data exposure, operational readiness, and the decision deadline.",
      examples: [
        "Run a five-minute pre-mortem for high-speed calls.",
        "Document the assumption most likely to be wrong.",
        "Define the signal that would make the team stop or reverse.",
      ],
      leaderSignal: "Maya wants risks framed as choices, not vague anxiety.",
    },
    {
      id: "follow-through",
      section: "Follow-through rules",
      intent: "Keep fast decisions from becoming loose commitments.",
      teamRule:
        "Every fast decision gets a written owner, action list, checkpoint, communication target, and revisit condition before the work moves on.",
      examples: [
        "Log the decision within the same day.",
        "Notify affected teams with what changed and what did not.",
        "Schedule the risk check before momentum buries the assumption.",
      ],
      leaderSignal: "Maya trusts speed when the team makes the cleanup explicit.",
    },
  ] satisfies OperatingNorm[],
  editableAgreements: [
    "When Maya changes direction, the owner restates the new decision, what changed, who is impacted, and which previous commitments are now paused.",
    "After a fast decision, the owner posts a same-day follow-through note: decision, why, next actions, owners, checkpoint, and risk to watch.",
    "Productive challenge uses this pattern: intent understood, evidence observed, risk named, alternative proposed, decision needed.",
  ],
};
