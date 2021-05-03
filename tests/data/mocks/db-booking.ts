import { Booking } from '@/domain/models/booking'
import { AddBookingParams } from '@/domain/usecases/booking/add-booking/add-booking'

export const mockBooking = (): Booking => {
  return {
    id: 'any-id',
    customerName: 'any-customer-name',
    professionalId: 'any-professional-id',
    start: "2021-05-01T22:00:00.000Z",
    end: "2021-05-01T23:00:00.000Z"
  }
}

export const mockAddBookingParams = (): AddBookingParams => {
  const book = mockBooking()
  return {
    customerName: book.customerName,
    professionalId: book.professionalId,
    start: book.start,
    end: book.end
  }
}