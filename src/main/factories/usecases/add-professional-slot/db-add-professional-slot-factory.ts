import { DbAddProfessionalSlot } from '@/data/usecases/professional-slot/db-add-professional-slot'
import { ProfessionalSlotMongoRepository } from '@/infra/db/mongodb/professional-slot/professional-slot-mongo-repository'

export const makeDbAddProfessionalSlot = (): DbAddProfessionalSlot => {
  const repository = new ProfessionalSlotMongoRepository()
  return new DbAddProfessionalSlot(repository)
}