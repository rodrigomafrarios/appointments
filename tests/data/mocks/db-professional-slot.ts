import { AddProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/add-professional-slot-repository'
import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { AddProfessionalSlotParams } from '@/domain/usecases/professional-slot/add-professional-slot/add-professional-slot'

export const mockProfessionalSlot = (): ProfessionalSlot => {
  return {
    id: 'any-id',
    professionalId: 'any-professional-id',
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    isAvailable: true
  }
}

export const mockAddProfessionalSlotParams = (): AddProfessionalSlotParams => {
  return {
    professionalId: 'any-professional-id',
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    isAvailable: true
  }
}

export const mockAddProfessionalSlotRepository = (): AddProfessionalSlotRepository => {
  class AddProfessionalSlotRepositoryStub implements AddProfessionalSlotRepository {
    async add (params: AddProfessionalSlotParams): Promise<ProfessionalSlot> {
      return Promise.resolve(mockProfessionalSlot())
    }
  }
  return new AddProfessionalSlotRepositoryStub()
}
