import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { DeleteProfessionalSlotParams } from '@/domain/usecases/professional-slot/delete-professional-slot/delete-professional-slot';

export interface DeleteProfessionalSlotRepository {
  delete: (params: DeleteProfessionalSlotParams) => Promise<ProfessionalSlot>
}
