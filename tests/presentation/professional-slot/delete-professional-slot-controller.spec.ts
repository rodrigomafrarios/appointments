import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { Validation } from '@/presentation/interfaces'
import { mockFakeRequest, mockValidator } from '@/tests/presentation/mocks/mock-professional-slot'
import MockDate from 'mockdate'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { DeleteProfessionalSlot } from '@/domain/usecases/professional-slot/delete-professional-slot/delete-professional-slot'
import { DeleteProfessionalSlotController } from '@/presentation/controllers/professional-slot/delete-professional-slot/delete-professional-slot-controller'

type SutTypes = {
  sut: DeleteProfessionalSlotController
  validationStub: Validation
  deleteProfessionalSlotStub: DeleteProfessionalSlot
}

const mockDeleteProfessionalSlot = (): DeleteProfessionalSlot => {
  class DeleteProfessionalSlotStub implements DeleteProfessionalSlot {
    async delete (params: ProfessionalSlot): Promise<void> {
      return undefined
    }
  }
  return new DeleteProfessionalSlotStub()
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidator()
  const deleteProfessionalSlotStub = mockDeleteProfessionalSlot()
  const sut = new DeleteProfessionalSlotController(validationStub, deleteProfessionalSlotStub)
  return {
    sut,
    validationStub,
    deleteProfessionalSlotStub
  }
}

describe('DeleteProfessionalSlotController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const { params } = mockFakeRequest()
  
    await sut.handle(mockFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith({
      professionalId: params.id,
      id: params.availabilitySlotId
    })
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(new MissingParamError('any_field'))
    const { params } = mockFakeRequest()
    const httpResponse = await sut.handle({
      params: {
        professionalId: params.id,
        id: params.availabilitySlotId
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call DeleteProfessionalSlot with correct values', async () => {
    const { sut, deleteProfessionalSlotStub } = makeSut()
    const deleteProfessionalSlotSpy = jest.spyOn(deleteProfessionalSlotStub, 'delete')
    const { params } = mockFakeRequest()
    await sut.handle(mockFakeRequest())
    expect(deleteProfessionalSlotSpy).toHaveBeenCalledWith({ 
      professionalId: params.id,
      id: params.availabilitySlotId
    })
  })

  test('Should return 500 if DeleteProfessionalSlot throws', async () => {
    const { sut, deleteProfessionalSlotStub } = makeSut()
    jest.spyOn(deleteProfessionalSlotStub, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })
    const { params } = mockFakeRequest()
    const httpResponse = await sut.handle({
      params: {
        professionalId: params.id,
        id: params.availabilitySlotId
      }
    })
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const { params } = mockFakeRequest()
    const httpResponse = await sut.handle({
      params: {
        professionalId: params.id,
        id: params.availabilitySlotId
      }
    })
    expect(httpResponse).toEqual(ok(null))
  })
})
