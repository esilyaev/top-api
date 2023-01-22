import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateReviewDto } from './dto/review.dto'
import { ReviewDocument, ReviewModel } from './review.model'

@Injectable()
export class ReviewService {
  /**
   *
   */
  constructor(
    @InjectModel(ReviewModel.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewDocument> {
    return this.reviewModel.create(dto)
  }

  async delete(id: string): Promise<ReviewDocument> | null {
    return this.reviewModel.findByIdAndDelete(id).exec()
  }

  async findByProduct(id: string): Promise<ReviewDocument[]> | null {
    return this.reviewModel.find({ productId: id }).exec()
  }

  async deleteByProjectID(id: string) {
    return this.reviewModel.deleteMany({ productId: id })
  }
}
