type SectionPlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: string[];
};

export function SectionPlaceholder({
  eyebrow,
  title,
  description,
  actions = ["Review scope", "Add mock detail"],
}: SectionPlaceholderProps) {
  return (
    <section className="rounded-[2rem] border border-stone-200/80 bg-white/85 p-6 shadow-executive-card backdrop-blur dark:border-white/10 dark:bg-white/[0.06] sm:p-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-soft-gold">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink dark:text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-8 text-stone-600 dark:text-stone-300">
          {description}
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {actions.map((action) => (
          <div
            key={action}
            className="rounded-2xl border border-stone-200 bg-stone-50/80 p-5 dark:border-white/10 dark:bg-white/[0.04]"
          >
            <div className="text-sm font-semibold text-ink dark:text-white">
              {action}
            </div>
            <p className="mt-2 text-sm leading-6 text-stone-500 dark:text-stone-400">
              Placeholder workspace for Decision DNA. This area will connect to
              approved data and workflows later.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
