import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTimestampsConfig } from 'mongoose'
import { BaseModel } from '../config/mongo.base'

export type TopPageDocument = TopPageModel & Document & SchemaTimestampsConfig

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class HHData {
  @Prop()
  count: number

  @Prop()
  juniorSalary: number

  @Prop()
  middleSalary: number

  @Prop()
  seniorSalary: number
}

export class AdvantagesData {
  @Prop()
  title: string

  @Prop()
  description: string
}

@Schema({ timestamps: true })
export class TopPageModel extends BaseModel {
  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory

  @Prop()
  secondCategory: string

  @Prop()
  title: string

  @Prop()
  category: string

  @Prop(() => HHData)
  hh?: HHData

  @Prop(() => [AdvantagesData])
  advantages: AdvantagesData[]

  @Prop()
  seoText: string

  @Prop(() => [String])
  tags: string[]

  @Prop()
  tagsText: string
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel)
