import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateReviewDto } from './dto/review.dto'
import { REVIEW_NOT_FOUND } from './review.constants'
import { ReviewModel } from './review.model'
import { ReviewService } from './review.service'
@Controller('review')
export class ReviewController {
  /**
   *
   */
  constructor(private readonly reviewService: ReviewService) {}
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto)
  }

  @Get(':id')
  async get(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id)
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
  }

  @Patch(':id')
  async path(@Param('id') id: string, @Body() dto: ReviewModel) {}

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') id: string) {
    return this.reviewService.findByProduct(id)
  }
}
