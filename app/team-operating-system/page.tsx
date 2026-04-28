import { approvedTeamOperatingSystem } from "@/lib/mock-data";

export default function TeamOperatingSystemPage() {
  const system = approvedTeamOperatingSystem;

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white shadow-executive-card dark:border-white/10 dark:bg-white/[0.05]">
        <div className="grid gap-0 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-gradient-to-br from-ink via-graphite to-stone-800 p-7 text-white sm:p-9 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-soft-gold/40 bg-soft-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-soft-gold">
                Execution layer
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                Mock operating norms
              </span>
            </div>

            <div className="mt-8 max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/55">
                {system.leader.role}
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
                Team Operating System
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
                {system.summary}
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <HeroMetric label="Decision lanes" value={system.decisionLanes.length} />
              <HeroMetric label="Norm blocks" value={system.norms.length} />
              <HeroMetric label="Review cadence" value="Fri" />
            </div>
          </div>

          <aside className="border-t border-stone-200 bg-white p-7 dark:border-white/10 dark:bg-black/20 sm:p-9 xl:border-l xl:border-t-0">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-soft-gold">
              Operating intent
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink dark:text-white">
              Self-directed execution with visible risk.
            </h2>
            <p className="mt-4 text-sm leading-6 text-stone-600 dark:text-stone-300">
              These rules turn Maya&apos;s leadership style into concrete operating
              agreements: what the team owns, when to pause, and how fast decisions
              get closed out.
            </p>
            <div className="mt-6 rounded-3xl border border-soft-gold/30 bg-soft-gold/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-soft-gold">
                Cadence
              </p>
              <p className="mt-3 text-sm font-medium leading-6 text-ink dark:text-white">
                {system.reviewCadence}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeader
          eyebrow="Decision rules"
          title="Know what you can decide before asking."
          description="The Team Dashboard explains how to work with the leader; this layer tells owners exactly where decision rights sit during execution."
        />

        <div className="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
          <div className="grid border-b border-stone-200 bg-stone-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-400 lg:grid-cols-[0.8fr_1.2fr_1.2fr_1.2fr]">
            <span>Lane</span>
            <span className="hidden lg:block">Team can decide</span>
            <span className="hidden lg:block">Leader sign-off</span>
            <span className="hidden lg:block">Check before acting</span>
          </div>

          {system.decisionLanes.map((lane) => (
            <div
              className="grid gap-4 border-b border-stone-200 px-5 py-5 last:border-b-0 dark:border-white/10 lg:grid-cols-[0.8fr_1.2fr_1.2fr_1.2fr]"
              key={lane.lane}
            >
              <div>
                <p className="text-sm font-semibold text-ink dark:text-white">{lane.lane}</p>
              </div>
              <TableCell label="Team can decide" value={lane.teamCanDecide} />
              <TableCell label="Leader sign-off" value={lane.leaderSignOff} />
              <TableCell label="Check before acting" value={lane.checkBeforeActing} />
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
          <SectionHeader
            eyebrow="Escalation thresholds"
            title="Escalate boundary risk, not normal uncertainty."
            description="Use these triggers when execution speed starts touching customer trust, ownership, direction changes, or follow-through."
          />
          <div className="mt-5 space-y-3">
            {system.escalationThresholds.map((item) => (
              <div
                className="rounded-3xl border border-stone-200 bg-stone-50 p-5 dark:border-white/10 dark:bg-black/20"
                key={item.trigger}
              >
                <h3 className="text-base font-semibold text-ink dark:text-white">
                  {item.trigger}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
                  {item.threshold}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-soft-gold">
                  Briefing must include
                </p>
                <p className="mt-2 text-sm leading-6 text-ink dark:text-white">
                  {item.briefingRequirement}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-stone-200 bg-ink p-6 text-white shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
          <SectionHeader
            eyebrow="Briefing standard"
            title="Bring the decision frame."
            description="When sign-off is needed, the briefing should make the choice, risk, and follow-through easy to evaluate."
            inverse
          />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {system.briefingFields.map((field) => (
              <div
                className="rounded-3xl border border-white/10 bg-white/[0.07] p-5"
                key={field.label}
              >
                <h3 className="text-base font-semibold">{field.label}</h3>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Include
                </p>
                <p className="mt-1 text-sm leading-6 text-white/80">{field.include}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                  Avoid
                </p>
                <p className="mt-1 text-sm leading-6 text-white/70">{field.avoid}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeader
          eyebrow="Operating norms"
          title="Concrete agreements for daily execution."
          description="Each norm is written as a usable team behavior: the intent, the rule, practical examples, and the leader signal it supports."
        />

        <div className="grid gap-5 xl:grid-cols-2">
          {system.norms.map((norm) => (
            <article
              className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.05]"
              key={norm.id}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-soft-gold">
                {norm.section}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink dark:text-white">
                {norm.intent}
              </h3>
              <p className="mt-4 text-sm leading-6 text-stone-600 dark:text-stone-300">
                {norm.teamRule}
              </p>
              <ul className="mt-5 space-y-3">
                {norm.examples.map((example) => (
                  <li className="flex gap-3 text-sm leading-6 text-ink dark:text-white" key={example}>
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-soft-gold" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-2xl border border-soft-gold/30 bg-soft-gold/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-soft-gold">
                  Leader signal
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-ink dark:text-white">
                  {norm.leaderSignal}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
          <SectionHeader
            eyebrow="Editable norm blocks"
            title="Team agreements ready to adapt."
            description="These mock blocks show how teams can capture operating agreements without waiting for backend persistence."
          />
          <div className="mt-5 space-y-3">
            {system.editableAgreements.map((agreement, index) => (
              <div
                className="rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-5 dark:border-white/20 dark:bg-black/20"
                key={agreement}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                    Editable norm {String(index + 1).padStart(2, "0")}
                  </p>
                  <span className="rounded-full border border-stone-300 px-3 py-1 text-xs font-semibold text-stone-500 dark:border-white/20 dark:text-stone-400">
                    Draft
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-ink dark:text-white">{agreement}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
          <SectionHeader
            eyebrow="Fast decision close-out"
            title="Follow-through after direction changes."
            description="Use this close-out sequence after a quick call, leader challenge, or change in direction so speed does not create drift."
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Decision made",
              "Owner named",
              "Impacted teams informed",
              "Risk check scheduled",
              "Revisit signal defined",
              "Previous work paused or reassigned",
            ].map((rule, index) => (
              <div
                className="rounded-3xl border border-stone-200 bg-stone-50 p-5 dark:border-white/10 dark:bg-black/20"
                key={rule}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-soft-gold">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-sm font-medium leading-6 text-ink dark:text-white">
                  {rule}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  inverse?: boolean;
};

function SectionHeader({ eyebrow, title, description, inverse = false }: SectionHeaderProps) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-soft-gold">
        {eyebrow}
      </p>
      <h2
        className={`mt-2 text-3xl font-semibold tracking-tight ${
          inverse ? "text-white" : "text-ink dark:text-white"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-3 max-w-2xl text-sm leading-6 ${
          inverse ? "text-white/70" : "text-stone-600 dark:text-stone-300"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

function HeroMetric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-4">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
        {label}
      </p>
    </div>
  );
}

function TableCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 lg:hidden">
        {label}
      </p>
      <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-300 lg:mt-0">
        {value}
      </p>
    </div>
  );
}
