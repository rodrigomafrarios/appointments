import { DbLoadProfessionalSlot } from '@/data/usecases/professional-slot/load-professional-slot/db-load-professional-slot'
import { ProfessionalSlotMongoRepository } from '@/infra/db/mongodb/professional-slot/professional-slot-mongo-repository'

export const makeDbLoadProfessionalSlot = (): DbLoadProfessionalSlot => {
  const repository = new ProfessionalSlotMongoRepository()
  return new DbLoadProfessionalSlot(repository)
}