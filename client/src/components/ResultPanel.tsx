import { useState } from 'react'
import type { PrepPlan } from '../types'
import { Section } from './Section'
import { CopyButton } from './CopyButton'

type Props = {
  plan: PrepPlan | null
  isLoading: boolean
}

export function ResultPanel({ plan, isLoading }: Props) {
  const [needsTab, setNeedsTab] = useState<'main' | 'hidden'>('main')

  if (isLoading) {
    return (
      <section className="panel panel-result">
        <header className="panel-header">
          <p className="panel-kicker">Output</p>
          <h2>Prepared Plan</h2>
        </header>
        <div className="empty-state analyzing">
          <div className="pulse-ring" />
          <p>Analyzing job post and client context…</p>
        </div>
      </section>
    )
  }

  if (!plan) {
    return (
      <section className="panel panel-result">
        <header className="panel-header">
          <p className="panel-kicker">Output</p>
          <h2>Prepared Plan</h2>
          <p className="panel-desc">
            Your structured briefing will appear here after generation.
          </p>
        </header>
        <div className="empty-state">
          <p>Fill the left panel and hit Generate Prep Plan.</p>
        </div>
      </section>
    )
  }

  const questionsText = plan.discoveryQuestions
    .map((q, i) => `${i + 1}. ${q}`)
    .join('\n')

  return (
    <section className="panel panel-result">
      <header className="panel-header">
        <p className="panel-kicker">Output</p>
        <h2>Prepared Plan</h2>
        <p className="panel-desc">
          Structured briefing ready for your next client call.
        </p>
      </header>

      <div className="result-stack">
        <Section title="Opportunity Summary" tone="success">
          <p>{plan.opportunitySummary}</p>
        </Section>

        <Section title="Client Needs Breakdown">
          <div className="tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={needsTab === 'main'}
              className={needsTab === 'main' ? 'tab active' : 'tab'}
              onClick={() => setNeedsTab('main')}
            >
              Main Need
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={needsTab === 'hidden'}
              className={needsTab === 'hidden' ? 'tab active' : 'tab'}
              onClick={() => setNeedsTab('hidden')}
            >
              Possible Hidden Needs
            </button>
          </div>
          {needsTab === 'main' ? (
            <p className="tab-panel">{plan.mainNeed}</p>
          ) : (
            <ul className="tab-panel list">
              {plan.hiddenNeeds.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </Section>

        <Section
          title={`Discovery Questions (${plan.discoveryQuestions.length})`}
          action={<CopyButton text={questionsText} />}
        >
          <ol className="numbered-list">
            {plan.discoveryQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </Section>

        <Section
          title={`Risks / Red Flags (${plan.risks.length})`}
          tone="danger"
        >
          <ul className="risk-list">
            {plan.risks.map((risk) => (
              <li key={risk}>
                <span className="warn-icon" aria-hidden="true">
                  !
                </span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Suggested Positioning" tone="accent">
          <p>{plan.suggestedPositioning}</p>
        </Section>

        <Section title="Recommended Solution Approach">
          <p>{plan.solutionApproach}</p>
        </Section>

        <Section title="Call Strategy">
          <p>{plan.callStrategy}</p>
        </Section>

        <Section title="Final Prep Note" tone="accent">
          <p className="final-note">{plan.finalPrepNote}</p>
        </Section>
      </div>
    </section>
  )
}
