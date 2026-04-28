import { SectionPlaceholder } from "@/components/section-placeholder";
import { getRouteByHref } from "@/lib/navigation";

const route = getRouteByHref("/team-dashboard");

export default function TeamDashboardPage() {
  return (
    <SectionPlaceholder
      eyebrow={route.eyebrow}
      title={route.label}
      description="A future dashboard will translate approved leadership insights into practical guidance for the team."
      actions={[
        "Shared strengths and communication preferences",
        "Context-aware working agreements",
        "Published status and visibility controls",
      ]}
    />
  );
}
