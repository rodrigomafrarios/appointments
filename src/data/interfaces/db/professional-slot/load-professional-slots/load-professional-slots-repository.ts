import { ProfessionalSlot } from '@/domain/models/professional-slot'

export type LoadProfessionalSlotParams = Omit<ProfessionalSlot, 'id'>

export interface LoadProfessionalSlotsRepository {
  loadByProfessionalId: (id: string) => Promise<ProfessionalSlot[]>
  loadByProfessionalIdAndPeriod: (params: LoadProfessionalSlotParams) => Promise<ProfessionalSlot>
}
