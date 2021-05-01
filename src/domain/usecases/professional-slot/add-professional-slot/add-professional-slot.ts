import { ProfessionalSlot } from '@/domain/models/professional-slot'

export type AddProfessionalSlotParams = Omit<ProfessionalSlot, 'id'>

export interface AddProfessionalSlot {
  add: (params: AddProfessionalSlotParams) => Promise<any>
}
