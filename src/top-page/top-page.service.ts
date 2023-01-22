import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { TopPageDocument, TopPageModel } from './top-page.model'

@Injectable()
export class TopPageService {
  /**
   *
   */
  constructor(
    @InjectModel(TopPageModel.name)
    private topPageModel: Model<TopPageDocument>,
  ) {}
}
