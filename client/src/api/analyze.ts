import axios from 'axios'
import type { PrepFormData, PrepPlan } from '../types'

type AnalyzeApiResponse = {
  opportunitySummary: string
  clientNeeds: {
    main: string
    hidden: string[]
  }
  risks: string[]
  suggestedPositioning: string
  solutionApproach: string
  discoveryQuestions: string[]
  callStrategy: string
  finalPrepNote: string
}

function buildPayload(form: PrepFormData) {
  const messages = form.clientMessages
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const constraints = {
    budget: form.budget.trim() || undefined,
    timeline: form.timeline.trim() || undefined,
    collaborationModel: form.collaborationModel.trim() || undefined,
    timezone: form.timezone.trim() || undefined,
  }

  const hasConstraints = Object.values(constraints).some(Boolean)

  return {
    jobPost: form.jobPost.trim(),
    clientMessages: messages.length ? messages : undefined,
    teamExpertise: form.teamExpertise.trim() || undefined,
    constraints: hasConstraints ? constraints : undefined,
  }
}

function mapToPrepPlan(data: AnalyzeApiResponse): PrepPlan {
  return {
    opportunitySummary: data.opportunitySummary,
    mainNeed: data.clientNeeds.main,
    hiddenNeeds: data.clientNeeds.hidden,
    discoveryQuestions: data.discoveryQuestions,
    risks: data.risks,
    suggestedPositioning: data.suggestedPositioning,
    solutionApproach: data.solutionApproach,
    callStrategy: data.callStrategy,
    finalPrepNote: data.finalPrepNote,
  }
}

export async function analyzeJob(form: PrepFormData): Promise<PrepPlan> {
  const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '')
  if (!baseUrl) {
    throw new Error('VITE_API_URL is not configured')
  }

  const { data } = await axios.post<AnalyzeApiResponse>(
    `${baseUrl}/api/agent/analyze`,
    buildPayload(form),
  )

  return mapToPrepPlan(data)
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message
    if (typeof message === 'string') return message
    if (Array.isArray(message)) return message.join(', ')
    if (!error.response) {
      return 'Cannot reach the API'
    }
    return error.message
  }
  if (error instanceof Error) return error.message
  return 'Something went wrong'
}
