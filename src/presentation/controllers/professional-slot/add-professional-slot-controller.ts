import { AddProfessionalSlot } from '@/domain/usecases/professional-slot/add-professional-slot/add-professional-slot'
import { badRequest, created, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse, Controller, Validation } from './add-professional-slot-controller-deps'

export class AddProfessionalSlotController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProfessionalSlot: AddProfessionalSlot
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, params } = httpRequest
      const error = await this.validation.validate(body)

      if (error != null) {
        return badRequest(error)
      }

      await this.addProfessionalSlot.add({
        professionalId: params.id,
        start: body.start,
        end: body.end,
        isAvailable: true
      })

      return created()
    } catch (error) {
      return serverError(error)
    }
  }
}
