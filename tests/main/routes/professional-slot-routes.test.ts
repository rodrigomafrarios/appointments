import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let collection: Collection

beforeAll(async () => {
  process.env.MONGO_URL = 'mongodb://localhost:27017/jest'
	await MongoHelper.connect(process.env.MONGO_URL)
})
afterAll(async () => {
	await MongoHelper.disconnect()
})
beforeEach(async () => {
	collection = await MongoHelper.getCollection('professional-availability-slot')
	await collection.deleteMany({})
})

describe('POST /professional/:professional-id/availability-slot', () => {
  test('Should return 201 on success', async () => {
    const id = 123
    await request(app)
    .post(`/api/professional/${id}/availability-slot`)
    .send({
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    })
    .expect(201)
  })
})