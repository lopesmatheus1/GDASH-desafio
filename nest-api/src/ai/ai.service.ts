import { Injectable } from '@nestjs/common'
import { GeminiService } from './providers/gemini.service'
import { WeatherLogDocument } from 'src/weather/schema/weather.schema'

@Injectable()
export class AiService {
  constructor(private readonly geminiService: GeminiService) {}

  async generateTendencyInsight(data: WeatherLogDocument[]): Promise<string> {
    return this.geminiService.generateContent(
      `
    Atue como um meteorologista objetivo.
    Analise os dados abaixo e escreva um ÚNICO parágrafo resumindo o comportamento do clima no período.

    DIRETRIZES DE ESTILO:
    - Comece a frase contextualizando o período (ex: "Nos últimos registros...", "Recentemente...").
    - NÃO use listas ou tópicos. Escreva um texto corrido.
    - Use conectivos para relacionar as variáveis (ex: "enquanto a temperatura subiu, a umidade caiu...").
    - Seja direto: Fale o que aconteceu com Temperatura, Umidade e Vento.
    - Termine com uma conclusão sobre a sensação térmica ou chance de chuva.
    DADOS:
    ${JSON.stringify(data)}
    `
    )
  }
}
