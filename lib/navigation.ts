export type AppRoute = {
  label: string;
  href: string;
  description: string;
  eyebrow: string;
};

export const appRoutes: AppRoute[] = [
  {
    label: "Home",
    href: "/",
    eyebrow: "Command center",
    description: "Track the Decision DNA publishing workflow from one executive overview.",
  },
  {
    label: "Profile Upload",
    href: "/profile-upload",
    eyebrow: "Source material",
    description: "Upload an Insights Discovery profile and prepare it for extraction.",
  },
  {
    label: "Intake Questionnaire",
    href: "/intake-questionnaire",
    eyebrow: "Live context",
    description: "Capture the operating context, priorities, and working preferences.",
  },
  {
    label: "Leader Review",
    href: "/leader-review",
    eyebrow: "Approval desk",
    description: "Review extracted insights and approve what can be shared.",
  },
  {
    label: "Team Dashboard",
    href: "/team-dashboard",
    eyebrow: "Published view",
    description: "Preview the team-facing dashboard and shareable leadership patterns.",
  },
  {
    label: "Team Operating System",
    href: "/team-operating-system",
    eyebrow: "Ways of working",
    description: "Translate insights into rituals, norms, and team operating agreements.",
  },
  {
    label: "AI Insights",
    href: "/ai-insights",
    eyebrow: "Synthesis engine",
    description: "Explore generated observations, risks, and coaching prompts.",
  },
  {
    label: "Settings",
    href: "/settings",
    eyebrow: "Workspace controls",
    description: "Manage preferences, sharing posture, and future integrations.",
  },
];

export const navigationItems = appRoutes.map((route, index) => ({
  ...route,
  icon: ["H", "P", "I", "R", "D", "O", "A", "S"][index],
}));

export const secondaryRoutes = appRoutes.slice(5);

export function getRouteByHref(href: string) {
  return appRoutes.find((route) => route.href === href) ?? appRoutes[0];
}
