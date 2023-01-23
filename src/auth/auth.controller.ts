import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  /**
   *
   */
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.createUser(dto)
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: AuthDto) {}
}
