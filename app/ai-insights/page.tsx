import { SectionPlaceholder } from "@/components/section-placeholder";
import { getRouteByHref } from "@/lib/navigation";

const route = getRouteByHref("/ai-insights");

export default function AiInsightsPage() {
  return (
    <SectionPlaceholder
      eyebrow="Signal layer"
      title={route?.label ?? "AI Insights"}
      description={route?.description ?? ""}
      actions={[
        "Review AI-generated themes",
        "Flag sensitive or low-confidence recommendations",
        "Prepare executive-ready talking points",
      ]}
    />
  );
}
