import { Module } from '@nestjs/common'
import { AiService } from './ai.service'
import { GeminiService } from './providers/gemini.service'

@Module({
  providers: [AiService, GeminiService],
  exports: [AiService],
})
export class AiModule {}
