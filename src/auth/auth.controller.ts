import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
} from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator'
import { USER_ALREADY_EXISTS_ERROR } from './auth.constant'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
  /**
   *
   */
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.authService.findUser(dto.email)
    if (oldUser) {
      throw new BadRequestException(USER_ALREADY_EXISTS_ERROR)
    }

    return this.authService.createUser(dto)
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() { email, password }: AuthDto) {
    const user = await this.authService.validateUser(email, password)
    return this.authService.login(user.email)
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  @HttpCode(200)
  async list(@Request() req) {
    return this.authService.findAll()
  }
}
