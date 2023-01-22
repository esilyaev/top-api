import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ReviewModel, ReviewSchema } from 'src/review/review.model'
import { TopPageController } from './top-page.controller'
import { TopPageModel, TopPageSchema } from './top-page.model'
import { TopPageService } from './top-page.service'

@Module({
  controllers: [TopPageController],
  imports: [
    MongooseModule.forFeature([
      { name: TopPageModel.name, schema: TopPageSchema },
    ]),
  ],
  providers: [TopPageService],
})
export class TopPageModule {}
