import { mockFakeRequest, mockFakeResponse, mockValidator } from '@/tests/presentation/mocks/mock-professional-slot'
import { Validation } from '@/presentation/interfaces'
import MockDate from 'mockdate'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { LoadProfessionalSlot } from '@/domain/usecases/professional-slot/load-professional-slot/load-professional-slot'
import { LoadProfessionalSlotController } from '@/presentation/controllers/professional-slot/load-professional-slot/load-professional-slot-controller'

type SutTypes = {
  sut: LoadProfessionalSlotController
  loadProfessionalSlotStub: LoadProfessionalSlot
  validationStub: Validation
}

const makeLoadProfessionalSlot = (): LoadProfessionalSlot => {
  class LoadProfessionalSlotStub implements LoadProfessionalSlot {
    loadById (id: string): Promise<ProfessionalSlot> {
      return null
    }
  }
  return new LoadProfessionalSlotStub()
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidator()
  const loadProfessionalSlotStub = makeLoadProfessionalSlot()
  const sut = new LoadProfessionalSlotController(validationStub, loadProfessionalSlotStub)
  return {
    sut,
    validationStub,
    loadProfessionalSlotStub
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
      professionalId: mockFakeRequest().params.id
    })
  })

  test('Should return 400 if validation fails on a required field', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call LoadProfessionalSlot with correct values', async() => {
    const { sut, loadProfessionalSlotStub } = makeSut()
    const loadProfessionalSlotSpy = jest.spyOn(loadProfessionalSlotStub, 'loadById')
    await sut.handle(mockFakeRequest())
    expect(loadProfessionalSlotSpy).toHaveBeenCalledWith(mockFakeRequest().params.availabilitySlotId)
  })

  test('Should throw if LoadProfessionalSlot throws', async () => {
    const { sut, loadProfessionalSlotStub } = makeSut()
    jest.spyOn(loadProfessionalSlotStub, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if LoadProfessionalSlot returns empty', async () => {
    const { sut, loadProfessionalSlotStub } = makeSut()
    jest.spyOn(loadProfessionalSlotStub, 'loadById').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 on success', async () => {
    const { sut, loadProfessionalSlotStub } = makeSut()
    jest.spyOn(loadProfessionalSlotStub, 'loadById')
    .mockResolvedValueOnce(mockFakeResponse().body)
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(ok(mockFakeResponse().body))
  })
})
