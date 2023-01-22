import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { disconnect, Types } from 'mongoose'
import { CreateReviewDto } from 'src/review/dto/review.dto'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

const productId = new Types.ObjectId().toHexString()

const mockDto: CreateReviewDto = {
  name: 'Тест',
  title: 'Заголовок',
  body: 'Описание отзыва тестовое',
  rating: 5,
  productId,
}

describe('AppController (e2e)', () => {
  let app: INestApplication
  let createdId: string

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(mockDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id
        expect(createdId).toBeDefined()
        // done()
      })
  })

  afterAll(() => {
    disconnect()
  })
})
