import { Controller } from '@/presentation/interfaces'
import { AddBookingController } from '@/presentation/controllers/booking/add-booking/add-booking-controller'
import { makeDbAddBooking } from '@/main/factories/usecases/add-booking/db-add-booking-factory'
import { makeAddBookingValidation } from './add-booking-validation-factory'

export const makeAddBookingController = (): Controller => {
  const controller = new AddBookingController(makeAddBookingValidation(), makeDbAddBooking())
  return controller
}