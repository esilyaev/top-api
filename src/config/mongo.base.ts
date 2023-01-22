import { Prop } from '@nestjs/mongoose'
import mongoose from 'mongoose'

export class BaseModel {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}
