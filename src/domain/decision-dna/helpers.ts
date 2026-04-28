import type {
  CardStatus,
  DashboardVersion,
  ExtractedInsight,
  InsightCategory,
  PublishedCard,
  SensitivityLevel,
} from "./types";

export type InsightsBySensitivity = Record<SensitivityLevel, ExtractedInsight[]>;

export interface DashboardCompletion {
  totalInsights: number;
  reviewedInsights: number;
  approvedInsights: number;
  totalCards: number;
  approvedCards: number;
  publishedCards: number;
  completionPercentage: number;
}

export function filterInsightsByCategory(
  insights: ExtractedInsight[],
  category: InsightCategory,
): ExtractedInsight[] {
  return insights.filter((insight) => insight.category === category);
}

export function groupInsightsBySensitivity(
  insights: ExtractedInsight[],
): InsightsBySensitivity {
  return insights.reduce<InsightsBySensitivity>(
    (groups, insight) => {
      groups[insight.sensitivityLevel].push(insight);
      return groups;
    },
    {
      low: [],
      moderate: [],
      high: [],
      restricted: [],
    },
  );
}

export function calculateDashboardCompletion(
  dashboardVersion: DashboardVersion,
  insights: ExtractedInsight[],
  cards: PublishedCard[],
): DashboardCompletion {
  const dashboardInsights = insights.filter((insight) =>
    dashboardVersion.insightIds.includes(insight.id),
  );
  const dashboardCards = cards.filter((card) =>
    dashboardVersion.publishedCardIds.includes(card.id),
  );

  const reviewedInsights = dashboardInsights.filter(
    (insight) => insight.leaderAccuracyRating !== "not-reviewed",
  ).length;
  const approvedInsights = dashboardInsights.filter(
    (insight) => insight.publishDecision === "approved",
  ).length;
  const approvedCards = dashboardCards.filter((card) =>
    isTeamFacingApprovedStatus(card.status),
  ).length;
  const publishedCards = dashboardCards.filter(
    (card) => card.status === "published",
  ).length;

  const totalRequiredItems = dashboardInsights.length + dashboardCards.length;
  const completedItems = approvedInsights + approvedCards;

  return {
    totalInsights: dashboardInsights.length,
    reviewedInsights,
    approvedInsights,
    totalCards: dashboardCards.length,
    approvedCards,
    publishedCards,
    completionPercentage:
      totalRequiredItems === 0
        ? 0
        : Math.round((completedItems / totalRequiredItems) * 100),
  };
}

export function getApprovedTeamFacingCards(
  cards: PublishedCard[],
): PublishedCard[] {
  return cards.filter(
    (card) =>
      card.audience !== "leader-only" && isTeamFacingApprovedStatus(card.status),
  );
}

function isTeamFacingApprovedStatus(status: CardStatus): boolean {
  return status === "approved" || status === "published";
}
