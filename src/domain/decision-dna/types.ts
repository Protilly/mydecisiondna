export type ISODateString = string;

export type InsightCategory =
  | "leader-context"
  | "priorities"
  | "goals"
  | "challenges"
  | "risks"
  | "decision-style"
  | "communication-preferences"
  | "delegation"
  | "team-composition"
  | "motivation"
  | "growth-edge"
  | "consent-and-privacy";

export type SourceType =
  | "uploaded-profile"
  | "intake-response"
  | "interview-notes"
  | "manual-entry";

export type ProcessingStatus = "queued" | "processing" | "processed" | "failed";

export type SensitivityLevel = "low" | "moderate" | "high" | "restricted";

export type ShareStatus =
  | "private"
  | "candidate"
  | "approved"
  | "published"
  | "withheld";

export type LeaderAccuracyRating =
  | "not-reviewed"
  | "accurate"
  | "mostly-accurate"
  | "needs-edit"
  | "inaccurate";

export type PublishDecision =
  | "pending"
  | "approved"
  | "needs-revision"
  | "rejected";

export type ConsentStatus = "pending" | "granted" | "declined" | "revoked";

export type ConsentScope =
  | "ai-analysis"
  | "team-card-sharing"
  | "sensitive-insight-review"
  | "anonymous-product-learning";

export type CardStatus = "draft" | "approved" | "published" | "archived";

export type TeamNormCategory =
  | "decision-making"
  | "communication"
  | "meetings"
  | "feedback"
  | "collaboration";

export type AISuggestionType =
  | "combine-insights"
  | "rewrite-card"
  | "request-clarification"
  | "flag-sensitive"
  | "recommend-team-norm";

export type AISuggestionStatus =
  | "new"
  | "accepted"
  | "dismissed"
  | "deferred";

export type DashboardVersionStatus = "draft" | "review" | "published" | "archived";

export interface Leader {
  id: string;
  displayName: string;
  preferredName: string;
  pronouns?: string;
  email: string;
  role: string;
  organization: string;
  location: string;
  timezone: string;
  bio: string;
  avatarUrl?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface SourceSection {
  id: string;
  leaderId: string;
  uploadedProfileId?: string;
  intakeResponseId?: string;
  title: string;
  category: InsightCategory;
  sourceType: SourceType;
  sourceText: string;
  sensitivityLevel: SensitivityLevel;
  createdAt: ISODateString;
}

export interface UploadedProfile {
  id: string;
  leaderId: string;
  fileName: string;
  sourceType: Extract<SourceType, "uploaded-profile">;
  mimeType: string;
  uploadedAt: ISODateString;
  processedAt?: ISODateString;
  status: ProcessingStatus;
  sourceSections: SourceSection[];
  extractedInsightIds: string[];
}

export interface ExtractedInsight {
  id: string;
  leaderId: string;
  title: string;
  category: InsightCategory;
  sourceSection: SourceSection;
  sourceText: string;
  aiSummary: string;
  teamFacingDraft: string;
  sensitivityLevel: SensitivityLevel;
  confidenceScore: number;
  shareStatus: ShareStatus;
  leaderAccuracyRating: LeaderAccuracyRating;
  leaderEditedText?: string;
  publishDecision: PublishDecision;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface IntakeSectionResponse {
  summary: string;
  prompts: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
}

export interface IntakeResponse {
  id: string;
  leaderId: string;
  submittedAt: ISODateString;
  updatedAt: ISODateString;
  leaderContext: IntakeSectionResponse;
  priorities: IntakeSectionResponse;
  goals: IntakeSectionResponse;
  challenges: IntakeSectionResponse;
  risks: IntakeSectionResponse;
  decisionStyle: IntakeSectionResponse;
  communicationPreferences: IntakeSectionResponse;
  delegation: IntakeSectionResponse;
  teamComposition: IntakeSectionResponse;
  motivation: IntakeSectionResponse;
  growthEdge: IntakeSectionResponse;
  consentAndPrivacy: IntakeSectionResponse;
}

export interface ConsentDecision {
  id: string;
  leaderId: string;
  scope: ConsentScope;
  status: ConsentStatus;
  decidedAt?: ISODateString;
  expiresAt?: ISODateString;
  notes?: string;
}

export interface PublishedCard {
  id: string;
  leaderId: string;
  insightIds: string[];
  title: string;
  body: string;
  category: InsightCategory;
  sensitivityLevel: SensitivityLevel;
  status: CardStatus;
  audience: "leader-only" | "direct-team" | "cross-functional-partners";
  publishedAt?: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface TeamNorm {
  id: string;
  leaderId: string;
  title: string;
  description: string;
  category: TeamNormCategory;
  relatedCardIds: string[];
  adopted: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface AISuggestion {
  id: string;
  leaderId: string;
  type: AISuggestionType;
  title: string;
  rationale: string;
  suggestedText?: string;
  relatedInsightIds: string[];
  relatedCardIds: string[];
  status: AISuggestionStatus;
  confidenceScore: number;
  createdAt: ISODateString;
}

export interface DashboardVersion {
  id: string;
  leaderId: string;
  versionNumber: number;
  title: string;
  status: DashboardVersionStatus;
  publishedCardIds: string[];
  teamNormIds: string[];
  insightIds: string[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
  publishedAt?: ISODateString;
}
