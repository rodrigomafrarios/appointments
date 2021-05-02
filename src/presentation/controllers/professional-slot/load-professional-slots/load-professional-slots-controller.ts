import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/interfaces'

export class LoadProfessionalSlotsController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body, params } = httpRequest
    await this.validation.validate({
      ...body,
      id: params.id
    })
    return {
      statusCode: 400,
      body: null
    }
  }
}
