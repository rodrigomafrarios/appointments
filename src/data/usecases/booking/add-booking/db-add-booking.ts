import { AddBookingRepository } from '@/data/interfaces/db/booking/add-booking/add-booking-repository'
import { LoadProfessionalSlotsRepository } from '@/data/interfaces/db/professional-slot/load-professional-slots/load-professional-slots-repository'
import { AddBooking, AddBookingParams } from '@/domain/usecases/booking/add-booking/add-booking'

export class DbAddBooking implements AddBooking {
  constructor (
    private readonly addBookingRepository: AddBookingRepository,
    private readonly loadProfessionalSlotsRepository: LoadProfessionalSlotsRepository
  ) {}

  async add (params: AddBookingParams): Promise<void> {
    const professionalSlot = await this.loadProfessionalSlotsRepository.loadByProfessionalIdAndPeriod({
      ...params,
      isAvailable: true
    })
    if (professionalSlot && professionalSlot.isAvailable) {
      await this.addBookingRepository.add(params)
    }
  }
}
