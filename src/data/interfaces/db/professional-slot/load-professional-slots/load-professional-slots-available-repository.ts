import { ProfessionalSlot } from '@/domain/models/professional-slot'

export type LoadProfessionalSlot = Omit<ProfessionalSlot, 'id'>

export interface LoadProfessionalSlotsAvailableRepository {
  loadProfessionalSlotAvailable: (params: LoadProfessionalSlot) => Promise<ProfessionalSlot>
}
