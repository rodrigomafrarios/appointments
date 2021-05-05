import { LoadProfessionalSlotsRepository } from '@/data/interfaces/db/professional-slot/load-professional-slots/load-professional-slots-repository'
import { mockLoadProfessionalSlotsRepository, mockProfessionalSlot } from '@/tests/data/mocks/db-professional-slot'
import { DbLoadProfessionalSlots } from '@/data/usecases/professional-slot/load-professional-slots/db-load-professional-slots'
import { ProfessionalSlot } from '@/domain/models/professional-slot'

type SutTypes = {
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

  test('Should throw if LoadProfessionalSlotsRepository throws', async () => {
    const { sut, loadProfessionalSlotsRepositoryStub } = makeSut()
    jest.spyOn(loadProfessionalSlotsRepositoryStub, 'loadByProfessionalId').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.loadByProfessionalId('any-id')
    await expect(promise).rejects.toThrow()
  })

  test('Should load availability periods of professional slots', async () => {
    const { sut, loadProfessionalSlotsRepositoryStub } = makeSut()
    const professionalSlots: ProfessionalSlot[] = []
    professionalSlots.push(mockProfessionalSlot())
    jest.spyOn(loadProfessionalSlotsRepositoryStub, 'loadByProfessionalId')
    .mockResolvedValueOnce(professionalSlots)
    const results = await sut.loadByProfessionalId('any-id')
    expect(results).toEqual(professionalSlots)
  })
})
