import { Body, Controller, Get } from '@nestjs/common'
import { InsightsService } from './insights.service'
import { GetInsightsDto } from './dto/get-insights.dto'
import { WeatherService } from 'src/weather/weather.service'

@Controller('weather/insights')
export class InsightsController {
  constructor(
    private readonly insightsService: InsightsService,
    private readonly weatherService: WeatherService
  ) {}

  @Get('averages')
  async generateInsights(@Body() body: GetInsightsDto) {
    const start = new Date(body.startDate)
    const end = new Date(body.endDate)

    end.setDate(end.getDate() + 1)

    const logs = await this.weatherService.findByDateRange(start, end)
    const countWeatherLogs = logs.length
    const average = await this.insightsService.calculateAverage(logs)
    const umidity = await this.insightsService.calculateUmidity(logs)

    return {
      averageTemperature: average,
      averageUmidity: umidity,
      countWeatherLogs,
    }
  }

  @Get('tendency')
  async getTendency() {
    //Pegar os dados dos últimos 7 dias
    const end = new Date()
    const start = new Date()
    start.setDate(end.getDate() - 7)

    const logs = await this.weatherService.findByDateRange(start, end)

    const tendency = await this.insightsService.generateTendencyInsight(logs)
    return { tendency }
  }
}
