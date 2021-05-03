import { Booking } from '@/domain/models/booking'

type LoadBookingParams = {
  professionalId: string
  start: string
  end: string
}

export interface LoadBookingRepository {
  loadByProfessionalIdAndPeriod: (params: LoadBookingParams) => Promise<Booking>
}
