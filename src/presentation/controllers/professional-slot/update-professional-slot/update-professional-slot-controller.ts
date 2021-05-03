import { UpdateProfessionalSlot } from '@/domain/usecases/professional-slot/update-professional-slot/update-professional-slot'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/interfaces'

export class UpdateProfessionalSlotController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateProfessionalSlot: UpdateProfessionalSlot
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, params } = httpRequest
      const error = await this.validation.validate({
        ...body,
        professionalId: params.id
      })
  
      if (error) {
        return badRequest(error)
      }
  
      const professionalSlot = await this.updateProfessionalSlot.update({
        ...body,
        professionalId: params.id
      })
      return ok(professionalSlot)
    } catch (error) {
      return serverError(error)
    }
  }
}