import { mockLoadProfessionalSlotRepository, mockProfessionalSlot } from '@/tests/data/mocks/db-professional-slot'
import { DbLoadProfessionalSlot } from '@/data/usecases/professional-slot/load-professional-slot/db-load-professional-slot'
import { LoadProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/load-professional-slot/load-professional-slot-repository'

type SutTypes = {
  sut: DbLoadProfessionalSlot
  loadProfessionalSlotRepositoryStub: LoadProfessionalSlotRepository
}

const makeSut = (): SutTypes => {
  const loadProfessionalSlotRepositoryStub = mockLoadProfessionalSlotRepository()
  const sut = new DbLoadProfessionalSlot(loadProfessionalSlotRepositoryStub)
  return {
    sut,
    loadProfessionalSlotRepositoryStub
  }
}

describe('LoadProfessionalSlots Usecase', () => {
  test('Should call LoadProfessionalSlotsRepository with correct value', async () => {
    const { sut, loadProfessionalSlotRepositoryStub } = makeSut()
    const loadProfessionalSlotSpy = jest.spyOn(loadProfessionalSlotRepositoryStub, 'loadById')
    await sut.loadById('any-id')
    expect(loadProfessionalSlotSpy).toHaveBeenCalledWith('any-id')
  })

  test('Should throw if LoadProfessionalSlotsRepository throws', async () => {
    const { sut, loadProfessionalSlotRepositoryStub } = makeSut()
    jest.spyOn(loadProfessionalSlotRepositoryStub, 'loadById').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.loadById('any-id')
    await expect(promise).rejects.toThrow()
  })

  test('Should load availability periods of professional slots', async () => {
    const { sut, loadProfessionalSlotRepositoryStub } = makeSut()
    jest.spyOn(loadProfessionalSlotRepositoryStub, 'loadById')
    .mockResolvedValueOnce(mockProfessionalSlot())
    const results = await sut.loadById('any-id')
    expect(results).toEqual(mockProfessionalSlot())
  })
})
