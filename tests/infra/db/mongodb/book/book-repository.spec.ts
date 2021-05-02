import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { BookMongoRepository } from '@/infra/db/mongodb/book/book-mongo-repository'
import { mockAddBookParams } from '@/tests/data/mocks/db-book'

let bookingsCollection: Collection
let professionalsCollection: Collection

const makeSut = (): BookMongoRepository => {
  return new BookMongoRepository()
}

describe('BookMongoRepository', () => {
  beforeAll(async () => {
		process.env.MONGO_URL = 'mongodb://localhost:27017/jest'
		await MongoHelper.connect(process.env.MONGO_URL)
	})
	afterAll(async () => {
		await MongoHelper.disconnect()
	})
	beforeEach(async () => {
		bookingsCollection = await MongoHelper.getCollection('bookings')
		await bookingsCollection.deleteMany({})

    professionalsCollection = await MongoHelper.getCollection('professionals')
  	await professionalsCollection.deleteMany({})
	})
  describe('add()', () => {
    test('Should add a booking', async () => {
      const professional = await professionalsCollection.insertOne({
				name: 'Rodrigo Mafra',
				telefone: '11999999999'
			})

      const params = Object.assign({}, mockAddBookParams(), { professionalId: professional.ops[0]._id })

      const sut = makeSut()
      const booking = await sut.add(params)
      expect(booking).toBeTruthy()
      expect(booking.id).toBeTruthy()
			expect(booking.professionalId).toBe(professional.ops[0]._id)
    })
  })
})
