import { SectionPlaceholder } from "@/components/section-placeholder";
import { getRouteByHref } from "@/lib/navigation";

const item = getRouteByHref("/settings");

export default function SettingsPage() {
  return (
    <SectionPlaceholder
      eyebrow={item.eyebrow}
      title={item.label}
      description={item.description}
    />
  );
}
