import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ReviewModel } from './review.model';
@Controller('review')
export class ReviewController {
  @Post('create')
  async create(@Body() dto: Omit<ReviewModel, '_id'>) {}

  @Get(':id')
  async get(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async path(@Param('id') id: string, @Body() dto: ReviewModel) {}

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') id: string) {}
}
