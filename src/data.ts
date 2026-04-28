export type Role = "Leader" | "Coach or admin" | "Team member";

export type Leader = {
  id: string;
  name: string;
  title: string;
  team: string;
  location: string;
  initials: string;
  profileSummary: string;
  consentState: "Draft" | "Ready for review" | "Published";
};

export type UploadedProfile = {
  id: string;
  fileName: string;
  uploadedBy: Role;
  uploadedAt: string;
  extractionStatus: "Processing" | "Needs review" | "Complete";
  confidence: number;
};

export type SourceSection = {
  id: string;
  title: string;
  source: string;
  summary: string;
  confidence: number;
};

export type ExtractedInsight = {
  id: string;
  label: string;
  category: "Decision style" | "Communication" | "Stress signal" | "Motivation";
  source: string;
  draft: string;
  leaderEdit: string;
  sensitivity: "Low" | "Medium" | "High";
  decision: "Approve" | "Rewrite as norm" | "Suppress" | "Needs edit";
};

export type IntakeResponse = {
  id: string;
  prompt: string;
  response: string;
  theme: string;
};

export type ConsentDecision = {
  id: string;
  item: string;
  visibility: "Team-facing" | "Private to leader" | "Coach only";
  status: "Approved" | "Edited" | "Suppressed";
};

export type PublishedCard = {
  id: string;
  title: string;
  audience: "Team" | "Leader" | "Coach";
  body: string;
  sensitivity: "Low" | "Medium" | "High";
  status: "Approved" | "Needs rewrite" | "Suppressed";
  lastReviewed: string;
};

export type TeamNorm = {
  id: string;
  norm: string;
  rationale: string;
  owner: string;
};

export type AISuggestion = {
  id: string;
  title: string;
  suggestion: string;
  action: "Accept draft" | "Edit first" | "Keep private";
};

export type DashboardVersion = {
  id: string;
  version: string;
  status: "Draft" | "Published";
  publishedAt: string;
  approvedBy: string;
};

export const leader: Leader = {
  id: "ldr-001",
  name: "Maya Chen",
  title: "VP Product",
  team: "Platform Experience",
  location: "London / Remote",
  initials: "MC",
  profileSummary: "Sunshine Yellow energy with Cool Blue discipline",
  consentState: "Ready for review",
};

export const uploadedProfile: UploadedProfile = {
  id: "upl-001",
  fileName: "Maya_Chen_Insights_Discovery_Profile.pdf",
  uploadedBy: "Coach or admin",
  uploadedAt: "Apr 24, 2026",
  extractionStatus: "Complete",
  confidence: 92,
};

export const sourceSections: SourceSection[] = [
  {
    id: "src-1",
    title: "Decision-making preferences",
    source: "Insights profile, pages 7-9",
    summary: "Prefers collaborative framing first, then a crisp decision point with clear owners and evidence.",
    confidence: 94,
  },
  {
    id: "src-2",
    title: "Value to the team",
    source: "Insights profile, pages 3-4",
    summary: "Brings optimism, pattern recognition, and the ability to align cross-functional groups around a shared narrative.",
    confidence: 90,
  },
  {
    id: "src-3",
    title: "Potential blind spots",
    source: "Insights profile, pages 11-12",
    summary: "May move quickly once intent is clear and can assume others have the same context unless the team asks for calibration.",
    confidence: 86,
  },
];

export const extractedInsights: ExtractedInsight[] = [
  {
    id: "ins-1",
    label: "Frame options before asking for a call",
    category: "Decision style",
    source: "Decision-making preferences",
    draft: "Maya makes better calls when options are framed as trade-offs, not open-ended brainstorming.",
    leaderEdit: "Bring two or three credible options, the trade-offs, and your recommended path. I will help make the call fast.",
    sensitivity: "Low",
    decision: "Approve",
  },
  {
    id: "ins-2",
    label: "Make disagreement explicit",
    category: "Communication",
    source: "Leader intake",
    draft: "The team should not read fast alignment as a signal to avoid challenge.",
    leaderEdit: "If you see risk, name it directly. I value calm challenge more than quiet agreement.",
    sensitivity: "Medium",
    decision: "Approve",
  },
  {
    id: "ins-3",
    label: "Context gaps under pressure",
    category: "Stress signal",
    source: "Profile blind spots",
    draft: "Under pressure, Maya may skip context and expect the team to infer the operating logic.",
    leaderEdit: "When pace increases, ask for the operating context you need. We will use a shared decision log to reduce guessing.",
    sensitivity: "High",
    decision: "Rewrite as norm",
  },
  {
    id: "ins-4",
    label: "Energy from visible progress",
    category: "Motivation",
    source: "Value to the team",
    draft: "Visible customer impact and momentum help Maya stay engaged through ambiguity.",
    leaderEdit: "Show progress through customer evidence, shipped learning, or a clearer next move.",
    sensitivity: "Low",
    decision: "Needs edit",
  },
];

export const intakeResponses: IntakeResponse[] = [
  {
    id: "int-1",
    prompt: "What decisions should the team make without you?",
    response: "Teams should proceed on reversible product decisions when customer risk is low and the decision is documented.",
    theme: "Delegation boundaries",
  },
  {
    id: "int-2",
    prompt: "What do you want people to know before escalating?",
    response: "Escalate with the user impact, the options considered, and the consequence of waiting.",
    theme: "Escalation quality",
  },
  {
    id: "int-3",
    prompt: "What should remain private?",
    response: "Personal stress patterns should be converted into team operating norms, not exposed as personality commentary.",
    theme: "Consent and sensitivity",
  },
];

export const consentDecisions: ConsentDecision[] = [
  {
    id: "con-1",
    item: "Decision trade-off preference",
    visibility: "Team-facing",
    status: "Approved",
  },
  {
    id: "con-2",
    item: "Pressure context gaps",
    visibility: "Team-facing",
    status: "Edited",
  },
  {
    id: "con-3",
    item: "Raw profile language about stress",
    visibility: "Private to leader",
    status: "Suppressed",
  },
];

export const publishedCards: PublishedCard[] = [
  {
    id: "card-1",
    title: "How to bring Maya a decision",
    audience: "Team",
    body: "Lead with the customer impact, name the trade-off, recommend a path, and clarify what would make the decision reversible.",
    sensitivity: "Low",
    status: "Approved",
    lastReviewed: "Apr 26, 2026",
  },
  {
    id: "card-2",
    title: "How to challenge well",
    audience: "Team",
    body: "Challenge directly and calmly. Use evidence, risk language, and a proposed alternative when possible.",
    sensitivity: "Medium",
    status: "Approved",
    lastReviewed: "Apr 26, 2026",
  },
  {
    id: "card-3",
    title: "When context is missing",
    audience: "Team",
    body: "Ask for the missing operating context in the decision log. Do not wait for a perfect read of intent.",
    sensitivity: "High",
    status: "Needs rewrite",
    lastReviewed: "Apr 27, 2026",
  },
];

export const teamNorms: TeamNorm[] = [
  {
    id: "norm-1",
    norm: "Write decisions where future teammates can find them.",
    rationale: "A shared log helps the team act with leadership intent without needing constant approval.",
    owner: "Product leads",
  },
  {
    id: "norm-2",
    norm: "Use challenge as a contribution, not a late veto.",
    rationale: "Early disagreement improves speed and preserves trust when the team is moving quickly.",
    owner: "All team members",
  },
  {
    id: "norm-3",
    norm: "Convert sensitive profile language into practical working agreements.",
    rationale: "The dashboard should protect leader consent while still helping the team operate better.",
    owner: "Coach",
  },
];

export const aiSuggestions: AISuggestion[] = [
  {
    id: "ai-1",
    title: "Draft a team-facing escalation card",
    suggestion: "When escalating, include user impact, options considered, and the consequence of waiting.",
    action: "Edit first",
  },
  {
    id: "ai-2",
    title: "Refresh dashboard language",
    suggestion: "Replace personality labels with operating language where wording may feel fixed or diagnostic.",
    action: "Accept draft",
  },
  {
    id: "ai-3",
    title: "Keep private insight private",
    suggestion: "Do not publish raw stress descriptors. Convert them into a norm about asking for context under pace.",
    action: "Keep private",
  },
];

export const dashboardVersions: DashboardVersion[] = [
  {
    id: "ver-1",
    version: "v0.3",
    status: "Draft",
    publishedAt: "Pending",
    approvedBy: "Awaiting Maya",
  },
  {
    id: "ver-2",
    version: "v0.2",
    status: "Published",
    publishedAt: "Mar 15, 2026",
    approvedBy: "Maya Chen",
  },
];

export const workflowSteps = [
  "Upload profile",
  "Extract structured insights",
  "Complete leader intake questionnaire",
  "Generate draft insights and cards",
  "Leader reviews, edits, and approves",
  "Publish team-facing dashboard",
  "Maintain team operating system",
];
