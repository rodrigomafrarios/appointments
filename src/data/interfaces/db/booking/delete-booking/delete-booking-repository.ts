import { Booking } from '@/domain/models/booking'

export interface DeleteBookingRepository {
  delete: (params: Booking) => Promise<void>
}
