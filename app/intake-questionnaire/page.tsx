import { SectionPlaceholder } from "@/components/section-placeholder";
import { getRouteByHref } from "@/lib/navigation";

export default function IntakeQuestionnairePage() {
  const item = getRouteByHref("/intake-questionnaire");

  return (
    <SectionPlaceholder
      eyebrow="Structured leader context"
      title={item.label}
      description={item.description}
      actions={["Draft live context questions", "Collect team operating inputs", "Summarize leadership priorities"]}
    />
  );
}
