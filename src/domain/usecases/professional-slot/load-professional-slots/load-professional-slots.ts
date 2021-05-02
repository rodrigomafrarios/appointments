import { ProfessionalSlot } from '@/domain/models/professional-slot'

interface LoadProfessionalSlotsParams {
  professionalId: string
  start: string
  end: string
}

export interface LoadProfessionalSlots {
  load: (params: LoadProfessionalSlotsParams) => Promise<ProfessionalSlot[]>
}