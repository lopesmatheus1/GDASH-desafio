import { Module } from '@nestjs/common'
import { InsightsService } from './insights.service'
import { InsightsController } from './insights.controller'
import { WeatherModule } from 'src/weather/weather.module'
import { AiModule } from 'src/ai/ai.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Insight, InsightSchema } from './schema/insights.schema'

@Module({
  controllers: [InsightsController],
  providers: [InsightsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Insight.name,
        schema: InsightSchema,
      },
    ]),
    WeatherModule,
    AiModule,
  ],
  exports: [InsightsService],
})
export class InsightsModule {}
