import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTimestampsConfig } from 'mongoose'

export type AuthDocument = AuthModel & Document & SchemaTimestampsConfig

@Schema({ timestamps: true })
export class AuthModel {
  @Prop()
  email: string

  @Prop()
  password: string
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel)
