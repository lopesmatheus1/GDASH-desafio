import { Module } from '@nestjs/common'
import { InsightsService } from './insights.service'
import { InsightsController } from './insights.controller'
import { WeatherModule } from 'src/weather/weather.module'
import { AiModule } from 'src/ai/ai.module'

@Module({
  controllers: [InsightsController],
  providers: [InsightsService],
  imports: [WeatherModule, AiModule],
})
export class InsightsModule {}
