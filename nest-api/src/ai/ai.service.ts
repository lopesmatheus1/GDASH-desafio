import { Injectable } from '@nestjs/common'
import { GeminiService } from './providers/gemini.service'
import { WeatherLogDocument } from 'src/weather/schema/weather.schema'

@Injectable()
export class AiService {
  constructor(private readonly geminiService: GeminiService) {}

  async generateTendencyInsight(data: WeatherLogDocument[]): Promise<string> {
    return this.geminiService.generateContent(
      `
      Atue como um climatologista experiente analisando uma série temporal de 3 dias.
      
      OBJETIVO:
      Identificar a TENDÊNCIA MACRO do clima com base nos dados JSON fornecidos.
      Não descreva dia a dia. Identifique o "arco narrativo" do clima.

      DIRETRIZES DE ANÁLISE:
      1. Verifique a progressão da Temperatura:
         - Está "Subindo Gradualmente" (Aquecimento)?
         - Houve uma "Queda Brusca" (Frente fria)?
         - Manteve-se "Estável e Alta" ou "Estável e Baixa"?
         - Houve "Oscilação Intensa" (dias quentes e frios alternados)?
      2. Relacione com a Umidade e Chuva se houver dados.

      DIRETRIZES DE RESPOSTA (OUTPUT):
      - Escreva um parágrafo curto e direto (máximo 40 palavras).
      - Use linguagem natural, mas técnica.
      - Comece com a conclusão principal.
      
      EXEMPLOS DE ESTILO DESEJADO:
      - "A semana apresentou uma tendência consistente de aquecimento, com as temperaturas subindo cerca de 2°C por dia, culminando em um final de semana de calor intenso."
      - "Houve uma ruptura no padrão térmico na metade do período, marcada por uma queda brusca de temperatura seguida de estabilidade fria e úmida."
      - "O clima manteve-se estável e abafado durante todo o período, com pouca variação térmica e alta umidade constante."

      DADOS HISTÓRICOS (3 DIAS):
      ${JSON.stringify(data)}
      `
    )
  }
}
