import { ProfessionalSlot } from '@/domain/models/professional-slot'

export interface UpdateProfessionalSlotRepository {
  updateAvailability: (params: ProfessionalSlot) => Promise<ProfessionalSlot>
}
