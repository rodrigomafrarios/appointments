import { AddProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/add-professional-slot-repository'
import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { AddProfessionalSlotParams } from '@/domain/usecases/professional-slot/add-professional-slot/add-professional-slot'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class ProfessionalSlotMongoRepository implements AddProfessionalSlotRepository {
  async add (data: AddProfessionalSlotParams): Promise<ProfessionalSlot> {
    const professionalSlot = await this.loadByProfessionalIdAndPeriod(data)
    if (professionalSlot) {
       return professionalSlot
    }
    data = Object.assign(data, { professionalId: new ObjectId(data.professionalId) })
    const collection = await MongoHelper.getCollection('professional-availability-slots')
    const result = await collection.insertOne(data)
    return result && MongoHelper.map(result.ops[0]) 
  }
  async loadByProfessionalId (id: string): Promise<ProfessionalSlot[]> {
    const collection = await MongoHelper.getCollection('professional-availability-slots')
    const results = await collection.find({
      professionalId: new ObjectId(id)
    })
    .toArray()
    return MongoHelper.mapCollection(results) 
  }
  async loadByProfessionalIdAndPeriod (data: AddProfessionalSlotParams): Promise<ProfessionalSlot> {
    const collection = await MongoHelper.getCollection('professional-availability-slots')
    const result = await collection.findOne({
      professionalId: new ObjectId(data.professionalId),
      $or: [
        { 
          start: {
            $gt: data.start,
            $lt: data.end
          } 
        },
        {
          end: {
            $gt: data.start,
            $lt: data.end
          }
        }
      ]
    })
    return result
  }
}
