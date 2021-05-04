import { LoadProfessionalSlots } from '@/domain/usecases/professional-slot/load-professional-slots/load-professional-slots'
import { 
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  noContent,
  ok,
  serverError
} from './load-professional-slots-controller-deps'

export class LoadProfessionalSlotsController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadProfessionalSlots: LoadProfessionalSlots
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
  
      const professionalSlots = await this.loadProfessionalSlots.loadByProfessionalId(params.id)
      
      if (!professionalSlots.length) {
        return noContent()
      }

      return ok(professionalSlots)
    } catch (error) {
      return serverError(error)
    }
  }
}
