import { Injectable } from '@nestjs/common'
import { HttpStatus } from '@nestjs/common/enums'
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { compare, genSaltSync, hashSync } from 'bcryptjs'
import { Model } from 'mongoose'
import {
  USER_NOT_FOUND_ERROR,
  USER_WRONG_PASSOWRD_ERROR as USER_WRONG_PASSWORD_ERROR,
} from './auth.constant'
import { AuthDto } from './dto/auth.dto'
import { UserDocument, UserModel } from './user.model'

@Injectable()
export class AuthService {
  /**
   *
   */
  constructor(
    @InjectModel(UserModel.name) private authModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<UserModel[]> {
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
    return this.authModel.findOne({ email }).exec()
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUser(email)
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR)
    }

    const isCorrectPassword = await compare(password, user.password)

    if (!isCorrectPassword) {
      throw new UnauthorizedException(USER_WRONG_PASSWORD_ERROR)
    }
    return { email: user.email }
  }

  async login(email: string) {
    const payload = { email }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
