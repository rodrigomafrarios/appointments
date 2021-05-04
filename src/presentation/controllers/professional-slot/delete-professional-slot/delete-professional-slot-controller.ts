import { DeleteProfessionalSlot } from '@/domain/usecases/professional-slot/delete-professional-slot/delete-professional-slot'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/interfaces'

export class DeleteProfessionalSlotController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly deleteProfessionalSlot: DeleteProfessionalSlot
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
  
      await this.deleteProfessionalSlot.delete({
        ...body,
        professionalId: params.id,
        id: params.availabilitySlotId
      })

      return ok(null)
    } catch (error) {
      return serverError(error)
    }
  }
}