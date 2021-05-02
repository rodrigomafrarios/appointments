import { AddBook } from '@/domain/usecases/book/add-book/add-book'
import { badRequest, created, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/interfaces'

export class AddBookController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addBook: AddBook  
  ) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const error = await this.validation.validate(body)
      if (error) {
        return badRequest(error)
      }
      await this.addBook.add(body)
      return created()
    } catch (error) {
      return serverError(error)
    }
  }
}
