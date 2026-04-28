import { approvedTeamDashboard } from "@/lib/mock-data";

const approvedCards = approvedTeamDashboard.cards.filter((card) => card.approved);

export default function TeamDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white shadow-executive-card dark:border-white/10 dark:bg-white/[0.05]">
        <div className="grid gap-0 lg:grid-cols-[1.45fr_0.55fr]">
          <div className="bg-gradient-to-br from-white via-champagne/70 to-stone-100 p-7 dark:from-white/[0.09] dark:via-white/[0.04] dark:to-soft-gold/10 sm:p-9 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-soft-gold/40 bg-soft-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-soft-gold">
                Team-facing dashboard
              </span>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                Leader approved
              </span>
            </div>

            <div className="mt-8 max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500 dark:text-stone-400">
                {approvedTeamDashboard.leader.role}
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink dark:text-white md:text-6xl">
                How to work with {approvedTeamDashboard.leader.name}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-300">
                Practical, approved guidance for briefing, decision-making, escalation,
                ownership, and healthy challenge.
              </p>
            </div>
          </div>

          <aside className="border-t border-stone-200 bg-ink p-7 text-white dark:border-white/10 dark:bg-black/30 sm:p-9 lg:border-l lg:border-t-0">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-soft-gold">
              Approval status
            </p>
            <h2 className="mt-4 text-2xl font-semibold">Approved for team use</h2>
            <p className="mt-4 text-sm leading-6 text-white/70">
              {approvedTeamDashboard.leader.approvalNote}
            </p>
            <dl className="mt-8 grid gap-4 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-white/55">Leader</dt>
                <dd className="mt-1 font-semibold">{approvedTeamDashboard.leader.name}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-white/55">Approved</dt>
                <dd className="mt-1 font-semibold">{approvedTeamDashboard.leader.approvedAt}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-white/55">Visible cards</dt>
                <dd className="mt-1 font-semibold">{approvedCards.length} approved cards</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-soft-gold">
            Current priorities
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink dark:text-white">
            What matters most right now
          </h2>
          <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">
            Use these priorities to frame updates, proposals, and trade-off conversations.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {approvedTeamDashboard.leader.priorities.map((priority, index) => (
            <div
              className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.05]"
              key={priority}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-soft-gold">
                Priority {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-sm font-medium leading-6 text-ink dark:text-white">
                {priority}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-soft-gold">
              Approved working guidance
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink dark:text-white">
              Team cards
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-stone-600 dark:text-stone-300">
            Each card is intentionally concise so owners can scan it before a briefing,
            decision, escalation, or team discussion.
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {approvedCards.map((card) => (
            <article
              className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-soft-gold/70 hover:shadow-executive-card dark:border-white/10 dark:bg-white/[0.05] dark:hover:border-soft-gold/60"
              key={card.id}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-soft-gold">
                    {card.category}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink dark:text-white">
                    {card.headline}
                  </h3>
                </div>
                <span className="w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  Approved
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-stone-600 dark:text-stone-300">
                {card.summary}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <GuidanceBlock label="Do this" tone="positive" value={card.doThis} />
                <GuidanceBlock label="Avoid this" tone="caution" value={card.avoidThis} />
                <GuidanceBlock label="Escalate when" tone="neutral" value={card.escalateWhen} />
              </div>

              <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-white/10 dark:bg-black/20">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                  Example phrasing
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-ink dark:text-white">
                  &ldquo;{card.examplePhrasing}&rdquo;
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

type GuidanceBlockProps = {
  label: string;
  tone: "positive" | "caution" | "neutral";
  value: string;
};

function GuidanceBlock({ label, tone, value }: GuidanceBlockProps) {
  const toneClassName = {
    positive: "border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200",
    caution: "border-amber-500/20 bg-amber-500/10 text-amber-800 dark:text-amber-200",
    neutral: "border-sky-500/20 bg-sky-500/10 text-sky-800 dark:text-sky-200",
  }[tone];

  return (
    <div className={`rounded-2xl border p-4 ${toneClassName}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em]">{label}</p>
      <p className="mt-2 text-sm leading-6 text-ink dark:text-white">{value}</p>
    </div>
  );
}
