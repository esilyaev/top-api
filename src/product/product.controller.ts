import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { FindProductDto } from './dto/product.dto';
import { ProductModel } from './product.model';
@Controller('product')
export class ProductController {
  @Post('create')
  async create(@Body() dto: Omit<ProductModel, '_id'>) {}

  @Get(':id')
  async get(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async path(@Param('id') id: string, @Body() dto: ProductModel) {}

  @Post()
  @HttpCode(200)
  async find(@Body() dto: FindProductDto) {}
}
