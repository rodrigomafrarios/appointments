import { DbAddBooking } from '@/data/usecases/booking/add-booking/db-add-booking'
import { BookingMongoRepository } from '@/infra/db/mongodb/booking/booking-mongo-repository'

export const makeDbAddBooking = (): DbAddBooking => {
  const repository = new BookingMongoRepository()
  return new DbAddBooking(repository)
}