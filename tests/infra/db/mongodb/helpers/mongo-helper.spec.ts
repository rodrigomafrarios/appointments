import { MongoHelper as sut } from '@/infra/db/mongodb/helpers/mongo-helper'
import env from '@/main/config/env'
describe('Mongo Helper', () => {
	beforeAll(async () => {
		await sut.connect(env.mongoUrl)
	})
	afterAll(async () => {
		await sut.disconnect()
	})
	test('Should reconnect if mongodb is down', async () => {
		let accountCollection = await sut.getCollection('professional-availability-slots')
		expect(accountCollection).toBeTruthy()
		await sut.disconnect()
		accountCollection = await sut.getCollection('professional-availability-slots')
		expect(accountCollection).toBeTruthy()
	})
})
