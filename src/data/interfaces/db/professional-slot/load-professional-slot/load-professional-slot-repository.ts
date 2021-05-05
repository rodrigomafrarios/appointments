import { ProfessionalSlot } from '@/domain/models/professional-slot'

export type LoadProfessionalSlotParams = Omit<ProfessionalSlot, 'id'>

export interface LoadProfessionalSlotRepository {
  loadById: (id: string) => Promise<ProfessionalSlot>
}
