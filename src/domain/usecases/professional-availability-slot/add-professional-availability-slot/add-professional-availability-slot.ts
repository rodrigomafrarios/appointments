import { ProfessionalAvailabilitySlot } from '@/domain/models/professional-availability-slot'

export type AddProfessionalAvailabilitySlotParams = Omit<ProfessionalAvailabilitySlot, 'id'>

export interface AddProfessionalAvailabilitySlot {
  add: (params: AddProfessionalAvailabilitySlotParams) => Promise<any>
}
