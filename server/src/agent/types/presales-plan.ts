export type ClientNeeds = {
  main: string;
  hidden: string[];
};

export type AnalysisStepResult = {
  opportunitySummary: string;
  clientNeeds: ClientNeeds;
  risks: string[];
};

export type StrategyStepResult = {
  suggestedPositioning: string;
  solutionApproach: string;
};

export type InterviewStepResult = {
  discoveryQuestions: string[];
  callStrategy: string;
  finalPrepNote: string;
};

export type PlanModels = {
  analysis: string;
  strategy: string;
  interview: string;
};

export type PresalesPlan = AnalysisStepResult &
  StrategyStepResult &
  InterviewStepResult & {
    models: PlanModels;
    durationMs: number;
  };
