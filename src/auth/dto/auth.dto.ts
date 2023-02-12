import { IsEmail, IsString } from 'class-validator'
import { MISSING_EMAIL_FIELD } from '../auth.constant'

export class AuthDto {
  @IsEmail()
  email: string

  @IsString()
  password: string
}
