import { AddProfessionalSlotParams } from '@/domain/usecases/professional-slot/add-professional-slot/add-professional-slot'

export interface AddProfessionalSlotRepository {
  add: (params: AddProfessionalSlotParams) => Promise<void>
}
