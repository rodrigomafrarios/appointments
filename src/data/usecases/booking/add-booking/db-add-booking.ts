import { AddBookingRepository } from '@/data/interfaces/db/booking/add-booking/add-booking-repository'
import { AddBooking, AddBookingParams } from '@/domain/usecases/booking/add-booking/add-booking'

export class DbAddBooking implements AddBooking {
  constructor (private readonly addBookingRepository: AddBookingRepository) {}

  async add (params: AddBookingParams): Promise<void> {
    await this.addBookingRepository.add(params)
  }
}
