import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { UpdateProfessionalSlot } from '@/domain/usecases/professional-slot/update-professional-slot/update-professional-slot'
import { Validation } from '@/presentation/interfaces'
import { mockFakeRequest, mockValidator } from '@/tests/presentation/mocks/mock-professional-slot'
import { UpdateProfessionalSlotController } from '@/presentation/controllers/professional-slot/update-professional-slot/update-professional-slot-controller'
import MockDate from 'mockdate'

type SutTypes = {
  sut: UpdateProfessionalSlotController
  validationStub: Validation
  updateProfessionalSlotStub: UpdateProfessionalSlot
}

const mockUpdateProfessionalSlot = (): UpdateProfessionalSlot => {
  class UpdateProfessionalSlotStub implements UpdateProfessionalSlot {
    async update (params: ProfessionalSlot): Promise<ProfessionalSlot> {
      return await Promise.resolve(undefined)
    }
  }
  return new UpdateProfessionalSlotStub()
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidator()
  const updateProfessionalSlotStub = mockUpdateProfessionalSlot()
  const sut = new UpdateProfessionalSlotController(validationStub, updateProfessionalSlotStub)
  return {
    sut,
    validationStub,
    updateProfessionalSlotStub
  }
}

describe('UpdateProfessionalSlotController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith({
      ...mockFakeRequest().body,
      professionalId: mockFakeRequest().params.id
    })
  })
})
