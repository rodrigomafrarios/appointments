import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/interfaces'

export class AddBookController implements Controller {
  constructor (private readonly validation: Validation) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest
    const error = await this.validation.validate(body)
    if (error) {
      return badRequest(error)
    }
    return {
      statusCode: 400,
      body: null
    }
  }
}
