import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type WeatherLogDocument = HydratedDocument<
  WeatherLog & { createdAt: Date; updatedAt: Date }
>

@Schema({ timestamps: true })
export class WeatherLog {
  @Prop({ required: true })
  temperature: number

  @Prop({ required: true })
  humidity: number

  @Prop({ required: true })
  windSpeed: number

  @Prop({ required: true })
  weatherCondition: string

  @Prop({ required: true })
  weatherCode: number

  @Prop({ required: true })
  precipitationProbability: number
}

export const WeatherLogSchema = SchemaFactory.createForClass(WeatherLog)
