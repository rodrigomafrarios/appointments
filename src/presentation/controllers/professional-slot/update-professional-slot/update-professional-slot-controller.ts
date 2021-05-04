import { UpdateProfessionalSlot } from '@/domain/usecases/professional-slot/update-professional-slot/update-professional-slot'
import {
  badRequest,
  ok,
  serverError,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from './update-professional-slot-controller-deps'

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
        professionalId: params.id,
        id: params.availabilitySlotId
      })

      return ok(professionalSlot)
    } catch (error) {
      return serverError(error)
    }
  }
}