import { DbAddBooking } from '@/data/usecases/booking/add-booking/db-add-booking'
import { BookingMongoRepository } from '@/infra/db/mongodb/booking/booking-mongo-repository'
import { ProfessionalSlotMongoRepository } from '@/infra/db/mongodb/professional-slot/professional-slot-mongo-repository'

export const makeDbAddBooking = (): DbAddBooking => {
  const bookingRepository = new BookingMongoRepository()
  const ProfessionalSlotRepository = new ProfessionalSlotMongoRepository()
  return new DbAddBooking(bookingRepository, ProfessionalSlotRepository)
}