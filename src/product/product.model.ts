import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTimestampsConfig } from 'mongoose'
import { BaseModel } from 'src/config/mongo.base'

export type ProductDocument = ProductModel & Document & SchemaTimestampsConfig

class ProductProperties {
  @Prop()
  name: string

  @Prop()
  value: string
}

@Schema({ timestamps: true })
export class ProductModel extends BaseModel {
  @Prop()
  image: string

  @Prop()
  title: string

  @Prop()
  price: number

  @Prop()
  oldPrice: number

  @Prop()
  credit: number

  @Prop()
  calculatedRating: number

  @Prop()
  description: string

  @Prop()
  advantages: string

  @Prop()
  disAdvantages: string

  @Prop({ type: () => [String] })
  categories: string[]

  @Prop({ type: () => [String] })
  tags: string[]

  @Prop({ type: () => [ProductProperties], _id: false })
  properties: ProductProperties[]
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel)
