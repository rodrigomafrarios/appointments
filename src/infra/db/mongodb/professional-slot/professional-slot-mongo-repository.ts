import { AddProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/add-professional-slot-repository'
import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { AddProfessionalSlotParams } from '@/domain/usecases/professional-slot/add-professional-slot/add-professional-slot'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class ProfessionalSlotMongoRepository implements AddProfessionalSlotRepository {
  async add (data: AddProfessionalSlotParams): Promise<ProfessionalSlot> {
    const collection = await MongoHelper.getCollection('professional-availability-slot')
		const result = await collection.insertOne(data)
		return MongoHelper.map(result.ops[0])
  }
}
