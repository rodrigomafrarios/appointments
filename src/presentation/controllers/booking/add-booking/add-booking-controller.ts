import { AddBooking } from '@/domain/usecases/booking/add-booking/add-booking'
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
      await this.addBooking.add(body)
      return created()
    } catch (error) {
      return serverError(error)
    }
  }
}
