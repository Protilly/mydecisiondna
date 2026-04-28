import { SectionPlaceholder } from "@/components/section-placeholder";
import { getRouteByHref } from "@/lib/navigation";

const route = getRouteByHref("/leader-review");

export default function LeaderReviewPage() {
  return (
    <SectionPlaceholder
      eyebrow={route?.eyebrow ?? "Leader Review"}
      title={route?.label ?? "Leader Review"}
      description={route?.description}
      actions={[
        "Review extracted themes for accuracy.",
        "Edit the leader-facing narrative before sharing.",
        "Approve the team dashboard for publication.",
      ]}
    />
  );
}
