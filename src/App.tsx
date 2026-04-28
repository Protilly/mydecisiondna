import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
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
  intakeResponses,
  leader,
  publishedCards,
  sourceSections,
  teamNorms,
  uploadedProfile,
  workflowSteps,
  type PublishedCard,
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

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [reviewCards, setReviewCards] = useState(publishedCards);

  const approvedCards = useMemo(
    () => reviewCards.filter((card) => card.status === "Approved"),
    [reviewCards],
  );

  function updateCard(id: PublishedCard["id"], changes: Partial<PublishedCard>) {
    setReviewCards((cards) =>
      cards.map((card) => (card.id === id ? { ...card, ...changes } : card)),
    );
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
            <button className="primary-button" type="button">
              Publish dashboard
              <ArrowRight size={18} />
            </button>
          </div>
        </header>

        <section className="hero-grid">
          <article className="hero-card">
            <div className="hero-copy">
              <p className="eyebrow">Executive-ready leadership intelligence</p>
              <h3>Turn a profile and live context into an approved team-facing operating guide.</h3>
              <p>
                Decision DNA treats personality inputs as a starting point, combines them with
                leader intent, and keeps every AI draft editable, suppressible, and consent-driven.
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

          <article className="metric-card">
            <p className="eyebrow">Readiness</p>
            <strong>{Math.round((approvedCards.length / reviewCards.length) * 100)}%</strong>
            <span>
              {approvedCards.length} of {reviewCards.length} cards approved
            </span>
          </article>

          <article className="metric-card">
            <p className="eyebrow">Profile source</p>
            <strong>{uploadedProfile.extractionStatus}</strong>
            <span>{uploadedProfile.fileName}</span>
          </article>
        </section>

        <section className="workflow-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Core workflow</p>
              <h3>From upload to living team dashboard</h3>
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

        <div className="content-grid">
          <section className="panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Leader review</p>
                <h3>Approve, rewrite, or suppress draft cards</h3>
              </div>
              <ShieldCheck size={22} />
            </div>
            <div className="review-list">
              {reviewCards.map((card) => (
                <article className="review-card" key={card.id}>
                  <div className="review-card-header">
                    <div>
                      <span className={`pill ${card.sensitivity.toLowerCase()}`}>
                        {card.sensitivity}
                      </span>
                      <h4>{card.title}</h4>
                    </div>
                    <span className={`status ${card.status.toLowerCase().replace(" ", "-")}`}>
                      {card.status}
                    </span>
                  </div>
                  <textarea
                    aria-label={`Edit ${card.title}`}
                    onChange={(event) => updateCard(card.id, { body: event.target.value })}
                    value={card.body}
                  />
                  <div className="button-row">
                    <button
                      className="secondary-button"
                      onClick={() => updateCard(card.id, { status: "Approved" })}
                      type="button"
                    >
                      <CheckCircle2 size={16} />
                      Approve
                    </button>
                    <button
                      className="secondary-button"
                      onClick={() => updateCard(card.id, { status: "Needs rewrite" })}
                      type="button"
                    >
                      <PenLine size={16} />
                      Rewrite as norm
                    </button>
                    <button
                      className="quiet-button"
                      onClick={() => updateCard(card.id, { status: "Suppressed" })}
                      type="button"
                    >
                      Suppress
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Team dashboard preview</p>
                <h3>What teammates can use now</h3>
              </div>
              <UsersRound size={22} />
            </div>
            <div className="dashboard-preview">
              {approvedCards.map((card) => (
                <article className="team-card" key={card.id}>
                  <div className="icon-circle">
                    <MessageSquareText size={18} />
                  </div>
                  <div>
                    <h4>{card.title}</h4>
                    <p>{card.body}</p>
                  </div>
                </article>
              ))}
              {approvedCards.length === 0 && (
                <p className="empty-state">No cards are team-facing until approval.</p>
              )}
            </div>
          </section>
        </div>

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

export default App;
