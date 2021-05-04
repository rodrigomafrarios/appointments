import { AddProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/add-professional-slot-repository'
import { DbAddProfessionalSlot } from '@/data/usecases/professional-slot/add-professional-slot/db-add-professional-slot'
import MockDate from 'mockdate'
import { mockAddProfessionalSlotParams, mockAddProfessionalSlotRepository } from '@/tests/data/mocks/db-professional-slot'

interface SutTypes {
  sut: DbAddProfessionalSlot
  addProfessionalSlotRepositoryStub: AddProfessionalSlotRepository
}

const makeSut = (): SutTypes => {
  const addProfessionalSlotRepositoryStub = mockAddProfessionalSlotRepository()
  const sut = new DbAddProfessionalSlot(addProfessionalSlotRepositoryStub)
  return {
    sut,
    addProfessionalSlotRepositoryStub
  }
}

describe('AddProfessionalSlot Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddProfessionalSlotRepository with correct values', async () => {
    const { sut, addProfessionalSlotRepositoryStub } = makeSut()
    const addProfessionalSlotSpy = jest.spyOn(addProfessionalSlotRepositoryStub, 'add')
    await sut.add(mockAddProfessionalSlotParams())
    expect(addProfessionalSlotSpy).toHaveBeenCalledWith(mockAddProfessionalSlotParams())
  })

  test('Should throw if AddProfessionalSlotRepository throws', async () => {
    const { sut, addProfessionalSlotRepositoryStub } = makeSut()
    jest.spyOn(addProfessionalSlotRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.add(mockAddProfessionalSlotParams())
    await expect(promise).rejects.toThrow()
  })
})
