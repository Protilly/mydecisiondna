import { useMemo, useState } from "react";
import {
  REVIEW_STEP_ID,
  intakeSections,
  type FieldType,
  type IntakeQuestion,
  type IntakeResponses,
  type IntakeSection,
  type IntakeValue,
} from "./intakeData";
import "./styles.css";

const reviewStepIndex = intakeSections.length;
const stepItems = [...intakeSections, { id: REVIEW_STEP_ID, title: "Review", questions: [] }];

function getInitialValue(question: IntakeQuestion): IntakeValue {
  switch (question.type) {
    case "number":
      return "";
    case "slider":
      return Math.round((question.min + question.max) / 2);
    case "multiSelect":
    case "rankedList":
      return [];
    case "checklistBuilder":
      return question.suggestions ?? [];
    case "shortText":
    case "longText":
    case "singleSelect":
      return "";
  }
}

function buildInitialResponses(): IntakeResponses {
  return intakeSections.reduce<IntakeResponses>((responses, section) => {
    section.questions.forEach((question) => {
      responses[question.id] = getInitialValue(question);
    });
    return responses;
  }, {});
}

function App() {
  const [responses, setResponses] = useState<IntakeResponses>(() => buildInitialResponses());
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const totalPrompts = intakeSections.reduce((count, section) => count + section.questions.length, 0);
  const answeredPrompts = useMemo(
    () =>
      intakeSections
        .flatMap((section) => section.questions)
        .filter((question) => hasResponse(responses[question.id], question.type)).length,
    [responses],
  );

  const progress = Math.round(((currentStep + 1) / stepItems.length) * 100);
  const activeSection = intakeSections[currentStep];
  const isReviewStep = currentStep === reviewStepIndex;

  function updateResponse(questionId: string, nextValue: IntakeValue) {
    setResponses((current) => ({
      ...current,
      [questionId]: nextValue,
    }));
    setSubmitted(false);
  }

  function goNext() {
    setCurrentStep((step) => Math.min(step + 1, reviewStepIndex));
  }

  function goPrevious() {
    setCurrentStep((step) => Math.max(step - 1, 0));
    setSubmitted(false);
  }

  return (
    <main className="app-shell">
      <section className="intake-card" aria-labelledby="page-title">
        <header className="hero">
          <div>
            <p className="eyebrow">Decision DNA Intake</p>
            <h1 id="page-title">Capture the leadership context behind better decisions.</h1>
            <p className="hero-copy">
              A focused intake for priorities, risks, decision norms, team context, and privacy boundaries before Leader Review.
            </p>
          </div>
          <div className="submission-pill" aria-live="polite">
            {submitted ? "Draft generation ready" : `${answeredPrompts}/${totalPrompts} prompts started`}
          </div>
        </header>

        <div className="layout">
          <aside className="sidebar" aria-label="Questionnaire progress">
            <div className="progress-summary">
              <div className="progress-topline">
                <span>
                  Step {currentStep + 1} of {stepItems.length}
                </span>
                <span>{progress}%</span>
              </div>
              <div className="progress-track" aria-hidden="true">
                <div className="progress-bar" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <nav className="step-list" aria-label="Intake sections">
              {stepItems.map((step, index) => (
                <button
                  className={`step-button ${index === currentStep ? "active" : ""}`}
                  key={step.id}
                  type="button"
                  onClick={() => {
                    setCurrentStep(index);
                    setSubmitted(false);
                  }}
                >
                  <span className="step-number">{index + 1}</span>
                  <span>
                    <span className="step-label">{step.title}</span>
                    <span className="step-meta">{index === reviewStepIndex ? "Final summary" : `${step.questions.length} prompts`}</span>
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          <section className="content" aria-live="polite">
            {isReviewStep ? (
              <ReviewStep responses={responses} submitted={submitted} onEditSection={setCurrentStep} />
            ) : (
              <SectionStep section={activeSection} responses={responses} onChange={updateResponse} />
            )}

            <footer className="navigation-bar">
              <button className="secondary-button" type="button" onClick={goPrevious} disabled={currentStep === 0}>
                Previous
              </button>
              <p className="save-indicator">Progress is saved in local component state while you navigate.</p>
              {isReviewStep ? (
                <button className="primary-button" type="button" onClick={() => setSubmitted(true)}>
                  Generate Leader Review Draft
                </button>
              ) : (
                <button className="primary-button" type="button" onClick={goNext}>
                  Next
                </button>
              )}
            </footer>
          </section>
        </div>
      </section>
    </main>
  );
}

function SectionStep({
  section,
  responses,
  onChange,
}: {
  section: IntakeSection;
  responses: IntakeResponses;
  onChange: (questionId: string, nextValue: IntakeValue) => void;
}) {
  return (
    <>
      <header className="section-header">
        <p className="section-kicker">{section.eyebrow}</p>
        <h2>{section.title}</h2>
        <p className="section-description">{section.description}</p>
      </header>

      <div className="form-grid">
        {section.questions.map((question) => (
          <QuestionField
            key={question.id}
            question={question}
            value={responses[question.id]}
            onChange={(nextValue) => onChange(question.id, nextValue)}
          />
        ))}
      </div>
    </>
  );
}

function QuestionField({
  question,
  value,
  onChange,
}: {
  question: IntakeQuestion;
  value: IntakeValue;
  onChange: (nextValue: IntakeValue) => void;
}) {
  return (
    <article className="field-card">
      <div className="field-label-row">
        <label className="field-label" htmlFor={question.id}>
          {question.label}
        </label>
      </div>
      {question.helperText ? <p className="helper-text">{question.helperText}</p> : null}
      <FieldControl question={question} value={value} onChange={onChange} />
    </article>
  );
}

function FieldControl({
  question,
  value,
  onChange,
}: {
  question: IntakeQuestion;
  value: IntakeValue;
  onChange: (nextValue: IntakeValue) => void;
}) {
  switch (question.type) {
    case "shortText":
      return (
        <input
          id={question.id}
          type="text"
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
          placeholder={question.placeholder}
        />
      );
    case "longText":
      return (
        <textarea
          id={question.id}
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
          placeholder={question.placeholder}
          rows={4}
        />
      );
    case "number":
      return (
        <input
          id={question.id}
          type="number"
          value={String(value)}
          min={question.min}
          max={question.max}
          onChange={(event) => onChange(event.target.value)}
          placeholder={question.placeholder}
        />
      );
    case "singleSelect":
      return (
        <select id={question.id} value={String(value)} onChange={(event) => onChange(event.target.value)}>
          <option value="">Select one</option>
          {question.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "multiSelect":
      return <MultiSelect options={question.options} value={asStringArray(value)} onChange={onChange} />;
    case "rankedList":
      return <RankedList options={question.options} value={asStringArray(value)} onChange={onChange} />;
    case "slider":
      return (
        <div className="slider-control">
          <input
            id={question.id}
            type="range"
            min={question.min}
            max={question.max}
            step={question.step ?? 1}
            value={Number(value)}
            onChange={(event) => onChange(Number(event.target.value))}
          />
          <div className="slider-scale">
            <span>{question.minLabel ?? question.min}</span>
            <strong>{value}</strong>
            <span>{question.maxLabel ?? question.max}</span>
          </div>
        </div>
      );
    case "checklistBuilder":
      return (
        <ChecklistBuilder
          id={question.id}
          value={asStringArray(value)}
          onChange={onChange}
          placeholder={question.placeholder}
          suggestions={question.suggestions}
        />
      );
  }
}

function MultiSelect({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (nextValue: IntakeValue) => void;
}) {
  function toggle(option: string) {
    onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option]);
  }

  return (
    <div className="option-grid">
      {options.map((option) => (
        <button key={option} className={`option-pill ${value.includes(option) ? "selected" : ""}`} type="button" onClick={() => toggle(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}

function RankedList({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (nextValue: IntakeValue) => void;
}) {
  const availableOptions = options.filter((option) => !value.includes(option));

  function addOption(option: string) {
    if (value.length < 3) {
      onChange([...value, option]);
    }
  }

  function moveOption(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= value.length) {
      return;
    }
    const reordered = [...value];
    const [item] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, item);
    onChange(reordered);
  }

  return (
    <div className="ranked-control">
      <ol className="ranked-list">
        {value.length ? (
          value.map((item, index) => (
            <li key={item}>
              <span className="rank-number">{index + 1}</span>
              <span>{item}</span>
              <div className="rank-actions">
                <button type="button" onClick={() => moveOption(index, -1)} disabled={index === 0}>
                  Up
                </button>
                <button type="button" onClick={() => moveOption(index, 1)} disabled={index === value.length - 1}>
                  Down
                </button>
                <button type="button" onClick={() => onChange(value.filter((selected) => selected !== item))}>
                  Remove
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="empty-state">Choose up to three items in priority order.</li>
        )}
      </ol>

      {value.length < 3 ? (
        <div className="option-grid compact">
          {availableOptions.map((option) => (
            <button key={option} className="option-pill" type="button" onClick={() => addOption(option)}>
              Add {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ChecklistBuilder({
  id,
  value,
  onChange,
  placeholder,
  suggestions = [],
}: {
  id: string;
  value: string[];
  onChange: (nextValue: IntakeValue) => void;
  placeholder?: string;
  suggestions?: string[];
}) {
  const [draft, setDraft] = useState("");

  function updateItem(index: number, nextValue: string) {
    onChange(value.map((item, itemIndex) => (itemIndex === index ? nextValue : item)));
  }

  function addDraft() {
    const trimmedDraft = draft.trim();
    if (!trimmedDraft) {
      return;
    }
    onChange([...value, trimmedDraft]);
    setDraft("");
  }

  return (
    <div className="checklist-builder">
      {value.map((item, index) => (
        <div className="checklist-row" key={`${item}-${index}`}>
          <input
            aria-label={`Checklist item ${index + 1}`}
            type="text"
            value={item}
            onChange={(event) => updateItem(index, event.target.value)}
          />
          <button type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}>
            Remove
          </button>
        </div>
      ))}

      <div className="add-row">
        <input
          id={id}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addDraft();
            }
          }}
          placeholder={placeholder ?? "Add an item"}
        />
        <button type="button" onClick={addDraft}>
          Add
        </button>
      </div>

      <div className="suggestion-row" aria-label="Suggested checklist items">
        {suggestions
          .filter((suggestion) => !value.includes(suggestion))
          .map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => onChange([...value, suggestion])}>
              + {suggestion}
            </button>
          ))}
      </div>
    </div>
  );
}

function ReviewStep({
  responses,
  submitted,
  onEditSection,
}: {
  responses: IntakeResponses;
  submitted: boolean;
  onEditSection: (sectionIndex: number) => void;
}) {
  return (
    <>
      <header className="section-header">
        <p className="section-kicker">Final check</p>
        <h2>Review your Decision DNA intake</h2>
        <p className="section-description">Scan the summary, edit any section, then generate a local Leader Review draft state.</p>
      </header>

      {submitted ? (
        <div className="submission-banner" role="status">
          <strong>Leader Review draft generation is ready.</strong>
          <span>Your intake remains local in this prototype and can now feed the next review state.</span>
        </div>
      ) : null}

      <div className="review-grid">
        {intakeSections.map((section, sectionIndex) => (
          <article className="review-card" key={section.id}>
            <div className="review-card-header">
              <h3>{section.title}</h3>
              <button type="button" onClick={() => onEditSection(sectionIndex)}>
                Edit
              </button>
            </div>
            <dl>
              {section.questions.map((question) => (
                <div key={question.id}>
                  <dt>{question.label}</dt>
                  <dd>{formatResponse(responses[question.id], question.type)}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </>
  );
}

function asStringArray(value: IntakeValue): string[] {
  return Array.isArray(value) ? value : [];
}

function hasResponse(value: IntakeValue, type: FieldType): boolean {
  if (type === "slider") {
    return true;
  }
  if (Array.isArray(value)) {
    return value.some((item) => item.trim().length > 0);
  }
  return String(value).trim().length > 0;
}

function formatResponse(value: IntakeValue, type: FieldType): string {
  if (Array.isArray(value)) {
    const filteredValue = value.filter((item) => item.trim().length > 0);
    if (!filteredValue.length) {
      return "Not provided";
    }
    if (type === "rankedList") {
      return filteredValue.map((item, index) => `${index + 1}. ${item}`).join("\n");
    }
    return filteredValue.join("\n");
  }
  return String(value).trim() || "Not provided";
}

export default App;
