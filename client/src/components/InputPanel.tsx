import type { ChangeEvent } from 'react'
import type { PrepFormData } from '../types'

type InputPanelProps = {
  form: PrepFormData
  isLoading: boolean
  onChange: (field: keyof PrepFormData, value: string) => void
  onGenerate: () => void
}

type FieldProps = {
  label: string
  placeholder: string
  value: string
  rows?: number
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

function Field({ label, placeholder, value, rows, onChange }: FieldProps) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {rows != null ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </label>
  )
}

export function InputPanel({ form, isLoading, onChange, onGenerate }: InputPanelProps) {
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
        <Field
          label="Job Post"
          rows={6}
          placeholder="Paste the full Upwork job description…"
          value={form.jobPost}
          onChange={(e) => onChange('jobPost', e.target.value)}
        />

        <Field
          label="Client Message(s)"
          rows={4}
          placeholder="Invite messages, follow-ups, clarifications…"
          value={form.clientMessages}
          onChange={(e) => onChange('clientMessages', e.target.value)}
        />

        <Field
          label="Team Expertise"
          rows={3}
          placeholder="Stack, domains, past wins relevant to this lead…"
          value={form.teamExpertise}
          onChange={(e) => onChange('teamExpertise', e.target.value)}
        />

        <fieldset className="constraints">
          <legend>Constraints</legend>
          <div className="constraints-grid">
            <Field
              label="Budget"
              placeholder="e.g. $3–5k"
              value={form.budget}
              onChange={(e) => onChange('budget', e.target.value)}
            />
            <Field
              label="Timeline"
              placeholder="e.g. 4–6 weeks"
              value={form.timeline}
              onChange={(e) => onChange('timeline', e.target.value)}
            />
            <Field
              label="Collaboration model"
              placeholder="Fixed / hourly / milestone"
              value={form.collaborationModel}
              onChange={(e) => onChange('collaborationModel', e.target.value)}
            />
            <Field
              label="Timezone"
              placeholder="e.g. EST / UTC+3"
              value={form.timezone}
              onChange={(e) => onChange('timezone', e.target.value)}
            />
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
