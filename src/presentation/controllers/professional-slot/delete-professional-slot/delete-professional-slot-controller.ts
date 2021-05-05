import { DeleteProfessionalSlot } from '@/domain/usecases/professional-slot/delete-professional-slot/delete-professional-slot'
import { Controller, HttpRequest, HttpResponse, Validation, badRequest, ok, serverError } from './delete-professional-slot-controller-deps'

export class DeleteProfessionalSlotController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly deleteProfessionalSlot: DeleteProfessionalSlot
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { params } = httpRequest
      console.log(params)
      const error = await this.validation.validate({
        professionalId: params.id,
        id: params.availabilitySlotId 
      })
  
      if (error) {
        return badRequest(error)
      }
  
      await this.deleteProfessionalSlot.delete({
        professionalId: params.id,
        id: params.availabilitySlotId
      })

      return ok(null)
    } catch (error) {
      return serverError(error)
    }
  }
}