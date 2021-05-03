import { Booking } from '@/domain/models/booking'

export type AddBookingParams = Omit<Booking, 'id'>

export interface AddBooking {
  add: (params: AddBookingParams) => Promise<Booking>
}
