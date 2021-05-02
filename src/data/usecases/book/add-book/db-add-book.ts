import { AddBookRepository } from '@/data/interfaces/db/book/add-book/add-book-repository'
import { AddBook, AddBookParams } from '@/domain/usecases/book/add-book/add-book'

export class DbAddBook implements AddBook {
  constructor (private readonly addBookRepository: AddBookRepository) {}

  async add (params: AddBookParams): Promise<void> {
    await this.addBookRepository.add(params)
  }
}
