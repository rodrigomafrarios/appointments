import { HttpRequest, HttpResponse, Controller, Validation } from './add-professional-slot-controller-deps'

export class AddProfessionalSlotController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest
    await this.validation.validate(body)
    return {
      statusCode: 400,
      body: new Error('Missing param')
    }
  }
}
