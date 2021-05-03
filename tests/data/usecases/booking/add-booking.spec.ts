import { AddBookingRepository } from '@/data/interfaces/db/booking/add-booking/add-booking-repository'
import { Booking } from '@/domain/models/booking'
import { AddBookingParams } from '@/domain/usecases/booking/add-booking/add-booking'
import { DbAddBooking } from '@/data/usecases/booking/add-booking/db-add-booking'
import { mockAddBookingParams, mockBooking } from '@/tests/data/mocks/db-booking'
import { LoadProfessionalSlot, LoadProfessionalSlotsAvailableRepository } from '@/data/interfaces/db/professional-slot/load-professional-slots/load-professional-slots-available-repository'
import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { mockProfessionalSlot } from '../../mocks/db-professional-slot'

type SutTypes = {
  sut: DbAddBooking
  addBookingRepositoryStub: AddBookingRepository
  loadProfessionalSlotsAvailableRepositoryStub: LoadProfessionalSlotsAvailableRepository
}

const makeAddBookingRepository = (): AddBookingRepository => {
  class AddBookingRepositoryStub implements AddBookingRepository {
    add (params: AddBookingParams): Promise<Booking> {
      return Promise.resolve(mockBooking())
    }
  }
  return new AddBookingRepositoryStub()
}

const makeLoadProfessionalSlotsAvailableRepository = (): LoadProfessionalSlotsAvailableRepository => {
  class LoadProfessionalSlotsAvailableRepositoryStub implements LoadProfessionalSlotsAvailableRepository {
    async loadProfessionalSlotAvailable (params: LoadProfessionalSlot): Promise<ProfessionalSlot> {
      return Promise.resolve(null)
    }
  }
  return new LoadProfessionalSlotsAvailableRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addBookingRepositoryStub = makeAddBookingRepository()
  const loadProfessionalSlotsAvailableRepositoryStub = makeLoadProfessionalSlotsAvailableRepository()
  const sut = new DbAddBooking(addBookingRepositoryStub, loadProfessionalSlotsAvailableRepositoryStub)
  return {
    sut,
    addBookingRepositoryStub,
    loadProfessionalSlotsAvailableRepositoryStub
  }
}

describe('AddBook Usecase', () => {
  test('Should call AddBookRepository with correct values', async () => {
    const { sut, addBookingRepositoryStub } = makeSut()
    const addBookRepositorySpy = jest.spyOn(addBookingRepositoryStub, 'add')
    await sut.add(mockAddBookingParams())
    expect(addBookRepositorySpy).toHaveBeenCalledWith(mockAddBookingParams())
  })

  test('Should call loadProfessionalSlotsAvailableRepository with correct values', async () => {
    const { sut, loadProfessionalSlotsAvailableRepositoryStub } = makeSut()
    const addBookRepositorySpy = jest.spyOn(loadProfessionalSlotsAvailableRepositoryStub, 'loadProfessionalSlotAvailable')
    await sut.add(mockAddBookingParams())
    expect(addBookRepositorySpy).toHaveBeenCalledWith({
      ...mockAddBookingParams(),
      isAvailable: true
    })
  })

  test('Should throw if AddBookRepository throws', async () => {
    const { sut, addBookingRepositoryStub } = makeSut()
    jest.spyOn(addBookingRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddBookingParams())
    await expect(promise).rejects.toThrow()
  })
})
