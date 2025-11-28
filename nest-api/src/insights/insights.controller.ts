import { Controller, Get } from '@nestjs/common'
import { InsightsService } from './insights.service'
import { WeatherService } from 'src/weather/weather.service'

@Controller('weather/insights')
export class InsightsController {
  constructor(
    private readonly insightsService: InsightsService,
    private readonly weatherService: WeatherService
  ) {}

  @Get('tendency')
  async getTendency() {
    //Pegar os dados dos ultimos 3 dias
    const start = new Date()
    const end = new Date()
    start.setDate(end.getDate() - 3)

    const logs = await this.weatherService.findByDateRange(start, end)

    const tendency = await this.insightsService.generateTendencyInsight(logs)

    await this.insightsService.saveTendencyInsight(tendency)
    return { tendency }
  }
}
