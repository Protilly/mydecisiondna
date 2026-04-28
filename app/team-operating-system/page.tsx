import { SectionPlaceholder } from "@/components/section-placeholder";
import { getRouteByHref } from "@/lib/navigation";

const route = getRouteByHref("/team-operating-system");

export default function TeamOperatingSystemPage() {
  return (
    <SectionPlaceholder
      eyebrow={route.eyebrow}
      title={route.label}
      description={route.description}
      actions={[
        "Define rituals and team norms",
        "Document decision principles",
        "Align communication preferences",
      ]}
    />
  );
}
