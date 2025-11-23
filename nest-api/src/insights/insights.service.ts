import { Injectable } from '@nestjs/common'
import { AiService } from 'src/ai/ai.service'
import { WeatherLogDocument } from 'src/weather/schema/weather.schema'

@Injectable()
export class InsightsService {
  constructor(private readonly aiService: AiService) {}

  async calculateAverage(data: WeatherLogDocument[]): Promise<number> {
    if (data.length === 0) {
      return 0
    }

    const total = data.reduce((sum, item) => sum + item.temperature, 0)
    return total / data.length
  }

  async calculateUmidity(data: WeatherLogDocument[]): Promise<number> {
    if (data.length === 0) {
      return 0
    }
    const total = data.reduce((sum, item) => sum + item.humidity, 0)
    return total / data.length
  }

  async generateTendencyInsight(logs: WeatherLogDocument[]): Promise<string> {
    return this.aiService.generateTendencyInsight(logs)
  }
}
