import { AddBookingRepository } from '@/data/interfaces/db/booking/add-booking/add-booking-repository'
import { LoadProfessionalSlotAvailableRepository } from '@/data/interfaces/db/professional-slot/load-professional-slots/load-professional-slots-available-repository'
import { AddBooking, AddBookingParams } from '@/domain/usecases/booking/add-booking/add-booking'

export class DbAddBooking implements AddBooking {
  constructor (
    private readonly addBookingRepository: AddBookingRepository,
    private readonly loadProfessionalSlotAvailableRepository: LoadProfessionalSlotAvailableRepository
  ) {}

  async add (params: AddBookingParams): Promise<void> {
    const professionalSlot = await this.loadProfessionalSlotAvailableRepository.loadProfessionalSlotAvailable({
      ...params,
      isAvailable: true
    })
    if (!professionalSlot) {
      await this.addBookingRepository.add(params)
    }
  }
}
