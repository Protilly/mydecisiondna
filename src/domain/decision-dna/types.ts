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

export type SensitivityLevel = "low" | "medium" | "high" | "restricted";

export type ShareStatus =
  | "private"
  | "proposed"
  | "approved"
  | "published"
  | "withheld";

export type LeaderAccuracyRating =
  | "accurate"
  | "mostly-accurate"
  | "needs-edit"
  | "incorrect"
  | "unreviewed";

export type PublishDecision =
  | "undecided"
  | "approve"
  | "revise"
  | "withhold";

export type ProfileSourceType =
  | "linkedin"
  | "resume"
  | "bio"
  | "assessment"
  | "interview-notes"
  | "interview-transcript"
  | "manager-notes"
  | "other";

export type UploadedProfileStatus =
  | "uploaded"
  | "processing"
  | "processed"
  | "failed";

export type ConsentScope =
  | "profile-analysis"
  | "team-facing-dashboard"
  | "manager-dashboard"
  | "product-improvement";

export type ConsentDecisionStatus =
  | "granted"
  | "denied"
  | "revoked"
  | "pending";

export type PublishedCardType =
  | "working-with-me"
  | "decision-principle"
  | "communication-guide"
  | "team-norm"
  | "watch-out";

export type PublishedCardStatus =
  | "draft"
  | "approved"
  | "published"
  | "archived";

export type TeamNormCategory =
  | "meetings"
  | "decisions"
  | "communication"
  | "feedback"
  | "execution"
  | "wellbeing";

export type AISuggestionType =
  | "clarify"
  | "soften-language"
  | "increase-specificity"
  | "privacy-review"
  | "publish-ready";

export type AISuggestionStatus =
  | "open"
  | "accepted"
  | "dismissed"
  | "superseded";

export type DashboardVersionStatus =
  | "draft"
  | "review"
  | "published"
  | "archived";

export interface Leader {
  id: string;
  fullName: string;
  preferredName: string;
  pronouns?: string;
  title: string;
  organization: string;
  department: string;
  location: string;
  timezone: string;
  email: string;
  avatarUrl?: string;
  teamName: string;
  directReportsCount: number;
  profileId: string;
  activeDashboardVersionId?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface UploadedProfile {
  id: string;
  leaderId: string;
  fileName: string;
  sourceType: ProfileSourceType;
  status: UploadedProfileStatus;
  uploadedAt: ISODateString;
  processedAt?: ISODateString;
  wordCount: number;
  language: string;
  summary: string;
  sections: SourceSection[];
}

export interface SourceSection {
  id: string;
  profileId: string;
  title: string;
  category: InsightCategory;
  sourceType: ProfileSourceType;
  order: number;
  text: string;
  pageNumber?: number;
  extractedAt: ISODateString;
}

export interface ExtractedInsight {
  id: string;
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

export interface IntakeSection<TAnswer> {
  id: string;
  title: string;
  prompts: string[];
  answer: TAnswer;
  completedAt?: ISODateString;
}

export interface LeaderContextAnswer {
  roleScope: string;
  operatingContext: string;
  currentMandate: string;
}

export interface PrioritiesAnswer {
  currentPriorities: string[];
  tradeoffGuidance: string;
}

export interface GoalsAnswer {
  shortTermGoals: string[];
  longTermGoals: string[];
  successMeasures: string[];
}

export interface ChallengesAnswer {
  currentChallenges: string[];
  supportNeeded: string[];
}

export interface RisksAnswer {
  knownRisks: string[];
  earlyWarningSignals: string[];
  mitigationPreferences: string[];
}

export interface DecisionStyleAnswer {
  defaultStyle: string;
  decisionInputs: string[];
  escalationGuidance: string;
}

export interface CommunicationPreferencesAnswer {
  preferredChannels: string[];
  meetingPreferences: string;
  feedbackPreferences: string;
}

export interface DelegationAnswer {
  delegationPrinciples: string[];
  autonomyLevel: string;
  checkInCadence: string;
}

export interface TeamCompositionAnswer {
  teamShape: string;
  keyRoles: string[];
  collaborationPatterns: string[];
}

export interface MotivationAnswer {
  motivators: string[];
  demotivators: string[];
}

export interface GrowthEdgeAnswer {
  currentGrowthEdges: string[];
  requestedAccountability: string;
}

export interface ConsentAndPrivacyAnswer {
  sharingBoundaries: string[];
  privateTopics: string[];
  reviewPreference: string;
}

export interface IntakeResponse {
  id: string;
  leaderId: string;
  submittedAt: ISODateString;
  updatedAt: ISODateString;
  completionPercent: number;
  sections: {
    leaderContext: IntakeSection<LeaderContextAnswer>;
    priorities: IntakeSection<PrioritiesAnswer>;
    goals: IntakeSection<GoalsAnswer>;
    challenges: IntakeSection<ChallengesAnswer>;
    risks: IntakeSection<RisksAnswer>;
    decisionStyle: IntakeSection<DecisionStyleAnswer>;
    communicationPreferences: IntakeSection<CommunicationPreferencesAnswer>;
    delegation: IntakeSection<DelegationAnswer>;
    teamComposition: IntakeSection<TeamCompositionAnswer>;
    motivation: IntakeSection<MotivationAnswer>;
    growthEdge: IntakeSection<GrowthEdgeAnswer>;
    consentAndPrivacy: IntakeSection<ConsentAndPrivacyAnswer>;
  };
}

export interface ConsentDecision {
  id: string;
  leaderId: string;
  scope: ConsentScope;
  status: ConsentDecisionStatus;
  decidedAt?: ISODateString;
  expiresAt?: ISODateString;
  notes?: string;
}

export interface PublishedCard {
  id: string;
  leaderId: string;
  sourceInsightIds: string[];
  type: PublishedCardType;
  title: string;
  body: string;
  status: PublishedCardStatus;
  audience: "leader" | "team" | "manager";
  displayOrder: number;
  lastReviewedAt: ISODateString;
  publishedAt?: ISODateString;
}

export interface TeamNorm {
  id: string;
  leaderId: string;
  title: string;
  category: TeamNormCategory;
  description: string;
  examples: string[];
  sourceInsightIds: string[];
  isActive: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface AISuggestion {
  id: string;
  leaderId: string;
  insightId?: string;
  cardId?: string;
  type: AISuggestionType;
  message: string;
  suggestedText?: string;
  status: AISuggestionStatus;
  createdAt: ISODateString;
  resolvedAt?: ISODateString;
}

export interface DashboardVersion {
  id: string;
  leaderId: string;
  versionNumber: number;
  status: DashboardVersionStatus;
  title: string;
  summary: string;
  insightIds: string[];
  cardIds: string[];
  teamNormIds: string[];
  completionChecklist: DashboardCompletionChecklistItem[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
  publishedAt?: ISODateString;
}

export interface DashboardCompletionChecklistItem {
  id: string;
  label: string;
  isComplete: boolean;
}

export interface DashboardCompletion {
  totalSections: number;
  completedSections: number;
  percentComplete: number;
  isReadyToShare: boolean;
}
