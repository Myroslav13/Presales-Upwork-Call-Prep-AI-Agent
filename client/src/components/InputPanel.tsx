import type { PrepFormData } from '../types'

type Props = {
  form: PrepFormData
  isLoading: boolean
  onChange: (field: keyof PrepFormData, value: string) => void
  onGenerate: () => void
}

export function InputPanel({ form, isLoading, onChange, onGenerate }: Props) {
  return (
    <aside className="panel panel-input">
      <header className="panel-header">
        <p className="panel-kicker">Input</p>
        <h2>Project &amp; Client</h2>
        <p className="panel-desc">
          Paste the job post, messages, and constraints. We turn them into a
          call-ready briefing.
        </p>
      </header>

      <form
        className="input-form"
        onSubmit={(e) => {
          e.preventDefault()
          onGenerate()
        }}
      >
        <label className="field">
          <span className="field-label">Job Post</span>
          <textarea
            rows={6}
            placeholder="Paste the full Upwork job description…"
            value={form.jobPost}
            onChange={(e) => onChange('jobPost', e.target.value)}
          />
        </label>

        <label className="field">
          <span className="field-label">Client Message(s)</span>
          <textarea
            rows={4}
            placeholder="Invite messages, follow-ups, clarifications…"
            value={form.clientMessages}
            onChange={(e) => onChange('clientMessages', e.target.value)}
          />
        </label>

        <label className="field">
          <span className="field-label">Team Expertise</span>
          <textarea
            rows={3}
            placeholder="Stack, domains, past wins relevant to this lead…"
            value={form.teamExpertise}
            onChange={(e) => onChange('teamExpertise', e.target.value)}
          />
        </label>

        <fieldset className="constraints">
          <legend>Constraints</legend>
          <div className="constraints-grid">
            <label className="field">
              <span className="field-label">Budget</span>
              <input
                type="text"
                placeholder="e.g. $3–5k"
                value={form.budget}
                onChange={(e) => onChange('budget', e.target.value)}
              />
            </label>
            <label className="field">
              <span className="field-label">Timeline</span>
              <input
                type="text"
                placeholder="e.g. 4–6 weeks"
                value={form.timeline}
                onChange={(e) => onChange('timeline', e.target.value)}
              />
            </label>
            <label className="field">
              <span className="field-label">Collaboration model</span>
              <input
                type="text"
                placeholder="Fixed / hourly / milestone"
                value={form.collaborationModel}
                onChange={(e) => onChange('collaborationModel', e.target.value)}
              />
            </label>
            <label className="field">
              <span className="field-label">Timezone</span>
              <input
                type="text"
                placeholder="e.g. EST / UTC+3"
                value={form.timezone}
                onChange={(e) => onChange('timezone', e.target.value)}
              />
            </label>
          </div>
        </fieldset>

        <div className="generate-block">
          <button type="submit" className="btn-generate" disabled={isLoading}>
            {isLoading ? 'Generating…' : 'Generate Prep Plan'}
          </button>
          {isLoading && (
            <p className="loader-line" aria-live="polite">
              <span className="loader-dot" />
              Analyzing…
            </p>
          )}
        </div>
      </form>
    </aside>
  )
}
