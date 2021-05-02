import { Book } from '@/domain/models/book'
import { AddBookParams } from '@/domain/usecases/book/add-book/add-book'

export interface AddBookRepository {
  add: (params: AddBookParams) => Promise<Book>
}
