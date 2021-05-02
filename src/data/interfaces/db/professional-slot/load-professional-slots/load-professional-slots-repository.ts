import { ProfessionalSlot } from '@/domain/models/professional-slot'

export interface LoadProfessionalSlotsRepository {
  loadByProfessionalId: (id: string) => Promise<ProfessionalSlot[]>
}
