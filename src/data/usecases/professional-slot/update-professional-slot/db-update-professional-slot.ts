import { UpdateProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/update-professional-slot/update-professional-slot-repository';
import { ProfessionalSlot } from '@/domain/models/professional-slot';
import { UpdateProfessionalSlot } from '@/domain/usecases/professional-slot/update-professional-slot/update-professional-slot'

export class DbUpdateProfessionalSlot implements UpdateProfessionalSlot {
  constructor (private readonly updateProfessionalSlotRepository: UpdateProfessionalSlotRepository) {}
  async update (params: ProfessionalSlot): Promise<ProfessionalSlot> {
    const professionalSlot = await this.updateProfessionalSlotRepository.update(params)
    return professionalSlot
  }
}
