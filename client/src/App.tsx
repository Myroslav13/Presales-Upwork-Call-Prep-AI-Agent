import { useState } from 'react'
import { analyzeJob, getApiErrorMessage } from './api/analyze'
import { InputPanel } from './components/InputPanel'
import { ResultPanel } from './components/ResultPanel'
import type { PrepFormData, PrepPlan } from './types'
import './App.css'

const EMPTY_FORM: PrepFormData = {
  jobPost: '',
  clientMessages: '',
  teamExpertise: '',
  budget: '',
  timeline: '',
  collaborationModel: '',
  timezone: '',
}

function App() {
  const [form, setForm] = useState<PrepFormData>(EMPTY_FORM)
  const [plan, setPlan] = useState<PrepPlan | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(field: keyof PrepFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleGenerate() {
    if (isLoading) return
    if (!form.jobPost.trim()) {
      setError('Job Post is required')
      return
    }

    setIsLoading(true)
    setPlan(null)
    setError(null)

    try {
      const result = await analyzeJob(form)
      setPlan(result)
    } catch (err) {
      setError(getApiErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <p className="brand-name">CallPrep</p>
            <p className="brand-tag">Upwork presales agent</p>
          </div>
        </div>
      </header>

      <main className="workspace">
        <InputPanel
          form={form}
          isLoading={isLoading}
          onChange={handleChange}
          onGenerate={handleGenerate}
        />
        <ResultPanel plan={plan} isLoading={isLoading} error={error} />
      </main>
    </div>
  )
}

export default App
