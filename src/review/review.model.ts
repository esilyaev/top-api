import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTimestampsConfig } from 'mongoose'
import { BaseModel } from 'src/config/mongo.base'

export type ReviewDocument = ReviewModel & Document & SchemaTimestampsConfig

@Schema({ timestamps: true })
export class ReviewModel extends BaseModel {
  @Prop()
  name: string

  @Prop()
  title: string

  @Prop()
  body: string

  @Prop()
  rating: number
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel)
