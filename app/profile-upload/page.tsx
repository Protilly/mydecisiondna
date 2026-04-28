import { SectionPlaceholder } from "@/components/section-placeholder";
import { getRouteByHref } from "@/lib/navigation";

export default function ProfileUploadPage() {
  const route = getRouteByHref("/profile-upload");

  return (
    <SectionPlaceholder
      eyebrow={route.eyebrow}
      title={route.label}
      description="Upload flows will live here when document processing is connected. For now, this page reserves the premium workspace where leaders will add an Insights Discovery profile."
      actions={["Drag-and-drop profile card", "Extraction status", "Data privacy notes"]}
    />
  );
}
