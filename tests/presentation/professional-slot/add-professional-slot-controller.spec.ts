import { AddProfessionalSlotController } from '@/presentation/controllers/professional-slot/add-professional-slot-controller'
import { Validation } from '@/presentation/interfaces/validation'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { mockFakeRequest, mockValidator } from '@/tests/presentation/mocks/mock-professional-slot'
import { badRequest, created, serverError } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'
import { AddProfessionalSlot, AddProfessionalSlotParams } from '@/domain/usecases/professional-slot/add-professional-slot/add-professional-slot'

interface SutTypes {
  sut: AddProfessionalSlotController
  validationStub: Validation
  addProfessionalSlotStub: AddProfessionalSlot
}

const mockAddProfessionalSlot = (): AddProfessionalSlot => {
  class AddProfessionalSlotStub implements AddProfessionalSlot {
    async add (params: AddProfessionalSlotParams): Promise<void> {
      return await Promise.resolve(undefined)
    }
  }
  return new AddProfessionalSlotStub()
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidator()
  const addProfessionalSlotStub = mockAddProfessionalSlot()
  const sut = new AddProfessionalSlotController(validationStub, addProfessionalSlotStub)
  return {
    sut,
    validationStub,
    addProfessionalSlotStub
  }
}

describe('AddProfessionalSlotController', () => {
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
    expect(validateSpy).toHaveBeenCalledWith(mockFakeRequest().body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(new InvalidParamError('any_field'))
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('any_field')))
  })

  test('Should call addProfessionalSlot with correct values', async () => {
    const { sut, addProfessionalSlotStub } = makeSut()
    const addProfessionalSlotSpy = jest.spyOn(addProfessionalSlotStub, 'add')
    await sut.handle(mockFakeRequest())
    const httpRequest = mockFakeRequest()
    expect(addProfessionalSlotSpy).toHaveBeenCalledWith({ 
      ...httpRequest.body,
      professionalId: httpRequest.params.id,
      isAvailable: true
    })
  })

  test('Should return 500 if addProfessionalSlot throws', async () => {
    const { sut, addProfessionalSlotStub } = makeSut()
    jest.spyOn(addProfessionalSlotStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 201 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(created())
  })
})
