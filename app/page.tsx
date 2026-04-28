import Link from "next/link";
import { progressSteps } from "@/lib/mock-data";

const ctas = [
  {
    title: "Upload a profile",
    description: "Begin with an Insights Discovery profile and prepare it for AI-assisted extraction.",
    href: "/profile-upload",
  },
  {
    title: "Start intake",
    description: "Capture live context, leadership goals, team dynamics, and sharing preferences.",
    href: "/intake-questionnaire",
  },
  {
    title: "Review insights",
    description: "Approve, edit, and refine the leadership narrative before it reaches the team.",
    href: "/leader-review",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-stone-200/80 bg-gradient-to-br from-white via-champagne/70 to-stone-100 p-8 shadow-executive-card dark:border-white/10 dark:from-white/10 dark:via-white/5 dark:to-soft-gold/10 md:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-soft-gold">
            Decision DNA
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink dark:text-white md:text-6xl">
            Turn leadership insight into a trusted team operating rhythm.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-300">
            Decision DNA helps leaders transform an Insights Discovery profile and live context into
            curated, approved guidance for how their team can communicate, decide, and perform
            together.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {ctas.map((cta) => (
          <Link
            key={cta.title}
            href={cta.href}
            className="group rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-soft-gold hover:shadow-executive-card dark:border-white/10 dark:bg-white/5 dark:hover:border-soft-gold/80"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-white transition group-hover:bg-soft-gold dark:bg-white dark:text-ink">
              {cta.title.charAt(0)}
            </span>
            <h2 className="mt-5 text-xl font-semibold text-ink dark:text-white">{cta.title}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">
              {cta.description}
            </p>
            <span className="mt-6 inline-flex text-sm font-semibold text-soft-gold">
              Continue setup
            </span>
          </Link>
        ))}
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-soft-gold">
              Launch readiness
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-ink dark:text-white">
              Team dashboard publishing progress
            </h2>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400">Mock state for app shell only</p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {progressSteps.map((step) => (
            <div
              key={step.label}
              className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-white/10 dark:bg-black/20"
            >
              <div
                className={`mb-4 h-2 rounded-full ${
                  step.complete ? "bg-soft-gold" : "bg-stone-300 dark:bg-white/20"
                }`}
              />
              <p className="text-sm font-semibold text-ink dark:text-white">{step.label}</p>
              <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                {step.complete ? "Complete" : "Pending"}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
