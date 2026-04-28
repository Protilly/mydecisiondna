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
