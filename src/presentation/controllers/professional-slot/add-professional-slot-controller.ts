import { AddProfessionalSlot } from '@/domain/usecases/professional-slot/add-professional-slot/add-professional-slot'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse, Controller, Validation } from './add-professional-slot-controller-deps'

export class AddProfessionalSlotController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProfessionalSlot: AddProfessionalSlot
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest
    const error = await this.validation.validate(body)

    if (error != null) {
      return badRequest(error)
    }

    await this.addProfessionalSlot.add(body)

    return {
      statusCode: 400,
      body: new Error('Missing param')
    }
  }
}
