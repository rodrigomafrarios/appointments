import { AddProfessionalSlotRepository } from '@/data/interfaces/professional-slot/add-professional-slot-repository'
import { DbAddProfessionalSlot } from '@/data/usecases/professional-slot/db-add-professional-slot'
import { AddProfessionalSlotParams } from '@/domain/usecases/professional-slot/add-professional-slot/add-professional-slot'
import MockDate from 'mockdate'

interface SutTypes {
  sut: DbAddProfessionalSlot
  addProfessionalSlotRepositoryStub: AddProfessionalSlotRepository
}

const mockAddProfessionalSlotRepository = (): AddProfessionalSlotRepository => {
  class AddProfessionalSlotRepositoryStub implements AddProfessionalSlotRepository {
    async add (params: AddProfessionalSlotParams): Promise<void> {
      return await Promise.resolve(undefined)
    }
  }
  return new AddProfessionalSlotRepositoryStub()
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
    await sut.add({
      professionalId: 'any-professional-id',
      start: new Date().toISOString(),
      end: new Date().toISOString(),
      isAvailable: true
    })
    expect(addProfessionalSlotSpy).toHaveBeenCalledWith({
      professionalId: 'any-professional-id',
      start: new Date().toISOString(),
      end: new Date().toISOString(),
      isAvailable: true
    })
  })

  test('Should throw if AddProfessionalSlotRepository throws', async () => {
    const { sut, addProfessionalSlotRepositoryStub } = makeSut()
    jest.spyOn(addProfessionalSlotRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.add({
      professionalId: 'any-professional-id',
      start: new Date().toISOString(),
      end: new Date().toISOString(),
      isAvailable: true
    })

    await expect(promise).rejects.toThrow()
  })
})
