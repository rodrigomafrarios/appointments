import { LoadProfessionalSlotsRepository } from '@/data/interfaces/db/professional-slot/load-professional-slots/load-professional-slots-repository'
import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { LoadProfessionalSlots } from '@/domain/usecases/professional-slot/load-professional-slots/load-professional-slots'
import { SlotsPeriodsAdapter } from '@/utils/slot-periods-adapter'

export class DbLoadProfessionalSlots implements LoadProfessionalSlots {
  constructor (
    private readonly loadProfessionalSlotsRepository: LoadProfessionalSlotsRepository,
    private readonly slotPeriodsAdapter: SlotsPeriodsAdapter  
  ) {}

  async loadByProfessionalId (id: string): Promise<ProfessionalSlot[]> {
    const professionalSlots = await this.loadProfessionalSlotsRepository.loadByProfessionalId(id)
    const periods = await this.slotPeriodsAdapter.toPeriod(professionalSlots)
    return periods
  }
}
