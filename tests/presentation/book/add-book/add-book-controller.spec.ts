import { AddBook, AddBookParams } from '@/domain/usecases/book/add-book/add-book'
import { AddBookController } from '@/presentation/controllers/book/add-book/add-book-controller'
import { badRequest, created, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, Validation } from '@/presentation/interfaces'
import { mockValidator } from '@/tests/presentation/mocks/mock-professional-slot'

type SutTypes = {
  sut: AddBookController
  validationStub: Validation
  addBookStub: AddBook
}

const makeAddBookStub = (): AddBook => {
  class AddBookStub implements AddBook {
    async add (params: AddBookParams): Promise<void> {
      return undefined
    }
  }
  return new AddBookStub()
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidator()
  const addBookStub = makeAddBookStub()
  const sut = new AddBookController(validationStub, addBookStub)
  return {
    sut,
    validationStub,
    addBookStub
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

  test('Should call AddBook with correct values', async () => {
    const { sut, addBookStub } = makeSut()
    const addBookSpy = jest.spyOn(addBookStub, 'add')
    await sut.handle(mockFakeRequest())
    expect(addBookSpy).toHaveBeenCalledWith(mockFakeRequest().body)
  })

  test('Should throw if AddBook throws', async () => {
    const { sut, addBookStub } = makeSut()
    jest.spyOn(addBookStub, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 201 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(created())
  })
})
