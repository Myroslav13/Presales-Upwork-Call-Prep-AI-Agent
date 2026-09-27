export type PrepFormData = {
  jobPost: string
  clientMessages: string
  teamExpertise: string
  budget: string
  timeline: string
  collaborationModel: string
  timezone: string
}

export type ClientNeeds = {
  main: string
  hidden: string[]
}

export type PrepPlan = {
  opportunitySummary: string
  clientNeeds: ClientNeeds
  discoveryQuestions: string[]
  risks: string[]
  suggestedPositioning: string
  solutionApproach: string
  callStrategy: string
  finalPrepNote: string
}
