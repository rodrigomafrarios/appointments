import { ProfessionalSlot } from '@/domain/models/professional-slot'

export interface LoadProfessionalSlots {
  loadByProfessionalId: (id: string) => Promise<ProfessionalSlot[]>
}