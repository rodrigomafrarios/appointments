import { LoadProfessionalSlot } from '@/domain/usecases/professional-slot/load-professional-slot/load-professional-slot'
import { 
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  noContent,
  ok,
  serverError
} from './load-professional-slot-controller-deps'

export class LoadProfessionalSlotController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadProfessionalSlot: LoadProfessionalSlot
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, params } = httpRequest
      const error = await this.validation.validate({
        professionalId: params.id,
        id: params.availabilitySlotId
      })
  
      if (error) {
        return badRequest(error)
      }
  
      const professionalSlot = await this.loadProfessionalSlot.loadById(params.availabilitySlotId)
      
      if (!professionalSlot) {
        return noContent()
      }

      return ok(professionalSlot)

    } catch (error) {
      return serverError(error)
    }
  }
}
