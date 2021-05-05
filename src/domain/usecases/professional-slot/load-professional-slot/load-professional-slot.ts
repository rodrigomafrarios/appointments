import { ProfessionalSlot } from '@/domain/models/professional-slot'

export interface LoadProfessionalSlot {
  loadById: (id: string) => Promise<ProfessionalSlot>
}
