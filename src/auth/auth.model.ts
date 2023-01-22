import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTimestampsConfig } from 'mongoose'
import { BaseModel } from 'src/config/mongo.base'

export type AuthDocument = AuthModel & Document & SchemaTimestampsConfig

@Schema({ timestamps: true })
export class AuthModel extends BaseModel {
  @Prop()
  email: string

  @Prop()
  password: string
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel)
