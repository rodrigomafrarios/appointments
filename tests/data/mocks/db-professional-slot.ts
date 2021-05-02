import { AddProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/add-professional-slot-repository'
import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { AddProfessionalSlotParams } from '@/domain/usecases/professional-slot/add-professional-slot/add-professional-slot'
import { LoadProfessionalSlotsRepository } from '@/data/interfaces/db/professional-slot/load-professional-slots/load-professional-slots-repository'

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
    start: '2021-05-01T19:30:00.000Z',
    end: '2021-05-01T20:30:00.000Z',
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

export const mockLoadProfessionalSlotsRepository = (): LoadProfessionalSlotsRepository => {
  class LoadProfessionalSlotsRepositoryStub implements LoadProfessionalSlotsRepository {
    async loadByProfessionalId (id: string): Promise<ProfessionalSlot[]> {
      const professionalSlots: ProfessionalSlot[] = []
      professionalSlots.push(mockProfessionalSlot())
      return Promise.resolve(professionalSlots)
    }
  }
  return new LoadProfessionalSlotsRepositoryStub()
}
