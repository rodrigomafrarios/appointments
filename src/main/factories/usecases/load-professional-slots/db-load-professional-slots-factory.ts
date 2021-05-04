import { DbLoadProfessionalSlots } from '@/data/usecases/professional-slot/load-professional-slots/db-load-professional-slots'
import { ProfessionalSlotMongoRepository } from '@/infra/db/mongodb/professional-slot/professional-slot-mongo-repository'
import { SlotsPeriodsAdapter } from '@/utils/slot-periods-adapter'

export const makeDbLoadProfessionalSlots = (): DbLoadProfessionalSlots => {
  const repository = new ProfessionalSlotMongoRepository()
  const slotPeriodsAdapter = new SlotsPeriodsAdapter()
  return new DbLoadProfessionalSlots(repository, slotPeriodsAdapter)
}