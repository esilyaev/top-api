import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, SchemaTimestampsConfig } from 'mongoose'
import { BaseModel } from '../config/mongo.base'
import { ProductModel } from '../product/product.model'

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ProductModel.name })
  productId: ProductModel
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel)
