import { Module } from '@nestjs/common'
import { WeatherService } from './weather.service'
import { WeatherController } from './weather.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { WeatherLog, WeatherLogSchema } from './schema/weather.schema'
import { ExportModule } from 'src/export/export.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WeatherLog.name, schema: WeatherLogSchema },
    ]),
    ExportModule,
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
