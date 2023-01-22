import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Types } from 'mongoose'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { CreateReviewDto } from '../src/review/dto/review.dto'
import { REVIEW_NOT_FOUND } from '../src/review/review.constants'

const productId = new Types.ObjectId().toHexString()
const invalidId = new Types.ObjectId().toHexString()

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

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/review/create (POST)', (done) => {
    request(app.getHttpServer())
      .post('/review/create')
      .send(mockDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id
        expect(createdId).toBeDefined()
        done()
      })
  })

  it('byProduct/:productId (get) - success', (done) => {
    request(app.getHttpServer())
      .get('/review/byProduct/' + productId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1)
        expect(body[0].productId).toBe(productId)
        done()
      })
  })

  it('byProduct/:productId (get) - failed', (done) => {
    request(app.getHttpServer())
      .get('/review/byProduct/' + invalidId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0)
        done()
      })
  })

  it('/review/:id (delete) - success', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdId)
      .expect(200)
  })

  it('/review/:id (delete) - failed', (done) => {
    request(app.getHttpServer())
      .delete('/review/' + invalidId)
      .expect(404)
      .then(({ body }: request.Response) => {
        expect(body.message).toBe(REVIEW_NOT_FOUND)
        done()
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
