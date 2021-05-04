import { DbUpdateProfessionalSlot } from '@/data/usecases/professional-slot/update-professional-slot/db-update-professional-slot'
import { BookingMongoRepository } from '@/infra/db/mongodb/booking/booking-mongo-repository'
import { ProfessionalSlotMongoRepository } from '@/infra/db/mongodb/professional-slot/professional-slot-mongo-repository'

export const makeDbUpdateProfessionalSlot = (): DbUpdateProfessionalSlot => {
  const professionalSlotRepository = new ProfessionalSlotMongoRepository()
  const bookingRepository = new BookingMongoRepository()
  return new DbUpdateProfessionalSlot(professionalSlotRepository, bookingRepository, bookingRepository)
}