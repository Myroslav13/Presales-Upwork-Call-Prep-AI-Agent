import type { PrepPlan } from '../types'
import { Section } from './Section'
import { CopyButton } from './CopyButton'
import { PanelHeader } from './PanelHeader'
import { ClientNeedsTabs } from './ClientNeedsTabs'

type Props = {
  plan: PrepPlan | null
  isLoading: boolean
  error?: string | null
}

export function ResultPanel({ plan, isLoading, error }: Props) {
  if (isLoading) {
    return (
      <section className="panel panel-result">
        <PanelHeader kicker="Output" title="Prepared Plan" />
        <div className="empty-state analyzing">
          <div className="pulse-ring" />
          <p>Analyzing job post and client context…</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="panel panel-result">
        <PanelHeader kicker="Output" title="Prepared Plan" />
        <div className="empty-state error-state" role="alert">
          <p>{error}</p>
        </div>
      </section>
    )
  }

  if (!plan) {
    return (
      <section className="panel panel-result">
        <PanelHeader
          kicker="Output"
          title="Prepared Plan"
          description="Your structured briefing will appear here after generation."
        />
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
      <PanelHeader
        kicker="Output"
        title="Prepared Plan"
        description="Structured briefing ready for your next client call."
      />

      <div className="result-stack">
        <Section title="Opportunity Summary" tone="success">
          <p>{plan.opportunitySummary}</p>
        </Section>

        <Section title="Client Needs Breakdown">
          <ClientNeedsTabs
            mainNeed={plan.mainNeed}
            hiddenNeeds={plan.hiddenNeeds}
          />
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
