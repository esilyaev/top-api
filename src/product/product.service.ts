import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ProductDocument, ProductModel } from './product.model'

@Injectable()
export class ProductService {
  /**
   *
   */
  constructor(
    @InjectModel(ProductModel.name)
    private productModel: Model<ProductDocument>,
  ) {}
}
