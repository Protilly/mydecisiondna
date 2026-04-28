import {
  ArrowRight,
  BadgeCheck,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Fingerprint,
  Flag,
  Gauge,
  LockKeyhole,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

type Classification = 'team-facing' | 'review required' | 'private by default';

type ExtractedSection = {
  title: string;
  insightCount: number;
  confidence: number;
  sensitivityFlags: number;
  classification: Classification;
  excerpt: string;
};

type ProfileExtraction = {
  fileName: string;
  fileType: string;
  uploadedAt: string;
  status: 'uploaded' | 'processing' | 'ready';
  processingStep: string;
  confidenceScore: number;
  extractedInsightCount: number;
  sensitivityFlags: number;
  classifications: Classification[];
  sections: ExtractedSection[];
};

const mockExtraction: ProfileExtraction = {
  fileName: 'alex-morgan-leadership-profile.pdf',
  fileType: 'PDF profile document',
  uploadedAt: 'Today, 6:37 PM',
  status: 'ready',
  processingStep: 'Profile sections mapped and ready for questionnaire context',
  confidenceScore: 92,
  extractedInsightCount: 126,
  sensitivityFlags: 4,
  classifications: ['team-facing', 'review required', 'private by default'],
  sections: [
    {
      title: 'Overview',
      insightCount: 10,
      confidence: 96,
      sensitivityFlags: 0,
      classification: 'team-facing',
      excerpt: 'Strategic, decisive operator who prefers clear context before committing resources.',
    },
    {
      title: 'Personal Style',
      insightCount: 9,
      confidence: 94,
      sensitivityFlags: 0,
      classification: 'team-facing',
      excerpt: 'Direct, composed, and energized by complex problems with visible ownership.',
    },
    {
      title: 'Interacting with Others',
      insightCount: 8,
      confidence: 91,
      sensitivityFlags: 0,
      classification: 'team-facing',
      excerpt: 'Values concise dialogue, mutual preparation, and collaborators who challenge assumptions.',
    },
    {
      title: 'Decision Making',
      insightCount: 11,
      confidence: 95,
      sensitivityFlags: 1,
      classification: 'review required',
      excerpt: 'Balances data and instinct, then moves quickly once the tradeoffs are explicit.',
    },
    {
      title: 'Strengths',
      insightCount: 12,
      confidence: 93,
      sensitivityFlags: 0,
      classification: 'team-facing',
      excerpt: 'Pattern recognition, calm escalation, focus, and a strong bias for useful action.',
    },
    {
      title: 'Possible Weaknesses',
      insightCount: 7,
      confidence: 87,
      sensitivityFlags: 1,
      classification: 'private by default',
      excerpt: 'May under-explain rationale when speed feels more important than alignment.',
    },
    {
      title: 'Value to the Team',
      insightCount: 8,
      confidence: 92,
      sensitivityFlags: 0,
      classification: 'team-facing',
      excerpt: 'Creates clarity, raises standards, and translates ambiguity into executable priorities.',
    },
    {
      title: 'Effective Communications',
      insightCount: 9,
      confidence: 90,
      sensitivityFlags: 0,
      classification: 'team-facing',
      excerpt: 'Lead with the decision needed, share the constraints, and close with next actions.',
    },
    {
      title: 'Barriers to Effective Communication',
      insightCount: 7,
      confidence: 86,
      sensitivityFlags: 1,
      classification: 'review required',
      excerpt: 'Long preambles, unclear ownership, or emotional ambiguity may reduce engagement.',
    },
    {
      title: 'Blind Spots',
      insightCount: 6,
      confidence: 82,
      sensitivityFlags: 1,
      classification: 'private by default',
      excerpt: 'Can assume others share the same urgency or tolerance for incomplete information.',
    },
    {
      title: 'Ideal Environment',
      insightCount: 8,
      confidence: 91,
      sensitivityFlags: 0,
      classification: 'team-facing',
      excerpt: 'Autonomy, direct access to facts, capable peers, and permission to simplify complexity.',
    },
    {
      title: 'Managing the Leader',
      insightCount: 7,
      confidence: 89,
      sensitivityFlags: 0,
      classification: 'review required',
      excerpt: 'Bring options, recommendation, risks, and what you need from them in one pass.',
    },
    {
      title: 'Motivating the Leader',
      insightCount: 7,
      confidence: 90,
      sensitivityFlags: 0,
      classification: 'team-facing',
      excerpt: 'Connect work to impact, momentum, high standards, and visible progress against goals.',
    },
    {
      title: 'Management Style',
      insightCount: 9,
      confidence: 88,
      sensitivityFlags: 0,
      classification: 'review required',
      excerpt: 'Sets the outcome, gives room to operate, and intervenes when risk or drift appears.',
    },
    {
      title: 'Development Suggestions',
      insightCount: 8,
      confidence: 84,
      sensitivityFlags: 0,
      classification: 'private by default',
      excerpt: 'Practice slower context-setting and invite dissent before narrowing the decision path.',
    },
  ],
};

const uploadStates = [
  { label: 'Uploaded', detail: 'Document received', icon: CheckCircle2, state: 'complete' },
  { label: 'Extracting', detail: 'Mock parser simulated', icon: Sparkles, state: 'complete' },
  { label: 'Ready', detail: '15 profile sections mapped', icon: BadgeCheck, state: 'active' },
] as const;

const classificationMeta: Record<
  Classification,
  { icon: typeof Users; label: string; description: string }
> = {
  'team-facing': {
    icon: Users,
    label: 'team-facing',
    description: 'Safe to use in collaborative summaries',
  },
  'review required': {
    icon: Flag,
    label: 'review required',
    description: 'Human review recommended before sharing',
  },
  'private by default': {
    icon: LockKeyhole,
    label: 'private by default',
    description: 'Reserved for individual coaching context',
  },
};

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/profile-upload');

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#/profile-upload');

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleContinue = () => {
    window.location.hash = '#/intake';
  };

  if (route === '#/intake') {
    return (
      <main className="app-shell intake-view">
        <section className="intake-placeholder-card">
          <p className="eyebrow accent">Step 2 of 3</p>
          <h1>Intake Questionnaire</h1>
          <p>
            The upload CTA has moved this session into the intake flow. Questionnaire design can now
            build on the mock extraction context from the profile upload screen.
          </p>
          <button className="secondary-cta" type="button" onClick={() => (window.location.hash = '#/profile-upload')}>
            Back to Profile Upload
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <nav className="topbar" aria-label="Decision DNA progress">
          <div className="brand-lockup">
            <div className="brand-mark">
              <Fingerprint size={22} aria-hidden="true" />
            </div>
            <div>
              <p className="eyebrow">Decision DNA</p>
              <h1>Profile Upload</h1>
            </div>
          </div>
          <div className="progress-pill">
            <span>Step 1 of 3</span>
            <ChevronRight size={16} aria-hidden="true" />
            <strong>Extraction overview</strong>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow accent">Profile intelligence intake</p>
            <h2>Upload a leadership profile and review the extracted decision signals.</h2>
            <p>
              Decision DNA will use the profile as structured context for the intake questionnaire.
              Extraction is simulated with mock data for this release, so no real file parsing occurs yet.
            </p>
          </div>

          <aside className="trust-card" aria-label="Extraction assurance">
            <ShieldCheck size={28} aria-hidden="true" />
            <div>
              <strong>Trust-first extraction</strong>
              <span>Every section receives confidence, sensitivity, and sharing guidance.</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="workspace-grid" aria-label="Profile upload workspace">
        <div className="upload-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">Source document</p>
              <h3>Upload profile</h3>
            </div>
            <span className="status-chip ready">Ready</span>
          </div>

          <label className="dropzone" htmlFor="profile-upload">
            <input id="profile-upload" type="file" accept=".pdf,.txt,.md,.doc,.docx" />
            <div className="upload-orb">
              <UploadCloud size={34} aria-hidden="true" />
            </div>
            <strong>Drop a PDF or text-based profile here</strong>
            <span>Supports PDF, TXT, Markdown, DOC, and DOCX profile documents</span>
            <em>Mock upload active - this demo uses the sample extraction below.</em>
          </label>

          <div className="file-state" aria-label="Uploaded file state">
            <div className="file-icon">
              <FileText size={24} aria-hidden="true" />
            </div>
            <div>
              <strong>{mockExtraction.fileName}</strong>
              <span>{mockExtraction.fileType} - uploaded {mockExtraction.uploadedAt}</span>
            </div>
            <CheckCircle2 size={22} aria-label="Uploaded" />
          </div>

          <div className="processing-panel">
            <div className="processing-head">
              <div>
                <p className="eyebrow">Processing state</p>
                <strong>{mockExtraction.processingStep}</strong>
              </div>
              <span className="processing-badge">
                <Clock3 size={15} aria-hidden="true" />
                Simulated
              </span>
            </div>
            <div className="state-rail">
              {uploadStates.map((state) => {
                const Icon = state.icon;
                return (
                  <div className={`state-step ${state.state}`} key={state.label}>
                    <span>
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>{state.label}</strong>
                      <small>{state.detail}</small>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="metrics-stack">
          <MetricCard
            icon={Brain}
            label="Extracted insights"
            value={mockExtraction.extractedInsightCount.toString()}
            helper="Signals available for questionnaire personalization"
          />
          <MetricCard
            icon={Flag}
            label="Sensitivity flags"
            value={mockExtraction.sensitivityFlags.toString()}
            helper="Items marked for careful review"
          />
          <MetricCard
            icon={Gauge}
            label="Confidence score"
            value={`${mockExtraction.confidenceScore}%`}
            helper="Average confidence across section mapping"
          />

          <div className="classification-card">
            <p className="eyebrow">Classification badges</p>
            <div className="badge-list">
              {mockExtraction.classifications.map((classification) => {
                const meta = classificationMeta[classification];
                const Icon = meta.icon;
                return (
                  <div className={`classification-badge ${classification.replaceAll(' ', '-')}`} key={classification}>
                    <Icon size={17} aria-hidden="true" />
                    <div>
                      <strong>{meta.label}</strong>
                      <span>{meta.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-map-card">
        <div className="section-map-head">
          <div>
            <p className="eyebrow">Extraction overview</p>
            <h3>Structured profile section map</h3>
            <p>
              Each category is normalized into a reviewable profile block with confidence, sharing
              classification, and sensitivity context.
            </p>
          </div>
          <div className="map-summary">
            <strong>{mockExtraction.sections.length}</strong>
            <span>categories mapped</span>
          </div>
        </div>

        <div className="section-map">
          {mockExtraction.sections.map((section, index) => (
            <article className="section-card" key={section.title}>
              <div className="section-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="section-body">
                <div className="section-title-row">
                  <h4>{section.title}</h4>
                  <ClassificationBadge classification={section.classification} />
                </div>
                <p>{section.excerpt}</p>
                <div className="section-stats">
                  <span>
                    <MessageSquareText size={14} aria-hidden="true" />
                    {section.insightCount} insights
                  </span>
                  <span>
                    <Gauge size={14} aria-hidden="true" />
                    {section.confidence}% confidence
                  </span>
                  <span>
                    <Flag size={14} aria-hidden="true" />
                    {section.sensitivityFlags} flags
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-panel">
        <div>
          <p className="eyebrow accent">Next step</p>
          <h3>Continue with profile-aware intake questions.</h3>
          <p>
            The questionnaire can now build on these mock extracted insights and focus on validating
            decision patterns.
          </p>
        </div>
        <button className="primary-cta" type="button" onClick={handleContinue}>
          Continue to Intake Questionnaire
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </section>
    </main>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: typeof Brain;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <article className="metric-card">
      <div className="metric-icon">
        <Icon size={22} aria-hidden="true" />
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <p>{helper}</p>
      </div>
    </article>
  );
}

function ClassificationBadge({ classification }: { classification: Classification }) {
  const meta = classificationMeta[classification];
  const Icon = meta.icon;

  return (
    <span className={`mini-badge ${classification.replaceAll(' ', '-')}`}>
      <Icon size={13} aria-hidden="true" />
      {meta.label}
    </span>
  );
}

export default App;
