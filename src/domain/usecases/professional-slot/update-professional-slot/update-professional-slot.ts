import { ProfessionalSlot } from '@/domain/models/professional-slot'

export interface UpdateProfessionalSlot {
  update: (params: ProfessionalSlot) => Promise<ProfessionalSlot>
}
