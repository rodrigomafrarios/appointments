import { AddBookingRepository } from '@/data/interfaces/db/booking/add-booking/add-booking-repository'
import { LoadProfessionalSlotsRepository } from '@/data/interfaces/db/professional-slot/load-professional-slots/load-professional-slots-repository'
import { UpdateProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/update-professional-slot/update-professional-slot-repository'
import { Booking } from '@/domain/models/booking'
import { AddBooking, AddBookingParams } from '@/domain/usecases/booking/add-booking/add-booking'

export class DbAddBooking implements AddBooking {
  constructor (
    private readonly addBookingRepository: AddBookingRepository,
    private readonly loadProfessionalSlotsRepository: LoadProfessionalSlotsRepository,
    private readonly updateProfessionalSlotRepository: UpdateProfessionalSlotRepository
  ) {}

  async add (params: AddBookingParams): Promise<Booking> {
    const professionalSlot = await this.loadProfessionalSlotsRepository.loadByProfessionalIdAndPeriod({
      ...params,
      isAvailable: true
    })
    
    if (professionalSlot && professionalSlot.isAvailable) {
      const booking = await this.addBookingRepository.add(params)
      if (booking) {
        await this.updateProfessionalSlotRepository.updateAvailability({
          id: professionalSlot.id,
          professionalId: professionalSlot.professionalId,
          start: professionalSlot.start,
          end: professionalSlot.end,
          isAvailable: false
        })
        return booking
      }
    }
  }
}
