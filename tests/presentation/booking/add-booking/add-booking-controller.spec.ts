import { Booking } from '@/domain/models/booking'
import { AddBooking, AddBookingParams } from '@/domain/usecases/booking/add-booking/add-booking'
import { AddBookingController } from '@/presentation/controllers/booking/add-booking/add-booking-controller'
import { AvailabilitySlotUnavailableError } from '@/presentation/errors/slot-unavailable-error'
import { badRequest, created, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, Validation } from '@/presentation/interfaces'
import { mockBooking } from '@/tests/data/mocks/db-booking'
import { mockValidator } from '@/tests/presentation/mocks/mock-professional-slot'

type SutTypes = {
  sut: AddBookingController
  validationStub: Validation
  addBookingStub: AddBooking
}

const makeAddBookStub = (): AddBooking => {
  class AddBookingStub implements AddBooking {
    async add (params: AddBookingParams): Promise<Booking> {
      return Promise.resolve(mockBooking())
    }
  }
  return new AddBookingStub()
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidator()
  const addBookingStub = makeAddBookStub()
  const sut = new AddBookingController(validationStub, addBookingStub)
  return {
    sut,
    validationStub,
    addBookingStub
  }
}

const mockFakeRequest = (): HttpRequest => {
  return {
    body: {
      customerName: 'any-customer-name',
      professionalId: 'any-professional-id',
      start: "2021-05-01T22:00:00.000Z",
      end: "2021-05-01T23:00:00.000Z"
    }
  }
}

describe('AddBookController', () => {
  test('Should call validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(mockFakeRequest().body)
  })

  test('Should return 400 if validations fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(new Error())
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddBooking with correct values', async () => {
    const { sut, addBookingStub } = makeSut()
    const addBookSpy = jest.spyOn(addBookingStub, 'add')
    await sut.handle(mockFakeRequest())
    expect(addBookSpy).toHaveBeenCalledWith(mockFakeRequest().body)
  })

  test('Should return 400 if AddBooking returns null', async () => {
    const { sut, addBookingStub } = makeSut()
    jest.spyOn(addBookingStub, 'add').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(mockFakeRequest())
    const { body } = mockFakeRequest()
    expect(httpResponse).toEqual(badRequest(new AvailabilitySlotUnavailableError(body.start, body.end)))
  })

  test('Should throw if AddBooking throws', async () => {
    const { sut, addBookingStub } = makeSut()
    jest.spyOn(addBookingStub, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 201 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(created())
  })
})
