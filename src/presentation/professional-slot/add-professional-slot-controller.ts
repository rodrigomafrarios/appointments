import { HttpRequest, HttpResponse, Controller } from './add-professional-slot-controller-deps'

export class AddProfessionalSlotController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 400,
      body: new Error('Missing param')
    }
  }
}
