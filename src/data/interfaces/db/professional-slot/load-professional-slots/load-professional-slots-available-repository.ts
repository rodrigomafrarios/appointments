import { ProfessionalSlot } from '@/domain/models/professional-slot'

export type LoadProfessionalSlot = Omit<ProfessionalSlot, 'id'>

export interface LoadProfessionalSlotAvailableRepository {
  loadProfessionalSlotAvailable: (params: LoadProfessionalSlot) => Promise<ProfessionalSlot>
}
