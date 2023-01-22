import { Prop } from '@nestjs/mongoose'

export class BaseModel {
  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}
