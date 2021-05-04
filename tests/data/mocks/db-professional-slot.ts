import { AddProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/add-professional-slot-repository'
import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { AddProfessionalSlotParams } from '@/domain/usecases/professional-slot/add-professional-slot/add-professional-slot'
import { LoadProfessionalSlotParams, LoadProfessionalSlotsRepository } from '@/data/interfaces/db/professional-slot/load-professional-slots/load-professional-slots-repository'
import { UpdateProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/update-professional-slot/update-professional-slot-repository'
import { DeleteProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/delete-professional-slot/delete-professional-slot-repository'

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

export const mockUpdateProfessionalSlotRepository = (): UpdateProfessionalSlotRepository => {
  class UpdateProfessionalSlotRepositoryStub implements UpdateProfessionalSlotRepository {
    async updateAvailability (params: ProfessionalSlot): Promise<ProfessionalSlot> {
      return Promise.resolve(null)
    }
    async update (params: ProfessionalSlot): Promise<ProfessionalSlot> {
      return null
    }
  }
  return new UpdateProfessionalSlotRepositoryStub()
}

export const mockDeleteProfessionalSlotRepository = (): DeleteProfessionalSlotRepository => {
  class DeleteProfessionalSlotRepositoryStub implements DeleteProfessionalSlotRepository {
    async delete (params: ProfessionalSlot): Promise<ProfessionalSlot> {
      return null
    }
  }
  return new DeleteProfessionalSlotRepositoryStub()
}

export const mockLoadProfessionalSlotsRepository = (): LoadProfessionalSlotsRepository => {
  class LoadProfessionalSlotsRepositoryStub implements LoadProfessionalSlotsRepository {
    async loadByProfessionalId (id: string): Promise<ProfessionalSlot[]> {
      const professionalSlots: ProfessionalSlot[] = []
      professionalSlots.push(mockProfessionalSlot())
      return Promise.resolve(professionalSlots)
    }
    async loadByProfessionalIdAndPeriod (params: LoadProfessionalSlotParams): Promise<ProfessionalSlot> {
      return Promise.resolve(null)
    }
  }
  return new LoadProfessionalSlotsRepositoryStub()
}
