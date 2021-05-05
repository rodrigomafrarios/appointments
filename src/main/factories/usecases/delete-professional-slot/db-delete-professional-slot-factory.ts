import { DbDeleteProfessionalSlot } from '@/data/usecases/professional-slot/delete-professional-slot/db-delete-professional-slot'
import { BookingMongoRepository } from '@/infra/db/mongodb/booking/booking-mongo-repository'
import { ProfessionalSlotMongoRepository } from '@/infra/db/mongodb/professional-slot/professional-slot-mongo-repository'

export const makeDbDeleteProfessionalSlot = (): DbDeleteProfessionalSlot => {
  const professionalSlotRepository = new ProfessionalSlotMongoRepository()
  const bookingRepository = new BookingMongoRepository()
  return new DbDeleteProfessionalSlot(professionalSlotRepository, professionalSlotRepository, bookingRepository, bookingRepository)
}