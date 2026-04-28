import { useMemo, useState } from "react";

type Insight = {
  id: string;
  title: string;
  category: string;
  summary: string;
};

type IntakeSignal = {
  id: string;
  label: string;
  value: string;
};

type DraftOutput = {
  headline: string;
  summary: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
};

type AiModule = {
  id: string;
  title: string;
  explanation: string;
  prompt: string;
  outputType: string;
  mockOutput: DraftOutput;
};

const approvedInsights: Insight[] = [
  {
    id: "speed",
    title: "Fast pattern recognition",
    category: "Decision style",
    summary:
      "Often spots the shape of a decision early and prefers to move once the core tradeoff is clear.",
  },
  {
    id: "detail",
    title: "High detail threshold",
    category: "Quality signal",
    summary:
      "Needs enough evidence to trust execution plans and may press for specificity before delegating.",
  },
  {
    id: "dissent",
    title: "Values direct challenge",
    category: "Team dynamic",
    summary:
      "Responds well to candid disagreement when it is grounded in shared goals and practical alternatives.",
  },
  {
    id: "context",
    title: "Context-setting leader",
    category: "Briefing preference",
    summary:
      "Makes stronger calls when briefings start with stakes, constraints, and the decision needed.",
  },
];

const intakeData: IntakeSignal[] = [
  {
    id: "pace",
    label: "Preferred pace",
    value: "Quick first pass, then targeted refinement",
  },
  {
    id: "risk",
    label: "Risk posture",
    value: "Comfortable with reversible experiments; cautious on durable commitments",
  },
  {
    id: "team",
    label: "Team context",
    value: "Cross-functional team balancing product speed, customer trust, and operational detail",
  },
];

const aiModules: AiModule[] = [
  {
    id: "insight-synthesizer",
    title: "Insight Synthesizer",
    explanation:
      "Combines approved insights and intake signals into a concise leadership readout for reflection.",
    prompt: "Synthesize selected material into a short, leader-editable insight card.",
    outputType: "Leadership synthesis",
    mockOutput: {
      headline: "Speed is strongest when paired with visible checkpoints",
      summary:
        "Your pattern recognition helps the team move sooner, while your detail threshold protects quality. The opportunity is to name which checkpoints matter before the work accelerates.",
      sections: [
        {
          title: "Team-facing behavior",
          body: "When the decision is reversible, ask for a fast recommendation plus the two details that would change the call.",
        },
        {
          title: "Safeguard",
          body: "Pre-commit to the review moment so the team knows speed does not mean skipping scrutiny.",
        },
      ],
    },
  },
  {
    id: "blind-spot-reframer",
    title: "Blind Spot Reframer",
    explanation:
      "Rewrites possible overuses of a strength into observable behaviors the team can discuss safely.",
    prompt: "Reframe a selected trait into constructive, team-facing language.",
    outputType: "Behavior reframe",
    mockOutput: {
      headline: "From fast-deciding to fast-aligning",
      summary:
        "A speed preference can look like closure before others have contributed. Framing the behavior as fast alignment keeps ownership with the leader while inviting useful challenge.",
      sections: [
        {
          title: "Rewritten trait",
          body: "I tend to form an early view. If you see a risk I am moving past, name it with the impact and the smallest useful next check.",
        },
        {
          title: "Productive dissent language",
          body: "I agree with the direction, and I think one assumption needs stress-testing before we commit.",
        },
      ],
    },
  },
  {
    id: "team-norm-generator",
    title: "Team Norm Generator",
    explanation:
      "Turns selected insights into draft operating norms that remain editable before sharing with the team.",
    prompt: "Generate a practical team norm from approved leadership preferences.",
    outputType: "Team norm",
    mockOutput: {
      headline: "Disagree early, decide clearly",
      summary:
        "The team should make room for direct challenge before a decision, then align behind the chosen path after the decision is made.",
      sections: [
        {
          title: "Draft norm",
          body: "Before key calls, each function names one concern, one tradeoff, and one condition that would change their recommendation.",
        },
        {
          title: "What good looks like",
          body: "Dissent is specific, time-boxed, and connected to the shared goal instead of personal preference.",
        },
      ],
    },
  },
  {
    id: "briefing-coach",
    title: "Briefing Coach",
    explanation:
      "Creates a draft briefing template based on leader preferences, decision context, and consented intake data.",
    prompt: "Draft a briefing structure that helps this leader make a clear decision.",
    outputType: "Briefing template",
    mockOutput: {
      headline: "Start with the decision, then show the constraint",
      summary:
        "Briefings will land better when they lead with the call needed and quickly separate reversible choices from durable commitments.",
      sections: [
        {
          title: "Template",
          body: "1. Decision needed. 2. Stakes and constraints. 3. Recommended path. 4. Reversible vs. durable risks. 5. Two details requiring leader input.",
        },
        {
          title: "Coach note",
          body: "Ask the briefer to mark which details are confidence-building and which ones are decision-changing.",
        },
      ],
    },
  },
  {
    id: "conflict-coach",
    title: "Conflict Coach",
    explanation:
      "Suggests language and safeguards for likely friction points while keeping the final judgment with the leader.",
    prompt: "Identify likely friction and draft constructive language for the team.",
    outputType: "Conflict guidance",
    mockOutput: {
      headline: "Likely friction: speed versus detail",
      summary:
        "Product momentum may pull toward quick calls while operational partners may need more proof. The useful move is to define the minimum detail required for the decision type.",
      sections: [
        {
          title: "Balancing role",
          body: "Assign one person to advocate for pace and one person to advocate for resilience before the final recommendation.",
        },
        {
          title: "Dissent example",
          body: "I am not blocking speed; I am naming the one operational detail that would make this safe to accelerate.",
        },
      ],
    },
  },
  {
    id: "decision-pattern-interpreter",
    title: "Decision Pattern Interpreter",
    explanation:
      "Interprets selected decision patterns as hypotheses to review, edit, or dismiss before they become cards.",
    prompt: "Interpret recurring decision patterns and suggest a small experiment.",
    outputType: "Decision pattern",
    mockOutput: {
      headline: "Experiment with decision-type labels",
      summary:
        "Your pattern suggests different needs for reversible and durable decisions. Naming the type up front can reduce unnecessary detail without weakening judgment.",
      sections: [
        {
          title: "Pattern hypothesis",
          body: "When a call is reversible, the leader benefits from a concise recommendation. When durable, the leader benefits from deeper evidence and explicit tradeoffs.",
        },
        {
          title: "Suggested safeguard",
          body: "Add a decision-type label to meeting notes: reversible experiment, staged commitment, or durable commitment.",
        },
      ],
    },
  },
];

function App() {
  const [selectedInsightIds, setSelectedInsightIds] = useState<string[]>(["speed", "detail"]);
  const [selectedIntakeIds, setSelectedIntakeIds] = useState<string[]>(["pace", "risk", "team"]);
  const [selectedModuleId, setSelectedModuleId] = useState(aiModules[0].id);
  const [drafts, setDrafts] = useState<Record<string, DraftOutput>>({});
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState(
    "No AI module has been run yet. Choose approved inputs, then generate a draft.",
  );

  const selectedModule =
    aiModules.find((module) => module.id === selectedModuleId) ?? aiModules[0];
  const selectedInsights = approvedInsights.filter((insight) =>
    selectedInsightIds.includes(insight.id),
  );
  const selectedIntake = intakeData.filter((signal) => selectedIntakeIds.includes(signal.id));
  const currentDraft = drafts[selectedModule.id];

  const sourceSummary = useMemo(() => {
    return `${selectedInsightIds.length} approved insight${
      selectedInsightIds.length === 1 ? "" : "s"
    } and ${selectedIntakeIds.length} intake signal${
      selectedIntakeIds.length === 1 ? "" : "s"
    } selected`;
  }, [selectedInsightIds.length, selectedIntakeIds.length]);

  const toggleInsight = (id: string) => {
    setSelectedInsightIds((current) =>
      current.includes(id)
        ? current.filter((insightId) => insightId !== id)
        : [...current, id],
    );
  };

  const toggleIntakeSignal = (id: string) => {
    setSelectedIntakeIds((current) =>
      current.includes(id) ? current.filter((signalId) => signalId !== id) : [...current, id],
    );
  };

  const runModule = (module: AiModule) => {
    setSelectedModuleId(module.id);
    setDrafts((current) => ({ ...current, [module.id]: module.mockOutput }));
    setEditingDraftId(null);
    setActionMessage(
      `${module.title} generated a mocked Draft AI Suggestion from ${sourceSummary}.`,
    );
  };

  const updateDraftField = (field: "headline" | "summary", value: string) => {
    setDrafts((current) => ({
      ...current,
      [selectedModule.id]: {
        ...selectedModule.mockOutput,
        ...current[selectedModule.id],
        [field]: value,
      },
    }));
  };

  const updateDraftSection = (index: number, value: string) => {
    setDrafts((current) => {
      const draft = current[selectedModule.id] ?? selectedModule.mockOutput;
      return {
        ...current,
        [selectedModule.id]: {
          ...draft,
          sections: draft.sections.map((section, sectionIndex) =>
            sectionIndex === index ? { ...section, body: value } : section,
          ),
        },
      };
    });
  };

  const handleDraftAction = (action: string) => {
    if (action === "Discard") {
      setDrafts((current) => {
        const next = { ...current };
        delete next[selectedModule.id];
        return next;
      });
      setEditingDraftId(null);
      setActionMessage(`${selectedModule.title} draft discarded. Nothing was saved.`);
      return;
    }

    if (action === "Edit draft") {
      setEditingDraftId(selectedModule.id);
      setActionMessage(`${selectedModule.title} draft is editable. Review before accepting or saving.`);
      return;
    }

    if (action === "Accept draft") {
      setEditingDraftId(null);
    }

    setActionMessage(
      `${action} selected for ${selectedModule.title}. This mock UI keeps the choice visible for review.`,
    );
  };

  return (
    <main className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Decision DNA AI Insights</p>
          <h1>Draft-only AI support for leader judgment</h1>
          <p className="hero-copy">
            These tools synthesize approved insights and intake data into editable hypotheses.
            AI suggestions are never final decisions: accept, edit, save, or dismiss each draft.
          </p>
        </div>
        <div className="trust-panel" aria-label="Trust and consent principles">
          <span>Trust and consent</span>
          <ul>
            <li>Uses only the selected approved insights and selected intake signals</li>
            <li>Mocked output; no model integration</li>
            <li>Every result remains editable or dismissible</li>
          </ul>
        </div>
      </section>

      <section className="workspace-grid">
        <aside className="input-panel" aria-labelledby="source-title">
          <div className="panel-heading">
            <p className="eyebrow">Inputs</p>
            <h2 id="source-title">Approved source material</h2>
          </div>
          <p className="panel-note">
            Select the consented insights and intake data a module can use before generating a draft.
          </p>

          <div className="insight-list">
            {approvedInsights.map((insight) => (
              <label className="insight-option" key={insight.id}>
                <input
                  type="checkbox"
                  checked={selectedInsightIds.includes(insight.id)}
                  onChange={() => toggleInsight(insight.id)}
                />
                <span>
                  <strong>{insight.title}</strong>
                  <small>{insight.category}</small>
                  {insight.summary}
                </span>
              </label>
            ))}
          </div>

          <div className="intake-card">
            <h3>Selected intake data</h3>
            {intakeData.map((signal) => (
              <label className="intake-row" key={signal.id}>
                <input
                  type="checkbox"
                  checked={selectedIntakeIds.includes(signal.id)}
                  onChange={() => toggleIntakeSignal(signal.id)}
                />
                <span>{signal.label}</span>
                <p>{signal.value}</p>
              </label>
            ))}
          </div>
        </aside>

        <section className="module-panel" aria-labelledby="module-title">
          <div className="panel-heading">
            <p className="eyebrow">Modules</p>
            <h2 id="module-title">Choose an AI support module</h2>
          </div>
          <div className="module-grid">
            {aiModules.map((module) => {
              const hasDraft = Boolean(drafts[module.id]);
              const isSelected = module.id === selectedModule.id;
              return (
                <article className={`module-card ${isSelected ? "selected" : ""}`} key={module.id}>
                  <div>
                    <div className="module-card-header">
                      <h3>{module.title}</h3>
                      {hasDraft ? <span className="status-pill">Draft ready</span> : null}
                    </div>
                    <p>{module.explanation}</p>
                    <small>{module.outputType}</small>
                  </div>
                  <button type="button" onClick={() => runModule(module)}>
                    Run module
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      </section>

      <section className="draft-workbench" aria-live="polite">
        <div className="draft-header">
          <div>
            <p className="eyebrow">Draft workbench</p>
            <h2>{selectedModule.title}</h2>
            <p>{selectedModule.prompt}</p>
          </div>
          <div className="source-pill">{sourceSummary}</div>
        </div>

        <div className="selected-sources">
          {[...selectedInsights.map((insight) => insight.title), ...selectedIntake.map((signal) => signal.label)].length >
          0 ? (
            <>
              {selectedInsights.map((insight) => (
                <span key={insight.id}>{insight.title}</span>
              ))}
              {selectedIntake.map((signal) => (
                <span key={signal.id}>{signal.label}</span>
              ))}
            </>
          ) : (
            <span>No approved inputs selected</span>
          )}
        </div>

        {currentDraft ? (
          <DraftCard
            draft={currentDraft}
            isEditing={editingDraftId === selectedModule.id}
            onUpdateField={updateDraftField}
            onUpdateSection={updateDraftSection}
            onAction={handleDraftAction}
          />
        ) : (
          <div className="empty-draft">
            <p className="draft-label">Draft AI Suggestion</p>
            <h3>No draft generated yet</h3>
            <p>
              Run {selectedModule.title} to generate mocked draft output from the selected,
              approved inputs.
            </p>
            <button type="button" onClick={() => runModule(selectedModule)}>
              Generate draft suggestion
            </button>
          </div>
        )}

        <p className="action-message">{actionMessage}</p>
      </section>
    </main>
  );
}

type DraftCardProps = {
  draft: DraftOutput;
  isEditing: boolean;
  onUpdateField: (field: "headline" | "summary", value: string) => void;
  onUpdateSection: (index: number, value: string) => void;
  onAction: (action: string) => void;
};

function DraftCard({
  draft,
  isEditing,
  onUpdateField,
  onUpdateSection,
  onAction,
}: DraftCardProps) {
  const actions = ["Accept draft", "Edit draft", "Discard", "Save as card", "Save as team norm"];

  return (
    <article className="draft-card">
      <div className="draft-card-topline">
        <p className="draft-label">Draft AI Suggestion</p>
        <span>Mock output for review</span>
      </div>

      {isEditing ? (
        <input
          className="draft-title-input"
          aria-label="Draft headline"
          value={draft.headline}
          onChange={(event) => onUpdateField("headline", event.target.value)}
        />
      ) : (
        <h3>{draft.headline}</h3>
      )}

      {isEditing ? (
        <textarea
          aria-label="Draft summary"
          value={draft.summary}
          onChange={(event) => onUpdateField("summary", event.target.value)}
        />
      ) : (
        <p className="draft-summary">{draft.summary}</p>
      )}

      <div className="draft-sections">
        {draft.sections.map((section, index) => (
          <section key={section.title}>
            <h4>{section.title}</h4>
            {isEditing ? (
              <textarea
                aria-label={`${section.title} body`}
                value={section.body}
                onChange={(event) => onUpdateSection(index, event.target.value)}
              />
            ) : (
              <p>{section.body}</p>
            )}
          </section>
        ))}
      </div>

      <div className="draft-actions" aria-label="Draft actions">
        {actions.map((action) => (
          <button
            className={
              action === "Discard" ? "secondary danger" : action === "Edit draft" ? "secondary" : ""
            }
            type="button"
            key={action}
            onClick={() => onAction(action)}
          >
            {action}
          </button>
        ))}
      </div>
    </article>
  );
}

export default App;
