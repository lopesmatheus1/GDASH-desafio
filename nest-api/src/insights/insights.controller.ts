import { Controller, Get } from '@nestjs/common'
import { InsightsService } from './insights.service'

@Controller('weather/insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Get('tendency')
  async getTendencyInsight() {
    const tendency = await this.insightsService.getTendencyInsight()

    return { tendency }
  }

  @Get('warning')
  async getWarningsInsight() {
    const warnings = await this.insightsService.getWarningsInsight()
    return { warnings }
  }

  @Get('day-classification')
  async getDayClassificationInsight() {
    const classification =
      await this.insightsService.getDayClassificationInsight()
    return classification
  }
}
