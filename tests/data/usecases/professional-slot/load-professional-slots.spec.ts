import { LoadProfessionalSlotsRepository } from '@/data/interfaces/db/professional-slot/load-professional-slots/load-professional-slots-repository'
import { mockLoadProfessionalSlotsRepository } from '@/tests/data/mocks/db-professional-slot'
import { DbLoadProfessionalSlots } from '@/data/usecases/professional-slot/load-professional-slots/db-load-professional-slots'

interface SutTypes {
  sut: DbLoadProfessionalSlots
  loadProfessionalSlotsRepositoryStub: LoadProfessionalSlotsRepository
}

const makeSut = (): SutTypes => {
  const loadProfessionalSlotsRepositoryStub = mockLoadProfessionalSlotsRepository()
  const sut = new DbLoadProfessionalSlots(loadProfessionalSlotsRepositoryStub)
  return {
    sut,
    loadProfessionalSlotsRepositoryStub
  }
}

describe('LoadProfessionalSlots Usecase', () => {
  test('Should call LoadProfessionalSlotsRepository with correct value', async () => {
    const { sut, loadProfessionalSlotsRepositoryStub } = makeSut()
    const loadProfessionalSlotsSpy = jest.spyOn(loadProfessionalSlotsRepositoryStub, 'loadByProfessionalId')
    await sut.loadByProfessionalId('any-id')
    expect(loadProfessionalSlotsSpy).toHaveBeenCalledWith('any-id')
  })
})
