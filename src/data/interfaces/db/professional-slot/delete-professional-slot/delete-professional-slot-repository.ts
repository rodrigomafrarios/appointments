import { ProfessionalSlot } from '@/domain/models/professional-slot'

export interface DeleteProfessionalSlotRepository {
  delete: (params: ProfessionalSlot) => Promise<ProfessionalSlot>
}
