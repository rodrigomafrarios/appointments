import { ProfessionalSlot } from '@/domain/models/professional-slot'

export interface UpdateProfessionalSlotRepository {
  update: (params: ProfessionalSlot) => Promise<ProfessionalSlot>
  updateAvailability: (params: ProfessionalSlot) => Promise<ProfessionalSlot>
}
