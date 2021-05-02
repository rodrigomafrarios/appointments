import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection, ObjectId } from 'mongodb'

let professionalAvailabilitySlotsCollection: Collection
let professionalsCollection: Collection

beforeAll(async () => {
  process.env.MONGO_URL = 'mongodb://localhost:27017/jest'
	await MongoHelper.connect(process.env.MONGO_URL)
})
afterAll(async () => {
	await MongoHelper.disconnect()
})
beforeEach(async () => {
	professionalAvailabilitySlotsCollection = await MongoHelper.getCollection('professional-availability-slots')
	await professionalAvailabilitySlotsCollection.deleteMany({})

  professionalsCollection = await MongoHelper.getCollection('professionals')
  await professionalsCollection.deleteMany({})
})

describe('POST /professional/:professional-id/availability-slot', () => {
  test('Should return 201 on success', async () => {
    const results = await professionalsCollection.insertOne({
      name: 'Rodrigo Mafra',
      telefone: '11999999999'
    })
    const id = results.ops[0]._id
    await request(app)
    .post(`/api/professional/${id}/availability-slot`)
    .send({
      start: "2021-05-01T22:00:00.000Z",
      end: "2021-05-01T23:00:00.000Z"
    })
    .expect(201)
  })
})

describe('GET /professional/:id/availability-slots', () => {
  test('Should return 200 on success', async () => {
    const results = await professionalsCollection.insertOne({
      name: 'Rodrigo Mafra',
      telefone: '11999999999'
    })
    const id = results.ops[0]._id

    await professionalAvailabilitySlotsCollection.insertOne({
      professionalId: new ObjectId(id),
      start: '2021-05-04T07:00:00.000Z',
      end: '2021-05-04T08:00:00.000Z',
      isAvailable: true
    })

    await request(app)
    .get(`/api/professional/${id}/availability-slots`)
    .expect(200)
  })

  test('Shoul return 400 if a wrong professional id provided ', async () => {
    await request(app)
    .get(`/api/professional/123/availability-slots`)
    .expect(400)
  })
})