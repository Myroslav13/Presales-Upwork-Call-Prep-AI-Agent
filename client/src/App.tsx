import { useState } from 'react'
import { InputPanel } from './components/InputPanel'
import { ResultPanel } from './components/ResultPanel'
import { MOCK_PLAN } from './mockPlan'
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

  function handleChange(field: keyof PrepFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleGenerate() {
    if (isLoading) return
    setIsLoading(true)
    setPlan(null)
    window.setTimeout(() => {
      setPlan(MOCK_PLAN)
      setIsLoading(false)
    }, 1800)
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
        <ResultPanel plan={plan} isLoading={isLoading} />
      </main>
    </div>
  )
}

export default App
