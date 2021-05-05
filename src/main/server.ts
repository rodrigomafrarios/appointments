import 'module-alias/register'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'
import { Collection } from 'mongodb'

let professionalsCollection: Collection
let professionalSlotsCollection: Collection
let bookingsCollection: Collection

MongoHelper.connect(env.mongoUrl)
	.then(async () => {
		professionalsCollection = await MongoHelper.getCollection('professionals')
		professionalSlotsCollection = await MongoHelper.getCollection('professional-availability-slots')
		bookingsCollection = await MongoHelper.getCollection('bookings')
		
		await bookingsCollection.deleteMany({})
  	await professionalSlotsCollection.deleteMany({})
		await professionalsCollection.deleteMany({})
		
		await professionalsCollection.insertOne({
			name: 'Rodrigo Mafra',
			telefone: '14981744452'
		})
		const app = (await import('./config/app')).default
		app.listen(env.port, () => {
			console.log(`Server running on http://localhost:${env.port}`)
		})
})
.catch((e) => {
	console.error(e)
})