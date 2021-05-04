import { ProfessionalSlot } from '@/domain/models/professional-slot'

export interface DeleteProfessionalSlot {
  delete: (params: ProfessionalSlot) => Promise<void>
}
