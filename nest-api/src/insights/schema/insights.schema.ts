import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type InsightDocument = HydratedDocument<Insight>

export enum InsightType {
  WARNING = 'WARNING',
  DAY_CLASSIFICATION = 'DAY_CLASSIFICATION',
  WEEKLY_TENDENCY = 'WEEKLY_TENDENCY',
}

@Schema({ timestamps: true, collection: 'insights' })
export class Insight {
  @Prop({ required: true, enum: InsightType, index: true })
  type: InsightType

  @Prop({ required: true })
  summary: string

  @Prop({ required: false })
  score: number

  createdAt: Date
  updatedAt: Date
}

export const InsightSchema = SchemaFactory.createForClass(Insight)
