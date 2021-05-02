import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/interfaces'

export class AddBookController implements Controller {
  constructor (private readonly validation: Validation) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest
    await this.validation.validate(body)
    return {
      statusCode: 400,
      body: null
    }
  }
}
