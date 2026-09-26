import { Body, Controller, Post } from '@nestjs/common';
import { AgentService } from './agent.service.js';
import { AnalyzeRequestDto } from './dto/analyze-request.dto.js';

@Controller('api/agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('analyze')
  analyze(@Body() dto: AnalyzeRequestDto) {
    return this.agentService.generatePresalesPlan(dto);
  }
}
