export const progressItems = [
  {
    label: "Profile uploaded",
    complete: true,
    description: "Insights Discovery profile received",
  },
  {
    label: "Intake completed",
    complete: true,
    description: "Leader context captured",
  },
  {
    label: "Review approved",
    complete: false,
    description: "Awaiting leader approval",
  },
  {
    label: "Team dashboard published",
    complete: false,
    description: "Not visible to team yet",
  },
];

export const progressSteps = progressItems;

export const homeActions = [
  {
    title: "Upload a profile",
    description: "Add an Insights Discovery profile to begin extracting leader patterns.",
    href: "/profile-upload",
    eyebrow: "Step 01",
  },
  {
    title: "Start intake",
    description: "Capture live context, current team dynamics, and operating priorities.",
    href: "/intake-questionnaire",
    eyebrow: "Step 02",
  },
  {
    title: "Review insights",
    description: "Approve what becomes team-facing before anything is published.",
    href: "/leader-review",
    eyebrow: "Step 03",
  },
];

export const placeholderSummaries: Record<string, string> = {
  "/profile-upload":
    "A guided upload experience will help leaders provide an Insights Discovery profile and confirm source details.",
  "/intake-questionnaire":
    "The intake flow will capture live context such as team goals, collaboration tensions, and decision rhythms.",
  "/leader-review":
    "Leaders will review extracted insights, edit sensitive language, and approve what can be shared.",
  "/team-dashboard":
    "The team-facing dashboard will translate approved insights into clear working agreements and leadership context.",
  "/team-operating-system":
    "The operating system will centralize team norms, meeting cadences, decision principles, and communication preferences.",
  "/ai-insights":
    "AI-generated observations will surface patterns, prompts, and recommendations from approved leader context.",
  "/settings":
    "Settings will hold workspace preferences, theme controls, and future account configuration.",
};
