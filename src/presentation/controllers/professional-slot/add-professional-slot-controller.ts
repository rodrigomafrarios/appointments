import { badRequest } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse, Controller, Validation } from './add-professional-slot-controller-deps'

export class AddProfessionalSlotController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest
    const error = await this.validation.validate(body)

    if (error != null) {
      return badRequest(error)
    }

    return {
      statusCode: 400,
      body: new Error('Missing param')
    }
  }
}
