import { Book } from '@/domain/models/book'
import { AddBookParams } from '@/domain/usecases/book/add-book/add-book'

export const mockBook = (): Book => {
  return {
    id: 'any-id',
    customerName: 'any-customer-name',
    professionalId: 'any-professional-id',
    start: "2021-05-01T22:00:00.000Z",
    end: "2021-05-01T23:00:00.000Z"
  }
}

export const mockAddBookParams = (): AddBookParams => {
  const book = mockBook()
  return {
    customerName: book.customerName,
    professionalId: book.professionalId,
    start: book.start,
    end: book.end
  }
}