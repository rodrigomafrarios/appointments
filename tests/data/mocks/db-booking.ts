import { Booking } from '@/domain/models/booking'
import { AddBookingParams } from '@/domain/usecases/booking/add-booking/add-booking'
import { LoadBookingParams, LoadBookingRepository } from '@/data/interfaces/db/booking/load-booking/load-booking-repository'

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

export const mockLoadBookingRepository = (): LoadBookingRepository => {
  class LoadBookingRepositoryStub implements LoadBookingRepository {
    async loadByProfessionalIdAndPeriod (params: LoadBookingParams): Promise<Booking> {
      return null
    }
  }
  return new LoadBookingRepositoryStub()
}