import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let professionalAvailabilitySlotsCollection: Collection
let professionalsCollection: Collection

describe('Booking Routes', () => {
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

  describe('POST /booking', () => {
    test('Should return 201 on success', async () => {
      const results = await professionalsCollection.insertOne({
        name: 'Rodrigo Mafra',
        telefone: '11999999999'
      })
      const id = results.ops[0]._id
      await request(app)
      .post(`/api/booking`)
      .send({
        professionalId: id,
        customerName: 'Mafra',
        start: "2021-05-01T22:00:00.000Z",
        end: "2021-05-01T23:00:00.000Z"
      })
      .expect(201)
    })

    test('Should return 400 with wrong professionalId', async () => {
      await request(app)
      .post(`/api/booking`)
      .send({
        professionalId: 'id',
        customerName: 'Mafra',
        start: "2021-05-01T22:00:00.000Z",
        end: "2021-05-01T23:00:00.000Z"
      })
      .expect(400)
    })

    test('Should return 400 with invalid slot', async () => {
      const results = await professionalsCollection.insertOne({
        name: 'Rodrigo Mafra',
        telefone: '11999999999'
      })
      const id = results.ops[0]._id
      await request(app)
      .post(`/api/booking`)
      .send({
        professionalId: id,
        customerName: 'Mafra',
        start: "2021-05-01T22:33:00.000Z",
        end: "2021-05-01T23:00:00.000Z"
      })
      .expect(400)
    })
  })
})
