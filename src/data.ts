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

export type ReviewCategory =
  | "Communication"
  | "Decision Making"
  | "Strengths"
  | "Risks"
  | "Blind Spots"
  | "Motivation"
  | "Management";

export type SensitivityLevel = "Low" | "Medium" | "High";

export type PublishState =
  | "Review required"
  | "Approved"
  | "Editing"
  | "Private"
  | "Hidden"
  | "Team norm"
  | "Feedback later";

export type ReviewInsight = {
  id: string;
  title: string;
  category: ReviewCategory;
  sourceCategory: string;
  originalSourceText: string;
  aiInterpretation: string;
  teamFacingDraft: string;
  originalDraft: string;
  sensitivity: SensitivityLevel;
  confidence: number;
  defaultVisibility: "Team-facing" | "Private by default";
  publishState: PublishState;
};

export type FilterOption =
  | "All insights"
  | "Team-facing"
  | "Review required"
  | "Private by default"
  | ReviewCategory;

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

export const filterOptions: FilterOption[] = [
  "All insights",
  "Team-facing",
  "Review required",
  "Private by default",
  "Communication",
  "Decision Making",
  "Strengths",
  "Risks",
  "Blind Spots",
  "Motivation",
  "Management",
];

export const reviewInsights: ReviewInsight[] = [
  {
    id: "insight-1",
    title: "Bring a recommendation with trade-offs",
    category: "Decision Making",
    sourceCategory: "Insights profile - Decision-making preferences",
    originalSourceText:
      "Maya is at her best when a discussion moves from exploration into a clear point of decision with options and trade-offs visible.",
    aiInterpretation:
      "The team should not bring open-ended escalation by default. Maya can move quickly when she sees options, reversibility, and the customer impact.",
    teamFacingDraft:
      "When you need Maya's decision, bring two or three credible options, the trade-offs, the customer impact, and your recommended path.",
    originalDraft:
      "When you need Maya's decision, bring two or three credible options, the trade-offs, the customer impact, and your recommended path.",
    sensitivity: "Low",
    confidence: 94,
    defaultVisibility: "Team-facing",
    publishState: "Approved",
  },
  {
    id: "insight-2",
    title: "Challenge directly and calmly",
    category: "Communication",
    sourceCategory: "Leader intake - Collaboration preferences",
    originalSourceText:
      "I do not want speed to make people quiet. If something feels risky, I want the team to say it clearly and early.",
    aiInterpretation:
      "Maya values direct challenge when it is paired with evidence and a constructive path forward.",
    teamFacingDraft:
      "If you see risk, name it directly and early. Use evidence, risk language, and a proposed alternative when possible.",
    originalDraft:
      "If you see risk, name it directly and early. Use evidence, risk language, and a proposed alternative when possible.",
    sensitivity: "Medium",
    confidence: 90,
    defaultVisibility: "Team-facing",
    publishState: "Review required",
  },
  {
    id: "insight-3",
    title: "Convert pressure signals into operating norms",
    category: "Blind Spots",
    sourceCategory: "Insights profile - Potential blind spots",
    originalSourceText:
      "Under pressure, Maya may skip contextual framing and assume the team already understands the operating logic.",
    aiInterpretation:
      "The raw profile wording is sensitive. It should become a team agreement about asking for missing context, not a personality label.",
    teamFacingDraft:
      "When pace increases, ask for the operating context you need. Use the shared decision log to reduce guessing.",
    originalDraft:
      "When pace increases, ask for the operating context you need. Use the shared decision log to reduce guessing.",
    sensitivity: "High",
    confidence: 86,
    defaultVisibility: "Private by default",
    publishState: "Review required",
  },
  {
    id: "insight-4",
    title: "Show progress through customer evidence",
    category: "Motivation",
    sourceCategory: "Insights profile - Value to the team",
    originalSourceText:
      "Visible progress, customer feedback, and a shared sense of momentum help Maya keep energy through ambiguity.",
    aiInterpretation:
      "The team can keep Maya engaged by anchoring updates in customer evidence and concrete movement rather than activity volume.",
    teamFacingDraft:
      "Show progress through customer evidence, shipped learning, or a clearer next move rather than status activity alone.",
    originalDraft:
      "Show progress through customer evidence, shipped learning, or a clearer next move rather than status activity alone.",
    sensitivity: "Low",
    confidence: 88,
    defaultVisibility: "Team-facing",
    publishState: "Review required",
  },
  {
    id: "insight-5",
    title: "Protect time for deep strategy work",
    category: "Management",
    sourceCategory: "Leader intake - Ways of working",
    originalSourceText:
      "Back-to-back tactical meetings make it harder for me to synthesize strategy. I need protected space before major product calls.",
    aiInterpretation:
      "The team should understand when Maya needs pre-read time and when a live discussion is the right format.",
    teamFacingDraft:
      "For major product calls, send the pre-read early and protect synthesis time before the meeting.",
    originalDraft:
      "For major product calls, send the pre-read early and protect synthesis time before the meeting.",
    sensitivity: "Medium",
    confidence: 82,
    defaultVisibility: "Private by default",
    publishState: "Private",
  },
  {
    id: "insight-6",
    title: "Use optimism to align groups",
    category: "Strengths",
    sourceCategory: "Insights profile - Strengths",
    originalSourceText:
      "Maya brings optimism, pattern recognition, and narrative clarity when groups need to align around an uncertain path.",
    aiInterpretation:
      "This is safe and useful for the team because it describes a strength teammates can actively use.",
    teamFacingDraft:
      "Use Maya for narrative alignment when teams need to turn ambiguity into a clear shared story.",
    originalDraft:
      "Use Maya for narrative alignment when teams need to turn ambiguity into a clear shared story.",
    sensitivity: "Low",
    confidence: 91,
    defaultVisibility: "Team-facing",
    publishState: "Approved",
  },
  {
    id: "insight-7",
    title: "Escalate irreversible risk early",
    category: "Risks",
    sourceCategory: "Leader intake - Escalation boundaries",
    originalSourceText:
      "Teams can proceed on reversible decisions. I want early escalation when customer trust, legal exposure, or architecture durability is at risk.",
    aiInterpretation:
      "The team needs a practical escalation boundary that distinguishes reversible product movement from high-risk choices.",
    teamFacingDraft:
      "Move forward on reversible decisions. Escalate early when customer trust, legal exposure, or architecture durability is at risk.",
    originalDraft:
      "Move forward on reversible decisions. Escalate early when customer trust, legal exposure, or architecture durability is at risk.",
    sensitivity: "Medium",
    confidence: 93,
    defaultVisibility: "Team-facing",
    publishState: "Review required",
  },
  {
    id: "insight-8",
    title: "Raw stress wording stays private",
    category: "Blind Spots",
    sourceCategory: "Insights profile - Stress signals",
    originalSourceText:
      "The profile describes potential stress behavior in fixed personality language that may feel diagnostic if shown to the team.",
    aiInterpretation:
      "This insight is useful for the leader and coach, but the raw wording should not become a team-facing card.",
    teamFacingDraft:
      "Keep raw stress language private. If useful, convert it into a team norm about asking for context and documenting decisions.",
    originalDraft:
      "Keep raw stress language private. If useful, convert it into a team norm about asking for context and documenting decisions.",
    sensitivity: "High",
    confidence: 80,
    defaultVisibility: "Private by default",
    publishState: "Hidden",
  },
];
