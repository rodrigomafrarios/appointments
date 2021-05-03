import { UpdateProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/update-professional-slot/update-professional-slot-repository'
import { DbUpdateProfessionalSlot } from '@/data/usecases/professional-slot/update-professional-slot/db-update-professional-slot'
import { mockProfessionalSlot, mockUpdateProfessionalSlotRepository } from '@/tests/data/mocks/db-professional-slot'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbUpdateProfessionalSlot
  updateProfessionalSlotRepositoryStub: UpdateProfessionalSlotRepository
}

const makeSut = (): SutTypes => {
  const updateProfessionalSlotRepositoryStub = mockUpdateProfessionalSlotRepository()
  const sut = new DbUpdateProfessionalSlot(updateProfessionalSlotRepositoryStub)
  return {
    sut,
    updateProfessionalSlotRepositoryStub
  }
}

describe('UpdateProfessionalSlot Usecase', async () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call UpdateProfessionalSlotRepository with correct value', async () => {
    const { sut, updateProfessionalSlotRepositoryStub } = makeSut()
    const updateProfessionalSlotSpy = jest.spyOn(updateProfessionalSlotRepositoryStub, 'update')
    await sut.update(mockProfessionalSlot())
    expect(updateProfessionalSlotSpy).toHaveBeenCalledWith(mockProfessionalSlot())
  })
})
