import { AddProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/add-professional-slot-repository'
import { AddProfessionalSlotParams } from '@/domain/usecases/professional-slot/add-professional-slot/add-professional-slot'

export const mockAddProfessionalParams = (): AddProfessionalSlotParams => {
  return {
    professionalId: 'any-professional-id',
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    isAvailable: true
  }
}

export const mockAddProfessionalSlotRepository = (): AddProfessionalSlotRepository => {
  class AddProfessionalSlotRepositoryStub implements AddProfessionalSlotRepository {
    async add (params: AddProfessionalSlotParams): Promise<void> {
      return await Promise.resolve(undefined)
    }
  }
  return new AddProfessionalSlotRepositoryStub()
}
