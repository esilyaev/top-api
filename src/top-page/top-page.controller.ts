import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { FindTopPageDto } from './dto/top-page.dto'
import { TopPageModel } from './top-page.model'
@Controller('top-page')
export class TopPageController {
  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, '_id'>) {}

  @Get(':id')
  async get(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async path(@Param('id') id: string, @Body() dto: TopPageModel) {}

  @Post()
  @HttpCode(200)
  async find(@Body('productId') dto: FindTopPageDto) {}
}
