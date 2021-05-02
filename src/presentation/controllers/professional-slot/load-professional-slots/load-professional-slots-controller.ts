import { LoadProfessionalSlots } from '@/domain/usecases/professional-slot/load-professional-slots/load-professional-slots'
import { badRequest, ok } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/interfaces'

export class LoadProfessionalSlotsController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadProfessionalSlots: LoadProfessionalSlots) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body, params } = httpRequest
    const error = await this.validation.validate({
      ...body,
      id: params.id
    })

    if (error) {
      return badRequest(error)
    }

    const professionalSlots = await this.loadProfessionalSlots.loadByProfessionalId(params.id)

    return ok(professionalSlots)
  }
}
