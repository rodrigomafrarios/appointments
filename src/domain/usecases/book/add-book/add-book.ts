import { Book } from '@/domain/models/book'

type AddBookParams = Omit<Book, 'id'>

export interface AddBook {
  add: (params: AddBookParams) => Promise<void>
}
