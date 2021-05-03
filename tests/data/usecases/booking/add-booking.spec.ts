import { AddBookingRepository } from '@/data/interfaces/db/booking/add-booking/add-booking-repository'
import { Booking } from '@/domain/models/booking'
import { AddBookingParams } from '@/domain/usecases/booking/add-booking/add-booking'
import { DbAddBooking } from '@/data/usecases/booking/add-booking/db-add-booking'
import { mockAddBookingParams, mockBooking } from '@/tests/data/mocks/db-booking'

type SutTypes = {
  sut: DbAddBooking
  addBookingRepositoryStub: AddBookingRepository
}

const makeAddBookingRepository = (): AddBookingRepository => {
  class AddBookingRepositoryStub implements AddBookingRepository {
    add (params: AddBookingParams): Promise<Booking> {
      return Promise.resolve(mockBooking())
    }
  }
  return new AddBookingRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addBookingRepositoryStub = makeAddBookingRepository()
  const sut = new DbAddBooking(addBookingRepositoryStub)
  return {
    sut,
    addBookingRepositoryStub
  }
}

describe('AddBook Usecase', () => {
  test('Should call AddBookRepository with correct values', async () => {
    const { sut, addBookingRepositoryStub } = makeSut()
    const addBookRepositorySpy = jest.spyOn(addBookingRepositoryStub, 'add')
    await sut.add(mockAddBookingParams())
    expect(addBookRepositorySpy).toHaveBeenCalledWith(mockAddBookingParams())
  })

  test('Should throw if AddBookRepository throws', async () => {
    const { sut, addBookingRepositoryStub } = makeSut()
    jest.spyOn(addBookingRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddBookingParams())
    await expect(promise).rejects.toThrow()
  })
})
