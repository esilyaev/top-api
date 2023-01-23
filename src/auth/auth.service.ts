import { Injectable } from '@nestjs/common'
import { HttpStatus } from '@nestjs/common/enums'
import { HttpException } from '@nestjs/common/exceptions'
import { InjectModel } from '@nestjs/mongoose'
import { genSaltSync, hashSync } from 'bcryptjs'
import { Model } from 'mongoose'
import { AuthDocument, AuthModel } from './auth.model'
import { AuthDto } from './dto/auth.dto'

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

  async createUser(dto: AuthDto) {
    const oldUser = await this.findUser(dto.email)

    if (oldUser) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST)
    }
    const salt = genSaltSync(10)
    const newUser = new this.authModel({
      email: dto.email,
      password: hashSync(dto.password, salt),
    })

    return newUser.save()
  }

  async findUser(email: string) {
    return this.authModel.findOne({ email })
  }
}
