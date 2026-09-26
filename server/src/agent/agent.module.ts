import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller.js';
import { AgentService } from './agent.service.js';
import { GeminiService } from './providers/gemini.service.js';

@Module({
  controllers: [AgentController],
  providers: [AgentService, GeminiService],
})
export class AgentModule {}
