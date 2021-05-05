import { DbLoadProfessionalSlots } from '@/data/usecases/professional-slot/load-professional-slots/db-load-professional-slots'
import { ProfessionalSlotMongoRepository } from '@/infra/db/mongodb/professional-slot/professional-slot-mongo-repository'

export const makeDbLoadProfessionalSlots = (): DbLoadProfessionalSlots => {
  const repository = new ProfessionalSlotMongoRepository()
  return new DbLoadProfessionalSlots(repository)
}