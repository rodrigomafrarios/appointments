import { AddProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/add-professional-slot-repository'
import { DeleteProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/delete-professional-slot/delete-professional-slot-repository'
import { LoadProfessionalSlotParams, LoadProfessionalSlotsRepository } from '@/data/interfaces/db/professional-slot/load-professional-slots/load-professional-slots-repository'
import { UpdateProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/update-professional-slot/update-professional-slot-repository'
import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { AddProfessionalSlotParams } from '@/domain/usecases/professional-slot/add-professional-slot/add-professional-slot'
import { DeleteProfessionalSlotParams } from '@/domain/usecases/professional-slot/delete-professional-slot/delete-professional-slot'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class ProfessionalSlotMongoRepository implements 
AddProfessionalSlotRepository,
LoadProfessionalSlotsRepository,
UpdateProfessionalSlotRepository,
DeleteProfessionalSlotRepository 
{
  async add (data: AddProfessionalSlotParams): Promise<ProfessionalSlot> {
    const professionalSlot = await this.loadByProfessionalIdAndPeriodEqual(data)
    if (professionalSlot) {
       return professionalSlot
    }
    data = Object.assign(data, { professionalId: new ObjectId(data.professionalId) })
    const collection = await MongoHelper.getCollection('professional-availability-slots')
    const result = await collection.insertOne(data)
    return result && MongoHelper.map(result.ops[0]) 
  }

  async update (professionalSlot: ProfessionalSlot): Promise<ProfessionalSlot> {
    const collection = await MongoHelper.getCollection('professional-availability-slots')
    const result = await collection.findOneAndUpdate({
      _id: new ObjectId(professionalSlot.id)
    },
    {
      $set: {
        professionalId: new ObjectId(professionalSlot.professionalId),
        start: professionalSlot.start,
        end: professionalSlot.end,
        isAvailable: professionalSlot.isAvailable
      }
    },{
      returnOriginal: false
    })
    return result.value && MongoHelper.map(result.value)
  }

  async updateAvailability (professionalSlot: ProfessionalSlot): Promise<ProfessionalSlot> {
    const collection = await MongoHelper.getCollection('professional-availability-slots')
    const result = await collection.findOneAndUpdate({
      professionalId: new ObjectId(professionalSlot.professionalId),
      start: professionalSlot.start,
      end: professionalSlot.end
    },
    {
      $set: {
        isAvailable: professionalSlot.isAvailable
      }
    })
    return result && MongoHelper.map(result)
  }

  async delete (params: DeleteProfessionalSlotParams): Promise<ProfessionalSlot> {
    const collection = await MongoHelper.getCollection('professional-availability-slots')
    const result = await collection.findOneAndDelete({
      _id: new ObjectId(params.id)
    })
    
    return result.value && MongoHelper.map(result.value)
  }

  async loadById (id: string): Promise<ProfessionalSlot> {
    const collection = await MongoHelper.getCollection('professional-availability-slots')
    const result = await collection.findOne({
      _id: new ObjectId(id)
    })
    return result && MongoHelper.map(result)
  }

  async loadByProfessionalId (id: string): Promise<ProfessionalSlot[]> {
    const collection = await MongoHelper.getCollection('professional-availability-slots')
    const results = await collection.find({
      professionalId: new ObjectId(id)
    })
    .toArray()
    return MongoHelper.mapCollection(results) 
  }

  async loadByProfessionalIdAndPeriod (data: LoadProfessionalSlotParams): Promise<ProfessionalSlot[]> {
    const collection = await MongoHelper.getCollection('professional-availability-slots')
    const results = await collection.find({
      professionalId: new ObjectId(data.professionalId),
      $or: [
        { 
          start: {
            $gte: data.start,
            $lte: data.end
          } 
        },
        {
          end: {
            $gte: data.start,
            $lte: data.end
          }
        }
      ]
    })
    .toArray()
    return MongoHelper.mapCollection(results) 
  }
  
  async loadByProfessionalIdAndPeriodEqual (data: LoadProfessionalSlotParams): Promise<any> {
    const collection = await MongoHelper.getCollection('professional-availability-slots')
    const result = await collection.findOne({
      professionalId: new ObjectId(data.professionalId),
      start: data.start,
      end: data.end
    })
    return result && MongoHelper.map(result)
  }
}
