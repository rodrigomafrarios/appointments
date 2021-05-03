import { UpdateProfessionalSlot } from '@/domain/usecases/professional-slot/update-professional-slot/update-professional-slot'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/interfaces'

export class UpdateProfessionalSlotController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateProfessionalSlot: UpdateProfessionalSlot
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    
    const { body, params } = httpRequest
    const error = await this.validation.validate({
      ...body,
      professionalId: params.id
    })

    if (error) {
      return badRequest(error)
    }
    return null
  }
}