import { AddBookingRepository } from '@/data/interfaces/db/booking/add-booking/add-booking-repository'
import { Booking } from '@/domain/models/booking'
import { AddBookingParams } from '@/domain/usecases/booking/add-booking/add-booking'
import { DbAddBooking } from '@/data/usecases/booking/add-booking/db-add-booking'
import { mockAddBookingParams, mockBooking } from '@/tests/data/mocks/db-booking'
import { mockLoadProfessionalSlotsRepository, mockProfessionalSlot } from '@/tests/data/mocks/db-professional-slot'
import { LoadProfessionalSlotsRepository } from '@/data/interfaces/db/professional-slot/load-professional-slots/load-professional-slots-repository'

type SutTypes = {
  sut: DbAddBooking
  addBookingRepositoryStub: AddBookingRepository
  loadProfessionalSlotsRepositoryStub: LoadProfessionalSlotsRepository
}

const makeAddBookingRepository = (): AddBookingRepository => {
  class AddBookingRepositoryStub implements AddBookingRepository {
    async add (params: AddBookingParams): Promise<Booking> {
      return Promise.resolve(mockBooking())
    }
  }
  return new AddBookingRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addBookingRepositoryStub = makeAddBookingRepository()
  const loadProfessionalSlotsRepositoryStub = mockLoadProfessionalSlotsRepository()
  const sut = new DbAddBooking(addBookingRepositoryStub, loadProfessionalSlotsRepositoryStub)
  return {
    sut,
    addBookingRepositoryStub,
    loadProfessionalSlotsRepositoryStub
  }
}

describe('AddBook Usecase', () => {
  test('Should call loadProfessionalSlotsRepository with correct values', async () => {
    const { sut, loadProfessionalSlotsRepositoryStub } = makeSut()
    const loadProfessionalSlotsRepositorySpy = jest.spyOn(loadProfessionalSlotsRepositoryStub, 'loadByProfessionalIdAndPeriod')
    await sut.add(mockAddBookingParams())
    expect(loadProfessionalSlotsRepositorySpy).toHaveBeenCalledWith({
      ...mockAddBookingParams(),
      isAvailable: true
    })
  })

  test('Should call AddBookRepository only when theres professionalSlot available', async () => {
    const { sut, addBookingRepositoryStub, loadProfessionalSlotsRepositoryStub } = makeSut()
    jest
    .spyOn(loadProfessionalSlotsRepositoryStub, 'loadByProfessionalIdAndPeriod')
    .mockResolvedValueOnce(mockProfessionalSlot())
    const addBookRepositorySpy = jest.spyOn(addBookingRepositoryStub, 'add')
    await sut.add(mockAddBookingParams())
    expect(addBookRepositorySpy).toHaveBeenCalledWith(mockAddBookingParams())
  })

  test('Should not call AddBookRepository when theres no professionalSlot', async () => {
    const { sut, loadProfessionalSlotsRepositoryStub } = makeSut()
    jest
    .spyOn(loadProfessionalSlotsRepositoryStub, 'loadByProfessionalIdAndPeriod')
    .mockResolvedValueOnce(null)
    await sut.add(mockAddBookingParams())
  })

  test('Should not call AddBookRepository when theres no professionalSlot avaiable', async () => {
    const { sut, loadProfessionalSlotsRepositoryStub } = makeSut()
    const results = Object.assign({}, mockProfessionalSlot(), { isAvailable: false })
    jest
    .spyOn(loadProfessionalSlotsRepositoryStub, 'loadByProfessionalIdAndPeriod')
    .mockResolvedValueOnce(results)
    await sut.add(mockAddBookingParams())
  })

  test('Should throw if loadProfessionalSlotsRepositoryStub throws', async () => {
    const { sut, loadProfessionalSlotsRepositoryStub } = makeSut()
    jest.spyOn(loadProfessionalSlotsRepositoryStub, 'loadByProfessionalIdAndPeriod').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddBookingParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if AddBookRepository throws', async () => {
    const { sut, addBookingRepositoryStub, loadProfessionalSlotsRepositoryStub } = makeSut()
    jest
    .spyOn(loadProfessionalSlotsRepositoryStub, 'loadByProfessionalIdAndPeriod')
    .mockResolvedValueOnce(mockProfessionalSlot())
    jest.spyOn(addBookingRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddBookingParams())
    await expect(promise).rejects.toThrow()
  })
})
