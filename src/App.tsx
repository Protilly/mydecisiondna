import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  EyeOff,
  FileText,
  Gauge,
  Home,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Moon,
  PenLine,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Sun,
  UploadCloud,
  UsersRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  aiSuggestions,
  dashboardVersions,
  extractedInsights,
  filterOptions,
  intakeResponses,
  leader,
  reviewInsights,
  sourceSections,
  teamNorms,
  uploadedProfile,
  workflowSteps,
  type FilterKey,
  type ReviewDecision,
  type ReviewInsight,
} from "./data";
import "./styles.css";

const navItems = [
  { label: "Home", icon: Home },
  { label: "Profile Upload", icon: UploadCloud },
  { label: "Intake Questionnaire", icon: ClipboardCheck },
  { label: "Leader Review", icon: ShieldCheck },
  { label: "Team Dashboard", icon: Gauge },
  { label: "Team Operating System", icon: Layers3 },
  { label: "AI Insights", icon: BrainCircuit },
  { label: "Settings", icon: LockKeyhole },
];

const finalTeamStates: ReviewDecision[] = [
  "Approved as written",
  "Edited wording",
  "Rewritten for team use",
  "Converted to team norm",
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("Leader Review");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All insights");
  const [reviewCards, setReviewCards] = useState<ReviewInsight[]>(reviewInsights);
  const [draftSaved, setDraftSaved] = useState(false);
  const [published, setPublished] = useState(false);

  const approvedCards = useMemo(
    () => reviewCards.filter((card) => finalTeamStates.includes(card.decision)),
    [reviewCards],
  );

  const reviewRequiredCount = useMemo(
    () => reviewCards.filter((card) => card.decision === "Review required").length,
    [reviewCards],
  );

  const readiness = Math.round((approvedCards.length / reviewCards.length) * 100);

  const filteredCards = useMemo(() => {
    if (activeFilter === "All insights") {
      return reviewCards;
    }

    if (activeFilter === "Team-facing") {
      return reviewCards.filter((card) => finalTeamStates.includes(card.decision));
    }

    if (activeFilter === "Review required") {
      return reviewCards.filter((card) => card.decision === "Review required");
    }

    if (activeFilter === "Private by default") {
      return reviewCards.filter(
        (card) => card.defaultVisibility === "Private by default" || card.decision === "Private",
      );
    }

    return reviewCards.filter((card) => card.category === activeFilter);
  }, [activeFilter, reviewCards]);

  function updateCard(id: ReviewInsight["id"], changes: Partial<ReviewInsight>) {
    setReviewCards((cards) =>
      cards.map((card) => (card.id === id ? { ...card, ...changes } : card)),
    );
    setDraftSaved(false);
    setPublished(false);
  }

  function applyDecision(id: ReviewInsight["id"], decision: ReviewDecision) {
    setReviewCards((cards) =>
      cards.map((card) => {
        if (card.id !== id) {
          return card;
        }

        const nextDraft =
          decision === "Approved as written" ? card.teamFacingDraft : card.editedDraft;

        return {
          ...card,
          decision,
          editedDraft: nextDraft,
        };
      }),
    );
    setDraftSaved(false);
    setPublished(false);
  }

  function resetDraft(id: ReviewInsight["id"]) {
    setReviewCards((cards) =>
      cards.map((card) =>
        card.id === id
          ? {
              ...card,
              decision: "Review required",
              editedDraft: card.teamFacingDraft,
            }
          : card,
      ),
    );
    setDraftSaved(false);
    setPublished(false);
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">DD</div>
          <div>
            <p className="eyebrow">Decision DNA</p>
            <h1>Leadership OS</h1>
          </div>
        </div>

        <nav aria-label="Primary">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={`nav-item ${activeSection === item.label ? "active" : ""}`}
                key={item.label}
                onClick={() => setActiveSection(item.label)}
                type="button"
              >
                <span>
                  <Icon size={18} />
                  {item.label}
                </span>
                <ChevronRight size={14} />
              </button>
            );
          })}
        </nav>

        <div className="sidebar-card">
          <p className="eyebrow">Consent gate</p>
          <h2>{dashboardVersions[0].status}</h2>
          <p>Draft cards stay private until the leader approves what the team can see.</p>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">{activeSection}</p>
            <h2>{leader.name}'s Decision DNA workspace</h2>
          </div>
          <div className="topbar-actions">
            <button className="ghost-button" onClick={() => setDarkMode(!darkMode)} type="button">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              {darkMode ? "Light" : "Dark"}
            </button>
            <button
              className="secondary-button"
              onClick={() => setDraftSaved(true)}
              type="button"
            >
              Save draft
            </button>
            <button
              className="primary-button"
              disabled={approvedCards.length === 0}
              onClick={() => setPublished(true)}
              type="button"
            >
              Publish approved cards
              <ArrowRight size={18} />
            </button>
          </div>
        </header>

        <section className="hero-grid">
          <article className="hero-card">
            <div className="hero-copy">
              <p className="eyebrow">Leader review and consent</p>
              <h3>Control what becomes team-visible before anything is published.</h3>
              <p>
                Every extracted insight starts in review. Maya can approve, edit, privatize, hide,
                or convert each item into a practical team norm before publication.
              </p>
            </div>
            <div className="leader-card">
              <div className="avatar">{leader.initials}</div>
              <div>
                <h4>{leader.name}</h4>
                <p>{leader.title}</p>
                <span>{leader.team}</span>
              </div>
            </div>
          </article>

          <article className="metric-card readiness-card">
            <p className="eyebrow">Publish readiness</p>
            <strong>{readiness}%</strong>
            <span>
              {approvedCards.length} of {reviewCards.length} cards approved for team visibility
            </span>
            <div
              aria-label={`Publish readiness ${readiness}%`}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={readiness}
              className="meter"
              role="meter"
            >
              <span style={{ width: `${readiness}%` }} />
            </div>
          </article>

          <article className="metric-card">
            <p className="eyebrow">Review queue</p>
            <strong>{reviewRequiredCount}</strong>
            <span>{reviewRequiredCount === 1 ? "insight still needs consent" : "insights still need consent"}</span>
          </article>
        </section>

        <section className="workflow-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Core workflow</p>
              <h3>From extraction to leader-approved team guidance</h3>
            </div>
            <button className="ghost-button" type="button">
              <RefreshCw size={18} />
              Refresh drafts
            </button>
          </div>
          <div className="workflow-list">
            {workflowSteps.map((step, index) => (
              <div className="workflow-step" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{step}</h4>
                  <p>Mocked frontend state keeps this step visible before persistence is added.</p>
                </div>
                <ChevronRight size={18} />
              </div>
            ))}
          </div>
        </section>

        <section className="leader-review-grid" aria-label="Leader review workspace">
          <aside className="panel filter-panel">
            <div className="section-heading compact-heading">
              <div>
                <p className="eyebrow">Filters</p>
                <h3>Review scope</h3>
              </div>
            </div>
            <div className="filter-list">
              {filterOptions.map((filter) => {
                const count =
                  filter === "All insights"
                    ? reviewCards.length
                    : filter === "Team-facing"
                      ? approvedCards.length
                      : filter === "Review required"
                        ? reviewRequiredCount
                        : filter === "Private by default"
                          ? reviewCards.filter(
                              (card) =>
                                card.defaultVisibility === "Private by default" ||
                                card.decision === "Private",
                            ).length
                          : reviewCards.filter((card) => card.category === filter).length;

                return (
                  <button
                    className={`filter-button ${activeFilter === filter ? "active" : ""}`}
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    type="button"
                  >
                    <span>{filter}</span>
                    <strong>{count}</strong>
                  </button>
                );
              })}
            </div>
            <div className="consent-note">
              <ShieldCheck size={18} />
              <p>
                Consent is per insight. Private and hidden choices never appear in the team preview.
              </p>
            </div>
          </aside>

          <section className="panel review-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Review cards</p>
                <h3>{filteredCards.length} insights in view</h3>
              </div>
              <span className="status draft-state">
                {published
                  ? "Approved cards published"
                  : draftSaved
                    ? "Draft saved locally"
                    : "Unpublished draft"}
              </span>
            </div>

            <div className="review-list">
              {filteredCards.map((card) => {
                const isPrivate = card.decision === "Private";
                const isHidden = card.decision === "Hidden";
                const isApproved = finalTeamStates.includes(card.decision);

                return (
                  <article
                    className={`review-card ${isPrivate ? "private-card" : ""} ${
                      isHidden ? "hidden-card" : ""
                    }`}
                    key={card.id}
                  >
                    <div className="review-card-header">
                      <div>
                        <div className="chip-row">
                          <span className={`pill ${card.sensitivity.toLowerCase()}`}>
                            {card.sensitivity} sensitivity
                          </span>
                          <span className="pill neutral">{card.sourceCategory}</span>
                        </div>
                        <h4>{card.title}</h4>
                        <p className="small-copy">
                          Confidence {card.confidence}% · Default: {card.defaultVisibility}
                        </p>
                      </div>
                      <span className={`status ${decisionClass(card.decision)}`}>
                        {card.decision}
                      </span>
                    </div>

                    <div className="evidence-grid">
                      <div>
                        <p className="field-label">Original source text</p>
                        <blockquote>{card.originalSourceText}</blockquote>
                      </div>
                      <div>
                        <p className="field-label">AI interpretation</p>
                        <p>{card.aiInterpretation}</p>
                      </div>
                    </div>

                    <div className="editing-grid">
                      <div>
                        <p className="field-label">Before: AI team-facing draft</p>
                        <div className="preview-box">{card.teamFacingDraft}</div>
                      </div>
                      <label>
                        <span className="field-label">After: leader-approved wording</span>
                        <textarea
                          aria-label={`Edit team-facing wording for ${card.title}`}
                          onChange={(event) =>
                            updateCard(card.id, {
                              decision:
                                card.decision === "Approved as written"
                                  ? "Edited wording"
                                  : card.decision,
                              editedDraft: event.target.value,
                            })
                          }
                          value={card.editedDraft}
                        />
                      </label>
                    </div>

                    <div className="publish-state">
                      <strong>Publish state:</strong>
                      {isApproved && " Included in team preview."}
                      {isPrivate && " Private to leader. Not visible to team."}
                      {isHidden && " Hidden from draft and preview."}
                      {card.decision === "Review required" && " Awaiting leader consent."}
                      {card.decision === "Feedback requested" && " Parked for a later feedback loop."}
                    </div>

                    <div className="button-row action-row">
                      <button
                        className="secondary-button"
                        onClick={() => applyDecision(card.id, "Approved as written")}
                        type="button"
                      >
                        <CheckCircle2 size={16} />
                        Approve as written
                      </button>
                      <button
                        className="secondary-button"
                        onClick={() => applyDecision(card.id, "Edited wording")}
                        type="button"
                      >
                        <PenLine size={16} />
                        Edit wording
                      </button>
                      <button
                        className="secondary-button"
                        onClick={() => applyDecision(card.id, "Rewritten for team use")}
                        type="button"
                      >
                        Rewrite for team use
                      </button>
                      <button
                        className="quiet-button private-action"
                        onClick={() => applyDecision(card.id, "Private")}
                        type="button"
                      >
                        <LockKeyhole size={16} />
                        Mark private
                      </button>
                      <button
                        className="quiet-button hide-action"
                        onClick={() => applyDecision(card.id, "Hidden")}
                        type="button"
                      >
                        <EyeOff size={16} />
                        Hide
                      </button>
                      <button
                        className="secondary-button"
                        onClick={() => applyDecision(card.id, "Converted to team norm")}
                        type="button"
                      >
                        <Layers3 size={16} />
                        Convert to team norm
                      </button>
                      <button
                        className="quiet-button"
                        onClick={() => applyDecision(card.id, "Feedback requested")}
                        type="button"
                      >
                        Request feedback later
                      </button>
                      <button className="quiet-button" onClick={() => resetDraft(card.id)} type="button">
                        Reset
                      </button>
                    </div>
                  </article>
                );
              })}

              {filteredCards.length === 0 && (
                <p className="empty-state">No insights match this filter yet.</p>
              )}
            </div>
          </section>

          <aside className="panel preview-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Final preview</p>
                <h3>Approved team-facing cards</h3>
              </div>
              <UsersRound size={22} />
            </div>
            <div className="readiness-summary">
              <div className="meter">
                <span style={{ width: `${readiness}%` }} />
              </div>
              <p>
                {readiness}% ready · {approvedCards.length} cards will publish
              </p>
            </div>
            <div className="dashboard-preview">
              {approvedCards.map((card) => (
                <article className="team-card" key={card.id}>
                  <div className="icon-circle">
                    {card.decision === "Converted to team norm" ? (
                      <Layers3 size={18} />
                    ) : (
                      <MessageSquareText size={18} />
                    )}
                  </div>
                  <div>
                    <span className="pill neutral">{card.category}</span>
                    <h4>{card.title}</h4>
                    <p>{card.editedDraft}</p>
                  </div>
                </article>
              ))}
              {approvedCards.length === 0 && (
                <p className="empty-state">No cards are team-facing until approval.</p>
              )}
            </div>
          </aside>
        </section>

        <div className="content-grid three-column">
          <section className="panel">
            <p className="eyebrow">Extracted insights</p>
            <h3>Profile evidence</h3>
            {extractedInsights.map((insight) => (
              <div className="compact-row" key={insight.id}>
                <FileText size={18} />
                <div>
                  <h4>{insight.label}</h4>
                  <p>{insight.leaderEdit}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="panel">
            <p className="eyebrow">Intake context</p>
            <h3>Leader intent</h3>
            {intakeResponses.map((response) => (
              <div className="compact-row" key={response.id}>
                <ClipboardCheck size={18} />
                <div>
                  <h4>{response.prompt}</h4>
                  <p>{response.response}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="panel">
            <p className="eyebrow">Team operating system</p>
            <h3>Shared norms</h3>
            {teamNorms.map((norm) => (
              <div className="compact-row" key={norm.id}>
                <Layers3 size={18} />
                <div>
                  <h4>{norm.norm}</h4>
                  <p>{norm.rationale}</p>
                </div>
              </div>
            ))}
          </section>
        </div>

        <section className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">AI insights</p>
              <h3>Draft suggestions remain editable before publication</h3>
            </div>
            <Sparkles size={22} />
          </div>
          <div className="suggestion-grid">
            {aiSuggestions.map((suggestion) => (
              <article className="suggestion-card" key={suggestion.id}>
                <span className="pill neutral">{suggestion.action}</span>
                <h4>{suggestion.title}</h4>
                <p>{suggestion.suggestion}</p>
                <button className="quiet-button" type="button">
                  Open draft
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="source-strip">
          {sourceSections.map((section) => (
            <div key={section.id}>
              <p className="eyebrow">{section.title}</p>
              <strong>{section.confidence}% confidence</strong>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

function decisionClass(decision: ReviewDecision) {
  return decision
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace("as-written", "approved")
    .replace("wording", "edited");
}

export default App;
