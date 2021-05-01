import { ProfessionalSlot } from '@/domain/models/professional-slot';
import { AddProfessionalSlotParams } from '@/domain/usecases/professional-slot/add-professional-slot/add-professional-slot'

export interface AddProfessionalSlotRepository {
  add: (params: AddProfessionalSlotParams) => Promise<ProfessionalSlot>
}
