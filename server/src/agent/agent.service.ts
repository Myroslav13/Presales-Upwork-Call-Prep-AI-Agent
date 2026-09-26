import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AnalyzeRequestDto } from './dto/analyze-request.dto.js';
import { GeminiService } from './providers/gemini.service.js';
import type {
  AnalysisStepResult,
  InterviewStepResult,
  PresalesPlan,
  StrategyStepResult,
} from './types/presales-plan.js';

@Injectable()
export class AgentService {
  constructor(private readonly geminiService: GeminiService) {}

  async generatePresalesPlan(dto: AnalyzeRequestDto): Promise<PresalesPlan> {
    const startedAt = Date.now();

    const { data: analysis, model: analysisModel } =
      await this.runAnalysis(dto);
    const { data: strategy, model: strategyModel } = await this.runStrategy(
      dto,
      analysis,
    );
    const { data: interview, model: interviewModel } =
      await this.runInterview(analysis, strategy);

    return {
      ...analysis,
      ...strategy,
      ...interview,
      models: {
        analysis: analysisModel,
        strategy: strategyModel,
        interview: interviewModel,
      },
      durationMs: Date.now() - startedAt,
    };
  }

  private async runAnalysis(
    dto: AnalyzeRequestDto,
  ): Promise<{ data: AnalysisStepResult; model: string }> {
    const systemPrompt = 
      `You are a Presales analyst. Analyze job post + client messages.
      Return ONLY compact JSON:
      {"opportunitySummary":"1-2 sentences","clientNeeds":{"main":"string","hidden":["2-3 items"]},"risks":["3-5 short items"]}
      Keep every string short. No fluff.`;

    const messages =
      dto.clientMessages?.filter(Boolean).join('\n---\n') || 'None provided';

    const userPrompt = 
      `Job post:
      ${dto.jobPost}

      Client messages:
      ${messages}`;

    const { content, model } = await this.geminiService.callModel(
      systemPrompt,
      userPrompt,
      true,
    );

    return {
      data: this.parseJson<AnalysisStepResult>(content, 'analysis'),
      model,
    };
  }

  private async runStrategy(
    dto: AnalyzeRequestDto,
    analysis: AnalysisStepResult,
  ): Promise<{ data: StrategyStepResult; model: string }> {
    const systemPrompt = 
      `You are a Solution strategist. Use prior analysis + expertise + constraints.
      Return ONLY compact JSON:
      {"suggestedPositioning":"2-3 sentences","solutionApproach":"2-3 sentences"}
      Stay realistic. Do not invent credentials. Keep text short.`;

    const constraints = dto.constraints
      ? JSON.stringify(dto.constraints, null, 2)
      : 'None provided';

    const userPrompt = 
      `Prior analysis:
      ${JSON.stringify(analysis, null, 2)}

      Team expertise:
      ${dto.teamExpertise || 'None provided'}

      Constraints:
      ${constraints}`;

    const { content, model } = await this.geminiService.callModel(
      systemPrompt,
      userPrompt,
      true,
    );

    return {
      data: this.parseJson<StrategyStepResult>(content, 'strategy'),
      model,
    };
  }

  private async runInterview(
    analysis: AnalysisStepResult,
    strategy: StrategyStepResult,
  ): Promise<{ data: InterviewStepResult; model: string }> {
    const systemPrompt = 
      `You are a Discovery-call coach. Use analysis + strategy.
      Return ONLY compact JSON:
      {"discoveryQuestions":["5-7 short questions"],"callStrategy":"2-3 sentences","finalPrepNote":"1-2 sentences"}
      Keep every string short.`;

    const userPrompt = 
      `Analysis:
      ${JSON.stringify(analysis, null, 2)}

      Strategy:
      ${JSON.stringify(strategy, null, 2)}`;

    const { content, model } = await this.geminiService.callModel(
      systemPrompt,
      userPrompt,
      true,
    );

    return {
      data: this.parseJson<InterviewStepResult>(content, 'interview'),
      model,
    };
  }

  private parseJson<T>(raw: string, step: string): T {
    try {
      return JSON.parse(raw) as T;
    } catch {
      throw new InternalServerErrorException(
        `Failed to parse JSON from ${step} step`,
      );
    }
  }
}
