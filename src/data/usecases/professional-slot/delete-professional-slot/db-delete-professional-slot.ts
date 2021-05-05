import { DeleteBookingRepository } from '@/data/interfaces/db/booking/delete-booking/delete-booking-repository'
import { LoadBookingRepository } from '@/data/interfaces/db/booking/load-booking/load-booking-repository'
import { DeleteProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/delete-professional-slot/delete-professional-slot-repository'
import { LoadProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/load-professional-slot/load-professional-slot-repository'
import { DeleteProfessionalSlot, DeleteProfessionalSlotParams } from '@/domain/usecases/professional-slot/delete-professional-slot/delete-professional-slot'

export class DbDeleteProfessionalSlot implements DeleteProfessionalSlot {
  constructor (
    private readonly deleteProfessionalSlotRepository: DeleteProfessionalSlotRepository,
    private readonly loadProfessionalSlotsRepository: LoadProfessionalSlotRepository,
    private readonly loadBookingRepository: LoadBookingRepository,
    private readonly deleteBookingRepository: DeleteBookingRepository
  ) {}
  async delete (params: DeleteProfessionalSlotParams): Promise<void> {
    const professionalAvailabilitySlot = await this.loadProfessionalSlotsRepository.loadById(params.id)

    if (professionalAvailabilitySlot) {
      const booking = await this.loadBookingRepository.loadByProfessionalIdAndPeriod(professionalAvailabilitySlot)

      if (booking) {
        await this.deleteBookingRepository.delete(booking)
      }
      
      await this.deleteProfessionalSlotRepository.delete(params)
    }
  }
}
