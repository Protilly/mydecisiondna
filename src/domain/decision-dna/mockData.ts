import type {
  AISuggestion,
  ConsentDecision,
  DashboardVersion,
  ExtractedInsight,
  IntakeResponse,
  Leader,
  PublishedCard,
  SourceSection,
  TeamNorm,
  UploadedProfile,
} from "./types";

const now = "2026-04-28T18:00:00.000Z";

export const sampleSourceSections: SourceSection[] = [
  {
    id: "section-leader-context",
    profileId: "profile-maya-interview",
    title: "Leadership context",
    category: "leader-context",
    sourceType: "interview-notes",
    order: 1,
    text:
      "I joined after the platform team had already absorbed three roadmaps. The team needs clarity on what I will decide, what I expect them to decide, and where I want us to slow down.",
    extractedAt: "2026-04-10T16:24:00.000Z",
  },
  {
    id: "section-priorities",
    profileId: "profile-maya-interview",
    title: "Current priorities",
    category: "priorities",
    sourceType: "interview-notes",
    order: 2,
    text:
      "The most important thing this quarter is restoring confidence in the platform roadmap while protecting the data reliability work that customers already depend on.",
    extractedAt: "2026-04-10T16:24:00.000Z",
  },
  {
    id: "section-decision-style",
    profileId: "profile-maya-interview",
    title: "Decision style",
    category: "decision-style",
    sourceType: "interview-notes",
    order: 3,
    text:
      "For reversible decisions, I prefer a clear owner and a 70 percent confidence threshold. For one-way-door choices, I want the tradeoffs, customer evidence, and dissent in writing before we commit.",
    extractedAt: "2026-04-10T16:24:00.000Z",
  },
  {
    id: "section-communication",
    profileId: "profile-maya-interview",
    title: "Communication preferences",
    category: "communication-preferences",
    sourceType: "interview-notes",
    order: 4,
    text:
      "I process best with concise written context before live discussion. In meetings, I value direct disagreement when it is grounded in customer impact or execution risk.",
    extractedAt: "2026-04-10T16:24:00.000Z",
  },
  {
    id: "section-delegation",
    profileId: "profile-maya-onboarding",
    title: "Delegation and ownership",
    category: "delegation",
    sourceType: "bio",
    order: 5,
    text:
      "Directors should make staffing and sprint-scope calls without waiting for me. Escalate when the decision changes a customer commitment, a hiring plan, or a cross-functional dependency.",
    extractedAt: "2026-04-12T09:07:00.000Z",
  },
  {
    id: "section-growth-edge",
    profileId: "profile-maya-interview",
    title: "Growth edge",
    category: "growth-edge",
    sourceType: "interview-notes",
    order: 6,
    text:
      "My growth edge is leaving more space before I synthesize. When I summarize too quickly, quieter team members can treat it as the decision instead of an invitation to challenge.",
    extractedAt: "2026-04-10T16:24:00.000Z",
  },
  {
    id: "section-privacy",
    profileId: "profile-maya-interview",
    title: "Consent and privacy",
    category: "consent-and-privacy",
    sourceType: "interview-notes",
    order: 7,
    text:
      "I am comfortable sharing working norms and decision preferences. I do not want personal family constraints, health context, or private stakeholder concerns exposed to the team dashboard.",
    extractedAt: "2026-04-10T16:24:00.000Z",
  },
];

export const sampleLeader: Leader = {
  id: "leader-maya-chen",
  fullName: "Maya Chen",
  preferredName: "Maya",
  title: "VP of Product",
  organization: "Northstar Analytics",
  department: "Product, Design, and Data Platform",
  location: "San Francisco, CA",
  timezone: "America/Los_Angeles",
  email: "maya.chen@example.com",
  avatarUrl: "/mock/avatars/maya-chen.jpg",
  teamName: "Northstar Platform Group",
  directReportsCount: 9,
  profileId: "profile-maya-interview",
  activeDashboardVersionId: "dashboard-maya-v2",
  createdAt: "2026-03-18T15:20:00.000Z",
  updatedAt: now,
};

export const sampleUploadedProfiles: UploadedProfile[] = [
  {
    id: "profile-maya-interview",
    leaderId: sampleLeader.id,
    fileName: "maya-leadership-reflection-transcript.pdf",
    sourceType: "interview-notes",
    status: "processed",
    uploadedAt: "2026-04-10T16:12:00.000Z",
    processedAt: "2026-04-10T16:24:00.000Z",
    wordCount: 3180,
    language: "en",
    summary:
      "A reflective leadership interview covering Maya's operating context, decision style, communication needs, delegation guardrails, growth edge, and privacy boundaries.",
    sections: sampleSourceSections.filter(
      (section) => section.profileId === "profile-maya-interview",
    ),
  },
  {
    id: "profile-maya-onboarding",
    leaderId: sampleLeader.id,
    fileName: "exec-team-onboarding-notes.md",
    sourceType: "bio",
    status: "processed",
    uploadedAt: "2026-04-12T09:05:00.000Z",
    processedAt: "2026-04-12T09:07:00.000Z",
    wordCount: 940,
    language: "en",
    summary:
      "Executive onboarding notes describing the platform team's mandate, decision ownership model, and collaboration norms Maya wants to make explicit.",
    sections: sampleSourceSections.filter(
      (section) => section.profileId === "profile-maya-onboarding",
    ),
  },
];

export const sampleIntakeResponse: IntakeResponse = {
  id: "intake-maya-q2-2026",
  leaderId: sampleLeader.id,
  submittedAt: "2026-04-14T20:30:00.000Z",
  updatedAt: "2026-04-20T18:10:00.000Z",
  completionPercent: 100,
  sections: {
    leaderContext: {
      id: "intake-section-context",
      title: "Leader context",
      prompts: [
        "What is your current leadership mandate?",
        "Where does your team need the most clarity?",
      ],
      answer: {
        roleScope:
          "Leads product strategy, design direction, and data platform priorities across three directors and six principal ICs.",
        operatingContext:
          "The organization is consolidating overlapping platform roadmaps after a period of rapid acquisition-driven growth.",
        currentMandate:
          "Create a sharper decision system so teams can move faster without surprising customers or partner functions.",
      },
      completedAt: "2026-04-14T19:06:00.000Z",
    },
    priorities: {
      id: "intake-section-priorities",
      title: "Priorities",
      prompts: ["What matters most right now?", "How should tradeoffs be made?"],
      answer: {
        currentPriorities: [
          "Stabilize the enterprise analytics roadmap",
          "Protect data reliability commitments",
          "Reduce decision churn between product and engineering leads",
        ],
        tradeoffGuidance:
          "Prefer customer trust and reliability over net-new roadmap scope when capacity is constrained.",
      },
      completedAt: "2026-04-14T19:12:00.000Z",
    },
    goals: {
      id: "intake-section-goals",
      title: "Goals",
      prompts: ["What outcomes define success?", "Which goals are longer range?"],
      answer: {
        shortTermGoals: [
          "Publish a clear Q2 platform decision map",
          "Cut unresolved cross-functional escalations by half",
        ],
        longTermGoals: [
          "Build a product operating model that scales without adding more approval layers",
          "Develop directors who can represent platform strategy independently",
        ],
        successMeasures: [
          "Decision owners are explicit before work begins",
          "Customer-impacting tradeoffs are documented within one business day",
          "Directors report higher autonomy in monthly pulse checks",
        ],
      },
      completedAt: "2026-04-14T19:18:00.000Z",
    },
    challenges: {
      id: "intake-section-challenges",
      title: "Challenges",
      prompts: ["What is getting in the way?", "Where do you need support?"],
      answer: {
        currentChallenges: [
          "Too many decisions come back to Maya after partial alignment",
          "Teams use different definitions of launch readiness",
          "Stakeholder urgency can override planned discovery work",
        ],
        supportNeeded: [
          "More structured dissent before executive reviews",
          "A visible escalation path for customer commitment changes",
        ],
      },
      completedAt: "2026-04-14T19:25:00.000Z",
    },
    risks: {
      id: "intake-section-risks",
      title: "Risks",
      prompts: ["What risks should the team watch?", "What are early warning signs?"],
      answer: {
        knownRisks: [
          "Optimizing for speed could hide unresolved customer trust issues",
          "Senior ICs may wait for Maya's synthesis instead of naming disagreement",
        ],
        earlyWarningSignals: [
          "Decisions are revisited in three or more forums",
          "Customer exceptions increase without a named owner",
          "Meeting notes contain options but no decision owner",
        ],
        mitigationPreferences: [
          "Name the risk plainly and attach a decision owner",
          "Escalate with customer evidence and the smallest reversible next step",
        ],
      },
      completedAt: "2026-04-14T19:31:00.000Z",
    },
    decisionStyle: {
      id: "intake-section-decision-style",
      title: "Decision style",
      prompts: ["How do you prefer to make decisions?", "When should items escalate?"],
      answer: {
        defaultStyle:
          "Delegated and evidence-led for reversible calls; slower and writing-first for one-way-door decisions.",
        decisionInputs: [
          "Customer impact",
          "Reliability risk",
          "Cross-functional dependency changes",
          "Dissent from responsible owners",
        ],
        escalationGuidance:
          "Escalate when a decision changes a customer commitment, alters hiring plans, or creates material dependency risk.",
      },
      completedAt: "2026-04-14T19:39:00.000Z",
    },
    communicationPreferences: {
      id: "intake-section-communication",
      title: "Communication preferences",
      prompts: ["How should people communicate with you?", "How do you prefer feedback?"],
      answer: {
        preferredChannels: [
          "Written pre-reads for complex decisions",
          "Slack for quick unblockers",
          "Live discussion for tradeoffs with real dissent",
        ],
        meetingPreferences:
          "Send context at least a day ahead when a decision is expected. Use meeting time to test assumptions rather than read status.",
        feedbackPreferences:
          "Direct, specific feedback works best when connected to customer outcomes or team operating health.",
      },
      completedAt: "2026-04-14T19:44:00.000Z",
    },
    delegation: {
      id: "intake-section-delegation",
      title: "Delegation",
      prompts: ["What should others own?", "What cadence helps you stay aligned?"],
      answer: {
        delegationPrinciples: [
          "Decision owners should be named before analysis starts",
          "Directors own staffing and sprint-scope decisions",
          "Escalations should include the recommendation, not just the problem",
        ],
        autonomyLevel:
          "High autonomy inside agreed product guardrails; tighter review for customer commitments and public roadmap changes.",
        checkInCadence:
          "Weekly written decision digest plus targeted live reviews for one-way-door calls.",
      },
      completedAt: "2026-04-14T19:50:00.000Z",
    },
    teamComposition: {
      id: "intake-section-team-composition",
      title: "Team composition",
      prompts: ["Who is on the team?", "How does the team collaborate?"],
      answer: {
        teamShape:
          "Three product directors, two design leads, four principal product/data ICs, and close engineering partnership through platform leads.",
        keyRoles: [
          "Director of Enterprise Analytics",
          "Director of Data Reliability",
          "Head of Product Design",
          "Principal Product Manager for Platform",
        ],
        collaborationPatterns: [
          "Weekly platform leadership sync",
          "Monthly roadmap risk review",
          "Decision memos for customer-impacting tradeoffs",
        ],
      },
      completedAt: "2026-04-14T19:56:00.000Z",
    },
    motivation: {
      id: "intake-section-motivation",
      title: "Motivation",
      prompts: ["What energizes you?", "What drains you?"],
      answer: {
        motivators: [
          "Helping teams turn ambiguous customer pain into clear product choices",
          "Seeing directors make strong calls without waiting for permission",
          "Building durable systems that reduce coordination tax",
        ],
        demotivators: [
          "Performative alignment that avoids the real tradeoff",
          "Repeated escalation without new information",
          "Surprises that could have been surfaced earlier",
        ],
      },
      completedAt: "2026-04-14T20:02:00.000Z",
    },
    growthEdge: {
      id: "intake-section-growth-edge",
      title: "Growth edge",
      prompts: ["Where are you growing?", "How can the team support that growth?"],
      answer: {
        currentGrowthEdges: [
          "Leaving more space before synthesizing in group discussions",
          "Inviting dissent before offering a proposed path",
        ],
        requestedAccountability:
          "If Maya summarizes too early, ask whether the group has named the strongest objection yet.",
      },
      completedAt: "2026-04-14T20:10:00.000Z",
    },
    consentAndPrivacy: {
      id: "intake-section-consent-privacy",
      title: "Consent and privacy",
      prompts: ["What may be shared?", "What should stay private?"],
      answer: {
        sharingBoundaries: [
          "Working norms and decision preferences can be shared with the team",
          "Growth edges can be shared when phrased as operating guidance",
          "Sensitive stakeholder details should be generalized",
        ],
        privateTopics: [
          "Personal family constraints",
          "Health context",
          "Named private stakeholder concerns",
        ],
        reviewPreference:
          "Maya wants to approve every team-facing card before it appears on the dashboard.",
      },
      completedAt: "2026-04-14T20:18:00.000Z",
    },
  },
};

export const sampleConsentDecisions: ConsentDecision[] = [
  {
    id: "consent-profile-analysis",
    leaderId: sampleLeader.id,
    scope: "profile-analysis",
    status: "granted",
    decidedAt: "2026-04-10T16:08:00.000Z",
    notes: "Approved analysis of uploaded interview notes and onboarding materials.",
  },
  {
    id: "consent-team-summary",
    leaderId: sampleLeader.id,
    scope: "team-facing-dashboard",
    status: "granted",
    decidedAt: "2026-04-20T17:15:00.000Z",
    notes: "Team-facing cards require leader approval before publication.",
  },
  {
    id: "consent-manager-dashboard",
    leaderId: sampleLeader.id,
    scope: "manager-dashboard",
    status: "pending",
    notes: "Maya has not decided whether manager-level rollups should include her dashboard.",
  },
  {
    id: "consent-product-improvement",
    leaderId: sampleLeader.id,
    scope: "product-improvement",
    status: "denied",
    decidedAt: "2026-04-10T16:09:00.000Z",
  },
];

const sectionById = Object.fromEntries(
  sampleSourceSections.map((section) => [section.id, section]),
) as Record<string, SourceSection>;

export const sampleExtractedInsights: ExtractedInsight[] = [
  {
    id: "insight-decision-thresholds",
    title: "Uses decision reversibility to set pace",
    category: "decision-style",
    sourceSection: sectionById["section-decision-style"],
    sourceText:
      "For reversible decisions, I prefer a clear owner and a 70 percent confidence threshold. For one-way-door choices, I want the tradeoffs, customer evidence, and dissent in writing before we commit.",
    aiSummary:
      "Maya distinguishes reversible decisions from one-way-door choices and adjusts rigor accordingly.",
    teamFacingDraft:
      "For reversible decisions, Maya prefers a named owner to move at roughly 70 percent confidence. For one-way-door decisions, bring written tradeoffs, customer evidence, and dissent before asking for commitment.",
    sensitivityLevel: "low",
    confidenceScore: 0.94,
    shareStatus: "published",
    leaderAccuracyRating: "accurate",
    leaderEditedText:
      "For reversible decisions, name an owner and move at roughly 70 percent confidence. For one-way-door calls, bring written tradeoffs, customer evidence, and dissent before asking Maya to commit.",
    publishDecision: "approve",
    createdAt: "2026-04-10T16:32:00.000Z",
    updatedAt: "2026-04-20T17:02:00.000Z",
  },
  {
    id: "insight-written-context",
    title: "Prefers concise written context before discussion",
    category: "communication-preferences",
    sourceSection: sectionById["section-communication"],
    sourceText:
      "I process best with concise written context before live discussion. In meetings, I value direct disagreement when it is grounded in customer impact or execution risk.",
    aiSummary:
      "Maya wants written context up front and uses live meetings for disagreement and tradeoff testing.",
    teamFacingDraft:
      "Send concise written context before decision meetings. Use live time to test assumptions, name disagreement, and connect concerns to customer impact or execution risk.",
    sensitivityLevel: "low",
    confidenceScore: 0.91,
    shareStatus: "published",
    leaderAccuracyRating: "mostly-accurate",
    leaderEditedText:
      "Send concise written context before decision meetings. Maya values direct disagreement when it is tied to customer impact, reliability, or execution risk.",
    publishDecision: "approve",
    createdAt: "2026-04-10T16:34:00.000Z",
    updatedAt: "2026-04-20T17:05:00.000Z",
  },
  {
    id: "insight-delegation-guardrails",
    title: "Delegates within clear escalation guardrails",
    category: "delegation",
    sourceSection: sectionById["section-delegation"],
    sourceText:
      "Directors should make staffing and sprint-scope calls without waiting for me. Escalate when the decision changes a customer commitment, a hiring plan, or a cross-functional dependency.",
    aiSummary:
      "Maya expects directors to own most operational decisions and escalate only when commitments or dependencies materially change.",
    teamFacingDraft:
      "Directors should own staffing and sprint-scope calls. Escalate when a decision changes a customer commitment, hiring plan, or cross-functional dependency.",
    sensitivityLevel: "medium",
    confidenceScore: 0.88,
    shareStatus: "approved",
    leaderAccuracyRating: "accurate",
    publishDecision: "approve",
    createdAt: "2026-04-12T09:20:00.000Z",
    updatedAt: "2026-04-21T11:30:00.000Z",
  },
  {
    id: "insight-growth-edge-synthesis",
    title: "Can synthesize before quieter dissent emerges",
    category: "growth-edge",
    sourceSection: sectionById["section-growth-edge"],
    sourceText:
      "My growth edge is leaving more space before I synthesize. When I summarize too quickly, quieter team members can treat it as the decision instead of an invitation to challenge.",
    aiSummary:
      "Maya is working on pausing before synthesis so quieter team members have more room to contribute dissent.",
    teamFacingDraft:
      "If Maya summarizes early, it is okay to ask whether the group has named the strongest objection yet. She is actively working on leaving room for dissent before convergence.",
    sensitivityLevel: "medium",
    confidenceScore: 0.86,
    shareStatus: "proposed",
    leaderAccuracyRating: "needs-edit",
    leaderEditedText:
      "If Maya summarizes early, ask whether the group has named the strongest objection yet. She is working on leaving room for dissent before convergence.",
    publishDecision: "revise",
    createdAt: "2026-04-10T16:39:00.000Z",
    updatedAt: "2026-04-21T11:42:00.000Z",
  },
  {
    id: "insight-roadmap-priority",
    title: "Protects customer trust over new scope",
    category: "priorities",
    sourceSection: sectionById["section-priorities"],
    sourceText:
      "The most important thing this quarter is restoring confidence in the platform roadmap while protecting the data reliability work that customers already depend on.",
    aiSummary:
      "Maya's top priority is rebuilding roadmap confidence without sacrificing reliability commitments.",
    teamFacingDraft:
      "When capacity is tight, protect customer trust and data reliability before adding new roadmap scope.",
    sensitivityLevel: "low",
    confidenceScore: 0.9,
    shareStatus: "published",
    leaderAccuracyRating: "accurate",
    publishDecision: "approve",
    createdAt: "2026-04-10T16:36:00.000Z",
    updatedAt: "2026-04-20T17:07:00.000Z",
  },
  {
    id: "insight-private-boundaries",
    title: "Keeps personal constraints out of team dashboard",
    category: "consent-and-privacy",
    sourceSection: sectionById["section-privacy"],
    sourceText:
      "I am comfortable sharing working norms and decision preferences. I do not want personal family constraints, health context, or private stakeholder concerns exposed to the team dashboard.",
    aiSummary:
      "Maya consents to sharing working norms but excludes personal, health, and named stakeholder-sensitive information.",
    teamFacingDraft:
      "Maya is comfortable sharing working norms and decision preferences. Personal context and named private stakeholder concerns should not appear in team-facing materials.",
    sensitivityLevel: "restricted",
    confidenceScore: 0.97,
    shareStatus: "withheld",
    leaderAccuracyRating: "accurate",
    publishDecision: "withhold",
    createdAt: "2026-04-10T16:42:00.000Z",
    updatedAt: "2026-04-20T17:18:00.000Z",
  },
];

export const samplePublishedCards: PublishedCard[] = [
  {
    id: "card-decision-thresholds",
    leaderId: sampleLeader.id,
    sourceInsightIds: ["insight-decision-thresholds"],
    type: "decision-principle",
    title: "How Maya wants decisions to move",
    body:
      "For reversible decisions, name an owner and move at roughly 70 percent confidence. For one-way-door calls, bring written tradeoffs, customer evidence, and dissent before asking Maya to commit.",
    status: "published",
    audience: "team",
    displayOrder: 1,
    lastReviewedAt: "2026-04-22T15:30:00.000Z",
    publishedAt: "2026-04-22T16:00:00.000Z",
  },
  {
    id: "card-written-context",
    leaderId: sampleLeader.id,
    sourceInsightIds: ["insight-written-context"],
    type: "communication-guide",
    title: "Send context before the meeting",
    body:
      "Send concise written context before decision meetings. Maya values direct disagreement when it is tied to customer impact, reliability, or execution risk.",
    status: "published",
    audience: "team",
    displayOrder: 2,
    lastReviewedAt: "2026-04-22T15:35:00.000Z",
    publishedAt: "2026-04-22T16:00:00.000Z",
  },
  {
    id: "card-customer-trust",
    leaderId: sampleLeader.id,
    sourceInsightIds: ["insight-roadmap-priority"],
    type: "working-with-me",
    title: "Protect customer trust first",
    body:
      "When capacity is tight, Maya wants the team to protect customer trust and data reliability before adding new roadmap scope.",
    status: "approved",
    audience: "team",
    displayOrder: 3,
    lastReviewedAt: "2026-04-22T15:40:00.000Z",
  },
  {
    id: "card-growth-edge",
    leaderId: sampleLeader.id,
    sourceInsightIds: ["insight-growth-edge-synthesis"],
    type: "watch-out",
    title: "Leave room for dissent",
    body:
      "If Maya summarizes early, ask whether the group has named the strongest objection yet. She is working on leaving room for dissent before convergence.",
    status: "draft",
    audience: "leader",
    displayOrder: 4,
    lastReviewedAt: "2026-04-21T12:00:00.000Z",
  },
];

export const sampleTeamNorms: TeamNorm[] = [
  {
    id: "norm-written-prereads",
    leaderId: sampleLeader.id,
    title: "Decision meetings require a pre-read",
    category: "meetings",
    description:
      "If a meeting asks Maya or the platform leadership team for a decision, send the context, options, recommendation, and unresolved dissent ahead of time.",
    examples: [
      "Share a one-page decision memo before roadmap tradeoff reviews.",
      "Use meeting time to discuss assumptions and objections, not to introduce the topic.",
    ],
    sourceInsightIds: ["insight-written-context", "insight-decision-thresholds"],
    isActive: true,
    createdAt: "2026-04-22T16:05:00.000Z",
    updatedAt: "2026-04-22T16:05:00.000Z",
  },
  {
    id: "norm-escalation-guardrails",
    leaderId: sampleLeader.id,
    title: "Escalate changes to commitments or dependencies",
    category: "decisions",
    description:
      "Teams should make local operating calls independently and escalate only when customer commitments, hiring plans, or material dependencies change.",
    examples: [
      "A sprint-scope tradeoff stays with the director.",
      "A change to a committed customer delivery date escalates with recommendation and risk.",
    ],
    sourceInsightIds: ["insight-delegation-guardrails"],
    isActive: true,
    createdAt: "2026-04-22T16:08:00.000Z",
    updatedAt: "2026-04-22T16:08:00.000Z",
  },
  {
    id: "norm-name-dissent",
    leaderId: sampleLeader.id,
    title: "Name the strongest objection",
    category: "feedback",
    description:
      "Before convergence, the group should name the strongest objection and check whether quieter participants have had room to add risk or dissent.",
    examples: [
      "Ask 'what would make this decision fail?' before confirming alignment.",
      "Invite written dissent from team members who were not in the room.",
    ],
    sourceInsightIds: ["insight-growth-edge-synthesis"],
    isActive: false,
    createdAt: "2026-04-21T12:10:00.000Z",
    updatedAt: "2026-04-21T12:10:00.000Z",
  },
];

export const sampleAISuggestions: AISuggestion[] = [
  {
    id: "suggestion-growth-soften",
    leaderId: sampleLeader.id,
    insightId: "insight-growth-edge-synthesis",
    type: "soften-language",
    message:
      "This growth-edge card is useful but could sound more invitational if framed as a team practice rather than a correction.",
    suggestedText:
      "A helpful team practice is to pause before convergence and ask whether the strongest objection has been named.",
    status: "open",
    createdAt: "2026-04-21T11:50:00.000Z",
  },
  {
    id: "suggestion-privacy-review",
    leaderId: sampleLeader.id,
    insightId: "insight-private-boundaries",
    type: "privacy-review",
    message:
      "This insight contains explicit private boundaries. Keep it out of team-facing cards and use it only to filter future drafts.",
    status: "accepted",
    createdAt: "2026-04-20T17:12:00.000Z",
    resolvedAt: "2026-04-20T17:18:00.000Z",
  },
  {
    id: "suggestion-customer-trust-publish",
    leaderId: sampleLeader.id,
    cardId: "card-customer-trust",
    type: "publish-ready",
    message:
      "This approved card is concise, low sensitivity, and connected to a high-confidence priority insight.",
    status: "open",
    createdAt: "2026-04-22T15:45:00.000Z",
  },
];

export const sampleDashboardVersions: DashboardVersion[] = [
  {
    id: "dashboard-maya-v1",
    leaderId: sampleLeader.id,
    versionNumber: 1,
    status: "archived",
    title: "Maya Chen Decision DNA - initial draft",
    summary:
      "Initial dashboard draft generated from interview notes before Maya reviewed sensitivity and wording.",
    insightIds: [
      "insight-decision-thresholds",
      "insight-written-context",
      "insight-delegation-guardrails",
    ],
    cardIds: ["card-decision-thresholds", "card-written-context"],
    teamNormIds: ["norm-written-prereads"],
    completionChecklist: [
      {
        id: "check-v1-insights-reviewed",
        label: "Leader reviewed extracted insights",
        isComplete: true,
      },
      {
        id: "check-v1-sensitive-content-removed",
        label: "Sensitive content removed from team view",
        isComplete: false,
      },
      {
        id: "check-v1-cards-approved",
        label: "Team-facing cards approved",
        isComplete: false,
      },
    ],
    createdAt: "2026-04-18T14:00:00.000Z",
    updatedAt: "2026-04-20T16:00:00.000Z",
    publishedAt: "2026-04-18T18:00:00.000Z",
  },
  {
    id: "dashboard-maya-v2",
    leaderId: sampleLeader.id,
    versionNumber: 2,
    status: "published",
    title: "Maya Chen Decision DNA - team guide",
    summary:
      "Current team-facing dashboard focused on decision pace, written context, customer trust, and escalation guardrails.",
    insightIds: sampleExtractedInsights
      .filter((insight) => insight.shareStatus !== "withheld")
      .map((insight) => insight.id),
    cardIds: samplePublishedCards.map((card) => card.id),
    teamNormIds: sampleTeamNorms.map((norm) => norm.id),
    completionChecklist: [
      {
        id: "check-v2-intake-complete",
        label: "Intake response complete",
        isComplete: true,
      },
      {
        id: "check-v2-insights-reviewed",
        label: "Leader reviewed extracted insights",
        isComplete: true,
      },
      {
        id: "check-v2-privacy-reviewed",
        label: "Restricted content withheld from team-facing dashboard",
        isComplete: true,
      },
      {
        id: "check-v2-cards-approved",
        label: "Approved cards available for team view",
        isComplete: true,
      },
      {
        id: "check-v2-norms-selected",
        label: "Active team norms selected",
        isComplete: true,
      },
    ],
    createdAt: "2026-04-20T16:30:00.000Z",
    updatedAt: now,
    publishedAt: "2026-04-22T16:00:00.000Z",
  },
];

