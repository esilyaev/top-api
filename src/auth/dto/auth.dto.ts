import { IsEmail, IsString } from 'class-validator'

export class AuthDto {
  @IsEmail({}, { message: '123' })
  email: string

  @IsString({ message: '444' })
  password: string
}
