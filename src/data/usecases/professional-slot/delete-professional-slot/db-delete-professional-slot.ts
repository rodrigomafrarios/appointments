import { DeleteBookingRepository } from '@/data/interfaces/db/booking/delete-booking/delete-booking-repository'
import { LoadBookingRepository } from '@/data/interfaces/db/booking/load-booking/load-booking-repository'
import { DeleteProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/delete-professional-slot/delete-professional-slot-repository'
import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { DeleteProfessionalSlot } from '@/domain/usecases/professional-slot/delete-professional-slot/delete-professional-slot'

export class DbDeleteProfessionalSlot implements DeleteProfessionalSlot {
  constructor (
    private readonly deleteProfessionalSlotRepository: DeleteProfessionalSlotRepository,
    private readonly loadBookingRepository: LoadBookingRepository,
    private readonly deleteBookingRepository: DeleteBookingRepository
  ) {}
  async delete (params: ProfessionalSlot): Promise<void> {
    const booking = await this.loadBookingRepository.loadByProfessionalIdAndPeriod(params)

    if (booking) {
      await this.deleteBookingRepository.delete(booking)
    }
    
    await this.deleteProfessionalSlotRepository.delete(params)
  }
}
