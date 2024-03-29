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

		test('Should return a existent professional availability slot', async () => {
      const sut = makeSut()
			const professional = await professionalsCollection.insertOne({
				name: 'Rodrigo Mafra',
				telefone: '11999999999'
			})
			const params = Object.assign({}, mockAddProfessionalSlotParams(), { professionalId: professional.ops[0]._id })

			collection.insertOne(params)

      const slot = await sut.add(params)
			expect(slot).toBeTruthy()
			expect(slot.id).toBeTruthy()
			expect(slot.professionalId).toStrictEqual(professional.ops[0]._id)
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

	describe('loadById()', () => {
		test('Should load a availability slot of professional', async () => {
			const sut = makeSut()
			const professional = await professionalsCollection.insertOne({
				name: 'Rodrigo Mafra',
				telefone: '11999999999'
			})
			const params = Object.assign({}, mockAddProfessionalSlotParams(), { professionalId: professional.ops[0]._id })
      const addSlot = await sut.add(params)

			const slot = await sut.loadById(addSlot.id)
			expect(slot).toBeTruthy()
			expect(slot.id).toStrictEqual(addSlot.id)
		})
	})

	describe('update()', () => {
		test('Should update availability slot', async () => {
			const sut = makeSut()
			const professional = await professionalsCollection.insertOne({
				name: 'Rodrigo Mafra',
				telefone: '11999999999'
			})
			const params = Object.assign({}, mockAddProfessionalSlotParams(), { professionalId: professional.ops[0]._id })
      let professionalSlot = await sut.add(params)

			professionalSlot = Object.assign({}, professionalSlot, { isAvailable: false })
			await sut.update(professionalSlot)
			
			const results = await sut.loadByProfessionalIdAndPeriod(professionalSlot)
			expect(results[0].isAvailable).toBe(false)
		})
	})

	describe('delete()', () => {
		test('Should delete availability slot', async () => {
			const sut = makeSut()
			const professional = await professionalsCollection.insertOne({
				name: 'Rodrigo Mafra',
				telefone: '11999999999'
			})
			const params = Object.assign({}, mockAddProfessionalSlotParams(), { professionalId: professional.ops[0]._id })
      let professionalSlot = await sut.add(params)

			professionalSlot = Object.assign({}, professionalSlot, { isAvailable: false })
			await sut.delete(professionalSlot)
			
			const results = await sut.loadByProfessionalIdAndPeriod(professionalSlot)
			expect(results).toEqual([])
		})
	})
})
