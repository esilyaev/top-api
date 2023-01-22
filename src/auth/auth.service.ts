import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AuthDocument, AuthModel } from './auth.model'

@Injectable()
export class AuthService {
  /**
   *
   */
  constructor(
    @InjectModel(AuthModel.name) private authModel: Model<AuthDocument>,
  ) {}

  async findAll(): Promise<AuthModel[]> {
    return this.authModel.find().exec()
  }
}
