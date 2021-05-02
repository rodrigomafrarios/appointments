import { mockFakeRequest, mockValidator } from '@/tests/presentation/mocks/mock-professional-slot'
import { Validation } from '@/presentation/interfaces'
import { LoadProfessionalSlotsController } from '@/presentation/controllers/professional-slot/load-professional-slots/load-professional-slots-controller'
import MockDate from 'mockdate'

type SutTypes = {
  sut: LoadProfessionalSlotsController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidator()
  const sut = new LoadProfessionalSlotsController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('LoadProfessionalSlotsController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith({
      ...mockFakeRequest().body,
      id: mockFakeRequest().params.id
    })
  })
})
