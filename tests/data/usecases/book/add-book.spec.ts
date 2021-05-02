import { AddBookRepository } from '@/data/interfaces/db/book/add-book/add-book-repository'
import { Book } from '@/domain/models/book'
import { AddBookParams } from '@/domain/usecases/book/add-book/add-book'
import { DbAddBook } from '@/data/usecases/book/add-book/db-add-book'
import { mockAddBookParams, mockBook } from '@/tests/data/mocks/db-book'

type SutTypes = {
  sut: DbAddBook
  addBookRepositoryStub: AddBookRepository
}

const makeAddBookRepository = (): AddBookRepository => {
  class AddBookRepositoryStub implements AddBookRepository {
    add (params: AddBookParams): Promise<Book> {
      return Promise.resolve(mockBook())
    }
  }
  return new AddBookRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addBookRepositoryStub = makeAddBookRepository()
  const sut = new DbAddBook(addBookRepositoryStub)
  return {
    sut,
    addBookRepositoryStub
  }
}

describe('AddBook Usecase', () => {
  test('Should call AddBookRepository with correct values', async () => {
    const { sut, addBookRepositoryStub } = makeSut()
    const addBookRepositorySpy = jest.spyOn(addBookRepositoryStub, 'add')
    await sut.add(mockAddBookParams())
    expect(addBookRepositorySpy).toHaveBeenCalledWith(mockAddBookParams())
  })

  test('Should throw if AddBookRepository throws', async () => {
    const { sut, addBookRepositoryStub } = makeSut()
    jest.spyOn(addBookRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddBookParams())
    await expect(promise).rejects.toThrow()
  })
})
