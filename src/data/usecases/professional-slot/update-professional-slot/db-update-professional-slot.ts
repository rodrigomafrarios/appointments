import { LoadBookingRepository } from '@/data/interfaces/db/booking/load-booking/load-booking-repository';
import { UpdateProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/update-professional-slot/update-professional-slot-repository';
import { ProfessionalSlot } from '@/domain/models/professional-slot';
import { UpdateProfessionalSlot } from '@/domain/usecases/professional-slot/update-professional-slot/update-professional-slot'

export class DbUpdateProfessionalSlot implements UpdateProfessionalSlot {
  constructor (
    private readonly updateProfessionalSlotRepository: UpdateProfessionalSlotRepository,
    private readonly loadBookingRepository: LoadBookingRepository  
  ) {}
  async update (params: ProfessionalSlot): Promise<ProfessionalSlot> {
    await this.loadBookingRepository.loadByProfessionalIdAndPeriod(params)
    const professionalSlot = await this.updateProfessionalSlotRepository.update(params)
    return professionalSlot
  }
}
