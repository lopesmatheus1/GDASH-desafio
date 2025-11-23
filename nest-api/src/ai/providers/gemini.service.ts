import { Injectable } from '@nestjs/common'
import { GoogleGenAI } from '@google/genai' // Use the newer SDK
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY')
    this.ai = new GoogleGenAI({ apiKey })
  }

  async generateContent(prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    })

    if (!response.text) {
      throw new Error('No response from Gemini API')
    }

    return response.text
  }
}
