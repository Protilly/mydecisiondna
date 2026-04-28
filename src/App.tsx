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

type ModuleMode = "standard" | "scenario" | "translator" | "modeling";

type AiModule = {
  id: string;
  title: string;
  explanation: string;
  prompt: string;
  outputType: string;
  mode?: ModuleMode;
  mockOutput: DraftOutput;
};

type ScenarioKey =
  | "missed deadline"
  | "strategic disagreement"
  | "underperforming team member"
  | "rapid change"
  | "client escalation";

type ScenarioModel = {
  naturalResponse: string;
  strengths: string;
  blindSpots: string;
  teamResponse: string;
  teamAction: string;
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

const scenarioOptions: ScenarioKey[] = [
  "missed deadline",
  "strategic disagreement",
  "underperforming team member",
  "rapid change",
  "client escalation",
];

const scenarioModels: Record<ScenarioKey, ScenarioModel> = {
  "missed deadline": {
    naturalResponse:
      "This leader is likely to quickly isolate the decision-impacting details: what slipped, whether the customer or milestone is exposed, and what can still be recovered. They may move fast to reset scope and assign a visible checkpoint.",
    strengths:
      "High urgency, practical triage, and a bias toward a concrete recovery path instead of prolonged blame.",
    blindSpots:
      "The team may experience the pace as pressure to explain before they have diagnosed root cause, which can hide operational learning.",
    teamResponse:
      "Lead with the revised delivery path, name the smallest decision needed from the leader, and separate immediate recovery from the later retrospective.",
    teamAction:
      "Create a 48-hour recovery board with owner, risk, next checkpoint, and one learning question to revisit after the deadline is stabilized.",
  },
  "strategic disagreement": {
    naturalResponse:
      "This leader will probably welcome direct challenge if it is grounded in evidence and tradeoffs. They may push the group to define the reversible test or the durable commitment at stake.",
    strengths:
      "Healthy challenge can sharpen the decision, surface assumptions, and keep disagreement tied to the business objective.",
    blindSpots:
      "People who need more processing time may withhold concerns if the debate feels too fast or too forceful.",
    teamResponse:
      "Frame disagreement as a decision aid: state the shared goal, the specific assumption in question, and the alternative path with consequences.",
    teamAction:
      "Use a one-page tradeoff memo that compares recommendation, counter-recommendation, risks, and the condition that would change the call.",
  },
  "underperforming team member": {
    naturalResponse:
      "This leader may move quickly toward clarity: define the performance gap, ask for observable evidence, and expect a direct ownership plan with near-term checkpoints.",
    strengths:
      "Clear standards, reduced ambiguity, and a strong chance of converting concern into an actionable improvement path.",
    blindSpots:
      "The leader may underweight context such as unclear priorities, dependency drag, or support gaps if the update begins with excuses.",
    teamResponse:
      "Bring facts, impact, and a specific support request. Avoid vague reassurance; show what will change by the next checkpoint.",
    teamAction:
      "Draft a two-week improvement agreement that lists outcomes, manager support, dependency removals, and what evidence will indicate progress.",
  },
  "rapid change": {
    naturalResponse:
      "This leader is likely to orient around pattern recognition, identify what is reversible, and encourage a fast first operating rhythm while durable implications are still being assessed.",
    strengths:
      "Momentum, adaptability, and an ability to give the team enough direction to move without waiting for perfect certainty.",
    blindSpots:
      "A fast pivot can leave some team members unclear on why priorities changed or which prior commitments still matter.",
    teamResponse:
      "Ask for the decision type, what is known versus assumed, and which existing commitments should pause, continue, or be renegotiated.",
    teamAction:
      "Publish a change brief with three lists: stop, continue, and test. Add a review date so the team knows when the new pattern will be reassessed.",
  },
  "client escalation": {
    naturalResponse:
      "This leader may immediately look for the customer impact, decision owner, and credibility-restoring move. They are likely to prefer a concise response plan over a long internal postmortem in the moment.",
    strengths:
      "Strong external orientation, fast containment, and clear accountability for protecting trust.",
    blindSpots:
      "Internal teams may skip documenting root causes or emotional load if the escalation is treated only as a communications problem.",
    teamResponse:
      "Start with impact, customer commitment, owner, and timing. Then identify what the leader should say, approve, or unblock.",
    teamAction:
      "Set up an escalation room with a single customer narrative, internal fact log, next outbound message, and after-action review owner.",
  },
};

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
  {
    id: "scenario-simulator",
    title: "Scenario Simulator",
    explanation:
      "Models how leadership patterns may appear in realistic workplace situations and compares likely strengths, risks, and team moves.",
    prompt: "Choose a workplace situation to generate a structured, draft-only scenario model.",
    outputType: "Scenario model",
    mode: "scenario",
    mockOutput: {
      headline: "Scenario model ready for leader review",
      summary:
        "Select a situation, then generate a structured comparison of likely leader response, strengths, blind spots, and team actions.",
      sections: [],
    },
  },
  {
    id: "team-member-translator",
    title: "Team Member Translator",
    explanation:
      "Rewrites a draft update, message, or recommendation so it is more likely to land with this leader's style.",
    prompt: "Paste a draft message to generate an aligned, editable rewrite.",
    outputType: "Message rewrite",
    mode: "translator",
    mockOutput: {
      headline: "Aligned rewrite ready for review",
      summary:
        "Paste a team message, then generate a draft rewrite that leads with the decision, stakes, recommendation, and specific ask.",
      sections: [],
    },
  },
  {
    id: "leadership-style-modeling",
    title: "Leadership Style Modeling Examples",
    explanation:
      "Generates concrete examples of briefings, pushback, and ownership updates that fit or miss this leader's preferences.",
    prompt: "Generate realistic examples your team can compare, edit, and turn into norms.",
    outputType: "Style examples",
    mode: "modeling",
    mockOutput: {
      headline: "Leadership style examples ready for review",
      summary:
        "Generate paired examples showing what strong and weak communication looks like for this leader's patterns.",
      sections: [],
    },
  },
];

function titleCase(value: string) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildScenarioDraft(situation: ScenarioKey): DraftOutput {
  const model = scenarioModels[situation];

  return {
    headline: `${titleCase(situation)}: likely leadership pattern`,
    summary:
      "Mock scenario output using the selected approved insights. Treat this as a draft hypothesis to edit with the leader and team before saving.",
    sections: [
      {
        title: "How this leader might naturally respond",
        body: model.naturalResponse,
      },
      {
        title: "Likely strengths in that response",
        body: model.strengths,
      },
      {
        title: "Likely blind spots in that response",
        body: model.blindSpots,
      },
      {
        title: "Recommended team response",
        body: model.teamResponse,
      },
      {
        title: "Recommended self-directed team action",
        body: model.teamAction,
      },
    ],
  };
}

function buildTranslatorDraft(message: string): DraftOutput {
  const cleanMessage = message.trim();
  const fallbackMessage =
    "We are behind on the launch readiness work and need a decision on whether to reduce scope or move the date.";
  const sourceMessage = cleanMessage || fallbackMessage;

  return {
    headline: "Rewritten update aligned to this leader's style",
    summary:
      "Mock rewrite that leads with the decision needed, makes the tradeoff explicit, and gives the leader a clear path to respond.",
    sections: [
      {
        title: "Original draft",
        body: sourceMessage,
      },
      {
        title: "Rewritten version",
        body: `Decision needed: confirm whether we should protect the current timeline by reducing scope, or keep scope and move the milestone. My recommendation is to protect the timeline and defer the two lower-confidence items. The main tradeoff is customer completeness versus launch credibility. If you agree, I will update Product, Success, and Ops by 3 PM with the revised scope and the checkpoint we will use to revisit the deferred items.`,
      },
      {
        title: "Why this fits the leader",
        body: "It starts with the call required, separates recommendation from tradeoff, names the execution path, and asks for a specific decision instead of a broad reaction.",
      },
      {
        title: "Optional tighter version",
        body: "Recommendation: keep the launch date and cut two lower-confidence items. Risk is a narrower customer story; benefit is preserving trust and team focus. Please confirm by 3 PM so I can align Product, Success, and Ops.",
      },
    ],
  };
}

function buildModelingDraft(): DraftOutput {
  return {
    headline: "Communication examples for this leadership style",
    summary:
      "Mock examples for team practice. Use them as editable drafts, not rules, and save only the examples that the leader validates.",
    sections: [
      {
        title: "Good briefing",
        body: "Decision needed: approve a two-week reversible pilot for the enterprise onboarding flow. Stakes are customer trust and implementation load. Recommendation: pilot with three accounts, measure setup time and support tickets, then return with a scale/no-scale call.",
      },
      {
        title: "Poor briefing",
        body: "We have been thinking about onboarding and there are several possibilities. The team has different opinions, and we can walk through the whole background before deciding what to do.",
      },
      {
        title: "Productive pushback",
        body: "I agree with the goal of moving faster. The assumption I want to test is support capacity: if ticket volume rises above 15 percent, the pilot could damage trust. Could we add that as a stop condition?",
      },
      {
        title: "Poor pushback",
        body: "I just do not think this is the right time. It feels risky, and I am not sure the team is ready.",
      },
      {
        title: "Good ownership update",
        body: "Owner update: the vendor review is on track for Friday. One dependency is Legal's data-processing clause; I have a 10 AM checkpoint booked. If it slips, I will bring you a narrowed approval path by noon.",
      },
      {
        title: "Weak ownership update",
        body: "The vendor review is moving along. Legal may have some comments, and I will let you know if anything important comes up.",
      },
    ],
  };
}

function App() {
  const [selectedInsightIds, setSelectedInsightIds] = useState<string[]>(["speed", "detail"]);
  const [selectedIntakeIds, setSelectedIntakeIds] = useState<string[]>(["pace", "risk", "team"]);
  const [selectedModuleId, setSelectedModuleId] = useState(aiModules[0].id);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>("missed deadline");
  const [translatorInput, setTranslatorInput] = useState(
    "We are tracking behind on launch readiness. I think we may need to cut a few items, but the team is still discussing options.",
  );
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

  const createDraftForModule = (module: AiModule) => {
    if (module.mode === "scenario") {
      return buildScenarioDraft(selectedScenario);
    }

    if (module.mode === "translator") {
      return buildTranslatorDraft(translatorInput);
    }

    if (module.mode === "modeling") {
      return buildModelingDraft();
    }

    return module.mockOutput;
  };

  const runModule = (module: AiModule) => {
    const draft = createDraftForModule(module);
    setSelectedModuleId(module.id);
    setDrafts((current) => ({ ...current, [module.id]: draft }));
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

    if (action === "Edit") {
      setEditingDraftId(selectedModule.id);
      setActionMessage(`${selectedModule.title} draft is editable. Review before accepting or saving.`);
      return;
    }

    setActionMessage(
      `${action} selected for ${selectedModule.title}. This mock UI keeps the output in draft review.`,
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

        <AdvancedModuleControls
          module={selectedModule}
          selectedScenario={selectedScenario}
          translatorInput={translatorInput}
          onScenarioChange={setSelectedScenario}
          onTranslatorInputChange={setTranslatorInput}
          onGenerate={() => runModule(selectedModule)}
        />

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

type AdvancedModuleControlsProps = {
  module: AiModule;
  selectedScenario: ScenarioKey;
  translatorInput: string;
  onScenarioChange: (scenario: ScenarioKey) => void;
  onTranslatorInputChange: (value: string) => void;
  onGenerate: () => void;
};

function AdvancedModuleControls({
  module,
  selectedScenario,
  translatorInput,
  onScenarioChange,
  onTranslatorInputChange,
  onGenerate,
}: AdvancedModuleControlsProps) {
  if (module.mode === "scenario") {
    return (
      <div className="advanced-controls">
        <div>
          <p className="eyebrow">Scenario input</p>
          <h3>Choose a workplace situation</h3>
          <p>
            The simulator keeps the same five comparison fields for every scenario so leaders
            and teams can compare patterns side by side.
          </p>
        </div>
        <label className="field-control">
          Situation
          <select
            value={selectedScenario}
            onChange={(event) => onScenarioChange(event.target.value as ScenarioKey)}
          >
            {scenarioOptions.map((scenario) => (
              <option key={scenario} value={scenario}>
                {titleCase(scenario)}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={onGenerate}>
          Generate scenario draft
        </button>
      </div>
    );
  }

  if (module.mode === "translator") {
    return (
      <div className="advanced-controls">
        <div>
          <p className="eyebrow">Translator input</p>
          <h3>Paste a draft update or recommendation</h3>
          <p>
            The mock translator rewrites toward this leader's preference for decision clarity,
            tradeoffs, practical next steps, and specific asks.
          </p>
        </div>
        <label className="field-control">
          Draft message
          <textarea
            value={translatorInput}
            onChange={(event) => onTranslatorInputChange(event.target.value)}
          />
        </label>
        <button type="button" onClick={onGenerate}>
          Generate aligned rewrite
        </button>
      </div>
    );
  }

  if (module.mode === "modeling") {
    return (
      <div className="advanced-controls modeling-controls">
        <div>
          <p className="eyebrow">Example generator</p>
          <h3>Generate communication examples</h3>
          <p>
            Produces realistic good and weak examples for briefings, pushback, and ownership
            updates that the team can edit into reusable norms.
          </p>
        </div>
        <button type="button" onClick={onGenerate}>
          Generate style examples
        </button>
      </div>
    );
  }

  return null;
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
  const actions = ["Edit", "Discard", "Save as card", "Save as team norm"];

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
              action === "Discard" ? "secondary danger" : action === "Edit" ? "secondary" : ""
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
