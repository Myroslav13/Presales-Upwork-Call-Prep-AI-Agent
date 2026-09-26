import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

const MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-3.8-flash',
];
const MAX_ATTEMPTS = 3;
const BASE_DELAY_MS = 1500;

export type GeminiCallResult = {
  content: string;
  model: string;
};

@Injectable()
export class GeminiService {
  private readonly client: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async callModel(
    systemPrompt: string,
    userPrompt: string,
    useJson = true,
  ): Promise<GeminiCallResult> {
    let lastError: unknown;

    for (const modelName of MODELS) {
      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
          const content = await this.generate(
            modelName,
            systemPrompt,
            userPrompt,
            useJson,
          );
          return { content, model: modelName };
        } catch (error) {
          lastError = error;
          if (error instanceof InternalServerErrorException) {
            throw error;
          }
          if (!this.isRetryable(error) || attempt === MAX_ATTEMPTS) {
            break;
          }
          await this.sleep(BASE_DELAY_MS * attempt);
        }
      }
    }

    const message =
      lastError instanceof Error ? lastError.message : 'Gemini request failed';
    throw new InternalServerErrorException(message);
  }

  private async generate(
    modelName: string,
    systemPrompt: string,
    userPrompt: string,
    useJson: boolean,
  ): Promise<string> {
    const model = this.client.getGenerativeModel({
      model: modelName,
      systemInstruction: systemPrompt,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1024,
        ...(useJson ? { responseMimeType: 'application/json' as const } : {}),
      },
    });

    const result = await model.generateContent(userPrompt);
    const content = result.response.text();

    if (!content) {
      throw new InternalServerErrorException('Empty response from Gemini');
    }

    return content;
  }

  private isRetryable(error: unknown): boolean {
    const message = error instanceof Error ? error.message : String(error);
    return (
      message.includes('[503') ||
      message.includes('[429') ||
      message.includes('high demand') ||
      message.includes('Resource exhausted')
    );
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
