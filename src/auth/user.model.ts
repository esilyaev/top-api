import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsEmail, IsString } from 'class-validator'
import { Document, SchemaTimestampsConfig } from 'mongoose'
import { BaseModel } from '../config/mongo.base'

export type UserDocument = UserModel & Document & SchemaTimestampsConfig

@Schema({ timestamps: true })
export class UserModel extends BaseModel {
  @Prop({ unique: true })
  email: string

  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(UserModel)
