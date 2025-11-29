import { Injectable } from '@nestjs/common'
import { AiService } from 'src/ai/ai.service'
import { Insight, InsightDocument } from './schema/insights.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { WeatherService } from 'src/weather/weather.service'

const CACHE_TIME_MINUTES = 60

@Injectable()
export class InsightsService {
  constructor(
    private readonly aiService: AiService,
    private readonly weatherService: WeatherService,
    @InjectModel(Insight.name)
    private readonly insightModel: Model<InsightDocument>
  ) {}

  // O método pega a tendência, verificando o cache antes de gerar uma nova via IA
  async getTendencyInsight(): Promise<string> {
    const cachedInsight = await this.insightModel
      .findOne({ type: 'WEEKLY_TENDENCY' })
      .sort({ createdAt: -1 })
      .exec()

    if (cachedInsight) {
      const now = new Date().getTime()
      const created = new Date(cachedInsight.createdAt).getTime()
      const diffMinutes = (now - created) / 1000 / 60

      if (diffMinutes < CACHE_TIME_MINUTES) {
        console.log('Retornando tendência do Banco.')
        return cachedInsight.summary
      }
    }

    console.log('Cache Miss: Gerando nova tendência via IA...')
    return this.generateTendencyInsight()
  }

  // O método pega os avisos, verificando o cache antes de gerar uma nova via IA
  async getWarningsInsight(): Promise<string> {
    const cachedInsight = await this.insightModel
      .findOne({ type: 'WARNING' })
      .sort({ createdAt: -1 })
      .exec()

    if (cachedInsight) {
      const now = new Date().getTime()
      const created = new Date(cachedInsight.createdAt).getTime()
      const diffMinutes = (now - created) / 1000 / 60

      if (diffMinutes < CACHE_TIME_MINUTES) {
        console.log('Retornando avisos do Banco.')
        return cachedInsight.summary
      }
    }
    return this.generateWarningInsight()
  }

  async getDayClassificationInsight(): Promise<{
    summary: string
    score: number
  }> {
    const cachedInsight = await this.insightModel
      .findOne({ type: 'DAY_CLASSIFICATION' })
      .sort({ createdAt: -1 })
      .exec()

    if (cachedInsight) {
      const now = new Date().getTime()
      const created = new Date(cachedInsight.createdAt).getTime()
      const diffMinutes = (now - created) / 1000 / 60

      if (diffMinutes < CACHE_TIME_MINUTES) {
        console.log('Retornando classificação do dia do Banco.')
        return {
          summary: cachedInsight.summary,
          score: cachedInsight.score,
        }
      }
    }
    console.log('Cache Miss: Gerando nova classificação do dia via IA...')
    return this.generateDayClassificationInsight()
  }

  // Gera a classificação do dia via IA e salva no banco
  private async generateDayClassificationInsight(): Promise<{
    summary: string
    score: number
  }> {
    const lastLog = await this.weatherService.findPaginatedWeatherLogs(1, 1)
    const score = this.calculateComfortScore(
      lastLog.data[0].temperature,
      lastLog.data[0].humidity
    )
    const classification =
      await this.aiService.generateDayClassificationInsight(
        lastLog.data[0],
        score
      )
    await this.saveDayClassificationInsight(classification)
    return { summary: classification, score }
  }

  // Método privado auxiliar no InsightsService
  private calculateComfortScore(temp: number, humidity: number): number {
    // Ponto ideal: 24 graus, 50% humidade
    const tempDelta = Math.abs(temp - 24)
    const humDelta = Math.abs(humidity - 50)

    const penalty = tempDelta * 4 + humDelta * 0.5

    const score = 100 - penalty

    return Math.max(0, Math.min(100, Math.round(score)))
  }
  // Gera os avisos para o log das últimas 8 horas via IA e salva no banco
  private async generateWarningInsight(): Promise<string> {
    const last8Hourslogs = await this.weatherService.findPaginatedWeatherLogs(
      1,
      8
    )
    const warning = await this.aiService.generateWarningInsight(
      last8Hourslogs.data
    )
    await this.saveWarningInsight(warning)
    return warning
  }

  // Gera a tendência dos últimos 3 dias via IA e salva no banco
  private async generateTendencyInsight(): Promise<string> {
    const logs = await this.weatherService.findPaginatedWeatherLogs(1, 72)
    const tendencyText = await this.aiService.generateTendencyInsight(logs.data)
    await this.saveTendencyInsight(tendencyText)

    return tendencyText
  }

  private async saveWarningInsight(insight: string): Promise<InsightDocument> {
    return await this.insightModel.create({
      type: 'WARNING',
      summary: insight,
    })
  }

  private async saveTendencyInsight(insight: string): Promise<InsightDocument> {
    return await this.insightModel.create({
      type: 'WEEKLY_TENDENCY',
      summary: insight,
    })
  }

  private async saveDayClassificationInsight(
    insight: string
  ): Promise<InsightDocument> {
    return await this.insightModel.create({
      type: 'DAY_CLASSIFICATION',
      summary: insight,
    })
  }
}
