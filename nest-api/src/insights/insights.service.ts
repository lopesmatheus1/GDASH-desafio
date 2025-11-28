import { Injectable } from '@nestjs/common'
import { AiService } from 'src/ai/ai.service'
import { WeatherLogDocument } from 'src/weather/schema/weather.schema'
import { Insight, InsightDocument } from './schema/insights.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { WeatherService } from 'src/weather/weather.service'

@Injectable()
export class InsightsService {
  constructor(
    private readonly aiService: AiService,
    private readonly weatherService: WeatherService,
    @InjectModel(Insight.name)
    private readonly insightModel: Model<InsightDocument>
  ) {}

  getSmartTendency() {}
  async generateTendencyInsight(logs: WeatherLogDocument[]): Promise<string> {
    return this.aiService.generateTendencyInsight(logs)
  }

  async saveTendencyInsight(insight: string): Promise<InsightDocument> {
    return await this.insightModel.create({
      type: 'WEEKLY_TENDENCY',
      summary: insight,
    })
  }
}
