import { AddBookingRepository } from '@/data/interfaces/db/booking/add-booking/add-booking-repository'
import { LoadProfessionalSlotsRepository } from '@/data/interfaces/db/professional-slot/load-professional-slots/load-professional-slots-repository'
import { UpdateProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/update-professional-slot/update-professional-slot-repository'
import { AddBooking, AddBookingParams } from '@/domain/usecases/booking/add-booking/add-booking'

export class DbAddBooking implements AddBooking {
  constructor (
    private readonly addBookingRepository: AddBookingRepository,
    private readonly loadProfessionalSlotsRepository: LoadProfessionalSlotsRepository,
    private readonly updateProfessionalSlotRepository: UpdateProfessionalSlotRepository
  ) {}

  async add (params: AddBookingParams): Promise<boolean> {
    
    const professionalSlots = await this.loadProfessionalSlotsRepository.loadByProfessionalIdAndPeriod({
      ...params,
      isAvailable: true
    })

    let wasCreated = false

    if (!professionalSlots) {
      return wasCreated
    }

    for(const professionalSlot of professionalSlots) {
      if (professionalSlot && professionalSlot.isAvailable) {
        wasCreated = true
        await this.addBookingRepository.add(params)
        await this.updateProfessionalSlotRepository.updateAvailability({
          id: professionalSlot.id,
          professionalId: professionalSlot.professionalId,
          start: professionalSlot.start,
          end: professionalSlot.end,
          isAvailable: false
        })
      }
    }

    return wasCreated
  }
}
