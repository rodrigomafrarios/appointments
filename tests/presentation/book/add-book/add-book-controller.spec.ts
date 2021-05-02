import { AddBookController } from '@/presentation/controllers/book/add-book/add-book-controller'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, Validation } from '@/presentation/interfaces'
import { mockValidator } from '@/tests/presentation/mocks/mock-professional-slot'

type SutTypes = {
  sut: AddBookController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidator()
  const sut = new AddBookController(validationStub)
  return {
    sut,
    validationStub
  }
}

const mockFakeRequest = (): HttpRequest => {
  return {
    body: {
      customerName: 'any-customer-name',
      professionalId: 'any-professional-id',
      start: "2021-05-01T22:00:00.000Z",
      end: "2021-05-01T23:00:00.000Z"
    }
  }
}

describe('AddBookController', () => {
  test('Should call validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(mockFakeRequest().body)
  })

  test('Should return 400 if validations fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(new Error())
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
})
