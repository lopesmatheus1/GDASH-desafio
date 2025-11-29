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
      SE NÃO TIVER OS DADOS DE 3 DIAS, APENAS DE UMA CLASSIFICAÇÃO GERAL COM OS DADOS DISPONÍVEIS.
      
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
      - NÃO use introduções como "Condições normais:".
      - Não use ** OU "" EM SUAS RESPOSTAS.

      
      EXEMPLOS DE ESTILO DESEJADO:
      - "A semana apresentou uma tendência consistente de aquecimento, com as temperaturas subindo cerca de 2°C por dia, culminando em um final de semana de calor intenso."
      - "Houve uma ruptura no padrão térmico na metade do período, marcada por uma queda brusca de temperatura seguida de estabilidade fria e úmida."
      - "O clima manteve-se estável e abafado durante todo o período, com pouca variação térmica e alta umidade constante."
      

      DADOS HISTÓRICOS (3 DIAS):
      ${JSON.stringify(data)}
      `
    )
  }

  async generateWarningInsight(data: WeatherLogDocument[]): Promise<string> {
    return this.geminiService.generateContent(
      `
    Atue como um sistema de monitoramento de riscos climáticos em tempo real.
    Analise os logs climáticos recentes fornecidos abaixo.

    REGRAS DE CLASSIFICAÇÃO:
    - "Calor Extremo": Temperatura >= 32°C.
    - "Frio Intenso": Temperatura < 10°C.
    - "Alta Chance de Chuva": Umidade > 80% E queda de temperatura recente.
    - "Tempestade": Ventos fortes (se houver dado) ou mudanças bruscas de pressão/temperatura.
    - "Normal": Se nenhuma das condições acima for atendida.

      SAIDA:
    - Retorne apenas um texto corrido (máximo 30 palavras) dos riscos climáticos atuais.
    - Use linguagem clara e direta.
    - Não use ** OU "" EM SUAS RESPOSTAS.
    - NÃO use introduções como "Condições normais:".

    EXEMPLOS DE RESPOSTA:
    - "Calor extremo hoje, mantenha-se hidratado e evite exposição prolongada ao sol."
    - "Frio intenso para a noite, vista-se adequadamente para evitar hipotermia."
    - "Alta chance de chuva nas próximas horas, leve um guarda-chuva se sair."
    - "Condições normais de temperatura e umidade, sem riscos climáticos atuais."

    DADOS RECENTES:
  ${JSON.stringify(data)}`
    )
  }

  async generateDayClassificationInsight(
    weatherData: WeatherLogDocument,
    score: number
  ): Promise<string> {
    const prompt = `
    Atue como um "Lifestyle Coach" baseado em clima.
    
    DADOS ATUAIS:
    - Temperatura: ${weatherData.temperature}°C
    - Umidade: ${weatherData.humidity}%
    - Condição: ${weatherData.weatherCondition}
    - Vento: ${weatherData.windSpeed} km/h
    - Probabilidade de Chuva: ${weatherData.precipitationProbability}%
    - SCORE DE CONFORTO CALCULADO: ${score}/100
    
    TAREFA:
    Sugira uma atividade ideal para hoje baseada no Score e nos dados.
    
    REGRAS DO SCORE:
    - 80 a 100 (Verde): Perfeito para ar livre (Esportes, Parques).
    - 50 a 79 (Amarelo): Aceitável. Se houver vento/chuva, sugira proteção.
    - 0 a 49 (Vermelho): Desconfortável. Fique em casa (Filmes, Estudos, Café).

    SAÍDA OBRIGATÓRIA:
    Retorne APENAS UMA frase curta (máximo 20 palavras).
    - Seja motivador e direto.
    - Não use ** OU "" EM SUAS RESPOSTAS.
    - NÃO use introduções como "Minha sugestão é:".
    - Exemplo de resposta desejada: "O céu está limpo e o clime está agradável, aproveite para correr no parque ou realizar uma atividade ao ar livre!"
  `
    return await this.geminiService.generateContent(prompt)
  }
}
