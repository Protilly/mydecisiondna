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
const yesterday = "2026-04-27T15:30:00.000Z";
const lastWeek = "2026-04-21T11:15:00.000Z";

export const sampleLeader: Leader = {
  id: "leader-maya-chen",
  displayName: "Maya Chen",
  preferredName: "Maya",
  pronouns: "she/her",
  email: "maya.chen@example.com",
  role: "VP of Product",
  organization: "Northstar Analytics",
  location: "Seattle, WA",
  timezone: "America/Los_Angeles",
  bio: "Product executive leading a 42-person product, design, and research organization through a platform expansion.",
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  createdAt: lastWeek,
  updatedAt: now,
};

export const sampleIntakeResponse: IntakeResponse = {
  id: "intake-maya-chen-001",
  leaderId: sampleLeader.id,
  submittedAt: lastWeek,
  updatedAt: yesterday,
  leaderContext: {
    summary:
      "Maya joined Northstar after scaling two B2B SaaS product teams and is currently integrating a newly acquired workflow product.",
    prompts: [
      {
        id: "leader-context-1",
        question: "What should teammates know about your current leadership context?",
        answer:
          "I am balancing integration work from an acquisition with a push to make our core analytics platform easier for enterprise customers to adopt.",
      },
    ],
  },
  priorities: {
    summary:
      "Her top priorities are customer onboarding, platform reliability, and clearer product strategy communication.",
    prompts: [
      {
        id: "priorities-1",
        question: "What are your top priorities this quarter?",
        answer:
          "Improve enterprise onboarding activation, stabilize the reporting platform, and make roadmap tradeoffs more transparent to sales and customer success.",
      },
    ],
  },
  goals: {
    summary:
      "Maya wants her leadership team to make more decisions independently while staying aligned to strategic bets.",
    prompts: [
      {
        id: "goals-1",
        question: "What outcomes would make the next six months successful?",
        answer:
          "A repeatable product planning rhythm, fewer escalations for reversible decisions, and a team that can explain our strategy in the same language.",
      },
    ],
  },
  challenges: {
    summary:
      "The organization is moving quickly, but cross-functional alignment can lag behind product decisions.",
    prompts: [
      {
        id: "challenges-1",
        question: "Where does your team get stuck?",
        answer:
          "We sometimes move from insight to solution before sales, support, and implementation teams have weighed in on customer impact.",
      },
    ],
  },
  risks: {
    summary:
      "Maya is concerned about burnout among senior product managers and hidden misalignment with GTM partners.",
    prompts: [
      {
        id: "risks-1",
        question: "What risks are you watching closely?",
        answer:
          "Senior PMs are absorbing too much ambiguity. I also worry that go-to-market teams nod along in meetings but leave with different assumptions.",
      },
    ],
  },
  decisionStyle: {
    summary:
      "She prefers crisp options, explicit tradeoffs, and a clear owner after debate.",
    prompts: [
      {
        id: "decision-style-1",
        question: "How do you make high-stakes decisions?",
        answer:
          "I like a short written framing, two or three viable options, and a recommendation. Once we discuss the tradeoffs, I want a directly responsible owner to move.",
      },
    ],
  },
  communicationPreferences: {
    summary:
      "Maya values written pre-reads, direct disagreement, and concise status updates.",
    prompts: [
      {
        id: "communication-preferences-1",
        question: "How should people communicate with you?",
        answer:
          "Send the context in writing before the meeting. In live discussion, be direct if you disagree and separate facts from interpretation.",
      },
    ],
  },
  delegation: {
    summary:
      "She delegates well when decision boundaries, risk level, and escalation triggers are explicit.",
    prompts: [
      {
        id: "delegation-1",
        question: "What helps you delegate effectively?",
        answer:
          "I need to know the decision type, what would make it irreversible, and when the owner will come back for input.",
      },
    ],
  },
  teamComposition: {
    summary:
      "Her team includes product managers, designers, researchers, product operations, and product analytics.",
    prompts: [
      {
        id: "team-composition-1",
        question: "Who is included in your immediate leadership system?",
        answer:
          "Four product directors, a head of design, a research lead, product ops, and a product analytics manager. We partner heavily with revenue and customer success.",
      },
    ],
  },
  motivation: {
    summary:
      "Maya is energized by developing leaders and turning messy customer problems into simple products.",
    prompts: [
      {
        id: "motivation-1",
        question: "What gives you energy as a leader?",
        answer:
          "I love watching a director step into a bigger decision and seeing the team simplify a customer problem that used to feel impossible.",
      },
    ],
  },
  growthEdge: {
    summary:
      "Her growth edge is slowing down enough to bring partners into the problem framing stage.",
    prompts: [
      {
        id: "growth-edge-1",
        question: "What are you actively working to improve?",
        answer:
          "I can jump to pattern recognition too quickly. I am practicing asking one more discovery question before naming the path forward.",
      },
    ],
  },
  consentAndPrivacy: {
    summary:
      "Maya consented to AI-assisted synthesis and wants sensitive personal reflections reviewed before sharing.",
    prompts: [
      {
        id: "consent-and-privacy-1",
        question: "What privacy boundaries should Decision DNA respect?",
        answer:
          "Use my responses to generate drafts, but do not share sensitive reflections with my team unless I explicitly approve the wording.",
      },
    ],
  },
};

export const sampleSourceSections: SourceSection[] = [
  {
    id: "source-section-priorities",
    leaderId: sampleLeader.id,
    intakeResponseId: sampleIntakeResponse.id,
    title: "Quarterly priorities",
    category: "priorities",
    sourceType: "intake-response",
    sourceText: sampleIntakeResponse.priorities.prompts[0].answer,
    sensitivityLevel: "low",
    createdAt: lastWeek,
  },
  {
    id: "source-section-decision-style",
    leaderId: sampleLeader.id,
    intakeResponseId: sampleIntakeResponse.id,
    title: "Decision process",
    category: "decision-style",
    sourceType: "intake-response",
    sourceText: sampleIntakeResponse.decisionStyle.prompts[0].answer,
    sensitivityLevel: "low",
    createdAt: lastWeek,
  },
  {
    id: "source-section-communication",
    leaderId: sampleLeader.id,
    intakeResponseId: sampleIntakeResponse.id,
    title: "Communication preferences",
    category: "communication-preferences",
    sourceType: "intake-response",
    sourceText: sampleIntakeResponse.communicationPreferences.prompts[0].answer,
    sensitivityLevel: "low",
    createdAt: lastWeek,
  },
  {
    id: "source-section-risks",
    leaderId: sampleLeader.id,
    intakeResponseId: sampleIntakeResponse.id,
    title: "Leadership risks",
    category: "risks",
    sourceType: "intake-response",
    sourceText: sampleIntakeResponse.risks.prompts[0].answer,
    sensitivityLevel: "high",
    createdAt: lastWeek,
  },
  {
    id: "source-section-growth-edge",
    leaderId: sampleLeader.id,
    intakeResponseId: sampleIntakeResponse.id,
    title: "Growth edge",
    category: "growth-edge",
    sourceType: "intake-response",
    sourceText: sampleIntakeResponse.growthEdge.prompts[0].answer,
    sensitivityLevel: "moderate",
    createdAt: lastWeek,
  },
  {
    id: "source-section-delegation",
    leaderId: sampleLeader.id,
    intakeResponseId: sampleIntakeResponse.id,
    title: "Delegation conditions",
    category: "delegation",
    sourceType: "intake-response",
    sourceText: sampleIntakeResponse.delegation.prompts[0].answer,
    sensitivityLevel: "low",
    createdAt: lastWeek,
  },
];

export const sampleUploadedProfile: UploadedProfile = {
  id: "uploaded-profile-maya-chen-linkedin",
  leaderId: sampleLeader.id,
  fileName: "maya-chen-leadership-profile.pdf",
  sourceType: "uploaded-profile",
  mimeType: "application/pdf",
  uploadedAt: lastWeek,
  processedAt: yesterday,
  status: "processed",
  sourceSections: sampleSourceSections,
  extractedInsightIds: [
    "insight-priorities-enterprise-onboarding",
    "insight-decision-options-owner",
    "insight-communication-written-direct",
    "insight-risk-hidden-alignment",
    "insight-growth-edge-pattern-recognition",
    "insight-delegation-boundaries",
  ],
};

export const sampleExtractedInsights: ExtractedInsight[] = [
  {
    id: "insight-priorities-enterprise-onboarding",
    leaderId: sampleLeader.id,
    title: "Enterprise onboarding is the near-term product lever",
    category: "priorities",
    sourceSection: sampleSourceSections[0],
    sourceText: sampleSourceSections[0].sourceText,
    aiSummary:
      "Maya is using enterprise onboarding activation as a focal point for product, revenue, and customer success alignment.",
    teamFacingDraft:
      "Expect Maya to anchor roadmap discussions in enterprise onboarding impact, platform reliability, and whether tradeoffs are clear to customer-facing teams.",
    sensitivityLevel: "low",
    confidenceScore: 0.94,
    shareStatus: "approved",
    leaderAccuracyRating: "accurate",
    leaderEditedText:
      "Expect Maya to anchor roadmap discussions in enterprise onboarding impact, platform reliability, and whether tradeoffs are clear to customer-facing teams.",
    publishDecision: "approved",
    createdAt: yesterday,
    updatedAt: now,
  },
  {
    id: "insight-decision-options-owner",
    leaderId: sampleLeader.id,
    title: "Decisions should include options, tradeoffs, and an owner",
    category: "decision-style",
    sourceSection: sampleSourceSections[1],
    sourceText: sampleSourceSections[1].sourceText,
    aiSummary:
      "Maya prefers concise decision framing with a recommendation and clear ownership after debate.",
    teamFacingDraft:
      "Bring Maya a brief written framing, two or three credible options, the tradeoffs, and your recommendation. Leave with a named owner and next step.",
    sensitivityLevel: "low",
    confidenceScore: 0.96,
    shareStatus: "published",
    leaderAccuracyRating: "accurate",
    leaderEditedText:
      "Bring Maya a brief written framing, two or three credible options, the tradeoffs, and your recommendation. Leave with a named owner and next step.",
    publishDecision: "approved",
    createdAt: yesterday,
    updatedAt: now,
  },
  {
    id: "insight-communication-written-direct",
    leaderId: sampleLeader.id,
    title: "Written context and direct disagreement work best",
    category: "communication-preferences",
    sourceSection: sampleSourceSections[2],
    sourceText: sampleSourceSections[2].sourceText,
    aiSummary:
      "Maya wants context in writing before meetings and values clear disagreement in live discussion.",
    teamFacingDraft:
      "Send context before the meeting. In discussion, be direct about disagreement and label what is known, assumed, or interpreted.",
    sensitivityLevel: "low",
    confidenceScore: 0.93,
    shareStatus: "published",
    leaderAccuracyRating: "mostly-accurate",
    leaderEditedText:
      "Send context before the meeting. In discussion, be direct about disagreement and label what is known, assumed, or interpreted.",
    publishDecision: "approved",
    createdAt: yesterday,
    updatedAt: now,
  },
  {
    id: "insight-risk-hidden-alignment",
    leaderId: sampleLeader.id,
    title: "Hidden GTM misalignment is a sensitive risk",
    category: "risks",
    sourceSection: sampleSourceSections[3],
    sourceText: sampleSourceSections[3].sourceText,
    aiSummary:
      "Maya worries that go-to-market partners may leave meetings with different assumptions despite apparent agreement.",
    teamFacingDraft:
      "When product decisions affect customers or revenue teams, Maya wants explicit confirmation of assumptions before the group leaves the room.",
    sensitivityLevel: "high",
    confidenceScore: 0.87,
    shareStatus: "candidate",
    leaderAccuracyRating: "needs-edit",
    leaderEditedText:
      "When product decisions affect customers or revenue teams, I want us to name assumptions clearly before we leave the room.",
    publishDecision: "needs-revision",
    createdAt: yesterday,
    updatedAt: now,
  },
  {
    id: "insight-growth-edge-pattern-recognition",
    leaderId: sampleLeader.id,
    title: "Growth edge: pause before naming the path",
    category: "growth-edge",
    sourceSection: sampleSourceSections[4],
    sourceText: sampleSourceSections[4].sourceText,
    aiSummary:
      "Maya is practicing slowing down her pattern recognition so others can contribute to problem framing.",
    teamFacingDraft:
      "Maya is working on asking one more discovery question before naming a direction. It is useful to slow her down with new customer evidence or a different interpretation.",
    sensitivityLevel: "moderate",
    confidenceScore: 0.9,
    shareStatus: "approved",
    leaderAccuracyRating: "mostly-accurate",
    leaderEditedText:
      "I am working on asking one more discovery question before naming a direction. It is useful to slow me down with new customer evidence or a different interpretation.",
    publishDecision: "approved",
    createdAt: yesterday,
    updatedAt: now,
  },
  {
    id: "insight-delegation-boundaries",
    leaderId: sampleLeader.id,
    title: "Delegation works when boundaries are explicit",
    category: "delegation",
    sourceSection: sampleSourceSections[5],
    sourceText: sampleSourceSections[5].sourceText,
    aiSummary:
      "Maya delegates more confidently when the decision owner clarifies reversibility and escalation triggers.",
    teamFacingDraft:
      "If you own a decision, clarify whether it is reversible, what risk level you are taking on, and what would trigger escalation back to Maya.",
    sensitivityLevel: "low",
    confidenceScore: 0.92,
    shareStatus: "approved",
    leaderAccuracyRating: "accurate",
    leaderEditedText:
      "If you own a decision, clarify whether it is reversible, what risk level you are taking on, and what would trigger escalation back to me.",
    publishDecision: "approved",
    createdAt: yesterday,
    updatedAt: now,
  },
];

export const sampleConsentDecisions: ConsentDecision[] = [
  {
    id: "consent-ai-analysis",
    leaderId: sampleLeader.id,
    scope: "ai-analysis",
    status: "granted",
    decidedAt: lastWeek,
    notes: "Approved AI-assisted synthesis for uploaded profile and intake responses.",
  },
  {
    id: "consent-team-card-sharing",
    leaderId: sampleLeader.id,
    scope: "team-card-sharing",
    status: "granted",
    decidedAt: yesterday,
    notes: "Team-facing cards require explicit leader approval before publication.",
  },
  {
    id: "consent-sensitive-review",
    leaderId: sampleLeader.id,
    scope: "sensitive-insight-review",
    status: "granted",
    decidedAt: yesterday,
    notes: "High-sensitivity insights should remain private until manually reviewed.",
  },
  {
    id: "consent-product-learning",
    leaderId: sampleLeader.id,
    scope: "anonymous-product-learning",
    status: "declined",
    decidedAt: lastWeek,
  },
];

export const samplePublishedCards: PublishedCard[] = [
  {
    id: "card-how-to-bring-decisions",
    leaderId: sampleLeader.id,
    insightIds: ["insight-decision-options-owner", "insight-delegation-boundaries"],
    title: "How to bring Maya a decision",
    body:
      "Use a short written brief with context, two or three options, tradeoffs, and your recommendation. Clarify whether the decision is reversible and who owns the next step.",
    category: "decision-style",
    sensitivityLevel: "low",
    status: "published",
    audience: "direct-team",
    publishedAt: now,
    createdAt: yesterday,
    updatedAt: now,
  },
  {
    id: "card-communication-operating-mode",
    leaderId: sampleLeader.id,
    insightIds: ["insight-communication-written-direct"],
    title: "Communication operating mode",
    body:
      "Send context before meetings and be direct when you disagree. Maya responds well when teammates separate facts, assumptions, and interpretations.",
    category: "communication-preferences",
    sensitivityLevel: "low",
    status: "published",
    audience: "direct-team",
    publishedAt: now,
    createdAt: yesterday,
    updatedAt: now,
  },
  {
    id: "card-current-product-focus",
    leaderId: sampleLeader.id,
    insightIds: ["insight-priorities-enterprise-onboarding"],
    title: "Current product focus",
    body:
      "Roadmap conversations should connect back to enterprise onboarding, platform reliability, and clear tradeoffs for customer-facing teams.",
    category: "priorities",
    sensitivityLevel: "low",
    status: "approved",
    audience: "cross-functional-partners",
    createdAt: yesterday,
    updatedAt: now,
  },
  {
    id: "card-growth-edge-draft",
    leaderId: sampleLeader.id,
    insightIds: ["insight-growth-edge-pattern-recognition"],
    title: "How to challenge Maya's pattern recognition",
    body:
      "Maya is practicing asking one more discovery question before naming a direction. Bring new customer evidence or a different interpretation when you think the team is moving too quickly.",
    category: "growth-edge",
    sensitivityLevel: "moderate",
    status: "draft",
    audience: "direct-team",
    createdAt: yesterday,
    updatedAt: now,
  },
];

export const sampleTeamNorms: TeamNorm[] = [
  {
    id: "team-norm-written-decision-briefs",
    leaderId: sampleLeader.id,
    title: "Use one-page decision briefs",
    description:
      "For material product decisions, share a concise brief before discussion with context, options, tradeoffs, recommendation, and owner.",
    category: "decision-making",
    relatedCardIds: ["card-how-to-bring-decisions"],
    adopted: true,
    createdAt: yesterday,
    updatedAt: now,
  },
  {
    id: "team-norm-assumption-check",
    leaderId: sampleLeader.id,
    title: "Close meetings with assumption checks",
    description:
      "Before leaving cross-functional decisions, name the assumptions each function is carrying and confirm any unresolved risks.",
    category: "collaboration",
    relatedCardIds: ["card-current-product-focus"],
    adopted: false,
    createdAt: yesterday,
    updatedAt: now,
  },
];

export const sampleAISuggestions: AISuggestion[] = [
  {
    id: "ai-suggestion-combine-decision-delegation",
    leaderId: sampleLeader.id,
    type: "combine-insights",
    title: "Combine decision style and delegation guidance",
    rationale:
      "Both insights describe how teammates should frame ownership and escalation, so a combined card is likely more useful than two separate cards.",
    suggestedText:
      "Bring Maya decisions with options, tradeoffs, and a recommendation; then clarify reversibility, ownership, and escalation triggers.",
    relatedInsightIds: ["insight-decision-options-owner", "insight-delegation-boundaries"],
    relatedCardIds: ["card-how-to-bring-decisions"],
    status: "accepted",
    confidenceScore: 0.91,
    createdAt: yesterday,
  },
  {
    id: "ai-suggestion-flag-risk-sensitive",
    leaderId: sampleLeader.id,
    type: "flag-sensitive",
    title: "Review GTM alignment wording before sharing",
    rationale:
      "The source text references partner misalignment and could create defensiveness if shared without careful wording.",
    relatedInsightIds: ["insight-risk-hidden-alignment"],
    relatedCardIds: [],
    status: "new",
    confidenceScore: 0.84,
    createdAt: now,
  },
];

export const sampleDashboardVersion: DashboardVersion = {
  id: "dashboard-version-maya-chen-v1",
  leaderId: sampleLeader.id,
  versionNumber: 1,
  title: "Maya Chen Decision DNA - Team Preview",
  status: "review",
  publishedCardIds: samplePublishedCards.map((card) => card.id),
  teamNormIds: sampleTeamNorms.map((norm) => norm.id),
  insightIds: sampleExtractedInsights.map((insight) => insight.id),
  createdAt: yesterday,
  updatedAt: now,
};

export const sampleDecisionDnaData = {
  leader: sampleLeader,
  uploadedProfile: sampleUploadedProfile,
  sourceSections: sampleSourceSections,
  intakeResponse: sampleIntakeResponse,
  extractedInsights: sampleExtractedInsights,
  consentDecisions: sampleConsentDecisions,
  publishedCards: samplePublishedCards,
  teamNorms: sampleTeamNorms,
  aiSuggestions: sampleAISuggestions,
  dashboardVersion: sampleDashboardVersion,
} as const;
