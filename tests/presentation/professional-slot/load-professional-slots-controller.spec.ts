import { mockFakeRequest, mockValidator } from '@/tests/presentation/mocks/mock-professional-slot'
import { Validation } from '@/presentation/interfaces'
import { LoadProfessionalSlotsController } from '@/presentation/controllers/professional-slot/load-professional-slots/load-professional-slots-controller'
import MockDate from 'mockdate'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadProfessionalSlots } from '@/domain/usecases/professional-slot/load-professional-slots/load-professional-slots'
import { ProfessionalSlot } from '@/domain/models/professional-slot'

type SutTypes = {
  sut: LoadProfessionalSlotsController
  loadProfessionalSlotsStub: LoadProfessionalSlots
  validationStub: Validation
}

const makeLoadProfessionalSlots = (): LoadProfessionalSlots => {
  class LoadProfessionalSlotsStub implements LoadProfessionalSlots {
    loadByProfessionalId (id: string): Promise<ProfessionalSlot[]> {
      return Promise.resolve([])
    }
  }
  return new LoadProfessionalSlotsStub()
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidator()
  const loadProfessionalSlotsStub = makeLoadProfessionalSlots()
  const sut = new LoadProfessionalSlotsController(validationStub, loadProfessionalSlotsStub)
  return {
    sut,
    validationStub,
    loadProfessionalSlotsStub
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

  test('Should return 400 if validation fails on a required field', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call LoadProfessionalSlots with correct values', async() => {
    const { sut, loadProfessionalSlotsStub } = makeSut()
    const loadProfessionalSlotsSpy = jest.spyOn(loadProfessionalSlotsStub, 'loadByProfessionalId')
    await sut.handle(mockFakeRequest())
    expect(loadProfessionalSlotsSpy).toHaveBeenCalledWith(mockFakeRequest().params.id)
  })

  test('Should throw if loadProfessionalSlots throws', async () => {
    const { sut, loadProfessionalSlotsStub } = makeSut()
    jest.spyOn(loadProfessionalSlotsStub, 'loadByProfessionalId').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadProfessionalSlotsStub } = makeSut()
    jest.spyOn(loadProfessionalSlotsStub, 'loadByProfessionalId').mockResolvedValueOnce([])
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(ok([]))
  })
})
