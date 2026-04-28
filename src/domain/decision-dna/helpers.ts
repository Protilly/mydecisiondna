import type {
  DashboardCompletion,
  DashboardVersion,
  ExtractedInsight,
  InsightCategory,
  PublishedCard,
  SensitivityLevel,
} from "./types";

export function filterInsightsByCategory(
  insights: readonly ExtractedInsight[],
  category: InsightCategory,
): ExtractedInsight[] {
  return insights.filter((insight) => insight.category === category);
}

export function groupInsightsBySensitivity(
  insights: readonly ExtractedInsight[],
): Record<SensitivityLevel, ExtractedInsight[]> {
  const grouped: Record<SensitivityLevel, ExtractedInsight[]> = {
    low: [],
    medium: [],
    high: [],
    restricted: [],
  };

  return insights.reduce((groups, insight) => {
    groups[insight.sensitivityLevel].push(insight);
    return groups;
  }, grouped);
}

export function calculateDashboardCompletion(
  dashboardVersion: DashboardVersion,
): DashboardCompletion {
  const totalSections = dashboardVersion.completionChecklist.length;
  const completedSections = dashboardVersion.completionChecklist.filter(
    (item) => item.isComplete,
  ).length;

  return {
    totalSections,
    completedSections,
    percentComplete:
      totalSections === 0
        ? 0
        : Math.round((completedSections / totalSections) * 100),
    isReadyToShare:
      totalSections > 0 &&
      completedSections === totalSections &&
      dashboardVersion.status === "published",
  };
}

export function getApprovedTeamFacingCards(
  cards: readonly PublishedCard[],
): PublishedCard[] {
  return cards
    .filter(
      (card) =>
        (card.status === "approved" || card.status === "published") &&
        card.audience === "team",
    )
    .sort((first, second) => first.displayOrder - second.displayOrder);
}
