import { Injectable } from '@nestjs/common'
import { GeminiService } from './providers/gemini.service'
import { WeatherLogDocument } from 'src/weather/schema/weather.schema'

@Injectable()
export class AiService {
  constructor(private readonly geminiService: GeminiService) {}

  async generateTendencyInsight(data: WeatherLogDocument[]): Promise<string> {
    return this.geminiService.generateContent(
      `
    Atue como um especialista em análise de dados meteorológicos.
    OBJETIVO:
    Analise a série temporal de dados dos ultimos 7 dias fornecido abaixo e identifique a tendência (o padrão de mudança do início para o fim do período).

    REGRAS DE RESPOSTA:
    1. Responda APENAS em Português do Brasil.
    2. Seja direto e breve (estilo notificação de aplicativo).
    3. Use termos: "Em alta", "Em queda", "Estável" ou "Oscilando".
    4. Ignore pequenas flutuações irrelevantes (ruído nos dados).

    FORMATO OBRIGATÓRIO (Responda apenas com a lista abaixo):
    -  Temperatura: [Tendência]
    -  Umidade: [Tendência]
    -  Vento: [Tendência]
    -  Chuva: [Probabilidade aumentando/diminuindo/nula]
    -  Resumo Geral: [Uma frase curta de conclusão, ex: "O tempo está firmando e esquentando."]

    DADOS DE ENTRADA (Ordem cronológica):
    ${JSON.stringify(data)}
    `
    )
  }
}
