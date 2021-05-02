import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { mockAddProfessionalSlotParams } from '@/tests/data/mocks/db-professional-slot'
import { Collection } from 'mongodb'
import { ProfessionalSlotMongoRepository } from '@/infra/db/mongodb/professional-slot/professional-slot-mongo-repository'

let collection: Collection

const makeSut = (): ProfessionalSlotMongoRepository => {
  return new ProfessionalSlotMongoRepository()
}

describe('AddProfessionalSlotMongoRepository', () => {
  beforeAll(async () => {
		process.env.MONGO_URL = 'mongodb://localhost:27017/jest'
		await MongoHelper.connect(process.env.MONGO_URL)
	})
	afterAll(async () => {
		await MongoHelper.disconnect()
	})
	beforeEach(async () => {
		collection = await MongoHelper.getCollection('professional-availability-slots')
		await collection.deleteMany({})
	})
  describe('add()', () => {
    test('Should add a professional availability slot', async () => {
      const sut = makeSut()
      const slot = await sut.add(mockAddProfessionalSlotParams())
			expect(slot).toBeTruthy()
			expect(slot.id).toBeTruthy()
			expect(slot.professionalId).toBe('any-professional-id')
			expect(slot.isAvailable).toBe(true)
    })
  })
})
