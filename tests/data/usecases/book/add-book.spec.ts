import { AddBookRepository } from '@/data/interfaces/db/book/add-book/add-book-repository'
import { Book } from '@/domain/models/book'
import { AddBookParams } from '@/domain/usecases/book/add-book/add-book'
import { DbAddBook } from '@/data/usecases/book/add-book/db-add-book'

type SutTypes = {
  sut: DbAddBook
  addBookRepositoryStub: AddBookRepository
}

const mockBook = (): Book => {
  return {
    id: 'any-id',
    customerName: 'any-customer-name',
    professionalId: 'any-professional-id',
    start: "2021-05-01T22:00:00.000Z",
    end: "2021-05-01T23:00:00.000Z"
  }
}

const mockAddBookParams = (): AddBookParams => {
  const book = mockBook()
  return {
    customerName: book.customerName,
    professionalId: book.professionalId,
    start: book.start,
    end: book.end
  }
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
})
