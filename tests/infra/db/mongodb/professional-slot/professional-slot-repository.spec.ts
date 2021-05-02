import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { mockAddProfessionalSlotParams } from '@/tests/data/mocks/db-professional-slot'
import { Collection, ObjectId } from 'mongodb'
import { ProfessionalSlotMongoRepository } from '@/infra/db/mongodb/professional-slot/professional-slot-mongo-repository'

let collection: Collection
let professionalsCollection: Collection

const makeSut = (): ProfessionalSlotMongoRepository => {
  return new ProfessionalSlotMongoRepository()
}

describe('ProfessionalSlotMongoRepository', () => {
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

		professionalsCollection = await MongoHelper.getCollection('professionals')
  	await professionalsCollection.deleteMany({})
	})
  describe('add()', () => {
    test('Should add a professional availability slot', async () => {
      const sut = makeSut()
			const professional = await professionalsCollection.insertOne({
				name: 'Rodrigo Mafra',
				telefone: '11999999999'
			})
			const params = Object.assign({}, mockAddProfessionalSlotParams(), { professionalId: professional.ops[0]._id })
      const slot = await sut.add(params)
			expect(slot).toBeTruthy()
			expect(slot.id).toBeTruthy()
			expect(slot.professionalId).toBe(professional.ops[0]._id)
			expect(slot.isAvailable).toBe(true)
    })
  })

	describe('loadByProfessionalId()', () => {
		test('Should load availability slots of professional', async () => {
			const sut = makeSut()
			const professional = await professionalsCollection.insertOne({
				name: 'Rodrigo Mafra',
				telefone: '11999999999'
			})
			const params = Object.assign({}, mockAddProfessionalSlotParams(), { professionalId: professional.ops[0]._id })
      await sut.add(params)

			const slots = await sut.loadByProfessionalId(params.professionalId)
			expect(slots).toBeTruthy()
			expect(slots.length).toBe(1)
		})
	})
})
