import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/interfaces'

export class LoadProfessionalSlotsController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body, params } = httpRequest
    const error = await this.validation.validate({
      ...body,
      id: params.id
    })

    if (error) {
      return badRequest(error)
    }
    return {
      statusCode: 400,
      body: null
    }
  }
}
