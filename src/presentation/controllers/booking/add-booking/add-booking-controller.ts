import { AddBooking } from '@/domain/usecases/booking/add-booking/add-booking'
import { AvailabilitySlotUnavailableError } from '@/presentation/errors/slot-unavailable-error'
import { badRequest, created, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/interfaces'

export class AddBookingController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addBooking: AddBooking  
  ) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      
      const error = await this.validation.validate(body)
      if (error) {
        return badRequest(error)
      }

      const booking = await this.addBooking.add(body)
      if (!booking) {
        return badRequest(new AvailabilitySlotUnavailableError(body.start, body.end))
      }
      
      return created()
    } catch (error) {
      return serverError(error)
    }
  }
}
