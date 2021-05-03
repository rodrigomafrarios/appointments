import { Booking } from '@/domain/models/booking'
import { AddBookingParams } from '@/domain/usecases/booking/add-booking/add-booking'

export interface AddBookingRepository {
  add: (params: AddBookingParams) => Promise<Booking>
}
