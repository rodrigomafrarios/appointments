import { LoadProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/load-professional-slot/load-professional-slot-repository'
import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { LoadProfessionalSlot } from '@/domain/usecases/professional-slot/load-professional-slot/load-professional-slot'

export class DbLoadProfessionalSlot implements LoadProfessionalSlot {
  constructor (
    private readonly loadProfessionalSlotRepository: LoadProfessionalSlotRepository
  ) {}

  async loadById (id: string): Promise<ProfessionalSlot> {
    const professionalSlot = await this.loadProfessionalSlotRepository.loadById(id)
    return professionalSlot
  }
}
