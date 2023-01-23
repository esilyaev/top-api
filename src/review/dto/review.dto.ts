import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty({ message: 'Имя, сестра!' })
  name: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  body: string

  @IsNumber()
  @IsNotEmpty()
  rating: number

  @IsString()
  @IsNotEmpty()
  productId: string
}
